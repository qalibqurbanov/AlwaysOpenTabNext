const lastActiveTabInfo = {}; // windowId -> { tabId, index }

chrome.tabs.onActivated.addListener(({ tabId, windowId }) => {
  chrome.tabs.get(tabId, (tab) => {
    if (chrome.runtime.lastError) return;
    lastActiveTabInfo[windowId] = { tabId, index: tab.index };
  });
});

chrome.tabs.onMoved.addListener((tabId, { windowId, toIndex }) => {
  if (lastActiveTabInfo[windowId]?.tabId === tabId) {
    lastActiveTabInfo[windowId].index = toIndex;
  }
});

chrome.tabs.onCreated.addListener(({ id: newTabId, index, windowId }) => {
  const activeInfo = lastActiveTabInfo[windowId];
  if (!activeInfo) return;

  const targetIndex = activeInfo.index + 1;
  if (index === targetIndex) return;

  chrome.tabs.move(newTabId, { index: targetIndex }, () => {
    if (!chrome.runtime.lastError) return;

    // Retry once after a short delay (handles the + button edge case)
    setTimeout(() => {
      chrome.tabs.move(newTabId, { index: targetIndex });
    }, 50);
  });
});
