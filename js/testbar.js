/* === TEST BAR — Font & Color Scheme Previewer ===
   Toggle: Click the "Test" button at bottom-right of page
   Maps directly to DigitalWave's CSS custom properties on :root
   Remove this file + script tag when design is finalized         */

(function () {
  'use strict';

  /* =====================================================
     DISPLAY FONTS  (used by --font-display → headings, hero title)
  ===================================================== */
  var DISPLAY_FONTS = [
    { name: 'Cormorant Garamond', family: "'Cormorant Garamond', Georgia, serif",       gfont: 'Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600' },
    { name: 'Playfair Display',   family: "'Playfair Display', Georgia, serif",          gfont: 'Playfair+Display:ital,wght@0,400;0,700;1,400' },
    { name: 'DM Serif Display',   family: "'DM Serif Display', Georgia, serif",          gfont: 'DM+Serif+Display:ital@0;1' },
    { name: 'Fraunces',           family: "'Fraunces', Georgia, serif",                  gfont: 'Fraunces:ital,wght@0,400;0,700;1,400' },
    { name: 'Libre Baskerville',  family: "'Libre Baskerville', Georgia, serif",         gfont: 'Libre+Baskerville:ital,wght@0,400;0,700;1,400' },
    { name: 'Cardo',              family: "'Cardo', Georgia, serif",                     gfont: 'Cardo:ital,wght@0,400;0,700;1,400' },
    { name: 'Lora',               family: "'Lora', Georgia, serif",                      gfont: 'Lora:ital,wght@0,400;0,700;1,400' },
    { name: 'Raleway',            family: "'Raleway', sans-serif",                       gfont: 'Raleway:wght@300;400;600;700' },
    { name: 'Josefin Sans',       family: "'Josefin Sans', sans-serif",                  gfont: 'Josefin+Sans:wght@300;400;600;700' },
    { name: 'Montserrat',         family: "'Montserrat', sans-serif",                    gfont: 'Montserrat:wght@300;400;600;700' },
    { name: 'Space Grotesk',      family: "'Space Grotesk', sans-serif",                 gfont: 'Space+Grotesk:wght@300;400;600;700' },
    { name: 'Syne',               family: "'Syne', sans-serif",                          gfont: 'Syne:wght@400;600;700;800' },
    { name: 'Outfit',             family: "'Outfit', sans-serif",                         gfont: 'Outfit:wght@300;400;600;700' },
    { name: 'Bebas Neue',         family: "'Bebas Neue', Impact, sans-serif",             gfont: 'Bebas+Neue' },
    { name: 'Abril Fatface',      family: "'Abril Fatface', Georgia, serif",              gfont: 'Abril+Fatface' }
  ];

  /* =====================================================
     BODY FONTS  (used by --font-body → paragraphs, UI text)
  ===================================================== */
  var BODY_FONTS = [
    { name: 'Inter',              family: "'Inter', system-ui, sans-serif",               gfont: 'Inter:wght@400;500;600' },
    { name: 'DM Sans',            family: "'DM Sans', sans-serif",                        gfont: 'DM+Sans:wght@400;500;600' },
    { name: 'Outfit',             family: "'Outfit', sans-serif",                          gfont: 'Outfit:wght@400;500;600' },
    { name: 'Space Grotesk',      family: "'Space Grotesk', sans-serif",                  gfont: 'Space+Grotesk:wght@400;500;600' },
    { name: 'Plus Jakarta Sans',  family: "'Plus Jakarta Sans', sans-serif",               gfont: 'Plus+Jakarta+Sans:wght@400;500;600' },
    { name: 'Manrope',            family: "'Manrope', sans-serif",                         gfont: 'Manrope:wght@400;500;600' },
    { name: 'Work Sans',          family: "'Work Sans', sans-serif",                       gfont: 'Work+Sans:wght@400;500;600' },
    { name: 'Nunito Sans',        family: "'Nunito Sans', sans-serif",                     gfont: 'Nunito+Sans:wght@400;600' },
    { name: 'Mulish',             family: "'Mulish', sans-serif",                          gfont: 'Mulish:wght@400;500;600' },
    { name: 'Lato',               family: "'Lato', sans-serif",                            gfont: 'Lato:wght@400;700' }
  ];

  /* =====================================================
     COLOR SCHEMES
     Each scheme sets DigitalWave's exact CSS variables:
       --color-bg        hero / page background
       --color-surface   card / nav background
       --color-text      primary text (headings, body)
       --color-muted     secondary text (subheads, captions)
       --color-gold      primary accent (buttons, borders, labels)
       --accent          alias used by buttons & hover states
       --accent-hover    button hover
       --color-border    card borders, dividers (rgba)
       --color-gold-light  subtle accent bg on cards
       --color-gold-glow   glow/shadow accent
       --color-beige     secondary light text/decoration
  ===================================================== */
  var SCHEMES = [
    {
      name: 'Navy Gold',
      desc: 'Default — deep navy with warm gold',
      swatch: ['#0D1B2A', '#C9A84C'],
      vars: {
        '--color-bg':         '#0D1B2A',
        '--color-surface':    '#162030',
        '--color-text':       '#F4EFE6',
        '--color-muted':      '#6B7A8D',
        '--color-gold':       '#C9A84C',
        '--accent':           '#C9A84C',
        '--accent-hover':     '#D4B660',
        '--color-beige':      '#E8D8BC',
        '--color-border':     'rgba(201, 168, 76, 0.20)',
        '--color-gold-light': 'rgba(201, 168, 76, 0.12)',
        '--color-gold-glow':  'rgba(201, 168, 76, 0.25)'
      }
    },
    {
      name: 'Obsidian Silver',
      desc: 'True black with cool platinum',
      swatch: ['#0A0A0A', '#A8B4C0'],
      vars: {
        '--color-bg':         '#0A0A0A',
        '--color-surface':    '#131313',
        '--color-text':       '#ECEFF1',
        '--color-muted':      '#6A7580',
        '--color-gold':       '#A8B4C0',
        '--accent':           '#A8B4C0',
        '--accent-hover':     '#C0CCD8',
        '--color-beige':      '#D8E0E8',
        '--color-border':     'rgba(168, 180, 192, 0.20)',
        '--color-gold-light': 'rgba(168, 180, 192, 0.10)',
        '--color-gold-glow':  'rgba(168, 180, 192, 0.20)'
      }
    },
    {
      name: 'Forest Gold',
      desc: 'Deep forest green with warm gold',
      swatch: ['#0A1209', '#D4A94C'],
      vars: {
        '--color-bg':         '#0A1209',
        '--color-surface':    '#121C11',
        '--color-text':       '#F0F8EE',
        '--color-muted':      '#5E7A5A',
        '--color-gold':       '#D4A94C',
        '--accent':           '#D4A94C',
        '--accent-hover':     '#E0BB64',
        '--color-beige':      '#E8DCC0',
        '--color-border':     'rgba(212, 169, 76, 0.20)',
        '--color-gold-light': 'rgba(212, 169, 76, 0.12)',
        '--color-gold-glow':  'rgba(212, 169, 76, 0.25)'
      }
    },
    {
      name: 'Slate Copper',
      desc: 'Dark slate with warm copper',
      swatch: ['#121418', '#C87840'],
      vars: {
        '--color-bg':         '#121418',
        '--color-surface':    '#1C1E24',
        '--color-text':       '#F2EEE8',
        '--color-muted':      '#7A7060',
        '--color-gold':       '#C87840',
        '--accent':           '#C87840',
        '--accent-hover':     '#D88C50',
        '--color-beige':      '#E8D8C4',
        '--color-border':     'rgba(200, 120, 64, 0.22)',
        '--color-gold-light': 'rgba(200, 120, 64, 0.12)',
        '--color-gold-glow':  'rgba(200, 120, 64, 0.28)'
      }
    },
    {
      name: 'Midnight Teal',
      desc: 'Deep navy with vibrant teal',
      swatch: ['#071420', '#00C4B0'],
      vars: {
        '--color-bg':         '#071420',
        '--color-surface':    '#0D2030',
        '--color-text':       '#E0FFF8',
        '--color-muted':      '#4A8A80',
        '--color-gold':       '#00C4B0',
        '--accent':           '#00C4B0',
        '--accent-hover':     '#20D8C4',
        '--color-beige':      '#B0E8E0',
        '--color-border':     'rgba(0, 196, 176, 0.20)',
        '--color-gold-light': 'rgba(0, 196, 176, 0.10)',
        '--color-gold-glow':  'rgba(0, 196, 176, 0.25)'
      }
    },
    {
      name: 'Charcoal Rose',
      desc: 'Dark charcoal with warm rose gold',
      swatch: ['#141011', '#D4847A'],
      vars: {
        '--color-bg':         '#141011',
        '--color-surface':    '#1E1618',
        '--color-text':       '#FFF0EE',
        '--color-muted':      '#8A6A68',
        '--color-gold':       '#D4847A',
        '--accent':           '#D4847A',
        '--accent-hover':     '#E09A90',
        '--color-beige':      '#F0D8D4',
        '--color-border':     'rgba(212, 132, 122, 0.22)',
        '--color-gold-light': 'rgba(212, 132, 122, 0.12)',
        '--color-gold-glow':  'rgba(212, 132, 122, 0.28)'
      }
    },
    {
      name: 'Navy Platinum',
      desc: 'Deep navy with cool platinum sheen',
      swatch: ['#0D1827', '#BCC8D4'],
      vars: {
        '--color-bg':         '#0D1827',
        '--color-surface':    '#152030',
        '--color-text':       '#EEF4F8',
        '--color-muted':      '#607080',
        '--color-gold':       '#BCC8D4',
        '--accent':           '#BCC8D4',
        '--accent-hover':     '#D0DCE8',
        '--color-beige':      '#D8E4EC',
        '--color-border':     'rgba(188, 200, 212, 0.20)',
        '--color-gold-light': 'rgba(188, 200, 212, 0.10)',
        '--color-gold-glow':  'rgba(188, 200, 212, 0.20)'
      }
    },
    {
      name: 'Burgundy Gold',
      desc: 'Rich dark burgundy with gold',
      swatch: ['#130A0A', '#C9A84C'],
      vars: {
        '--color-bg':         '#130A0A',
        '--color-surface':    '#1E1010',
        '--color-text':       '#FFF0EC',
        '--color-muted':      '#8A6060',
        '--color-gold':       '#C9A84C',
        '--accent':           '#C9A84C',
        '--accent-hover':     '#D4B860',
        '--color-beige':      '#F0D8C8',
        '--color-border':     'rgba(201, 168, 76, 0.22)',
        '--color-gold-light': 'rgba(201, 168, 76, 0.12)',
        '--color-gold-glow':  'rgba(201, 168, 76, 0.28)'
      }
    },
    {
      name: 'Graphite Blue',
      desc: 'Dark graphite with electric blue',
      swatch: ['#0F1520', '#5B9BD5'],
      vars: {
        '--color-bg':         '#0F1520',
        '--color-surface':    '#172030',
        '--color-text':       '#E8F0F8',
        '--color-muted':      '#5A6A80',
        '--color-gold':       '#5B9BD5',
        '--accent':           '#5B9BD5',
        '--accent-hover':     '#70AEDD',
        '--color-beige':      '#C8DCED',
        '--color-border':     'rgba(91, 155, 213, 0.22)',
        '--color-gold-light': 'rgba(91, 155, 213, 0.12)',
        '--color-gold-glow':  'rgba(91, 155, 213, 0.28)'
      }
    },
    {
      name: 'Ink Amber',
      desc: 'Near-black with warm amber',
      swatch: ['#080808', '#D4922A'],
      vars: {
        '--color-bg':         '#080808',
        '--color-surface':    '#111111',
        '--color-text':       '#FFF8F0',
        '--color-muted':      '#7A6040',
        '--color-gold':       '#D4922A',
        '--accent':           '#D4922A',
        '--accent-hover':     '#E0A840',
        '--color-beige':      '#F0DCC0',
        '--color-border':     'rgba(212, 146, 42, 0.22)',
        '--color-gold-light': 'rgba(212, 146, 42, 0.12)',
        '--color-gold-glow':  'rgba(212, 146, 42, 0.30)'
      }
    },
    {
      name: 'Deep Indigo',
      desc: 'Dark indigo with warm gold',
      swatch: ['#0C0B1E', '#C9A84C'],
      vars: {
        '--color-bg':         '#0C0B1E',
        '--color-surface':    '#16152E',
        '--color-text':       '#F0EEF8',
        '--color-muted':      '#6860A0',
        '--color-gold':       '#C9A84C',
        '--accent':           '#C9A84C',
        '--accent-hover':     '#D4B860',
        '--color-beige':      '#E0D8F0',
        '--color-border':     'rgba(201, 168, 76, 0.22)',
        '--color-gold-light': 'rgba(201, 168, 76, 0.12)',
        '--color-gold-glow':  'rgba(201, 168, 76, 0.28)'
      }
    }
  ];

  /* =====================================================
     STATE
  ===================================================== */
  var loadedFonts = {};
  var bar = null;
  var isOpen = false;
  var toggleBtn = null;

  /* =====================================================
     HELPERS
  ===================================================== */
  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    return { r: parseInt(hex.substring(0,2),16), g: parseInt(hex.substring(2,4),16), b: parseInt(hex.substring(4,6),16) };
  }
  function rgbToHex(r,g,b) { return '#' + ((1<<24)+(Math.round(r)<<16)+(Math.round(g)<<8)+Math.round(b)).toString(16).slice(1); }
  function lighten(hex,a) { var c=hexToRgb(hex); return rgbToHex(c.r+(255-c.r)*a, c.g+(255-c.g)*a, c.b+(255-c.b)*a); }
  function darken(hex,a)  { var c=hexToRgb(hex); return rgbToHex(c.r*(1-a), c.g*(1-a), c.b*(1-a)); }

  function setVar(name, value) {
    document.documentElement.style.setProperty(name, value);
  }

  function loadFont(font) {
    if (!font.gfont || loadedFonts[font.name]) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=' + font.gfont + '&display=swap';
    document.head.appendChild(link);
    loadedFonts[font.name] = true;
  }

  function loadAllFonts() {
    var all = DISPLAY_FONTS.concat(BODY_FONTS);
    var families = [];
    all.forEach(function(f) { if (f.gfont && !loadedFonts[f.name]) { families.push(f.gfont); loadedFonts[f.name]=true; } });
    if (!families.length) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=' + families.join('&family=') + '&display=swap';
    document.head.appendChild(link);
  }

  /* =====================================================
     APPLY FUNCTIONS
  ===================================================== */
  function applyDisplayFont(index) {
    var font = DISPLAY_FONTS[index];
    loadFont(font);
    setVar('--font-display', font.family);
    localStorage.setItem('tb-dfont', index);
    updateActivePills('dfont', index);
  }

  function applyBodyFont(index) {
    var font = BODY_FONTS[index];
    loadFont(font);
    setVar('--font-body', font.family);
    localStorage.setItem('tb-bfont', index);
    updateActivePills('bfont', index);
  }

  function applyScheme(index) {
    var scheme = SCHEMES[index];
    Object.keys(scheme.vars).forEach(function(k) { setVar(k, scheme.vars[k]); });
    localStorage.setItem('tb-scheme', index);
    localStorage.removeItem('tb-custom-bg');
    localStorage.removeItem('tb-custom-accent');
    updateActivePills('scheme', index);
    syncPickers(scheme.vars['--color-bg'], scheme.vars['--color-gold']);
  }

  function applyCustom(bgHex, accentHex) {
    var bgRgb = hexToRgb(bgHex);
    var acRgb = hexToRgb(accentHex);
    setVar('--color-bg',         bgHex);
    setVar('--color-surface',    lighten(bgHex, 0.07));
    setVar('--color-text',       '#F4EFE6');
    setVar('--color-muted',      lighten(bgHex, 0.35));
    setVar('--color-gold',       accentHex);
    setVar('--accent',           accentHex);
    setVar('--accent-hover',     lighten(accentHex, 0.12));
    setVar('--color-beige',      lighten(accentHex, 0.35));
    setVar('--color-border',     'rgba('+acRgb.r+','+acRgb.g+','+acRgb.b+', 0.22)');
    setVar('--color-gold-light', 'rgba('+acRgb.r+','+acRgb.g+','+acRgb.b+', 0.12)');
    setVar('--color-gold-glow',  'rgba('+acRgb.r+','+acRgb.g+','+acRgb.b+', 0.28)');
    localStorage.setItem('tb-custom-bg', bgHex);
    localStorage.setItem('tb-custom-accent', accentHex);
    localStorage.removeItem('tb-scheme');
    updateActivePills('scheme', -1);
  }

  /* =====================================================
     GRADIENT COLOR HELPERS
  ===================================================== */
  var gradientColors = {
    c0:   '#C9A84C',   // blob 0 — gold
    c1:   '#093861',   // blob 1 — teal
    c2:   '#6B4710',   // blob 2 — amber
    base: '#0A1421'    // base — navy
  };

  function applyGradientColors() {
    if (window.__dwGradient) {
      window.__dwGradient.setColors(gradientColors.c0, gradientColors.c1, gradientColors.c2, gradientColors.base);
    }
    localStorage.setItem('tb-grad', JSON.stringify(gradientColors));
    syncGradientPickers();
  }

  function syncGradientPickers() {
    var fields = { 'tb-g0': 'c0', 'tb-g1': 'c1', 'tb-g2': 'c2', 'tb-gbase': 'base' };
    Object.keys(fields).forEach(function(id) {
      var key = fields[id];
      var picker = document.getElementById(id + '-picker');
      var hex    = document.getElementById(id + '-hex');
      if (picker) picker.value = gradientColors[key];
      if (hex)    hex.textContent = gradientColors[key];
    });
  }

  var CSS_PROPS = [
    '--color-bg','--color-surface','--color-text','--color-muted',
    '--color-gold','--accent','--accent-hover','--color-beige',
    '--color-border','--color-gold-light','--color-gold-glow',
    '--font-display','--font-body'
  ];

  function resetAll() {
    CSS_PROPS.forEach(function(p) { document.documentElement.style.removeProperty(p); });
    ['tb-dfont','tb-bfont','tb-scheme','tb-custom-bg','tb-custom-accent','tb-grad'].forEach(function(k) { localStorage.removeItem(k); });
    updateActivePills('dfont', 0);
    updateActivePills('bfont', 0);
    updateActivePills('scheme', 0);
    syncPickers('#0D1B2A', '#C9A84C');
    // reset gradient to defaults
    gradientColors = { c0: '#C9A84C', c1: '#093861', c2: '#6B4710', base: '#0A1421' };
    applyGradientColors();
  }

  function syncPickers(bg, accent) {
    var bgEl = document.getElementById('tb-bg-picker');
    var acEl = document.getElementById('tb-accent-picker');
    if (bgEl) { bgEl.value = bg; document.getElementById('tb-bg-hex').textContent = bg; }
    if (acEl) { acEl.value = accent; document.getElementById('tb-accent-hex').textContent = accent; }
  }

  function updateActivePills(type, index) {
    if (!bar) return;
    bar.querySelectorAll('[data-'+type+']').forEach(function(el) {
      el.classList[parseInt(el.getAttribute('data-'+type),10)===index ? 'add' : 'remove']('tb-active');
    });
  }

  /* =====================================================
     BUILD BAR
  ===================================================== */
  function buildFontRow(fonts, dataAttr, applyFn) {
    var row = document.createElement('div');
    row.className = 'tb-row';
    fonts.forEach(function(font, i) {
      var btn = document.createElement('button');
      btn.className = 'tb-pill';
      btn.setAttribute('data-'+dataAttr, i);
      btn.textContent = font.name;
      btn.style.fontFamily = font.family;
      btn.addEventListener('click', (function(idx){ return function(){ applyFn(idx); }; })(i));
      row.appendChild(btn);
    });
    return row;
  }

  function createBar() {
    bar = document.createElement('div');
    bar.id = 'dw-testbar';

    bar.innerHTML = '<style>' +
      '#dw-testbar{position:fixed;bottom:0;left:0;right:0;z-index:9997;' +
        'background:rgba(10,15,22,0.98);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);' +
        'border-top:1px solid rgba(201,168,76,0.18);' +
        'transform:translateY(100%);opacity:0;transition:transform .35s cubic-bezier(.22,1,.36,1),opacity .3s ease;' +
        'padding:18px 5%;overflow-y:auto;max-height:70vh;}' +
      '#dw-testbar.tb-open{transform:translateY(0);opacity:1;}' +
      '.tb-section{margin-bottom:16px;}' +
      '.tb-section:last-child{margin-bottom:0;}' +
      '.tb-section-head{display:flex;align-items:center;gap:10px;margin-bottom:8px;}' +
      '.tb-label{font-family:monospace;font-size:10px;color:rgba(201,168,76,0.7);text-transform:uppercase;letter-spacing:0.18em;flex-shrink:0;}' +
      '.tb-sublabel{font-family:monospace;font-size:9px;color:rgba(107,122,141,0.8);flex-shrink:0;}' +
      '.tb-divider{flex:1;height:1px;background:rgba(201,168,76,0.1);}' +
      '.tb-row{display:flex;align-items:center;gap:6px;flex-wrap:wrap;}' +
      '.tb-pill{padding:5px 11px;font-size:11px;border:1px solid rgba(201,168,76,0.18);' +
        'border-radius:999px;cursor:pointer;transition:all .15s ease;background:transparent;' +
        'color:rgba(244,239,230,0.65);white-space:nowrap;font-family:inherit;}' +
      '.tb-pill:hover{border-color:rgba(201,168,76,0.6);color:rgba(244,239,230,0.95);}' +
      '.tb-pill.tb-active{background:rgba(201,168,76,0.15);border-color:#C9A84C;color:#C9A84C;}' +
      '.tb-swatch-wrap{display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;}' +
      '.tb-swatch{width:30px;height:30px;border-radius:50%;border:2px solid rgba(255,255,255,0.12);' +
        'overflow:hidden;transition:all .15s ease;flex-shrink:0;position:relative;}' +
      '.tb-swatch:hover{border-color:rgba(255,255,255,0.5);transform:scale(1.1);}' +
      '.tb-swatch.tb-active{border-color:#C9A84C;transform:scale(1.15);box-shadow:0 0 10px rgba(201,168,76,0.4);}' +
      '.tb-swatch-half{position:absolute;top:0;bottom:0;width:50%;}' +
      '.tb-swatch-half:first-child{left:0;}' +
      '.tb-swatch-half:last-child{right:0;}' +
      '.tb-swatch-name{font-family:monospace;font-size:8px;color:rgba(107,122,141,0.8);text-align:center;white-space:nowrap;max-width:52px;overflow:hidden;text-overflow:ellipsis;}' +
      '.tb-custom-box{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:10px;' +
        'padding:12px 16px;background:rgba(201,168,76,0.04);border:1px solid rgba(201,168,76,0.1);border-radius:10px;}' +
      '.tb-custom-group{display:flex;align-items:center;gap:8px;}' +
      '.tb-custom-group-label{font-family:monospace;font-size:9px;color:rgba(107,122,141,0.8);text-transform:uppercase;letter-spacing:0.12em;}' +
      '.tb-color-input{width:34px;height:34px;border:2px solid rgba(201,168,76,0.25);border-radius:8px;' +
        'cursor:pointer;padding:0;background:none;-webkit-appearance:none;appearance:none;}' +
      '.tb-color-input::-webkit-color-swatch-wrapper{padding:0;}' +
      '.tb-color-input::-webkit-color-swatch{border:none;border-radius:5px;}' +
      '.tb-color-input:hover{border-color:rgba(201,168,76,0.6);}' +
      '.tb-color-hex{font-family:monospace;font-size:10px;color:rgba(107,122,141,0.9);min-width:58px;}' +
      '.tb-reset{padding:4px 11px;font-family:monospace;font-size:9px;border:1px solid rgba(201,168,76,0.2);' +
        'border-radius:999px;cursor:pointer;background:transparent;color:rgba(107,122,141,0.8);text-transform:uppercase;letter-spacing:0.12em;transition:all .15s ease;}' +
      '.tb-reset:hover{border-color:#FF4444;color:#FF4444;}' +
      '#dw-tb-toggle{position:fixed;bottom:20px;right:20px;z-index:9998;padding:9px 18px;' +
        'font-family:monospace;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;' +
        'color:#0D1B2A;background:#C9A84C;border:none;border-radius:999px;cursor:pointer;' +
        'box-shadow:0 4px 20px rgba(201,168,76,0.35);transition:all .2s ease;}' +
      '#dw-tb-toggle:hover{transform:scale(1.05);box-shadow:0 6px 28px rgba(201,168,76,0.5);}' +
      '#dw-tb-toggle.tb-btn-active{background:#162030;color:#C9A84C;border:1px solid rgba(201,168,76,0.35);box-shadow:none;}' +
    '</style>' +
    '<div id="tb-display-font-section" class="tb-section"></div>' +
    '<div id="tb-body-font-section" class="tb-section"></div>' +
    '<div id="tb-schemes-section" class="tb-section"></div>' +
    '<div id="tb-custom-section" class="tb-section"></div>' +
    '<div id="tb-gradient-section" class="tb-section"></div>';

    document.body.appendChild(bar);

    /* --- Display font section --- */
    var dispSection = bar.querySelector('#tb-display-font-section');
    dispSection.innerHTML = '<div class="tb-section-head"><span class="tb-label">Display Font</span><span class="tb-sublabel">Hero title &amp; headings</span><span class="tb-divider"></span></div>';
    dispSection.appendChild(buildFontRow(DISPLAY_FONTS, 'dfont', applyDisplayFont));

    /* --- Body font section --- */
    var bodySection = bar.querySelector('#tb-body-font-section');
    bodySection.innerHTML = '<div class="tb-section-head"><span class="tb-label">Body Font</span><span class="tb-sublabel">Paragraphs, buttons, UI text</span><span class="tb-divider"></span></div>';
    bodySection.appendChild(buildFontRow(BODY_FONTS, 'bfont', applyBodyFont));

    /* --- Color schemes section --- */
    var schemesSection = bar.querySelector('#tb-schemes-section');
    schemesSection.innerHTML = '<div class="tb-section-head"><span class="tb-label">Color Scheme</span><span class="tb-sublabel">Background + accent</span><span class="tb-divider"></span><button class="tb-reset" id="tb-reset-btn">Reset</button></div>';
    var swatchRow = document.createElement('div');
    swatchRow.className = 'tb-row';
    swatchRow.style.gap = '10px';

    SCHEMES.forEach(function(scheme, i) {
      var wrap = document.createElement('div');
      wrap.className = 'tb-swatch-wrap';
      wrap.title = scheme.desc;
      var swatch = document.createElement('div');
      swatch.className = 'tb-swatch';
      swatch.setAttribute('data-scheme', i);
      var h1 = document.createElement('div'); h1.className = 'tb-swatch-half'; h1.style.background = scheme.swatch[0];
      var h2 = document.createElement('div'); h2.className = 'tb-swatch-half'; h2.style.background = scheme.swatch[1]; h2.style.right = '0'; h2.style.left = 'auto';
      swatch.appendChild(h1); swatch.appendChild(h2);
      var label = document.createElement('div');
      label.className = 'tb-swatch-name';
      label.textContent = scheme.name;
      wrap.appendChild(swatch);
      wrap.appendChild(label);
      wrap.addEventListener('click', (function(idx){ return function(){ applyScheme(idx); }; })(i));
      swatchRow.appendChild(wrap);
    });
    schemesSection.appendChild(swatchRow);

    /* --- Custom color section --- */
    var customSection = bar.querySelector('#tb-custom-section');
    customSection.innerHTML = '<div class="tb-section-head"><span class="tb-label">Custom Colors</span><span class="tb-sublabel">Pick any background + accent</span><span class="tb-divider"></span></div>';

    var customBox = document.createElement('div');
    customBox.className = 'tb-custom-box';
    customBox.innerHTML =
      '<div class="tb-custom-group">' +
        '<span class="tb-custom-group-label">Background</span>' +
        '<input type="color" id="tb-bg-picker" class="tb-color-input" value="#0D1B2A">' +
        '<span class="tb-color-hex" id="tb-bg-hex">#0D1B2A</span>' +
      '</div>' +
      '<div class="tb-custom-group">' +
        '<span class="tb-custom-group-label">Accent</span>' +
        '<input type="color" id="tb-accent-picker" class="tb-color-input" value="#C9A84C">' +
        '<span class="tb-color-hex" id="tb-accent-hex">#C9A84C</span>' +
      '</div>';
    customSection.appendChild(customBox);

    /* --- Gradient colors section --- */
    var gradSection = bar.querySelector('#tb-gradient-section');
    gradSection.innerHTML =
      '<div class="tb-section-head"><span class="tb-label">Hero Gradient</span><span class="tb-sublabel">3 blob colors + background base</span><span class="tb-divider"></span></div>' +
      '<div class="tb-custom-box">' +
        '<div class="tb-custom-group"><span class="tb-custom-group-label">Blob 1</span><input type="color" id="tb-g0-picker" class="tb-color-input" value="' + gradientColors.c0 + '"><span class="tb-color-hex" id="tb-g0-hex">' + gradientColors.c0 + '</span></div>' +
        '<div class="tb-custom-group"><span class="tb-custom-group-label">Blob 2</span><input type="color" id="tb-g1-picker" class="tb-color-input" value="' + gradientColors.c1 + '"><span class="tb-color-hex" id="tb-g1-hex">' + gradientColors.c1 + '</span></div>' +
        '<div class="tb-custom-group"><span class="tb-custom-group-label">Blob 3</span><input type="color" id="tb-g2-picker" class="tb-color-input" value="' + gradientColors.c2 + '"><span class="tb-color-hex" id="tb-g2-hex">' + gradientColors.c2 + '</span></div>' +
        '<div class="tb-custom-group"><span class="tb-custom-group-label">Base</span><input type="color" id="tb-gbase-picker" class="tb-color-input" value="' + gradientColors.base + '"><span class="tb-color-hex" id="tb-gbase-hex">' + gradientColors.base + '</span></div>' +
      '</div>';

    gradSection.querySelector('#tb-g0-picker').addEventListener('input', function() {
      gradientColors.c0 = this.value;
      gradSection.querySelector('#tb-g0-hex').textContent = this.value;
      applyGradientColors();
    });
    gradSection.querySelector('#tb-g1-picker').addEventListener('input', function() {
      gradientColors.c1 = this.value;
      gradSection.querySelector('#tb-g1-hex').textContent = this.value;
      applyGradientColors();
    });
    gradSection.querySelector('#tb-g2-picker').addEventListener('input', function() {
      gradientColors.c2 = this.value;
      gradSection.querySelector('#tb-g2-hex').textContent = this.value;
      applyGradientColors();
    });
    gradSection.querySelector('#tb-gbase-picker').addEventListener('input', function() {
      gradientColors.base = this.value;
      gradSection.querySelector('#tb-gbase-hex').textContent = this.value;
      applyGradientColors();
    });

    /* --- Events --- */
    bar.querySelector('#tb-reset-btn').addEventListener('click', resetAll);

    var bgPicker = bar.querySelector('#tb-bg-picker');
    var acPicker = bar.querySelector('#tb-accent-picker');

    bgPicker.addEventListener('input', function() {
      document.getElementById('tb-bg-hex').textContent = bgPicker.value;
      applyCustom(bgPicker.value, acPicker.value);
    });
    acPicker.addEventListener('input', function() {
      document.getElementById('tb-accent-hex').textContent = acPicker.value;
      applyCustom(bgPicker.value, acPicker.value);
    });
  }

  /* =====================================================
     TOGGLE
  ===================================================== */
  function toggleBar() {
    if (!bar) { createBar(); loadAllFonts(); restoreSaved(); }
    isOpen = !isOpen;
    bar.classList[isOpen ? 'add' : 'remove']('tb-open');
    toggleBtn.classList[isOpen ? 'add' : 'remove']('tb-btn-active');
    toggleBtn.textContent = isOpen ? 'Close' : 'Test';
  }

  /* =====================================================
     RESTORE SAVED STATE
  ===================================================== */
  function restoreSaved() {
    var di = localStorage.getItem('tb-dfont');
    var bi = localStorage.getItem('tb-bfont');
    var si = localStorage.getItem('tb-scheme');
    var bg = localStorage.getItem('tb-custom-bg');
    var ac = localStorage.getItem('tb-custom-accent');
    if (di !== null) { applyDisplayFont(parseInt(di,10)); }
    if (bi !== null) { applyBodyFont(parseInt(bi,10)); }
    if (si !== null) { applyScheme(parseInt(si,10)); }
    else if (bg && ac) { applyCustom(bg, ac); syncPickers(bg, ac); }
    else { updateActivePills('scheme', 0); }
  }

  /* =====================================================
     INIT
  ===================================================== */
  document.addEventListener('DOMContentLoaded', function() {
    toggleBtn = document.createElement('button');
    toggleBtn.id = 'dw-tb-toggle';
    toggleBtn.textContent = 'Test';
    toggleBtn.addEventListener('click', toggleBar);
    document.body.appendChild(toggleBtn);

    /* apply saved state on load even if bar is closed */
    var di = localStorage.getItem('tb-dfont');
    var bi = localStorage.getItem('tb-bfont');
    var si = localStorage.getItem('tb-scheme');
    var bg = localStorage.getItem('tb-custom-bg');
    var ac = localStorage.getItem('tb-custom-accent');
    var gr = localStorage.getItem('tb-grad');
    if (di !== null) { var df = DISPLAY_FONTS[parseInt(di,10)]; if(df){loadFont(df);setVar('--font-display',df.family);} }
    if (bi !== null) { var bf = BODY_FONTS[parseInt(bi,10)];    if(bf){loadFont(bf);setVar('--font-body',bf.family);} }
    if (si !== null) { var s = SCHEMES[parseInt(si,10)]; if(s){ Object.keys(s.vars).forEach(function(k){setVar(k,s.vars[k]);}); } }
    else if (bg && ac) { applyCustom(bg, ac); }
    if (gr) { try { var saved = JSON.parse(gr); Object.assign(gradientColors, saved); applyGradientColors(); } catch(e){} }
  });

})();
