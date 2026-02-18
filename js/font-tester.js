(function() {
  'use strict';

  // --- Font pairs (1-4 are favorites, 5-10 are new, 11 is current reference) ---

  var fontPairs = [
    {
      label: 'Playfair Display + Inter',
      display: "'Playfair Display', Georgia, serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600&display=swap'
    },
    {
      label: 'Fraunces + Source Sans 3',
      display: "'Fraunces', Georgia, serif",
      body: "'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      url: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,400&family=Source+Sans+3:wght@400;500;600&display=swap'
    },
    {
      label: 'Lora + Nunito Sans',
      display: "'Lora', Georgia, serif",
      body: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      url: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Nunito+Sans:wght@400;500;600&display=swap'
    },
    {
      label: 'Source Serif 4 + IBM Plex Sans',
      display: "'Source Serif 4', Georgia, serif",
      body: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      url: 'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,700;1,8..60,400&family=IBM+Plex+Sans:wght@400;500;600&display=swap'
    },
    {
      label: 'Cormorant Garamond + Outfit',
      display: "'Cormorant Garamond', Georgia, serif",
      body: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      url: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Outfit:wght@400;500;600&display=swap'
    },
    {
      label: 'DM Serif Display + DM Sans',
      display: "'DM Serif Display', Georgia, serif",
      body: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      url: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap'
    },
    {
      label: 'Libre Baskerville + Karla',
      display: "'Libre Baskerville', Georgia, serif",
      body: "'Karla', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      url: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Karla:wght@400;500;600&display=swap'
    },
    {
      label: 'Crimson Pro + Manrope',
      display: "'Crimson Pro', Georgia, serif",
      body: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      url: 'https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,700;1,400&family=Manrope:wght@400;500;600&display=swap'
    },
    {
      label: 'EB Garamond + Figtree',
      display: "'EB Garamond', Georgia, serif",
      body: "'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      url: 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400&family=Figtree:wght@400;500;600&display=swap'
    },
    {
      label: 'Spectral + Work Sans',
      display: "'Spectral', Georgia, serif",
      body: "'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      url: 'https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,600;1,400&family=Work+Sans:wght@400;500;600&display=swap'
    },
    {
      label: 'Instrument Serif + DM Sans (current)',
      display: "'Instrument Serif', Georgia, serif",
      body: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      url: null
    }
  ];

  // --- Full color themes (swap everything: bg, text, accent, borders, nav, footer) ---

  var themes = [
    {
      label: 'Warm Editorial (current)',
      swatch: '#C4653A',
      vars: {
        '--bg': '#FAF8F5',
        '--bg-alt': '#F2EDE8',
        '--bg-dark': '#1A1612',
        '--bg-dark-alt': '#231E19',
        '--text': '#1A1612',
        '--text-light': '#6B6560',
        '--text-on-dark': '#FAF8F5',
        '--text-on-dark-muted': 'rgba(250, 248, 245, 0.6)',
        '--accent': '#C4653A',
        '--accent-hover': '#A8522E',
        '--accent-light': 'rgba(196, 101, 58, 0.08)',
        '--accent-glow': 'rgba(196, 101, 58, 0.15)',
        '--border': 'rgba(26, 22, 18, 0.08)',
        '--border-dark': 'rgba(26, 22, 18, 0.15)',
        '--overlay': 'rgba(26, 22, 18, 0.5)',
        '--shadow-accent': '0 4px 20px rgba(196, 101, 58, 0.2)'
      }
    },
    {
      label: 'Dark Espresso',
      swatch: '#1A1612',
      vars: {
        '--bg': '#1A1612',
        '--bg-alt': '#231E19',
        '--bg-dark': '#0F0D0A',
        '--bg-dark-alt': '#141210',
        '--text': '#F2EDE8',
        '--text-light': '#A89E94',
        '--text-on-dark': '#F2EDE8',
        '--text-on-dark-muted': 'rgba(242, 237, 232, 0.6)',
        '--accent': '#C4A265',
        '--accent-hover': '#D4B275',
        '--accent-light': 'rgba(196, 162, 101, 0.1)',
        '--accent-glow': 'rgba(196, 162, 101, 0.15)',
        '--border': 'rgba(242, 237, 232, 0.08)',
        '--border-dark': 'rgba(242, 237, 232, 0.15)',
        '--overlay': 'rgba(15, 13, 10, 0.7)',
        '--shadow-accent': '0 4px 20px rgba(196, 162, 101, 0.2)'
      }
    },
    {
      label: 'Cool Ivory',
      swatch: '#2D4A7A',
      vars: {
        '--bg': '#F5F5F8',
        '--bg-alt': '#EAEAEF',
        '--bg-dark': '#2D3142',
        '--bg-dark-alt': '#363B50',
        '--text': '#2D3142',
        '--text-light': '#6B7080',
        '--text-on-dark': '#F5F5F8',
        '--text-on-dark-muted': 'rgba(245, 245, 248, 0.6)',
        '--accent': '#2D4A7A',
        '--accent-hover': '#243D64',
        '--accent-light': 'rgba(45, 74, 122, 0.08)',
        '--accent-glow': 'rgba(45, 74, 122, 0.15)',
        '--border': 'rgba(45, 49, 66, 0.08)',
        '--border-dark': 'rgba(45, 49, 66, 0.15)',
        '--overlay': 'rgba(45, 49, 66, 0.5)',
        '--shadow-accent': '0 4px 20px rgba(45, 74, 122, 0.2)'
      }
    },
    {
      label: 'Ink',
      swatch: '#4F7FFF',
      vars: {
        '--bg': '#0F0F14',
        '--bg-alt': '#181820',
        '--bg-dark': '#08080C',
        '--bg-dark-alt': '#0C0C12',
        '--text': '#E8E8ED',
        '--text-light': '#8888A0',
        '--text-on-dark': '#E8E8ED',
        '--text-on-dark-muted': 'rgba(232, 232, 237, 0.6)',
        '--accent': '#4F7FFF',
        '--accent-hover': '#6B93FF',
        '--accent-light': 'rgba(79, 127, 255, 0.08)',
        '--accent-glow': 'rgba(79, 127, 255, 0.15)',
        '--border': 'rgba(232, 232, 237, 0.08)',
        '--border-dark': 'rgba(232, 232, 237, 0.15)',
        '--overlay': 'rgba(15, 15, 20, 0.7)',
        '--shadow-accent': '0 4px 20px rgba(79, 127, 255, 0.2)'
      }
    },
    {
      label: 'Parchment',
      swatch: '#3A7D5C',
      vars: {
        '--bg': '#F5EDE0',
        '--bg-alt': '#EBE0D0',
        '--bg-dark': '#3D2E1F',
        '--bg-dark-alt': '#4A3828',
        '--text': '#3D2E1F',
        '--text-light': '#7A6B5A',
        '--text-on-dark': '#F5EDE0',
        '--text-on-dark-muted': 'rgba(245, 237, 224, 0.6)',
        '--accent': '#3A7D5C',
        '--accent-hover': '#2E6349',
        '--accent-light': 'rgba(58, 125, 92, 0.08)',
        '--accent-glow': 'rgba(58, 125, 92, 0.15)',
        '--border': 'rgba(61, 46, 31, 0.08)',
        '--border-dark': 'rgba(61, 46, 31, 0.15)',
        '--overlay': 'rgba(61, 46, 31, 0.5)',
        '--shadow-accent': '0 4px 20px rgba(58, 125, 92, 0.2)'
      }
    },
    {
      label: 'Midnight Plum',
      swatch: '#C47A8A',
      vars: {
        '--bg': '#141420',
        '--bg-alt': '#1C1C2E',
        '--bg-dark': '#0C0C18',
        '--bg-dark-alt': '#101020',
        '--text': '#D4D0E0',
        '--text-light': '#9490A8',
        '--text-on-dark': '#D4D0E0',
        '--text-on-dark-muted': 'rgba(212, 208, 224, 0.6)',
        '--accent': '#C47A8A',
        '--accent-hover': '#D48A9A',
        '--accent-light': 'rgba(196, 122, 138, 0.1)',
        '--accent-glow': 'rgba(196, 122, 138, 0.15)',
        '--border': 'rgba(212, 208, 224, 0.08)',
        '--border-dark': 'rgba(212, 208, 224, 0.12)',
        '--overlay': 'rgba(20, 20, 32, 0.7)',
        '--shadow-accent': '0 4px 20px rgba(196, 122, 138, 0.2)'
      }
    },
    {
      label: 'Cloud',
      swatch: '#E8734A',
      vars: {
        '--bg': '#FFFFFF',
        '--bg-alt': '#F4F4F4',
        '--bg-dark': '#1A1A1A',
        '--bg-dark-alt': '#252525',
        '--text': '#333333',
        '--text-light': '#777777',
        '--text-on-dark': '#FFFFFF',
        '--text-on-dark-muted': 'rgba(255, 255, 255, 0.6)',
        '--accent': '#E8734A',
        '--accent-hover': '#D4633A',
        '--accent-light': 'rgba(232, 115, 74, 0.08)',
        '--accent-glow': 'rgba(232, 115, 74, 0.15)',
        '--border': 'rgba(0, 0, 0, 0.08)',
        '--border-dark': 'rgba(0, 0, 0, 0.12)',
        '--overlay': 'rgba(0, 0, 0, 0.5)',
        '--shadow-accent': '0 4px 20px rgba(232, 115, 74, 0.2)'
      }
    },
    {
      label: 'Tobacco',
      swatch: '#B85C38',
      vars: {
        '--bg': '#2A2018',
        '--bg-alt': '#342820',
        '--bg-dark': '#1A1410',
        '--bg-dark-alt': '#201A14',
        '--text': '#E8DFD5',
        '--text-light': '#A89888',
        '--text-on-dark': '#E8DFD5',
        '--text-on-dark-muted': 'rgba(232, 223, 213, 0.6)',
        '--accent': '#B85C38',
        '--accent-hover': '#CA6C48',
        '--accent-light': 'rgba(184, 92, 56, 0.1)',
        '--accent-glow': 'rgba(184, 92, 56, 0.15)',
        '--border': 'rgba(232, 223, 213, 0.08)',
        '--border-dark': 'rgba(232, 223, 213, 0.12)',
        '--overlay': 'rgba(26, 20, 16, 0.7)',
        '--shadow-accent': '0 4px 20px rgba(184, 92, 56, 0.2)'
      }
    }
  ];

  // --- Video overlay effects (radio-style: one at a time, swaps out) ---

  var overlayEffects = [
    {
      label: 'Screen Bars',
      id: 'ft-screenbars',
      type: 'img'
    },
    {
      label: 'Scanlines',
      id: 'ft-scanlines',
      type: 'css',
      css: 'content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px);'
    },
    {
      label: 'Noise',
      id: 'ft-noise',
      type: 'css',
      css: 'content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E");opacity:0.12;'
    },
    {
      label: 'Vignette',
      id: 'ft-vignette',
      type: 'css',
      css: 'content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,0.6) 100%);'
    },
    {
      label: 'Dot Grid',
      id: 'ft-dotgrid',
      type: 'css',
      css: 'content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background-image:radial-gradient(rgba(255,255,255,0.15) 1px,transparent 1px);background-size:8px 8px;'
    },
    {
      label: 'Diagonal Lines',
      id: 'ft-diagonal',
      type: 'css',
      css: 'content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background:repeating-linear-gradient(45deg,transparent,transparent 4px,rgba(0,0,0,0.1) 4px,rgba(0,0,0,0.1) 5px);'
    },
    {
      label: 'Color Wash',
      id: 'ft-colorwash',
      type: 'css',
      css: 'content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background:linear-gradient(135deg,rgba(79,127,255,0.15),rgba(196,101,58,0.15));mix-blend-mode:overlay;'
    }
  ];

  var activeOverlay = null;
  var overlayStyleEl = null;

  function applyOverlay(id) {
    var imgEl = document.querySelector('.hero-img-overlay');
    // Toggle off if clicking the active one
    if (activeOverlay === id) {
      activeOverlay = null;
      if (imgEl) imgEl.style.display = 'none';
      if (overlayStyleEl) overlayStyleEl.textContent = '';
      updateOverlayButtons();
      overlayLabel.textContent = 'None';
      return;
    }
    activeOverlay = id;
    var effect = overlayEffects.find(function(e) { return e.id === id; });
    if (!effect) return;
    // Hide img overlay first
    if (imgEl) imgEl.style.display = 'none';
    if (!overlayStyleEl) {
      overlayStyleEl = document.createElement('style');
      overlayStyleEl.id = 'ft-overlay-styles';
      document.head.appendChild(overlayStyleEl);
    }
    overlayStyleEl.textContent = '';
    if (effect.type === 'img') {
      if (imgEl) imgEl.style.display = 'block';
    } else {
      overlayStyleEl.textContent = '.hero::after{' + effect.css + '}';
    }
    updateOverlayButtons();
    overlayLabel.textContent = effect.label;
  }

  function updateOverlayButtons() {
    var btns = overlayRow.querySelectorAll('.ft-overlay-btn');
    var accent = themes[activeTheme].vars['--accent'];
    for (var i = 0; i < btns.length; i++) {
      var isActive = btns[i].dataset.id === activeOverlay;
      btns[i].style.background = isActive ? accent : 'transparent';
      btns[i].style.color = isActive ? '#fff' : '#1A1612';
      btns[i].style.borderColor = isActive ? accent : '#ddd';
    }
  }

  // --- Hero text position presets ---

  var textPositions = [
    { label: 'Center', id: 'pos-center', justify: 'center', padding: '0 8%' },
    { label: 'Lower', id: 'pos-lower', justify: 'flex-end', padding: '0 8% 12vh' },
    { label: 'Low', id: 'pos-low', justify: 'flex-end', padding: '0 8% 6vh' },
    { label: 'Upper', id: 'pos-upper', justify: 'flex-start', padding: 'calc(var(--header-height) + 8vh) 8% 0' }
  ];

  var activePosition = 'pos-lower';

  function applyPosition(id) {
    activePosition = id;
    var pos = textPositions.find(function(p) { return p.id === id; });
    if (!pos) return;
    var hero = document.querySelector('.hero');
    if (hero) {
      hero.style.justifyContent = pos.justify;
      hero.style.padding = pos.padding;
    }
    updatePositionButtons();
    posLabel.textContent = pos.label;
  }

  function updatePositionButtons() {
    var btns = posRow.querySelectorAll('.ft-pos-btn');
    var accent = themes[activeTheme].vars['--accent'];
    for (var i = 0; i < btns.length; i++) {
      var isActive = btns[i].dataset.id === activePosition;
      btns[i].style.background = isActive ? accent : 'transparent';
      btns[i].style.color = isActive ? '#fff' : '#1A1612';
      btns[i].style.borderColor = isActive ? accent : '#ddd';
    }
  }

  var loadedFonts = {};
  var activeFont = 0;
  var activeTheme = 0;

  // --- Utilities ---

  function loadFont(url, cb) {
    if (!url || loadedFonts[url]) { cb(); return; }
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.onload = function() { loadedFonts[url] = true; cb(); };
    link.onerror = cb;
    document.head.appendChild(link);
  }

  // --- Apply functions ---

  function applyFont(index) {
    var pair = fontPairs[index];
    activeFont = index;
    loadFont(pair.url, function() {
      document.documentElement.style.setProperty('--font-display', pair.display);
      document.documentElement.style.setProperty('--font-body', pair.body);
    });
    updateFontButtons();
    fontLabel.textContent = pair.label;
  }

  function applyTheme(index) {
    var theme = themes[index];
    activeTheme = index;
    var vars = theme.vars;
    for (var key in vars) {
      if (vars.hasOwnProperty(key)) {
        document.documentElement.style.setProperty(key, vars[key]);
      }
    }
    // Update nav glassmorphism to match new bg
    var navBg = vars['--bg'];
    var r = parseInt(navBg.slice(1, 3), 16);
    var g = parseInt(navBg.slice(3, 5), 16);
    var b = parseInt(navBg.slice(5, 7), 16);
    document.documentElement.style.setProperty('--nav-bg-scroll', 'rgba(' + r + ', ' + g + ', ' + b + ', 0.85)');

    updateThemeButtons();
    themeLabel.textContent = theme.label;
  }

  function updateFontButtons() {
    var btns = fontRow.querySelectorAll('.ft-font-btn');
    var accent = themes[activeTheme].vars['--accent'];
    for (var i = 0; i < btns.length; i++) {
      var isActive = i === activeFont;
      btns[i].style.background = isActive ? accent : 'transparent';
      btns[i].style.color = isActive ? '#fff' : '#1A1612';
      btns[i].style.borderColor = isActive ? accent : '#ddd';
    }
  }

  function updateThemeButtons() {
    var btns = themeRow.querySelectorAll('.ft-theme-btn');
    for (var i = 0; i < btns.length; i++) {
      var isActive = i === activeTheme;
      btns[i].style.outline = isActive ? '2px solid #1A1612' : '2px solid transparent';
      btns[i].style.outlineOffset = isActive ? '2px' : '0';
    }
    updateFontButtons();
  }

  function resetAll() {
    // Remove all theme vars
    var allVars = themes[0].vars;
    for (var key in allVars) {
      if (allVars.hasOwnProperty(key)) {
        document.documentElement.style.removeProperty(key);
      }
    }
    document.documentElement.style.removeProperty('--font-display');
    document.documentElement.style.removeProperty('--font-body');
    document.documentElement.style.removeProperty('--nav-bg-scroll');
    activeOverlay = null;
    if (overlayStyleEl) { overlayStyleEl.textContent = ''; }
    var imgEl = document.querySelector('.hero-img-overlay');
    if (imgEl) imgEl.style.display = 'none';
    var hero = document.querySelector('.hero');
    if (hero) {
      hero.style.justifyContent = '';
      hero.style.padding = '';
    }
  }

  // --- Build toolbar ---

  var bar = document.createElement('div');
  bar.id = 'fontTester';
  bar.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:9999;background:#fff;border-bottom:2px solid #C4653A;padding:8px 16px;font-family:system-ui,sans-serif;font-size:13px;box-shadow:0 2px 12px rgba(0,0,0,0.1);';

  // --- Row 1: Fonts ---

  var fontRow = document.createElement('div');
  fontRow.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:6px;';

  var fontTitle = document.createElement('span');
  fontTitle.textContent = 'Fonts:';
  fontTitle.style.cssText = 'font-weight:700;color:#1A1612;white-space:nowrap;min-width:52px;';
  fontRow.appendChild(fontTitle);

  var fontBtnWrap = document.createElement('div');
  fontBtnWrap.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap;';

  for (var i = 0; i < fontPairs.length; i++) {
    var fbtn = document.createElement('button');
    fbtn.className = 'ft-font-btn';
    fbtn.textContent = (i + 1);
    fbtn.title = fontPairs[i].label;
    fbtn.style.cssText = 'width:28px;height:28px;border-radius:50%;border:1px solid #ddd;cursor:pointer;font-size:12px;font-weight:600;transition:all 0.15s;background:transparent;color:#1A1612;';
    fbtn.dataset.index = i;
    fbtn.addEventListener('click', function() { applyFont(parseInt(this.dataset.index)); });
    fontBtnWrap.appendChild(fbtn);
  }
  fontRow.appendChild(fontBtnWrap);

  var prevFont = document.createElement('button');
  prevFont.textContent = '\u2190';
  prevFont.title = 'Previous font (Alt+Left)';
  prevFont.style.cssText = 'border:1px solid #ddd;background:transparent;border-radius:4px;padding:4px 8px;cursor:pointer;font-size:14px;';
  prevFont.addEventListener('click', function() { applyFont((activeFont - 1 + fontPairs.length) % fontPairs.length); });
  fontRow.appendChild(prevFont);

  var nextFont = document.createElement('button');
  nextFont.textContent = '\u2192';
  nextFont.title = 'Next font (Alt+Right)';
  nextFont.style.cssText = 'border:1px solid #ddd;background:transparent;border-radius:4px;padding:4px 8px;cursor:pointer;font-size:14px;';
  nextFont.addEventListener('click', function() { applyFont((activeFont + 1) % fontPairs.length); });
  fontRow.appendChild(nextFont);

  var fontLabel = document.createElement('span');
  fontLabel.style.cssText = 'color:#6B6560;white-space:nowrap;margin-left:auto;';
  fontLabel.textContent = fontPairs[0].label;
  fontRow.appendChild(fontLabel);

  bar.appendChild(fontRow);

  // --- Row 2: Themes ---

  var themeRow = document.createElement('div');
  themeRow.style.cssText = 'display:flex;align-items:center;gap:8px;';

  var themeTitle = document.createElement('span');
  themeTitle.textContent = 'Theme:';
  themeTitle.style.cssText = 'font-weight:700;color:#1A1612;white-space:nowrap;min-width:52px;';
  themeRow.appendChild(themeTitle);

  var themeBtnWrap = document.createElement('div');
  themeBtnWrap.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;';

  for (var j = 0; j < themes.length; j++) {
    var tbtn = document.createElement('button');
    tbtn.className = 'ft-theme-btn';
    tbtn.title = themes[j].label;
    // Two-tone swatch: left half = bg, right half = accent
    var bg = themes[j].vars['--bg'];
    var acc = themes[j].vars['--accent'];
    tbtn.style.cssText = 'width:24px;height:24px;border-radius:50%;border:1px solid #ccc;cursor:pointer;transition:all 0.15s;outline:2px solid transparent;outline-offset:0;background:linear-gradient(135deg, ' + bg + ' 50%, ' + acc + ' 50%);';
    tbtn.dataset.index = j;
    tbtn.addEventListener('click', function() { applyTheme(parseInt(this.dataset.index)); });
    themeBtnWrap.appendChild(tbtn);
  }
  themeRow.appendChild(themeBtnWrap);

  var prevTheme = document.createElement('button');
  prevTheme.textContent = '\u2190';
  prevTheme.title = 'Previous theme (Alt+Up)';
  prevTheme.style.cssText = 'border:1px solid #ddd;background:transparent;border-radius:4px;padding:4px 8px;cursor:pointer;font-size:14px;';
  prevTheme.addEventListener('click', function() { applyTheme((activeTheme - 1 + themes.length) % themes.length); });
  themeRow.appendChild(prevTheme);

  var nextTheme = document.createElement('button');
  nextTheme.textContent = '\u2192';
  nextTheme.title = 'Next theme (Alt+Down)';
  nextTheme.style.cssText = 'border:1px solid #ddd;background:transparent;border-radius:4px;padding:4px 8px;cursor:pointer;font-size:14px;';
  nextTheme.addEventListener('click', function() { applyTheme((activeTheme + 1) % themes.length); });
  themeRow.appendChild(nextTheme);

  var themeLabel = document.createElement('span');
  themeLabel.style.cssText = 'color:#6B6560;white-space:nowrap;margin-left:auto;';
  themeLabel.textContent = themes[0].label;
  themeRow.appendChild(themeLabel);

  bar.appendChild(themeRow);

  // --- Row 3: Overlay effects (radio-style) ---

  var overlayRow = document.createElement('div');
  overlayRow.style.cssText = 'display:flex;align-items:center;gap:8px;margin-top:6px;';

  var overlayTitle = document.createElement('span');
  overlayTitle.textContent = 'Overlay:';
  overlayTitle.style.cssText = 'font-weight:700;color:#1A1612;white-space:nowrap;min-width:52px;';
  overlayRow.appendChild(overlayTitle);

  var overlayBtnWrap = document.createElement('div');
  overlayBtnWrap.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap;';

  for (var k = 0; k < overlayEffects.length; k++) {
    var obtn = document.createElement('button');
    obtn.className = 'ft-overlay-btn';
    obtn.textContent = overlayEffects[k].label;
    obtn.title = overlayEffects[k].label;
    obtn.dataset.id = overlayEffects[k].id;
    obtn.style.cssText = 'border:1px solid #ddd;background:transparent;border-radius:4px;padding:4px 10px;cursor:pointer;font-size:11px;font-weight:500;transition:all 0.15s;color:#1A1612;';
    obtn.addEventListener('click', function() {
      applyOverlay(this.dataset.id);
    });
    overlayBtnWrap.appendChild(obtn);
  }
  overlayRow.appendChild(overlayBtnWrap);

  var overlayLabel = document.createElement('span');
  overlayLabel.style.cssText = 'color:#6B6560;white-space:nowrap;margin-left:auto;font-size:12px;';
  overlayLabel.textContent = 'None';
  overlayRow.appendChild(overlayLabel);

  bar.appendChild(overlayRow);

  // --- Row 4: Text position ---

  var posRow = document.createElement('div');
  posRow.style.cssText = 'display:flex;align-items:center;gap:8px;margin-top:6px;';

  var posTitle = document.createElement('span');
  posTitle.textContent = 'Text:';
  posTitle.style.cssText = 'font-weight:700;color:#1A1612;white-space:nowrap;min-width:52px;';
  posRow.appendChild(posTitle);

  var posBtnWrap = document.createElement('div');
  posBtnWrap.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap;';

  for (var m = 0; m < textPositions.length; m++) {
    var pbtn = document.createElement('button');
    pbtn.className = 'ft-pos-btn';
    pbtn.textContent = textPositions[m].label;
    pbtn.title = textPositions[m].label;
    pbtn.dataset.id = textPositions[m].id;
    pbtn.style.cssText = 'border:1px solid #ddd;background:transparent;border-radius:4px;padding:4px 10px;cursor:pointer;font-size:11px;font-weight:500;transition:all 0.15s;color:#1A1612;';
    pbtn.addEventListener('click', function() {
      applyPosition(this.dataset.id);
    });
    posBtnWrap.appendChild(pbtn);
  }
  posRow.appendChild(posBtnWrap);

  var posLabel = document.createElement('span');
  posLabel.style.cssText = 'color:#6B6560;white-space:nowrap;margin-left:auto;font-size:12px;';
  posLabel.textContent = 'Lower';
  posRow.appendChild(posLabel);

  bar.appendChild(posRow);

  // --- Close button ---

  var closeBtn = document.createElement('button');
  closeBtn.textContent = '\u00d7';
  closeBtn.title = 'Close tester (resets everything)';
  closeBtn.style.cssText = 'position:absolute;top:8px;right:12px;border:none;background:transparent;font-size:22px;cursor:pointer;color:#6B6560;padding:0 4px;line-height:1;';
  closeBtn.addEventListener('click', function() {
    bar.remove();
    document.body.style.marginTop = '';
    resetAll();
  });
  bar.appendChild(closeBtn);

  // --- Keyboard navigation ---

  document.addEventListener('keydown', function(e) {
    if (!document.getElementById('fontTester')) return;
    if (e.altKey && e.key === 'ArrowLeft') {
      e.preventDefault();
      applyFont((activeFont - 1 + fontPairs.length) % fontPairs.length);
    }
    if (e.altKey && e.key === 'ArrowRight') {
      e.preventDefault();
      applyFont((activeFont + 1) % fontPairs.length);
    }
    if (e.altKey && e.key === 'ArrowUp') {
      e.preventDefault();
      applyTheme((activeTheme - 1 + themes.length) % themes.length);
    }
    if (e.altKey && e.key === 'ArrowDown') {
      e.preventDefault();
      applyTheme((activeTheme + 1) % themes.length);
    }
  });

  // --- Inject ---

  document.body.appendChild(bar);
  document.body.style.marginTop = '80px';
  applyFont(1);
  applyTheme(1);
  applyOverlay(overlayEffects[1].id);
  applyPosition(textPositions[1].id);
})();
