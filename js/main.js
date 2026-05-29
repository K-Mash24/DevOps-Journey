// ============================================================
// SHARED GLOBAL UI ENGINE (Runs on all pages)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // ── Theme Toggle Layer ──
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

  // ── Responsive Mobile Sidebar Control ──
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

  // ── Scroll to Top (FIXED: Added missing Click Handler) ──
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });

    // Click handler to physically scroll window smoothly
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Home Page Progress Indicator Initialization (REFACTORED: Fully Dynamic) ──
  const progressFill = document.querySelector('.overall-progress .progress-fill');
  const progressPct = document.querySelector('.overall-progress .progress-pct');
  const progressSegments = document.querySelectorAll('.progress-segments .progress-seg');

  if (progressFill) {
    // 1. Read values from client-side state store (or assume 0% for clean slates)
    const defaultProgress = { networking: 0, linux: 0, security: 0, scripting: 0, databases: 0 };
    const savedProgress = JSON.parse(localStorage.getItem('gc-roadmap-progress')) || defaultProgress;

    // 2. Compute total roadmap average progress metric
    const pillars = Object.keys(savedProgress);
    const overallScore = Math.round(
      pillars.reduce((total, key) => total + savedProgress[key], 0) / pillars.length
    );

    // 3. Reactively apply styles and update text labels
    setTimeout(() => {
      progressFill.style.width = `${overallScore}%`;
      if (progressPct) {
        progressPct.textContent = `${overallScore}% complete`;
      }
    }, 300);

    // 4. Update the visual segment list statuses dynamically underneath the track
    const trackingOrder = ['networking', 'linux', 'security', 'scripting', 'databases'];
    
    progressSegments.forEach((segment, index) => {
      const currentPillar = trackingOrder[index];
      if (!currentPillar) return;

      const dot = segment.querySelector('.seg-dot');
      if (!dot) return;

      const pillarScore = savedProgress[currentPillar];

      // Remove existing status classes safely
      dot.classList.remove('complete', 'active', 'locked');

      if (pillarScore === 100) {
        dot.classList.add('complete');
        segment.childNodes[1].textContent = ` ${currentPillar.charAt(0).toUpperCase() + currentPillar.slice(1)} — complete`;
      } else if (pillarScore > 0) {
        dot.classList.add('active');
        segment.childNodes[1].textContent = ` ${currentPillar.charAt(0).toUpperCase() + currentPillar.slice(1)} — in progress (${pillarScore}%)`;
      } else {
        // Fallback to initial HTML state rules if untouched
        if (currentPillar === 'linux') dot.classList.add('active');
        else dot.classList.add('locked');
      }
    });
  }
});
// ============================================================
// SHARED GLOBAL APPLICATION ENGINE (Across All 5 Pillars)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // ── Existing Utilities: Theme Engine & Mobile Drawers ──
  // [Keep your existing Theme tracking and Hamburger overlay controls here]


  // ── NEW GLOBAL UTILITY 1: Dynamic High-Performance Scroll-Spy ──
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item[href^="#"]');
  if (navItems.length > 0) {
    const observerOptions = { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 };
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, observerOptions);

    // Dynamically grab whatever section hashes are actually inside your sidebar markup
    navItems.forEach(item => {
      const targetId = item.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) spyObserver.observe(targetEl);
    });
  }


  // ── NEW GLOBAL UTILITY 2: Shared Component Search Framework ──
  const searchInput = document.getElementById('searchInput');
  const noResults = document.getElementById('noResults');

  if (searchInput) {
    let searchDebounce;
    
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
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
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


  // ── NEW GLOBAL UTILITY 3: Shared Core Card Engines ──
  // Global rendering method for Flashcards
  window.initializeGlobalFlashcards = function(cardsArray) {
    const grid = document.getElementById('flashcardGrid');
    if (!grid) return;
    grid.innerHTML = cardsArray.map((card) => `
      <div class="flashcard" tabindex="0" role="button" aria-label="Flashcard: ${card.term}"
           onclick="this.classList.toggle('flipped')"
           onkeydown="if(event.key===' '||event.key==='Enter'){event.preventDefault();this.classList.toggle('flipped');}">
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <div class="card-label">Term</div>
            <div class="card-term">${card.term}</div>
            <div class="card-hint">click or press enter to reveal</div>
          </div>
          <div class="flashcard-back">
            <div class="card-answer">${card.answer}</div>
          </div>
        </div>
      </div>
    `).join('');
  };

  // Global rendering method for Quizzes
  let globalAnswers = [];
  window.initializeGlobalQuiz = function(quizQuestions, storageKey) {
    const body = document.getElementById('quizBody');
    if (!body) return;
    
    globalAnswers = new Array(quizQuestions.length).fill(null);
    body.innerHTML = quizQuestions.map((q, qi) => `
      <div class="quiz-question" id="qq${qi}">
        <span class="q-number">Question ${qi + 1} of ${quizQuestions.length}</span>
        ${q.q}
        <div class="quiz-options">
          ${q.options.map((opt, oi) => `
            <label class="quiz-option" id="opt${qi}_${oi}" onclick="selectGlobalOption(${qi}, ${oi}, ${quizQuestions.length})">
              <input type="radio" name="q${qi}" value="${oi}" />
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `).join('');

    // Wire up submission hooks
    window.submitGlobalQuiz = function() {
      let score = 0;
      quizQuestions.forEach((q, qi) => {
        const isCorrect = globalAnswers[qi] === q.correct;
        if (isCorrect) score++;
        // Apply stylistic response feedback variables directly...
      });
      // Save highscore using the unique page context identifier key
      const pct = Math.round(score / quizQuestions.length * 100);
      if (pct > (localStorage.getItem(storageKey) || 0)) localStorage.setItem(storageKey, pct);
    };
  };

  // Dynamic Ambient Card Triggering Logic
  const ambientObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.resource-card').forEach((card, i) => {
          setTimeout(() => card.classList.add('lighting-flash'), i * 100);
        });
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  const resContainer = document.getElementById('resources');
  if (resContainer) ambientObserver.observe(resContainer);
});

// Single Shared Global Accordion Action
window.toggleAccordion = function(header) {
  const accordion = header.closest('.accordion');
  if (accordion) accordion.classList.toggle('open');
};


// ── Global Search Hotkey Engine (Press '/' to Focus) ──
  const searchInput = document.getElementById('searchInput');
  
  if (searchInput) {
    window.addEventListener('keydown', (event) => {
      // 1. Skip if the user is already focused on a form input or textarea
      const activeEl = document.activeElement.tagName;
      if (activeEl === 'INPUT' || activeEl === 'TEXTAREA' || document.activeElement.isContentEditable) {
        return;
      }

      // 2. Catch the forward-slash key press
      if (event.key === '/') {
        event.preventDefault(); // Prevents the actual "/" character from filling into the input box
        searchInput.focus();
        searchInput.select();    // Selects existing text so they can immediately type a fresh search
      }
    });
  }

  // ── Global Keyboard Close Overlay Control ──
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebarOverlay');
      
      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
      }
    }
  });

  // ── Home Page Progress Indicator Initialization ──
  const progressFill = document.querySelector('.overall-progress .progress-fill');
  const progressText = document.querySelector('.overall-progress-text'); // If you want to show text like "20% Done"

  if (progressFill) {
    // 1. Define all your pillars and their storage keys as you build them out
    const pillars = [
      'gc-score-networking', // Phase 1
      'gc-score-linux',      // Phase 2 (Future)
      'gc-score-security',   // Phase 3 (Future)
      'gc-score-scripting',  // Phase 4 (Future)
      'gc-score-databases'   // Phase 5 (Future)
    ];

    // 2. Count how many pillars have been completed (e.g., quiz score >= 80%)
    let completedCount = 0;
    pillars.forEach(key => {
      const score = parseInt(localStorage.getItem(key) || 0, 10);
      if (score >= 80) { // Considered passing/mastered
        completedCount++;
      }
    });

    // 3. Translate that into a global percentage wheel
    const totalPillars = pillars.length;
    const overallPercentage = Math.round((completedCount / totalPillars) * 100);

    // 4. Animate the bar into position on load
    setTimeout(() => {
      progressFill.style.width = `${overallPercentage}%`;
      if (progressText) {
        progressText.textContent = `${overallPercentage}% Completed`;
      }
    }, 300);
  }