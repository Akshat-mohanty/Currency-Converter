'use strict';

// ---- Flag emoji generator ----
function flag(cc) {
  if (!cc || cc.length !== 2) return '🌐';
  return cc.toUpperCase().replace(/./g, c =>
    String.fromCodePoint(127397 + c.charCodeAt(0))
  );
}

function getAppleFlagUrl(cc) {
  if (!cc || cc.length !== 2) return null;
  const hex1 = (cc.toUpperCase().charCodeAt(0) + 127397).toString(16);
  const hex2 = (cc.toUpperCase().charCodeAt(1) + 127397).toString(16);
  return `https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/${hex1}-${hex2}.png`;
}

// ---- All 160+ world currencies ----
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
  if (!d) return { flagUrl: null, flag: '🌐', name: code, symbol: code };
  return { 
    flagUrl: getAppleFlagUrl(d[0]),
    flag: flag(d[0]), 
    name: d[1], 
    symbol: d[2] 
  };
}

// ---- State ----
const state = {
  from: 'USD',
  to:   'EUR',
  usdRates: null,
  converting: false,
};

const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours (open.er-api.com)

// ---- DOM Elements ----
const fromAmountEl = document.getElementById('fromAmount');
const resultValueEl = document.getElementById('resultValue');
const swapBtn = document.getElementById('swapBtn');
const convertBtn = document.getElementById('convertBtn');
const rateInfoText = document.getElementById('rateInfoText');
const lastUpdated = document.getElementById('lastUpdated');

// ---- Formatting Helpers ----
function formatNum(n) {
  if (n >= 1000)  return n.toFixed(2);
  if (n >= 10)    return n.toFixed(3);
  if (n >= 0.01)  return n.toFixed(5);
  return n.toFixed(6);
}
function formatAmount(n) {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 }).format(n);
}

// ---- API (open.er-api.com - daily) ----
async function fetchUsdRates() {
  if (state.usdRates && state.rateTimestamp && Date.now() - state.rateTimestamp < CACHE_TTL) {
    return state.usdRates;
  }
  const res  = await fetch('https://open.er-api.com/v6/latest/USD');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.rates) throw new Error('API error');
  state.usdRates      = data.rates;
  state.rateTimestamp = Date.now();
  return state.usdRates;
}

function crossRate(rates, from, to) {
  if (from === to) return 1;
  const fromUsd = rates[from];
  const toUsd   = rates[to];
  if (!fromUsd || !toUsd) throw new Error(`No rate for ${from} or ${to}`);
  return toUsd / fromUsd;
}

// ---- Convert Logic ----
async function convert() {
  if (state.converting) return;
  const amount = parseFloat(fromAmountEl.value);
  if (!amount || isNaN(amount) || amount <= 0) {
    resultValueEl.textContent = '0.00';
    return;
  }

  state.converting = true;
  if (convertBtn) convertBtn.classList.add('loading');

  try {
    const rates     = await fetchUsdRates();
    const rate      = crossRate(rates, state.from, state.to);
    const converted = amount * rate;
    const inverse   = 1 / rate;

    // Update main result with smooth pulse animation
    resultValueEl.textContent = formatAmount(converted);
    resultValueEl.classList.remove('pulse');
    void resultValueEl.offsetWidth;
    resultValueEl.classList.add('pulse');

    // Update rate info texts if present
    if (rateInfoText) {
      rateInfoText.innerHTML = `1 ${state.from} = ${formatNum(rate)} ${state.to}<br>1 ${state.to} = ${formatNum(inverse)} ${state.from}`;
    }
    if (lastUpdated) {
      lastUpdated.textContent = 'Mid-market rate at ' + new Date().toISOString().substring(11, 16) + ' UTC';
    }

  } catch (err) {
    console.error(err);
    resultValueEl.textContent = 'Error';
  } finally {
    state.converting = false;
    if (convertBtn) convertBtn.classList.remove('loading');
  }
}

