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

const CACHE_TTL = 60 * 60 * 1000; // 1 hour (exchangerate.fun)

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

// ---- API (exchangerate.fun - hourly) ----
async function fetchUsdRates() {
  if (state.usdRates && state.rateTimestamp && Date.now() - state.rateTimestamp < CACHE_TTL) {
    return state.usdRates;
  }
  const res  = await fetch('https://api.exchangerate.fun/latest?base=USD');
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
  convertBtn.classList.add('loading');

  try {
    const rates     = await fetchUsdRates();
    const rate      = crossRate(rates, state.from, state.to);
    const converted = amount * rate;
    const inverse   = 1 / rate;

    // Update main result
    resultValueEl.textContent = formatAmount(converted);

    // Update rate info texts
    rateInfoText.textContent = `1 ${state.from} = ${formatNum(rate)} ${state.to} • 1 ${state.to} = ${formatNum(inverse)} ${state.from}`;
    
    // Static text as per design image
    lastUpdated.textContent = 'Mid-market rate at ' + new Date().toISOString().substring(11, 16) + ' UTC';

  } catch (err) {
    console.error(err);
    resultValueEl.textContent = 'Error';
  } finally {
    state.converting = false;
    convertBtn.classList.remove('loading');
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
convertBtn.addEventListener('click', convert);

swapBtn.addEventListener('click', () => {
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

// ---- Init ----
function init() {
  buildDropdown(document.getElementById('fromList'), document.getElementById('fromSearch'), 'from');
  buildDropdown(document.getElementById('toList'), document.getElementById('toSearch'), 'to');
  
  selectCurrency('from', 'USD');
  selectCurrency('to', 'EUR');
  
  convert();
}

init();
