'use strict';

// ---- Flag emoji generator from ISO 3166-1 alpha-2 country code ----
function flag(cc) {
  if (!cc || cc.length !== 2) return '🌐';
  return cc.toUpperCase().replace(/./g, c =>
    String.fromCodePoint(127397 + c.charCodeAt(0))
  );
}

// ---- All 160+ world currencies: [countryCode, name, symbol] ----
const CURRENCY_DATA = {
  AED: ['AE', 'UAE Dirham',                        'د.إ'],
  AFN: ['AF', 'Afghan Afghani',                    '؋'],
  ALL: ['AL', 'Albanian Lek',                      'L'],
  AMD: ['AM', 'Armenian Dram',                     '֏'],
  ANG: ['CW', 'Netherlands Antillean Guilder',     'ƒ'],
  AOA: ['AO', 'Angolan Kwanza',                    'Kz'],
  ARS: ['AR', 'Argentine Peso',                    '$'],
  AUD: ['AU', 'Australian Dollar',                 'A$'],
  AWG: ['AW', 'Aruban Florin',                     'ƒ'],
  AZN: ['AZ', 'Azerbaijani Manat',                 '₼'],
  BAM: ['BA', 'Bosnia-Herzegovina Mark',           'KM'],
  BBD: ['BB', 'Barbadian Dollar',                  '$'],
  BDT: ['BD', 'Bangladeshi Taka',                  '৳'],
  BGN: ['BG', 'Bulgarian Lev',                     'лв'],
  BHD: ['BH', 'Bahraini Dinar',                    'BD'],
  BMD: ['BM', 'Bermudan Dollar',                   '$'],
  BND: ['BN', 'Brunei Dollar',                     'B$'],
  BOB: ['BO', 'Bolivian Boliviano',                'Bs'],
  BRL: ['BR', 'Brazilian Real',                    'R$'],
  BSD: ['BS', 'Bahamian Dollar',                   '$'],
  BTN: ['BT', 'Bhutanese Ngultrum',                'Nu'],
  BWP: ['BW', 'Botswanan Pula',                    'P'],
  BYN: ['BY', 'Belarusian Ruble',                  'Br'],
  BZD: ['BZ', 'Belize Dollar',                     'BZ$'],
  CAD: ['CA', 'Canadian Dollar',                   'C$'],
  CDF: ['CD', 'Congolese Franc',                   'Fr'],
  CHF: ['CH', 'Swiss Franc',                       'Fr'],
  CLP: ['CL', 'Chilean Peso',                      '$'],
  CNY: ['CN', 'Chinese Yuan',                      '¥'],
  COP: ['CO', 'Colombian Peso',                    '$'],
  CRC: ['CR', 'Costa Rican Colón',                 '₡'],
  CUP: ['CU', 'Cuban Peso',                        '$'],
  CVE: ['CV', 'Cape Verdean Escudo',               '$'],
  CZK: ['CZ', 'Czech Koruna',                      'Kč'],
  DJF: ['DJ', 'Djiboutian Franc',                  'Fr'],
  DKK: ['DK', 'Danish Krone',                      'kr'],
  DOP: ['DO', 'Dominican Peso',                    '$'],
  DZD: ['DZ', 'Algerian Dinar',                    'دج'],
  EGP: ['EG', 'Egyptian Pound',                    '£'],
  ERN: ['ER', 'Eritrean Nakfa',                    'Nfk'],
  ETB: ['ET', 'Ethiopian Birr',                    'Br'],
  EUR: ['EU', 'Euro',                              '€'],
  FJD: ['FJ', 'Fijian Dollar',                     '$'],
  FKP: ['FK', 'Falkland Islands Pound',            '£'],
  GBP: ['GB', 'British Pound',                     '£'],
  GEL: ['GE', 'Georgian Lari',                     '₾'],
  GHS: ['GH', 'Ghanaian Cedi',                     '₵'],
  GIP: ['GI', 'Gibraltar Pound',                   '£'],
  GMD: ['GM', 'Gambian Dalasi',                    'D'],
  GNF: ['GN', 'Guinean Franc',                     'Fr'],
  GTQ: ['GT', 'Guatemalan Quetzal',                'Q'],
  GYD: ['GY', 'Guyanese Dollar',                   '$'],
  HKD: ['HK', 'Hong Kong Dollar',                  'HK$'],
  HNL: ['HN', 'Honduran Lempira',                  'L'],
  HRK: ['HR', 'Croatian Kuna',                     'kn'],
  HTG: ['HT', 'Haitian Gourde',                    'G'],
  HUF: ['HU', 'Hungarian Forint',                  'Ft'],
  IDR: ['ID', 'Indonesian Rupiah',                 'Rp'],
  ILS: ['IL', 'Israeli Shekel',                    '₪'],
  INR: ['IN', 'Indian Rupee',                      '₹'],
  IQD: ['IQ', 'Iraqi Dinar',                       'ع.د'],
  IRR: ['IR', 'Iranian Rial',                      '﷼'],
  ISK: ['IS', 'Icelandic Króna',                   'kr'],
  JMD: ['JM', 'Jamaican Dollar',                   '$'],
  JOD: ['JO', 'Jordanian Dinar',                   'JD'],
  JPY: ['JP', 'Japanese Yen',                      '¥'],
  KES: ['KE', 'Kenyan Shilling',                   'Ksh'],
  KGS: ['KG', 'Kyrgystani Som',                    'с'],
  KHR: ['KH', 'Cambodian Riel',                    '៛'],
  KMF: ['KM', 'Comorian Franc',                    'Fr'],
  KPW: ['KP', 'North Korean Won',                  '₩'],
  KRW: ['KR', 'South Korean Won',                  '₩'],
  KWD: ['KW', 'Kuwaiti Dinar',                     'KD'],
  KYD: ['KY', 'Cayman Islands Dollar',             '$'],
  KZT: ['KZ', 'Kazakhstani Tenge',                 '₸'],
  LAK: ['LA', 'Laotian Kip',                       '₭'],
  LBP: ['LB', 'Lebanese Pound',                    '£'],
  LKR: ['LK', 'Sri Lankan Rupee',                  '₨'],
  LRD: ['LR', 'Liberian Dollar',                   '$'],
  LSL: ['LS', 'Lesotho Loti',                      'L'],
  LYD: ['LY', 'Libyan Dinar',                      'LD'],
  MAD: ['MA', 'Moroccan Dirham',                   'MAD'],
  MDL: ['MD', 'Moldovan Leu',                      'L'],
  MGA: ['MG', 'Malagasy Ariary',                   'Ar'],
  MKD: ['MK', 'Macedonian Denar',                  'ден'],
  MMK: ['MM', 'Myanmar Kyat',                      'K'],
  MNT: ['MN', 'Mongolian Tugrik',                  '₮'],
  MOP: ['MO', 'Macanese Pataca',                   'P'],
  MRU: ['MR', 'Mauritanian Ouguiya',               'UM'],
  MUR: ['MU', 'Mauritian Rupee',                   '₨'],
  MVR: ['MV', 'Maldivian Rufiyaa',                 'Rf'],
  MWK: ['MW', 'Malawian Kwacha',                   'MK'],
  MXN: ['MX', 'Mexican Peso',                      '$'],
  MYR: ['MY', 'Malaysian Ringgit',                 'RM'],
  MZN: ['MZ', 'Mozambican Metical',                'MT'],
  NAD: ['NA', 'Namibian Dollar',                   '$'],
  NGN: ['NG', 'Nigerian Naira',                    '₦'],
  NIO: ['NI', 'Nicaraguan Córdoba',                'C$'],
  NOK: ['NO', 'Norwegian Krone',                   'kr'],
  NPR: ['NP', 'Nepalese Rupee',                    '₨'],
  NZD: ['NZ', 'New Zealand Dollar',                'NZ$'],
  OMR: ['OM', 'Omani Rial',                        '﷼'],
  PAB: ['PA', 'Panamanian Balboa',                 'B/.'],
  PEN: ['PE', 'Peruvian Sol',                      'S/.'],
  PGK: ['PG', 'Papua New Guinean Kina',            'K'],
  PHP: ['PH', 'Philippine Peso',                   '₱'],
  PKR: ['PK', 'Pakistani Rupee',                   '₨'],
  PLN: ['PL', 'Polish Zloty',                      'zł'],
  PYG: ['PY', 'Paraguayan Guarani',                '₲'],
  QAR: ['QA', 'Qatari Riyal',                      '﷼'],
  RON: ['RO', 'Romanian Leu',                      'lei'],
  RSD: ['RS', 'Serbian Dinar',                     'din'],
  RUB: ['RU', 'Russian Ruble',                     '₽'],
  RWF: ['RW', 'Rwandan Franc',                     'Fr'],
  SAR: ['SA', 'Saudi Riyal',                       '﷼'],
  SBD: ['SB', 'Solomon Islands Dollar',            '$'],
  SCR: ['SC', 'Seychellois Rupee',                 '₨'],
  SDG: ['SD', 'Sudanese Pound',                    '£'],
  SEK: ['SE', 'Swedish Krona',                     'kr'],
  SGD: ['SG', 'Singapore Dollar',                  'S$'],
  SHP: ['SH', 'Saint Helena Pound',                '£'],
  SLL: ['SL', 'Sierra Leonean Leone',              'Le'],
  SOS: ['SO', 'Somali Shilling',                   'Sh'],
  SRD: ['SR', 'Surinamese Dollar',                 '$'],
  STN: ['ST', 'São Tomé & Príncipe Dobra',         'Db'],
  SVC: ['SV', 'Salvadoran Colón',                  '₡'],
  SYP: ['SY', 'Syrian Pound',                      '£'],
  SZL: ['SZ', 'Swazi Lilangeni',                   'L'],
  THB: ['TH', 'Thai Baht',                         '฿'],
  TJS: ['TJ', 'Tajikistani Somoni',                'SM'],
  TMT: ['TM', 'Turkmenistani Manat',               'T'],
  TND: ['TN', 'Tunisian Dinar',                    'DT'],
  TOP: ['TO', "Tongan Pa'anga",                    'T$'],
  TRY: ['TR', 'Turkish Lira',                      '₺'],
  TTD: ['TT', 'Trinidad & Tobago Dollar',          'TT$'],
  TWD: ['TW', 'Taiwan Dollar',                     'NT$'],
  TZS: ['TZ', 'Tanzanian Shilling',                'Sh'],
  UAH: ['UA', 'Ukrainian Hryvnia',                 '₴'],
  UGX: ['UG', 'Ugandan Shilling',                  'Sh'],
  USD: ['US', 'US Dollar',                         '$'],
  UYU: ['UY', 'Uruguayan Peso',                    '$'],
  UZS: ['UZ', 'Uzbekistani Som',                   'so\'m'],
  VES: ['VE', 'Venezuelan Bolívar',                'Bs'],
  VND: ['VN', 'Vietnamese Dong',                   '₫'],
  VUV: ['VU', 'Vanuatu Vatu',                      'Vt'],
  WST: ['WS', 'Samoan Tala',                       'T'],
  XAF: ['CM', 'Central African CFA Franc',         'Fr'],
  XCD: ['AG', 'East Caribbean Dollar',             '$'],
  XOF: ['SN', 'West African CFA Franc',            'Fr'],
  XPF: ['PF', 'CFP Franc',                         'Fr'],
  YER: ['YE', 'Yemeni Rial',                       '﷼'],
  ZAR: ['ZA', 'South African Rand',                'R'],
  ZMW: ['ZM', 'Zambian Kwacha',                    'ZK'],
  ZWL: ['ZW', 'Zimbabwean Dollar',                 '$'],
};

