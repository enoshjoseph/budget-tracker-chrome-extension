# Budget Tracker Chrome Extension

A Chrome Extension built using Manifest V3 that allows users to track expenses directly from any webpage using a context menu.

## Features
✅ Add expenses by selecting numbers on any webpage

✅ Context menu integration (“Spend Money”)

✅ Works on modern websites (Amazon, SPAs, Shadow DOM pages)

✅ Persistent storage using chrome.storage.sync

✅ Budget limit notifications

✅ Badge updates on extension icon

✅ Options page for configuration

✅ Fully compatible with Manifest V3

## How It Works (High-Level)

- >User selects a number on a webpage

- >Right-click → Spend Money

- >Extension retrieves selected text using a content execution

- >Amount is parsed and added to total

- >Data is saved using Chrome Storage API

- >Notification is shown if limit is exceeded

## Permissions used

"permissions": [
  "contextMenus",
  "storage",
  "notifications",
  "scripting"
]

## Why these permissions?

contextMenus → add right-click menu

storage → persist budget data

notifications → alert on limit exceed

scripting → execute script to read selection

## How to use

Open any webpage

Select a number (e.g. 499)

Right-click → Spend Money

Open the extension popup to view total

Set limit in Options page

Receive notification when limit is crossed


## How to setUp
Clone the repository:

git clone https://github.com/your-username/budget-tracker-chrome-extension.git


Open Chrome and go to:

chrome://extensions


Enable Developer mode

Click Load unpacked

Select the project folder