// ---- Custom Dropdown Logic ----
function buildDropdown(listEl, searchEl, side) {
  const codes = Object.keys(CURRENCY_DATA).sort();
  listEl.innerHTML = '';

  codes.forEach(code => {
    const meta = getMeta(code);
    const li   = document.createElement('li');
    li.className = 'cs-item';
    li.dataset.code = code;
    li.setAttribute('role', 'option');
    const flagHtml = meta.flagUrl 
      ? `<img src="${meta.flagUrl}" alt="${meta.flag}" style="width:20px;height:20px;object-fit:contain;vertical-align:middle;border-radius:2px;box-shadow:0 0 2px rgba(0,0,0,0.1);">` 
      : `<span class="cs-item-flag" style="font-size:1.2rem">${meta.flag}</span>`;
    
    li.innerHTML = `
      ${flagHtml}
      <span class="cs-item-code" style="font-weight:600;min-width:40px;margin-left:8px;">${code}</span>
      <span class="cs-item-name" style="font-size:0.8rem;color:#7a7a7a">${meta.name}</span>
    `;
    li.addEventListener('click', () => {
      selectCurrency(side, code);
      closeDropdown(side);
      convert();
    });
    listEl.appendChild(li);
  });

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
    document.getElementById(`${side}Empty`).style.display = visible === 0 ? 'block' : 'none';
  });
}

function selectCurrency(side, code) {
  const meta = getMeta(code);
  state[side] = code;

  const flagContainer = document.getElementById(`${side}Flag`);
  if (meta.flagUrl) {
    flagContainer.innerHTML = `<img src="${meta.flagUrl}" alt="${meta.flag}" style="width:24px;height:24px;object-fit:contain;vertical-align:middle;border-radius:3px;box-shadow:0 0 2px rgba(0,0,0,0.1);">`;
  } else {
    flagContainer.textContent = meta.flag;
  }
  
  document.getElementById(`${side}Code`).textContent = code;

  // Mark selected
  const listEl = document.getElementById(`${side}List`);
  listEl.querySelectorAll('.cs-item').forEach(el => {
    el.style.backgroundColor = el.dataset.code === code ? '#f5f5f5' : 'transparent';
  });
}

const panelOpen = { from: false, to: false };

function openDropdown(side) {
  const panel = document.getElementById(`${side}Panel`);
  const trigger = document.getElementById(`${side}Trigger`);
  const search = document.getElementById(`${side}Search`);
  
  const other = side === 'from' ? 'to' : 'from';
  if (panelOpen[other]) closeDropdown(other);

  panel.classList.add('open');
  trigger.setAttribute('aria-expanded', 'true');
  panelOpen[side] = true;
  search.value = '';
  document.getElementById(`${side}List`).querySelectorAll('.cs-item').forEach(el => el.classList.remove('hidden'));
  document.getElementById(`${side}Empty`).style.display = 'none';
  setTimeout(() => search.focus(), 50);
}

function closeDropdown(side) {
  const panel = document.getElementById(`${side}Panel`);
  const trigger = document.getElementById(`${side}Trigger`);
  panel.classList.remove('open');
  trigger.setAttribute('aria-expanded', 'false');
  panelOpen[side] = false;
}

function toggleDropdown(side) {
  panelOpen[side] ? closeDropdown(side) : openDropdown(side);
}

// ---- Event Listeners ----
if (convertBtn) convertBtn.addEventListener('click', convert);

// Copy Conversion Action
const copyBtn = document.getElementById('copyBtn');
const copyBtnLabel = document.getElementById('copyBtnLabel');
let copyTimeout;

if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const textToCopy = `${fromAmountEl.value} ${state.from} = ${resultValueEl.textContent} ${state.to}`;
    const onSuccess = () => {
      copyBtn.classList.add('copied');
      if (copyBtnLabel) copyBtnLabel.textContent = 'Copied to Clipboard!';
      clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        copyBtn.classList.remove('copied');
        if (copyBtnLabel) copyBtnLabel.textContent = 'Copy Conversion';
      }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        onSuccess();
        return;
      } catch (err) {
        console.warn('Clipboard API error, trying fallback', err);
      }
    }

    // Fallback for older browsers / permission denied contexts
    const tempInput = document.createElement('textarea');
    tempInput.value = textToCopy;
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      onSuccess();
    } catch (e) {
      console.error('Copy fallback failed', e);
    } finally {
      document.body.removeChild(tempInput);
    }
  });
}

let swapRotation = 0;
swapBtn.addEventListener('click', () => {
  swapRotation += 180;
  swapBtn.style.transform = `rotate(${swapRotation}deg)`;
  const tmp = state.from;
  selectCurrency('from', state.to);
  selectCurrency('to',   tmp);
  convert();
});

