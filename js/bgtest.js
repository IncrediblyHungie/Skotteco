/* === BG TEST BAR — Background Mode Previewer ===
   Toggle: "BG" button at bottom-right
   Modes: None | A Vanta Halo | B Mesh WebGL | C Stripe GLSL | D Particles | E Grain
   Remove this file + script tag when design is finalized        */

(function () {
  'use strict';

  var MODES = [
    { id: 'none',    label: 'None',         desc: 'Default — no background effect' },
    { id: 'vanta',   label: 'A · Vanta',    desc: 'Glowing orbs that drift & bloom (Three.js WebGL)' },
    { id: 'mesh',    label: 'B · Mesh',     desc: 'Animated 4-color mesh gradient (WebGL shader)' },
    { id: 'stripe',  label: 'C · Stripe',   desc: 'Simplex noise wave — Stripe\'s actual technique' },
    { id: 'particles', label: 'D · Dots',   desc: 'Floating dots + connecting lines' },
    { id: 'grain',   label: 'E · Grain',    desc: 'Film grain + gradient depth' }
  ];

  var currentMode = localStorage.getItem('bgtest-mode') || 'none';
  var bar = null;
  var isOpen = false;
  var toggleBtn = null;
  var hero = null;
  var particleCanvas = null;
  var particleRaf = null;
  var injectedStyleEl = null;
  var meshDivs = [];
  var webglCanvas = null;
  var webglRaf = null;
  var vantaEffect = null;

  /* =====================================================
     HELPERS
  ===================================================== */
  function loadScript(src, cb) {
    var existing = document.querySelector('script[src="' + src + '"]');
    if (existing) { cb(); return; }
    var s = document.createElement('script');
    s.src = src;
    s.onload = cb;
    document.head.appendChild(s);
  }

  function makeWebGLCanvas() {
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    canvas.width  = hero.offsetWidth  || window.innerWidth;
    canvas.height = hero.offsetHeight || window.innerHeight;
    hero.appendChild(canvas);
    webglCanvas = canvas;

    function onResize() {
      if (!webglCanvas) return;
      webglCanvas.width  = hero.offsetWidth  || window.innerWidth;
      webglCanvas.height = hero.offsetHeight || window.innerHeight;
    }
    window.addEventListener('resize', onResize);
    webglCanvas._resizeHandler = onResize;
    return canvas;
  }

  function makeShader(gl, type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }

  function makeProgram(gl, vsSrc, fsSrc) {
    var prog = gl.createProgram();
    gl.attachShader(prog, makeShader(gl, gl.VERTEX_SHADER, vsSrc));
    gl.attachShader(prog, makeShader(gl, gl.FRAGMENT_SHADER, fsSrc));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    var pos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    return prog;
  }

  /* =====================================================
     MODE: NONE
  ===================================================== */
  function applyNone() { teardown(); }

  /* =====================================================
     MODE A: VANTA HALO
     Loads Three.js + Vanta from CDN dynamically.
     Gold/navy color palette.
  ===================================================== */
  function applyVanta() {
    teardown();
    if (!hero) return;

    var THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    var VANTA_CDN = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.halo.min.js';

    loadScript(THREE_CDN, function () {
      loadScript(VANTA_CDN, function () {
        if (typeof VANTA === 'undefined') return;
        try {
          vantaEffect = VANTA.HALO({
            el: hero,
            THREE: window.THREE,
            mouseControls: true,
            touchControls: false,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            baseColor: 0xc9a84c,
            backgroundColor: 0x0d1b2a,
            amplitudeFactor: 2.5,
            xOffset: 0.0,
            yOffset: -0.1,
            size: 1.8
          });
        } catch(e) { console.warn('[bgtest] Vanta error:', e); }
      });
    });
  }

  /* =====================================================
     MODE B: MESH GRADIENT (WebGL shader)
     3 large Gaussian blobs drifting slowly — Vanta's
     movement style, Mesh's color palette.
  ===================================================== */
  function applyMesh() {
    teardown();
    if (!hero) return;

    var canvas = makeWebGLCanvas();
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) { applyMeshCSSFallback(); return; }

    var VS = 'attribute vec2 a_pos; void main(){ gl_Position=vec4(a_pos,0.0,1.0); }';
    var FS = [
      'precision mediump float;',
      'uniform float u_time;',
      'uniform vec2  u_res;',

      'void main(){',
      '  vec2 uv = gl_FragCoord.xy / u_res;',
      '  float aspect = u_res.x / u_res.y;',
      '  vec2 uvA = vec2(uv.x * aspect, uv.y);',

      // Very slow drift — Stripe uses ~20-30s cycles
      '  float t = u_time * 0.07;',

      // 3 blobs on lazy independent orbits
      '  vec2 b0 = vec2((0.20 + 0.45*sin(t*1.0))       * aspect, 0.25 + 0.40*cos(t*0.7));',
      '  vec2 b1 = vec2((0.80 + 0.35*cos(t*0.8))       * aspect, 0.70 + 0.35*sin(t*1.1));',
      '  vec2 b2 = vec2((0.55 + 0.40*sin(t*1.3 + 2.0)) * aspect, 0.10 + 0.45*cos(t*0.6 + 1.0));',

      '  float r  = 0.4;',
      '  float w0 = exp(-dot(uvA-b0,uvA-b0) / (r*r));',
      '  float w1 = exp(-dot(uvA-b1,uvA-b1) / (r*r));',
      '  float w2 = exp(-dot(uvA-b2,uvA-b2) / (r*r));',

      // Palette: gold, teal-blue, warm amber
      '  vec3 cGold  = vec3(0.788, 0.659, 0.298);',   // #C9A84C
      '  vec3 cTeal  = vec3(0.035, 0.220, 0.380);',   // deep teal
      '  vec3 cAmber = vec3(0.420, 0.280, 0.040);',   // warm amber
      '  vec3 base   = vec3(0.040, 0.082, 0.130);',   // near-black navy

      // Weighted blend
      '  float total = w0 + w1 + w2 + 0.001;',
      '  vec3 col = (cGold*w0 + cTeal*w1 + cAmber*w2) / total;',

      // Pull toward base where blobs are absent
      '  float coverage = clamp(w0+w1+w2, 0.0, 1.0);',
      '  col = mix(base, col, coverage * 0.88);',

      // Soft vignette — edges stay dark
      '  float vig = 1.0 - length((uv - 0.5) * 1.5);',
      '  col *= clamp(vig + 0.45, 0.0, 1.0);',

      '  gl_FragColor = vec4(col, 1.0);',
      '}'
    ].join('\n');

    var prog = makeProgram(gl, VS, FS);
    var uTime = gl.getUniformLocation(prog, 'u_time');
    var uRes  = gl.getUniformLocation(prog, 'u_res');

    var start = Date.now();
    function draw() {
      if (!webglCanvas) return;
      gl.viewport(0, 0, webglCanvas.width, webglCanvas.height);
      gl.uniform1f(uTime, (Date.now() - start) / 1000);
      gl.uniform2f(uRes, webglCanvas.width, webglCanvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      webglRaf = requestAnimationFrame(draw);
    }
    draw();
  }

  function applyMeshCSSFallback() {
    var style = document.createElement('style');
    style.id = 'dw-bg-style';
    style.textContent = [
      '@keyframes dw-mesh-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }',
      '.dw-mesh-css { position:absolute;inset:0;pointer-events:none;',
        'background: linear-gradient(135deg,#0d1b2a 0%,#1a3a5c 25%,#c9a84c44 50%,#0f2040 75%,#0d1b2a 100%);',
        'background-size:400% 400%;',
        'animation:dw-mesh-shift 12s ease infinite; }'
    ].join('');
    document.head.appendChild(style);
    injectedStyleEl = style;
    var div = document.createElement('div');
    div.className = 'dw-mesh-css';
    hero.appendChild(div);
    meshDivs.push(div);
  }

  /* =====================================================
     MODE C: STRIPE GLSL
     Simplex noise producing flowing wave bands —
     Stripe's actual technique, implemented as GLSL.
  ===================================================== */
  function applyStripe() {
    teardown();
    if (!hero) return;

    var canvas = makeWebGLCanvas();
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    var VS = 'attribute vec2 a_pos; void main(){ gl_Position=vec4(a_pos,0.0,1.0); }';
    var FS = [
      'precision mediump float;',
      'uniform float u_time;',
      'uniform vec2  u_res;',

      // Simplex 2D noise
      'vec2 hash2(vec2 p){',
      '  p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));',
      '  return -1.0 + 2.0*fract(sin(p)*43758.5453123);',
      '}',
      'float snoise(vec2 p){',
      '  const float K1=0.366025404; const float K2=0.211324865;',
      '  vec2 i=floor(p+(p.x+p.y)*K1);',
      '  vec2 a=p-i+(i.x+i.y)*K2;',
      '  vec2 o=(a.x>a.y)?vec2(1,0):vec2(0,1);',
      '  vec2 b=a-o+K2; vec2 c=a-1.0+2.0*K2;',
      '  vec3 h=max(0.5-vec3(dot(a,a),dot(b,b),dot(c,c)),0.0);',
      '  vec3 n=h*h*h*h*vec3(dot(a,hash2(i)),dot(b,hash2(i+o)),dot(c,hash2(i+1.0)));',
      '  return dot(n,vec3(70.0));',
      '}',

      'void main(){',
      '  vec2 uv = gl_FragCoord.xy / u_res;',
      '  float t = u_time * 0.15;',

      // 3 octaves of noise for organic flow
      '  float n1 = snoise(uv*2.2 + vec2(t,      t*0.4));',
      '  float n2 = snoise(uv*1.6 + vec2(-t*0.8, t*1.1));',
      '  float n3 = snoise(uv*3.5 + vec2(t*0.5, -t*0.9));',
      '  float n  = n1*0.5 + n2*0.35 + n3*0.15;',
      '  n = n*0.5 + 0.5;', // remap to 0..1

      // Color stops: deep → navy → blue-navy → gold tint
      '  vec3 c0 = vec3(0.012, 0.031, 0.063);', // #030810 near black
      '  vec3 c1 = vec3(0.051, 0.106, 0.165);', // #0D1B2A navy
      '  vec3 c2 = vec3(0.047, 0.157, 0.286);', // #0C2849 blue-navy
      '  vec3 c3 = vec3(0.180, 0.137, 0.043);', // #2E2207 dark gold
      '  vec3 c4 = vec3(0.545, 0.420, 0.137);', // #8B6B23 mid gold
      '  vec3 col;',
      '  if(n < 0.25)      col = mix(c0, c1, n*4.0);',
      '  else if(n < 0.55) col = mix(c1, c2, (n-0.25)*3.33);',
      '  else if(n < 0.80) col = mix(c2, c3, (n-0.55)*4.0);',
      '  else               col = mix(c3, c4, (n-0.80)*5.0);',

      // Edge vignette
      '  float vig = 1.0 - length((uv-0.5)*1.8);',
      '  col *= clamp(vig, 0.2, 1.0);',

      '  gl_FragColor = vec4(col, 1.0);',
      '}'
    ].join('\n');

    var prog = makeProgram(gl, VS, FS);
    var uTime = gl.getUniformLocation(prog, 'u_time');
    var uRes  = gl.getUniformLocation(prog, 'u_res');

    var start = Date.now();
    function draw() {
      if (!webglCanvas) return;
      gl.viewport(0, 0, webglCanvas.width, webglCanvas.height);
      gl.uniform1f(uTime, (Date.now() - start) / 1000);
      gl.uniform2f(uRes, webglCanvas.width, webglCanvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      webglRaf = requestAnimationFrame(draw);
    }
    draw();
  }

  /* =====================================================
     MODE D: PARTICLES
  ===================================================== */
  function applyParticles() {
    teardown();
    if (!hero) return;

    var canvas = document.createElement('canvas');
    canvas.id = 'dw-particles';
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0.6;z-index:0;';
    hero.appendChild(canvas);
    particleCanvas = canvas;

    var ctx = canvas.getContext('2d');
    var dots = [], COUNT = 55, LINK = 130;

    function resize() { canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight; }
    function randomDot() { return { x:Math.random()*canvas.width, y:Math.random()*canvas.height, vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4, r:Math.random()*1.5+0.8 }; }
    function init() { resize(); dots=[]; for(var i=0;i<COUNT;i++) dots.push(randomDot()); }

    function draw() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      dots.forEach(function(d){ d.x+=d.vx; d.y+=d.vy; if(d.x<0)d.x=canvas.width; if(d.x>canvas.width)d.x=0; if(d.y<0)d.y=canvas.height; if(d.y>canvas.height)d.y=0; });
      for(var i=0;i<dots.length;i++) for(var j=i+1;j<dots.length;j++){
        var dx=dots[i].x-dots[j].x, dy=dots[i].y-dots[j].y, dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<LINK){ ctx.beginPath(); ctx.moveTo(dots[i].x,dots[i].y); ctx.lineTo(dots[j].x,dots[j].y); ctx.strokeStyle='rgba(201,168,76,'+(1-dist/LINK)*0.25+')'; ctx.lineWidth=0.8; ctx.stroke(); }
      }
      dots.forEach(function(d){ ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2); ctx.fillStyle='rgba(232,216,188,0.7)'; ctx.fill(); });
      particleRaf = requestAnimationFrame(draw);
    }
    init(); draw();
    window.addEventListener('resize', init);
  }

  /* =====================================================
     MODE E: GRAIN
  ===================================================== */
  function applyGrain() {
    teardown();
    var grainSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E";
    var style = document.createElement('style');
    style.id = 'dw-bg-style';
    style.textContent = [
      '@keyframes dw-grain-drift{0%{background-position:0% 0%,0% 50%}25%{background-position:10% 10%,30% 70%}50%{background-position:5% 20%,100% 50%}75%{background-position:15% 5%,70% 30%}100%{background-position:0% 0%,0% 50%}}',
      '@keyframes dw-grain-flicker{0%,100%{opacity:0.032}50%{opacity:0.048}}',
      '.dw-grain-gradient{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 80% 60% at 20% 30%,rgba(201,168,76,0.07) 0%,transparent 60%),radial-gradient(ellipse 60% 80% at 80% 70%,rgba(30,50,100,0.15) 0%,transparent 60%);background-size:200% 200%,200% 200%;animation:dw-grain-drift 20s ease infinite;}',
      '.dw-grain-overlay{position:absolute;inset:-10%;pointer-events:none;background-image:url("' + grainSvg + '");background-repeat:repeat;background-size:256px 256px;animation:dw-grain-flicker 4s ease-in-out infinite;mix-blend-mode:overlay;}'
    ].join('');
    document.head.appendChild(style);
    injectedStyleEl = style;
    if (!hero) return;
    var g = document.createElement('div'); g.className = 'dw-grain-gradient'; hero.appendChild(g); meshDivs.push(g);
    var o = document.createElement('div'); o.className = 'dw-grain-overlay';    hero.appendChild(o); meshDivs.push(o);
  }

  /* =====================================================
     TEARDOWN
  ===================================================== */
  function teardown() {
    if (particleRaf) { cancelAnimationFrame(particleRaf); particleRaf = null; }
    if (webglRaf)    { cancelAnimationFrame(webglRaf);    webglRaf = null; }
    if (particleCanvas && particleCanvas.parentNode) { particleCanvas.parentNode.removeChild(particleCanvas); particleCanvas = null; }
    if (webglCanvas && webglCanvas.parentNode) {
      if (webglCanvas._resizeHandler) window.removeEventListener('resize', webglCanvas._resizeHandler);
      webglCanvas.parentNode.removeChild(webglCanvas);
      webglCanvas = null;
    }
    if (vantaEffect) { try { vantaEffect.destroy(); } catch(e){} vantaEffect = null; }
    meshDivs.forEach(function(el){ if(el && el.parentNode) el.parentNode.removeChild(el); });
    meshDivs = [];
    if (injectedStyleEl && injectedStyleEl.parentNode) { injectedStyleEl.parentNode.removeChild(injectedStyleEl); injectedStyleEl = null; }
  }

  /* =====================================================
     APPLY MODE
  ===================================================== */
  function applyMode(id) {
    currentMode = id;
    localStorage.setItem('bgtest-mode', id);
    updateActivePills(id);
    switch (id) {
      case 'vanta':     applyVanta();     break;
      case 'mesh':      applyMesh();      break;
      case 'stripe':    applyStripe();    break;
      case 'particles': applyParticles(); break;
      case 'grain':     applyGrain();     break;
      default:          applyNone();      break;
    }
  }

  /* =====================================================
     UI
  ===================================================== */
  function updateActivePills(activeId) {
    if (!bar) return;
    bar.querySelectorAll('[data-mode]').forEach(function(pill) {
      pill.classList[pill.getAttribute('data-mode') === activeId ? 'add' : 'remove']('dwtb-active');
    });
  }

  function createBar() {
    bar = document.createElement('div');
    bar.id = 'dw-bgbar';
    bar.innerHTML = '<style>' +
      '#dw-bgbar{position:fixed;bottom:0;left:0;right:0;z-index:9998;background:rgba(13,18,26,0.97);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-top:1px solid rgba(201,168,76,0.15);padding:16px 5%;transform:translateY(100%);opacity:0;transition:transform .3s cubic-bezier(.22,1,.36,1),opacity .3s ease;}' +
      '#dw-bgbar.dwtb-open{transform:translateY(0);opacity:1;}' +
      '.dwtb-inner{display:flex;align-items:center;gap:16px;flex-wrap:wrap;}' +
      '.dwtb-label{font-family:monospace;font-size:10px;color:rgba(201,168,76,0.6);text-transform:uppercase;letter-spacing:0.15em;white-space:nowrap;}' +
      '.dwtb-divider{width:1px;height:20px;background:rgba(201,168,76,0.15);}' +
      '.dwtb-pills{display:flex;gap:8px;flex-wrap:wrap;align-items:center;}' +
      '.dwtb-pill{padding:6px 14px;font-size:11px;font-family:monospace;border:1px solid rgba(201,168,76,0.25);border-radius:999px;cursor:pointer;background:transparent;color:rgba(244,239,230,0.6);white-space:nowrap;transition:all .15s ease;letter-spacing:0.05em;}' +
      '.dwtb-pill:hover{border-color:rgba(201,168,76,0.7);color:rgba(244,239,230,0.9);}' +
      '.dwtb-pill.dwtb-active{background:rgba(201,168,76,0.15);border-color:#C9A84C;color:#C9A84C;}' +
      '.dwtb-desc{font-family:monospace;font-size:10px;color:rgba(107,122,141,0.8);margin-left:4px;}' +
      '#dw-bgtoggle{position:fixed;bottom:20px;right:20px;z-index:9999;padding:8px 18px;font-family:monospace;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#0D1B2A;background:#C9A84C;border:none;border-radius:999px;cursor:pointer;box-shadow:0 4px 20px rgba(201,168,76,0.35);transition:all .2s ease;}' +
      '#dw-bgtoggle:hover{transform:scale(1.05);box-shadow:0 6px 28px rgba(201,168,76,0.5);}' +
      '#dw-bgtoggle.dwtb-btn-active{background:#162030;color:#C9A84C;border:1px solid rgba(201,168,76,0.4);box-shadow:none;}' +
    '</style>' +
    '<div class="dwtb-inner">' +
      '<span class="dwtb-label">BG Mode</span>' +
      '<span class="dwtb-divider"></span>' +
      '<div class="dwtb-pills" id="dwtb-pills"></div>' +
      '<span class="dwtb-desc" id="dwtb-desc"></span>' +
    '</div>';
    document.body.appendChild(bar);

    var pillsEl = bar.querySelector('#dwtb-pills');
    MODES.forEach(function(mode) {
      var btn = document.createElement('button');
      btn.className = 'dwtb-pill';
      btn.setAttribute('data-mode', mode.id);
      btn.textContent = mode.label;
      btn.addEventListener('click', function() {
        applyMode(mode.id);
        var descEl = document.getElementById('dwtb-desc');
        if (descEl) descEl.textContent = mode.desc;
      });
      pillsEl.appendChild(btn);
    });
  }

  function toggleBar() {
    if (!bar) createBar();
    isOpen = !isOpen;
    if (isOpen) {
      bar.classList.add('dwtb-open');
      toggleBtn.classList.add('dwtb-btn-active');
      toggleBtn.textContent = 'Close';
      updateActivePills(currentMode);
      var descEl = document.getElementById('dwtb-desc');
      if (descEl) { var cur = MODES.find(function(m){ return m.id===currentMode; }); descEl.textContent = cur ? cur.desc : ''; }
    } else {
      bar.classList.remove('dwtb-open');
      toggleBtn.classList.remove('dwtb-btn-active');
      toggleBtn.textContent = 'BG';
    }
  }

  /* =====================================================
     INIT
  ===================================================== */
  document.addEventListener('DOMContentLoaded', function() {
    hero = document.querySelector('.hero');
    toggleBtn = document.createElement('button');
    toggleBtn.id = 'dw-bgtoggle';
    toggleBtn.textContent = 'BG';
    toggleBtn.addEventListener('click', toggleBar);
    document.body.appendChild(toggleBtn);
    var saved = localStorage.getItem('bgtest-mode');
    if (saved && saved !== 'none') applyMode(saved);
  });

})();
