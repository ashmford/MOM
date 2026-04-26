// animations.js — scroll-triggered reveal animations.
// Include on every page. Respects prefers-reduced-motion automatically
// (CSS handles that; this script just adds/removes classes).

(function() {
  // Elements to observe for scroll reveals
  const REVEAL_SELECTORS = [
    // Section labels and headlines
    '.section-label',
    'h2.display',
    // Mission / about image+text
    '.mission-image',
    '.mission-text p',
    '.about-mission-image',
    '.about-vision',
    // Detail list rows
    '.mission-detail-item',
    // Serve cards
    '.serve-card',
    // Service cards (staggered)
    '.service-card',
    // Stats
    '.stat-item',
    // Testimonial cards
    '.testimonial-card',
    // Donate CTA
    '.donate-cta h2',
    '.donate-cta p',
    '.donate-cta-actions',
    // Problem body paragraphs
    '.about-problem-body p',
    // Philosophy body
    '.about-philosophy-body p',
    // Quote
    '.about-quote-mark',
    '.about-quote blockquote',
    '.about-quote cite',
    // People list
    '.about-people-item',
    // Additional blocks
    '.block-richtext .display',
    '.block-body',
    '.testimonial-card',
    '.partner-logo-item',
  ];

  function initReveal() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    REVEAL_SELECTORS.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('reveal');
        // Stagger cards and list items
        const staggerable = el.closest('.serve-grid, .services-grid, .testimonials-grid, .stats-grid, .about-people-list, .partner-logo-grid');
        if (staggerable) {
          const siblings = staggerable.querySelectorAll(selector);
          const idx = Array.from(siblings).indexOf(el);
          if (idx > 0 && idx < 4) el.classList.add(`reveal-delay-${idx}`);
        }
        observer.observe(el);
      });
    });
  }

  // Run after DOM and any fetch scripts have had a chance to populate content
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initReveal, 100));
  } else {
    setTimeout(initReveal, 100);
  }
})();
