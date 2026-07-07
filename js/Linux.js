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
  // LINUX OVERVIEW CONTENT
  // ============================================================

  const LINUX_OVERVIEW = {
    purpose: {
      title: '📌 Purpose',
      description: [
        'This pillar builds genuine Linux command-line proficiency from first principles. Linux is the operating system that powers the vast majority of servers, cloud infrastructure, and DevOps tooling. Mastering the CLI is not optional — it is the primary interface you will use to navigate, configure, and troubleshoot systems throughout your career.',
        'Every concept here is learned through hands-on practice. The knowledge transfers directly to AWS (EC2 instances, container hosts, automation scripts) and to the full DevOps roadmap (Dockerfile commands, Kubernetes pod debugging, CI/CD pipeline scripting).'
      ]
    },
    objectives: [
      'Navigate the Linux filesystem using absolute and relative paths',
      'Create, copy, move, and delete files and directories safely',
      'Understand and modify file permissions (chmod, chown, umask)',
      'Manage processes (ps, top, kill, jobs, bg, fg)',
      'Connect to remote systems using SSH and manage keys',
      'Install, update, and remove software using package managers (apt, yum, dnf)',
      'Write bash scripts with variables, conditionals, loops, and functions',
      'Manage system services with systemd (systemctl, journalctl)',
      'Use text processing tools (grep, sed, awk) for log analysis and data extraction',
      'Troubleshoot network issues with commands like ping, traceroute, netstat, ss, and curl'
    ],
    keyConcepts: [
      { term: 'Absolute vs relative paths', definition: 'Understanding the difference and when to use each' },
      { term: 'File permissions (rwx)', definition: 'Read, write, execute for user, group, other' },
      { term: 'Process signals (SIGTERM, SIGKILL)', definition: 'Graceful vs forceful termination' },
      { term: 'SSH key authentication', definition: 'Passwordless login using public/private keys' },
      { term: 'Package managers (apt, yum)', definition: 'Installing, updating, removing software' },
      { term: 'Bash scripting basics', definition: 'Shebang, variables, conditionals, loops' },
      { term: 'systemd units', definition: 'Services, timers, sockets, and targets' },
      { term: 'grep, sed, awk', definition: 'Pattern matching, text substitution, data extraction' },
      { term: 'Redirection (>, >>, |, <)', definition: 'Pipes and file redirection' },
      { term: 'Exit codes ($?)', definition: 'Checking command success/failure' }
    ],
    stats: [
      { label: 'Sections', value: '10 total (2 complete, 8 in progress)' },
      { label: 'Topics covered', value: '20+' },
      { label: 'Estimated time', value: '~20-25 hours' },
      { label: 'Difficulty range', value: '🟢 Beginner → 🟡 Intermediate' },
      { label: 'Status', value: '🔄 IN PROGRESS' }
    ],
    readmeLink: 'https://github.com/K-Mash24/Great_Cheatsheets/tree/Master/saa-foundation/02-linux'
  };

