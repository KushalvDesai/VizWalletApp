// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  // Initialize extension storage
  chrome.storage.local.set({
    theme: 'light',
    connected: false,
    address: null,
    balance: '0',
    allowance: '0',
    canSend: true
  });
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_WALLET_INFO') {
    chrome.storage.local.get(['address', 'balance', 'allowance', 'canSend'], (result) => {
      sendResponse(result);
    });
    return true; // Will respond asynchronously
  }
}); 