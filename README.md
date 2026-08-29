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

### 3. 💳 Installments Calculator
- **Purchase Price & Down Payment** calculation with real-time deduction.
- **Quick Tenure Presets**: Select common installment terms (6M, 12M, 24M, 36M, 48M, 60M) or use the fine-tune slider.
- **Financial Metrics**: Monthly installment, net financed loan, total interest outlay, and full repayment cost.
- **One-Click Installment Copy** for pasting into estimates or budgets.

### 4. 📈 Investment & Wealth Growth Calculator
- **Compound Growth Engine**: Simulates wealth growth combining an initial deposit with recurring monthly contributions (SIP).
- **Adjustable Parameters**: Initial investment, monthly deposit, expected annual return rate (% p.a.), and duration in years.
- **Growth Breakdown**: Interactive progress bar comparing Invested Capital vs. Compound Growth Profit.
- **One-Click Plan Copy** to save your investment projection.

---

## Aesthetic & Design

- **Warm Editorial Palette**: Crafted with rich linen ivory (`#FAF9F5`), soft oat surfaces (`#F2EFE9`), and deep obsidian black (`#121312`).
- **Deep Forest Emerald Accent**: Signature `#1B4332` accent paired with soft sage tints (`#E8F0EC`) and borders (`#D1E3D9`).
- **Editorial Serif Typography**: Pairing [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) with [Outfit](https://fonts.google.com/specimen/Outfit) for high-contrast luxury presentation.
- **Split-Screen Authentication**: Dedicated luxury auth experience with Google OAuth (Google Identity Services) and email/password accounts.
- **Dedicated Legal Pages**: Standardized Privacy Policy (`privacy.html`) and Terms of Service (`terms.html`) pages.
- **Interactive Financial Previews**: Live preview cards showcasing Currency, Loan, Installments, and Investment compounding.
- **Physics-Based Animations**: Staggered page load entrances, directional tab slide transitions, and tactile spring button animations.
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

## API & Authentication

- **Exchange Rates**: Sourced from [open.er-api.com](https://open.er-api.com/) — no sign-up or API key required. Rates are cached locally for 24 hours.
- **Authentication**: Official Google Identity Services SDK (`https://accounts.google.com/gsi/client`) client-side OAuth with JWT decoding and local session persistence.

---

## Tech Stack

- **HTML5**: Semantic markup with fixed glassmorphic navigation, split-screen authentication, and accessible form controls.
- **CSS3**: Modern CSS custom properties, backdrop filters, smooth range slider styling, and responsive grid layouts.
- **Vanilla JavaScript (ES6+)**: Pure client-side calculations (amortization formulas, compound growth math, live API fetching, clipboard API).
- **Typography**: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) & [Outfit](https://fonts.google.com/specimen/Outfit) via Google Fonts.

---

## Open Source & Contribution

Found a bug or have a suggestion? Open an issue on [GitHub Issues](https://github.com/Akshat-mohanty/Currency-Converter/issues).

## License

© 2026 Akshat Mohanty. Released under the MIT License.
