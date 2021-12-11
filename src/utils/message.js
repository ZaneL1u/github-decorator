export function sendMessage(action, value) {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action, value }, function e(
        params
      ) {
        resolve(params);
      });
    });
  });
}
