// ============================================================
// PILLAR 2: LINUX – FLASHCARDS, QUIZ & PROGRESS TRACKING
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // ----- FLASHCARDS DATA (25 flashcards total) -----
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
  { term: "Watch log file in real time", answer: "tail -f /var/log/syslog (or any log file)" },
  { term: "Display file permissions in octal", answer: "stat -c '%a %n' filename (e.g., 644 for rw-r--r--)" },
  { term: "Change file permissions (numeric)", answer: "chmod 755 script.sh (rwxr-xr-x) or chmod 644 file.txt (rw-r--r--)" },
  { term: "Change file permissions (symbolic)", answer: "chmod u+x file.sh (add execute for user), chmod go-w file.txt (remove write from group and others)" },
  { term: "Change file owner", answer: "sudo chown newowner filename (requires sudo)" },
  { term: "Change file owner and group", answer: "sudo chown user:group filename (e.g., sudo chown alice:developers script.sh)" },
  { term: "Change group ownership only", answer: "chgrp groupname filename" },
  { term: "Display running processes", answer: "ps aux (all processes), top (interactive), htop (colorful interactive)" },
  { term: "Kill a process by PID", answer: "kill -9 PID (force kill), kill -15 PID (graceful termination)" },
  { term: "Kill a process by name", answer: "pkill process_name (e.g., pkill firefox), killall process_name" },
  { term: "Display disk usage", answer: "df -h (human-readable filesystem disk usage), du -sh directory (size of directory)" },
  { term: "Search within files using grep", answer: "grep 'pattern' filename (e.g., grep 'error' /var/log/syslog)" },
  { term: "Search recursively in directories", answer: "grep -r 'pattern' /path/to/dir (recursive search)" },
  { term: "Stream editor for text replacement", answer: "sed 's/old/new/g' filename (replace all occurrences of 'old' with 'new')" },
  { term: "Print first N lines of a file", answer: "head -n 20 filename (first 20 lines)" },
  { term: "Print last N lines of a file", answer: "tail -n 20 filename (last 20 lines)" }
];

// Total: 25 flashcards covering:

