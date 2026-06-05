// ============================================================
// PILLAR 2: LINUX – FLASHCARDS & QUIZ
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

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
  };

  if (document.getElementById('flashcardGrid')) renderFlashcards();
  if (document.getElementById('quizBody')) renderQuiz();
});