let debounce;
fromAmountEl.addEventListener('input', () => {
  clearTimeout(debounce);
  debounce = setTimeout(convert, 400);
});
fromAmountEl.addEventListener('keydown', e => { if(e.key === 'Enter') convert(); });

document.getElementById('fromTrigger').addEventListener('click', () => toggleDropdown('from'));
document.getElementById('toTrigger').addEventListener('click',   () => toggleDropdown('to'));

document.addEventListener('click', e => {
  ['from','to'].forEach(side => {
    if (!panelOpen[side]) return;
    const wrapper = document.getElementById(`${side}Wrapper`);
    if (!wrapper.contains(e.target)) closeDropdown(side);
  });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeDropdown('from'); closeDropdown('to'); }
});

// Smooth scroll to converter
const scrollCtaBtn = document.getElementById('scrollCtaBtn');
if (scrollCtaBtn) {
  scrollCtaBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById('workspace');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Enforce pure light theme
try { localStorage.removeItem('santerra_theme'); } catch(e) {}
document.documentElement.removeAttribute('data-theme');

// ==========================================
// Segmented Navigation & Tool Panels
// ==========================================
const navTabs = document.querySelectorAll('.nav-tab');
const toolPanels = document.querySelectorAll('.tool-panel');
const tabOrder = ['currency', 'loan', 'emi', 'investment'];
let currentTabIndex = 0;

function switchTool(tabName, animate = true) {
  const nextIndex = tabOrder.indexOf(tabName);
  const direction = nextIndex >= currentTabIndex ? 'slide-from-right' : 'slide-from-left';
  if (nextIndex !== -1) {
    currentTabIndex = nextIndex;
  }

  navTabs.forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
  });

  toolPanels.forEach(panel => {
    const isTarget = panel.id === `${tabName}Panel`;
    panel.classList.remove('active', 'slide-from-right', 'slide-from-left');
    if (isTarget) {
      // Force DOM reflow to restart CSS keyframe animations cleanly
      void panel.offsetWidth;
      panel.classList.add('active');
      if (animate) {
        panel.classList.add(direction);
      }
    }
  });
}

// ==========================================
// Locked Tools & Auth Prompt Modal
// ==========================================
const authPromptModal = document.getElementById('authPromptModal');
const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
const stayCurrencyBtn = document.getElementById('stayCurrencyBtn');
const lockedToolName = document.getElementById('lockedToolName');

const toolDisplayNames = {
  loan: 'Loan Calculator',
  emi: 'Installments Calculator',
  investment: 'Investment Calculator'
};

function openAuthPromptModal(toolKey) {
  if (lockedToolName && toolDisplayNames[toolKey]) {
    lockedToolName.textContent = toolDisplayNames[toolKey];
  }
  if (authPromptModal) {
    authPromptModal.classList.add('open');
    authPromptModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeAuthPromptModal() {
  if (authPromptModal) {
    authPromptModal.classList.remove('open');
    authPromptModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

if (closeAuthModalBtn) {
  closeAuthModalBtn.addEventListener('click', closeAuthPromptModal);
}

if (stayCurrencyBtn) {
  stayCurrencyBtn.addEventListener('click', closeAuthPromptModal);
}

if (authPromptModal) {
  authPromptModal.addEventListener('click', (e) => {
    if (e.target === authPromptModal) {
      closeAuthPromptModal();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && authPromptModal && authPromptModal.classList.contains('open')) {
    closeAuthPromptModal();
  }
});

navTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tabName = tab.getAttribute('data-tab');
    if (tabName !== 'currency') {
      const user = getSessionUser();
      if (!user) {
        openAuthPromptModal(tabName);
        return;
      }
    }
    switchTool(tabName, true);
  });
});

// Always ensure page reloads at the very top on Currency Converter only
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

function resetToTopAndCurrency() {
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  switchTool('currency', false);
  window.scrollTo(0, 0);
}

window.addEventListener('DOMContentLoaded', resetToTopAndCurrency);
window.addEventListener('load', resetToTopAndCurrency);

// ==========================================
// Helper Formatters & Copy Setup
// ==========================================
function formatCurrency(n) {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

function setupCopyAction(btnId, labelId, textGetter, defaultLabel) {
  const btn = document.getElementById(btnId);
  const label = document.getElementById(labelId);
  let timeout;
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const textToCopy = textGetter();
    const onSuccess = () => {
      btn.classList.add('copied');
      if (label) label.textContent = 'Copied to Clipboard!';
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        btn.classList.remove('copied');
        if (label) label.textContent = defaultLabel;
      }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        onSuccess();
        return;
      } catch (err) {
        console.warn('Clipboard API failed', err);
      }
    }

    const temp = document.createElement('textarea');
    temp.value = textToCopy;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    try {
      document.execCommand('copy');
      onSuccess();
    } catch (e) {
      console.error(e);
    } finally {
      document.body.removeChild(temp);
    }
  });
}

