// ============================================================
// BASE.JS — Foundation for all pillar pages
// Each pillar page (networking.js, linux.js, etc.) extends this
// ============================================================

// ============================================================
// LINUX.JS — Pillar-specific configuration and data
// ============================================================

// Define FLASHCARDS and QUIZ_SETS (see previous sections)

// Define PILLAR_CONFIG — this tells base.js what to do
window.PILLAR_CONFIG = {
  id: 'linux',
  name: 'Linux & CLI Proficiency',
  totalSections: 10,
  sectionPrefix: 'linux-section-',
  quizKey: 'linux-quiz-passed',
  quizSetPrefix: 'linux-quiz-set-',
  congratsKey: 'linux-100-congrats-shown',
  scoreKey: 'gc-score-linux',
  flashcardData: FLASHCARDS,
  quizSets: QUIZ_SETS
};

// base.js will now handle everything else!
// No need to duplicate renderFlashcards, renderQuiz, updateFloatingRing, etc.

(function () {
  "use strict";

  // ============================================================
  // 🟢 PILLAR CONFIGURATION — OVERRIDE IN EACH PILLAR PAGE
  // ============================================================
  // Each pillar page must define these before loading base.js
  // Example in linux.js:
  //   const PILLAR_CONFIG = {
  //     id: 'linux',
  //     name: 'Linux & CLI Proficiency',
  //     totalSections: 10,
  //     sectionPrefix: 'linux-section-',
  //     quizKey: 'linux-quiz-passed',
  //     quizSetPrefix: 'linux-quiz-set-',
  //     congratsKey: 'linux-100-congrats-shown',
  //     scoreKey: 'gc-score-linux',
  //     flashcardData: FLASHCARDS,
  //     quizSets: QUIZ_SETS
  //   };

  const CONFIG = window.PILLAR_CONFIG;
  if (!CONFIG) {
    console.error(
      "❌ PILLAR_CONFIG not defined! Each pillar page must define window.PILLAR_CONFIG before loading base.js",
    );
    return;
  }

  // ============================================================
  // 1. FLASHCARD SYSTEM
  // ============================================================
  // 🔴 PAGE-SPECIFIC ADJUSTMENT: Provide flashcard data in PILLAR_CONFIG

  function renderFlashcards() {
    const track = document.getElementById("flashcardTrack");
    if (!track) return;

    const flashcards = CONFIG.flashcardData || [];

    track.innerHTML = flashcards
      .map(
        (card, index) => `
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
    `,
      )
      .join("");

    // Update flashcard counter
    const countSpan = document.getElementById("flashcardCount");
    if (countSpan) {
      countSpan.textContent = `${flashcards.length} cards`;
    }

    initFlashcardScroller();
  }

  function initFlashcardScroller() {
    const scroller = document.getElementById("flashcardScroller");
    const prevBtn = document.getElementById("flashcardPrev");
    const nextBtn = document.getElementById("flashcardNext");
    const indicator = document.getElementById("flashcardIndicator");

    if (!scroller) return;

    function updateIndicator() {
      if (!indicator) return;
      const scrollLeft = scroller.scrollLeft;
      const scrollWidth = scroller.scrollWidth;
      const clientWidth = scroller.clientWidth;
      const maxScroll = scrollWidth - clientWidth;
      const scrollPercent = maxScroll > 0 ? scrollLeft / maxScroll : 0;

      const cards = document.querySelectorAll(".flashcard");
      const totalCards = cards.length;
      const activeIndex = Math.round(scrollPercent * (totalCards - 1));

      const dots = indicator.querySelectorAll(".scroll-dot");
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === activeIndex);
      });
    }

    // Create indicator dots
    if (indicator) {
      const totalCards = CONFIG.flashcardData?.length || 0;
      indicator.innerHTML = Array.from(
        { length: totalCards },
        (_, i) => `<span class="scroll-dot" data-index="${i}"></span>`,
      ).join("");

      indicator.querySelectorAll(".scroll-dot").forEach((dot) => {
        dot.addEventListener("click", (e) => {
          const index = parseInt(e.target.dataset.index);
          const cardWidth =
            document.querySelector(".flashcard")?.offsetWidth || 260;
          const gap = 16;
          const scrollPosition = index * (cardWidth + gap);
          scroller.scrollTo({ left: scrollPosition, behavior: "smooth" });
        });
      });
    }

    // Scroll buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        scroller.scrollBy({ left: -280, behavior: "smooth" });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        scroller.scrollBy({ left: 280, behavior: "smooth" });
      });
    }

    scroller.addEventListener("scroll", () => {
      requestAnimationFrame(updateIndicator);
    });

    setTimeout(updateIndicator, 100);
    window.addEventListener("resize", () => {
      setTimeout(updateIndicator, 100);
    });
  }

  // ============================================================
  // 2. QUIZ SYSTEM
  // ============================================================
  // 🔴 PAGE-SPECIFIC ADJUSTMENT: Provide quiz data in PILLAR_CONFIG

  let currentSet = 1;
  let currentQuestions = [];
  let userAnswers = [];

  function loadQuizSet(setNumber) {
    const quizSets = CONFIG.quizSets || {};
    if (!quizSets[setNumber]) return;

    currentSet = setNumber;
    currentQuestions = quizSets[currentSet];
    userAnswers = new Array(currentQuestions.length).fill(null);
    renderQuiz();

    document.getElementById("quizProgressFill").style.width = "0%";
    document.getElementById("quizScore").classList.remove("show");
    document.getElementById("quizFeedback").style.display = "none";
  }

  function renderQuiz() {
    const body = document.getElementById("quizBody");
    if (!body) return;

    body.innerHTML = currentQuestions
      .map(
        (q, qi) => `
      <div class="quiz-question" id="qq${qi}" style="margin-bottom:1.75rem;padding-bottom:1.75rem;border-bottom:1px solid var(--border-color);">
        <span class="q-number">Question ${qi + 1} of ${currentQuestions.length}</span>
        ${q.q}
        <div class="quiz-options" style="margin-top:0.875rem;">
          ${q.options
            .map(
              (opt, oi) => `
            <label class="quiz-option" id="opt${qi}_${oi}" onclick="window.selectPillarOption(${qi}, ${oi})">
              <input type="radio" name="q${qi}" value="${oi}" />
              <span>${opt}</span>
            </label>
          `,
            )
            .join("")}
        </div>
      </div>
    `,
      )
      .join("");
  }

  window.selectPillarOption = function (qi, oi) {
    userAnswers[qi] = oi;
    document.querySelectorAll(`#qq${qi} .quiz-option`).forEach((opt, i) => {
      opt.classList.toggle("selected", i === oi);
    });
    const answered = userAnswers.filter((a) => a !== null).length;
    const fill = document.getElementById("quizProgressFill");
    if (fill)
      fill.style.width = (answered / currentQuestions.length) * 100 + "%";
  };

  window.submitPillarQuiz = function () {
    const answered = userAnswers.filter((a) => a !== null).length;
    if (answered < currentQuestions.length) {
      const fb = document.getElementById("quizFeedback");
      fb.className = "quiz-feedback incorrect";
      fb.textContent = `Please answer all ${currentQuestions.length} questions before submitting. (${answered}/${currentQuestions.length} answered)`;
      fb.style.display = "block";
      return;
    }

    let score = 0;
    currentQuestions.forEach((q, qi) => {
      const isCorrect = userAnswers[qi] === q.correct;
      if (isCorrect) score++;
      document.querySelectorAll(`#qq${qi} .quiz-option`).forEach((opt, oi) => {
        if (oi === q.correct) opt.classList.add("correct");
        else if (oi === userAnswers[qi] && !isCorrect)
          opt.classList.add("incorrect");
        opt.style.pointerEvents = "none";
      });
      const qEl = document.getElementById(`qq${qi}`);
      if (!qEl.querySelector(".quiz-explain")) {
        const explain = document.createElement("div");
        explain.className =
          "info-box " + (isCorrect ? "tip" : "warning") + " quiz-explain";
        explain.style.marginTop = "0.75rem";
        explain.innerHTML = `<strong>${isCorrect ? "Correct" : "Incorrect"}</strong> ${q.explain}`;
        qEl.appendChild(explain);
      }
    });

    const totalQuestions = currentQuestions.length;
    if (score === totalQuestions) {
      localStorage.setItem(
        `${CONFIG.quizSetPrefix}${currentSet}-passed`,
        "true",
      );
      if (isQuizMastered()) {
        localStorage.setItem(CONFIG.quizKey, "true");
      }
    }

    if (window.updateFloatingRing) window.updateFloatingRing();

    document.getElementById("quizFeedback").style.display = "none";
    document.getElementById("quizScore").classList.add("show");
    document.getElementById("scoreNum").textContent =
      `${score}/${currentQuestions.length}`;

    const pct = Math.round((score / currentQuestions.length) * 100);
    const previousBest = localStorage.getItem(CONFIG.scoreKey) || 0;
    if (pct > previousBest) {
      localStorage.setItem(CONFIG.scoreKey, pct);
    }

    let msg = "";
    if (pct === 100)
      msg = `Perfect score — outstanding mastery of ${CONFIG.name}! 🎉`;
    else if (pct >= 80)
      msg = "Strong result — revisit any incorrect questions.";
    else if (pct >= 60) msg = "Good foundation — review the sections above.";
    else msg = "Keep studying — revisit the accordions above, then try again.";
    document.getElementById("scoreMsg").textContent = `${pct}% — ${msg}`;
    document
      .getElementById("quizScore")
      .scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  window.resetPillarQuiz = function () {
    userAnswers = new Array(currentQuestions.length).fill(null);
    document.getElementById("quizScore").classList.remove("show");
    const fb = document.getElementById("quizFeedback");
    fb.className = "quiz-feedback";
    fb.style.display = "none";
    const fill = document.getElementById("quizProgressFill");
    if (fill) fill.style.width = "0%";
    renderQuiz();

    localStorage.removeItem(`${CONFIG.quizSetPrefix}${currentSet}-passed`);
    if (!isQuizMastered()) {
      localStorage.removeItem(CONFIG.quizKey);
    }

    if (window.updateFloatingRing) window.updateFloatingRing();
  };

  function isQuizMastered() {
    for (let i = 1; i <= 3; i++) {
      if (
        localStorage.getItem(`${CONFIG.quizSetPrefix}${i}-passed`) === "true"
      ) {
        return true;
      }
    }
    return false;
  }

  function resetAllQuizProgress() {
    for (let i = 1; i <= 3; i++) {
      localStorage.removeItem(`${CONFIG.quizSetPrefix}${i}-passed`);
    }
    localStorage.removeItem(CONFIG.quizKey);
    if (window.updateFloatingRing) window.updateFloatingRing();
  }

  // ============================================================
  // 3. FLOATING PROGRESS RING & MODAL
  // ============================================================
  // 🔴 PAGE-SPECIFIC ADJUSTMENT: Uses CONFIG.totalSections and CONFIG.sectionPrefix

  function initFloatingProgressRing() {
    const checkboxes = document.querySelectorAll(".section-checkbox");
    if (!checkboxes.length) return;

    const floatingDiv = document.createElement("div");
    floatingDiv.className = "floating-progress-ring";
    floatingDiv.innerHTML = `
      <svg class="floating-ring-svg" viewBox="0 0 60 60">
        <circle class="floating-ring-bg" cx="30" cy="30" r="26" fill="none" stroke-width="4"/>
        <circle class="floating-ring-fill" cx="30" cy="30" r="26" fill="none" stroke-width="4" stroke-linecap="round"/>
      </svg>
      <div class="floating-ring-percent" id="floatingPercent">0%</div>
    `;
    document.body.appendChild(floatingDiv);

    const ringFill = floatingDiv.querySelector(".floating-ring-fill");
    const percentSpan = floatingDiv.querySelector("#floatingPercent");
    const circumference = 2 * Math.PI * 26;

    function updateFloatingRing() {
      const checkboxes = document.querySelectorAll(".section-checkbox");
      const total = checkboxes.length + 1;
      let checked = 0;

      checkboxes.forEach((cb) => {
        const section = cb.dataset.section;
        const saved = localStorage.getItem(`${CONFIG.sectionPrefix}${section}`);
        const isChecked = saved === "true" ? true : false;
        cb.checked = isChecked;
        if (isChecked) checked++;
      });

      const quizPassed = localStorage.getItem(CONFIG.quizKey) === "true";
      if (quizPassed) checked++;

      const percent = Math.round((checked / total) * 100);
      const offset = circumference - (percent / 100) * circumference;
      ringFill.style.strokeDasharray = circumference;
      ringFill.style.strokeDashoffset = offset;
      percentSpan.textContent = `${percent}%`;

      // Congratulations toast on 100%
      if (percent === 100) {
        const alreadyCongratulated = localStorage.getItem(CONFIG.congratsKey);
        if (!alreadyCongratulated) {
          localStorage.setItem(CONFIG.congratsKey, "true");
          const toast = document.createElement("div");
          toast.className = "coming-soon-toast";
          toast.innerHTML = `🎉 CONGRATULATIONS! 🎉<br>You have mastered ${CONFIG.name}!`;
          toast.style.background =
            "linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))";
          toast.style.padding = "12px 24px";
          toast.style.fontSize = "0.9rem";
          toast.style.fontWeight = "bold";
          toast.style.textAlign = "center";
          document.body.appendChild(toast);
          setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 300);
          }, 4000);
        }
      }
    }

    window.updateFloatingRing = updateFloatingRing;

    function saveCheckboxState() {
      checkboxes.forEach((cb) => {
        cb.addEventListener("change", () => {
          localStorage.setItem(
            `${CONFIG.sectionPrefix}${cb.dataset.section}`,
            cb.checked,
          );
          updateFloatingRing();
        });
      });
    }

    // ----- MODAL FUNCTIONALITY -----
    floatingDiv.addEventListener("click", (e) => {
      e.stopPropagation();
      if (typeof window.openModalToPillarDetails === "function") {
        window.openModalToPillarDetails(CONFIG.id, "phase1");
      }
    });

    updateFloatingRing();
    saveCheckboxState();
  }

  // ============================================================
  // 4. PAGE HEADER — Automatic Completion Tracking
  // ============================================================
  // 🔴 PAGE-SPECIFIC ADJUSTMENT: Uses CONFIG.totalSections and CONFIG.sectionPrefix

  function updatePageHeader() {
    const config = CONFIG;
    let completedSections = 0;

    for (let i = 1; i <= config.totalSections; i++) {
      if (localStorage.getItem(`${config.sectionPrefix}${i}`) === "true") {
        completedSections++;
      }
    }

    const quizPassed = localStorage.getItem(config.quizKey) === "true";
    const totalItems = config.totalSections + 1;
    const completedItems = completedSections + (quizPassed ? 1 : 0);
    const percent = Math.round((completedItems / totalItems) * 100);

    // Update ring
    const ringFill = document.querySelector("#completionRing .ring-fill");
    const percentDisplay = document.getElementById("completionPercent");
    if (ringFill && percentDisplay) {
      const circumference = 2 * Math.PI * 20;
      const offset = circumference - (percent / 100) * circumference;
      ringFill.style.strokeDashoffset = offset;
      percentDisplay.textContent = `${percent}%`;
    }

    // Update badges
    const container = document.getElementById("metaBadges");
    if (container) {
      let statusClass, statusIcon, statusText;
      if (percent === 100) {
        statusClass = "status-complete";
        statusIcon = "✓";
        statusText = "Complete";
      } else if (percent > 0) {
        statusClass = "status-progress";
        statusIcon = "⟳";
        statusText = "In Progress";
      } else {
        statusClass = "status-locked";
        statusIcon = "○";
        statusText = "Not Started";
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
        <span class="meta-badge ${quizPassed ? "quiz-passed" : ""}">
          <span class="icon">${quizPassed ? "🎯" : "📝"}</span> ${quizPassed ? "Quiz passed" : "Quiz pending"}
        </span>
      `;
    }
  }

  // ============================================================
  // 5. INITIALIZATION
  // ============================================================

  // Initialize quiz
  const quizSets = CONFIG.quizSets || {};
  if (Object.keys(quizSets).length > 0) {
    currentQuestions = quizSets[1] || [];
    userAnswers = new Array(currentQuestions.length).fill(null);
  }

  // Set up quiz set buttons
  document
    .getElementById("set1Btn")
    ?.addEventListener("click", () => loadQuizSet(1));
  document
    .getElementById("set2Btn")
    ?.addEventListener("click", () => loadQuizSet(2));
  document
    .getElementById("set3Btn")
    ?.addEventListener("click", () => loadQuizSet(3));
  document
    .getElementById("resetAllBtn")
    ?.addEventListener("click", resetAllQuizProgress);

  // Render flashcards
  renderFlashcards();

  // Render quiz
  renderQuiz();

  // Initialize floating progress ring
  if (document.querySelector(".section-checkbox")) {
    initFloatingProgressRing();
  }

  // Update page header if it exists
  if (document.getElementById("completionRing")) {
    updatePageHeader();
    // Listen for storage changes
    window.addEventListener("storage", function (e) {
      if (e.key && e.key.includes(CONFIG.id)) {
        updatePageHeader();
        if (window.updateFloatingRing) window.updateFloatingRing();
      }
    });
  }

  // Expose functions for pillar pages
  window.loadQuizSet = loadQuizSet;
  window.renderQuiz = renderQuiz;
  window.updatePageHeader = updatePageHeader;
  window.updateFloatingRing = window.updateFloatingRing || function () {};

  console.log(`📚 Base.js loaded for ${CONFIG.name}`);
})();
