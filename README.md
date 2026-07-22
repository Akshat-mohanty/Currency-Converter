# 💱 CurrencyX – Real-Time Currency Converter

A beautifully designed, fully client-side currency converter built with **vanilla HTML, CSS, and JavaScript**. No build tools, no dependencies, no API key required.

![CurrencyX Screenshot](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square) ![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square) ![No API Key](https://img.shields.io/badge/API_Key-Not_Required-purple?style=flat-square)

---

## ✨ Features

- 🌍 **36+ currencies** with country flags and symbols
- ⚡ **Real-time exchange rates** from the [Frankfurter API](https://www.frankfurter.dev/) (European Central Bank)
- 🔄 **Auto-convert as you type** (debounced input)
- 🔁 **Swap currencies** with a single click
- 📊 **Quick stats** – inverse rate, mid-market rate, last updated date
- ⭐ **Popular pairs** – 6 clickable quick-select currency pairs
- 💾 **Rate caching** – rates are cached for 6 hours to avoid unnecessary API calls
- 🎨 **Dark glassmorphism UI** with animated particle background
- 📱 **Fully responsive** – works great on mobile and desktop
- 🔑 **No API key needed** – completely free, forever

---

## 🚀 Getting Started

### Run Locally

No installation required. Just open the file in your browser:

```bash
# Clone the repo
git clone https://github.com/yourusername/currency-converter.git

# Open in browser
open index.html
# or on Windows: start index.html
# or on Linux: xdg-open index.html
```

### Project Structure

```
currency-converter/
├── index.html      # App structure & markup
├── style.css       # Dark glassmorphism styles & animations
├── app.js          # Conversion logic, API calls, caching
├── .gitattributes  # Git line-ending configuration
├── .gitignore      # Files excluded from version control
└── README.md       # You are here
```

---

## 🌐 Deploy for Free (Anyone Can Access It)

### Option 1 – Netlify *(Recommended – 60 seconds)*
1. Go to [netlify.com](https://netlify.com) and sign up (free, no credit card)
2. Click **"Add new site" → "Deploy manually"**
3. Drag and drop this project folder into the browser
4. Done! Get a live URL like `https://currencyx.netlify.app`

### Option 2 – GitHub Pages
1. Push this repo to a public GitHub repository
2. Go to **Settings → Pages → Branch: `main` → Save**
3. Live at `https://yourusername.github.io/currency-converter`

### Option 3 – Vercel
1. Import your GitHub repo at [vercel.com](https://vercel.com)
2. Click Deploy – live in ~30 seconds

---

## 📡 API Reference

This project uses the **Frankfurter API** — an open-source, no-authentication-required exchange rate service powered by the European Central Bank (ECB).

| Property | Value |
|---|---|
| Base URL | `https://api.frankfurter.dev/v1/latest` |
| API Key | Not required |
| Update Frequency | Daily |
| Source | European Central Bank |
| Rate Limit | Fair use (client caches for 6 hours) |

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Semantic structure |
| CSS3 | Glassmorphism, animations, responsive layout |
| Vanilla JavaScript | API calls, DOM manipulation, caching |
| Canvas API | Particle background animation |
| Google Fonts (Outfit) | Typography |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- Exchange rates by [Frankfurter](https://www.frankfurter.dev/) (ECB data)
- Font by [Google Fonts – Outfit](https://fonts.google.com/specimen/Outfit)
