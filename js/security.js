// ============================================================
// PILLAR 3: SECURITY – FLASHCARDS, QUIZ & PROGRESS TRACKING
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // ----- FLASHCARDS DATA (5 placeholder cards – expand later) -----
  const FLASHCARDS = [
    // SECTION 1 — Cryptography Fundamentals
    { term: "Symmetric encryption", answer: "Uses the same key for encryption and decryption. Fast and efficient for bulk data." },
    { term: "Asymmetric encryption", answer: "Uses a public/private key pair. Slower but enables secure key exchange and digital signatures." },
    
    // SECTION 2 — Hashing
    { term: "Hash function", answer: "A one-way function that produces a fixed-size output (digest) from any input. Used for integrity checks and password storage." },
    
    // SECTION 3 — TLS/SSL
    { term: "TLS handshake", answer: "Negotiates encryption parameters, exchanges certificates, and establishes a shared secret between client and server." },
    
    // SECTION 4 — PKI
    { term: "Certificate Authority (CA)", answer: "A trusted entity that issues digital certificates, verifying the identity of certificate holders." }
  ];

  // ----- RENDER FLASHCARDS -----
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
    
    const countSpan = document.getElementById('flashcardCount');
    if (countSpan) {
      countSpan.textContent = `${FLASHCARDS.length} cards`;
    }

    initFlashcardScroller();
  }

  // ----- FLASHCARD SCROLLER -----
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
    
    if (indicator) {
      const totalCards = FLASHCARDS.length;
      indicator.innerHTML = Array.from({ length: totalCards }, (_, i) => 
        `<span class="scroll-dot" data-index="${i}"></span>`
      ).join('');
      
      indicator.querySelectorAll('.scroll-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
          const index = parseInt(e.target.dataset.index);
          const cardWidth = document.querySelector('.flashcard')?.offsetWidth || 260;
          const gap = 16;
          const scrollPosition = index * (cardWidth + gap);
          scroller.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        });
      });
    }
    
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
    
    scroller.addEventListener('scroll', () => {
      requestAnimationFrame(updateIndicator);
    });
    
    setTimeout(updateIndicator, 100);
    window.addEventListener('resize', () => {
      setTimeout(updateIndicator, 100);
    });
  }

  // ============================================================
  // QUIZ DATA – 3 SETS (5 questions each – placeholder)
  // ============================================================
  const QUIZ_SETS = {
    // ----- SET 1: Core Concepts -----
    1: [
      {
        q: "What is symmetric encryption?",
        options: ["Uses one key for both encryption and decryption", "Uses two different keys", "Uses no key", "Uses three keys"],
        correct: 0,
        explain: "Symmetric encryption uses a single key for both encryption and decryption. Fast and efficient for bulk data."
      },
      {
        q: "What is a hash function?",
        options: ["Reversible", "One-way", "Uses a public key", "Encrypts data"],
        correct: 1,
        explain: "A hash function is one-way – you cannot recover the original input from the hash value."
      },
      {
        q: "What does TLS stand for?",
        options: ["Transport Layer Security", "Transmission Layer Standard", "Transfer Level Security", "Trusted Layer System"],
        correct: 0,
        explain: "TLS stands for Transport Layer Security, the successor to SSL. It encrypts data in transit."
      },
      {
        q: "What is a Certificate Authority?",
        options: ["A company that issues digital certificates", "A type of encryption", "A network protocol", "A hardware device"],
        correct: 0,
        explain: "A Certificate Authority is a trusted entity that issues digital certificates, verifying the identity of certificate holders."
      },
      {
        q: "What is the main difference between authentication and authorization?",
        options: ["AuthN is identity, AuthZ is permissions", "AuthN is permissions, AuthZ is identity", "They are the same", "AuthN uses passwords only"],
        correct: 0,
        explain: "Authentication verifies who you are (identity). Authorization determines what you can do (permissions)."
      }
    ],

    // ----- SET 2: Attacks & Defenses -----
    2: [
      {
        q: "What is SQL injection?",
        options: ["Inserting malicious SQL code into a query", "A network-based attack", "A physical security breach", "A type of encryption"],
        correct: 0,
        explain: "SQL injection is an attack where malicious SQL statements are inserted into an input field, manipulating the database."
      },
      {
        q: "What is XSS?",
        options: ["Cross-Site Scripting", "Cross-Site Security", "Extra Secure System", "XML Site System"],
        correct: 0,
        explain: "XSS (Cross-Site Scripting) is an attack where malicious scripts are injected into trusted websites."
      },
      {
        q: "What is CSRF?",
        options: ["Cross-Site Request Forgery", "Client-Side Request Failure", "Central Security Response", "Cross-System Resource Failure"],
        correct: 0,
        explain: "CSRF forces an authenticated user to perform unwanted actions on a web application they're logged into."
      },
      {
        q: "What is a common defense against SQL injection?",
        options: ["Prepared statements", "Firewalls", "Encryption", "Two-factor authentication"],
        correct: 0,
        explain: "Prepared statements (parameterised queries) separate SQL logic from data, preventing injection."
      },
      {
        q: "What does OWASP stand for?",
        options: ["Open Web Application Security Project", "Open Web App Security Platform", "Open Worldwide Application Security", "Operational Web Application Security"],
        correct: 0,
        explain: "OWASP is the Open Web Application Security Project, a nonprofit focused on improving software security."
      }
    ],

    // ----- SET 3: Advanced Topics -----
    3: [
      {
        q: "What is the principle of least privilege?",
        options: ["Give minimal permissions necessary", "Give full permissions to everyone", "No permissions at all", "Only root has access"],
        correct: 0,
        explain: "The principle of least privilege means granting only the permissions required to perform a specific task."
      },
      {
        q: "What is encryption at rest?",
        options: ["Encrypting stored data", "Encrypting data in transit", "Encrypting passwords", "Encrypting logs"],
        correct: 0,
        explain: "Encryption at rest protects data stored on disk or in databases. Encryption in transit protects data moving across networks."
      },
      {
        q: "What is PKI?",
        options: ["Public Key Infrastructure", "Private Key Integration", "Public Key Interface", "Private Key Infrastructure"],
        correct: 0,
        explain: "PKI is the framework for managing public-key encryption and digital certificates, enabling secure communications."
      },
      {
        q: "What is a salt in password hashing?",
        options: ["Random data added to the password before hashing", "A type of encryption", "A password manager", "A hash algorithm"],
        correct: 0,
        explain: "A salt is a random value added to a password before hashing, preventing rainbow table attacks."
      },
      {
        q: "What is the main purpose of a firewall?",
        options: ["Control network traffic based on rules", "Encrypt data", "Store passwords", "Manage users"],
        correct: 0,
        explain: "A firewall filters network traffic based on predefined rules, blocking or allowing connections."
      }
    ]
  };

  // ============================================================
  // QUIZ ENGINE – Multi-set Support
  // ============================================================

  let currentSet = 1;
  let currentQuestions = QUIZ_SETS[currentSet];
  let userAnswers = new Array(currentQuestions.length).fill(null);

  // --- Load a specific set ---
  function loadQuizSet(setNumber) {
    if (!QUIZ_SETS[setNumber]) return;
    currentSet = setNumber;
    currentQuestions = QUIZ_SETS[currentSet];
    userAnswers = new Array(currentQuestions.length).fill(null);
    renderQuiz();
    document.getElementById('quizProgressFill').style.width = '0%';
    document.getElementById('quizScore').classList.remove('show');
    document.getElementById('quizFeedback').style.display = 'none';
  }

  // --- Render current quiz ---
  function renderQuiz() {
    const body = document.getElementById('quizBody');
    if (!body) return;
    body.innerHTML = currentQuestions.map((q, qi) => `
      <div class="quiz-question" id="qq${qi}" style="margin-bottom:1.75rem;padding-bottom:1.75rem;border-bottom:1px solid var(--border-color);">
        <span class="q-number">Question ${qi + 1} of ${currentQuestions.length}</span>
        ${q.q}
        <div class="quiz-options" style="margin-top:0.875rem;">
          ${q.options.map((opt, oi) => `
            <label class="quiz-option" id="opt${qi}_${oi}" onclick="window.selectSecurityOption(${qi}, ${oi})">
              <input type="radio" name="q${qi}" value="${oi}" />
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // --- Select an option ---
  window.selectSecurityOption = function(qi, oi) {
    userAnswers[qi] = oi;
    document.querySelectorAll(`#qq${qi} .quiz-option`).forEach((opt, i) => {
      opt.classList.toggle('selected', i === oi);
    });
    const answered = userAnswers.filter(a => a !== null).length;
    const fill = document.getElementById('quizProgressFill');
    if (fill) fill.style.width = (answered / currentQuestions.length * 100) + '%';
  };

  // --- Submit quiz ---
  window.submitSecurityQuiz = function() {
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
      localStorage.setItem(`security-quiz-set-${currentSet}-passed`, 'true');
      if (isQuizMastered()) {
        localStorage.setItem('security-quiz-passed', 'true');
      }
    }

    if (window.updateFloatingRing) window.updateFloatingRing();

    document.getElementById('quizFeedback').style.display = 'none';
    document.getElementById('quizScore').classList.add('show');
    document.getElementById('scoreNum').textContent = `${score}/${currentQuestions.length}`;

    const pct = Math.round(score / currentQuestions.length * 100);
    const previousBest = localStorage.getItem('gc-score-security') || 0;
    if (pct > previousBest) {
      localStorage.setItem('gc-score-security', pct);
      if (typeof window.updateGlobalProgress === 'function') {
        window.updateGlobalProgress();
      }
    }

    let msg = '';
    if (pct === 100) msg = 'Perfect score — outstanding mastery of Security Concepts!';
    else if (pct >= 80) msg = 'Strong result — revisit any incorrect questions.';
    else if (pct >= 60) msg = 'Good foundation — review the sections above.';
    else msg = 'Keep studying — revisit the accordions above, then try again.';
    document.getElementById('scoreMsg').textContent = `${pct}% — ${msg}`;
    document.getElementById('quizScore').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  // --- Reset current quiz ---
  window.resetSecurityQuiz = function() {
    userAnswers = new Array(currentQuestions.length).fill(null);
    document.getElementById('quizScore').classList.remove('show');
    const fb = document.getElementById('quizFeedback');
    fb.className = 'quiz-feedback';
    fb.style.display = 'none';
    const fill = document.getElementById('quizProgressFill');
    if (fill) fill.style.width = '0%';
    renderQuiz();

    localStorage.removeItem(`security-quiz-set-${currentSet}-passed`);
    if (!isQuizMastered()) {
      localStorage.removeItem('security-quiz-passed');
    }
    
    if (window.updateFloatingRing) window.updateFloatingRing();
  };

  // --- Check if any set is mastered ---
  function isQuizMastered() {
    for (let i = 1; i <= 3; i++) {
      if (localStorage.getItem(`security-quiz-set-${i}-passed`) === 'true') {
        return true;
      }
    }
    return false;
  }

  // --- Reset ALL quiz progress ---
  function resetAllQuizProgress() {
    for (let i = 1; i <= 3; i++) {
      localStorage.removeItem(`security-quiz-set-${i}-passed`);
    }
    localStorage.removeItem('security-quiz-passed');
    if (window.updateFloatingRing) window.updateFloatingRing();
  }

  // ----- Set button event listeners -----
  document.getElementById('set1Btn')?.addEventListener('click', () => loadQuizSet(1));
  document.getElementById('set2Btn')?.addEventListener('click', () => loadQuizSet(2));
  document.getElementById('set3Btn')?.addEventListener('click', () => loadQuizSet(3));
  document.getElementById('resetAllBtn')?.addEventListener('click', resetAllQuizProgress);

  // ============================================================
  // FLOATING PROGRESS RING
  // ============================================================
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
        const saved = localStorage.getItem(`security-section-${section}`);
        const isChecked = saved === 'true' ? true : false;
        cb.checked = isChecked;
        if (isChecked) checked++;
      });

      const quizPassed = localStorage.getItem('security-quiz-passed') === 'true';
      if (quizPassed) checked++;

      const percent = Math.round((checked / total) * 100);
      const offset = circumference - (percent / 100) * circumference;
      ringFill.style.strokeDasharray = circumference;
      ringFill.style.strokeDashoffset = offset;
      percentSpan.textContent = `${percent}%`;

      if (percent === 100) {
        const alreadyCongratulated = localStorage.getItem('security-100-congrats-shown');
        if (!alreadyCongratulated) {
          localStorage.setItem('security-100-congrats-shown', 'true');
          const toast = document.createElement('div');
          toast.className = 'coming-soon-toast';
          toast.innerHTML = '🎉 CONGRATULATIONS! 🎉<br>You have mastered Security Concepts!';
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
          localStorage.setItem(`security-section-${cb.dataset.section}`, cb.checked);
          updateFloatingRing();
        });
      });
    }

    floatingDiv.addEventListener('click', (e) => {
      e.stopPropagation();
      if (typeof window.openModalToPillarDetails === 'function') {
        window.openModalToPillarDetails('security', 'phase1');
      }
    });

    updateFloatingRing();
    saveCheckboxState();
  }

  // ============================================================
  // IMAGE LIGHTBOX (Popup + Zoom)
  // ============================================================
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
    
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-' || e.key === '_') zoomOut();
      if (e.key === '0') resetView();
      if (e.key === 'f' || e.key === 'F') toggleFitMode();
    });
  }

  // ============================================================
  // INITIALISATION
  // ============================================================

  if (document.querySelector('.section-checkbox')) {
    initFloatingProgressRing();
  }

  renderFlashcards();
  renderQuiz();
  initImageLightbox();

}); // DOMContentLoaded end