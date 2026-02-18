// Background Service Worker
chrome.runtime.onInstalled.addListener(function() {
  console.log('CodeBeauty 已安装');

  // 设置默认配置
  chrome.storage.local.set({
    settings: {
      theme: 'monokai',
      fontSize: '14',
      lineNumbers: true
    }
  });
});

// 监听消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openOptions') {
    chrome.tabs.create({
      url: chrome.runtime.getURL('popup/popup.html')
    });
    sendResponse({ success: true });
  } else if (request.action === 'loadHtml2Canvas') {
    // 动态注入html2canvas到content script
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs[0]) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['lib/html2canvas.js']
        }, function() {
          sendResponse({ loaded: true });
        });
      } else {
        sendResponse({ loaded: false });
      }
    });
    return true; // 保持消息通道开启
  }
  return true;
});