// - Navigation (paths, wildcards, hidden files)
// -File operations (mkdir, cp, rm, mv, redirections)
// - Permissions & ownership (chmod, chown, chgrp, stat)
// - Process management (ps, kill, pkill)
// - Disk usage (df, du)
// - Text processing (grep, sed)
// - File viewing (head, tail, less, tail -f)

  function renderFlashcards() {
    const track = document.getElementById('flashcardTrack');
    if (!track) return;
    
    track.innerHTML = FLASHCARDS.map((card, index) => `
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
    
        // Update flashcard counter
    const countSpan = document.getElementById('flashcardCount');
    if (countSpan) {
      countSpan.textContent = `${FLASHCARDS.length} cards`;
    }

    initFlashcardScroller();
  }

  function initFlashcardScroller() {
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
    
    // Create indicator dots
    if (indicator) {
      const totalCards = FLASHCARDS.length;
      indicator.innerHTML = Array.from({ length: totalCards }, (_, i) => 
        `<span class="scroll-dot" data-index="${i}"></span>`
      ).join('');
      
      indicator.querySelectorAll('.scroll-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
          const index = parseInt(e.target.dataset.index);
          const cardWidth = document.querySelector('.flashcard')?.offsetWidth || 260;
          const gap = 16; // gap between cards
          const scrollPosition = index * (cardWidth + gap);
          scroller.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        });
      });
    }
    
    // Scroll buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        scroller.scrollBy({ left: -280, behavior: 'smooth' });
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        scroller.scrollBy({ left: 280, behavior: 'smooth' });
      });
    }
    
    // Update indicator on scroll
    scroller.addEventListener('scroll', () => {
      requestAnimationFrame(updateIndicator);
    });
    
    // Initial indicator update
    setTimeout(updateIndicator, 100);
    
    // Update on window resize
    window.addEventListener('resize', () => {
      setTimeout(updateIndicator, 100);
    });
  }

  // Remember to look at networking.js to look at the new ways of rendering quizes when i am done
  // ----- QUIZ DATA -----
  const QUIZ_SETS = {
    1: [
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
    ]
  };

  // After defining QUIZ_SETS
  let currentSet = 1;
  let currentQuestions = QUIZ_SETS[currentSet];
  let userAnswers = new Array(currentQuestions.length).fill(null);

  // Function to load a specific set (to be called by set selector buttons)
  function loadQuizSet(setNumber) {
    if (!QUIZ_SETS[setNumber]) return;
    currentSet = setNumber;
    currentQuestions = QUIZ_SETS[currentSet];
    userAnswers = new Array(currentQuestions.length).fill(null);
    renderQuiz();
    //Reset progress
    document.getElementById('quizProgressFill').style.width = '0%';
    document.getElementById('quizScore').classList.remove('show');
    document.getElementById('quizFeedback').style.display = 'none';
  }

  function renderQuiz() {
    const body = document.getElementById('quizBody');
    if (!body) return;
    body.innerHTML = currentQuestions.map((q, qi) => `
      <div class="quiz-question" id="qq${qi}" style="margin-bottom:1.75rem;padding-bottom:1.75rem;border-bottom:1px solid var(--border-color);">
        <span class="q-number">Question ${qi + 1} of ${currentQuestions.length}</span>
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
    if (fill) fill.style.width = (answered / currentQuestions.length * 100) + '%';
  };

  window.submitLinuxQuiz = function() {
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

    const totalQuestions = currentQuestions.length;
    if (score === totalQuestions) {
      // Mark this specific set as passed
      localStorage.setItem(`linux-quiz-set-${currentSet}-passed`, 'true');
      
      // Check if ANY set is mastered to update the floating ring
      if (isQuizMastered()) {
        localStorage.setItem('linux-quiz-passed', 'true');
      }
    }

    // Force update of the floating ring
    if (window.updateFloatingRing) window.updateFloatingRing();

    document.getElementById('quizFeedback').style.display = 'none';
    document.getElementById('quizScore').classList.add('show');
    document.getElementById('scoreNum').textContent = `${score}/${currentQuestions.length}`;

    const pct = Math.round(score / currentQuestions.length * 100);
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
    userAnswers = new Array(currentQuestions.length).fill(null);
    document.getElementById('quizScore').classList.remove('show');
    const fb = document.getElementById('quizFeedback');
    fb.className = 'quiz-feedback';
    fb.style.display = 'none';
    const fill = document.getElementById('quizProgressFill');
    if (fill) fill.style.width = '0%';
    renderQuiz();

    // Only reset mastery for the CURRENT set (not all sets)
    localStorage.removeItem(`linux-quiz-set-${currentSet}-passed`);

    // If no sets are mastered anymore, remove the overall flag
    if (!isQuizMastered()) {
      localStorage.removeItem('linux-quiz-passed');
    }
    
    if (window.updateFloatingRing) window.updateFloatingRing();
  };

  document.getElementById('set1Btn')?.addEventListener('click', () => loadQuizSet(1));
  document.getElementById('set2Btn')?.addEventListener('click', () => loadQuizSet(2));
  document.getElementById('set3Btn')?.addEventListener('click', () => loadQuizSet(3));
  document.getElementById('resetAllBtn')?.addEventListener('click', resetAllQuizProgress);

  function isQuizMastered() {
    // Check if any of the three quiz sets have been passed
    for (let i = 1; i <= 3; i++) {
      if (localStorage.getItem(`linux-quiz-set-${i}-passed`) === 'true') {
        return true;
      }
    }
    return false;
  }

  function resetAllQuizProgress() {
    for (let i = 1; i <= 3; i++) {
      localStorage.removeItem(`linux-quiz-set-${i}-passed`);
    }
    localStorage.removeItem('linux-quiz-passed');
    if (window.updateFloatingRing) window.updateFloatingRing();
  }
  // ============================================

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
        '5': 'Section 5 — Processes & Job Control',
        '6': 'Section 6 — Package Management',
        '7': 'Section 7 — Bash Scripting',
        '8': 'Section 8 — Systemd & Services',
        '9': 'Section 9 — Text Processing (grep, sed, awk)',
        '10': 'Section 10 — Networking Commands',
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
          for (let i = 1; i <= 10; i++) {
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

    // ... existing code (renderFlashcards, renderQuiz, etc.) ...

  renderFlashcards();
  renderQuiz();

  // ----- IMAGE LIGHTBOX (Popup + Zoom) with consistent scaling -----
  function initImageLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const container = document.getElementById('lightboxContainer');
    const closeBtn = document.getElementById('lightboxClose');
    const zoomInBtn = document.getElementById('lightboxZoomIn');
    const zoomOutBtn = document.getElementById('lightboxZoomOut');
    const resetBtn = document.getElementById('lightboxReset');
    const zoomInfo = document.getElementById('lightboxZoomInfo');
    
    if (!lightbox) return;
    
    let currentScale = 1;
    let panX = 0, panY = 0;
    let isDragging = false;
    let startX = 0, startY = 0;
    let isFitToScreen = true;
    
    // Add Fit to Screen button
    const controlsDiv = document.querySelector('.lightbox-controls');
    let fitBtn = document.getElementById('lightboxFitBtn');
    if (!fitBtn && controlsDiv) {
      fitBtn = document.createElement('button');
      fitBtn.id = 'lightboxFitBtn';
      fitBtn.className = 'fit-to-screen-btn';
      fitBtn.innerHTML = '📐 Fit';
      fitBtn.title = 'Toggle fit to screen / actual size';
      controlsDiv.insertBefore(fitBtn, zoomInBtn);
    }
    
    function updateTransform() {
      if (isFitToScreen) {
        lightboxImg.classList.remove('zoomed');
        lightboxImg.style.transform = '';
        lightboxImg.style.maxWidth = '90vw';
        lightboxImg.style.maxHeight = '85vh';
        container.style.overflow = 'hidden';
        if (fitBtn) fitBtn.classList.add('active');
      } else {
        lightboxImg.classList.add('zoomed');
        lightboxImg.style.transform = `translate(${panX}px, ${panY}px) scale(${currentScale})`;
        lightboxImg.style.maxWidth = 'none';
        lightboxImg.style.maxHeight = 'none';
        container.style.overflow = 'auto';
        if (fitBtn) fitBtn.classList.remove('active');
      }
      if (!isFitToScreen) {
        zoomInfo.textContent = `${Math.round(currentScale * 100)}%`;
      } else {
        zoomInfo.textContent = 'Fit to screen';
      }
    }
    
    function resetView() {
      currentScale = 1;
      panX = 0;
      panY = 0;
      isFitToScreen = true;
      updateTransform();
      container.style.cursor = 'default';
    }
    
    function toggleFitMode() {
      isFitToScreen = !isFitToScreen;
      if (isFitToScreen) {
        resetView();
      } else {
        lightboxImg.classList.add('zoomed');
        currentScale = 1;
        panX = 0;
        panY = 0;
        updateTransform();
        container.style.cursor = 'grab';
      }
    }
    
    function zoomIn() {
      if (isFitToScreen) toggleFitMode();
      currentScale = Math.min(currentScale + 0.25, 4);
      updateTransform();
    }
    
    function zoomOut() {
      if (isFitToScreen) toggleFitMode();
      currentScale = Math.max(currentScale - 0.25, 0.5);
      updateTransform();
    }
    
    // Open lightbox on image click
    document.querySelectorAll('.accordion-body img, .overview-content img').forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Enlarged image';
        resetView();
        lightbox.classList.add('active');
      });
    });
    
    // Close lightbox
    function closeLightbox() {
      lightbox.classList.remove('active');
      resetView();
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    resetBtn.addEventListener('click', resetView);
    if (fitBtn) fitBtn.addEventListener('click', toggleFitMode);
    
    // Panning with mouse
    container.addEventListener('mousedown', (e) => {
      if (isFitToScreen || currentScale <= 1) return;
      isDragging = true;
      startX = e.clientX - panX;
      startY = e.clientY - panY;
      container.style.cursor = 'grabbing';
      e.preventDefault();
    });
    
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      panX = e.clientX - startX;
      panY = e.clientY - startY;
      updateTransform();
    });
    
    window.addEventListener('mouseup', () => {
      isDragging = false;
      container.style.cursor = (!isFitToScreen && currentScale > 1) ? 'grab' : 'default';
    });
    
    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
      if (isFitToScreen || currentScale <= 1) return;
      isDragging = true;
      const touch = e.touches[0];
      startX = touch.clientX - panX;
      startY = touch.clientY - panY;
      e.preventDefault();
    });
    
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      panX = touch.clientX - startX;
      panY = touch.clientY - panY;
      updateTransform();
      e.preventDefault();
    });
    
    window.addEventListener('touchend', () => {
      isDragging = false;
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-' || e.key === '_') zoomOut();
      if (e.key === '0') resetView();
      if (e.key === 'f' || e.key === 'F') toggleFitMode();
    });
  }
  
  initImageLightbox();

}); // DOMContentLoaded end