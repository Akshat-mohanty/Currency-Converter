/* =============================================
   CurrencyX – App Logic
   API: Frankfurter (ECB) – No API key needed
   ============================================= */

'use strict';

// ---- Currency Data (flags + symbols) ----
const CURRENCY_META = {
  USD: { flag: '🇺🇸', symbol: '$', name: 'US Dollar' },
  EUR: { flag: '🇪🇺', symbol: '€', name: 'Euro' },
  GBP: { flag: '🇬🇧', symbol: '£', name: 'British Pound' },
  INR: { flag: '🇮🇳', symbol: '₹', name: 'Indian Rupee' },
  JPY: { flag: '🇯🇵', symbol: '¥', name: 'Japanese Yen' },
  AUD: { flag: '🇦🇺', symbol: 'A$', name: 'Australian Dollar' },
  CAD: { flag: '🇨🇦', symbol: 'C$', name: 'Canadian Dollar' },
  CHF: { flag: '🇨🇭', symbol: 'Fr', name: 'Swiss Franc' },
  CNY: { flag: '🇨🇳', symbol: '¥', name: 'Chinese Yuan' },
  HKD: { flag: '🇭🇰', symbol: 'HK$', name: 'Hong Kong Dollar' },
  SGD: { flag: '🇸🇬', symbol: 'S$', name: 'Singapore Dollar' },
  SEK: { flag: '🇸🇪', symbol: 'kr', name: 'Swedish Krona' },
  NOK: { flag: '🇳🇴', symbol: 'kr', name: 'Norwegian Krone' },
  DKK: { flag: '🇩🇰', symbol: 'kr', name: 'Danish Krone' },
  MXN: { flag: '🇲🇽', symbol: '$', name: 'Mexican Peso' },
  BRL: { flag: '🇧🇷', symbol: 'R$', name: 'Brazilian Real' },
  KRW: { flag: '🇰🇷', symbol: '₩', name: 'South Korean Won' },
  ZAR: { flag: '🇿🇦', symbol: 'R', name: 'South African Rand' },
  TRY: { flag: '🇹🇷', symbol: '₺', name: 'Turkish Lira' },
  SAR: { flag: '🇸🇦', symbol: '﷼', name: 'Saudi Riyal' },
  AED: { flag: '🇦🇪', symbol: 'د.إ', name: 'UAE Dirham' },
  PLN: { flag: '🇵🇱', symbol: 'zł', name: 'Polish Zloty' },
  THB: { flag: '🇹🇭', symbol: '฿', name: 'Thai Baht' },
  IDR: { flag: '🇮🇩', symbol: 'Rp', name: 'Indonesian Rupiah' },
  MYR: { flag: '🇲🇾', symbol: 'RM', name: 'Malaysian Ringgit' },
  PHP: { flag: '🇵🇭', symbol: '₱', name: 'Philippine Peso' },
  NZD: { flag: '🇳🇿', symbol: 'NZ$', name: 'New Zealand Dollar' },
  RUB: { flag: '🇷🇺', symbol: '₽', name: 'Russian Ruble' },
  CZK: { flag: '🇨🇿', symbol: 'Kč', name: 'Czech Koruna' },
  HUF: { flag: '🇭🇺', symbol: 'Ft', name: 'Hungarian Forint' },
  ILS: { flag: '🇮🇱', symbol: '₪', name: 'Israeli Shekel' },
  BGN: { flag: '🇧🇬', symbol: 'лв', name: 'Bulgarian Lev' },
  HRK: { flag: '🇭🇷', symbol: 'kn', name: 'Croatian Kuna' },
  RON: { flag: '🇷🇴', symbol: 'lei', name: 'Romanian Leu' },
  ISK: { flag: '🇮🇸', symbol: 'kr', name: 'Icelandic Króna' },
};

