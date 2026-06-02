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

    // ── Search Engine (Unified – works on all pages) ──
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

    // ── Helper: Scroll to element smoothly ──
    function scrollToElement(element) {
      if (!element) return;
      const offset = 80; // header offset
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }

    // ── Create search results dropdown ──
    function createResultsDropdown(results, searchTerm) {
      // Remove existing dropdown
      const existingDropdown = document.querySelector('.search-results-dropdown');
      if (existingDropdown) existingDropdown.remove();

      if (!results.length) return;

      const dropdown = document.createElement('div');
      dropdown.className = 'search-results-dropdown';
      dropdown.style.position = 'absolute';
      dropdown.style.top = `${searchInput.getBoundingClientRect().bottom + window.scrollY}px`;
      dropdown.style.left = `${searchInput.getBoundingClientRect().left}px`;
      dropdown.style.width = `${searchInput.offsetWidth}px`;
      dropdown.style.maxHeight = '400px';
      dropdown.style.overflowY = 'auto';
      dropdown.style.background = 'var(--bg-card)';
      dropdown.style.border = '1px solid var(--border-color)';
      dropdown.style.borderRadius = 'var(--radius-md)';
      dropdown.style.boxShadow = 'var(--shadow-md)';
      dropdown.style.zIndex = '1000';
      dropdown.style.backdropFilter = 'blur(4px)';

      results.forEach(result => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.style.padding = '10px 12px';
        item.style.cursor = 'pointer';
        item.style.borderBottom = '1px solid var(--border-color)';
        item.style.transition = 'background 0.2s';

        // Highlight the matching term in the title and preview
        const titleHighlight = result.title.replace(
          new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi'),
          '<mark class="highlight">$1</mark>'
        );
        const previewHighlight = result.preview.replace(
          new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi'),
          '<mark class="highlight">$1</mark>'
        );

        item.innerHTML = `
          <div style="font-weight: 600; font-family: var(--font-display); font-size: 0.85rem;">${titleHighlight}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">${previewHighlight}</div>
        `;

        item.addEventListener('click', () => {
          scrollToElement(result.element);
          // Temporarily highlight the element
          result.element.style.transition = 'background 0.3s';
          result.element.style.background = 'var(--pillar-color-light)';
          setTimeout(() => {
            result.element.style.background = '';
          }, 1500);
          dropdown.remove();
          searchInput.blur();
        });

        item.addEventListener('mouseenter', () => {
          item.style.background = 'var(--bg-tertiary)';
        });
        item.addEventListener('mouseleave', () => {
          item.style.background = '';
        });

        dropdown.appendChild(item);
      });

      document.body.appendChild(dropdown);

      // Close dropdown when clicking outside
      const closeDropdown = (e) => {
        if (!dropdown.contains(e.target) && e.target !== searchInput) {
          dropdown.remove();
          document.removeEventListener('click', closeDropdown);
        }
      };
      setTimeout(() => document.addEventListener('click', closeDropdown), 100);
    }

    // ── Main search logic – searches different content based on page ──
    function performSearch(term) {
      const results = [];
      const lowerTerm = term.toLowerCase();

      // Helper to add result if term matches
      const addResult = (element, title, preview) => {
        if (preview.toLowerCase().includes(lowerTerm) || title.toLowerCase().includes(lowerTerm)) {
          results.push({ element, title, preview: preview.substring(0, 150) });
        }
      };

      // 1. Search accordions (networking page)
      document.querySelectorAll('.accordion[data-searchable]').forEach(accordion => {
        const header = accordion.querySelector('.accordion-title');
        const title = header ? header.innerText.trim() : 'Section';
        const body = accordion.querySelector('.accordion-body');
        const preview = body ? body.innerText.trim() : '';
        if (preview.toLowerCase().includes(lowerTerm) || title.toLowerCase().includes(lowerTerm)) {
          addResult(accordion, title, preview);
          // Auto-open the accordion if closed
          if (!accordion.classList.contains('open')) {
            const headerBtn = accordion.querySelector('.accordion-header');
            if (headerBtn && window.toggleAccordion) {
              window.toggleAccordion(headerBtn);
            }
          }
        }
      });

      // 2. Search pillar cards (home page)
      document.querySelectorAll('.pillar-card').forEach(card => {
        const title = card.querySelector('.card-title')?.innerText || '';
        const desc = card.querySelector('.card-desc')?.innerText || '';
        const preview = `${title} ${desc}`;
        if (preview.toLowerCase().includes(lowerTerm)) {
          addResult(card, `📚 ${title}`, desc);
        }
      });

      // 3. Search study path items (home page)
      document.querySelectorAll('.path-item').forEach(item => {
        const name = item.querySelector('.path-name')?.innerText || '';
        const sub = item.querySelector('.path-sub')?.innerText || '';
        const preview = `${name} ${sub}`;
        if (preview.toLowerCase().includes(lowerTerm)) {
          addResult(item, `🔄 ${name}`, sub);
        }
      });

      // 4. Search roadmap tracker phases
      document.querySelectorAll('.phase-item').forEach(phase => {
        const name = phase.querySelector('.phase-name')?.innerText || '';
        const desc = phase.querySelector('.phase-desc')?.innerText || '';
        const preview = `${name} ${desc}`;
        if (preview.toLowerCase().includes(lowerTerm)) {
          addResult(phase, `📌 ${name}`, desc);
        }
      });

      return results;
    }

    // ── Input handler with dropdown ──
    searchInput.addEventListener('input', function() {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        const term = this.value.trim().toLowerCase();
        
        // Remove existing highlights from all searchable elements
        document.querySelectorAll('.accordion, .pillar-card, .path-item, .phase-item').forEach(el => {
          removeHighlights(el);
        });

        if (!term) {
          // Show everything
          document.querySelectorAll('.accordion').forEach(acc => {
            acc.classList.remove('search-hidden');
          });
          if (noResults) noResults.classList.remove('show');
          // Remove dropdown if exists
          const dropdown = document.querySelector('.search-results-dropdown');
          if (dropdown) dropdown.remove();
          return;
        }

        // Perform search and get results
        const results = performSearch(term);
        
        // Hide accordions that don't match (on networking page)
        document.querySelectorAll('.accordion[data-searchable]').forEach(acc => {
          const header = acc.querySelector('.accordion-title');
          const title = header ? header.innerText.trim() : '';
          const body = acc.querySelector('.accordion-body');
          const content = body ? body.innerText.trim() : '';
          if (!title.toLowerCase().includes(term) && !content.toLowerCase().includes(term)) {
            acc.classList.add('search-hidden');
          } else {
            acc.classList.remove('search-hidden');
            highlightText(acc, term);
          }
        });

        // Show/hide no results message (only on pages with accordions)
        const hasAccordions = document.querySelectorAll('.accordion[data-searchable]').length > 0;
        if (hasAccordions && noResults) {
          const visibleAccordions = document.querySelectorAll('.accordion[data-searchable]:not(.search-hidden)').length;
          noResults.classList.toggle('show', visibleAccordions === 0);
        }

        // Create dropdown with results (always show for quick navigation)
        if (results.length > 0) {
          createResultsDropdown(results, term);
        } else {
          const dropdown = document.querySelector('.search-results-dropdown');
          if (dropdown) dropdown.remove();
        }
      }, 250);
    });

    // Close dropdown on Escape
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const dropdown = document.querySelector('.search-results-dropdown');
        if (dropdown) dropdown.remove();
        searchInput.blur();
      }
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

  function initProgressRing() {
    const ringFill = document.querySelector('.progress-ring-fill');
    const percentSpan = document.getElementById('ringPercent');
    if (!ringFill || !percentSpan) return;

    // Calculate Phase 1 progress: 1/5 pillars = 20%
    const completedPillars = document.querySelectorAll('.pillar-card.complete, .phase-item.complete').length;
    const totalPhase1Pillars = 5;
    const percent = Math.round((completedPillars / totalPhase1Pillars) * 100);
    
    // New circumference for r=78: 2 * π * 78 = 490.088
    const circumference = 490.09;
    const offset = circumference - (percent / 100) * circumference;
    
    ringFill.style.strokeDasharray = `${circumference}`;
    ringFill.style.strokeDashoffset = `${circumference}`;
    
    // Animate
    setTimeout(() => {
      ringFill.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      ringFill.style.strokeDashoffset = offset;
      percentSpan.textContent = `${percent}%`;
    }, 100);
  }

  function initPillarScroller() {
    const scroller = document.getElementById('progressScroller');
    const prevBtn = document.getElementById('scrollerPrev');
    const nextBtn = document.getElementById('scrollerNext');
    const chips = document.querySelectorAll('.pillar-chip');
    
    if (!scroller) return;
    
    // Scroll buttons
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        scroller.scrollBy({ left: -180, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        scroller.scrollBy({ left: 180, behavior: 'smooth' });
      });
    }
    
    // Chip click handling
    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const isLocked = chip.classList.contains('locked');
        const isComingSoon = chip.getAttribute('data-coming-soon') === 'true';
        const link = chip.getAttribute('data-link');
        
        if (isLocked || isComingSoon) {
          showComingSoonToast(chip.querySelector('.chip-name')?.innerText || 'This pillar');
          return;
        }
        
        if (link && link !== '#') {
          window.location.href = link;
        }
      });
    });
  }
  
  function showComingSoonToast(pillarName) {
    // Remove existing toast
    const existing = document.querySelector('.coming-soon-toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'coming-soon-toast';
    toast.textContent = `${pillarName} — page coming soon after foundations are complete`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
  
  function scrollToActiveChip() {
    const activeChip = document.querySelector('.pillar-chip.active');
    const scroller = document.getElementById('progressScroller');
    if (activeChip && scroller) {
      const chipRect = activeChip.getBoundingClientRect();
      const scrollerRect = scroller.getBoundingClientRect();
      const scrollNeeded = chipRect.left - scrollerRect.left + scroller.scrollLeft - 20;
      scroller.scrollTo({ left: scrollNeeded, behavior: 'smooth' });
    }
  }
  
  // Arrow position relative to active chip
  function positionScrollerArrow() {
    const arrow = document.getElementById('scrollerArrow');
    const activeChip = document.querySelector('.pillar-chip.active');
    if (!arrow || !activeChip) return;
    
    const chipRect = activeChip.getBoundingClientRect();
    const scrollerRect = document.getElementById('progressScroller')?.getBoundingClientRect();
    if (scrollerRect) {
      const relativeLeft = chipRect.left + chipRect.width / 2 - scrollerRect.left;
      arrow.style.left = `${relativeLeft}px`;
    }
  }
  
  // Call these on home page
  if (document.querySelector('.progress-ring')) {
    initProgressRing();
    initPillarScroller();
    setTimeout(() => {
      scrollToActiveChip();
      positionScrollerArrow();
    }, 200);
    
    // Reposition arrow on window resize
    window.addEventListener('resize', () => {
      positionScrollerArrow();
    });
  }

    // ============================================================
  // PHASE 2 PROGRESS RING + SCROLLER
  // ============================================================

  function initPhase2ProgressRing() {
    const ringFill = document.querySelector('.phase2-ring');
    const percentSpan = document.getElementById('phase2RingPercent');
    if (!ringFill || !percentSpan) return;

    // Phase 2 progress: 0/5 completed (all locked)
    const completedPhases = 0;
    const totalPhases = 5;
    const percent = Math.round((completedPhases / totalPhases) * 100);
    
    const circumference = 490.09;
    const offset = circumference - (percent / 100) * circumference;
    
    ringFill.style.strokeDasharray = `${circumference}`;
    ringFill.style.strokeDashoffset = `${circumference}`;
    
    setTimeout(() => {
      ringFill.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      ringFill.style.strokeDashoffset = offset;
      percentSpan.textContent = `${percent}%`;
    }, 100);
  }

  function initPhase2Scroller() {
    const scroller = document.getElementById('phase2ProgressScroller');
    const prevBtn = document.getElementById('phase2ScrollerPrev');
    const nextBtn = document.getElementById('phase2ScrollerNext');
    const chips = document.querySelectorAll('.phase2-chip');
    
    if (!scroller) return;
    
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        scroller.scrollBy({ left: -180, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        scroller.scrollBy({ left: 180, behavior: 'smooth' });
      });
    }
    
    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        showComingSoonToast(chip.querySelector('.chip-name')?.innerText || 'This phase');
      });
    });
  }

  function positionPhase2Arrow() {
    const arrow = document.getElementById('phase2ScrollerArrow');
    const activeChip = document.querySelector('.phase2-chip.active');
    if (!arrow || !activeChip) return;
    
    const chipRect = activeChip.getBoundingClientRect();
    const scrollerRect = document.getElementById('phase2ProgressScroller')?.getBoundingClientRect();
    if (scrollerRect) {
      const relativeLeft = chipRect.left + chipRect.width / 2 - scrollerRect.left;
      arrow.style.left = `${relativeLeft}px`;
    }
  }

  function scrollToActivePhase2Chip() {
    const activeChip = document.querySelector('.phase2-chip.active');
    const scroller = document.getElementById('phase2ProgressScroller');
    if (activeChip && scroller) {
      const chipRect = activeChip.getBoundingClientRect();
      const scrollerRect = scroller.getBoundingClientRect();
      const scrollNeeded = chipRect.left - scrollerRect.left + scroller.scrollLeft - 20;
      scroller.scrollTo({ left: scrollNeeded, behavior: 'smooth' });
    }
  }

  // Initialize Phase 2 (if on home page and Phase 2 ring exists)
  if (document.querySelector('.phase2-ring')) {
    initPhase2ProgressRing();
    initPhase2Scroller();
    setTimeout(() => {
      scrollToActivePhase2Chip();
      positionPhase2Arrow();
    }, 200);
    
    window.addEventListener('resize', () => {
      positionPhase2Arrow();
    });
  }

}); // DOMContentLoaded end