// ==========================================
// TOOL 2: Loan Calculator
// ==========================================
const loanAmountSlider = document.getElementById('loanAmountSlider');
const loanRateSlider = document.getElementById('loanRateSlider');
const loanTermSlider = document.getElementById('loanTermSlider');

const loanAmountBadge = document.getElementById('loanAmountBadge');
const loanRateBadge = document.getElementById('loanRateBadge');
const loanTermBadge = document.getElementById('loanTermBadge');

const loanMonthlyOutput = document.getElementById('loanMonthlyOutput');
const loanPrincipalOutput = document.getElementById('loanPrincipalOutput');
const loanInterestOutput = document.getElementById('loanInterestOutput');
const loanTotalOutput = document.getElementById('loanTotalOutput');

const loanPrincipalBar = document.getElementById('loanPrincipalBar');
const loanInterestBar = document.getElementById('loanInterestBar');
const loanPrincipalPct = document.getElementById('loanPrincipalPct');
const loanInterestPct = document.getElementById('loanInterestPct');

function calculateLoan() {
  if (!loanAmountSlider) return;
  const P = parseFloat(loanAmountSlider.value);
  const annualRate = parseFloat(loanRateSlider.value);
  const years = parseInt(loanTermSlider.value, 10);

  if (loanAmountBadge) loanAmountBadge.textContent = P.toLocaleString('en-US');
  if (loanRateBadge) loanRateBadge.textContent = annualRate.toFixed(1);
  if (loanTermBadge) loanTermBadge.textContent = years;

  const r = (annualRate / 100) / 12;
  const n = years * 12;

  let monthly = 0;
  if (r === 0) {
    monthly = P / n;
  } else {
    monthly = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalPayment = monthly * n;
  const totalInterest = totalPayment - P;

  if (loanMonthlyOutput) loanMonthlyOutput.textContent = formatCurrency(monthly);
  if (loanPrincipalOutput) loanPrincipalOutput.textContent = formatCurrency(P);
  if (loanInterestOutput) loanInterestOutput.textContent = formatCurrency(totalInterest);
  if (loanTotalOutput) loanTotalOutput.textContent = formatCurrency(totalPayment);

  const pPct = Math.round((P / totalPayment) * 100) || 50;
  const iPct = 100 - pPct;

  if (loanPrincipalBar) loanPrincipalBar.style.width = `${pPct}%`;
  if (loanInterestBar) loanInterestBar.style.width = `${iPct}%`;
  if (loanPrincipalPct) loanPrincipalPct.textContent = `${pPct}%`;
  if (loanInterestPct) loanInterestPct.textContent = `${iPct}%`;
}

if (loanAmountSlider) {
  [loanAmountSlider, loanRateSlider, loanTermSlider].forEach(slider => {
    slider.addEventListener('input', calculateLoan);
  });
}

setupCopyAction('copyLoanBtn', 'copyLoanLabel', () => {
  return `Loan Summary: Principal $${loanPrincipalOutput.textContent}, Monthly Payment $${loanMonthlyOutput.textContent}, Total Interest $${loanInterestOutput.textContent}, Total Payable $${loanTotalOutput.textContent}`;
}, 'Copy Loan Summary');

// ==========================================
// TOOL 3: EMI / Installment Calculator
// ==========================================
const emiTotalSlider = document.getElementById('emiTotalSlider');
const emiDownSlider = document.getElementById('emiDownSlider');
const emiRateSlider = document.getElementById('emiRateSlider');
const emiTenureSlider = document.getElementById('emiTenureSlider');

const emiTotalBadge = document.getElementById('emiTotalBadge');
const emiDownBadge = document.getElementById('emiDownBadge');
const emiRateBadge = document.getElementById('emiRateBadge');
const emiTenureBadge = document.getElementById('emiTenureBadge');

const emiMonthlyOutput = document.getElementById('emiMonthlyOutput');
const emiFinancedOutput = document.getElementById('emiFinancedOutput');
const emiInterestOutput = document.getElementById('emiInterestOutput');
const emiTotalPayableOutput = document.getElementById('emiTotalPayableOutput');
const tenureChips = document.querySelectorAll('.tenure-chip');

function calculateEmi() {
  if (!emiTotalSlider) return;
  const total = parseFloat(emiTotalSlider.value);
  let down = parseFloat(emiDownSlider.value);
  if (down > total) {
    down = total;
    emiDownSlider.value = down;
  }
  emiDownSlider.max = total;

  const annualRate = parseFloat(emiRateSlider.value);
  const months = parseInt(emiTenureSlider.value, 10);

  if (emiTotalBadge) emiTotalBadge.textContent = total.toLocaleString('en-US');
  if (emiDownBadge) emiDownBadge.textContent = down.toLocaleString('en-US');
  if (emiRateBadge) emiRateBadge.textContent = annualRate.toFixed(1);
  if (emiTenureBadge) emiTenureBadge.textContent = months;

  const P = Math.max(0, total - down);
  const r = (annualRate / 100) / 12;
  const n = months;

  let emi = 0;
  if (P === 0) {
    emi = 0;
  } else if (r === 0) {
    emi = P / n;
  } else {
    emi = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalRepayment = (emi * n) + down;
  const totalInterest = Math.max(0, (emi * n) - P);

  if (emiMonthlyOutput) emiMonthlyOutput.textContent = formatCurrency(emi);
  if (emiFinancedOutput) emiFinancedOutput.textContent = formatCurrency(P);
  if (emiInterestOutput) emiInterestOutput.textContent = formatCurrency(totalInterest);
  if (emiTotalPayableOutput) emiTotalPayableOutput.textContent = formatCurrency(totalRepayment);

  tenureChips.forEach(chip => {
    const tVal = parseInt(chip.getAttribute('data-tenure'), 10);
    chip.classList.toggle('active', tVal === months);
  });
}

if (emiTotalSlider) {
  [emiTotalSlider, emiDownSlider, emiRateSlider, emiTenureSlider].forEach(el => {
    el.addEventListener('input', calculateEmi);
  });

  tenureChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const val = parseInt(chip.getAttribute('data-tenure'), 10);
      emiTenureSlider.value = val;
      calculateEmi();
    });
  });
}

