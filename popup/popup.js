// Popup脚本
document.addEventListener('DOMContentLoaded', function() {
  // 获取DOM元素
  const beautifyAllBtn = document.getElementById('beautifyAll');
  const exportCurrentBtn = document.getElementById('exportCurrent');
  const themeSelect = document.getElementById('themeSelect');
  const fontSizeSelect = document.getElementById('fontSizeSelect');
  const lineNumbersCheckbox = document.getElementById('lineNumbers');
  const codeBlockCountEl = document.getElementById('codeBlockCount');
  const beautifiedCountEl = document.getElementById('beautifiedCount');
  const upgradeBtn = document.getElementById('upgradeBtn');
  const helpBtn = document.getElementById('helpBtn');
  const feedbackBtn = document.getElementById('feedbackBtn');

  // 加载保存的设置
  loadSettings();

  // 更新统计
  updateStats();

  // 美化所有代码按钮
  beautifyAllBtn.addEventListener('click', async function() {
    this.classList.add('loading');
    this.textContent = '美化中...';

    try {
      // 获取当前标签页
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      // 发送消息到content script
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: 'beautifyAll',
        settings: getSettings()
      });

      if (response && response.success) {
        this.classList.add('success');
        this.innerHTML = '<span class="icon">✅</span>完成!';
        beautifiedCountEl.textContent = response.count;

        setTimeout(() => {
          this.innerHTML = '<span class="icon">✨</span>美化所有代码';
          this.classList.remove('success', 'loading');
        }, 2000);
      }
    } catch (error) {
      console.error('美化失败:', error);
      this.textContent = '失败，请重试';
      setTimeout(() => {
        this.innerHTML = '<span class="icon">✨</span>美化所有代码';
        this.classList.remove('loading');
      }, 2000);
    }
  });

  // 导出当前按钮
  exportCurrentBtn.addEventListener('click', async function() {
    this.classList.add('loading');
    this.textContent = '导出中...';

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      const response = await chrome.tabs.sendMessage(tab.id, {
        action: 'exportCurrent',
        settings: getSettings()
      });

      if (response && response.success) {
        this.classList.add('success');
        this.innerHTML = '<span class="icon">✅</span>已导出!';

        setTimeout(() => {
          this.innerHTML = '<span class="icon">📸</span>导出当前';
          this.classList.remove('success', 'loading');
        }, 2000);
      }
    } catch (error) {
      console.error('导出失败:', error);
      this.textContent = '失败';
      setTimeout(() => {
        this.innerHTML = '<span class="icon">📸</span>导出当前';
        this.classList.remove('loading');
      }, 2000);
    }
  });

  // 设置变更时保存
  themeSelect.addEventListener('change', saveSettings);
  fontSizeSelect.addEventListener('change', saveSettings);
  lineNumbersCheckbox.addEventListener('change', saveSettings);

  // 升级按钮
  upgradeBtn.addEventListener('click', function() {
    chrome.tabs.create({
      url: 'https://your-site.com/pricing'
    });
  });

  // 帮助按钮
  helpBtn.addEventListener('click', function() {
    chrome.tabs.create({
      url: 'https://your-site.com/help'
    });
  });

  // 反馈按钮
  feedbackBtn.addEventListener('click', function() {
    chrome.tabs.create({
      url: 'mailto:support@codebeauty.com'
    });
  });

  // 获取当前设置
  function getSettings() {
    return {
      theme: themeSelect.value,
      fontSize: fontSizeSelect.value,
      lineNumbers: lineNumbersCheckbox.checked
    };
  }

  // 加载保存的设置
  function loadSettings() {
    chrome.storage.local.get(['settings'], function(result) {
      if (result.settings) {
        themeSelect.value = result.settings.theme || 'monokai';
        fontSizeSelect.value = result.settings.fontSize || '14';
        lineNumbersCheckbox.checked = result.settings.lineNumbers !== false;
      }
    });
  }

  // 保存设置
  function saveSettings() {
    chrome.storage.local.set({
      settings: getSettings()
    });
  }

  // 更新统计信息
  async function updateStats() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: 'getStats'
      });

      if (response) {
        codeBlockCountEl.textContent = response.total || 0;
        beautifiedCountEl.textContent = response.beautified || 0;
      }
    } catch (error) {
      console.error('获取统计失败:', error);
    }
  }
});