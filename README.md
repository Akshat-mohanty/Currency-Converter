# Santerra – All-in-One Financial Suite

Try the [Santerra Financial Suite](https://6a69c2bdcf7aa70008f21b10--currencyxapp.netlify.app) now!

A fast, client-side, all-in-one financial toolkit built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no build steps, no API keys needed. Designed with a warm, minimalist cream aesthetic and fluid animations.

![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square) ![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## What's Included

Santerra provides four financial calculation tools in a single unified workspace:

### 1. 💱 Currency Converter
- **160+ World Currencies** with country flags and instant search.
- **Real-Time Mid-Market Rates** sourced from ECB data via [open.er-api.com](https://open.er-api.com/).
- **Live Conversions** calculate as you type or change currencies.
- **Continuous Spring Swap** button to rotate and invert pairs smoothly.
- **One-Click Copy** to copy full conversion results directly to your clipboard with animated feedback.

### 2. 🏦 Loan Calculator
- **Interactive Sliders** for Loan Principal ($1,000 – $250,000), Annual APR (1% – 25%), and Term (1 – 30 Years).
- **Instant Outputs**: Monthly Payment, Total Principal, Total Interest Payable, and Total Repayment Amount.
- **Visual Breakdown Bar**: Shows proportional distribution between Principal and Interest.
- **One-Click Summary Copy** for sharing loan breakdowns.

### 3. 💳 Installment / EMI Calculator
- **Purchase Price & Down Payment** calculation with real-time deduction.
- **Quick Tenure Presets**: Select common installment terms (6M, 12M, 24M, 36M, 48M, 60M) or use the fine-tune slider.
- **Financial Metrics**: Monthly EMI installment, net financed loan, total interest outlay, and full repayment cost.
- **One-Click EMI Copy** for pasting into estimates or budgets.

### 4. 📈 Investment & Wealth Growth Calculator
- **Compound Growth Engine**: Simulates wealth growth combining an initial deposit with recurring monthly contributions (SIP).
- **Adjustable Parameters**: Initial investment, monthly deposit, expected annual return rate (% p.a.), and duration in years.
- **Growth Breakdown**: Interactive progress bar comparing Invested Capital vs. Compound Growth Profit.
- **One-Click Plan Copy** to save your investment projection.

---

## Aesthetic & Design

- **Warm Cream Palette**: Crafted with rich linen, cream, and sand tones (`#FBF8F3`, `#F3EFE6`, `#ECE6DA`).
- **Electric Emerald Accent**: Highlights key financial gains and interactive slider thumbs.
- **Physics-Based Animations**: Staggered page load entrances, smooth scroll transitions, and reactive number pulse animations.
- **Fully Responsive**: Optimized for seamless use across mobile phones, tablets, and wide desktop displays.

---

## How to Run It

No installation or build process needed. Simply clone and open:

```bash
git clone https://github.com/Akshat-mohanty/Currency-Converter.git
cd Currency-Converter
open index.html
```

- **macOS**: `open index.html`
- **Windows**: `start index.html`
- **Linux**: `xdg-open index.html`

---

## API

Currency exchange rates are fetched from [open.er-api.com](https://open.er-api.com/) — no sign-up or API key required. Rates are cached locally for 24 hours to ensure high performance and zero unnecessary network requests.

```
GET https://open.er-api.com/v6/latest/USD
```

---

## Tech Stack

- **HTML5**: Semantic markup with segmented navigation menus and accessible form controls.
- **CSS3**: CSS custom properties, modern animations, range slider styling, and responsive media queries.
- **Vanilla JavaScript (ES6+)**: Pure client-side calculations (amortization formulas, compound growth math, live API fetching, clipboard API).
- **Typography**: [Outfit](https://fonts.google.com/specimen/Outfit) via Google Fonts.

---

## Open Source & Contribution

Found a bug or have a suggestion? Open an issue on [GitHub Issues](https://github.com/Akshat-mohanty/Currency-Converter/issues).

## License

© 2026 Akshat Mohanty. Released under the MIT License.
