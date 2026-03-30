/* === Hero Gradient — animated mesh background ===
   3 Gaussian blobs drifting on slow independent orbits.
   Runs automatically on .hero — WebGL with CSS fallback.  */

(function () {
  'use strict';

  function init() {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    canvas.width  = hero.offsetWidth  || window.innerWidth;
    canvas.height = hero.offsetHeight || window.innerHeight;
    hero.appendChild(canvas);

    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) { applyFallback(hero); canvas.remove(); return; }

    function onResize() {
      canvas.width  = hero.offsetWidth  || window.innerWidth;
      canvas.height = hero.offsetHeight || window.innerHeight;
    }
    window.addEventListener('resize', onResize);

    var VS = 'attribute vec2 a_pos; void main(){ gl_Position=vec4(a_pos,0.0,1.0); }';
    var FS = [
      'precision mediump float;',
      'uniform float u_time;',
      'uniform vec2  u_res;',
      'uniform vec3  u_c0;',   // blob 0 color
      'uniform vec3  u_c1;',   // blob 1 color
      'uniform vec3  u_c2;',   // blob 2 color
      'uniform vec3  u_base;', // background base color

      'void main(){',
      '  vec2 uv = gl_FragCoord.xy / u_res;',
      '  float aspect = u_res.x / u_res.y;',
      '  vec2 uvA = vec2(uv.x * aspect, uv.y);',

      '  float t = u_time * 0.07;',

      '  vec2 b0 = vec2((0.20 + 0.45*sin(t*1.0))       * aspect, 0.25 + 0.40*cos(t*0.7));',
      '  vec2 b1 = vec2((0.80 + 0.35*cos(t*0.8))       * aspect, 0.70 + 0.35*sin(t*1.1));',
      '  vec2 b2 = vec2((0.55 + 0.40*sin(t*1.3 + 2.0)) * aspect, 0.10 + 0.45*cos(t*0.6 + 1.0));',

      '  float r  = 0.4;',
      '  float w0 = exp(-dot(uvA-b0,uvA-b0) / (r*r));',
      '  float w1 = exp(-dot(uvA-b1,uvA-b1) / (r*r));',
      '  float w2 = exp(-dot(uvA-b2,uvA-b2) / (r*r));',

      '  float total = w0 + w1 + w2 + 0.001;',
      '  vec3 col = (u_c0*w0 + u_c1*w1 + u_c2*w2) / total;',

      '  float coverage = clamp(w0+w1+w2, 0.0, 1.0);',
      '  col = mix(u_base, col, coverage * 0.88);',

      '  float vig = 1.0 - length((uv - 0.5) * 1.5);',
      '  col *= clamp(vig + 0.45, 0.0, 1.0);',

      '  gl_FragColor = vec4(col, 1.0);',
      '}'
    ].join('\n');

    var prog = gl.createProgram();
    function addShader(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      gl.attachShader(prog, s);
    }
    addShader(gl.VERTEX_SHADER, VS);
    addShader(gl.FRAGMENT_SHADER, FS);
    gl.linkProgram(prog); gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    var aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    var uTime = gl.getUniformLocation(prog, 'u_time');
    var uRes  = gl.getUniformLocation(prog, 'u_res');
    var uC0   = gl.getUniformLocation(prog, 'u_c0');
    var uC1   = gl.getUniformLocation(prog, 'u_c1');
    var uC2   = gl.getUniformLocation(prog, 'u_c2');
    var uBase = gl.getUniformLocation(prog, 'u_base');

    // Default colors
    var colors = {
      c0:   [0.788, 0.659, 0.298],  // gold   #C9A84C
      c1:   [0.035, 0.220, 0.380],  // teal   #093861
      c2:   [0.420, 0.280, 0.040],  // amber  #6B4710
      base: [0.040, 0.082, 0.130]   // navy   #0A1421
    };

    function hexToVec3(hex) {
      hex = hex.replace('#','');
      return [
        parseInt(hex.substring(0,2),16)/255,
        parseInt(hex.substring(2,4),16)/255,
        parseInt(hex.substring(4,6),16)/255
      ];
    }

    // Public API — called from testbar
    window.__dwGradient = {
      setColors: function(c0hex, c1hex, c2hex, basehex) {
        if (c0hex)   colors.c0   = hexToVec3(c0hex);
        if (c1hex)   colors.c1   = hexToVec3(c1hex);
        if (c2hex)   colors.c2   = hexToVec3(c2hex);
        if (basehex) colors.base = hexToVec3(basehex);
      }
    };

    var start = Date.now();

    function draw() {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTime, (Date.now() - start) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform3fv(uC0,   colors.c0);
      gl.uniform3fv(uC1,   colors.c1);
      gl.uniform3fv(uC2,   colors.c2);
      gl.uniform3fv(uBase, colors.base);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(draw);
    }
    draw();
  }

  function applyFallback(hero) {
    var div = document.createElement('div');
    div.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:0;' +
      'background:radial-gradient(ellipse 70% 60% at 20% 30%, rgba(201,168,76,0.15) 0%, transparent 60%),' +
      'radial-gradient(ellipse 60% 70% at 80% 70%, rgba(9,56,97,0.2) 0%, transparent 60%);';
    hero.appendChild(div);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
