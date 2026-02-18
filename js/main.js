(function() {
  'use strict';

  var nav = document.getElementById('nav');
  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileOverlay = document.getElementById('mobileOverlay');

  // Header scroll — transparent -> frosted glass on home page
  function handleScroll() {
    if (!nav) return;
    if (document.body.classList.contains('home')) {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  }

  // Mobile menu
  function toggleMobileMenu() {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    if (!menuToggle) return;
    menuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Scroll reveal animations
  function initScrollAnimations() {
    var elements = document.querySelectorAll('.reveal, .reveal-group');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(function(el) { observer.observe(el); });
  }

  // Counter animation for stat values
  function initCounterAnimations() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(el) { observer.observe(el); });
  }

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1500;
    var startTime = null;

    function easeOutExpo(t) {
      return 1 - Math.pow(2, -10 * t);
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var current = Math.floor(easeOutExpo(progress) * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  // Before/After slider
  function initBeforeAfterSliders() {
    var sliders = document.querySelectorAll('.ba-slider');
    if (!sliders.length) return;

    sliders.forEach(function(slider) {
      var range = slider.querySelector('input[type="range"]');
      var before = slider.querySelector('.ba-before');
      var handle = slider.querySelector('.ba-handle');
      if (!range || !before) return;

      function updateSlider() {
        var val = range.value;
        before.style.clipPath = 'inset(0 ' + (100 - val) + '% 0 0)';
        if (handle) {
          handle.style.left = val + '%';
        }
      }

      range.addEventListener('input', updateSlider);
      updateSlider();
    });
  }

  // FAQ accordion
  function initFaqAccordion() {
    var faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(function(item) {
      var question = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');
      if (!question || !answer) return;

      question.addEventListener('click', function() {
        var isOpen = item.classList.contains('active');

        // Close all
        faqItems.forEach(function(other) {
          other.classList.remove('active');
          var otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
          var otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        // Toggle current
        if (!isOpen) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // Contact form
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
      .then(function(res) {
        if (res.ok) {
          form.reset();
          showFormMessage('Thank you! We\'ll get back to you within 24 hours.', 'success');
        } else {
          throw new Error('Failed');
        }
      })
      .catch(function() {
        showFormMessage('Something went wrong. Please email us at hello@skotte.co.', 'error');
      })
      .finally(function() {
        btn.textContent = originalText;
        btn.disabled = false;
      });
    });
  }

  function showFormMessage(text, type) {
    var existing = document.querySelector('.form-message');
    if (existing) existing.remove();
    var msg = document.createElement('div');
    msg.className = 'form-message form-message-' + type;
    msg.textContent = text;
    var form = document.getElementById('contactForm');
    if (form) form.appendChild(msg);
    setTimeout(function() { msg.remove(); }, 5000);
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          var offset = nav ? nav.offsetHeight : 0;
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.pageYOffset - offset,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  function initClock() {
    var clock = document.getElementById('navClock');
    if (!clock) return;

    function update() {
      var now = new Date();
      var time = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      clock.textContent = time + ' San Diego';
    }

    update();
    setInterval(update, 1000);
  }

  // Init
  function init() {
    window.addEventListener('scroll', handleScroll, { passive: true });

    if (menuToggle) menuToggle.addEventListener('click', toggleMobileMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

    document.querySelectorAll('.mobile-menu-link').forEach(function(link) {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });

    handleScroll();
    initScrollAnimations();
    initCounterAnimations();
    initBeforeAfterSliders();
    initFaqAccordion();
    initContactForm();
    initSmoothScroll();
    initClock();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
