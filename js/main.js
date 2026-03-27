(function() {
  'use strict';

  var nav = document.getElementById('nav');
  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileOverlay = document.getElementById('mobileOverlay');

  // Header scroll — transparent -> frosted on scroll
  function handleScroll() {
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  // Mobile menu
  function toggleMobileMenu() {
    if (!menuToggle) return;
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    var isOpen = mobileMenu.classList.contains('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    menuToggle.setAttribute('aria-expanded', isOpen);
  }

  function closeMobileMenu() {
    if (!menuToggle) return;
    menuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  // Scroll reveal
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

  // Rotating hero word
  function initRotatingWord() {
    var words = document.querySelectorAll('.hero-word');
    if (words.length < 2) return;

    var current = 0;
    var interval = 3000;

    setInterval(function() {
      var prev = words[current];
      current = (current + 1) % words.length;
      var next = words[current];

      prev.classList.remove('active');
      prev.classList.add('exiting');

      setTimeout(function() {
        prev.classList.remove('exiting');
      }, 450);

      next.classList.add('active');
    }, interval);
  }

  // FAQ accordion
  function initFaqAccordion() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(function(item) {
      var question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', function() {
        var isOpen = item.classList.contains('open');
        // Close all
        items.forEach(function(i) { i.classList.remove('open'); });
        // Toggle clicked
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  // Contact form — Formspree
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      var btn = form.querySelector('[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
      .then(function(response) {
        if (response.ok) {
          form.reset();
          var success = document.getElementById('formSuccess');
          if (success) success.classList.add('visible');
          btn.textContent = 'Sent!';
        } else {
          btn.textContent = 'Error — try again';
          btn.disabled = false;
        }
      })
      .catch(function() {
        btn.textContent = 'Error — try again';
        btn.disabled = false;
      });
    });
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
    initSmoothScroll();
    initRotatingWord();
    initFaqAccordion();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
