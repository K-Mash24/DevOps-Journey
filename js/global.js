// ============================================================
// SHARED GLOBAL UI ENGINE (Runs on all pages)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Theme Toggle ──
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

  // ── Mobile Sidebar ──
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

  document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (sidebar) sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('show');
    });
  });

  // ── Scroll to Top ──
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
  // CORE FEATURES
  // ============================================================

  // ── Accordion Toggle (with state saving) ──
  window.toggleAccordion = function(header) {
    const accordion = header.closest('.accordion');
    if (!accordion) return;
    accordion.classList.toggle('open');
    header.setAttribute('aria-expanded', accordion.classList.contains('open'));
    // Save state
    const id = accordion.querySelector('.accordion-title')?.innerText || 'unknown';
    const openStates = JSON.parse(localStorage.getItem('gc-accordion-states') || '{}');
    openStates[id] = accordion.classList.contains('open');
    localStorage.setItem('gc-accordion-states', JSON.stringify(openStates));
  };

  // ── Restore saved accordion states ──
  function restoreAccordionStates() {
    const openStates = JSON.parse(localStorage.getItem('gc-accordion-states') || '{}');
    document.querySelectorAll('.accordion').forEach(acc => {
      const id = acc.querySelector('.accordion-title')?.innerText;
      if (id && openStates[id] === true) {
        acc.classList.add('open');
        const header = acc.querySelector('.accordion-header');
        if (header) header.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // ── Search Engine ──
  function initGlobalSearch() {
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');
    if (!searchInput) return;
    searchInput.value = ''; // clear on load

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

  // ── Scroll Spy ──
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

  // ── Resource Pulse ──
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

  // ── Global Progress ──
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

  // ── Keyboard Shortcuts ──
  function initGlobalKeyboard() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      window.addEventListener('keydown', (e) => {
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

  // ── Copy Code Buttons ──
  function initCopyButtons() {
    document.querySelectorAll('.code-block').forEach(block => {
      if (block.querySelector('.copy-btn')) return;
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 1H4a2 2 0 00-2 2v14h2V3h12V1z"/><path d="M8 5h12a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2z"/></svg>';
      btn.setAttribute('aria-label', 'Copy code');
      btn.style.position = 'absolute';
      btn.style.top = '8px';
      btn.style.right = '8px';
      btn.style.background = 'var(--bg-card)';
      btn.style.border = '1px solid var(--border-color)';
      btn.style.borderRadius = 'var(--radius-sm)';
      btn.style.padding = '4px 8px';
      btn.style.cursor = 'pointer';
      btn.style.opacity = '0.7';
      btn.style.transition = 'opacity 0.2s';
      block.style.position = 'relative';
      block.appendChild(btn);

      btn.addEventListener('click', async () => {
        const pre = block.querySelector('pre');
        const text = pre ? pre.innerText : block.innerText;
        await navigator.clipboard.writeText(text);
        btn.innerHTML = '✓';
        setTimeout(() => {
          btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 1H4a2 2 0 00-2 2v14h2V3h12V1z"/><path d="M8 5h12a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2z"/></svg>';
        }, 1500);
      });
    });
  }

  // ── Fetch Last Updated Date ──
  async function fetchLastUpdated() {
    try {
      const res = await fetch('https://api.github.com/repos/K-Mash24/DevOps-Journey/commits/main');
      if (!res.ok) throw new Error('GitHub API error');
      const data = await res.json();
      const date = new Date(data.commit.committer.date);
      const footer = document.querySelector('.sidebar-footer-text');
      if (footer && !footer.querySelector('.last-updated')) {
        const updatedSpan = document.createElement('div');
        updatedSpan.className = 'last-updated';
        updatedSpan.style.marginTop = '6px';
        updatedSpan.style.fontSize = '0.55rem';
        updatedSpan.textContent = `Last updated: ${date.toLocaleDateString()}`;
        footer.appendChild(updatedSpan);
      }
    } catch(e) {
      console.debug('Could not fetch last updated date');
    }
  }

  // ── Reset Progress Button ──
  function addResetButton() {
    const footer = document.querySelector('.sidebar-footer');
    if (!footer) return;
    if (footer.querySelector('.btn-reset-progress')) return;
    const btn = document.createElement('button');
    btn.textContent = 'Reset all progress';
    btn.className = 'btn-reset-progress';
    btn.style.marginTop = '10px';
    btn.style.background = 'none';
    btn.style.border = 'none';
    btn.style.color = 'var(--text-sidebar-muted)';
    btn.style.fontSize = '0.65rem';
    btn.style.cursor = 'pointer';
    btn.style.textDecoration = 'underline';
    btn.addEventListener('click', () => {
      if (confirm('Are you sure? This will delete all quiz scores and progress.')) {
        localStorage.removeItem('gc-score-networking');
        localStorage.removeItem('gc-score-linux');
        localStorage.removeItem('gc-score-security');
        localStorage.removeItem('gc-score-scripting');
        localStorage.removeItem('gc-score-databases');
        window.updateGlobalProgress();
        alert('Progress reset. Refresh the page to see changes.');
      }
    });
    footer.appendChild(btn);
  }

  // ── Clickable Headings (copy link) ──
  function initClickableHeadings() {
    document.querySelectorAll('h2[id], h3[id]').forEach(heading => {
      heading.style.cursor = 'pointer';
      heading.addEventListener('click', () => {
        const url = `${window.location.pathname}#${heading.id}`;
        navigator.clipboard.writeText(url);
        const toast = document.createElement('div');
        toast.textContent = 'Link copied to clipboard';
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = 'var(--accent-primary)';
        toast.style.color = 'white';
        toast.style.padding = '8px 16px';
        toast.style.borderRadius = '20px';
        toast.style.zIndex = '999';
        toast.style.fontSize = '0.8rem';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
      });
    });
  }

  // ── Service Worker ──
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(err => console.error('SW registration failed:', err));
    });
  }

  // ============================================================
  // RUN ALL INITIALISERS (in correct order)
  // ============================================================
  initGlobalSearch();
  initGlobalScrollSpy();
  initResourcePulse();
  initGlobalKeyboard();
  window.updateGlobalProgress();
  initCopyButtons();
  fetchLastUpdated();
  addResetButton();
  restoreAccordionStates();   // restore open states after accordions exist
  initClickableHeadings();    // make headings clickable

  // Listen for storage changes (if quiz updates happen in another tab)
  window.addEventListener('storage', () => {
    window.updateGlobalProgress();
  });

}); // DOMContentLoaded end