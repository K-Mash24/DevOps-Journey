// ============================================================
// PILLAR 2: LINUX – FLASHCARDS, QUIZ & PROGRESS TRACKING
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  
  // ----- FLASHCARDS DATA (50 flashcards – all 10 sections) -----
  const FLASHCARDS = [
    // SECTION 1 — Filesystem Structure & Navigation
    { term: "Absolute vs relative path", answer: "Absolute starts with / (from root). Relative starts from current directory. Example: /home/user/file.txt (absolute) vs ./file.txt (relative)" },
    { term: "Create nested directories in one command", answer: "mkdir -p parent/child/grandchild" },
    { term: "Wildcard for single character", answer: "? matches exactly one character. Example: file-?.txt matches file-1.txt, file-a.txt" },
    { term: "Wildcard for any characters", answer: "* matches zero or more characters. Example: *.log deletes all .log files" },
    { term: "Hidden file prefix", answer: "Dot (.) prefix hides files/directories. Use ls -a to see them." },

    // SECTION 2 — File & Directory Operations
    { term: "Create empty file", answer: "touch filename.txt" },
    { term: "Difference between > and >>", answer: "> overwrites entire file. >> appends to end. Use >> to preserve existing content." },
    { term: "Delete a non-empty directory", answer: "rm -r directory_name (or rm -rf for force, no confirmation)" },
    { term: "Copy directory recursively", answer: "cp -r source_dir destination_dir" },
    { term: "View file with scrolling", answer: "less filename (Space=down, b=up, /search, q=quit)" },

    // SECTION 3 — Permissions & Ownership
    { term: "Display file permissions in octal", answer: "stat -c '%a %n' filename (e.g., 644 for rw-r--r--)" },
    { term: "Change file permissions (numeric)", answer: "chmod 755 script.sh (rwxr-xr-x) or chmod 644 file.txt (rw-r--r--)" },
    { term: "Change file permissions (symbolic)", answer: "chmod u+x file.sh (add execute for user), chmod go-w file.txt (remove write from group and others)" },
    { term: "Change file owner", answer: "sudo chown newowner filename (requires sudo)" },
    { term: "Change file owner and group", answer: "sudo chown user:group filename (e.g., sudo chown alice:developers script.sh)" },

    // SECTION 4 — Users & Groups
    { term: "Which file stores user accounts?", answer: "/etc/passwd — stores username, UID, GID, home directory, shell. Passwords are in /etc/shadow." },
    { term: "Add user to a supplementary group", answer: "sudo usermod -aG groupname username (always use -a to append)" },
    { term: "Create a user with home directory", answer: "sudo useradd -m -s /bin/bash username" },
    { term: "Delete user AND their home directory", answer: "sudo userdel -r username" },
    { term: "Switch user with full environment", answer: "su - username (the dash loads the target user's environment)" },

    // SECTION 5 — Processes & Job Control
    { term: "Display running processes", answer: "ps aux (all processes), top (interactive), htop (colorful interactive)" },
    { term: "Kill a process by PID (graceful)", answer: "kill PID (SIGTERM — polite request to terminate)" },
    { term: "Kill a process by PID (force)", answer: "kill -9 PID (SIGKILL — immediate, no cleanup)" },
    { term: "Kill a process by name", answer: "pkill process_name (e.g., pkill firefox), killall process_name" },
    { term: "Run a command in the background", answer: "command & — use jobs to list, fg to bring to foreground" },

    // SECTION 6 — Package Management
    { term: "Refresh package list from repositories", answer: "sudo apt update" },
    { term: "Install a package", answer: "sudo apt install package-name -y" },
    { term: "Remove a package but keep config files", answer: "sudo apt remove package-name" },
    { term: "Remove a package AND its config files", answer: "sudo apt purge package-name" },
    { term: "Clean up unused dependencies", answer: "sudo apt autoremove" },

    // SECTION 7 — Networking Commands
    { term: "Show IP addresses and interfaces", answer: "ip addr (or ip a) — shows all IP addresses assigned to interfaces" },
    { term: "Show interface status (UP/DOWN)", answer: "ip link — shows whether each interface is UP or DOWN" },
    { term: "Test connectivity to a host", answer: "ping -c 4 google.com — sends 4 ICMP packets" },
    { term: "DNS lookup (full)", answer: "dig google.com — shows detailed DNS query response" },
    { term: "Show listening ports", answer: "ss -tuln — shows TCP/UDP listening ports with numbers" },

    // SECTION 8 — Bash Scripting
    { term: "Script shebang line", answer: "#!/bin/bash — tells the OS which interpreter to use" },
    { term: "Command substitution", answer: "result=$(command) — captures command output into a variable" },
    { term: "Read user input", answer: "read -p 'Prompt: ' variable — shows a prompt and stores input" },
    { term: "If condition with spaces", answer: "if [ condition ]; then ... fi — spaces inside [ ] are REQUIRED" },
    { term: "Function definition", answer: "funcname() { echo $1; } — $1 is the first argument to the function" },

    // SECTION 9 — systemd & Services
    { term: "Start a systemd service", answer: "sudo systemctl start service-name" },
    { term: "Enable a service at boot", answer: "sudo systemctl enable service-name" },
    { term: "Check service status", answer: "systemctl status service-name — shows state and recent logs" },
    { term: "View logs for a specific service", answer: "journalctl -u service-name — shows all logs for that service" },
    { term: "Follow logs in real time", answer: "journalctl -u service-name -f — follows new log entries (like tail -f)" },

    // SECTION 10 — Text Processing
    { term: "Search for pattern in a file", answer: "grep 'pattern' filename — prints matching lines" },
    { term: "Invert match (exclude pattern)", answer: "grep -v 'pattern' file — prints lines that do NOT match" },
    { term: "Replace all occurrences in a file", answer: "sed -i 's/old/new/g' file.txt — edits file in place (g = global)" },
    { term: "Print specific column from a delimited file", answer: "awk -F: '{print $1}' /etc/passwd — extracts the first field using : as delimiter" },
    { term: "Count lines in a file", answer: "wc -l file.txt — prints only the line count" }
  ];

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

  // ============================================================
  // QUIZ DATA – 3 SETS
  // ============================================================
  const QUIZ_SETS = {
    // ----- SET 1: General Linux (Original) -----
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
        options: [
          "Nothing, they are the same",
          "rmdir deletes empty directories only, rm -r deletes directories with contents",
          "rmdir works on files, rm -r works on directories",
          "rmdir requires sudo, rm -r doesn't"
        ],
        correct: 1,
        explain: "rmdir only removes empty directories. rm -r recursively deletes directories and all contents."
      }
    ],

    // ----- SET 2: System Administration (Users, Groups, Permissions, Processes, Packages) -----
    2: [
      {
        q: "Which file stores user account information (but NOT passwords)?",
        options: ["/etc/shadow", "/etc/passwd", "/etc/group", "/etc/sudoers"],
        correct: 1,
        explain: "/etc/passwd stores username, UID, GID, home directory, shell — but passwords are stored in /etc/shadow."
      },
      {
        q: "How do you add a user to an existing supplementary group?",
        options: [
          "sudo usermod -G group user",
          "sudo usermod -aG group user",
          "sudo usermod -g group user",
          "sudo usermod +group user"
        ],
        correct: 1,
        explain: "The -aG flag appends the user to the group. Without -a, -G replaces all supplementary groups."
      },
      {
        q: "What numeric permission value corresponds to `rwxr-xr-x`?",
        options: ["644", "755", "777", "700"],
        correct: 1,
        explain: "rwx = 7 (4+2+1), r-x = 5 (4+0+1), r-x = 5 → 755. Common for scripts and directories."
      },
      {
        q: "Which command changes the owner of a file (requires sudo)?",
        options: ["chmod", "chown", "chgrp", "usermod"],
        correct: 1,
        explain: "chown changes the user owner (and optionally group) of a file. Only root can transfer ownership."
      },
      {
        q: "How do you politely stop a running process by PID?",
        options: ["kill -9 PID", "kill PID", "pkill PID", "killall PID"],
        correct: 1,
        explain: "kill PID sends SIGTERM (graceful termination). kill -9 sends SIGKILL (force kill)."
      },
      {
        q: "Which command refreshes the package list from repositories?",
        options: ["sudo apt upgrade", "sudo apt update", "sudo apt install", "sudo apt autoremove"],
        correct: 1,
        explain: "apt update refreshes the package list. apt upgrade actually installs newer versions."
      },
      {
        q: "What does `sudo apt purge nginx` do?",
        options: [
          "Removes nginx but keeps config files",
          "Removes nginx AND its config files",
          "Upgrades nginx to the latest version",
          "Installs nginx"
        ],
        correct: 1,
        explain: "purge removes the package AND its configuration files. remove keeps config files behind."
      },
      {
        q: "Which command shows all running processes in a detailed list?",
        options: ["ps", "ps aux", "top", "pgrep"],
        correct: 1,
        explain: "ps aux shows all processes (a = all users, u = user-friendly format, x = processes without a terminal)."
      },
      {
        q: "What is the purpose of `sudo apt autoremove`?",
        options: [
          "Removes all installed packages",
          "Removes packages that were installed as dependencies but are no longer needed",
          "Upgrades all packages",
          "Clears the package cache"
        ],
        correct: 1,
        explain: "autoremove cleans up orphaned dependencies that were installed automatically but are no longer required by any package."
      },
      {
        q: "Which file stores group information on a Linux system?",
        options: ["/etc/passwd", "/etc/group", "/etc/shadow", "/etc/groups"],
        correct: 1,
        explain: "/etc/group stores group names, GIDs, and member lists. Each line represents one group."
      }
    ],

    // ----- SET 3: Advanced Tools (Networking, Bash, systemd, Text Processing) -----
    3: [
      {
        q: "Which command tests network connectivity to a host?",
        options: ["ping", "traceroute", "dig", "ss"],
        correct: 0,
        explain: "ping sends ICMP echo requests to test reachability. Note that firewalls may block ICMP."
      },
      {
        q: "What does `grep -v` do?",
        options: [
          "Shows only matching lines",
          "Shows lines that do NOT match the pattern",
          "Shows line numbers with matches",
          "Shows matching filenames only"
        ],
        correct: 1,
        explain: "grep -v inverts the match — it prints all lines that do NOT contain the pattern."
      },
      {
        q: "Which command replaces all occurrences of 'old' with 'new' in a file?",
        options: [
          "grep 'old' file.txt",
          "sed 's/old/new/' file.txt",
          "sed 's/old/new/g' file.txt",
          "awk 's/old/new/g' file.txt"
        ],
        correct: 2,
        explain: "sed 's/old/new/g' replaces all occurrences (g = global). Without g, only the first per line is replaced."
      },
      {
        q: "Which command extracts the second column from a colon-separated file?",
        options: [
          "cut -d: -f2 file.txt",
          "awk -F: '{print $2}' file.txt",
          "Both cut and awk can do this",
          "Neither — use grep instead"
        ],
        correct: 2,
        explain: "Both cut -d: -f2 and awk -F: '{print $2}' extract the second column. cut is simpler; awk is more powerful."
      },
      {
        q: "What does `systemctl start nginx` do?",
        options: [
          "Stops the nginx service",
          "Starts the nginx service now",
          "Configures nginx to start at boot",
          "Reloads nginx configuration"
        ],
        correct: 1,
        explain: "systemctl start starts a service immediately. Enable configures it to start at boot."
      },
      {
        q: "Which command shows logs for a specific systemd service?",
        options: [
          "journalctl -u nginx",
          "systemctl logs nginx",
          "tail -f /var/log/nginx",
          "grep nginx /var/log/syslog"
        ],
        correct: 0,
        explain: "journalctl -u nginx shows all logs for the nginx service. The journal is systemd's centralised logging system."
      },
      {
        q: "Which SSH key file should never be shared?",
        options: [
          "~/.ssh/id_ed25519.pub",
          "~/.ssh/id_ed25519",
          "~/.ssh/known_hosts",
          "~/.ssh/config"
        ],
        correct: 1,
        explain: "The private key (~/.ssh/id_ed25519) must never be shared. The public key (.pub) goes on remote servers."
      },
      {
        q: "What does `journalctl -u nginx -f` do?",
        options: [
          "Shows all logs for nginx once",
          "Shows logs for nginx and follows new entries in real time",
          "Shows only error logs for nginx",
          "Shows logs from the last 50 lines"
        ],
        correct: 1,
        explain: "-f follows new log entries in real time, similar to tail -f. Essential for debugging services."
      },
      {
        q: "Which command counts the number of lines in a file?",
        options: [
          "wc -l file.txt",
          "wc -w file.txt",
          "wc -c file.txt",
          "sort file.txt | uniq"
        ],
        correct: 0,
        explain: "wc -l counts lines. wc -w counts words. wc -c counts bytes/characters."
      },
      {
        q: "What is the purpose of `ssh-copy-id`?",
        options: [
          "Copies files to a remote server",
          "Copies your public key to a remote server for passwordless SSH",
          "Copies your private key to a remote server",
          "Connects to a remote server"
        ],
        correct: 1,
        explain: "ssh-copy-id copies your public key to the remote server's authorized_keys file, enabling passwordless authentication."
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
    // Reset progress UI
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
            <label class="quiz-option" id="opt${qi}_${oi}" onclick="window.selectLinuxOption(${qi}, ${oi})">
              <input type="radio" name="q${qi}" value="${oi}" />
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // --- Select an option ---
  window.selectLinuxOption = function(qi, oi) {
    userAnswers[qi] = oi;
    document.querySelectorAll(`#qq${qi} .quiz-option`).forEach((opt, i) => {
      opt.classList.toggle('selected', i === oi);
    });
    const answered = userAnswers.filter(a => a !== null).length;
    const fill = document.getElementById('quizProgressFill');
    if (fill) fill.style.width = (answered / currentQuestions.length * 100) + '%';
  };

  // --- Submit quiz ---
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

  // --- Reset current quiz ---
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

  // --- Check if any set is mastered ---
  function isQuizMastered() {
    for (let i = 1; i <= 3; i++) {
      if (localStorage.getItem(`linux-quiz-set-${i}-passed`) === 'true') {
        return true;
      }
    }
    return false;
  }

  // --- Reset ALL quiz progress ---
  function resetAllQuizProgress() {
    for (let i = 1; i <= 3; i++) {
      localStorage.removeItem(`linux-quiz-set-${i}-passed`);
    }
    localStorage.removeItem('linux-quiz-passed');
    if (window.updateFloatingRing) window.updateFloatingRing();
  }

  // ----- Set button event listeners -----
  document.getElementById('set1Btn')?.addEventListener('click', () => loadQuizSet(1));
  document.getElementById('set2Btn')?.addEventListener('click', () => loadQuizSet(2));
  document.getElementById('set3Btn')?.addEventListener('click', () => loadQuizSet(3));
  document.getElementById('resetAllBtn')?.addEventListener('click', resetAllQuizProgress);
  

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