setupCopyAction('copyEmiBtn', 'copyEmiLabel', () => {
  return `Installment Details: Monthly $${emiMonthlyOutput.textContent}, Financed Loan $${emiFinancedOutput.textContent}, Total Interest $${emiInterestOutput.textContent}, Total Outlay $${emiTotalPayableOutput.textContent}`;
}, 'Copy Installment Details');

// ==========================================
// TOOL 4: Investment / Compound Growth
// ==========================================
const invInitialSlider = document.getElementById('invInitialSlider');
const invMonthlySlider = document.getElementById('invMonthlySlider');
const invRateSlider = document.getElementById('invRateSlider');
const invYearsSlider = document.getElementById('invYearsSlider');

const invInitialBadge = document.getElementById('invInitialBadge');
const invMonthlyBadge = document.getElementById('invMonthlyBadge');
const invRateBadge = document.getElementById('invRateBadge');
const invYearsBadge = document.getElementById('invYearsBadge');

const invFutureWealthOutput = document.getElementById('invFutureWealthOutput');
const invTotalInvestedOutput = document.getElementById('invTotalInvestedOutput');
const invTotalGainsOutput = document.getElementById('invTotalGainsOutput');

const invInvestedBar = document.getElementById('invInvestedBar');
const invGainBar = document.getElementById('invGainBar');
const invInvestedPct = document.getElementById('invInvestedPct');
const invGainPct = document.getElementById('invGainPct');

