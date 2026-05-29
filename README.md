<div align="center">
  <img src="icons/icon128.png" width="80" />
  <h1>Always Open Tab Next</h1>
  <p>A Chrome extension that always opens new tabs right next to the tab you're currently on.</p>

  ![Chrome](https://img.shields.io/badge/Chrome-Manifest%20V3-4285F4?logo=googlechrome&logoColor=white)
  ![License](https://img.shields.io/badge/license-MIT-10b981)
</div>

---

## 🔥 The Problem

By default, Chrome opens new tabs at the **end** of the tab strip — even when you're deep into a research session with 20 tabs open. You click a link, and the new tab spawns far away from its context.

## ✅ The Fix

This extension intercepts every new tab — whether from `Ctrl+T`, the `+` button, a middle-click, or a link opened in a new tab — and instantly moves it to the position **right after your current tab**.

---

## ⚡ Features & How It Works

Every way you can open a new tab is handled automatically:

- `Ctrl+T` / `Cmd+T`
- The `+` button in the tab bar
- Middle-click on links
- Right-click → "Open in new tab"
- Links with `target="_blank"`

Under the hood, a single background service worker runs silently with no UI. It tracks which tab is currently active and its position via `chrome.tabs.onActivated`, keeps that position updated when tabs are rearranged via `chrome.tabs.onMoved`, and on every `chrome.tabs.onCreated` event it moves the new tab to `activeTab.index + 1`. A 50ms retry handles the edge case where Chrome's `+` button places the tab at the end before the extension can intercept it.

Zero configuration — install and forget. No data collection, no network requests, no access to page content.

---

## 🚀 Installation

1. Clone or download this repository
   ```bash
   git clone https://github.com/yourname/tab-next.git
   ```
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in the top right)
4. Click **Load unpacked** and select the `tab-next` folder

The extension icon will appear in your toolbar immediately.

---

## 📄 License

This project is licensed under the **MIT License** — you are free to use, modify, distribute, and sell this software, as long as the original copyright and license notice are included. The software is provided “as is”, without warranty or liability.
