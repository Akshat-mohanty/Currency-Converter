# CurrencyX – Currency Converter

A simple, client-side currency converter built with plain HTML, CSS, and JavaScript. No frameworks, no build steps, no API key needed.

![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square) ![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## Features

- 36+ currencies with country flags
- Live exchange rates from the [Frankfurter API](https://www.frankfurter.dev/) (European Central Bank data)
- Converts as you type
- Swap button to flip currencies instantly
- Shows inverse rate, mid-market rate, and last updated date
- Quick-select popular currency pairs
- Rates cached locally for 6 hours so the API isn't hammered
- Dark UI with a particle background
- Works on mobile and desktop

---

## Running It

No install needed, just clone and open:

```bash
git clone https://github.com/Akshat-mohanty/Currency-Converter.git
cd Currency-Converter
open index.html
```

On Windows use `start index.html`, on Linux use `xdg-open index.html`.

---

## Project Structure

```
Currency-Converter/
├── index.html       # markup
├── style.css        # styles and animations
├── app.js           # logic, API calls, caching
├── .gitattributes
├── .gitignore
└── README.md
```

---

## API

Uses the [Frankfurter API](https://www.frankfurter.dev/) — no sign-up or key required. Data is sourced from the European Central Bank and updated daily.

```
GET https://api.frankfurter.dev/v1/latest?base=USD
```

---

## Tech

- HTML5
- CSS3 (animations, canvas, responsive)
- Vanilla JavaScript
- [Frankfurter API](https://www.frankfurter.dev/)
- [Outfit](https://fonts.google.com/specimen/Outfit) via Google Fonts

---

## License

MIT