// Popular pairs to show in quick section
const POPULAR_PAIRS = [
  { from: 'USD', to: 'INR' },
  { from: 'EUR', to: 'USD' },
  { from: 'GBP', to: 'EUR' },
  { from: 'USD', to: 'JPY' },
  { from: 'USD', to: 'AED' },
  { from: 'EUR', to: 'GBP' },
];

// ---- State ----
const state = {
  rates: null,        // cached rates keyed by base
  rateCache: {},      // { 'USD': { rates: {…}, timestamp: Date } }
  lastFrom: null,
  lastTo: null,
  converting: false,
};

const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours cache

// ---- DOM refs ----
const amountEl    = document.getElementById('amount');
const fromSel     = document.getElementById('fromCurrency');
const toSel       = document.getElementById('toCurrency');
const swapBtn     = document.getElementById('swapBtn');
const convertBtn  = document.getElementById('convertBtn');
const resultFrom  = document.getElementById('resultFrom');
const resultTo    = document.getElementById('resultTo');
const resultRate  = document.getElementById('resultRate');
const resultCont  = document.getElementById('resultContainer');
const inverseVal  = document.getElementById('inverseValue');
const midVal      = document.getElementById('midValue');
const updatedVal  = document.getElementById('updatedValue');
const statsRow    = document.getElementById('statsRow');
const pairsGrid   = document.getElementById('pairsGrid');
const fromFlag    = document.getElementById('fromFlag');
const toFlag      = document.getElementById('toFlag');
const fromSymbol  = document.getElementById('fromSymbol');
const btnSpinner  = document.getElementById('btnSpinner');
const canvas      = document.getElementById('particles');

// ---- Helpers ----
function getMeta(code) {
  return CURRENCY_META[code] || { flag: '🌐', symbol: code, name: code };
}

function formatNum(num, decimals = 4) {
  if (num >= 1000) return num.toFixed(2);
  if (num >= 10)   return num.toFixed(3);
  return num.toFixed(decimals);
}

function formatAmount(num) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  }).format(num);
}

// ---- Toast ----
let toastTimeout;
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---- Populate selects ----
function buildOptions(selectEl, defaultCode) {
  const currencies = Object.keys(CURRENCY_META);
  selectEl.innerHTML = '';
  currencies.forEach(code => {
    const meta = getMeta(code);
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = `${code} – ${meta.name}`;
    if (code === defaultCode) opt.selected = true;
    selectEl.appendChild(opt);
  });
}

// ---- Fetch rates ----
async function fetchRates(base) {
  // Check cache
  const cached = state.rateCache[base];
  if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
    return cached.rates;
  }

  const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${base}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  // Frankfurter doesn't include the base currency itself, add it
  data.rates[base] = 1;

  state.rateCache[base] = {
    rates: data.rates,
    timestamp: Date.now(),
    date: data.date,
  };

  return data.rates;
}

// ---- Convert ----
async function convert() {
  if (state.converting) return;

  const amount = parseFloat(amountEl.value);
  const from   = fromSel.value;
  const to     = toSel.value;

  if (!amount || isNaN(amount) || amount <= 0) {
    showToast('Please enter a valid amount.');
    amountEl.focus();
    return;
  }

  state.converting = true;
  convertBtn.classList.add('loading');

  try {
    const rates = await fetchRates(from);
    const rate  = rates[to];

    if (!rate) throw new Error(`Rate not found for ${to}`);

    const converted = amount * rate;
    const inverse   = 1 / rate;

    // Update result
    resultFrom.textContent = `${formatAmount(amount)} ${from}`;

    resultTo.classList.remove('animate', 'result-error');
    void resultTo.offsetWidth; // reflow to re-trigger animation
    resultTo.textContent = `${formatAmount(converted)} ${to}`;
    resultTo.classList.add('animate');

    resultRate.textContent = `1 ${from} = ${formatNum(rate)} ${to}`;

    resultCont.classList.add('has-result');

    // Update stats
    inverseVal.textContent  = `${formatNum(inverse)} ${from}`;
    midVal.textContent      = `${formatNum(rate)} ${to}`;
    updatedVal.textContent  = state.rateCache[from]?.date ?? '–';
    statsRow.classList.add('visible');

    // Update symbol
    fromSymbol.textContent = getMeta(from).symbol;

    state.lastFrom = from;
    state.lastTo   = to;

  } catch (err) {
    console.error(err);
    resultTo.textContent = 'Error fetching rate';
    resultTo.classList.add('result-error');
    showToast('⚠️ Could not fetch rates. Check your connection.');
  } finally {
    state.converting = false;
    convertBtn.classList.remove('loading');
  }
}

