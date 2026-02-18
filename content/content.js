// Content Script - 在网页中运行
(function() {
  'use strict';

  // 统计
  let stats = {
    total: 0,
    beautified: 0
  };

  // 当前设置
  let currentSettings = {
    theme: 'monokai',
    fontSize: '14',
    lineNumbers: true
  };

  // 初始化
  function init() {
    countCodeBlocks();
    setupMessageListener();
  }

  // 统计代码块数量
  function countCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre, code');
    stats.total = codeBlocks.length;
  }

  // 设置消息监听
  function setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      switch (request.action) {
        case 'beautifyAll':
          currentSettings = request.settings;
          beautifyAllCode(request.settings);
          sendResponse({ success: true, count: stats.beautified });
          break;
        case 'reapplyTheme':
          currentSettings = request.settings;
          reapplyTheme(request.settings);
          sendResponse({ success: true });
          break;
        case 'exportCurrent':
          exportCurrentCode(request.settings);
          sendResponse({ success: true });
          break;
        case 'getStats':
          sendResponse(stats);
          break;
      }
      return true;
    });
  }

  // 美化所有代码
  function beautifyAllCode(settings) {
    const codeBlocks = document.querySelectorAll('pre, code');
    stats.beautified = 0;

    codeBlocks.forEach((block, index) => {
      if (!block.hasAttribute('data-beautified')) {
        beautifyCodeBlock(block, settings, index);
        stats.beautified++;
      }
    });
  }

  // 重新应用主题
  function reapplyTheme(settings) {
    const wrappers = document.querySelectorAll('.codebeauty-wrapper');
    wrappers.forEach(wrapper => {
      // 移除旧主题类
      wrapper.className = wrapper.className.replace(/theme-\w+/g, '');
      // 添加新主题类
      wrapper.classList.add(`theme-${settings.theme}`);
      
      // 更新字体大小
      wrapper.setAttribute('data-font-size', settings.fontSize);
      
      // 更新行号
      const codeBlock = wrapper.querySelector('.codebeauty-code');
      if (codeBlock) {
        // 移除旧行号
        const oldLineNumbers = codeBlock.querySelector('.line-numbers-rows');
        if (oldLineNumbers) {
          oldLineNumbers.remove();
        }
        codeBlock.classList.remove('line-numbers');
        
        // 添加新行号
        if (settings.lineNumbers) {
          addLineNumbers(codeBlock);
        }
      }
    });
  }

  // 美化单个代码块
  function beautifyCodeBlock(block, settings, index) {
    // 标记已美化
    block.setAttribute('data-beautified', 'true');

    // 包装容器
    const wrapper = document.createElement('div');
    wrapper.className = `codebeauty-wrapper theme-${settings.theme}`;
    wrapper.setAttribute('data-font-size', settings.fontSize);

    // 创建工具栏
    const toolbar = createToolbar(settings);
    wrapper.appendChild(toolbar);

    // 克隆代码块
    const clonedBlock = block.cloneNode(true);
    clonedBlock.className = `codebeauty-code language-${detectLanguage(block)}`;

    // 添加行号
    if (settings.lineNumbers) {
      addLineNumbers(clonedBlock);
    }

    wrapper.appendChild(clonedBlock);

    // 替换原始代码块
    block.parentNode.replaceChild(wrapper, block);

    // 应用语法高亮
    if (typeof Prism !== 'undefined') {
      Prism.highlightElement(clonedBlock);
    }
  }

  // 创建工具栏
  function createToolbar(settings) {
    const toolbar = document.createElement('div');
    toolbar.className = 'codebeauty-toolbar';

    // 语言标签
    const langLabel = document.createElement('span');
    langLabel.className = 'codebeauty-lang';
    langLabel.textContent = 'Code';
    toolbar.appendChild(langLabel);

    // 右侧按钮
    const buttons = document.createElement('div');
    buttons.className = 'codebeauty-buttons';

    // 复制按钮
    const copyBtn = document.createElement('button');
    copyBtn.className = 'codebeauty-btn';
    copyBtn.textContent = '复制';
    copyBtn.onclick = function() {
      copyCode(this);
    };
    buttons.appendChild(copyBtn);

    // 导出按钮
    const exportBtn = document.createElement('button');
    exportBtn.className = 'codebeauty-btn';
    exportBtn.textContent = '导出';
    exportBtn.onclick = function() {
      exportCode(this);
    };
    buttons.appendChild(exportBtn);

    toolbar.appendChild(buttons);

    return toolbar;
  }

  // 检测编程语言
  function detectLanguage(block) {
    const className = block.className || '';
    const match = className.match(/language-(\w+)/);
    return match ? match[1] : 'javascript';
  }

  // 添加行号
  function addLineNumbers(block) {
    const code = block.textContent;
    const lines = code.split('\n');
    const lineNumbersWrapper = document.createElement('span');
    lineNumbersWrapper.className = 'line-numbers-rows';

    lines.forEach((_, index) => {
      const lineNumber = document.createElement('span');
      lineNumber.textContent = index + 1;
      lineNumbersWrapper.appendChild(lineNumber);
    });

    block.classList.add('line-numbers');
    block.appendChild(lineNumbersWrapper);
  }

  // 复制代码
  function copyCode(button) {
    const wrapper = button.closest('.codebeauty-wrapper');
    const code = wrapper.querySelector('.codebeauty-code').textContent;

    navigator.clipboard.writeText(code).then(() => {
      const originalText = button.textContent;
      button.textContent = '已复制!';

      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    });
  }

  // 导出代码
  function exportCode(button) {
    const wrapper = button.closest('.codebeauty-wrapper');

    // 检查html2canvas是否加载
    if (typeof html2canvas === 'undefined') {
      // 动态加载html2canvas
      const script = document.createElement('script');
      script.src = chrome.runtime.getURL('lib/html2canvas.js');
      script.onload = function() {
        doExport(wrapper);
      };
      document.head.appendChild(script);
    } else {
      doExport(wrapper);
    }
  }

  // 执行导出
  function doExport(wrapper) {
    // 添加临时的导出类以优化样式
    wrapper.classList.add('exporting');
    
    html2canvas(wrapper, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true
    }).then(canvas => {
      // 移除导出类
      wrapper.classList.remove('exporting');
      
      // 创建下载链接
      const link = document.createElement('a');
      link.download = `code-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      // 显示成功提示
      const exportBtn = wrapper.querySelector('.codebeauty-btn:nth-child(2)');
      const originalText = exportBtn.textContent;
      exportBtn.textContent = '✓已导出';
      setTimeout(() => {
        exportBtn.textContent = originalText;
      }, 2000);
    }).catch(error => {
      console.error('导出失败:', error);
      wrapper.classList.remove('exporting');
      alert('导出失败: ' + error.message);
    });
  }

  // 导出当前代码
  function exportCurrentCode(settings) {
    const codeBlocks = document.querySelectorAll('.codebeauty-wrapper');
    if (codeBlocks.length > 0) {
      exportCode(codeBlocks[0].querySelector('.codebeauty-btn:nth-child(2)'));
    } else {
      alert('请先美化代码');
    }
  }

  // 初始化
  init();
})();
