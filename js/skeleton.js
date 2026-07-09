// ============================================================
// PILLAR 4: SCRIPTING & AUTOMATION – FLASHCARDS & QUIZ
// (placeholder version – replace content later)
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  // ----- FLASHCARD DATA (placeholders) -----
  const FLASHCARDS = [
    { term: "Placeholder term 1", answer: "Placeholder answer 1" },
    { term: "Placeholder term 2", answer: "Placeholder answer 2" },
    { term: "Placeholder term 3", answer: "Placeholder answer 3" },
  ];

  function renderFlashcards() {
    const track = document.getElementById("flashcardTrack");
    if (!track) return;

    track.innerHTML = FLASHCARDS.map(
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
    ).join("");

    const countSpan = document.getElementById("flashcardCount");
    if (countSpan) {
      countSpan.textContent = `${FLASHCARDS.length} cards`;
    }

    initFlashcardScroller();
  }

  // ----- SCRIPTING OVERVIEW (placeholder) -----
  const SCRIPTING_OVERVIEW = {
    purpose: {
      title: "📌 Purpose",
      description: [
        "This pillar covers scripting and automation fundamentals.",
        "Placeholder description – replace with actual content.",
      ],
    },
    objectives: [
      "Objective 1 – replace with actual",
      "Objective 2 – replace with actual",
    ],
    keyConcepts: [
      { term: "Concept 1", definition: "Definition 1" },
      { term: "Concept 2", definition: "Definition 2" },
    ],
    stats: [
      { label: "Sections", value: "0/0" },
      { label: "Status", value: "⏳ Placeholder" },
    ],
    readmeLink: "#",
    readmeDetailLink: "#",
  };

  function renderScriptingOverview() {
    const container = document.getElementById("js-overview-container");
    if (!container) return;

    const objectives = SCRIPTING_OVERVIEW.objectives
      .map((obj) => `<li>${obj}</li>`)
      .join("");
    const keyConcepts = SCRIPTING_OVERVIEW.keyConcepts
      .map(
        (item) => `
      <dt>${item.term}</dt>
      <dd>${item.definition}</dd>
    `,
      )
      .join("");
    const stats = SCRIPTING_OVERVIEW.stats
      .map(
        (stat) => `
      <tr><td><strong>${stat.label}</strong></td><td>${stat.value}</td></tr>
    `,
      )
      .join("");

    container.innerHTML = `
      <div class="overview-content" style="margin-bottom: 2rem;">
        <div class="info-box note" style="margin-bottom: 1.5rem;">
          <strong>${SCRIPTING_OVERVIEW.purpose.title}</strong>
          <p>${SCRIPTING_OVERVIEW.purpose.description[0]}</p>
          <p style="margin-top: 0.5rem;">${SCRIPTING_OVERVIEW.purpose.description[1]}</p>
        </div>
        <div class="info-box tip" style="margin-bottom: 1.5rem;">
          <strong>🎯 Learning objectives</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.2rem;">${objectives}</ul>
        </div>
        <div class="info-box warning" style="margin-bottom: 2rem;">
          <strong>🔁 Key concepts to revise</strong>
          <dl class="key-concepts-list">${keyConcepts}</dl>
        </div>
        <div class="table-wrapper" style="margin-bottom: 1rem;">
          <table class="data-table">
            <thead><tr><th>Metric</th><th>Value</th></tr></thead>
            <tbody>${stats}</tbody>
          </table>
        </div>
        <div class="info-box note">
          <strong>📖 Detailed notes</strong>
          <p style="margin-top: 0.25rem;">Placeholder – replace with actual links.</p>
        </div>
      </div>
    `;
  }

  // ----- SECTION ACCORDIONS (placeholders) -----
  // We'll create one placeholder accordion per section (9 sections)
  // Each uses a generic title and placeholder body.

  function buildPlaceholderAccordion(sectionNum) {
    return {
      id: `section-${sectionNum}`,
      title: `Section ${sectionNum} — Placeholder`,
      priority: sectionNum === 1,
      icon: "📄",
      bodyHTML: `
        <p>This is a placeholder for Section ${sectionNum}. Replace with actual content.</p>
        <div class="code-block"><pre><span class="code-comment"># Placeholder code block</span>
  echo "Replace me"</pre></div>
        <div class="info-box note">Add your notes here.</div>
      `,
    };
  }

  const SECTION_ACCORDIONS = [];
  for (let i = 1; i <= 9; i++) {
    SECTION_ACCORDIONS.push(buildPlaceholderAccordion(i));
  }

  // ----- QUIZ SETS (placeholders) -----
  const QUIZ_SETS = {
    1: [
      {
        q: "Placeholder question 1?",
        options: ["A", "B", "C", "D"],
        correct: 0,
        explain: "Placeholder explanation.",
      },
      {
        q: "Placeholder question 2?",
        options: ["A", "B", "C", "D"],
        correct: 1,
        explain: "Placeholder explanation.",
      },
    ],
    2: [
      {
        q: "Placeholder question 3?",
        options: ["A", "B", "C", "D"],
        correct: 2,
        explain: "Placeholder explanation.",
      },
      {
        q: "Placeholder question 4?",
        options: ["A", "B", "C", "D"],
        correct: 3,
        explain: "Placeholder explanation.",
      },
    ],
    3: [
      {
        q: "Placeholder question 5?",
        options: ["A", "B", "C", "D"],
        correct: 0,
        explain: "Placeholder explanation.",
      },
      {
        q: "Placeholder question 6?",
        options: ["A", "B", "C", "D"],
        correct: 1,
        explain: "Placeholder explanation.",
      },
    ],
  };

  // ============================================================
  // RENDER FUNCTIONS (identical to networking.js logic)
  // ============================================================

  function renderAccordion(containerId, accordionData) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const html = accordionData
      .map(
        (acc) => `
      <div class="accordion open" data-searchable>
        <button type="button" class="accordion-header" onclick="toggleAccordion(this)" aria-expanded="true">
          <div class="accordion-title">
            <span class="acc-icon" aria-hidden="true">${acc.icon}</span>
            ${acc.title}
            ${acc.priority ? '<span class="tag priority">priority</span>' : ""}
          </div>
          <svg class="accordion-chevron" width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
          </svg>
        </button>
        <div class="accordion-body">
          ${acc.bodyHTML}
        </div>
      </div>
    `,
      )
      .join("");

    container.innerHTML = html;
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

    if (indicator) {
      const totalCards = FLASHCARDS.length;
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

    if (prevBtn)
      prevBtn.addEventListener("click", () =>
        scroller.scrollBy({ left: -280, behavior: "smooth" }),
      );
    if (nextBtn)
      nextBtn.addEventListener("click", () =>
        scroller.scrollBy({ left: 280, behavior: "smooth" }),
      );

    scroller.addEventListener("scroll", () =>
      requestAnimationFrame(updateIndicator),
    );
    setTimeout(updateIndicator, 100);
    window.addEventListener("resize", () => setTimeout(updateIndicator, 100));
  }

  // ----- QUIZ ENGINE (identical to networking.js) -----
  let currentSet = 1;
  let currentQuestions = QUIZ_SETS[currentSet];
  let userAnswers = new Array(currentQuestions.length).fill(null);

  function loadQuizSet(setNumber) {
    if (!QUIZ_SETS[setNumber]) return;
    currentSet = setNumber;
    currentQuestions = QUIZ_SETS[currentSet];
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
            <label class="quiz-option" id="opt${qi}_${oi}" onclick="selectOption(${qi}, ${oi})">
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

  window.selectOption = function (qi, oi) {
    userAnswers[qi] = oi;
    document.querySelectorAll(`#qq${qi} .quiz-option`).forEach((opt, i) => {
      opt.classList.toggle("selected", i === oi);
    });
    const answered = userAnswers.filter((a) => a !== null).length;
    const fill = document.getElementById("quizProgressFill");
    if (fill)
      fill.style.width = (answered / currentQuestions.length) * 100 + "%";
  };

  window.submitQuiz = function () {
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
      localStorage.setItem(`scripting-quiz-set-${currentSet}-passed`, "true");
      if (isQuizMastered())
        localStorage.setItem("scripting-quiz-passed", "true");
    }
    if (window.updateFloatingRing) window.updateFloatingRing();

    document.getElementById("quizFeedback").style.display = "none";
    document.getElementById("quizScore").classList.add("show");
    document.getElementById("scoreNum").textContent =
      `${score}/${currentQuestions.length}`;

    const pct = Math.round((score / currentQuestions.length) * 100);
    const previousBest = localStorage.getItem("gc-score-scripting") || 0;
    if (pct > previousBest) {
      localStorage.setItem("gc-score-scripting", pct);
      if (typeof window.updateGlobalProgress === "function")
        window.updateGlobalProgress();
    }

    let msg = "";
    if (pct === 100) msg = "Perfect score!";
    else if (pct >= 80) msg = "Strong result – review incorrect questions.";
    else if (pct >= 60) msg = "Good foundation – review the sections.";
    else msg = "Keep studying – revisit the sections above.";
    document.getElementById("scoreMsg").textContent = `${pct}% — ${msg}`;
    document
      .getElementById("quizScore")
      .scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  window.resetQuiz = function () {
    userAnswers = new Array(currentQuestions.length).fill(null);
    document.getElementById("quizScore").classList.remove("show");
    const fb = document.getElementById("quizFeedback");
    fb.className = "quiz-feedback";
    fb.style.display = "none";
    document.getElementById("quizProgressFill").style.width = "0%";
    renderQuiz();
    localStorage.removeItem(`scripting-quiz-set-${currentSet}-passed`);
    if (!isQuizMastered()) localStorage.removeItem("scripting-quiz-passed");
    if (window.updateFloatingRing) window.updateFloatingRing();
  };

  function isQuizMastered() {
    for (let i = 1; i <= 3; i++) {
      if (localStorage.getItem(`scripting-quiz-set-${i}-passed`) === "true")
        return true;
    }
    return false;
  }

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
    ?.addEventListener("click", function () {
      for (let i = 1; i <= 3; i++)
        localStorage.removeItem(`scripting-quiz-set-${i}-passed`);
      localStorage.removeItem("scripting-quiz-passed");
      if (window.updateFloatingRing) window.updateFloatingRing();
    });

  // ----- FLOATING PROGRESS RING (identical to networking.js) -----
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
        const saved = localStorage.getItem(`scripting-section-${section}`);
        const isChecked = saved === "true" ? true : false;
        cb.checked = isChecked;
        if (isChecked) checked++;
      });

      const quizPassed =
        localStorage.getItem("scripting-quiz-passed") === "true";
      if (quizPassed) checked++;

      const percent = Math.round((checked / total) * 100);
      const offset = circumference - (percent / 100) * circumference;
      ringFill.style.strokeDasharray = circumference;
      ringFill.style.strokeDashoffset = offset;
      percentSpan.textContent = `${percent}%`;

      if (percent === 100) {
        const already = localStorage.getItem("scripting-100-congrats-shown");
        if (!already) {
          localStorage.setItem("scripting-100-congrats-shown", "true");
          const toast = document.createElement("div");
          toast.className = "coming-soon-toast";
          toast.innerHTML =
            "🎉 CONGRATULATIONS! 🎉<br>You have mastered Scripting & Automation!";
          toast.style.background =
            "linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))";
          toast.style.padding = "12px 24px";
          toast.style.fontSize = "0.9rem";
          toast.style.fontWeight = "bold";
          toast.style.textAlign = "center";
          toast.style.borderRadius = "40px";
          document.body.appendChild(toast);
          setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 300);
          }, 4000);
        }
      }
    }

    window.updateFloatingRing = updateFloatingRing;

    checkboxes.forEach((cb) => {
      cb.addEventListener("change", () => {
        localStorage.setItem(
          `scripting-section-${cb.dataset.section}`,
          cb.checked,
        );
        updateFloatingRing();
      });
    });

    floatingDiv.addEventListener("click", (e) => {
      e.stopPropagation();
      if (typeof window.openModalToPillarDetails === "function") {
        window.openModalToPillarDetails("scripting", "phase1");
      }
    });

    updateFloatingRing();
  }

  // ----- IMAGE LIGHTBOX (simple) -----
  function initImageLightbox() {
    const lightbox = document.getElementById("imageLightbox");
    if (!lightbox) return;

    document
      .querySelectorAll(".accordion-body img, .overview-content img")
      .forEach((img) => {
        img.style.cursor = "pointer";
        img.addEventListener("click", (e) => {
          e.stopPropagation();
          const lightboxImg = document.getElementById("lightboxImg");
          if (lightboxImg) {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || "Enlarged image";
            lightbox.classList.add("active");
          }
        });
      });

    const closeBtn = document.getElementById("lightboxClose");
    if (closeBtn)
      closeBtn.addEventListener("click", () =>
        lightbox.classList.remove("active"),
      );
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.classList.remove("active");
    });
  }

  // ============================================================
  // RENDER EVERYTHING
  // ============================================================

  renderScriptingOverview();

  // Render each section container with placeholder accordions
  const containerIds = [
    "js-section1-container",
    "js-section2-container",
    "js-section3-container",
    "js-section4-container",
    "js-section5-container",
    "js-section6-container",
    "js-section7-container",
    "js-section8-container",
    "js-section9-container",
  ];

  containerIds.forEach((id, index) => {
    renderAccordion(id, [SECTION_ACCORDIONS[index]]);
  });

  renderFlashcards();
  renderQuiz();

  // Re-attach copy buttons if available
  setTimeout(() => {
    if (typeof initCopyButtons === "function") {
      const added = initCopyButtons();
      console.log(`✅ Copy buttons re-attached: ${added} added`);
    }
  }, 150);

  // Update nav badges
  setTimeout(() => {
    if (typeof updateNavBadges === "function") updateNavBadges();
  }, 200);

  initFloatingProgressRing();
  initImageLightbox();

  console.log("✅ Scripting & Automation pillar loaded (placeholder mode)");
});

// ============================================================
// ACCORDION TOGGLE (provided here in case global.js fails)
// ============================================================
function toggleAccordion(header) {
  const accordion = header.closest(".accordion");
  if (!accordion) return;
  accordion.classList.toggle("open");
  header.setAttribute("aria-expanded", accordion.classList.contains("open"));
  const id =
    accordion.querySelector(".accordion-title")?.innerText || "unknown";
  const openStates = JSON.parse(
    localStorage.getItem("gc-accordion-states") || "{}",
  );
  openStates[id] = accordion.classList.contains("open");
  localStorage.setItem("gc-accordion-states", JSON.stringify(openStates));
}
