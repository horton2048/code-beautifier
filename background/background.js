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
  }
  return true;
});