function getMeta(code) {
  const d = CURRENCY_DATA[code];
  if (!d) return { flag: '🌐', name: code, symbol: code };
  return { flag: flag(d[0]), name: d[1], symbol: d[2] };
}

// Popular pairs
const POPULAR_PAIRS = [
  { from:'USD', to:'INR' },
  { from:'EUR', to:'USD' },
  { from:'GBP', to:'EUR' },
  { from:'USD', to:'JPY' },
  { from:'USD', to:'AED' },
  { from:'EUR', to:'GBP' },
];

// ---- State ----
const state = {
  from: 'USD',
  to:   'INR',
  usdRates: null,       // all rates relative to USD
  rateDate: null,
  rateTimestamp: null,
  converting: false,
};

const CACHE_TTL = 6 * 60 * 60 * 1000;

// ---- DOM ----
const amountEl    = document.getElementById('amount');
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
const fromSymbol  = document.getElementById('fromSymbol');
const canvas      = document.getElementById('particles');

// ---- Helpers ----
function formatNum(n) {
  if (n >= 1000)  return n.toFixed(2);
  if (n >= 10)    return n.toFixed(3);
  if (n >= 0.01)  return n.toFixed(4);
  return n.toFixed(6);
}
function formatAmount(n) {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits:2, maximumFractionDigits:4 }).format(n);
}