function calculateInvestment() {
  if (!invInitialSlider) return;
  const initial = parseFloat(invInitialSlider.value);
  const monthly = parseFloat(invMonthlySlider.value);
  const annualReturn = parseFloat(invRateSlider.value);
  const years = parseInt(invYearsSlider.value, 10);

  if (invInitialBadge) invInitialBadge.textContent = initial.toLocaleString('en-US');
  if (invMonthlyBadge) invMonthlyBadge.textContent = monthly.toLocaleString('en-US');
  if (invRateBadge) invRateBadge.textContent = annualReturn.toFixed(1);
  if (invYearsBadge) invYearsBadge.textContent = years;

  const r = (annualReturn / 100) / 12;
  const n = years * 12;

  const fvInitial = initial * Math.pow(1 + r, n);
  const fvMonthly = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r);
  const totalWealth = fvInitial + fvMonthly;
  const totalInvested = initial + (monthly * n);
  const totalGain = Math.max(0, totalWealth - totalInvested);

  if (invFutureWealthOutput) invFutureWealthOutput.textContent = formatCurrency(totalWealth);
  if (invTotalInvestedOutput) invTotalInvestedOutput.textContent = formatCurrency(totalInvested);
  if (invTotalGainsOutput) invTotalGainsOutput.textContent = formatCurrency(totalGain);

  const invPct = Math.round((totalInvested / totalWealth) * 100) || 50;
  const gainPct = 100 - invPct;

  if (invInvestedBar) invInvestedBar.style.width = `${invPct}%`;
  if (invGainBar) invGainBar.style.width = `${gainPct}%`;
  if (invInvestedPct) invInvestedPct.textContent = `${invPct}%`;
  if (invGainPct) invGainPct.textContent = `${gainPct}%`;
}

if (invInitialSlider) {
  [invInitialSlider, invMonthlySlider, invRateSlider, invYearsSlider].forEach(slider => {
    slider.addEventListener('input', calculateInvestment);
  });
}

setupCopyAction('copyInvBtn', 'copyInvLabel', () => {
  return `Investment Plan: Future Wealth $${invFutureWealthOutput.textContent}, Total Invested $${invTotalInvestedOutput.textContent}, Wealth Growth +$${invTotalGainsOutput.textContent}`;
}, 'Copy Investment Plan');

// ==========================================
// User Authentication State & Header
// ==========================================
function getSessionUser() {
  try {
    const raw = localStorage.getItem('santerra_user');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function updateHeaderAuth() {
  const headerAuth = document.getElementById('headerAuth');
  if (!headerAuth) return;

  const user = getSessionUser();
  if (user) {
    const displayName = user.name || (user.email ? user.email.split('@')[0] : 'User');
    const initial = displayName.charAt(0).toUpperCase();

    const avatarHtml = user.picture
      ? `<img src="${user.picture}" alt="${displayName}" class="user-avatar-img" referrerpolicy="no-referrer" />`
      : `<div class="user-avatar-initials">${initial}</div>`;

    headerAuth.innerHTML = `
      <div class="user-profile-pill" id="userProfilePill" tabindex="0" role="button" aria-haspopup="true" aria-expanded="false">
        ${avatarHtml}
        <span class="user-display-name">${displayName.split(' ')[0]}</span>
        <svg class="user-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </div>

      <div class="user-dropdown-menu" id="userDropdownMenu">
        <div class="user-menu-header">
          <span class="user-menu-name">${displayName}</span>
          <span class="user-menu-email">${user.email || ''}</span>
        </div>
        <button type="button" class="user-logout-btn" id="userLogoutBtn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          <span>Sign Out</span>
        </button>
      </div>
    `;

    const pill = document.getElementById('userProfilePill');
    const menu = document.getElementById('userDropdownMenu');
    const logoutBtn = document.getElementById('userLogoutBtn');

    if (pill && menu) {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.toggle('open');
        pill.classList.toggle('open', isOpen);
        pill.setAttribute('aria-expanded', isOpen);
      });

      document.addEventListener('click', (e) => {
        if (!headerAuth.contains(e.target)) {
          menu.classList.remove('open');
          pill.classList.remove('open');
          pill.setAttribute('aria-expanded', 'false');
        }
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('santerra_user');
        updateHeaderAuth();
      });
    }
  } else {
    headerAuth.innerHTML = `
      <a href="auth.html" class="header-login-btn" id="headerSignInBtn">Log in</a>
    `;
  }
}

// ---- Init ----
function init() {
  buildDropdown(document.getElementById('fromList'), document.getElementById('fromSearch'), 'from');
  buildDropdown(document.getElementById('toList'), document.getElementById('toSearch'), 'to');
  
  if (fromAmountEl) fromAmountEl.value = '1.00';
  selectCurrency('from', 'USD');
  selectCurrency('to', 'EUR');
  
  convert();
  calculateLoan();
  calculateEmi();
  calculateInvestment();
  updateHeaderAuth();
}

init();
