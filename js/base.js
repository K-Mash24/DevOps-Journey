// ============================================================
// BASE.JS — Shared functionality for all pillar pages
// ============================================================

(function() {
  'use strict';

  // --- Configuration ---
  // This object will be populated by the pillar-specific script
  window.BASE_CONFIG = null;

  // --- Internal state for quiz ---
  let currentSet = 1;
  let currentQuestions = [];
  let userAnswers = [];

  // ============================================================
  // PUBLIC API
  // ============================================================

  const Base = {

    /**
     * Initialise the pillar page with the given configuration.
     * @param {Object} config - Pillar configuration:
     *   { id, name, totalSections, sectionPrefix, quizKey, 
     *     quizSetPrefix, congratsKey, scoreKey, flashcardData, quizSets }
     */
    init: function(config) {
      window.BASE_CONFIG = config;

      // Render flashcards
      this.renderFlashcards(config.flashcardData || []);

      // Set up quiz
      this.quizSets = config.quizSets || {};
      if (Object.keys(this.quizSets).length > 0) {
        currentSet = 1;
        currentQuestions = this.quizSets[1] || [];
        userAnswers = new Array(currentQuestions.length).fill(null);
        this.renderQuiz();

        // Set up quiz set buttons
        document.getElementById('set1Btn')?.addEventListener('click', () => this.loadQuizSet(1));
        document.getElementById('set2Btn')?.addEventListener('click', () => this.loadQuizSet(2));
        document.getElementById('set3Btn')?.addEventListener('click', () => this.loadQuizSet(3));
        document.getElementById('resetAllBtn')?.addEventListener('click', this.resetAllQuizProgress.bind(this));
      }

      // Initialise floating progress ring
      if (document.querySelector('.section-checkbox')) {
        this.initFloatingProgressRing(config);
      }

      // Update page header (if element exists)
      if (document.getElementById('completionRing')) {
        this.updatePageHeader(config);
        window.addEventListener('storage', (e) => {
          if (e.key && e.key.includes(config.id)) {
            this.updatePageHeader(config);
            if (window.updateFloatingRing) window.updateFloatingRing();
          }
        });
      }

      console.log(`✅ ${config.name} initialised via base.js`);
    },

    // ============================================================
    // FLASHCARDS
    // ============================================================

    renderFlashcards: function(flashcards) {
      const track = document.getElementById('flashcardTrack');
      if (!track) return;

      track.innerHTML = flashcards.map((card, index) => `
        <div class="flashcard" tabindex="0" role="button" aria-label="Flashcard: ${card.term}" 
            data-index="${index}"
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

      const countSpan = document.getElementById('flashcardCount');
      if (countSpan) countSpan.textContent = `${flashcards.length} cards`;

      this.initFlashcardScroller();
    },

    initFlashcardScroller: function() {
      const scroller = document.getElementById('flashcardScroller');
      const prevBtn = document.getElementById('flashcardPrev');
      const nextBtn = document.getElementById('flashcardNext');
      const indicator = document.getElementById('flashcardIndicator');
      if (!scroller) return;

      function updateIndicator() {
        if (!indicator) return;
        const scrollLeft = scroller.scrollLeft;
        const scrollWidth = scroller.scrollWidth;
        const clientWidth = scroller.clientWidth;
        const maxScroll = scrollWidth - clientWidth;
        const scrollPercent = maxScroll > 0 ? scrollLeft / maxScroll : 0;
        const cards = document.querySelectorAll('.flashcard');
        const totalCards = cards.length;
        const activeIndex = Math.round(scrollPercent * (totalCards - 1));
        const dots = indicator.querySelectorAll('.scroll-dot');
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === activeIndex);
        });
      }

      if (indicator) {
        const totalCards = window.BASE_CONFIG?.flashcardData?.length || 0;
        indicator.innerHTML = Array.from({ length: totalCards }, (_, i) =>
          `<span class="scroll-dot" data-index="${i}"></span>`
        ).join('');
        indicator.querySelectorAll('.scroll-dot').forEach(dot => {
          dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            const cardWidth = document.querySelector('.flashcard')?.offsetWidth || 260;
            const gap = 16;
            scroller.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
          });
        });
      }

      if (prevBtn) prevBtn.addEventListener('click', () => scroller.scrollBy({ left: -280, behavior: 'smooth' }));
      if (nextBtn) nextBtn.addEventListener('click', () => scroller.scrollBy({ left: 280, behavior: 'smooth' }));

      scroller.addEventListener('scroll', () => requestAnimationFrame(updateIndicator));
      setTimeout(updateIndicator, 100);
      window.addEventListener('resize', () => setTimeout(updateIndicator, 100));
    },

    // ============================================================
    // QUIZ ENGINE
    // ============================================================

    loadQuizSet: function(setNumber) {
      if (!this.quizSets[setNumber]) return;
      currentSet = setNumber;
      currentQuestions = this.quizSets[currentSet];
      userAnswers = new Array(currentQuestions.length).fill(null);
      this.renderQuiz();
      document.getElementById('quizProgressFill').style.width = '0%';
      document.getElementById('quizScore').classList.remove('show');
      document.getElementById('quizFeedback').style.display = 'none';
    },

    renderQuiz: function() {
      const body = document.getElementById('quizBody');
      if (!body) return;
      body.innerHTML = currentQuestions.map((q, qi) => `
        <div class="quiz-question" id="qq${qi}" style="margin-bottom:1.75rem;padding-bottom:1.75rem;border-bottom:1px solid var(--border-color);">
          <span class="q-number">Question ${qi + 1} of ${currentQuestions.length}</span>
          ${q.q}
          <div class="quiz-options" style="margin-top:0.875rem;">
            ${q.options.map((opt, oi) => `
              <label class="quiz-option" id="opt${qi}_${oi}" onclick="Base.selectOption(${qi}, ${oi})">
                <input type="radio" name="q${qi}" value="${oi}" />
                <span>${opt}</span>
              </label>
            `).join('')}
          </div>
        </div>
      `).join('');
    },

    selectOption: function(qi, oi) {
      userAnswers[qi] = oi;
      document.querySelectorAll(`#qq${qi} .quiz-option`).forEach((opt, i) => {
        opt.classList.toggle('selected', i === oi);
      });
      const answered = userAnswers.filter(a => a !== null).length;
      const fill = document.getElementById('quizProgressFill');
      if (fill) fill.style.width = (answered / currentQuestions.length * 100) + '%';
    },

    submitQuiz: function() {
      const config = window.BASE_CONFIG;
      const answered = userAnswers.filter(a => a !== null).length;
      if (answered < currentQuestions.length) {
        const fb = document.getElementById('quizFeedback');
        fb.className = 'quiz-feedback incorrect';
        fb.textContent = `Please answer all ${currentQuestions.length} questions before submitting. (${answered}/${currentQuestions.length} answered)`;
        fb.style.display = 'block';
        return;
      }

      let score = 0;
      currentQuestions.forEach((q, qi) => {
        const isCorrect = userAnswers[qi] === q.correct;
        if (isCorrect) score++;
        document.querySelectorAll(`#qq${qi} .quiz-option`).forEach((opt, oi) => {
          if (oi === q.correct) opt.classList.add('correct');
          else if (oi === userAnswers[qi] && !isCorrect) opt.classList.add('incorrect');
          opt.style.pointerEvents = 'none';
        });
        const qEl = document.getElementById(`qq${qi}`);
        if (!qEl.querySelector('.quiz-explain')) {
          const explain = document.createElement('div');
          explain.className = 'info-box ' + (isCorrect ? 'tip' : 'warning') + ' quiz-explain';
          explain.style.marginTop = '0.75rem';
          explain.innerHTML = `<strong>${isCorrect ? 'Correct' : 'Incorrect'}</strong> ${q.explain}`;
          qEl.appendChild(explain);
        }
      });

      if (score === currentQuestions.length) {
        localStorage.setItem(`${config.quizSetPrefix}${currentSet}-passed`, 'true');
        if (this.isQuizMastered(config)) {
          localStorage.setItem(config.quizKey, 'true');
        }
      }

      if (window.updateFloatingRing) window.updateFloatingRing();

      document.getElementById('quizFeedback').style.display = 'none';
      document.getElementById('quizScore').classList.add('show');
      document.getElementById('scoreNum').textContent = `${score}/${currentQuestions.length}`;

      const pct = Math.round(score / currentQuestions.length * 100);
      const previousBest = localStorage.getItem(config.scoreKey) || 0;
      if (pct > previousBest) {
        localStorage.setItem(config.scoreKey, pct);
      }

      let msg = '';
      if (pct === 100) msg = `Perfect score — outstanding mastery of ${config.name}! 🎉`;
      else if (pct >= 80) msg = 'Strong result — revisit any incorrect questions.';
      else if (pct >= 60) msg = 'Good foundation — review the sections above.';
      else msg = 'Keep studying — revisit the accordions above, then try again.';
      document.getElementById('scoreMsg').textContent = `${pct}% — ${msg}`;
      document.getElementById('quizScore').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    resetQuiz: function() {
      const config = window.BASE_CONFIG;
      userAnswers = new Array(currentQuestions.length).fill(null);
      document.getElementById('quizScore').classList.remove('show');
      const fb = document.getElementById('quizFeedback');
      fb.className = 'quiz-feedback';
      fb.style.display = 'none';
      const fill = document.getElementById('quizProgressFill');
      if (fill) fill.style.width = '0%';
      this.renderQuiz();

      localStorage.removeItem(`${config.quizSetPrefix}${currentSet}-passed`);
      if (!this.isQuizMastered(config)) {
        localStorage.removeItem(config.quizKey);
      }
      if (window.updateFloatingRing) window.updateFloatingRing();
    },

    resetAllQuizProgress: function() {
      const config = window.BASE_CONFIG;
      for (let i = 1; i <= 3; i++) {
        localStorage.removeItem(`${config.quizSetPrefix}${i}-passed`);
      }
      localStorage.removeItem(config.quizKey);
      if (window.updateFloatingRing) window.updateFloatingRing();
    },

    isQuizMastered: function(config) {
      for (let i = 1; i <= 3; i++) {
        if (localStorage.getItem(`${config.quizSetPrefix}${i}-passed`) === 'true') {
          return true;
        }
      }
      return false;
    },

    // ============================================================
    // FLOATING PROGRESS RING
    // ============================================================

    initFloatingProgressRing: function(config) {
      const checkboxes = document.querySelectorAll('.section-checkbox');
      if (!checkboxes.length) return;

      const floatingDiv = document.createElement('div');
      floatingDiv.className = 'floating-progress-ring';
      floatingDiv.innerHTML = `
        <svg class="floating-ring-svg" viewBox="0 0 60 60">
          <circle class="floating-ring-bg" cx="30" cy="30" r="26" fill="none" stroke-width="4"/>
          <circle class="floating-ring-fill" cx="30" cy="30" r="26" fill="none" stroke-width="4" stroke-linecap="round"/>
        </svg>
        <div class="floating-ring-percent" id="floatingPercent">0%</div>
      `;
      document.body.appendChild(floatingDiv);

      const ringFill = floatingDiv.querySelector('.floating-ring-fill');
      const percentSpan = floatingDiv.querySelector('#floatingPercent');
      const circumference = 2 * Math.PI * 26;

      const updateFloatingRing = () => {
        let checked = 0;
        checkboxes.forEach(cb => {
          const section = cb.dataset.section;
          const saved = localStorage.getItem(`${config.sectionPrefix}${section}`);
          const isChecked = saved === 'true' ? true : false;
          cb.checked = isChecked;
          if (isChecked) checked++;
        });

        const quizPassed = localStorage.getItem(config.quizKey) === 'true';
        if (quizPassed) checked++;

        const total = checkboxes.length + 1;
        const percent = Math.round((checked / total) * 100);
        const offset = circumference - (percent / 100) * circumference;
        ringFill.style.strokeDasharray = circumference;
        ringFill.style.strokeDashoffset = offset;
        percentSpan.textContent = `${percent}%`;

        if (percent === 100 && !localStorage.getItem(config.congratsKey)) {
          localStorage.setItem(config.congratsKey, 'true');
          const toast = document.createElement('div');
          toast.className = 'coming-soon-toast';
          toast.innerHTML = `🎉 CONGRATULATIONS! 🎉<br>You have mastered ${config.name}!`;
          toast.style.background = 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))';
          toast.style.padding = '12px 24px';
          toast.style.fontSize = '0.9rem';
          toast.style.fontWeight = 'bold';
          toast.style.textAlign = 'center';
          document.body.appendChild(toast);
          setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
          }, 4000);
        }
      };

      window.updateFloatingRing = updateFloatingRing;

      checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
          localStorage.setItem(`${config.sectionPrefix}${cb.dataset.section}`, cb.checked);
          updateFloatingRing();
        });
      });

      floatingDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof window.openModalToPillarDetails === 'function') {
          window.openModalToPillarDetails(config.id, 'phase1');
        }
      });

      updateFloatingRing();
    },

    // ============================================================
    // PAGE HEADER
    // ============================================================

    updatePageHeader: function(config) {
      let completedSections = 0;
      for (let i = 1; i <= config.totalSections; i++) {
        if (localStorage.getItem(`${config.sectionPrefix}${i}`) === 'true') {
          completedSections++;
        }
      }

      const quizPassed = localStorage.getItem(config.quizKey) === 'true';
      const totalItems = config.totalSections + 1;
      const completedItems = completedSections + (quizPassed ? 1 : 0);
      const percent = Math.round((completedItems / totalItems) * 100);

      const ringFill = document.querySelector('#completionRing .ring-fill');
      const percentDisplay = document.getElementById('completionPercent');
      if (ringFill && percentDisplay) {
        const circumference = 2 * Math.PI * 20;
        const offset = circumference - (percent / 100) * circumference;
        ringFill.style.strokeDashoffset = offset;
        percentDisplay.textContent = `${percent}%`;
      }

      const container = document.getElementById('metaBadges');
      if (container) {
        let statusClass, statusIcon, statusText;
        if (percent === 100) {
          statusClass = 'status-complete';
          statusIcon = '✓';
          statusText = 'Complete';
        } else if (percent > 0) {
          statusClass = 'status-progress';
          statusIcon = '⟳';
          statusText = 'In Progress';
        } else {
          statusClass = 'status-locked';
          statusIcon = '○';
          statusText = 'Not Started';
        }

        container.innerHTML = `
          <span class="meta-badge ${statusClass}">
            <span class="icon">${statusIcon}</span> ${statusText}
          </span>
          <span class="meta-badge">
            <span class="icon">📄</span> ${config.totalSections} sections
          </span>
          <span class="meta-badge">
            <span class="icon">✓</span> ${completedSections}/${config.totalSections}
          </span>
          <span class="meta-badge ${quizPassed ? 'quiz-passed' : ''}">
            <span class="icon">${quizPassed ? '🎯' : '📝'}</span> ${quizPassed ? 'Quiz passed' : 'Quiz pending'}
          </span>
        `;
      }
    }
  };

  // --- Expose Base globally ---
  window.Base = Base;

})();