// ---- Toast ----
let toastTimer;
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ---- API (open.er-api.com – no key needed, 160+ currencies) ----
async function fetchUsdRates() {
  if (state.usdRates && state.rateTimestamp && Date.now() - state.rateTimestamp < CACHE_TTL) {
    return state.usdRates;
  }
  const res  = await fetch('https://open.er-api.com/v6/latest/USD');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.result !== 'success') throw new Error('API error');
  state.usdRates    = data.rates;
  state.rateDate    = data.time_last_update_utc ? new Date(data.time_last_update_utc).toLocaleDateString() : '–';
  state.rateTimestamp = Date.now();
  return state.usdRates;
}

// Cross-rate: from A to B via USD base
function crossRate(rates, from, to) {
  if (from === to) return 1;
  const fromUsd = rates[from];
  const toUsd   = rates[to];
  if (!fromUsd || !toUsd) throw new Error(`No rate for ${from} or ${to}`);
  return toUsd / fromUsd;
}

// ---- Convert ----
async function convert() {
  if (state.converting) return;
  const amount = parseFloat(amountEl.value);
  if (!amount || isNaN(amount) || amount <= 0) { showToast('Please enter a valid amount.'); return; }

  state.converting = true;
  convertBtn.classList.add('loading');

  try {
    const rates     = await fetchUsdRates();
    const rate      = crossRate(rates, state.from, state.to);
    const converted = amount * rate;
    const inverse   = 1 / rate;

    resultFrom.textContent = `${formatAmount(amount)} ${state.from}`;
    resultTo.classList.remove('animate', 'result-error');
    void resultTo.offsetWidth;
    resultTo.textContent = `${formatAmount(converted)} ${state.to}`;
    resultTo.classList.add('animate');
    resultRate.textContent = `1 ${state.from} = ${formatNum(rate)} ${state.to}`;

    resultCont.classList.add('has-result');
    inverseVal.textContent = `${formatNum(inverse)} ${state.from}`;
    midVal.textContent     = `${formatNum(rate)} ${state.to}`;
    updatedVal.textContent = state.rateDate ?? '–';
    statsRow.classList.add('visible');

    fromSymbol.textContent = getMeta(state.from).symbol;

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

// ---- Custom Dropdown ----
function buildDropdown(listEl, searchEl, triggerEl, side) {
  const codes = Object.keys(CURRENCY_DATA).sort();
  listEl.innerHTML = '';

  codes.forEach(code => {
    const meta = getMeta(code);
    const li   = document.createElement('li');
    li.className = 'cs-item';
    li.dataset.code = code;
    li.setAttribute('role', 'option');
    li.setAttribute('aria-label', `${code} ${meta.name}`);
    li.innerHTML = `
      <span class="cs-item-flag">${meta.flag}</span>
      <span class="cs-item-code">${code}</span>
      <span class="cs-item-name">${meta.name}</span>
    `;
    li.addEventListener('click', () => {
      selectCurrency(side, code);
      closeDropdown(side);
      convert();
    });
    listEl.appendChild(li);
  });

  // No results message
  const noRes = document.createElement('li');
  noRes.className = 'cs-no-results';
  noRes.textContent = 'No currencies found';
  listEl.appendChild(noRes);

  // Search filter
  searchEl.addEventListener('input', () => {
    const q = searchEl.value.toLowerCase().trim();
    let visible = 0;
    listEl.querySelectorAll('.cs-item').forEach(item => {
      const code = item.dataset.code;
      const name = CURRENCY_DATA[code][1].toLowerCase();
      const show = !q || code.toLowerCase().includes(q) || name.includes(q);
      item.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    noRes.style.display = visible === 0 ? 'block' : 'none';
  });
}

function selectCurrency(side, code) {
  const meta = getMeta(code);
  state[side === 'from' ? 'from' : 'to'] = code;

  document.getElementById(`${side}Flag`).textContent = meta.flag;
  document.getElementById(`${side}Code`).textContent = code;
  document.getElementById(`${side}Full`).textContent = meta.name;

  // Mark selected in list
  const listEl = document.getElementById(`${side}List`);
  listEl.querySelectorAll('.cs-item').forEach(el => {
    el.classList.toggle('selected', el.dataset.code === code);
  });

  // Scroll selected into view
  const sel = listEl.querySelector('.cs-item.selected');
  if (sel) sel.scrollIntoView({ block:'nearest' });

  if (side === 'from') fromSymbol.textContent = meta.symbol;
}

const panelOpen = { from: false, to: false };

function openDropdown(side) {
  const panel  = document.getElementById(`${side}Panel`);
  const trigger = document.getElementById(`${side}Trigger`);
  const search = document.getElementById(`${side}Search`);

  // Close the other
  const other = side === 'from' ? 'to' : 'from';
  if (panelOpen[other]) closeDropdown(other);

  panel.classList.add('open');
  trigger.setAttribute('aria-expanded', 'true');
  panelOpen[side] = true;
  search.value = '';
  // Reset filter
  document.getElementById(`${side}List`).querySelectorAll('.cs-item').forEach(el => el.classList.remove('hidden'));
  document.querySelector(`#${side}Panel .cs-no-results`).style.display = 'none';
  setTimeout(() => search.focus(), 50);
}

function closeDropdown(side) {
  const panel  = document.getElementById(`${side}Panel`);
  const trigger = document.getElementById(`${side}Trigger`);
  panel.classList.remove('open');
  trigger.setAttribute('aria-expanded', 'false');
  panelOpen[side] = false;
}

function toggleDropdown(side) {
  panelOpen[side] ? closeDropdown(side) : openDropdown(side);
}

// ---- Popular Pairs ----
async function renderPopularPairs() {
  pairsGrid.innerHTML = POPULAR_PAIRS.map(() =>
    `<div class="pair-card" style="height:72px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:16px;"></div>`
  ).join('');

  try {
    const rates = await fetchUsdRates();
    pairsGrid.innerHTML = '';

    POPULAR_PAIRS.forEach(({ from, to }) => {
      const rate     = crossRate(rates, from, to);
      const fromMeta = getMeta(from);
      const toMeta   = getMeta(to);

      const card = document.createElement('div');
      card.className = 'pair-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.innerHTML = `
        <div>
          <div class="pair-flags">${fromMeta.flag} → ${toMeta.flag}</div>
          <div class="pair-name">${from} / ${to}</div>
          <div class="pair-rate">1 ${from} = ${formatNum(rate)} ${to}</div>
        </div>
        <div class="pair-change">Live</div>
      `;
      card.addEventListener('click', () => {
        selectCurrency('from', from);
        selectCurrency('to', to);
        amountEl.value = '1';
        convert();
        window.scrollTo({ top:0, behavior:'smooth' });
      });
      card.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') card.click(); });
      pairsGrid.appendChild(card);
    });
  } catch {
    pairsGrid.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;padding:12px;">Could not load popular pairs.</p>';
  }
}

// ---- Particle Canvas ----
function initParticles() {
  const ctx = canvas.getContext('2d');
  let W = window.innerWidth, H = window.innerHeight;
  canvas.width = W; canvas.height = H;

  const pts = Array.from({ length:60 }, () => ({
    x: Math.random()*W, y: Math.random()*H,
    r: Math.random()*1.5+0.5,
    dx:(Math.random()-0.5)*0.3, dy:(Math.random()-0.5)*0.3,
    o: Math.random()*0.5+0.1
  }));

  (function draw() {
    ctx.clearRect(0,0,W,H);
    pts.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(124,58,237,${p.o})`; ctx.fill();
      p.x+=p.dx; p.y+=p.dy;
      if(p.x<0||p.x>W) p.dx*=-1;
      if(p.y<0||p.y>H) p.dy*=-1;
    });
    requestAnimationFrame(draw);
  })();

  window.addEventListener('resize', () => {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width=W; canvas.height=H;
  });
}

// ---- Events ----
convertBtn.addEventListener('click', convert);

swapBtn.addEventListener('click', () => {
  const tmp = state.from;
  selectCurrency('from', state.to);
  selectCurrency('to',   tmp);
  convert();
});

amountEl.addEventListener('keydown', e => { if (e.key==='Enter') convert(); });

let debounce;
amountEl.addEventListener('input', () => {
  clearTimeout(debounce);
  debounce = setTimeout(convert, 500);
});

// Trigger buttons
document.getElementById('fromTrigger').addEventListener('click', () => toggleDropdown('from'));
document.getElementById('toTrigger').addEventListener('click',   () => toggleDropdown('to'));

// Close on outside click
document.addEventListener('click', e => {
  ['from','to'].forEach(side => {
    if (!panelOpen[side]) return;
    const wrapper = document.getElementById(`${side}Wrapper`);
    if (!wrapper.contains(e.target)) closeDropdown(side);
  });
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeDropdown('from'); closeDropdown('to'); }
});

// ---- Init ----
function init() {
  // Build both dropdowns
  buildDropdown(
    document.getElementById('fromList'),
    document.getElementById('fromSearch'),
    document.getElementById('fromTrigger'),
    'from'
  );
  buildDropdown(
    document.getElementById('toList'),
    document.getElementById('toSearch'),
    document.getElementById('toTrigger'),
    'to'
  );

  // Set defaults
  selectCurrency('from', 'USD');
  selectCurrency('to',   'INR');

  initParticles();
  convert();
  renderPopularPairs();
}

init();
