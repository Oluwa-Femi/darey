# darey

## Author: Femi Oluwatola

## Building a Simplified Header Bidding System
Implement a header bidding solution for a publisher's site to optimize ad revenue. This project demonstrates a simplified **header bidding system** using **Prebid.js** and **Google Publisher Tags (GPT)** to optimize ad revenue for publishers. The system supports multiple Supply-Side Platforms (SSPs), lazy loading, bid validation, and dynamic floor pricing.

## Live Demo
Check out the live version here: [Live Header Bidding Demo](https://superlative-duckanoo-7354c0.netlify.app/)

## Features
- **Prebid.js Integration**: Enables real-time bidding from multiple SSPs.
- **Dynamic Floor Pricing**: Configurable minimum CPM thresholds for different ad sizes and devices.
- **Lazy Loading**: Optimizes performance by loading ads only when they enter the viewport.
- **Bid Validation**: Filters invalid bids based on CPM and advertiser domain criteria.
- **Fallback Ads**: Ensures ads are displayed even when no valid bids are returned.

---

## Tools and Technologies
1. **Prebid.js**: Open-source library for header bidding.
2. **Google Publisher Tag (GPT)**: Manages ad slots and renders ads on the page.
3. **IntersectionObserver API**: Implements lazy loading for ad slots.
4. **GitHub Actions**: Automates the deployment process to GitHub Pages or other hosting platforms.

---

## Folder Structure

project-folder/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow for deployment
├── src/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # CSS file
│   ├── main.js             # JavaScript logic for header bidding
│   ├── assets/             # Images and other assets
├── package.json            # Project dependencies
└── README.md               # Project documentation


## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Oluwa-Femi/darey/
cd darey
Use live-server extension or ```python -m http.server 8000 --bind 127.0.0.1``` to run the project

---


