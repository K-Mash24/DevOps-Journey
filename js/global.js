// ============================================================
// SHARED GLOBAL UI ENGINE (Runs on all pages)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Theme Toggle Layer (kept from original) ──
  const html = document.documentElement;
  const lightBtn = document.getElementById('lightBtn');
  const darkBtn = document.getElementById('darkBtn');

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('gc-theme', theme);
    if (lightBtn) lightBtn.classList.toggle('active', theme === 'light');
    if (darkBtn) darkBtn.classList.toggle('active', theme === 'dark');
  }

  if (lightBtn && darkBtn) {
    lightBtn.addEventListener('click', () => setTheme('light'));
    darkBtn.addEventListener('click', () => setTheme('dark'));
  }

  const saved = localStorage.getItem('gc-theme');
  if (saved) {
    setTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  }

  // ── Responsive Mobile Sidebar Control (kept from original) ──
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('sidebarOverlay');

  if (hamburger && sidebar && overlay) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('show');
    });
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
  }

  // Auto-collapse mobile sidebar drawer upon selecting links
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (sidebar) sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('show');
    });
  });

  // ── Scroll to Top (fixed click handler) ──
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // NEW GLOBAL FEATURES (formerly duplicated across pillars)
  // ============================================================

  // ── 1. GLOBAL ACCORDION TOGGLE (single source of truth) ──
  window.toggleAccordion = function(header) {
    const accordion = header.closest('.accordion');
    if (!accordion) return;
    accordion.classList.toggle('open');
    // Accessibility
    header.setAttribute('aria-expanded', accordion.classList.contains('open'));
  };

  // ── 2. GLOBAL SEARCH ENGINE (debounced, with highlights) ──
  function initGlobalSearch() {
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');
    if (!searchInput) return;

    let debounceTimeout;

    const removeHighlights = (el) => {
      el.querySelectorAll('.highlight').forEach(h => h.outerHTML = h.textContent);
    };

    const highlightText = (el, term) => {
      if (!term) return;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        if (!node.textContent.toLowerCase().includes(term.toLowerCase())) return;
        const span = document.createElement('span');
        span.innerHTML = node.textContent.replace(
          new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi'),
          '<mark class="highlight">$1</mark>'
        );
        node.parentNode.replaceChild(span, node);
      });
    };

    searchInput.addEventListener('input', function() {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        const term = this.value.trim().toLowerCase();
        const accordions = document.querySelectorAll('.accordion[data-searchable]');
        let visibleCount = 0;

        accordions.forEach(acc => {
          removeHighlights(acc);
          if (!term) {
            acc.classList.remove('search-hidden');
            visibleCount++;
            return;
          }
          if (acc.textContent.toLowerCase().includes(term)) {
            acc.classList.remove('search-hidden');
            acc.classList.add('open');
            // Also update aria-expanded on the header
            const header = acc.querySelector('.accordion-header');
            if (header) header.setAttribute('aria-expanded', 'true');
            highlightText(acc, term);
            visibleCount++;
          } else {
            acc.classList.add('search-hidden');
          }
        });
        if (noResults) noResults.classList.toggle('show', term !== '' && visibleCount === 0);
      }, 250);
    });
  }

  // ── 3. GLOBAL SCROLL‑SPY (dynamic active nav) ──
  function initGlobalScrollSpy() {
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item[href^="#"]');
    if (navItems.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

    navItems.forEach(item => {
      const targetId = item.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) observer.observe(targetEl);
    });
  }

  // ── 4. RESOURCE PULSE ANIMATION (only if .resource-card exists) ──
  function initResourcePulse() {
    const resContainer = document.getElementById('resources');
    if (!resContainer) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.resource-card').forEach((card, i) => {
            setTimeout(() => card.classList.add('lighting-flash'), i * 100);
          });
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    observer.observe(resContainer);
  }

  // ── 5. GLOBAL PROGRESS INDICATOR (FIXED – single version) ──
  window.updateGlobalProgress = function() {
    const progressFill = document.querySelector('.overall-progress .progress-fill');
    const progressPctSpan = document.querySelector('.overall-progress .progress-pct');
    if (!progressFill) return;

    const pillars = [
      { key: 'gc-score-networking', name: 'networking' },
      { key: 'gc-score-linux',      name: 'linux' },
      { key: 'gc-score-security',   name: 'security' },
      { key: 'gc-score-scripting',  name: 'scripting' },
      { key: 'gc-score-databases',  name: 'databases' }
    ];

    let completedCount = 0;
    pillars.forEach(p => {
      const score = parseInt(localStorage.getItem(p.key) || 0, 10);
      if (score >= 80) completedCount++;
    });

    const total = pillars.length;
    const overallPercent = Math.round((completedCount / total) * 100);

    progressFill.style.width = `${overallPercent}%`;
    if (progressPctSpan) progressPctSpan.textContent = `${overallPercent}% complete`;

    // Also update the segment dots below the progress bar
    const segDots = document.querySelectorAll('.progress-segments .seg-dot');
    const order = ['networking', 'linux', 'security', 'scripting', 'databases'];
    segDots.forEach((dot, idx) => {
      const pillarName = order[idx];
      const pillarScore = parseInt(localStorage.getItem(`gc-score-${pillarName}`) || 0, 10);
      dot.classList.remove('complete', 'active', 'locked');
      if (pillarScore >= 80) dot.classList.add('complete');
      else if (pillarScore > 0) dot.classList.add('active');
      else dot.classList.add('locked');
    });
  };

  // ── 6. GLOBAL KEYBOARD SHORTCUTS ( / to focus search, Escape to close sidebar ) ──
  function initGlobalKeyboard() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      window.addEventListener('keydown', (e) => {
        // Skip if user is typing in an input or textarea
        const activeTag = document.activeElement.tagName;
        if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || document.activeElement.isContentEditable) {
          return;
        }
        if (e.key === '/') {
          e.preventDefault();
          searchInput.focus();
          searchInput.select();
        }
        if (e.key === 'Escape') {
          if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            overlay?.classList.remove('show');
          }
          searchInput.blur();
        }
      });
    }
  }

  // ── Run all global initialisers ──
  initGlobalSearch();
  initGlobalScrollSpy();
  initResourcePulse();     // safe – does nothing if no .resource-card
  initGlobalKeyboard();
  window.updateGlobalProgress(); // initial progress calculation

  // Listen for storage changes (if quiz updates happen in another tab)
  window.addEventListener('storage', () => {
    window.updateGlobalProgress();
  });

}); // DOMContentLoaded end