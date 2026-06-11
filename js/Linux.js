// ============================================================
// PILLAR 2: LINUX – FLASHCARDS, QUIZ & PROGRESS TRACKING
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // ----- FLASHCARDS DATA -----
  const FLASHCARDS = [
    { term: "Absolute vs relative path", answer: "Absolute starts with / (from root). Relative starts from current directory. Example: /home/user/file.txt (absolute) vs ./file.txt (relative)" },
    { term: "Create nested directories in one command", answer: "mkdir -p parent/child/grandchild" },
    { term: "Difference between > and >>", answer: "> overwrites entire file. >> appends to end. Use >> to preserve existing content." },
    { term: "Delete a non-empty directory", answer: "rm -r directory_name (or rm -rf for force, no confirmation)" },
    { term: "View file with scrolling", answer: "less filename (Space=down, b=up, /search, q=quit)" },
    { term: "Wildcard for single character", answer: "? matches exactly one character. Example: file-?.txt matches file-1.txt, file-a.txt" },
    { term: "Wildcard for any characters", answer: "* matches zero or more characters. Example: *.log deletes all .log files" },
    { term: "Copy directory recursively", answer: "cp -r source_dir destination_dir" },
    { term: "Hidden file prefix", answer: "Dot (.) prefix hides files/directories. Use ls -a to see them." },
    { term: "Watch log file in real time", answer: "tail -f /var/log/syslog (or any log file)" }
  ];

  function renderFlashcards() {
    const grid = document.getElementById('flashcardGrid');
    if (!grid) return;
    grid.innerHTML = FLASHCARDS.map((card) => `
      <div class="flashcard" tabindex="0" role="button" aria-label="Flashcard: ${card.term}" 
           onclick="this.classList.toggle('flipped')" 
           onkeydown="if(event.key===' '||event.key==='Enter'){event.preventDefault();this.classList.toggle('flipped');}">
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <div class="card-label">Command / Concept</div>
            <div class="card-term">${card.term}</div>
            <div class="card-hint">click or press enter to reveal</div>
          </div>
          <div class="flashcard-back">
            <div class="card-answer">${card.answer}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ----- QUIZ DATA -----
  const QUIZ_QUESTIONS = [
    {
      q: "Which command shows your current directory location?",
      options: ["ls", "cd", "pwd", "dir"],
      correct: 2,
      explain: "pwd = Print Working Directory. Shows the full absolute path of your current location."
    },
    {
      q: "What does `cd -` do?",
      options: ["Goes to root directory", "Goes to home directory", "Goes to previous directory", "Does nothing"],
      correct: 2,
      explain: "cd - toggles back to the previous directory you were in before the last cd command."
    },
    {
      q: "How do you create a file without opening an editor?",
      options: ["newfile.txt", "create file.txt", "touch file.txt", "make file.txt"],
      correct: 2,
      explain: "touch creates an empty file. Also updates timestamp if file exists."
    },
    {
      q: "Which wildcard matches exactly one character?",
      options: ["*", "?", "#", "%"],
      correct: 1,
      explain: "? matches a single character. Example: file-?.txt matches file-1.txt, file-a.txt, but not file-10.txt."
    },
    {
      q: "What is the difference between `rmdir` and `rm -r`?",
      options: ["Nothing, they are the same", "rmdir deletes empty directories only, rm -r deletes directories with contents", "rmdir works on files, rm -r works on directories", "rmdir requires sudo, rm -r doesn't"],
      correct: 1,
      explain: "rmdir only removes empty directories. rm -r recursively deletes directories and all contents."
    }
  ];

  let userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);

  function renderQuiz() {
    const body = document.getElementById('quizBody');
    if (!body) return;
    body.innerHTML = QUIZ_QUESTIONS.map((q, qi) => `
      <div class="quiz-question" id="qq${qi}" style="margin-bottom:1.75rem;padding-bottom:1.75rem;border-bottom:1px solid var(--border-color);">
        <span class="q-number">Question ${qi + 1} of ${QUIZ_QUESTIONS.length}</span>
        ${q.q}
        <div class="quiz-options" style="margin-top:0.875rem;">
          ${q.options.map((opt, oi) => `
            <label class="quiz-option" id="opt${qi}_${oi}" onclick="window.selectLinuxOption(${qi}, ${oi})">
              <input type="radio" name="q${qi}" value="${oi}" />
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  window.selectLinuxOption = function(qi, oi) {
    userAnswers[qi] = oi;
    document.querySelectorAll(`#qq${qi} .quiz-option`).forEach((opt, i) => {
      opt.classList.toggle('selected', i === oi);
    });
    const answered = userAnswers.filter(a => a !== null).length;
    const fill = document.getElementById('quizProgressFill');
    if (fill) fill.style.width = (answered / QUIZ_QUESTIONS.length * 100) + '%';
  };

  window.submitLinuxQuiz = function() {
    const answered = userAnswers.filter(a => a !== null).length;
    if (answered < QUIZ_QUESTIONS.length) {
      const fb = document.getElementById('quizFeedback');
      fb.className = 'quiz-feedback incorrect';
      fb.textContent = `Please answer all ${QUIZ_QUESTIONS.length} questions before submitting. (${answered}/${QUIZ_QUESTIONS.length} answered)`;
      fb.style.display = 'block';
      return;
    }

    let score = 0;
    QUIZ_QUESTIONS.forEach((q, qi) => {
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

    const totalQuestions = QUIZ_QUESTIONS.length;
    if (score === totalQuestions) {
      localStorage.setItem('linux-quiz-passed', 'true');
    }

    // Force update of the floating ring
    if (window.updateFloatingRing) window.updateFloatingRing();

    document.getElementById('quizFeedback').style.display = 'none';
    document.getElementById('quizScore').classList.add('show');
    document.getElementById('scoreNum').textContent = `${score}/${QUIZ_QUESTIONS.length}`;

    const pct = Math.round(score / QUIZ_QUESTIONS.length * 100);
    const previousBest = localStorage.getItem('gc-score-linux') || 0;
    if (pct > previousBest) {
      localStorage.setItem('gc-score-linux', pct);
      if (typeof window.updateGlobalProgress === 'function') {
        window.updateGlobalProgress();
      }
    }

    let msg = '';
    if (pct === 100) msg = 'Perfect score — excellent command of Linux fundamentals.';
    else if (pct >= 80) msg = 'Strong result — revisit any incorrect questions.';
    else if (pct >= 60) msg = 'Good foundation — review the sections above.';
    else msg = 'Keep studying — revisit the accordions above, then try again.';
    document.getElementById('scoreMsg').textContent = `${pct}% — ${msg}`;
    document.getElementById('quizScore').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  window.resetLinuxQuiz = function() {
    userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);
    document.getElementById('quizScore').classList.remove('show');
    const fb = document.getElementById('quizFeedback');
    fb.className = 'quiz-feedback';
    fb.style.display = 'none';
    const fill = document.getElementById('quizProgressFill');
    if (fill) fill.style.width = '0%';
    renderQuiz();

    // Reset quiz mastery flag and update floating ring
    localStorage.removeItem('linux-quiz-passed');
    if (window.updateFloatingRing) window.updateFloatingRing();
  };

  // ----- FLOATING PROGRESS RING & MODAL -----
  function initFloatingProgressRing() {
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

    function updateFloatingRing() {
      const checkboxes = document.querySelectorAll('.section-checkbox');
      const total = checkboxes.length + 1;
      let checked = 0;

      checkboxes.forEach(cb => {
        const section = cb.dataset.section;
        const saved = localStorage.getItem(`linux-section-${section}`);
        const isChecked = saved === 'true' ? true : false;
        cb.checked = isChecked;
        if (isChecked) checked++;
      });

      const quizPassed = localStorage.getItem('linux-quiz-passed') === 'true';
      if (quizPassed) checked++;

      const percent = Math.round((checked / total) * 100);
      const offset = circumference - (percent / 100) * circumference;
      ringFill.style.strokeDasharray = circumference;
      ringFill.style.strokeDashoffset = offset;
      percentSpan.textContent = `${percent}%`;

      // Congratulation toast on 100%
      if (percent === 100) {
        const alreadyCongratulated = localStorage.getItem('linux-100-congrats-shown');
        if (!alreadyCongratulated) {
          localStorage.setItem('linux-100-congrats-shown', 'true');
          const toast = document.createElement('div');
          toast.className = 'coming-soon-toast';
          toast.innerHTML = '🎉 CONGRATULATIONS! 🎉<br>You have mastered Linux & CLI Proficiency!';
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
      }
    }

    window.updateFloatingRing = updateFloatingRing;

    function saveCheckboxState() {
      checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
          localStorage.setItem(`linux-section-${cb.dataset.section}`, cb.checked);
          updateFloatingRing();
        });
      });
    }
    
    // ----- MODAL FUNCTIONALITY -----
    function openProgressModal() {
      const modal = document.getElementById('progressModal');
      if (!modal) return;
      
      // Open modal
      modal.style.display = 'flex';
      
      // Switch to Pillar Details tab (tab 3)
      const tabButton = document.querySelector('.tab-button[data-tab="tab3"]');
      if (tabButton) tabButton.click();
      
      // Load Linux pillar details (using globally exposed function)
      if (typeof window.showPillarDetail === 'function') {
        window.showPillarDetail('linux', 'phase1');
      }
    }

    function closeProgressModal() {
      const modal = document.getElementById('progressModal');
      if (modal) modal.style.display = 'none';
    }

    function getSectionTitle(sectionNum) {
      const titles = {
        '1': 'Section 1 — Filesystem Structure & Navigation',
        '2': 'Section 2 — File & Directory Operations',
        '3': 'Section 3 — Permissions & Ownership',
        '4': 'Section 4 — Users & Groups',
        '5': 'Section 5 — Processes',
        '6': 'Section 6 — Package Management',
        '7': 'Section 7 — Networking Commands',
        '8': 'Section 8 — Bash Scripting',
        '9': 'Section 9 — Systemd & Services',
        '10': 'Section 10 — Text processing (grep/sed/awk/pipes)', 
      };
      return titles[sectionNum] || `Section ${sectionNum}`;
    }
    
    floatingDiv.addEventListener('click', (e) => {
      e.stopPropagation();
      window.openModalToPillarDetails('linux', 'phase1');
    });

    document.addEventListener('click', (e) => {
      const modal = document.getElementById('progressModal');
      if (modal && modal.style.display === 'flex') {
        if (!modal.querySelector('.progress-modal-content').contains(e.target)) {
          closeProgressModal();
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeProgressModal();
      }
    });

    const closeBtn = document.getElementById('closeModalBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeProgressModal);

    const overviewBtn = document.getElementById('modalOverviewBtn');
    if (overviewBtn) {
      overviewBtn.addEventListener('click', () => {
        const overview = document.getElementById('overview');
        if (overview) overview.scrollIntoView({ behavior: 'smooth' });
        closeProgressModal();
      });
    }

    const resetBtn = document.getElementById('modalResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('⚠️ Are you sure? This will reset ALL section checkboxes and quiz mastery for Linux. This cannot be undone.')) {
          for (let i = 1; i <= 8; i++) {
            localStorage.removeItem(`linux-section-${i}`);
          }
          localStorage.removeItem('linux-quiz-passed');
          localStorage.removeItem('linux-100-congrats-shown');

          const checkboxes = document.querySelectorAll('.section-checkbox');
          checkboxes.forEach(cb => {
            cb.checked = false;
          });

          if (window.updateFloatingRing) window.updateFloatingRing();
          closeProgressModal();

          const toast = document.createElement('div');
          toast.className = 'coming-soon-toast';
          toast.textContent = '✅ Linux progress has been reset';
          toast.style.background = 'var(--accent-secondary)';
          document.body.appendChild(toast);
          setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
          }, 2000);
        }
      });
    }

    updateFloatingRing();
    saveCheckboxState();
  }

  if (document.querySelector('.section-checkbox')) {
    initFloatingProgressRing();
  }

  renderFlashcards();
  renderQuiz();
});