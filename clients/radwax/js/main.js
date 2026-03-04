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
      nav.classList.toggle('scrolled', window.scrollY > 50);
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
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    elements.forEach(function(el) { observer.observe(el); });
  }

  // Counter animation
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
    function easeOutExpo(t) { return 1 - Math.pow(2, -10 * t); }
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var current = Math.floor(easeOutExpo(progress) * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(step);
  }

  // Top bar rotating messages
  function initTopBar() {
    var messages = document.querySelectorAll('.topbar-message');
    if (messages.length < 2) return;
    var current = 0;
    setInterval(function() {
      messages[current].classList.remove('active');
      current = (current + 1) % messages.length;
      messages[current].classList.add('active');
    }, 4000);
  }

  // Testimonial carousel
  function initTestimonialCarousel() {
    var slides = document.querySelectorAll('.testimonial-slide');
    var dotsContainer = document.getElementById('testimonialDots');
    if (!slides.length || !dotsContainer) return;

    var current = 0;

    // Create dots
    slides.forEach(function(_, i) {
      var dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Testimonial ' + (i + 1));
      dot.addEventListener('click', function() { goTo(i); });
      dotsContainer.appendChild(dot);
    });

    var dots = dotsContainer.querySelectorAll('.testimonial-dot');

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = index;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    // Auto-advance every 6 seconds
    setInterval(function() {
      goTo((current + 1) % slides.length);
    }, 6000);
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
        faqItems.forEach(function(other) {
          other.classList.remove('active');
          var a = other.querySelector('.faq-answer');
          if (a) a.style.maxHeight = null;
          var b = other.querySelector('.faq-question');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // Contact form (Formspree)
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
          showFormMessage('Thank you! We\'ll get back to you soon.', 'success');
        } else { throw new Error('Failed'); }
      })
      .catch(function() {
        showFormMessage('Something went wrong. Please email us directly.', 'error');
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

  // Smooth scroll
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

  // Shop page: category filter tabs
  function initCategoryFilter() {
    var tabs = document.querySelectorAll('.filter-tab');
    var products = document.querySelectorAll('.shop-product');
    if (!tabs.length || !products.length) return;

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        tabs.forEach(function(t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var category = tab.getAttribute('data-category');
        products.forEach(function(product) {
          if (category === 'all' || product.getAttribute('data-category') === category) {
            product.style.display = '';
          } else {
            product.style.display = 'none';
          }
        });
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
    initTopBar();
    initScrollAnimations();
    initCounterAnimations();
    initTestimonialCarousel();
    initFaqAccordion();
    initContactForm();
    initSmoothScroll();
    initCategoryFilter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