// ============================================================
// RENDER LINUX OVERVIEW
// ============================================================

  function renderLinuxOverview() {
    const container = document.getElementById('js-overview-container');
    if (!container) {
      console.warn('⚠️ Overview container not found');
      return;
    }
    
    const objectives = LINUX_OVERVIEW.objectives.map(obj => `<li>${obj}</li>`).join('');
    
    const keyConcepts = LINUX_OVERVIEW.keyConcepts.map(item => `
      <dt>${item.term}</dt>
      <dd>${item.definition}</dd>
    `).join('');
    
    const stats = LINUX_OVERVIEW.stats.map(stat => `
      <tr><td><strong>${stat.label}</strong></td><td>${stat.value}</td></tr>
    `).join('');
    
    container.innerHTML = `
      <div class="overview-content" style="margin-bottom: 2rem;">
        
        <!-- Purpose -->
        <div class="info-box note" style="margin-bottom: 1.5rem;">
          <strong>${LINUX_OVERVIEW.purpose.title}</strong>
          <p>${LINUX_OVERVIEW.purpose.description[0]}</p>
          <p style="margin-top: 0.5rem;">${LINUX_OVERVIEW.purpose.description[1]}</p>
        </div>

        <!-- Learning Objectives -->
        <div class="info-box tip" style="margin-bottom: 1.5rem;">
          <strong>🎯 Learning objectives</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.2rem;">
            ${objectives}
          </ul>
        </div>

        <!-- Key Concepts -->
        <div class="info-box warning" style="margin-bottom: 2rem;">
          <strong>🔁 Key concepts to revise</strong>
          <dl class="key-concepts-list">
            ${keyConcepts}
          </dl>
        </div>

        <!-- Summary Statistics -->
        <div class="table-wrapper" style="margin-bottom: 1rem;">
          <table class="data-table">
            <thead>
              <tr><th>Metric</th><th>Value</th></tr>
            </thead>
            <tbody>
              ${stats}
            </tbody>
          </table>
        </div>

        <!-- Link to detailed README -->
        <div class="info-box note">
          <strong>📖 Detailed notes</strong>
          <p style="margin-top: 0.25rem;">
            All markdown notes are committed to 
            <a href="${LINUX_OVERVIEW.readmeLink}" target="_blank" style="color: var(--accent-secondary);">
              Great_Cheatsheets/saa-foundation/02-linux/
            </a>. Section notes are added as they are completed.
          </p>
        </div>

      </div>
    `;
  }

  // ============================================================
  // SECTION CONTENT — Migrating from HTML to JS (Linux Pillar)
  // ============================================================


  // SECTION 1 — Filesystem Structure & Navigation (9 accordions)
  const SECTION_1_ACCORDIONS = [
    {
      id: 'what-is-filesystem',
      title: 'What is a filesystem?',
      priority: false,
      icon: '📁',
      bodyHTML: `
        <p>A filesystem is how the operating system organises data on disk into a structured hierarchy. On Linux, this is a <strong>single tree with one root</strong> — everything lives under it. Unlike Windows, which gives each disk its own tree (<code>C:\\</code>, <code>D:\\</code>), Linux has one unified tree for all disks, partitions, and even devices.</p>
        <p>The top of the tree is written as <code>/</code> (called "root"). All files, directories, and devices live somewhere below it.</p>
        <div class="info-box tip"><strong>💡 Key insight</strong> Even a USB drive or a CD‑ROM is mounted somewhere inside this tree, not given a separate drive letter.</div>
      `
    },
    {
      id: 'fhs-directories',
      title: 'Standard top‑level directories (FHS)',
      priority: false,
      icon: '🌳',
      bodyHTML: `
        <p>The Filesystem Hierarchy Standard (FHS) defines the structure of Linux directories. Every Linux distribution follows it, so you'll find the same layout on Ubuntu, Debian, RHEL, Fedora, and even container images.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Directory</th><th>Purpose</th><th>Example contents</th></tr></thead>
            <tbody>
              <tr><td><code>/</code> (root)</td><td>Top of the entire filesystem tree</td><td>All other directories branch from here</td></tr>
              <tr><td><code>/home</code></td><td>Home directories for regular users</td><td><code>/home/alice/</code>, <code>/home/bob/</code></td></tr>
              <tr><td><code>/root</code></td><td>Home directory for the root (admin) user</td><td>Not under <code>/home</code> — isolated for security</td></tr>
              <tr><td><code>/etc</code></td><td>System‑wide configuration files (text)</td><td><code>/etc/passwd</code>, <code>/etc/ssh/sshd_config</code></td></tr>
              <tr><td><code>/var</code></td><td>Variable data — logs, caches, spools</td><td><code>/var/log/</code> (system logs), <code>/var/cache/apt/</code></td></tr>
              <tr><td><code>/usr</code></td><td>User system resources — installed programs and libraries</td><td><code>/usr/bin/</code>, <code>/usr/lib/</code>, <code>/usr/share/</code></td></tr>
              <tr><td><code>/tmp</code></td><td>Temporary files — cleared on reboot</td><td>Often a <code>tmpfs</code> (in memory)</td></tr>
              <tr><td><code>/bin</code></td><td>Essential command binaries (often symlink to <code>/usr/bin</code>)</td><td><code>ls</code>, <code>cp</code>, <code>mv</code>, <code>cat</code></td></tr>
              <tr><td><code>/sbin</code></td><td>System binaries — for administration (often symlink)</td><td><code>fdisk</code>, <code>mkfs</code>, <code>iptables</code></td></tr>
              <tr><td><code>/dev</code></td><td>Device files — hardware represented as files</td><td><code>/dev/sda</code> (first hard disk), <code>/dev/tty</code> (terminal)</td></tr>
              <tr><td><code>/proc</code></td><td>Virtual filesystem for process and kernel info</td><td><code>/proc/cpuinfo</code>, <code>/proc/meminfo</code></td></tr>
              <tr><td><code>/sys</code></td><td>Kernel and device information (sysfs)</td><td><code>/sys/class/net/</code> (network interfaces)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box note"><strong>📌 Modern Linux</strong> Many distributions now merge <code>/bin</code>, <code>/sbin</code>, <code>/lib</code> into <code>/usr/bin</code>, <code>/usr/sbin</code>, <code>/usr/lib</code> and symlink them for compatibility.</div>
      `
    },
    {
      id: 'special-directory-symbols',
      title: 'Special directory symbols',
      priority: false,
      icon: '🔣',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Symbol</th><th>Name</th><th>What it is</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td><code>/</code></td><td>Root</td><td>Top of the entire filesystem tree</td><td><code>cd /</code> → go to root</td></tr>
              <tr><td><code>~</code></td><td>Tilde</td><td>Shortcut for your home directory</td><td><code>cd ~/Documents</code></td></tr>
              <tr><td><code>.</code></td><td>Dot</td><td>Current directory</td><td><code>cp file.txt .</code> → copy to current dir</td></tr>
              <tr><td><code>..</code></td><td>Dot‑dot</td><td>Parent directory — one level up</td><td><code>cd ../..</code> → go up two levels</td></tr>
              <tr><td><code>-</code></td><td>Hyphen</td><td>Previous directory (with <code>cd</code>)</td><td><code>cd -</code> → toggle back and forth</td></tr>
            </tbody>
          </table>
        </div>
        <div class="code-block"><pre>$ pwd\n/home/user/projects/linux\n$ cd ..\n$ pwd\n/home/user/projects\n$ cd -\n/home/user/projects/linux\n$ cd ~\n$ pwd\n/home/user</pre></div>
        <div class="info-box warning"><strong>⚠️ Common confusion:</strong> <code>~</code> and <code>/root</code> are completely different. <code>~</code> expands to your own home (<code>/home/username</code>). <code>/root</code> is a specific directory belonging to the admin user.</div>
      `
    },
    {
      id: 'navigation-commands',
      title: 'Navigation commands — <code>pwd</code>, <code>ls</code>, <code>cd</code>',
      priority: false,
      icon: '🧭',
      bodyHTML: `
        <div class="code-block"><pre>pwd                 # Print Working Directory — shows your current location\nls                  # List contents of current directory\nls -l               # Long format — permissions, owner, size, date\nls -a               # All files including hidden (those starting with .)\nls -la              # Long format + hidden (most common combo)\nls -lh              # Human‑readable sizes (KB, MB, GB)\nls -ltr             # Long, sort by time, reverse (oldest last) — useful for logs\n\ncd /etc             # Change to /etc (absolute path)\ncd ..               # Go up one level\ncd ~                # Go to your home directory\ncd -                # Go back to the previous directory\ncd                  # No argument → go to home (same as cd ~)</pre></div>
        <p><strong>Reading <code>ls -l</code> output:</strong></p>
        <div class="code-block"><pre>drwxr-xr-x 2 alice users 4096 Jun 3 10:30 Documents\n│         │ │     │     │    │             │\n│         │ │     │     │    └── date/time  └── filename\n│         │ │     │     └── size in bytes\n│         │ │     └── group owner\n│         │ └── user owner\n│         └── link count\n└── file type + permissions\n    │└──────────────────── permissions (9 chars: user/group/other × rwx)\n    └── file type: d=directory  -=regular file  l=symlink</pre></div>
        <div class="info-box tip"><strong>💡 Tab completion</strong> Press <kbd>Tab</kbd> to auto‑complete file/directory names. Press twice to see possible matches.</div>
      `
    },
    {
      id: 'absolute-vs-relative',
      title: 'Absolute vs relative paths',
      priority: false,
      icon: '🔄',
      bodyHTML: `
        <p><strong>Absolute path:</strong> Full address starting from root, always starts with <code>/</code>. Works the same no matter where you are.</p>
        <p><strong>Relative path:</strong> Address starting from your current working directory. Uses <code>.</code> and <code>..</code>.</p>
        <div class="code-block"><pre># Assuming you are in /home/user/projects\n\n# Absolute path (starts with /)\ncd /var/log\n\n# Relative path (no leading /)\ncd ../../etc          # go up two levels, then into etc\ncd ./scripts          # same as just "cd scripts" (./ is optional)</pre></div>
        <div class="info-box warning"><strong>⚠️ Common mistake</strong> Forgetting the leading <code>/</code> makes the path relative. <code>cd etc</code> will look for an <code>etc</code> directory <em>inside your current directory</em>, not the system <code>/etc</code>.</div>
        <div class="info-box tip"><strong>Path decision tree</strong><ul style="margin-top:0.5rem"><li>Does the path start with <code>/</code>? → <strong>Absolute</strong> (works anywhere)</li><li>No leading <code>/</code> → <strong>Relative</strong> (depends on current directory)</li></ul></div>
      `
    },
    {
      id: 'hidden-files',
      title: 'Hidden files & directories',
      priority: false,
      icon: '🙈',
      bodyHTML: `
        <p>Any file or directory whose name starts with <code>.</code> is hidden. Hidden = not shown by default in <code>ls</code>. Not protected or encrypted — just kept out of the way.</p>
        <div class="code-block"><pre>ls -a ~     # reveal hidden files in home\nls -la ~    # hidden files + long format</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>File/Dir</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td><code>.bashrc</code></td><td>Bash shell config — runs every time a terminal opens</td></tr>
              <tr><td><code>.profile</code></td><td>Login shell config</td></tr>
              <tr><td><code>.gitconfig</code></td><td>Git settings — name, email, preferences</td></tr>
              <tr><td><code>.ssh/</code></td><td>SSH keys and known hosts</td></tr>
              <tr><td><code>.</code></td><td>The current directory itself</td></tr>
              <tr><td><code>..</code></td><td>The parent directory</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'tree-command',
      title: 'The <code>tree</code> command',
      priority: false,
      icon: '🌲',
      bodyHTML: `
        <p>Displays an entire directory structure visually — not just one level at a time.</p>
        <div class="code-block"><pre>tree ~              # full tree of home directory\ntree -L 1 /         # 1 level deep from root\ntree -L 2 /home     # 2 levels deep from /home\ntree -a ~           # include hidden files\ntree -d ~           # directories only, no files</pre></div>
        <div class="info-box tip"><strong>💡 <code>-L</code> (Level)</strong> is the most useful flag — always use it on large directories to avoid thousands of lines of output.</div>
        <p>If <code>tree</code> is not installed: <code>sudo apt install tree</code> (Debian/Ubuntu) or <code>sudo dnf install tree</code> (RHEL/Fedora).</p>
      `
    },
    {
      id: 'common-errors',
      title: 'Common errors & fixes',
      priority: false,
      icon: '⚠️',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Error</th><th>What it means</th><th>Fix</th></tr></thead>
            <tbody>
              <tr><td><code>No such file or directory</code></td><td>Path doesn't exist or is wrong</td><td>Check spelling; use <code>ls</code> to see what's actually there</td></tr>
              <tr><td><code>cd: x: Not a directory</code></td><td><code>x</code> is a file, not a directory</td><td>Can't <code>cd</code> into a file — use <code>cat</code> or <code>less</code> to read it</td></tr>
              <tr><td><code>Permission denied</code></td><td>You don't have access rights</td><td>Check <code>ls -l</code>; you may need <code>sudo</code></td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'quick-ref-section1',
      title: 'Quick reference — Navigation',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>What you want</th><th>Command</th></tr></thead>
            <tbody>
              <tr><td>Where am I?</td><td><code>pwd</code></td></tr>
              <tr><td>What's in this directory?</td><td><code>ls</code></td></tr>
              <tr><td>Everything including hidden</td><td><code>ls -a</code></td></tr>
              <tr><td>Details + hidden</td><td><code>ls -la</code></td></tr>
              <tr><td>Human‑readable sizes</td><td><code>ls -lh</code></td></tr>
              <tr><td>Go home</td><td><code>cd</code> or <code>cd ~</code></td></tr>
              <tr><td>Go up one level</td><td><code>cd ..</code></td></tr>
              <tr><td>Go back to previous location</td><td><code>cd -</code></td></tr>
              <tr><td>See folder tree (2 levels)</td><td><code>tree -L 2</code></td></tr>
              <tr><td>Tree including hidden files</td><td><code>tree -a</code></td></tr>
            </tbody>
          </table>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 2 — File & Directory Operations
  // ============================================================

  const SECTION_2_ACCORDIONS = [
    {
      id: 'creating-files',
      title: 'Creating files — <code>touch</code>, <code>&gt;</code>, <code>&gt;&gt;</code>',
      priority: false,
      icon: '📄',
      bodyHTML: `
        <div class="code-block"><pre>touch notes.txt                    # creates empty file (or updates timestamp)\ntouch file1.txt file2.txt          # create multiple at once\necho "hello world" > notes.txt    # writes content, overwrites entire file\necho "another line" >> notes.txt  # appends to file, preserves existing content</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Operator</th><th>Behaviour</th></tr></thead>
            <tbody>
              <tr><td><code>&gt;</code></td><td>Wipes the file, writes fresh</td></tr>
              <tr><td><code>&gt;&gt;</code></td><td>Keeps existing content, adds to the bottom</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box warning"><strong>⚠️ Warning:</strong> <code>&gt;</code> is destructive — it wipes the entire file, not just one line. Always double‑check before using.</div>
      `
    },
    {
      id: 'mkdir-command',
      title: 'Creating directories — <code>mkdir</code>, <code>mkdir -p</code>',
      priority: false,
      icon: '📁',
      bodyHTML: `
        <div class="code-block"><pre>mkdir projects\nmkdir docs notes images            # multiple at once\nmkdir -p projects/linux/section-2  # creates full nested path in one shot</pre></div>
        <div class="info-box tip"><strong>💡 <code>-p</code> (parents)</strong> creates all missing parent directories along the way. Without it, <code>mkdir a/b/c</code> fails if <code>a/b</code> doesn't already exist.</div>
      `
    },
    {
      id: 'cp-command',
      title: 'Copying — <code>cp</code>',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <div class="code-block"><pre>cp source destination\ncp notes.txt backup/                     # copy into directory\ncp notes.txt backup/notes-copy.txt       # copy and rename at the same time\ncp -r projects projects-backup           # -r required for directories\ncp -i notes.txt backup/                  # interactive — asks before overwriting</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Flag</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>-r</code></td><td>Recursive — required for directories</td></tr>
              <tr><td><code>-i</code></td><td>Interactive — prompts before overwriting</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 <code>-i</code></strong> is a safety net. Use it when unsure whether the destination already has a file with the same name.</div>
      `
    },
    {
      id: 'mv-command',
      title: 'Moving & renaming — <code>mv</code>',
      priority: false,
      icon: '🚚',
      bodyHTML: `
        <div class="code-block"><pre>mv source destination\nmv notes.txt archive/               # move into directory (same as cut+paste)\nmv old-name.txt new-name.txt        # rename in same location\nmv notes.txt archive/renamed.txt    # move and rename in one step\nmv projects archive/                # move a directory (no -r needed)\nmv -i notes.txt archive/            # interactive — asks before overwriting</pre></div>
        <div class="info-box note"><strong>Note:</strong> Unlike <code>cp</code>, <code>mv</code> leaves no copy behind — the original is gone. Unlike <code>cp</code>, <code>mv</code> doesn't need <code>-r</code> for directories.</div>
      `
    },
    {
      id: 'rm-command',
      title: 'Deleting — <code>rm</code>, <code>rm -rf</code>, <code>rmdir</code>',
      priority: false,
      icon: '🗑️',
      bodyHTML: `
        <div class="code-block"><pre>rm notes.txt                         # delete a file\nrm file1.txt file2.txt               # delete multiple files\nrm -i notes.txt                      # interactive — asks for confirmation\nrm -r projects/                      # delete a directory and all its contents\nrm -rf projects/                     # force delete — no prompts, no mercy (dangerous!)\nrmdir empty-dir/                     # only works if the directory is empty</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Command</th><th>Behaviour</th></tr></thead>
            <tbody>
              <tr><td><code>rm</code></td><td>Deletes files</td></tr>
              <tr><td><code>rm -r</code></td><td>Deletes a directory and everything inside it</td></tr>
              <tr><td><code>rm -rf</code></td><td>Force deletes — no confirmation, no recovery</td></tr>
              <tr><td><code>rmdir</code></td><td>Deletes a directory only if it is empty — safe option</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box warning"><strong>⚠️ Linux has no recycle bin.</strong> Deleted = gone permanently. <code>rm -rf</code> is the most dangerous command — always double‑check the path before running.</div>
        <div class="info-box tip"><strong>💡 Safety tip:</strong> Some users alias <code>rm</code> to <code>rm -i</code> to prevent accidental deletion. Use <code>rmdir</code> for directories you want to delete safely.</div>
      `
    },
    {
      id: 'wildcards',
      title: 'Wildcards — <code>*</code>, <code>?</code>',
      priority: false,
      icon: '*',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Wildcard</th><th>Matches</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td><code>*</code></td><td>Any number of characters (including zero)</td><td><code>*.txt</code> → all text files</td></tr>
              <tr><td><code>?</code></td><td>Exactly one character</td><td><code>file-?.txt</code> → file-1.txt, file-a.txt (not file-10.txt)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="code-block"><pre>rm *.log                               # delete all .log files\ncp *.txt backup/                       # copy all .txt files into backup/\nls file-?.txt                          # matches file-1.txt, file-a.txt\nls chapter-*.md                        # list all markdown files starting with "chapter-"</pre></div>
        <div class="info-box warning"><strong>⚠️ Caution with <code>rm *</code>:</strong> Always run <code>ls *</code> first to see what you're about to delete.</div>
      `
    },
    {
      id: 'viewing-file-contents',
      title: 'Viewing file contents — <code>cat</code>, <code>less</code>, <code>head</code>, <code>tail</code>',
      priority: false,
      icon: '👀',
      bodyHTML: `
        <div class="code-block"><pre>cat notes.txt                          # print entire file to screen (good for short files)\nless notes.txt                         # scrollable viewer (Space=down, b=up, q=quit, /search)\nhead -n 5 notes.txt                    # first 5 lines\ntail -n 5 notes.txt                    # last 5 lines\ntail -f app.log                        # follow — prints new lines as file grows (great for logs)</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Key</th><th>Action in <code>less</code></th></tr></thead>
            <tbody>
              <tr><td><code>Space</code> or <code>f</code></td><td>Page down</td></tr>
              <tr><td><code>b</code></td><td>Page up</td></tr>
              <tr><td><code>q</code></td><td>Quit</td></tr>
              <tr><td><code>/word</code></td><td>Search for "word"</td></tr>
              <tr><td><code>n</code></td><td>Next search result</td></tr>
              <tr><td><code>N</code></td><td>Previous search result</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Use <code>less</code> for large files</strong> — <code>cat</code> will flood your terminal with thousands of lines. <code>less</code> loads the file page by page.<br><strong><code>tail -f</code></strong> is essential for watching log files in real time.</div>
      `
    },
    {
      id: 'file-command',
      title: '<code>file</code> — determine file type',
      priority: false,
      icon: '🔍',
      bodyHTML: `
        <p>Linux doesn't rely on file extensions to know what a file is. Use <code>file</code> to identify what something actually contains.</p>
        <div class="code-block"><pre>file unknown.bin                       # tells you if it's ASCII text, binary, image, etc.\nfile script.sh                         # might show "Bourne-Again shell script"</pre></div>
      `
    },
    {
      id: 'quick-ref-section2',
      title: 'Quick reference — File Operations',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>What you want</th><th>Command</th></tr></thead>
            <tbody>
              <tr><td>Create empty file</td><td><code>touch file.txt</code></td></tr>
              <tr><td>Write to file (overwrite)</td><td><code>echo "text" > file.txt</code></td></tr>
              <tr><td>Append to file</td><td><code>echo "text" >> file.txt</code></td></tr>
              <tr><td>Create directory</td><td><code>mkdir dir</code></td></tr>
              <tr><td>Create nested directories</td><td><code>mkdir -p a/b/c</code></td></tr>
              <tr><td>Copy file</td><td><code>cp src dest</code></td></tr>
              <tr><td>Copy file (safe)</td><td><code>cp -i src dest</code></td></tr>
              <tr><td>Copy directory</td><td><code>cp -r src dest</code></td></tr>
              <tr><td>Move / rename</td><td><code>mv src dest</code></td></tr>
              <tr><td>Move / rename (safe)</td><td><code>mv -i src dest</code></td></tr>
              <tr><td>Delete file</td><td><code>rm file.txt</code></td></tr>
              <tr><td>Delete directory</td><td><code>rm -r dir</code></td></tr>
              <tr><td>Force delete</td><td><code>rm -rf dir</code></td></tr>
              <tr><td>Delete empty directory</td><td><code>rmdir dir</code></td></tr>
              <tr><td>Delete all <code>.log</code> files</td><td><code>rm *.log</code></td></tr>
              <tr><td>Match single character</td><td><code>ls file-?.txt</code></td></tr>
              <tr><td>Print file</td><td><code>cat file.txt</code></td></tr>
              <tr><td>Scroll through file</td><td><code>less file.txt</code></td></tr>
              <tr><td>First N lines</td><td><code>head -n N file.txt</code></td></tr>
              <tr><td>Last N lines</td><td><code>tail -n N file.txt</code></td></tr>
              <tr><td>Watch file live</td><td><code>tail -f file.txt</code></td></tr>
              <tr><td>Identify file type</td><td><code>file filename</code></td></tr>
            </tbody>
          </table>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 3 — Permissions & Ownership
  // ============================================================

  const SECTION_3_ACCORDIONS = [
    {
      id: 'why-permissions',
      title: 'Why permissions exist & the three categories',
      priority: false,
      icon: '🔐',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Metadata</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><strong>User owner</strong> (u)</td><td>The creator or assigned owner of the file — usually the user who created it.</td></tr>
              <tr><td><strong>Group owner</strong> (g)</td><td>A collection of users who share access. The file's group determines which users get group‑level permissions.</td></tr>
              <tr><td><strong>Three sets of permissions</strong></td><td>Separate <code>rwx</code> triples for the user owner, the group owner, and everyone else (<strong>other</strong>)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="code-block"><pre>$ ls -l /etc/shadow\n-rw-r----- 1 root shadow 1234 Mar 10 10:00 /etc/shadow\n\n# Only root (owner) and the shadow group can read. No one else.\n$ ls -ld /root\ndrwx------ 5 root root 4096 Mar 10 10:00 /root/\n\n# Only root can enter /root — completely locked.</pre></div>
        <div class="info-box tip"><strong>💡 Key insight</strong> Permissions are not just for security — they also protect against accidental changes. A missing execute bit on a directory prevents <code>cd</code> into it, which stops you from even seeing what's inside.</div>
      `
    },
    {
      id: 'three-permission-types',
      title: 'The three permission types',
      priority: false,
      icon: '📖',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Permission</th><th>Symbol</th><th>On a file</th><th>On a directory</th></tr></thead>
            <tbody>
              <tr><td>Read</td><td><code>r</code></td><td>View contents</td><td>List contents with <code>ls</code></td></tr>
              <tr><td>Write</td><td><code>w</code></td><td>Modify or delete</td><td>Create, delete, rename files inside</td></tr>
              <tr><td>Execute</td><td><code>x</code></td><td>Run as a program</td><td>Enter with <code>cd</code></td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Directory execute</strong> You need <code>x</code> on a directory just to <code>cd</code> into it — even if you have <code>r</code>.</div>
        <div class="code-block"><pre># Example: a directory with r but no x\n$ chmod 444 mydir/          # r--r--r--\n$ cd mydir/\nbash: cd: mydir/: Permission denied   # cannot enter\n\n$ chmod 555 mydir/          # r-xr-xr-x (adds execute)\n$ cd mydir/                 # now works</pre></div>
      `
    },
    {
      id: 'reading-permission-string',
      title: 'Reading the permission string',
      priority: false,
      icon: '🔍',
      bodyHTML: `
        <div class="code-block"><pre>d  rwx  r-x  r-x\n│   │    │    │\n│   │    │    └── other\n│   │    └─────── group\n│   └──────────── user (owner)\n└──────────────── type: d=directory  -=file  l=symlink</pre></div>
        <p>Each block of three is always <code>r</code> then <code>w</code> then <code>x</code>. A <code>-</code> means that permission is not granted.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Output</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>-rw-r--r--</code></td><td>File. Owner: read+write. Group: read. Other: read.</td></tr>
              <tr><td><code>drwxr-xr-x</code></td><td>Directory. Owner: full. Group: read+execute. Other: read+execute.</td></tr>
              <tr><td><code>drwx------</code></td><td>Directory. Owner: full. Group: none. Other: none.</td></tr>
              <tr><td><code>drwxrwxrwt</code></td><td>Directory. Everyone: full. Sticky bit set (<code>t</code>).</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box note"><strong>Real system examples</strong><ul><li><code>/etc/hosts</code> → <code>-rw-r--r--</code> (root edits, everyone reads)</li><li><code>/etc/passwd</code> → <code>-rw-r--r--</code> (user list public)</li><li><code>/tmp</code> → <code>drwxrwxrwt</code> (shared, sticky bit prevents deleting others' files)</li><li><code>/root</code> → <code>drwx------</code> (admin's home, locked to everyone else)</li></ul></div>
      `
    },
    {
      id: 'chmod-symbolic',
      title: '<code>chmod</code> — changing permissions (symbolic)',
      priority: false,
      icon: '🔧',
      bodyHTML: `
        <p>Syntax: <code>chmod [who][operator][permission] filename</code></p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Who</th><th>Operator</th><th>Permission</th></tr></thead>
            <tbody>
              <tr><td><code>u</code> user</td><td><code>+</code> add</td><td><code>r</code> read</td></tr>
              <tr><td><code>g</code> group</td><td><code>-</code> remove</td><td><code>w</code> write</td></tr>
              <tr><td><code>o</code> other</td><td><code>=</code> set exactly</td><td><code>x</code> execute</td></tr>
              <tr><td><code>a</code> all</td><td></td><td></td></tr>
            </tbody>
          </table>
        </div>
        <div class="code-block"><pre>chmod u+x script.sh          # add execute for owner\nchmod g-w notes.txt          # remove write from group\nchmod o=r notes.txt          # set other to read only\nchmod a+r notes.txt          # give everyone read\nchmod u+x,g-w notes.txt      # multiple changes at once</pre></div>
        <div class="info-box tip"><strong>💡 Tip</strong> <code>chmod a+x file</code> adds execute for everyone (user+group+other).</div>
      `
    },
    {
      id: 'chmod-numeric',
      title: '<code>chmod</code> — numeric mode (octal)',
      priority: false,
      icon: '🔢',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Permission</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td><code>r</code></td><td>4</td></tr>
              <tr><td><code>w</code></td><td>2</td></tr>
              <tr><td><code>x</code></td><td>1</td></tr>
              <tr><td>none</td><td>0</td></tr>
            </tbody>
          </table>
        </div>
        <p>Add values for each category (user, group, other) to form a three-digit number.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Number</th><th>Permissions</th><th>Calculation</th></tr></thead>
            <tbody>
              <tr><td><code>7</code></td><td><code>rwx</code></td><td>4+2+1</td></tr>
              <tr><td><code>6</code></td><td><code>rw-</code></td><td>4+2+0</td></tr>
              <tr><td><code>5</code></td><td><code>r-x</code></td><td>4+0+1</td></tr>
              <tr><td><code>4</code></td><td><code>r--</code></td><td>4+0+0</td></tr>
              <tr><td><code>0</code></td><td><code>---</code></td><td>0+0+0</td></tr>
            </tbody>
          </table>
        </div>
        <div class="code-block"><pre>chmod 755 script.sh     # rwxr-xr-x — scripts, directories\nchmod 644 notes.txt     # rw-r--r-- — regular files, config files\nchmod 700 private.txt   # rwx------ — owner only, full access\nchmod 600 secret.txt    # rw------- — owner read+write only\nchmod 777 shared.txt    # rwxrwxrwx — full access for everyone (dangerous)</pre></div>
        <div class="info-box tip"><strong>Memorise these two:</strong> <code>755</code> for scripts/directories, <code>644</code> for regular files.</div>
      `
    },
    {
      id: 'chown-command',
      title: '<code>chown</code> — changing ownership',
      priority: false,
      icon: '👑',
      bodyHTML: `
        <div class="code-block"><pre>chown newowner filename\nchown user:group filename          # change both at once\nchown -R user:group directory/     # recursive — apply to whole directory</pre></div>
        <p>Examples:</p>
        <div class="code-block"><pre>sudo chown root notes.txt          # make root the owner\nsudo chown codespace notes.txt     # give back to codespace\nsudo chown codespace:root notes.txt # owner=codespace, group=root</pre></div>
        <div class="info-box warning"><strong>⚠️ Requires sudo</strong> Only root can transfer ownership of files. A regular user cannot take ownership away from root without <code>sudo</code>.</div>
      `
    },
    {
      id: 'chgrp-command',
      title: '<code>chgrp</code> — changing group',
      priority: false,
      icon: '👪',
      bodyHTML: `
        <div class="code-block"><pre>chgrp newgroup filename\nchgrp root notes.txt               # assign to root group\nchgrp -R codespace projects/       # recursive</pre></div>
        <div class="info-box note"><strong>Note:</strong> <code>chown user:group</code> does both at once, so <code>chgrp</code> is rarely needed.</div>
      `
    },
    {
      id: 'sudo-command',
      title: '<code>sudo</code> — acting as administrator',
      priority: false,
      icon: '⚡',
      bodyHTML: `
        <p><code>sudo</code> (superuser do) lets an authorised user run a single command with root privileges.</p>
        <div class="code-block"><pre>sudo chown root notes.txt          # run as root\nsudo chmod 600 /etc/hosts          # modify a system file</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>root</code></td><td>The administrator account — no permission restrictions</td></tr>
              <tr><td><code>sudo</code></td><td>Allows a regular user to act as root for one command</td></tr>
              <tr><td>sudoers</td><td>The list of users allowed to use <code>sudo</code></td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Tip:</strong> <code>sudo</code> asks for your password the first time, then remembers for a few minutes.</div>
      `
    },
    {
      id: 'quick-ref-section3',
      title: 'Quick reference — Permissions',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>What you want</th><th>Command</th></tr></thead>
            <tbody>
              <tr><td>View permissions</td><td><code>ls -l filename</code></td></tr>
              <tr><td>Give owner execute</td><td><code>chmod u+x file</code></td></tr>
              <tr><td>Remove group write</td><td><code>chmod g-w file</code></td></tr>
              <tr><td>Set other to read only</td><td><code>chmod o=r file</code></td></tr>
              <tr><td>Common file permissions</td><td><code>chmod 644 file</code></td></tr>
              <tr><td>Common script permissions</td><td><code>chmod 755 file</code></td></tr>
              <tr><td>Owner only, full access</td><td><code>chmod 700 file</code></td></tr>
              <tr><td>Change file owner</td><td><code>sudo chown user file</code></td></tr>
              <tr><td>Change owner and group</td><td><code>sudo chown user:group file</code></td></tr>
              <tr><td>Change recursively</td><td><code>sudo chown -R user:group dir/</code></td></tr>
              <tr><td>Change group only</td><td><code>chgrp group file</code></td></tr>
              <tr><td>Run as administrator</td><td><code>sudo command</code></td></tr>
            </tbody>
          </table>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 4 — Users & Groups
  // ============================================================

  const SECTION_4_ACCORDIONS = [
    {
      id: 'what-is-user',
      title: 'What is a user?',
      priority: false,
      icon: '👤',
      bodyHTML: `
        <p>Every process that runs on Linux runs as a specific user. Every file is owned by a specific user. Users are how Linux tracks who is doing what and enforces permissions.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Type</th><th>Description</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td><strong>Root</strong></td><td>The superuser — no restrictions</td><td><code>root</code></td></tr>
              <tr><td><strong>Regular</strong></td><td>Human users with home directories</td><td><code>codespace</code></td></tr>
              <tr><td><strong>System</strong></td><td>Created by software, not humans — run background services</td><td><code>www-data</code>, <code>nobody</code></td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box note"><strong>📌 Key insight</strong> The <code>root</code> user has full system access. System users run background services and typically have no login shell (<code>/sbin/nologin</code>).</div>
      `
    },
    {
      id: 'what-is-group',
      title: 'What is a group?',
      priority: false,
      icon: '👥',
      bodyHTML: `
        <p>A group is a collection of users. Instead of setting permissions for each user individually, you put users in a group and set permissions on the group once.</p>
        <p>Every user has:</p>
        <ul style="margin-left:1.25rem;margin-bottom:0.75rem;">
          <li>One <strong>primary group</strong> — assigned at creation, same name as the user by default</li>
          <li>Zero or more <strong>supplementary groups</strong> — additional groups they belong to</li>
        </ul>
        <div class="info-box tip"><strong>💡 Real example</strong> The <code>codespace</code> user belongs to its own primary group, plus supplementary groups created by installed tools — <code>docker</code>, <code>python</code>, <code>golang</code>, <code>nvm</code>, <code>ssh</code>, and more. Each tool creates a group and adds the user to it so commands work without needing <code>sudo</code> every time.</div>
      `
    },
    {
      id: 'user-group-storage',
      title: 'Where users & groups are stored — <code>/etc/passwd</code>, <code>/etc/group</code>, <code>/etc/shadow</code>',
      priority: false,
      icon: '📂',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.5rem 0;"><code>/etc/passwd</code> — the user database</h4>
        <p>Passwords are <strong>not</strong> stored here despite the name. Each line is one user:</p>
        <div class="code-block"><pre>codespace:x:1000:1000::/home/codespace:/bin/bash\n      │         │ │    │    │ │              └── login shell\n      │         │ │    │    │ └── home directory\n      │         │ │    │    └── comment (usually full name)\n      │         │ │    └── primary group ID (GID)\n      │         │ └── user ID (UID)\n      │         └── password placeholder (x = stored in /etc/shadow)\n      └── username</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:1.25rem 0 0.5rem 0;"><code>/etc/group</code> — the group database</h4>
        <div class="code-block"><pre>codespace:x:1000:\n      │         │ │    └── members (comma-separated)\n      │         │ └── group ID (GID)\n      │         └── password placeholder\n      └── group name</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:1.25rem 0 0.5rem 0;"><code>/etc/shadow</code> — actual passwords</h4>
        <p>Stores hashed passwords. Only readable by root — this is where real password security lives.</p>
        <div class="info-box warning"><strong>⚠️ Security note</strong> <code>/etc/shadow</code> is readable only by <code>root</code> (<code>-rw-r-----</code>). This is why passwords are stored there and not in <code>/etc/passwd</code>.</div>
      `
    },
    {
      id: 'inspecting-identity',
      title: 'Inspecting your own identity — <code>whoami</code>, <code>id</code>, <code>groups</code>',
      priority: false,
      icon: '🔍',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Command</th><th>What it does</th><th>Example output</th></tr></thead>
            <tbody>
              <tr><td><code>whoami</code></td><td>Prints your username only — deliberately simple, no flags</td><td><code>codespace</code></td></tr>
              <tr><td><code>id</code></td><td>Prints UID, GID, and every group you belong to in one shot</td><td><code>uid=1000(codespace) gid=1000(codespace) groups=1000(codespace),989(docker),988(golang)</code></td></tr>
              <tr><td><code>groups</code></td><td>Prints just the group names — a simpler view than <code>id</code></td><td><code>codespace pipx python oryx golang docker</code></td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Consistency check</strong> All three commands should agree with what's in <code>/etc/passwd</code> and <code>/etc/group</code> — they're just different views of the same underlying data.</div>
      `
    },
    {
      id: 'managing-users',
      title: 'Managing users — <code>useradd</code>, <code>usermod</code>, <code>userdel</code>',
      priority: false,
      icon: '🛠️',
      bodyHTML: `
        <p>All of these require <code>sudo</code> since they affect the whole system.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>useradd</code> — create a new user</h4>
        <div class="code-block"><pre>sudo useradd newuser                    # minimal — NO home directory created\nsudo useradd -m newuser                 # create WITH a home directory\nsudo useradd -m -s /bin/bash newuser    # also set login shell\nsudo useradd -m -s /bin/bash -G docker devuser   # add to a group at creation</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Flag</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>-m</code></td><td>Create a home directory</td></tr>
              <tr><td><code>-s</code></td><td>Set the login shell</td></tr>
              <tr><td><code>-g</code></td><td>Set primary group</td></tr>
              <tr><td><code>-G</code></td><td>Set supplementary groups (comma-separated)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box warning"><strong>⚠️ Without <code>-m</code></strong>, no home directory is created. Almost always use <code>-m</code>.</div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:1.25rem 0 0.25rem 0;"><code>usermod</code> — modify an existing user</h4>
        <div class="code-block"><pre>sudo usermod -aG docker existinguser    # ADD to the docker group\nsudo usermod -s /bin/bash existinguser  # change their shell\nsudo usermod -l newname oldname         # rename the user</pre></div>
        <div class="info-box warning"><strong>⚠️ <code>-aG</code> vs <code>-G</code></strong> <code>-aG</code> appends to a group. Without <code>-a</code>, <code>-G</code> <strong>replaces</strong> all their supplementary groups instead of adding one — a common mistake. The group must already exist via <code>groupadd</code> before you can add anyone to it.</div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:1.25rem 0 0.25rem 0;"><code>userdel</code> — delete a user</h4>
        <div class="code-block"><pre>sudo userdel newuser           # delete user, leave home directory behind\nsudo userdel -r newuser        # delete user AND their home directory</pre></div>
      `
    },
    {
      id: 'managing-groups',
      title: 'Managing groups — <code>groupadd</code>, <code>groupmod</code>, <code>groupdel</code>, <code>gpasswd</code>',
      priority: false,
      icon: '👪',
      bodyHTML: `
        <div class="code-block"><pre>sudo groupadd developers          # create a new group\nsudo groupmod -n newname oldname  # rename a group\nsudo groupdel developers          # delete a group</pre></div>
        <div class="info-box warning"><strong>⚠️ Can't delete a group</strong> that is still set as someone's <strong>primary</strong> group — change their primary group first.</div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Adding / removing a user from a group — two ways</h4>
        <div class="code-block"><pre>sudo usermod -aG developers testuser    # add via usermod\nsudo gpasswd -a testuser developers     # add via gpasswd\nsudo gpasswd -d testuser developers     # remove via gpasswd</pre></div>
        <div class="info-box tip"><strong>💡 Verify with the source, not a summary.</strong> <code>groups username</code> is a useful quick check, but when in doubt, check <code>/etc/group</code> directly: <div class="code-block" style="margin-top:0.5rem;"><pre>cat /etc/group | grep -E "developers|devteam"</pre></div><p style="margin-top:0.5rem;">This caught a real typo during practice — a command created a stray group called <code>sevelopers</code> instead of <code>developers</code>. Linux doesn't validate group names against what you "meant" — a typo in a group-creating command silently creates a brand new real group. Always double check with <code>/etc/group</code> if something looks off.</p></div>
      `
    },
    {
      id: 'passwd-command',
      title: '<code>passwd</code> — setting passwords',
      priority: false,
      icon: '🔑',
      bodyHTML: `
        <div class="code-block"><pre>sudo passwd testuser        # set or change testuser's password (as admin)\npasswd                      # change YOUR OWN password (no sudo needed)\nsudo passwd -l testuser     # lock the account (disable login)\nsudo passwd -u testuser     # unlock it\nsudo passwd -d testuser     # delete the password entirely (risky — no password required to log in)</pre></div>
        <div class="info-box note"><strong>📌 Note</strong> Typed characters don't show on screen when entering a password — that's normal, not a glitch.</div>
      `
    },
    {
      id: 'su-command',
      title: 'Switching users — <code>su</code> and <code>sudo -i</code>',
      priority: false,
      icon: '🔄',
      bodyHTML: `
        <p><code>su</code> stands for <strong>switch user</strong>.</p>
        <div class="code-block"><pre>su testuser           # switch to testuser, asks for THEIR password\nsu - testuser          # switch AND load their environment (home dir, shell config)\nexit                   # return to your previous user</pre></div>
        <div class="info-box warning"><strong>⚠️ The <code>-</code> matters.</strong> Without it, you keep your old environment but act as the new user. Always use <code>su - username</code>.</div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>sudo -i</code> and <code>sudo -u</code></h4>
        <div class="code-block"><pre>sudo -i                   # become root entirely, with root's own environment\nsudo -u testuser whoami   # run ONE command as testuser, then return immediately</pre></div>
        <div class="info-box tip"><strong>💡 <code>sudo -u</code></strong> is the one used most in real work — running a single command as someone else without fully switching sessions.</div>
        <div class="info-box note"><strong>📌 Container environments</strong> In a containerized environment like Codespaces, <code>su - user</code> may not behave exactly like a standard Linux server (e.g. <code>pwd</code> may not land in their home directory as expected). The command itself is correct — the container environment is the variable.</div>
      `
    },
    {
      id: 'quick-ref-section4',
      title: 'Quick reference — Users & Groups',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>What you want</th><th>Command</th></tr></thead>
            <tbody>
              <tr><td>Check your username</td><td><code>whoami</code></td></tr>
              <tr><td>Check UID/GID/groups</td><td><code>id</code></td></tr>
              <tr><td>Check group names only</td><td><code>groups</code></td></tr>
              <tr><td>Create user with home dir</td><td><code>sudo useradd -m -s /bin/bash username</code></td></tr>
              <tr><td>Add user to a group</td><td><code>sudo usermod -aG groupname username</code></td></tr>
              <tr><td>Delete user (keep home)</td><td><code>sudo userdel username</code></td></tr>
              <tr><td>Delete user + home dir</td><td><code>sudo userdel -r username</code></td></tr>
              <tr><td>Create a group</td><td><code>sudo groupadd groupname</code></td></tr>
              <tr><td>Rename a group</td><td><code>sudo groupmod -n newname oldname</code></td></tr>
              <tr><td>Delete a group</td><td><code>sudo groupdel groupname</code></td></tr>
              <tr><td>Add user to group (alt)</td><td><code>sudo gpasswd -a username groupname</code></td></tr>
              <tr><td>Remove user from group</td><td><code>sudo gpasswd -d username groupname</code></td></tr>
              <tr><td>Set/change a password</td><td><code>sudo passwd username</code></td></tr>
              <tr><td>Lock an account</td><td><code>sudo passwd -l username</code></td></tr>
              <tr><td>Switch user (full env)</td><td><code>su - username</code></td></tr>
              <tr><td>Run one command as another user</td><td><code>sudo -u username command</code></td></tr>
              <tr><td>Become root</td><td><code>sudo -i</code></td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'mental-models-section4',
      title: 'Key mental models — Users & Groups',
      priority: false,
      icon: '🧠',
      bodyHTML: `
        <div class="accordion-body-cards">
          <div class="mental-model-grid">
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🔐</span><span class="mental-title">Password Storage</span></div>
              <div class="mental-card-body"><strong><code>/etc/passwd</code></strong> stores user info, <strong>not</strong> passwords. <strong><code>/etc/shadow</code></strong> stores the real (hashed) passwords.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">👥</span><span class="mental-title">Primary vs Supplementary</span></div>
              <div class="mental-card-body">Every user has exactly <strong>one</strong> primary group and any number of supplementary groups.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">📦</span><span class="mental-title">Group Creation</span></div>
              <div class="mental-card-body">A group must exist (<code>groupadd</code>) before you can add anyone to it.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">⚠️</span><span class="mental-title">The <code>-a</code> Flag</span></div>
              <div class="mental-card-body"><code>usermod -aG</code> appends to groups. Leaving off <code>-a</code> replaces them entirely — a <strong>destructive mistake</strong>.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🐛</span><span class="mental-title">Silent Typos</span></div>
              <div class="mental-card-body">Typos in group names don't error — they silently create new, real groups. Verify against <code>/etc/group</code> when unsure.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🔄</span><span class="mental-title">Switching Users</span></div>
              <div class="mental-card-body"><code>su - username</code> (with the dash) loads the target user's full environment. Without it, you keep your own.</div>
            </div>
            <div class="mental-card mental-card-full">
              <div class="mental-card-header"><span class="mental-icon">⚡</span><span class="mental-title">Real‑World <code>sudo</code></span></div>
              <div class="mental-card-body"><code>sudo -u username command</code> runs a single command as someone else — the most common real-world use case.</div>
            </div>
          </div>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 5 — Processes
  // ============================================================

  const SECTION_5_ACCORDIONS = [
    {
      id: 'what-is-process',
      title: 'What is a process?',
      priority: false,
      icon: '⚙️',
      bodyHTML: `
        <p>Every time a command or program runs, Linux creates a <strong>process</strong> — a running instance of that program. Even the terminal itself is a process. Even <code>bash</code> is a process.</p>
        <p>Every process has:</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><strong>PID</strong> (Process ID)</td><td>A unique number assigned to that running process</td></tr>
              <tr><td><strong>PPID</strong> (Parent Process ID)</td><td>The PID of whatever process started it</td></tr>
            </tbody>
          </table>
        </div>
        <p>Processes form a tree, just like the filesystem. Every process has a parent, except the very first one started at boot.</p>
        <div class="code-block"><pre>bash (PID 500)\n  └── ls (PID 501, PPID 500)</pre></div>
        <p><code>bash</code> is the parent. <code>ls</code> is the child. Once <code>ls</code> finishes, it disappears — <code>bash</code> keeps running.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">PID 1 — the root of the tree</h4>
        <div class="code-block"><pre>ps -p 1\n# PID TTY TIME CMD\n# 1   ?   0:01 systemd</pre></div>
        <div class="info-box note"><strong>📌 PID 1</strong> is always the first process started by the kernel — <code>systemd</code> on modern Linux, <code>init</code> on older systems. Every other process is a child (or descendant) of PID 1.</div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Finding your own shell's PID</h4>
        <div class="code-block"><pre>echo $$            # $$ always holds the PID of your current shell\nps -p $$            # shows details about that one specific process</pre></div>
        <div class="code-block"><pre>PID TTY          TIME CMD\n1209 pts/0    00:00:00 bash</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Column</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>TTY</code></td><td>Which terminal session this process belongs to (<code>pts</code> = pseudo-terminal)</td></tr>
              <tr><td><code>TIME</code></td><td>Actual CPU time used — not how long the process has existed</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'viewing-processes',
      title: 'Viewing processes — <code>ps</code>, <code>top</code>, <code>htop</code>, <code>pstree</code>',
      priority: false,
      icon: '👁️',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;"><code>ps</code> — process status, a one-time snapshot</h4>
        <div class="code-block"><pre>ps              # processes in YOUR current terminal session only\nps -e           # EVERY process on the system\nps -ef          # every process, full detail (PPID, start time, etc.)\nps aux          # BSD-style — most commonly used in practice</pre></div>
        <p><code>ps aux</code> columns:</p>
        <div class="code-block"><pre>USER   PID  %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot     1   0.0  0.1  10000  2000 ?        Ss   10:00   0:01 /sbin/init</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Column</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>USER</code></td><td>Who owns the process</td></tr>
              <tr><td><code>PID</code></td><td>Process ID</td></tr>
              <tr><td><code>%CPU</code></td><td>CPU usage</td></tr>
              <tr><td><code>%MEM</code></td><td>Memory usage</td></tr>
              <tr><td><code>TTY</code></td><td>Terminal attached (<code>?</code> = none, runs in background)</td></tr>
              <tr><td><code>STAT</code></td><td>Process state</td></tr>
              <tr><td><code>COMMAND</code></td><td>What's actually running</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>top</code> — live, continuously updating view</h4>
        <div class="code-block"><pre>top</pre></div>
        <p>Refreshes every few seconds — watch CPU/memory usage change in real time.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Key (inside <code>top</code>)</th><th>Action</th></tr></thead>
            <tbody>
              <tr><td><code>q</code></td><td>Quit</td></tr>
              <tr><td><code>P</code></td><td>Sort by CPU usage</td></tr>
              <tr><td><code>M</code></td><td>Sort by memory usage</td></tr>
              <tr><td><code>k</code></td><td>Kill a process (asks for PID)</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>htop</code> — friendlier version of <code>top</code></h4>
        <p>Not installed by default on most systems. Color-coded, scrollable, easier to read.</p>
        <div class="code-block"><pre>sudo apt install htop -y\nhtop</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>pstree</code> — visual process tree</h4>
        <p>Shows the parent-child relationship of processes in a tree format.</p>
        <div class="code-block"><pre>pstree              # view the entire process tree\npstree -p           # with PIDs visible\npstree -p 1209      # show only your shell and its children</pre></div>
        <div class="code-block"><pre>systemd─┬─dockerd─┬─containerd─┬─containerd-shim─┬─python3\n        │          │            │                  └─sleep\n        │          │            └─11*[{containerd}]\n        │          └─6*[{dockerd}]\n        ├─sshd─┬─sshd───bash───pstree\n        │      └─2*[{sshd}]\n        └─systemd───(sd-pam)</pre></div>
        <div class="info-box tip"><strong>💡 <code>pstree</code></strong> shows exactly who started whom — the parent-child relationship is immediately visible. PID 1 (<code>systemd</code>) sits at the root.</div>
      `
    },
    {
      id: 'foreground-background',
      title: 'Foreground vs background processes',
      priority: false,
      icon: '🔄',
      bodyHTML: `
        <p>By default, a command runs in the <strong>foreground</strong> — it takes over the terminal until it finishes. A <strong>background</strong> process runs without blocking the terminal.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>&</code> — run in the background</h4>
        <div class="code-block"><pre>sleep 30 &\n# [1] 1234</pre></div>
        <p><code>[1]</code> is the job number (specific to this session). <code>1234</code> is the PID.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>jobs</code> — list background/paused processes in this session</h4>
        <div class="code-block"><pre>jobs\n# [1]+  Running    sleep 30 &</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>fg</code> — bring a job to the foreground</h4>
        <div class="code-block"><pre>fg            # most recent job\nfg %1         # specific job number</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>Ctrl+Z</code> — pause the current foreground process</h4>
        <p>Doesn't kill it — freezes it in place and returns control to the terminal.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>bg</code> — resume a paused job in the background</h4>
        <div class="code-block"><pre>sleep 60\n# Ctrl+Z\njobs\n# [1]+  Stopped    sleep 60\n\nbg\n# [1]+ sleep 60 &\n\njobs\n# [1]+  Running    sleep 60 &</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>nohup</code> — survive terminal exit</h4>
        <div class="code-block"><pre>nohup python3 script.py &                      # runs in background, survives terminal logout\nnohup python3 script.py > output.log 2>&1 &    # capture stdout and stderr too</pre></div>
        <div class="info-box note"><strong>📌 <code>nohup</code></strong> (no hangup) ignores the <code>SIGHUP</code> signal sent when a terminal closes. Combined with <code>&</code>, it's how long-lived processes keep running even after you log out.</div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Action</th><th>Key/Command</th></tr></thead>
            <tbody>
              <tr><td>Run in background</td><td><code>command &</code></td></tr>
              <tr><td>Pause foreground process</td><td><code>Ctrl+Z</code></td></tr>
              <tr><td>List jobs</td><td><code>jobs</code></td></tr>
              <tr><td>Resume in foreground</td><td><code>fg</code></td></tr>
              <tr><td>Resume in background</td><td><code>bg</code></td></tr>
              <tr><td>Run in background, survive logout</td><td><code>nohup command &</code></td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'killing-processes',
      title: 'Killing processes — <code>kill</code>, <code>kill -9</code>, <code>killall</code>, <code>pgrep</code>, <code>pkill</code>',
      priority: false,
      icon: '💀',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;"><code>kill</code> — send a signal to a process by PID</h4>
        <div class="code-block"><pre>kill 1234          # SIGTERM — polite request to terminate, allows cleanup\nkill -9 1234       # SIGKILL — force kill, immediate, no cleanup\nkill -l            # list all available signals</pre></div>
        <div class="info-box warning"><strong>⚠️ Always try plain <code>kill</code> first.</strong> Reach for <code>-9</code> only if the process refuses to die.</div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>killall</code> — kill by process name instead of PID</h4>
        <div class="code-block"><pre>killall sleep      # kill every process named "sleep"\nkillall -9 firefox # force kill every firefox process</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>pgrep</code> / <code>pkill</code> — find and kill by name pattern</h4>
        <p>More flexible than <code>killall</code> — can match partial names or full command lines.</p>
        <div class="code-block"><pre>pgrep -l sleep      # find all PIDs with "sleep" in the name, show names\npgrep -u codespace  # all processes owned by codespace\npkill sleep         # kill all processes named "sleep" (like killall)\npkill -f "python3 my_script.py"   # match against full command line</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Command</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td><code>pgrep name</code></td><td>Find PID(s) of processes matching name</td></tr>
              <tr><td><code>pkill name</code></td><td>Kill processes matching name</td></tr>
              <tr><td><code>pkill -f pattern</code></td><td>Match full command line (not just process name)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 <code>pkill -f</code></strong> is safer when several scripts are running — you can target <code>"python3 app.py"</code> without killing every Python process on the system.</div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Example</h4>
        <div class="code-block"><pre>sleep 120 &\nps aux | grep sleep\n# codespace  2048  ...  sleep 120\n# codespace  2055  ...  grep sleep     ← grep finds itself too, ignore\n\nkill 2048\n\nps aux | grep sleep\n# codespace  2061  ...  grep sleep     ← only grep remains, sleep is gone</pre></div>
      `
    },
    {
      id: 'process-states',
      title: 'Process states',
      priority: false,
      icon: '📊',
      bodyHTML: `
        <p>Shown in the <code>STAT</code> column of <code>ps aux</code> or <code>htop</code>.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>State</th><th>Symbol</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td>Running</td><td><code>R</code></td><td>Actively executing or ready to run</td></tr>
              <tr><td>Sleeping</td><td><code>S</code></td><td>Waiting for something (input, timer, resource)</td></tr>
              <tr><td>Stopped</td><td><code>T</code></td><td>Paused — e.g. via <code>Ctrl+Z</code></td></tr>
              <tr><td>Zombie</td><td><code>Z</code></td><td>Finished, but exit status not yet collected by parent</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box note"><strong>📌 A zombie</strong> isn't dangerous alone — it's a leftover entry awaiting cleanup. Large persistent numbers of zombies signal a bug in the parent program.</div>
      `
    },
    {
      id: 'nice-renice',
      title: '<code>nice</code> / <code>renice</code> — process priority',
      priority: false,
      icon: '🎯',
      bodyHTML: `
        <p>Linux decides how much CPU time to give a process based on <strong>niceness</strong>, ranging from <code>-20</code> (highest priority) to <code>19</code> (lowest priority). Default is <code>0</code>.</p>
        <div class="code-block"><pre>nice -n 10 some-command         # start a new process with lower priority\nrenice -n 5 -p 1234              # change niceness of an already-running process</pre></div>
        <div class="info-box tip"><strong>💡 Lower niceness = more selfish = higher priority.</strong> Higher niceness = "nicer" to other processes = lower priority. Rarely adjusted day-to-day, but explains the <code>NI</code> column seen in <code>ps</code>/<code>top</code>/<code>htop</code> output.</div>
      `
    },
    {
      id: 'quick-ref-section5',
      title: 'Quick reference — Processes',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>What you want</th><th>Command</th></tr></thead>
            <tbody>
              <tr><td>Find your shell's PID</td><td><code>echo $$</code></td></tr>
              <tr><td>Snapshot of your processes</td><td><code>ps</code></td></tr>
              <tr><td>Snapshot of all processes</td><td><code>ps aux</code></td></tr>
              <tr><td>Live view</td><td><code>top</code></td></tr>
              <tr><td>Live view (nicer)</td><td><code>htop</code></td></tr>
              <tr><td>Visual process tree</td><td><code>pstree</code></td></tr>
              <tr><td>Visual tree with PIDs</td><td><code>pstree -p</code></td></tr>
              <tr><td>Run in background</td><td><code>command &</code></td></tr>
              <tr><td>Pause foreground process</td><td><code>Ctrl+Z</code></td></tr>
              <tr><td>List background/paused jobs</td><td><code>jobs</code></td></tr>
              <tr><td>Resume in foreground</td><td><code>fg</code></td></tr>
              <tr><td>Resume in background</td><td><code>bg</code></td></tr>
              <tr><td>Run in background, survive logout</td><td><code>nohup command &</code></td></tr>
              <tr><td>Politely stop a process</td><td><code>kill PID</code></td></tr>
              <tr><td>Force-stop a process</td><td><code>kill -9 PID</code></td></tr>
              <tr><td>Kill by name</td><td><code>killall name</code></td></tr>
              <tr><td>Find process by name</td><td><code>pgrep name</code></td></tr>
              <tr><td>Kill by name pattern</td><td><code>pkill name</code></td></tr>
              <tr><td>Kill by full command line</td><td><code>pkill -f "command pattern"</code></td></tr>
              <tr><td>Adjust priority of new process</td><td><code>nice -n N command</code></td></tr>
              <tr><td>Adjust priority of running process</td><td><code>renice -n N -p PID</code></td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'mental-models-section5',
      title: 'Key mental models — Processes',
      priority: false,
      icon: '🧠',
      bodyHTML: `
        <div class="accordion-body-cards">
          <div class="mental-model-grid">
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🌳</span><span class="mental-title">Process Tree</span></div>
              <div class="mental-card-body">Every process has a <strong>PID</strong> and a <strong>PPID</strong> — processes form a tree. <strong>PID 1</strong> (<code>systemd</code>) is the root.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">👁️</span><span class="mental-title">Viewing Processes</span></div>
              <div class="mental-card-body"><code>ps</code> is a snapshot. <code>top</code>/<code>htop</code> are live views. <code>pstree</code> shows the family tree.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🔄</span><span class="mental-title">Background Jobs</span></div>
              <div class="mental-card-body"><code>&</code> sends a process to the background. <code>Ctrl+Z</code> pauses; <code>bg</code> resumes in the background.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">💀</span><span class="mental-title">Killing Processes</span></div>
              <div class="mental-card-body"><code>kill</code> asks nicely (SIGTERM). <code>kill -9</code> forces it (SIGKILL) — use only when necessary.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">📊</span><span class="mental-title">Process States</span></div>
              <div class="mental-card-body">States (<code>R</code>, <code>S</code>, <code>T</code>, <code>Z</code>) describe what a process is doing — visible in <code>STAT</code>.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🛡️</span><span class="mental-title">Surviving Logout</span></div>
              <div class="mental-card-body"><code>nohup</code> + <code>&</code> keeps a process running even after the terminal closes.</div>
            </div>
            <div class="mental-card mental-card-full">
              <div class="mental-card-header"><span class="mental-icon">🎯</span><span class="mental-title">Process Priority</span></div>
              <div class="mental-card-body">Niceness controls CPU priority: <strong>lower number = higher priority</strong>, higher number = lower priority.</div>
            </div>
          </div>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 6 — Package Management
  // ============================================================

  const SECTION_6_ACCORDIONS = [
    {
      id: 'what-is-package-management',
      title: 'What is package management?',
      priority: false,
      icon: '📦',
      bodyHTML: `
        <p>Every piece of software installed on Linux — <code>tree</code>, <code>htop</code>, <code>docker</code>, anything — is called a <strong>package</strong>. A package bundles the program itself, its dependencies (other software it needs to run), and instructions for where everything should go on the filesystem.</p>
        <p>Before package managers existed, installing software meant manually downloading files, compiling source code, and resolving dependencies by hand. A <strong>package manager</strong> automates all of that — it downloads, installs, updates, and removes software, and tracks what's installed so nothing gets left behind or duplicated.</p>
        <p>Different Linux distributions use different package managers:</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Distribution family</th><th>Package manager</th></tr></thead>
            <tbody>
              <tr><td>Debian, Ubuntu</td><td><code>apt</code></td></tr>
              <tr><td>Red Hat, Fedora, CentOS</td><td><code>dnf</code> / <code>yum</code></td></tr>
              <tr><td>Arch Linux</td><td><code>pacman</code></td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box note"><strong>📌 Codespaces</strong> runs Ubuntu, so <code>apt</code> is the one in use here.</div>
      `
    },
    {
      id: 'apt-command',
      title: '<code>apt</code> — the Debian/Ubuntu package manager',
      priority: false,
      icon: '🔧',
      bodyHTML: `
        <p><code>apt</code> stands for <strong>Advanced Package Tool</strong>.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>apt</code> vs <code>apt-get</code> vs <code>apt-cache</code></h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Command</th><th>Purpose</th><th>Recommendation</th></tr></thead>
            <tbody>
              <tr><td><code>apt</code></td><td>Modern, user-friendly interface for all package operations</td><td>✅ Use this</td></tr>
              <tr><td><code>apt-get</code></td><td>Older, lower-level, script-friendly</td><td>Legacy — avoid day-to-day</td></tr>
              <tr><td><code>apt-cache</code></td><td>Search/show without modifying</td><td>Legacy — <code>apt search</code> and <code>apt show</code> replace it</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 For day-to-day use</strong> <code>apt</code> replaces both <code>apt-get</code> and <code>apt-cache</code>. It's the one command to know.</div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Updating the package list</h4>
        <div class="code-block"><pre>sudo apt update</pre></div>
        <p>This does <strong>not</strong> install or upgrade anything — it refreshes <code>apt</code>'s local list of what packages exist and what versions are available, by checking the repositories. Always run this before installing something new.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Installing a package</h4>
        <div class="code-block"><pre>sudo apt install tree -y</pre></div>
        <p><code>-y</code> answers "yes" to confirmation prompts automatically.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Removing a package</h4>
        <div class="code-block"><pre>sudo apt remove tree        # removes the program, keeps its config files\nsudo apt purge tree         # removes the program AND its config files</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Upgrading packages</h4>
        <div class="code-block"><pre>sudo apt upgrade            # upgrade all installed packages to latest versions\nsudo apt upgrade tree       # upgrade one specific package</pre></div>
        <div class="info-box warning"><strong>⚠️ Two separate steps</strong> <code>apt update</code> refreshes the list of what's available. <code>apt upgrade</code> actually installs the newer versions. Easy to confuse!</div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>apt autoremove</code> — clean up dependencies</h4>
        <div class="code-block"><pre>sudo apt autoremove        # remove packages that were installed as dependencies\n                            # but are no longer needed by anything</pre></div>
        <div class="info-box tip"><strong>💡 When you <code>apt remove</code></strong> a package, its dependencies often remain installed. <code>autoremove</code> cleans them up automatically. Run it regularly to keep your system tidy.</div>
      `
    },
    {
      id: 'repositories',
      title: 'Where packages come from — repositories',
      priority: false,
      icon: '🌐',
      bodyHTML: `
        <p>A <strong>repository</strong> is a server that hosts packages (here meaning a package source — different from a Git repo). Ubuntu's official repositories are configured by default.</p>
        <p>On modern Ubuntu (24.04 "noble" and later), repo configuration has moved:</p>
        <div class="code-block"><pre>cat /etc/apt/sources.list                       # mostly empty now — just a pointer comment\ncat /etc/apt/sources.list.d/ubuntu.sources       # actual repo config, in deb822 format</pre></div>
        <div class="info-box note"><strong>📌 Older Ubuntu</strong> versions kept everything in a single <code>sources.list</code> file. If that file looks empty on a newer system, check the <code>.d/</code> directory.</div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Reading a repository line</h4>
        <div class="code-block"><pre>http://archive.ubuntu.com/ubuntu noble main amd64 Packages\n                                              │     │\n                                              │     └── component\n                                              └── release codename (noble = 24.04)</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Component</th><th>What it contains</th></tr></thead>
            <tbody>
              <tr><td><code>main</code></td><td>Officially supported, open-source software</td></tr>
              <tr><td><code>restricted</code></td><td>Officially supported, proprietary (e.g. drivers)</td></tr>
              <tr><td><code>universe</code></td><td>Community-maintained open-source software</td></tr>
              <tr><td><code>multiverse</code></td><td>Software with licensing restrictions</td></tr>
            </tbody>
          </table>
        </div>
        <p><code>noble-updates</code>, <code>noble-security</code>, <code>noble-backports</code> are the same release with different update channels — general updates, security patches, and newer software backported to the current version.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Adding third-party repositories (PPAs)</h4>
        <div class="code-block"><pre>sudo add-apt-repository ppa:nginx/stable    # add a Personal Package Archive\nsudo apt update\nsudo apt install nginx</pre></div>
        <div class="info-box warning"><strong>⚠️ PPAs</strong> (Personal Package Archives) are third-party repositories on Launchpad. Add them first, then <code>update</code>, then install. Be cautious — PPAs can conflict with official packages.</div>
      `
    },
    {
      id: 'searching-packages',
      title: 'Searching for and inspecting packages',
      priority: false,
      icon: '🔍',
      bodyHTML: `
        <div class="code-block"><pre>apt search docker              # search package names/descriptions\napt show docker.io             # detailed info — version, size, dependencies</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Checking what's installed</h4>
        <div class="code-block"><pre>apt list --installed                  # every installed package\napt list --installed | grep tree      # check if a specific one is installed\ndpkg -l | grep tree                   # alternative, lower-level way to check\napt list --upgradable                 # see exactly which packages have updates available</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>apt</code> history logs</h4>
        <div class="code-block"><pre>cat /var/log/apt/history.log         # see what was installed/removed and when\ncat /var/log/apt/term.log            # see the actual terminal output of apt operations</pre></div>
        <div class="info-box tip"><strong>💡 These logs</strong> are your audit trail — helpful when debugging or reviewing what changed on the system.</div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Finding where a package installed files</h4>
        <div class="code-block"><pre>which tree          # /usr/bin/tree — shows the executable path\nwhereis tree        # tree: /usr/bin/tree /usr/share/man/man1/tree.1.gz\ndpkg -L tree        # list EVERY file installed by the "tree" package</pre></div>
        <div class="info-box tip"><strong>💡 <code>dpkg -L</code></strong> shows the complete file list for a package — useful for seeing what was added to the system. Try it on a package you've installed.</div>
      `
    },
    {
      id: 'dpkg-snap',
      title: 'Other package tools — <code>dpkg</code> and <code>snap</code>',
      priority: false,
      icon: '🛠️',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Tool</th><th>Relationship to <code>apt</code></th></tr></thead>
            <tbody>
              <tr><td><code>dpkg</code></td><td>The lower-level tool <code>apt</code> is built on top of. Installs <code>.deb</code> files directly. <code>apt</code> is the friendly wrapper around it.</td></tr>
              <tr><td><code>snap</code></td><td>A separate, newer packaging system — bundles an app with all its dependencies in an isolated container, independent of <code>apt</code>. <code>sudo snap install &lt;name&gt;</code></td></tr>
            </tbody>
          </table>
        </div>
        <p><code>apt</code> covers nearly everything day to day — <code>dpkg</code> is rarely used directly.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Installing <code>.deb</code> files directly</h4>
        <div class="code-block"><pre>sudo dpkg -i package.deb            # install a .deb file directly\nsudo apt install -f                 # fix missing dependencies</pre></div>
        <div class="info-box warning"><strong>⚠️ <code>dpkg -i</code></strong> installs the <code>.deb</code>, but doesn't resolve dependencies automatically. Follow it with <code>apt install -f</code> to pull in any missing ones.</div>
      `
    },
    {
      id: 'quick-ref-section6',
      title: 'Quick reference — Package Management',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>What you want</th><th>Command</th></tr></thead>
            <tbody>
              <tr><td>Refresh package list</td><td><code>sudo apt update</code></td></tr>
              <tr><td>Install a package</td><td><code>sudo apt install name -y</code></td></tr>
              <tr><td>Remove a package (keep config)</td><td><code>sudo apt remove name</code></td></tr>
              <tr><td>Remove a package + config</td><td><code>sudo apt purge name</code></td></tr>
              <tr><td>Clean up unused dependencies</td><td><code>sudo apt autoremove</code></td></tr>
              <tr><td>Upgrade all packages</td><td><code>sudo apt upgrade</code></td></tr>
              <tr><td>Upgrade one package</td><td><code>sudo apt upgrade name</code></td></tr>
              <tr><td>Search for a package</td><td><code>apt search name</code></td></tr>
              <tr><td>Show package details</td><td><code>apt show name</code></td></tr>
              <tr><td>List installed packages</td><td><code>apt list --installed</code></td></tr>
              <tr><td>Check if installed</td><td><code>apt list --installed | grep name</code></td></tr>
              <tr><td>List upgradable packages</td><td><code>apt list --upgradable</code></td></tr>
              <tr><td>Add a PPA repository</td><td><code>sudo add-apt-repository ppa:name</code></td></tr>
              <tr><td>Install a <code>.deb</code> file</td><td><code>sudo dpkg -i package.deb</code></td></tr>
              <tr><td>Fix missing dependencies</td><td><code>sudo apt install -f</code></td></tr>
              <tr><td>View apt history</td><td><code>cat /var/log/apt/history.log</code></td></tr>
              <tr><td>Find executable path</td><td><code>which command</code></td></tr>
              <tr><td>Find all files from package</td><td><code>dpkg -L package</code></td></tr>
              <tr><td>Install via Snap</td><td><code>sudo snap install name</code></td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'mental-models-section6',
      title: 'Key mental models — Package Management',
      priority: false,
      icon: '🧠',
      bodyHTML: `
        <div class="accordion-body-cards">
          <div class="mental-model-grid">
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">📦</span><span class="mental-title">What is a Package?</span></div>
              <div class="mental-card-body">A package bundles a program with its dependencies and install instructions.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🔄</span><span class="mental-title">update vs upgrade</span></div>
              <div class="mental-card-body"><code>apt update</code> refreshes the list of what's available — it changes nothing on disk. <code>apt upgrade</code> actually installs newer versions.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">✅</span><span class="mental-title"><code>apt</code> is the One Command</span></div>
              <div class="mental-card-body"><code>apt</code> replaces <code>apt-get</code> and <code>apt-cache</code> for day-to-day use — it's the one command to know.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">📁</span><span class="mental-title">Modern Repo Location</span></div>
              <div class="mental-card-body">Repo config on modern Ubuntu lives in <code>/etc/apt/sources.list.d/ubuntu.sources</code>, not the old <code>sources.list</code>.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🗑️</span><span class="mental-title">remove vs purge</span></div>
              <div class="mental-card-body"><code>remove</code> keeps config files behind; <code>purge</code> removes everything.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🧹</span><span class="mental-title">autoremove</span></div>
              <div class="mental-card-body"><code>autoremove</code> cleans up orphaned dependencies — run it regularly.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🔧</span><span class="mental-title">dpkg is the Engine</span></div>
              <div class="mental-card-body"><code>dpkg</code> is the low-level engine; <code>apt</code> is the user-friendly layer on top of it.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">📦</span><span class="mental-title">Snap is Separate</span></div>
              <div class="mental-card-body"><code>snap</code> is a separate, sandboxed packaging system — independent of <code>apt</code>.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🔍</span><span class="mental-title">Exploring Packages</span></div>
              <div class="mental-card-body"><code>dpkg -L</code> shows every file a package installed — useful for exploring what's on your system.</div>
            </div>
            <div class="mental-card mental-card-full">
              <div class="mental-card-header"><span class="mental-icon">⚠️</span><span class="mental-title">PPA Caution</span></div>
              <div class="mental-card-body">PPAs give access to newer or third-party software, but use them cautiously — they can conflict with official packages.</div>
            </div>
          </div>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 7 — Networking Commands
  // ============================================================

  const SECTION_7_ACCORDIONS = [
    {
      id: 'checking-network-config',
      title: 'Checking network configuration — <code>ip addr</code>, <code>ip link</code>',
      priority: false,
      icon: '🔍',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;"><code>ip addr</code> — show IP addresses and interfaces</h4>
        <div class="code-block"><pre>ip addr\nip addr show eth0      # show one specific interface</pre></div>
        <div class="code-block"><pre>1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt;\n    link/loopback 00:00:00:00:00:00\n    inet 127.0.0.1/8\n\n2: eth0: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt;\n    link/ether ab:cd:ef:12:34:56\n    inet 10.0.2.15/24</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>lo</code></td><td>Loopback interface — the machine talking to itself. Always <code>127.0.0.1</code></td></tr>
              <tr><td><code>eth0</code></td><td>First Ethernet interface — your actual network connection</td></tr>
              <tr><td><code>inet</code></td><td>IPv4 address assigned to that interface</td></tr>
              <tr><td><code>/24</code></td><td>Subnet mask in CIDR notation</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>ip link</code> — show interface status only</h4>
        <div class="code-block"><pre>ip link\nip link show eth0</pre></div>
        <p>Shows whether each interface is <code>UP</code> or <code>DOWN</code> without IP address detail. Useful for quickly checking if a network interface is active.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Quick IP address — <code>hostname -I</code></h4>
        <div class="code-block"><pre>hostname -I               # show all IP addresses assigned to the machine</pre></div>
        <p>Quick way to see your machine's IP(s) without sifting through <code>ip addr</code> output.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">The old command — <code>ifconfig</code></h4>
        <div class="info-box note"><strong>📌 Replaced by <code>ip addr</code></strong> on modern Linux but still appears in older tutorials. Know it exists, prefer <code>ip addr</code>.</div>
      `
    },
    {
      id: 'routing-table',
      title: 'Viewing the routing table — <code>ip route</code>',
      priority: false,
      icon: '🗺️',
      bodyHTML: `
        <div class="code-block"><pre>ip route\nip route show default    # show default gateway only</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Field</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>default via</code></td><td>Your default gateway (where traffic goes by default)</td></tr>
              <tr><td><code>dev eth0</code></td><td>Which interface the route uses</td></tr>
              <tr><td><code>src</code></td><td>Source IP address used for outgoing traffic</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Why it matters</strong> Knowing your routing table is essential for understanding how traffic leaves your machine and diagnosing connectivity issues.</div>
      `
    },
    {
      id: 'arp-neighbour',
      title: 'ARP and neighbour tables — <code>arp</code>, <code>ip neigh</code>',
      priority: false,
      icon: '🔗',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;"><code>arp</code> — show IP → MAC mappings</h4>
        <div class="code-block"><pre>arp -n                    # show ARP table (IP → MAC mappings)\narp -d 192.168.1.1        # delete an ARP entry</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Field</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>Address</code></td><td>IP address</td></tr>
              <tr><td><code>HWaddress</code></td><td>MAC address</td></tr>
              <tr><td><code>Iface</code></td><td>Interface the device is on</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>ip neigh</code> — modern ARP replacement</h4>
        <div class="code-block"><pre>ip neigh                  # show neighbour table (ARP cache)\nip neigh flush dev eth0   # clear ARP cache on an interface</pre></div>
        <div class="info-box tip"><strong>💡 <code>ip neigh</code></strong> is the modern replacement for <code>arp</code>. It shows the same information but with more consistent syntax with other <code>ip</code> commands. ARP tables show which MAC addresses are associated with which IPs on your local network — essential for diagnosing layer 2 issues.</div>
      `
    },
    {
      id: 'ping-command',
      title: 'Testing connectivity — <code>ping</code>',
      priority: false,
      icon: '📡',
      bodyHTML: `
        <p><code>ping</code> sends a small packet to a target and measures whether a response comes back and how long it takes. Uses the <strong>ICMP</strong> (Internet Control Message Protocol) protocol.</p>
        <div class="code-block"><pre>ping google.com           # ping until Ctrl+C\nping -c 4 google.com      # send exactly 4 packets then stop\nping 127.0.0.1            # ping yourself — tests networking stack is alive\nping 8.8.8.8              # ping Google's DNS server by IP</pre></div>
        <div class="code-block"><pre>PING google.com (142.250.80.46): 56 bytes\n64 bytes from 142.250.80.46: icmp_seq=0 ttl=115 time=12.4 ms\n64 bytes from 142.250.80.46: icmp_seq=1 ttl=115 time=11.8 ms\n\n--- google.com ping statistics ---\n4 packets transmitted, 4 received, 0% packet loss</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Field</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>time=12.4 ms</code></td><td>Round-trip time — how long the packet took to go and return</td></tr>
              <tr><td><code>ttl=115</code></td><td>Time to Live — how many router hops the packet can survive</td></tr>
              <tr><td><code>0% packet loss</code></td><td>All packets arrived — connection is clean</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box warning"><strong>⚠️ <code>ping</code> failing doesn't always mean a host is down.</strong> Many servers and firewalls deliberately block ICMP to prevent network mapping. A non-response to <code>ping</code> is not conclusive.</div>
      `
    },
    {
      id: 'dns-lookups',
      title: 'DNS lookups — <code>dig</code>, <code>nslookup</code>, <code>whois</code>',
      priority: false,
      icon: '🌐',
      bodyHTML: `
        <p>These commands query DNS (Domain Name System) directly — resolving hostnames to IPs, checking what DNS servers return, and debugging DNS issues.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>dig</code> — the primary DNS lookup tool</h4>
        <div class="code-block"><pre>dig google.com                  # full DNS query output\ndig google.com +short           # just the IP address(es)\ndig google.com MX +short        # look up mail servers (MX records)\ndig google.com NS +short        # look up nameservers\ndig @8.8.8.8 google.com         # query a specific DNS server (Google's)</pre></div>
        <div class="code-block"><pre>;; ANSWER SECTION:\ngoogle.com.     300    IN    A    142.250.80.46\n\n;; Query time: 8 msec\n;; SERVER: 127.0.0.53#53</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Field</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>A</code></td><td>Record type — maps a hostname to an IPv4 address</td></tr>
              <tr><td><code>300</code></td><td>TTL in seconds — how long this answer can be cached</td></tr>
              <tr><td><code>SERVER</code></td><td>Which DNS server answered the query</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>nslookup</code> — simpler alternative</h4>
        <div class="code-block"><pre>nslookup google.com\nnslookup google.com 8.8.8.8     # query a specific DNS server</pre></div>
        <p><code>dig</code> gives more detail and control. <code>nslookup</code> is quicker for simple lookups. Both appear in the wild.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>whois</code> — domain ownership lookup</h4>
        <div class="code-block"><pre>whois example.com         # show domain registration info</pre></div>
        <div class="info-box tip"><strong>💡 Useful for</strong> investigating domain ownership and DNS troubleshooting.</div>
      `
    },
    {
      id: 'traceroute',
      title: 'Tracing routes — <code>traceroute</code>, <code>tracepath</code>',
      priority: false,
      icon: '🛤️',
      bodyHTML: `
        <p>Shows every router hop between you and a destination — the path a packet takes across the network.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;"><code>traceroute</code> — classic tool</h4>
        <div class="code-block"><pre>traceroute google.com</pre></div>
        <div class="code-block"><pre>1  10.0.2.1       0.5 ms   ← your default gateway (first hop)\n2  192.168.1.1    2.1 ms   ← your ISP's router\n3  *  *  *                  ← hop that doesn't respond (firewall)\n4  142.250.80.46  12.4 ms  ← destination</pre></div>
        <p>Each row is one router hop. <code>* * *</code> means that hop didn't respond — common, not always a problem.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>tracepath</code> — no root required</h4>
        <div class="code-block"><pre>tracepath google.com      # similar to traceroute, no root required</pre></div>
        <div class="info-box tip"><strong>💡 <code>tracepath</code></strong> doesn't require root privileges and is often available where <code>traceroute</code> isn't. Good fallback. Useful for diagnosing where a connection breaks down. If a server is unreachable, <code>tracepath</code>/<code>traceroute</code> shows how far packets actually get.</div>
      `
    },
    {
      id: 'ss-netstat',
      title: 'Checking connections & open ports — <code>ss</code>, <code>netstat</code>',
      priority: false,
      icon: '🔌',
      bodyHTML: `
        <p>These commands show active network connections and which ports are listening for incoming traffic.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;"><code>ss</code> — the modern tool</h4>
        <div class="code-block"><pre>ss -tuln\nss -tunlp                 # -p shows which process is using the port\nss -tun state established  # show only established connections</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Flag</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>-t</code></td><td>TCP connections</td></tr>
              <tr><td><code>-u</code></td><td>UDP connections</td></tr>
              <tr><td><code>-l</code></td><td>Listening sockets only</td></tr>
              <tr><td><code>-n</code></td><td>Show port numbers, not service names</td></tr>
              <tr><td><code>-p</code></td><td>Show process using the socket</td></tr>
            </tbody>
          </table>
        </div>
        <div class="code-block"><pre>Netid  State   Local Address:Port\ntcp    LISTEN  0.0.0.0:22         ← SSH listening on all interfaces (port 22)\ntcp    LISTEN  127.0.0.1:5432     ← PostgreSQL listening locally only</pre></div>
        <p><code>0.0.0.0</code> = accessible from outside. <code>127.0.0.1</code> = local only.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>netstat</code> — the older equivalent</h4>
        <div class="code-block"><pre>netstat -tuln     # same flags, same output style</pre></div>
        <div class="info-box note"><strong>📌 <code>ss</code></strong> is the modern replacement and is faster, but <code>netstat</code> still appears everywhere. Know both.</div>
      `
    },
    {
      id: 'curl-wget',
      title: 'Transferring data — <code>curl</code>, <code>wget</code>',
      priority: false,
      icon: '📥',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;"><code>curl</code> — transfer data to/from a URL</h4>
        <div class="code-block"><pre>curl https://example.com                                      # print page HTML to screen\ncurl -o file.html https://example.com                         # save output to a file\ncurl -I https://example.com                                   # show HTTP headers only\ncurl -X POST -d '{"key":"value"}' https://api.example.com    # send a POST request\ncurl -L https://example.com                                   # follow redirects\ncurl -H "Header: value" URL                                   # add custom headers\ncurl -s https://api.example                                   # silent mode\ncurl -v https://example.com                                   # verbose output (debugging)\ncurl --max-time 10 URL                                        # timeout after 10 seconds</pre></div>
        <p>The Swiss army knife of HTTP from the command line — used constantly for testing APIs, downloading files, and debugging web requests.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>wget</code> — download files</h4>
        <div class="code-block"><pre>wget https://example.com/file.zip                   # download a file\nwget -O output.zip https://example.com/file.zip     # download with a custom filename\nwget -q https://example.com/file.zip                # quiet mode, no progress output\nwget -r https://example.com                         # recursive download</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Tool</th><th>Best for</th></tr></thead>
            <tbody>
              <tr><td><code>curl</code></td><td>API testing, inspecting HTTP responses, sending data</td></tr>
              <tr><td><code>wget</code></td><td>Downloading files, recursive site downloads</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'ssh-command',
      title: 'SSH — connecting to remote machines',
      priority: false,
      icon: '🔑',
      bodyHTML: `
        <p><strong>SSH</strong> (Secure Shell) is how you connect to and control a remote Linux machine securely over a network.</p>
        <div class="code-block"><pre>ssh user@hostname            # connect to a remote machine\nssh user@192.168.1.10        # connect by IP address\nssh -p 2222 user@hostname    # connect on a non-standard port\nexit                         # disconnect from the remote session</pre></div>
        <p>On first connection, SSH asks you to confirm the remote machine's fingerprint — verifying the server's identity. Type <code>yes</code> to accept.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">SSH keys — the right way to authenticate</h4>
        <p>Passwords work but SSH keys are the standard in practice — more secure, no typing a password every time.</p>
        <div class="code-block"><pre>ssh-keygen -t ed25519 -C "your@email.com"    # generate a key pair\nssh-copy-id user@hostname                     # copy your public key to the remote server</pre></div>
        <p>Once the public key is on the server, SSH authenticates automatically.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Key files</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>File</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td><code>~/.ssh/id_ed25519</code></td><td>Your <strong>private</strong> key — never share this</td></tr>
              <tr><td><code>~/.ssh/id_ed25519.pub</code></td><td>Your <strong>public</strong> key — goes on remote servers</td></tr>
              <tr><td><code>~/.ssh/known_hosts</code></td><td>Fingerprints of servers you've connected to before</td></tr>
              <tr><td><code>~/.ssh/config</code></td><td>Shortcuts for SSH connections</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>~/.ssh/config</code> — connection shortcuts</h4>
        <div class="code-block"><pre>Host myserver\n    HostName 192.168.1.10\n    User codespace\n    Port 22\n    IdentityFile ~/.ssh/id_ed25519</pre></div>
        <p>With this saved, <code>ssh myserver</code> replaces the full command. Essential when managing multiple servers.</p>
      `
    },
    {
      id: 'network-service-management',
      title: 'Network service management — <code>systemctl</code>',
      priority: false,
      icon: '⚡',
      bodyHTML: `
        <p>When network changes don't take effect, restarting the networking service is often the solution.</p>
        <div class="code-block"><pre>systemctl restart networking    # restart networking service\nsystemctl status NetworkManager # check NetworkManager status</pre></div>
        <div class="info-box tip"><strong>💡 Quick fix</strong> If network changes aren't applied after editing config files, restarting the service usually resolves the issue.</div>
      `
    },
    {
      id: 'quick-ref-section7',
      title: 'Quick reference — Networking Commands',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>What you want</th><th>Command</th></tr></thead>
            <tbody>
              <tr><td>Show IP addresses</td><td><code>ip addr</code></td></tr>
              <tr><td>Show interface status</td><td><code>ip link</code></td></tr>
              <tr><td>Quick IP address(es)</td><td><code>hostname -I</code></td></tr>
              <tr><td>Show routing table</td><td><code>ip route</code></td></tr>
              <tr><td>Show default gateway</td><td><code>ip route show default</code></td></tr>
              <tr><td>Show ARP table</td><td><code>arp -n</code> or <code>ip neigh</code></td></tr>
              <tr><td>Clear ARP cache</td><td><code>ip neigh flush dev eth0</code></td></tr>
              <tr><td>Test connectivity</td><td><code>ping -c 4 hostname</code></td></tr>
              <tr><td>DNS lookup (full)</td><td><code>dig hostname</code></td></tr>
              <tr><td>DNS lookup (quick)</td><td><code>dig hostname +short</code></td></tr>
              <tr><td>Query specific DNS server</td><td><code>dig @8.8.8.8 hostname</code></td></tr>
              <tr><td>Domain ownership lookup</td><td><code>whois domain.com</code></td></tr>
              <tr><td>Trace route to host</td><td><code>traceroute hostname</code></td></tr>
              <tr><td>Trace route (no root)</td><td><code>tracepath hostname</code></td></tr>
              <tr><td>Show listening ports</td><td><code>ss -tuln</code></td></tr>
              <tr><td>Show listening ports + processes</td><td><code>ss -tulnp</code></td></tr>
              <tr><td>Show all connections</td><td><code>ss -tun</code></td></tr>
              <tr><td>Download/test URL</td><td><code>curl https://url</code></td></tr>
              <tr><td>Save HTTP response</td><td><code>curl -o file https://url</code></td></tr>
              <tr><td>Show HTTP headers only</td><td><code>curl -I https://url</code></td></tr>
              <tr><td>Follow redirects</td><td><code>curl -L https://url</code></td></tr>
              <tr><td>Download a file</td><td><code>wget https://url</code></td></tr>
              <tr><td>Connect via SSH</td><td><code>ssh user@hostname</code></td></tr>
              <tr><td>Generate SSH key pair</td><td><code>ssh-keygen -t ed25519</code></td></tr>
              <tr><td>Copy public key to server</td><td><code>ssh-copy-id user@hostname</code></td></tr>
              <tr><td>Restart networking service</td><td><code>systemctl restart networking</code></td></tr>
              <tr><td>Check NetworkManager status</td><td><code>systemctl status NetworkManager</code></td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'mental-models-section7',
      title: 'Key mental models — Networking Commands',
      priority: false,
      icon: '🧠',
      bodyHTML: `
        <div class="accordion-body-cards">
          <div class="mental-model-grid">
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">📡</span><span class="mental-title">IP & Interface Basics</span></div>
              <div class="mental-card-body"><code>ip addr</code> shows interfaces and IPs. <code>ip link</code> shows interface status only. <code>ifconfig</code> is the old equivalent. <code>hostname -I</code> gives quick IPs.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🗺️</span><span class="mental-title">Routing & ARP</span></div>
              <div class="mental-card-body"><code>ip route</code> shows where traffic goes. The default gateway is where all outbound traffic is sent. <code>arp</code>/<code>ip neigh</code> shows IP → MAC mappings for devices on your local network.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">📡</span><span class="mental-title">Testing Reachability</span></div>
              <div class="mental-card-body"><code>ping</code> tests reachability using ICMP — but a non-response doesn't prove a host is down. Firewalls block ICMP routinely.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🌐</span><span class="mental-title">DNS Debugging</span></div>
              <div class="mental-card-body"><code>dig</code> is the right tool for DNS debugging. <code>nslookup</code> is the simpler alternative. <code>whois</code> shows domain ownership.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🛤️</span><span class="mental-title">Tracing Paths</span></div>
              <div class="mental-card-body"><code>traceroute</code> shows the path packets take hop by hop — used to diagnose where connectivity breaks. <code>tracepath</code> is the no-root alternative.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🔌</span><span class="mental-title">Ports & Processes</span></div>
              <div class="mental-card-body"><code>ss -tuln</code> shows what's listening on which ports. <code>0.0.0.0</code> = external, <code>127.0.0.1</code> = local only. Add <code>-p</code> to see which process owns the port.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">📥</span><span class="mental-title">curl vs wget</span></div>
              <div class="mental-card-body"><code>curl</code> is for interacting with URLs and APIs. <code>wget</code> is for downloading files. <code>curl -v</code> is your best friend for debugging HTTP issues.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🔑</span><span class="mental-title">SSH Keys</span></div>
              <div class="mental-card-body">SSH keys are the standard authentication method — private key stays on your machine, public key goes on the server. <code>~/.ssh/config</code> saves you from typing long commands.</div>
            </div>
            <div class="mental-card mental-card-full">
              <div class="mental-card-header"><span class="mental-icon">⚡</span><span class="mental-title">Service Troubleshooting</span></div>
              <div class="mental-card-body">When network changes don't take effect, <code>systemctl restart networking</code> or <code>systemctl restart NetworkManager</code> often resolves the issue.</div>
            </div>
          </div>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 8 — Bash Scripting (FULLY ESCAPED)
  // ============================================================

  const SECTION_8_ACCORDIONS = [
    {
      id: 'what-is-shell-script',
      title: 'What is a shell script?',
      priority: false,
      icon: '📜',
      bodyHTML: `
        <p>A shell script is a plain text file containing a sequence of commands that bash executes in order — exactly as if you typed them one by one into the terminal. The power is automation: one file, run once, does the work of dozens of commands.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">The shebang line</h4>
        <p>Every bash script starts with this on line 1:</p>
        <div class="code-block"><pre>#!/bin/bash</pre></div>
        <p>The <strong>shebang</strong> (hashbang) tells the OS which interpreter to use. Without it, the OS doesn't know whether to hand the file to bash, Python, or something else.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Creating and running a script</h4>
        <div class="code-block"><pre>touch hello.sh</pre></div>
        <p>Inside the file:</p>
        <div class="code-block"><pre>#!/bin/bash\necho "Hello from a script"</pre></div>
        <div class="code-block"><pre>chmod +x hello.sh    # give execute permission\n./hello.sh           # run it</pre></div>
        <div class="info-box tip"><strong>💡 <code>./</code></strong> means "in the current directory." Linux doesn't look in the current directory for executables by default — only in directories listed in <code>\\$PATH</code>. The <code>./</code> prefix is required.</div>
      `
    },
    {
      id: 'script-safety',
      title: 'Script safety — <code>set -e</code>, <code>set -u</code>',
      priority: false,
      icon: '🛡️',
      bodyHTML: `
        <div class="code-block"><pre>#!/bin/bash\nset -e          # Exit immediately if any command fails\nset -u          # Exit if any undefined variable is used\nset -x          # Print each command before executing (debug mode)\n\n# Or combine them\nset -eux</pre></div>
        <p>These flags make scripts safer and more predictable. <code>set -e</code> prevents scripts from continuing after errors. <code>set -u</code> catches typos in variable names.</p>
      `
    },
    {
      id: 'variables-substitution',
      title: 'Variables and command substitution',
      priority: false,
      icon: '📦',
      bodyHTML: `
        <div class="code-block"><pre>name="Keith"\necho "Hello, \\$name"\necho "Hello, \${name}s"    # braces needed when variable is next to other text</pre></div>
        <p>Rules:</p>
        <ul style="padding-left:1.25rem;margin-bottom:0.75rem;">
          <li>No spaces around <code>=</code> — <code>name = "Keith"</code> fails</li>
          <li>Reference with <code>\\$</code> — <code>\\$name</code> or <code>\${name}</code></li>
        </ul>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Common built-in variables</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Variable</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>\\$HOME</code></td><td>Your home directory</td></tr>
              <tr><td><code>\\$USER</code></td><td>Current username</td></tr>
              <tr><td><code>\\$PWD</code></td><td>Current working directory</td></tr>
              <tr><td><code>\\$PATH</code></td><td>Directories searched for commands</td></tr>
              <tr><td><code>\\$\\$</code></td><td>PID of the current shell</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Parameter expansion — default values</h4>
        <div class="code-block"><pre># Use default value if variable is unset\necho \${name:-"default"}    # prints "default" if name is unset\n\n# Set variable to default if unset\necho \${name:="default"}    # sets name to "default" if unset</pre></div>
        <p>Useful for handling optional arguments with sensible defaults.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Command substitution</h4>
        <div class="code-block"><pre>today=\\$(date)\necho "Today is \\$today"\n\nfiles=\\$(ls | wc -l)\necho "There are \\$files files here"</pre></div>
        <p><code>\\$(command)</code> runs the command and captures its output as a string.</p>
      `
    },
    {
      id: 'arrays',
      title: 'Arrays',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <div class="code-block"><pre># Define array\nfruits=("apple" "banana" "mango")\n\n# Access elements\necho \${fruits[0]}        # apple\necho \${fruits[@]}        # all elements\necho \${#fruits[@]}       # array length\n\n# Loop through array\nfor fruit in "\${fruits[@]}"; do\n    echo "Fruit: \\$fruit"\ndone</pre></div>
        <p>Arrays are essential for handling lists of items in scripts.</p>
      `
    },
    {
      id: 'user-input',
      title: 'User input — <code>read</code>',
      priority: false,
      icon: '⌨️',
      bodyHTML: `
        <div class="code-block"><pre>echo "What is your name?"\nread name\necho "Hello, \\$name"</pre></div>
        <p>One-liner with a prompt:</p>
        <div class="code-block"><pre>read -p "Enter your name: " name</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Flag</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>-p</code></td><td>Show a prompt string before waiting</td></tr>
              <tr><td><code>-s</code></td><td>Silent mode — input not shown (for passwords)</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'conditionals',
      title: 'Conditionals — <code>if</code>, <code>elif</code>, <code>else</code>',
      priority: false,
      icon: '🔀',
      bodyHTML: `
        <div class="code-block"><pre>#!/bin/bash\nread -p "Enter a number: " num\n\nif [ \\$num -gt 10 ]; then\n    echo "Greater than 10"\nelif [ \\$num -eq 10 ]; then\n    echo "Exactly 10"\nelse\n    echo "Less than 10"\nfi</pre></div>
        <div class="info-box warning"><strong>⚠️ Spaces inside <code>[ ]</code> are required</strong> — <code>[ \\$num -gt 10 ]</code> works, <code>[\\$num -gt 10]</code> does not.</div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Numeric comparison operators</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Operator</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>-eq</code></td><td>equal</td></tr>
              <tr><td><code>-ne</code></td><td>not equal</td></tr>
              <tr><td><code>-gt</code></td><td>greater than</td></tr>
              <tr><td><code>-lt</code></td><td>less than</td></tr>
              <tr><td><code>-ge</code></td><td>greater than or equal</td></tr>
              <tr><td><code>-le</code></td><td>less than or equal</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">String comparison operators</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Operator</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>=</code></td><td>equal</td></tr>
              <tr><td><code>!=</code></td><td>not equal</td></tr>
              <tr><td><code>-z</code></td><td>string is empty</td></tr>
              <tr><td><code>-n</code></td><td>string is not empty</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">File test operators</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Operator</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>-f file</code></td><td>file exists and is a regular file</td></tr>
              <tr><td><code>-d dir</code></td><td>directory exists</td></tr>
              <tr><td><code>-e path</code></td><td>path exists (file or directory)</td></tr>
              <tr><td><code>-r file</code></td><td>file is readable</td></tr>
              <tr><td><code>-x file</code></td><td>file is executable</td></tr>
            </tbody>
          </table>
        </div>
        <div class="code-block"><pre>if [ -f /etc/hosts ]; then\n    echo "/etc/hosts exists"\nfi</pre></div>
      `
    },
    {
      id: 'case-statement',
      title: 'Case statements — multi-branch',
      priority: false,
      icon: '🔀',
      bodyHTML: `
        <div class="code-block"><pre>#!/bin/bash\nread -p "Enter a fruit: " fruit\n\ncase \\$fruit in\n    apple|Apple)\n        echo "🍎 Apple"\n        ;;\n    banana|Banana)\n        echo "🍌 Banana"\n        ;;\n    orange|Orange)\n        echo "🍊 Orange"\n        ;;\n    *)\n        echo "Unknown fruit"\n        ;;\nesac</pre></div>
        <p><code>case</code> is cleaner than multiple <code>if/elif</code> statements when checking many possible values.</p>
      `
    },
    {
      id: 'loops',
      title: 'Loops — <code>for</code>, <code>while</code>',
      priority: false,
      icon: '🔄',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;"><code>for</code> loop</h4>
        <div class="code-block"><pre># Loop over a list\nfor fruit in apple banana mango; do\n    echo "Fruit: \\$fruit"\ndone\n\n# Loop over files\nfor file in *.txt; do\n    echo "Found: \\$file"\ndone\n\n# Loop with a range\nfor i in {1..5}; do\n    echo "Number \\$i"\ndone\n\n# C-style loop\nfor ((i=0; i<5; i++)); do\n    echo "i is \\$i"\ndone</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>while</code> loop</h4>
        <div class="code-block"><pre>count=1\nwhile [ \\$count -le 5 ]; do\n    echo "Count: \\$count"\n    count=\\$((count + 1))\ndone</pre></div>
        <p><code>\\$((expression))</code> is arithmetic expansion — how you do math in bash.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Loop control</h4>
        <div class="code-block"><pre>break       # exit the loop entirely\ncontinue    # skip to the next iteration</pre></div>
      `
    },
    {
      id: 'functions',
      title: 'Functions',
      priority: false,
      icon: '🧩',
      bodyHTML: `
        <div class="code-block"><pre>#!/bin/bash\n\ngreet() {\n    echo "Hello, \\$1"\n}\n\ngreet "Keith"\ngreet "World"</pre></div>
        <p><code>\\$1</code> inside a function refers to the first argument passed to that function — not to the script's own arguments.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Returning data from a function</h4>
        <p>Bash functions don't return values like other languages — they return an exit code (0–255). To pass data back, use <code>echo</code> and capture with <code>\\$()</code>:</p>
        <div class="code-block"><pre>add() {\n    echo \\$(( \\$1 + \\$2 ))\n}\n\nresult=\\$(add 3 5)\necho "Result: \\$result"    # Result: 8</pre></div>
      `
    },
    {
      id: 'arguments',
      title: 'Arguments — <code>$0</code>, <code>$1</code>, <code>$@</code>, <code>$#</code>',
      priority: false,
      icon: '📎',
      bodyHTML: `
        <p>When called with arguments, bash makes them available automatically:</p>
        <div class="code-block"><pre>./script.sh hello world</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Variable</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td><code>\\$0</code></td><td>Script name (<code>./script.sh</code>)</td></tr>
              <tr><td><code>\\$1</code></td><td>First argument (<code>hello</code>)</td></tr>
              <tr><td><code>\\$2</code></td><td>Second argument (<code>world</code>)</td></tr>
              <tr><td><code>\\$@</code></td><td>All arguments as separate words</td></tr>
              <tr><td><code>\\$#</code></td><td>Number of arguments</td></tr>
            </tbody>
          </table>
        </div>
        <div class="code-block"><pre>#!/bin/bash\necho "Script name: \\$0"\necho "First arg:   \\$1"\necho "All args:    \\$@"\necho "Arg count:   \\$#"</pre></div>
      `
    },
    {
      id: 'exit-codes',
      title: 'Exit codes — <code>$?</code>',
      priority: false,
      icon: '🚦',
      bodyHTML: `
        <p>Every command exits with a code. <code>0</code> = success. Anything non-zero = failure.</p>
        <div class="code-block"><pre>ls /etc/hosts\necho \\$?        # 0 — success\n\nls /nonexistent\necho \\$?        # 2 — failure</pre></div>
        <p>Set your own exit code:</p>
        <div class="code-block"><pre>exit 0     # success\nexit 1     # failure (convention: 1 = general error)</pre></div>
        <p>Use in conditionals:</p>
        <div class="code-block"><pre>if ls /etc/hosts > /dev/null 2>&1; then\n    echo "File exists"\nelse\n    echo "File not found"\nfi</pre></div>
        <div class="info-box tip"><strong>💡 <code>> /dev/null 2>&1</code></strong> silences all output — redirects both stdout and stderr to <code>/dev/null</code>, Linux's bin for discarded output.</div>
      `
    },
    {
      id: 'command-chaining',
      title: 'Command chaining — <code>&amp;&amp;</code>, <code>||</code>',
      priority: false,
      icon: '⛓️',
      bodyHTML: `
        <div class="code-block"><pre># Run second command only if first succeeds\nmkdir newdir && cd newdir\n\n# Run second command only if first fails\ncommand || echo "Command failed"\n\n# Combine\ncommand1 && command2 || echo "Something went wrong"</pre></div>
        <p>Command chaining is used constantly in scripts and on the command line for conditional execution.</p>
      `
    },
    {
      id: 'here-documents',
      title: 'Here documents — multi-line text',
      priority: false,
      icon: '📝',
      bodyHTML: `
        <div class="code-block"><pre># Print multi-line text\ncat << EOF\nThis is a\nmulti-line\nmessage\nEOF\n\n# Use with variables\nname="Keith"\ncat << EOF\nHello \\$name,\nWelcome to the script.\nEOF</pre></div>
        <p>Here documents are perfect for printing help messages, generating configuration files, or creating multi-line output.</p>
      `
    },
    {
      id: 'trap-command',
      title: '<code>trap</code> — cleanup on exit',
      priority: false,
      icon: '🧹',
      bodyHTML: `
        <div class="code-block"><pre>#!/bin/bash\ncleanup() {\n    echo "Cleaning up temporary files..."\n    rm -f /tmp/tempfile.\\$\\$\n}\n\ntrap cleanup EXIT\n\n# Script runs here...\necho "Script running..."\ntouch /tmp/tempfile.\\$\\$</pre></div>
        <p><code>trap</code> ensures cleanup happens even if the script is interrupted or exits unexpectedly.</p>
      `
    },
    {
      id: 'select-menu',
      title: '<code>select</code> — menu selection',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <div class="code-block"><pre>#!/bin/bash\necho "Select an option:"\nselect choice in "Date" "Uptime" "Users" "Quit"; do\n    case \\$choice in\n        "Date") date ;;\n        "Uptime") uptime ;;\n        "Users") who ;;\n        "Quit") break ;;\n        *) echo "Invalid option" ;;\n    esac\ndone</pre></div>
        <p><code>select</code> creates interactive menus with numbered options automatically.</p>
      `
    },
    {
      id: 'common-mistakes',
      title: 'Common mistakes and debugging',
      priority: false,
      icon: '🐛',
      bodyHTML: `
        <div class="code-block"><pre># Common mistake: missing spaces in [ ]\nif [ "\\$name" = "Keith" ]; then   # Correct\nif ["\\$name" = "Keith"]; then     # Wrong — missing spaces\n\n# Debug with -x\nbash -x script.sh                # Run with debug mode\n\n# Check syntax without executing\nbash -n script.sh                # Syntax check only\n\n# Quote variables to prevent word splitting\nfile="my file.txt"\ncat "\\$file"                      # Correct\ncat \\$file                        # Wrong — tries to open "my" and "file.txt"</pre></div>
        <p>Debugging is an essential skill for script writers.</p>
      `
    },
    {
      id: 'practical-script-patterns',
      title: 'Practical script patterns',
      priority: false,
      icon: '🛠️',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">Validate input before acting</h4>
        <div class="code-block"><pre>#!/bin/bash\nfile="\\$1"\n\nif [ -z "\\$file" ]; then\n    echo "Usage: \\$0 <filename>"\n    exit 1\nfi\n\nif [ -f "\\$file" ]; then\n    echo "Processing \\$file"\nelse\n    echo "Error: \\$file not found"\n    exit 1\nfi</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Loop through command output</h4>
        <div class="code-block"><pre>#!/bin/bash\nfor user in \\$(cat /etc/passwd | cut -d: -f1); do\n    echo "User: \\$user"\ndone</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Simple backup script</h4>
        <div class="code-block"><pre>#!/bin/bash\nsource="\\$1"\nbackup="\${source}.bak"\n\ncp "\\$source" "\\$backup"\necho "Backed up \\$source to \\$backup"</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Interactive menu script</h4>
        <div class="code-block"><pre>#!/bin/bash\necho "Select an option:"\nselect choice in "Show Date" "Show Uptime" "Show Users" "Quit"; do\n    case \\$choice in\n        "Show Date") date ;;\n        "Show Uptime") uptime ;;\n        "Show Users") who ;;\n        "Quit") break ;;\n        *) echo "Invalid option" ;;\n    esac\ndone</pre></div>
      `
    },
    {
      id: 'quick-ref-section8',
      title: 'Quick reference — Bash Scripting',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>What you want</th><th>Syntax</th></tr></thead>
            <tbody>
              <tr><td>Script header</td><td><code>#!/bin/bash</code></td></tr>
              <tr><td>Script safety</td><td><code>set -eux</code></td></tr>
              <tr><td>Set a variable</td><td><code>name="value"</code></td></tr>
              <tr><td>Use a variable</td><td><code>\\$name</code> or <code>\${name}</code></td></tr>
              <tr><td>Default value</td><td><code>\${name:-"default"}</code></td></tr>
              <tr><td>Command substitution</td><td><code>result=\\$(command)</code></td></tr>
              <tr><td>Arithmetic</td><td><code>\\$((a + b))</code></td></tr>
              <tr><td>Read user input</td><td><code>read -p "prompt: " var</code></td></tr>
              <tr><td>If / elif / else</td><td><code>if [ condition ]; then ... elif ... else ... fi</code></td></tr>
              <tr><td>Case statement</td><td><code>case \\$var in pattern) ... ;; esac</code></td></tr>
              <tr><td>For loop (list)</td><td><code>for item in a b c; do ... done</code></td></tr>
              <tr><td>For loop (range)</td><td><code>for i in {1..5}; do ... done</code></td></tr>
              <tr><td>While loop</td><td><code>while [ condition ]; do ... done</code></td></tr>
              <tr><td>Define function</td><td><code>funcname() { ... }</code></td></tr>
              <tr><td>Call function</td><td><code>funcname arg1 arg2</code></td></tr>
              <tr><td>Script arguments</td><td><code>\\$0</code> <code>\\$1</code> <code>\\$2</code> <code>\\$@</code> <code>\\$#</code></td></tr>
              <tr><td>Last exit code</td><td><code>\\$?</code></td></tr>
              <tr><td>Exit script</td><td><code>exit 0</code> or <code>exit 1</code></td></tr>
              <tr><td>Silence output</td><td><code>command > /dev/null 2>&1</code></td></tr>
              <tr><td>Command chaining (and)</td><td><code>cmd1 && cmd2</code></td></tr>
              <tr><td>Command chaining (or)</td><td><code>cmd1 || cmd2</code></td></tr>
              <tr><td>File exists?</td><td><code>[ -f file ]</code></td></tr>
              <tr><td>Directory exists?</td><td><code>[ -d dir ]</code></td></tr>
              <tr><td>String empty?</td><td><code>[ -z "\\$var" ]</code></td></tr>
              <tr><td>Define array</td><td><code>arr=("a" "b" "c")</code></td></tr>
              <tr><td>Use array elements</td><td><code>\${arr[@]}</code></td></tr>
              <tr><td>Array length</td><td><code>\${#arr[@]}</code></td></tr>
              <tr><td>Multi-line text</td><td><code>cat << EOF ... EOF</code></td></tr>
              <tr><td>Cleanup on exit</td><td><code>trap function EXIT</code></td></tr>
              <tr><td>Debug mode</td><td><code>bash -x script.sh</code></td></tr>
              <tr><td>Syntax check</td><td><code>bash -n script.sh</code></td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'mental-models-section8',
      title: 'Key mental models — Bash Scripting',
      priority: false,
      icon: '🧠',
      bodyHTML: `
        <div class="accordion-body-cards">
          <div class="mental-model-grid">
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">📜</span><span class="mental-title">Scripts are commands</span></div>
              <div class="mental-card-body">A script is just commands in a file. The shebang tells the OS which interpreter to run them with.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">📦</span><span class="mental-title">Variables</span></div>
              <div class="mental-card-body">No spaces around <code>=</code> when setting variables. Always use <code>\\$</code> to read them. Quote variables to prevent word splitting.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🔄</span><span class="mental-title">Command substitution</span></div>
              <div class="mental-card-body"><code>\\$(command)</code> captures command output into a variable — this is how scripts compose operations.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🔀</span><span class="mental-title">Test expressions</span></div>
              <div class="mental-card-body"><code>[ ]</code> test expressions require spaces inside the brackets. Missing a space = syntax error.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🧩</span><span class="mental-title">Functions</span></div>
              <div class="mental-card-body">Bash functions return exit codes, not values. Use <code>echo</code> + <code>\\$()</code> to pass data back from a function.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">📎</span><span class="mental-title">Arguments</span></div>
              <div class="mental-card-body"><code>\\$1</code>, <code>\\$2</code>, <code>\\$@</code>, <code>\\$#</code> are the gateway to making reusable scripts — always validate input first.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🚦</span><span class="mental-title">Exit codes</span></div>
              <div class="mental-card-body"><code>\\$?</code> is how you know if the last command succeeded. <code>0</code> = success, non-zero = failure. <code>exit 1</code> stops the script and signals failure.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🛡️</span><span class="mental-title">Script safety</span></div>
              <div class="mental-card-body"><code>set -e</code> and <code>set -u</code> make scripts safer by stopping on errors and catching undefined variables.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">⛓️</span><span class="mental-title">Command chaining</span></div>
              <div class="mental-card-body"><code>&amp;&amp;</code> and <code>||</code> are essential for conditional command execution — <code>&amp;&amp;</code> runs on success, <code>||</code> runs on failure.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🧹</span><span class="mental-title">Cleanup with trap</span></div>
              <div class="mental-card-body"><code>trap</code> ensures cleanup happens even when scripts exit unexpectedly.</div>
            </div>
            <div class="mental-card mental-card-full">
              <div class="mental-card-header"><span class="mental-icon">📋</span><span class="mental-title">Arrays &amp; Case</span></div>
              <div class="mental-card-body">Arrays and case statements make scripts more powerful and maintainable for complex logic.</div>
            </div>
          </div>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 9 — Systemd & Services
  // ============================================================

  const SECTION_9_ACCORDIONS = [
    {
      id: 'what-is-systemd',
      title: 'What is systemd?',
      priority: false,
      icon: '⚙️',
      bodyHTML: `
        <p>When the Linux kernel finishes booting, the first process it starts is <strong>PID 1</strong>. On modern Linux, PID 1 is <strong>systemd</strong>. Everything that follows — starting services, mounting filesystems, setting up networking — is orchestrated by systemd.</p>
        <><p>systemd manages <strong>units</strong> — its name for any resource it knows how to manage. The most common unit type is a <strong>service</strong> (a background process), but units can also represent mount points, timers, sockets, and more.</p><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Unit file locations</h4><div class="table-wrapper">
            <table class="data-table">
              <thead><tr><th>Path</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td><code>/lib/systemd/system/</code></td><td>Default unit files installed by packages</td></tr>
                <tr><td><code>/etc/systemd/system/</code></td><td>Your overrides and custom units — takes precedence</td></tr>
              </tbody>
            </table>
          </div></>
      `
    },
    {
      id: 'service-management',
      title: 'Service management — <code>systemctl</code>',
      priority: false,
      icon: '▶️',
      bodyHTML: `
        <p><code>systemctl</code> is the command used to interact with systemd.</p>
        <><div class="code-block"><pre>sudo systemctl start nginx        # start a service now\nsudo systemctl stop nginx         # stop a service now\nsudo systemctl restart nginx      # stop then start\nsudo systemctl reload nginx       # reload config without stopping (if supported)\nsudo systemctl status nginx       # show current state and recent logs</pre></div><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Reading <code>systemctl status</code> output</h4><div class="code-block"><pre>● nginx.service - A high performance web server\n    Loaded: loaded (/lib/systemd/system/nginx.service; enabled)\n    Active: active (running) since Mon 2025-06-09 10:00:00 UTC\n  Main PID: 1234 (nginx)</pre></div><div class="table-wrapper">
            <table class="data-table">
              <thead><tr><th>Field</th><th>Meaning</th></tr></thead>
              <tbody>
                <tr><td><code>Loaded</code></td><td>Whether the unit file was found and parsed</td></tr>
                <tr><td><code>Active: active (running)</code></td><td>Service is currently running</td></tr>
                <tr><td><code>Active: inactive (dead)</code></td><td>Service is not running</td></tr>
                <tr><td><code>Active: failed</code></td><td>Service tried to start but crashed</td></tr>
                <tr><td><code>enabled</code></td><td>Will start automatically at boot</td></tr>
                <tr><td><code>disabled</code></td><td>Will not start at boot</td></tr>
              </tbody>
            </table>
          </div></>
      `
    },
    {
      id: 'enabling-disabling',
      title: 'Enabling & disabling at boot',
      priority: false,
      icon: '🔁',
      bodyHTML: `
        <p><code>systemctl start</code> only lasts until the next reboot. To make a service persistent across reboots:</p>
        <><div class="code-block"><pre>sudo systemctl enable nginx           # start automatically at boot\nsudo systemctl disable nginx          # remove from boot sequence\nsudo systemctl enable --now nginx     # enable AND start immediately in one step\nsudo systemctl is-enabled nginx       # check if set to start at boot\nsudo systemctl is-active nginx        # check if currently running</pre></div><div class="info-box tip"><strong>💡 <code>enable</code> and <code>start</code> are separate operations.</strong> A service can be enabled (starts at boot) but currently stopped, or started now but not enabled (won't survive a reboot). Use <code>enable --now</code> to do both at once.</div></>
      `
    },
    {
      id: 'masking-unmasking',
      title: 'Masking & unmasking — preventing accidental starts',
      priority: false,
      icon: '🚫',
      bodyHTML: `
        <p>Masking is stronger than disabling — it symlinks the unit to <code>/dev/null</code>, preventing it from starting even manually.</p>
        <><div class="code-block"><pre>sudo systemctl mask nginx       # prevent from ever starting (even manually)\nsudo systemctl unmask nginx     # undo the mask</pre></div><div class="info-box tip"><strong>💡 Useful for</strong> preventing services from starting accidentally, especially when troubleshooting conflicting services.</div></>
      `
    },
    {
      id: 'viewing-editing-unit-files',
      title: 'Viewing and editing unit files — <code>cat</code>, <code>edit</code>, <code>show</code>',
      priority: false,
      icon: '📄',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;"><code>systemctl cat</code> — view the effective unit file</h4>
        <><div class="code-block"><pre>systemctl cat nginx             # show the unit file systemd is actually using</pre></div><p>Shows you the effective unit file after all overrides are applied.</p><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>systemctl edit</code> — safe way to override unit files</h4><div class="code-block"><pre>sudo systemctl edit nginx       # create an override file in /etc/systemd/system/\nsudo systemctl edit --full nginx # edit the full unit file</pre></div><div class="info-box tip"><strong>💡 Instead of copying</strong> the entire unit file, <code>systemctl edit</code> creates a small drop-in override. Safer and cleaner for customizations.</div><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>systemctl show</code> — view all unit properties</h4><div class="code-block"><pre>systemctl show nginx            # show ALL properties of a unit\nsystemctl show nginx -p LoadState # show one specific property</pre></div><div class="info-box tip"><strong>💡 When debugging</strong> <code>systemctl show</code> exposes every detail systemd knows about a unit — useful for troubleshooting.</div></>
      `
    },
    {
      id: 'listing-units',
      title: 'Listing and inspecting units',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <div class="code-block"><pre>systemctl list-units                        # all currently loaded units\nsystemctl list-units --type=service         # only services\nsystemctl list-units --state=failed         # only failed units\nsystemctl list-unit-files --type=service    # all service unit files with enabled/disabled status</pre></div>
      `
    },
    {
      id: 'journalctl',
      title: 'Viewing logs — <code>journalctl</code>',
      priority: false,
      icon: '📜',
      bodyHTML: `
        <p>systemd captures log output from every managed service into a centralised binary log called the <strong>journal</strong>. <code>journalctl</code> is how you read it.</p>
        <><div class="code-block"><pre>journalctl                          # all logs (oldest first)\njournalctl -r                       # reverse — newest first\njournalctl -n 50                    # last 50 lines\njournalctl -f                       # follow — live updates (like tail -f)\njournalctl -u nginx                 # logs for one specific service\njournalctl -u nginx -f              # follow logs for one service\njournalctl --since "1 hour ago"     # logs from the last hour\njournalctl --since "2025-06-09"     # logs from a specific date\njournalctl -p err                   # only error-level messages\njournalctl -b                       # logs from the current boot only\njournalctl -b -1                    # logs from the previous boot\njournalctl -u nginx -e              # jump to the end of the log\njournalctl -u nginx --since today   # logs from today only\njournalctl -u nginx -o json         # output as JSON (useful for parsing)\njournalctl --disk-usage             # show how much space logs are using\njournalctl --vacuum-size=100M       # reduce log size to 100MB</pre></div><div class="info-box tip"><strong>💡 <code>journalctl -u servicename -f</code></strong> is the main debugging tool when a service fails or behaves unexpectedly — watch logs in real time as you restart the service.</div></>
      `
    },
    {
      id: 'writing-unit-file',
      title: 'Writing a basic unit file',
      priority: false,
      icon: '📝',
      bodyHTML: `
        <p>A unit file is a plain text config file that tells systemd how to manage a service. Minimal working example:</p>
        <><div class="code-block"><pre>[Unit]\nDescription=My simple script\nAfter=network.target\n\n[Service]\nExecStart=/usr/local/bin/my-script.sh\nRestart=on-failure\nUser=codespace\n\n[Install]\nWantedBy=multi-user.target</pre></div><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Section by section</h4><p><strong><code>[Unit]</code></strong> — metadata and dependencies</p><ul style="padding-left:1.25rem;margin-bottom:0.5rem;">
            <li><code>Description</code> — human-readable name shown in <code>systemctl status</code></li>
            <li><code>After</code> — start only after this unit is ready (ordering, not a hard dependency)</li>
          </ul><p><strong><code>[Service]</code></strong> — how to run the service</p><ul style="padding-left:1.25rem;margin-bottom:0.5rem;">
              <li><code>ExecStart</code> — full command to run (must be an absolute path)</li>
              <li><code>Restart</code> — when to auto-restart (<code>on-failure</code>, <code>always</code>, <code>never</code>)</li>
              <li><code>User</code> — which user account to run the process as</li>
            </ul><p><strong><code>[Install]</code></strong> — when to activate at boot</p><ul style="padding-left:1.25rem;margin-bottom:0.5rem;">
              <li><code>WantedBy=multi-user.target</code> — standard for most server services</li>
            </ul><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Deploying a custom unit file</h4><div class="code-block"><pre>sudo cp my-script.service /etc/systemd/system/\nsudo systemctl daemon-reload          # tell systemd to re-read unit files\nsudo systemctl enable --now my-script\nsudo systemctl status my-script</pre></div><div class="info-box warning"><strong>⚠️ Always run <code>daemon-reload</code></strong> after creating or editing a unit file — systemd does not pick up file changes automatically.</div></>
      `
    },
    {
      id: 'timers',
      title: 'Timers — systemd\'s cron replacement',
      priority: false,
      icon: '⏰',
      bodyHTML: `
        <p>Systemd timers are replacing cron on modern Linux distributions. They're more flexible and integrated with systemd's logging.</p>
        <><div class="code-block"><pre>systemctl list-timers           # list all active timers</pre></div><p>Basic timer unit example:</p><div class="code-block"><pre>[Unit]\nDescription=Run backup daily\n\n[Timer]\nOnCalendar=daily\nPersistent=true\n\n[Install]\nWantedBy=timers.target</pre></div><div class="info-box tip"><strong>💡 Timers</strong> can trigger services at specific times, intervals, or calendar events — with more flexibility than cron.</div></>
      `
    },
    {
      id: 'targets',
      title: 'Targets — systemd\'s runlevels',
      priority: false,
      icon: '🎯',
      bodyHTML: `
        <p>A <strong>target</strong> is a group of units that together represent a system state. They replace the concept of runlevels from older Unix systems.</p>
        <><div class="table-wrapper">
            <table class="data-table">
              <thead><tr><th>Target</th><th>Meaning</th></tr></thead>
              <tbody>
                <tr><td><code>poweroff.target</code></td><td>System off</td></tr>
                <tr><td><code>rescue.target</code></td><td>Single-user emergency mode</td></tr>
                <tr><td><code>multi-user.target</code></td><td>Full multi-user, no GUI — standard for servers</td></tr>
                <tr><td><code>graphical.target</code></td><td>Multi-user with desktop GUI</td></tr>
                <tr><td><code>reboot.target</code></td><td>Reboot</td></tr>
              </tbody>
            </table>
          </div><div class="code-block"><pre>systemctl get-default                         # see the default boot target\nsudo systemctl set-default multi-user.target  # boot without GUI (server mode)\nsudo systemctl isolate rescue.target          # switch to rescue mode now</pre></div><div class="info-box note"><strong>📌 <code>WantedBy=multi-user.target</code></strong> in your unit file means: "add me to the boot sequence when <code>multi-user.target</code> is activated" — which is every normal server boot.</div></>
      `
    },
    {
      id: 'system-control',
      title: 'System control — <code>reboot</code>, <code>poweroff</code>, <code>suspend</code>',
      priority: false,
      icon: '🔌',
      bodyHTML: `
        <p>These are the proper systemd commands for system control.</p>
        <><div class="code-block"><pre>sudo systemctl reboot           # reboot the system\nsudo systemctl poweroff         # power off\nsudo systemctl suspend          # suspend to RAM</pre></div><div class="info-box tip"><strong>💡 Use these instead of</strong> the legacy <code>shutdown</code>, <code>reboot</code>, and <code>poweroff</code> commands for proper systemd integration.</div></>
      `
    },
    {
      id: 'boot-performance',
      title: 'Boot performance — <code>systemd-analyze</code>',
      priority: false,
      icon: '⚡',
      bodyHTML: `
        <p>Essential for optimizing boot times on servers.</p>
        <><div class="code-block"><pre>systemd-analyze                 # show boot time\nsystemd-analyze blame           # show which services take the longest to start\nsystemd-analyze critical-chain  # show the critical startup path</pre></div><div class="info-box tip"><strong>💡 <code>systemd-analyze blame</code></strong> is your go-to command when troubleshooting slow boot times — it shows exactly which services are the culprits.</div></>
      `
    },
    {
      id: 'quick-ref-section9',
      title: 'Quick reference — systemd & Services',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>What you want</th><th>Command</th></tr></thead>
            <tbody>
              <tr><td>Start a service</td><td><code>sudo systemctl start name</code></td></tr>
              <tr><td>Stop a service</td><td><code>sudo systemctl stop name</code></td></tr>
              <tr><td>Restart a service</td><td><code>sudo systemctl restart name</code></td></tr>
              <tr><td>Reload config (no stop)</td><td><code>sudo systemctl reload name</code></td></tr>
              <tr><td>Check service status</td><td><code>systemctl status name</code></td></tr>
              <tr><td>Enable at boot</td><td><code>sudo systemctl enable name</code></td></tr>
              <tr><td>Disable at boot</td><td><code>sudo systemctl disable name</code></td></tr>
              <tr><td>Enable + start now</td><td><code>sudo systemctl enable --now name</code></td></tr>
              <tr><td>Mask a service</td><td><code>sudo systemctl mask name</code></td></tr>
              <tr><td>Unmask a service</td><td><code>sudo systemctl unmask name</code></td></tr>
              <tr><td>Check if enabled</td><td><code>systemctl is-enabled name</code></td></tr>
              <tr><td>Check if running</td><td><code>systemctl is-active name</code></td></tr>
              <tr><td>View unit file</td><td><code>systemctl cat name</code></td></tr>
              <tr><td>Edit unit override</td><td><code>sudo systemctl edit name</code></td></tr>
              <tr><td>List all services</td><td><code>systemctl list-units --type=service</code></td></tr>
              <tr><td>List failed units</td><td><code>systemctl list-units --state=failed</code></td></tr>
              <tr><td>View all logs</td><td><code>journalctl</code></td></tr>
              <tr><td>View service logs</td><td><code>journalctl -u name</code></td></tr>
              <tr><td>Follow service logs</td><td><code>journalctl -u name -f</code></td></tr>
              <tr><td>Last 50 log lines</td><td><code>journalctl -n 50</code></td></tr>
              <tr><td>Logs from this boot</td><td><code>journalctl -b</code></td></tr>
              <tr><td>Error logs only</td><td><code>journalctl -p err</code></td></tr>
              <tr><td>Log disk usage</td><td><code>journalctl --disk-usage</code></td></tr>
              <tr><td>Reload unit files</td><td><code>sudo systemctl daemon-reload</code></td></tr>
              <tr><td>Get default target</td><td><code>systemctl get-default</code></td></tr>
              <tr><td>List timers</td><td><code>systemctl list-timers</code></td></tr>
              <tr><td>Show boot time</td><td><code>systemd-analyze</code></td></tr>
              <tr><td>Show slow services</td><td><code>systemd-analyze blame</code></td></tr>
              <tr><td>Reboot system</td><td><code>sudo systemctl reboot</code></td></tr>
              <tr><td>Power off system</td><td><code>sudo systemctl poweroff</code></td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'mental-models-section9',
      title: 'Key mental models — systemd & Services',
      priority: false,
      icon: '🧠',
      bodyHTML: `
        <div class="accordion-body-cards">
          <div class="mental-model-grid">
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">⚙️</span><span class="mental-title">PID 1</span></div>
              <div class="mental-card-body">systemd is PID 1 — the root of everything after the kernel hands off control.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">📦</span><span class="mental-title">Units</span></div>
              <div class="mental-card-body">A unit is anything systemd manages — services, mounts, timers, sockets. The service unit is the most common.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🔁</span><span class="mental-title">start vs enable</span></div>
              <div class="mental-card-body"><code>start</code>/<code>stop</code> affects right now. <code>enable</code>/<code>disable</code> affects boot. They are independent — use <code>enable --now</code> to do both.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">📁</span><span class="mental-title">Unit file paths</span></div>
              <div class="mental-card-body">Unit files in <code>/etc/systemd/system/</code> override those in <code>/lib/systemd/system/</code>. Always put custom files in <code>/etc/</code>.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🔄</span><span class="mental-title">daemon-reload</span></div>
              <div class="mental-card-body">After editing any unit file, always run <code>daemon-reload</code> before restarting the service.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">📜</span><span class="mental-title">The Journal</span></div>
              <div class="mental-card-body">The journal is systemd's centralised log. <code>journalctl -u name -f</code> is your first stop when a service misbehaves.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🎯</span><span class="mental-title">multi-user.target</span></div>
              <div class="mental-card-body"><code>multi-user.target</code> is the standard boot target for servers — no GUI, full networking, all services.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🚫</span><span class="mental-title">Masking</span></div>
              <div class="mental-card-body">Masking a unit (<code>systemctl mask</code>) is stronger than disabling — it prevents the service from starting even manually.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">✏️</span><span class="mental-title">systemctl edit</span></div>
              <div class="mental-card-body"><code>systemctl edit</code> is the safe way to override unit files — it creates drop-ins instead of copying the whole file.</div>
            </div>
            <div class="mental-card mental-card-full">
              <div class="mental-card-header"><span class="mental-icon">⏰</span><span class="mental-title">Timers</span></div>
              <div class="mental-card-body">Timers are systemd's answer to cron — more flexible, integrated with logging, and easier to manage.</div>
            </div>
          </div>
        </div>
      `
    }
  ];
  
  // ============================================================
  // SECTION 10 — Text Processing (grep/sed/awk/pipes)
  // ============================================================

  const SECTION_10_ACCORDIONS = [
    {
      id: 'pipes',
      title: 'Pipes — <code>|</code>',
      priority: false,
      icon: '🔗',
      bodyHTML: `
        <p>A <strong>pipe</strong> takes the output of one command and feeds it directly as input to the next — no intermediate files needed.</p>
        <><div class="code-block"><pre>command1 | command2 | command3</pre></div><p>Data flows left to right. Each command does one thing; pipes chain them together into a pipeline.</p><div class="code-block"><pre>ls /etc | wc -l              # count how many entries are in /etc\ncat /etc/passwd | grep root  # find root-related lines in passwd\nps aux | sort -k3 -rn        # list processes sorted by CPU usage</pre></div><div class="info-box tip"><strong>💡 The Unix philosophy:</strong> small tools that each do one thing well, combined through pipes to do something powerful.</div></>
      `
    },
    {
      id: 'grep-command',
      title: '<code>grep</code> — searching text',
      priority: false,
      icon: '🔍',
      bodyHTML: `
        <p><code>grep</code> searches for a pattern in text and prints matching lines.</p>
        <><div class="code-block"><pre>grep "root" /etc/passwd              # lines containing "root"\ngrep -i "root" /etc/passwd           # case-insensitive\ngrep -v "root" /etc/passwd           # invert — lines NOT containing "root"\ngrep -n "root" /etc/passwd           # show line numbers\ngrep -r "root" /etc/                 # recursive — search all files in /etc\ngrep -l "root" /etc/*                # only show filenames, not matching lines\ngrep -c "root" /etc/passwd           # count matching lines\ngrep -E "root|sudo" /etc/passwd      # extended regex — match root OR sudo\ngrep "^root" /etc/passwd             # lines starting with "root"\ngrep "bash$" /etc/passwd             # lines ending with "bash"\ngrep -q "pattern" file.txt           # quiet mode — no output (for scripts)</pre></div><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Context flags — seeing surrounding lines</h4><div class="code-block"><pre>grep -A 3 "error" log.txt    # show 3 lines AFTER match\ngrep -B 2 "error" log.txt    # show 2 lines BEFORE match\ngrep -C 1 "error" log.txt    # show 1 line BEFORE AND AFTER match</pre></div><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>grep -o</code> — extract only the matching part</h4><div class="code-block"><pre>grep -o '[0-9]*' file.txt    # extract only numbers\ngrep -o -E '[0-9]{1, 3}\\.[0-9]{1, 3}\\.[0-9]{1, 3}\\.[0-9]{1, 3}' log.txt  # extract IPs</pre></div><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Regex basics used in grep</h4><div class="table-wrapper">
            <table class="data-table">
              <thead><tr><th>Pattern</th><th>Matches</th></tr></thead>
              <tbody>
                <tr><td><code>.</code></td><td>Any single character</td></tr>
                <tr><td><code>*</code></td><td>Zero or more of the previous</td></tr>
                <tr><td><code>^</code></td><td>Start of line</td></tr>
                <tr><td><code>$</code></td><td>End of line</td></tr>
                <tr><td><code>[abc]</code></td><td>Any one of a, b, or c</td></tr>
                <tr><td><code>[0-9]</code></td><td>Any digit</td></tr>
                <tr><td><code>\\b</code></td><td>Word boundary</td></tr>
              </tbody>
            </table>
          </div></>
      `
    },
    {
      id: 'sed-command',
      title: '<code>sed</code> — stream editor',
      priority: false,
      icon: '✏️',
      bodyHTML: `
        <p><code>sed</code> reads text line by line and applies transformations. Most common use: find-and-replace.</p>
        <><div class="code-block"><pre>sed 's/old/new/' file.txt             # replace first occurrence per line\nsed 's/old/new/g' file.txt            # replace ALL occurrences per line (g=global)\nsed 's/old/new/gi' file.txt           # case-insensitive replace\nsed -i 's/old/new/g' file.txt         # edit the file in place\nsed -n '5,10p' file.txt               # print only lines 5 to 10\nsed '3d' file.txt                     # delete line 3\nsed '/root/d' file.txt                # delete all lines containing "root"\nsed 's/^/> /' file.txt                # prepend "> " to every line</pre></div><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Multiple expressions</h4><div class="code-block"><pre>sed -e 's/old1/new1/g' -e 's/old2/new2/g' file.txt</pre></div><div class="info-box warning"><strong>⚠️ <code>-i</code></strong> makes <code>sed</code> edit the file directly. Without <code>-i</code>, it only prints to the screen — the file is untouched. Always test without <code>-i</code> first.</div></>
      `
    },
    {
      id: 'awk-command',
      title: '<code>awk</code> — field processor',
      priority: false,
      icon: '📊',
      bodyHTML: `
        <p><code>awk</code> treats each line as a set of fields separated by whitespace (or a delimiter you specify). Best for extracting specific columns from structured text.</p>
        <><div class="code-block"><pre>awk '{print} $1}' file.txt             # print the first field of every line\nawk '{print} $1, $3}' file.txt         # print fields 1 and 3\nawk -F: '{print} $1}' /etc/passwd      # use : as delimiter, print first field\nawk -F: '{print} $1, $7}' /etc/passwd  # print username and login shell\nawk '$3 > 1000' /etc/passwd           # print lines where field 3 > 1000\nawk 'NR==5' file.txt                  # print only line 5\nawk 'NR>=2 && NR< />=5' file.txt         # print lines 2 through 5\nawk '{sum += $1} END {print} sum}'     # sum all values in field 1</pre></div><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">BEGIN and END patterns</h4><div class="code-block"><pre>awk 'BEGIN {print} "Start"} {print} $1} END {print} "End"}' file.txt</pre></div><p>Useful for adding headers and footers.</p><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Special awk variables</h4><div class="table-wrapper">
            <table class="data-table">
              <thead><tr><th>Variable</th><th>Meaning</th></tr></thead>
              <tbody>
                <tr><td><code>$0</code></td><td>The entire line</td></tr>
                <tr><td><code>$1</code>, <code>$2</code>...</td><td>Individual fields</td></tr>
                <tr><td><code>NR</code></td><td>Current line number</td></tr>
                <tr><td><code>NF</code></td><td>Number of fields on the current line</td></tr>
                <tr><td><code>FS</code></td><td>Field separator (default: whitespace)</td></tr>
              </tbody>
            </table>
          </div></>
      `
    },
    {
      id: 'cut-command',
      title: '<code>cut</code> — extracting columns',
      priority: false,
      icon: '✂️',
      bodyHTML: `
        <p>Simpler than <code>awk</code> for basic column extraction from delimited files.</p>
        <><div class="code-block"><pre>cut -d: -f1 /etc/passwd               # delimiter=colon, field 1 (usernames)\ncut -d: -f1,7 /etc/passwd             # extract fields 1 and 7\ncut -c1-5 file.txt                    # characters 1 through 5 of each line</pre></div><div class="info-box tip"><strong>💡 Use <code>cut</code></strong> for simple extraction, <code>awk</code> when you need logic or conditions.</div></>
      `
    },
    {
      id: 'sort-uniq-wc',
      title: '<code>sort</code>, <code>uniq</code>, <code>wc</code>',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;"><code>sort</code> — sort lines</h4>
        <><div class="code-block"><pre>sort file.txt                          # alphabetical sort\nsort -r file.txt                       # reverse order\nsort -n file.txt                       # numeric sort\nsort -k2 file.txt                      # sort by second field\nsort -k3 -rn file.txt                  # sort by field 3, numeric, reversed\nsort -u file.txt                       # sort and remove duplicates</pre></div><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>uniq</code> — deduplicate adjacent lines</h4><div class="code-block"><pre>uniq file.txt                          # remove consecutive duplicate lines\nuniq -c file.txt                       # count occurrences of each line\nuniq -d file.txt                       # only show duplicated lines\nsort file.txt | uniq                   # full deduplication (sort first)\nsort file.txt | uniq -c | sort -rn     # count frequency, most common first</pre></div><div class="info-box warning"><strong>⚠️ <code>uniq</code></strong> only deduplicates <strong>adjacent</strong> lines — always <code>sort</code> first for full deduplication.</div><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>wc</code> — word/line/character count</h4><div class="code-block"><pre>wc file.txt                            # lines, words, characters\nwc -l file.txt                         # line count only\nwc -w file.txt                         # word count only\nwc -c file.txt                         # byte count only\nls /etc | wc -l                        # count entries in /etc</pre></div></>
      `
    },
    {
      id: 'tr-command',
      title: '<code>tr</code> — translate characters',
      priority: false,
      icon: '🔄',
      bodyHTML: `
        <p><code>tr</code> reads from stdin and replaces or deletes individual characters.</p>
        <div class="code-block"><pre>echo "hello" | tr 'a-z' 'A-Z'         # lowercase to uppercase\necho "HELLO" | tr 'A-Z' 'a-z'         # uppercase to lowercase\necho "hello world" | tr -d 'l'        # delete all occurrences of 'l'\necho "hello   world" | tr -s ' '      # squeeze multiple spaces into one\ncat file.txt | tr '\\n' ','            # replace newlines with commas</pre></div>
      `
    },
    {
      id: 'find-command',
      title: '<code>find</code> — powerful file searching',
      priority: false,
      icon: '🔎',
      bodyHTML: `
        <p><code>find</code> is the go-to tool for locating files and is often combined with <code>xargs</code>.</p>
        <div class="code-block"><pre>find . -name "*.log"               # find all .log files\nfind /etc -type f -name "*.conf"   # find all .conf files\nfind . -mtime -1                   # files modified within last 24 hours\nfind . -size +10M                  # files larger than 10MB\nfind . -name "*.tmp" -delete       # find and delete .tmp files\nfind . -type f -exec grep -l "error" {} \\;  # find files containing "error"</pre></div>
      `
    },
    {
      id: 'xargs-command',
      title: '<code>xargs</code> — building command lines from stdin',
      priority: false,
      icon: '📦',
      bodyHTML: `
        <p><code>xargs</code> is how you take output from one command and use it as arguments to another. Essential for batch operations.</p>
        <div class="code-block"><pre>cat files.txt | xargs rm          # delete all files listed in files.txt\ncat files.txt | xargs -n1 rm      # delete one at a time\nfind . -name "*.log" | xargs rm   # find and delete all .log files\nfind . -name "*.txt" | xargs wc -l # count lines in all .txt files</pre></div>
      `
    },
    {
      id: 'combining-tools',
      title: 'Combining tools into pipelines',
      priority: false,
      icon: '🏗️',
      bodyHTML: `
        <p>Real command-line work is almost always a pipeline. Small tools, chained together.</p>
        <><h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">Most common login shells on the system</h4><div class="code-block"><pre>cat /etc/passwd | cut -d: -f7 | sort | uniq -c | sort -rn</pre></div><ol style="padding-left:1.25rem;margin-bottom:0.5rem;">
            <li><code>cut -d: -f7</code> — extract shell field</li>
            <li><code>sort</code> — required before <code>uniq</code></li>
            <li><code>uniq -c</code> — count each unique shell</li>
            <li><code>sort -rn</code> — highest count first</li>
          </ol><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Top 5 processes by memory usage</h4><div class="code-block"><pre>ps aux | sort -k4 -rn | head -n 5</pre></div><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Count users with bash as their shell</h4><div class="code-block"><pre>grep "/bin/bash$" /etc/passwd | wc -l</pre></div><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Search all scripts in a directory for a function name</h4><div class="code-block"><pre>grep -r "function_name" /path/to/scripts/ | grep "\\.sh$"</pre></div><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Extract and rank IPs from a log file</h4><div class="code-block"><pre>grep -oE '[0-9]{1, 3}\\.[0-9]{1, 3}\\.[0-9]{1, 3}\\.[0-9]{1, 3}' access.log \\\n  | sort | uniq -c | sort -rn</pre></div><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Find and delete all .tmp files</h4><div class="code-block"><pre>find . -name "*.tmp" -type f | xargs rm</pre></div><h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Count lines in all .log files</h4><div class="code-block"><pre>find . -name "*.log" -type f | xargs wc -l</pre></div></>
      `
    },
    {
      id: 'quick-ref-section10',
      title: 'Quick reference — Text Processing',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>What you want</th><th>Command</th></tr></thead>
            <tbody>
              <tr><td>Pipe output to another command</td><td><code>cmd1 | cmd2</code></td></tr>
              <tr><td>Search for pattern</td><td><code>grep "pattern" file</code></td></tr>
              <tr><td>Case-insensitive search</td><td><code>grep -i "pattern" file</code></td></tr>
              <tr><td>Invert match</td><td><code>grep -v "pattern" file</code></td></tr>
              <tr><td>Context after match</td><td><code>grep -A 3 "pattern" file</code></td></tr>
              <tr><td>Context before match</td><td><code>grep -B 3 "pattern" file</code></td></tr>
              <tr><td>Context around match</td><td><code>grep -C 1 "pattern" file</code></td></tr>
              <tr><td>Extract only matching part</td><td><code>grep -o "pattern" file</code></td></tr>
              <tr><td>Quiet mode (no output)</td><td><code>grep -q "pattern" file</code></td></tr>
              <tr><td>Recursive search</td><td><code>grep -r "pattern" dir/</code></td></tr>
              <tr><td>Count matching lines</td><td><code>grep -c "pattern" file</code></td></tr>
              <tr><td>Find-replace (print only)</td><td><code>sed 's/old/new/g' file</code></td></tr>
              <tr><td>Find-replace (edit in place)</td><td><code>sed -i 's/old/new/g' file</code></td></tr>
              <tr><td>Delete matching lines</td><td><code>sed '/pattern/d' file</code></td></tr>
              <tr><td>Print specific line range</td><td><code>sed -n '5,10p' file</code></td></tr>
              <tr><td>Multiple sed expressions</td><td><code>sed -e 's/old/new/g' -e 's/old2/new2/g' file</code></td></tr>
              <tr><td>Print specific field</td><td><code>awk '{print $2}' file</code></td></tr>
              <tr><td>Custom delimiter</td><td><code>awk -F: '{print $1}' file</code></td></tr>
              <tr><td>Conditional field filter</td><td><code>awk '$3 > 100' file</code></td></tr>
              <tr><td>BEGIN/END in awk</td><td><code>awk 'BEGIN {...} {...} END {...}' file</code></td></tr>
              <tr><td>Extract column (simple)</td><td><code>cut -d: -f1 file</code></td></tr>
              <tr><td>Sort alphabetically</td><td><code>sort file</code></td></tr>
              <tr><td>Sort numerically</td><td><code>sort -n file</code></td></tr>
              <tr><td>Sort by field</td><td><code>sort -k2 file</code></td></tr>
              <tr><td>Remove duplicate lines</td><td><code>sort file | uniq</code></td></tr>
              <tr><td>Count occurrences</td><td><code>sort file | uniq -c | sort -rn</code></td></tr>
              <tr><td>Count lines</td><td><code>wc -l file</code></td></tr>
              <tr><td>To uppercase</td><td><code>echo "text" | tr 'a-z' 'A-Z'</code></td></tr>
              <tr><td>Delete a character</td><td><code>echo "text" | tr -d 'x'</code></td></tr>
              <tr><td>Find files by name</td><td><code>find . -name "*.txt"</code></td></tr>
              <tr><td>Find files by type</td><td><code>find . -type f -name "*.conf"</code></td></tr>
              <tr><td>Find recently modified files</td><td><code>find . -mtime -1</code></td></tr>
              <tr><td>Find and delete files</td><td><code>find . -name "*.tmp" -delete</code></td></tr>
              <tr><td>Build command lines from stdin</td><td><code>cat list.txt | xargs command</code></td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'mental-models-section10',
      title: 'Key mental models — Text Processing',
      priority: false,
      icon: '🧠',
      bodyHTML: `
        <div class="accordion-body-cards">
          <div class="mental-model-grid">
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🔗</span><span class="mental-title">Pipes</span></div>
              <div class="mental-card-body">Pipes connect commands — output of one becomes input of the next. Data flows left to right.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🔍</span><span class="mental-title">grep vs sed vs awk</span></div>
              <div class="mental-card-body"><code>grep</code> finds lines. <code>sed</code> transforms lines. <code>awk</code> works on fields within lines. <code>cut</code> extracts fields simply.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">❌</span><span class="mental-title">grep -v</span></div>
              <div class="mental-card-body"><code>grep -v</code> inverts — prints everything that does NOT match. Useful for filtering noise.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">📄</span><span class="mental-title">sed -i is permanent</span></div>
              <div class="mental-card-body"><code>sed</code> without <code>-i</code> is safe — it only prints, never modifies. Add <code>-i</code> only when sure.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">📊</span><span class="mental-title">awk -F</span></div>
              <div class="mental-card-body"><code>awk -F:</code> sets the delimiter — essential for colon-separated files like <code>/etc/passwd</code>.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">📋</span><span class="mental-title">uniq requires sort</span></div>
              <div class="mental-card-body"><code>uniq</code> only removes adjacent duplicates — always <code>sort</code> first for true deduplication.</div>
            </div>
            <div class="mental-card">
              <div class="mental-card-header"><span class="mental-icon">🔎</span><span class="mental-title">find + xargs</span></div>
              <div class="mental-card-body"><code>find</code> locates files; <code>xargs</code> builds commands from that output — a powerful combination.</div>
            </div>
            <div class="mental-card mental-card-full">
              <div class="mental-card-header"><span class="mental-icon">🏗️</span><span class="mental-title">Build incrementally</span></div>
              <div class="mental-card-body">Build pipelines incrementally — add one command at a time and verify output before adding the next.</div>
            </div>
          </div>
        </div>
      `
    }
  ];

  function renderAccordion(containerId, accordionData) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`⚠️ Container not found: ${containerId}`);
      return;
    }

    const html = accordionData.map(acc => `
      <div class="accordion open" data-searchable>
        <button type="button" class="accordion-header" onclick="toggleAccordion(this)" aria-expanded="true">
          <div class="accordion-title">
            <span class="acc-icon" aria-hidden="true">${acc.icon}</span>
            ${acc.title}
            ${acc.priority ? '<span class="tag priority">priority</span>' : ''}
          </div>
          <svg class="accordion-chevron" width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </button><div class="accordion-body">
            ${acc.bodyHTML}
          </div></>
      </div>
    `).join('');

    container.innerHTML = html;
  }

  renderLinuxOverview();
  // Render Section 1 accordions
  renderAccordion('js-section1-container', SECTION_1_ACCORDIONS);
  renderAccordion('js-section2-container', SECTION_2_ACCORDIONS);
  renderAccordion('js-section3-container', SECTION_3_ACCORDIONS);
  renderAccordion('js-section4-container', SECTION_4_ACCORDIONS);
  renderAccordion('js-section5-container', SECTION_5_ACCORDIONS);
  renderAccordion('js-section6-container', SECTION_6_ACCORDIONS);
  renderAccordion('js-section7-container', SECTION_7_ACCORDIONS);
  renderAccordion('js-section8-container', SECTION_8_ACCORDIONS);
  renderAccordion('js-section9-container', SECTION_9_ACCORDIONS);
  renderAccordion('js-section10-container', SECTION_10_ACCORDIONS);

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

    // At the bottom of your DOMContentLoaded listener, add:
  if (typeof updateNavBadges === 'function') {
    // Initial update after a short delay
    setTimeout(updateNavBadges, 200);
  }

  // Inside DOMContentLoaded, after all renders:
  console.log('✅ Flashcard track:', document.getElementById('flashcardTrack')?.children?.length || 0);
  console.log('✅ Quiz body:', document.getElementById('quizBody')?.children?.length || 0);
  console.log('✅ Section 1 container:', document.getElementById('js-section1-container')?.children?.length || 0);

}); // DOMContentLoaded end