// ---- Swap ----
function swap() {
  const fromVal = fromSel.value;
  const toVal   = toSel.value;
  fromSel.value = toVal;
  toSel.value   = fromVal;
  syncFlags();
  convert();
}

// ---- Sync flags / symbols ----
function syncFlags() {
  const fromMeta = getMeta(fromSel.value);
  const toMeta   = getMeta(toSel.value);
  fromFlag.textContent   = fromMeta.flag;
  toFlag.textContent     = toMeta.flag;
  fromSymbol.textContent = fromMeta.symbol;
}

// ---- Popular Pairs ----
async function renderPopularPairs() {
  pairsGrid.innerHTML = POPULAR_PAIRS.map(() => `
    <div class="pair-card skeleton" style="height:68px;"></div>
  `).join('');

  try {
    // Batch: fetch USD rates once, derive others
    const usdRates = await fetchRates('USD');
    const eurRates = await fetchRates('EUR');
    const gbpRates = await fetchRates('GBP');

    const rateMap = { USD: usdRates, EUR: eurRates, GBP: gbpRates };

    pairsGrid.innerHTML = '';
    POPULAR_PAIRS.forEach(({ from, to }) => {
      let rate;
      if (rateMap[from]) {
        rate = rateMap[from][to];
      } else {
        // Derive via USD
        rate = (1 / usdRates[from]) * usdRates[to];
      }

      const fromMeta = getMeta(from);
      const toMeta   = getMeta(to);

      const card = document.createElement('div');
      card.className = 'pair-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Convert ${from} to ${to}`);
      card.innerHTML = `
        <div>
          <div class="pair-flags">${fromMeta.flag} → ${toMeta.flag}</div>
          <div class="pair-name">${from} / ${to}</div>
          <div class="pair-rate">1 ${from} = ${formatNum(rate)} ${to}</div>
        </div>
        <div class="pair-change">Live</div>
      `;

      card.addEventListener('click', () => {
        fromSel.value = from;
        toSel.value   = to;
        amountEl.value = '1';
        syncFlags();
        convert();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') card.click();
      });

      pairsGrid.appendChild(card);
    });
  } catch (e) {
    pairsGrid.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;padding:12px;">Could not load popular pairs.</p>';
  }
}

// ---- Particle Canvas Animation ----
function initParticles() {
  const ctx = canvas.getContext('2d');
  let W = window.innerWidth;
  let H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124, 58, 237, ${p.opacity})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  });
}

// ---- Event Listeners ----
convertBtn.addEventListener('click', convert);

swapBtn.addEventListener('click', swap);

amountEl.addEventListener('keydown', e => {
  if (e.key === 'Enter') convert();
});

// Auto-convert on currency change
fromSel.addEventListener('change', () => { syncFlags(); convert(); });
toSel.addEventListener('change',   () => { syncFlags(); convert(); });

// Debounced auto-convert on amount input
let inputDebounce;
amountEl.addEventListener('input', () => {
  clearTimeout(inputDebounce);
  inputDebounce = setTimeout(convert, 500);
});

// ---- Init ----
async function init() {
  buildOptions(fromSel, 'USD');
  buildOptions(toSel,   'INR');
  syncFlags();
  initParticles();
  await convert();
  renderPopularPairs();
}

init();
