// ============================================================
// PILLAR 1: NETWORKING INTERACTIVE DATA ENGINE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // ── Active Navigation Scroll-Spy Setup ──
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item[href^="#"]');
  const sections = ['overview', 'checklist', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 'flashcards', 'quiz', 'resources'];

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Triggers when the section is in the top-middle of the screen
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      
      // 1. Manage active sidebar link state
      navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
      });

      // 2. NEW: Fire the lighting visual animation if we hit the resources section
      if (id === 'resources') {
        const resourceCards = entry.target.querySelectorAll('.resource-card');
        resourceCards.forEach((card, index) => {
          // Stagger the flash animation slightly for each resource item
          setTimeout(() => {
            card.classList.add('lighting-flash');
          }, index * 150); 
        });
      }
    }
  });
}, observerOptions);

  // Attach the observer to all sections
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  // ── Accordion UI Interface Window Attachment ──
  window.toggleAccordion = function(header) {
    const accordion = header.closest('.accordion');
    if (accordion) accordion.classList.toggle('open');
  };

  // ── Optimized Debounced Real-Time Filter & Search Engine ──
  const searchInput = document.getElementById('searchInput');
  const noResults = document.getElementById('noResults');

  function removeHighlights(el) {
    el.querySelectorAll('.highlight').forEach(h => {
      h.outerHTML = h.textContent;
    });
  }

  function highlightText(el, term) {
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
  }

  if (searchInput) {
    let searchDebounceTimeout;

    searchInput.addEventListener('input', function() {
      clearTimeout(searchDebounceTimeout);
      
      // Delay processing by 250ms to verify if typing has paused
      searchDebounceTimeout = setTimeout(() => {
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
          const text = acc.textContent.toLowerCase();
          if (text.includes(term)) {
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

    document.addEventListener('keydown', e => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
      if (e.key === 'Escape') searchInput.blur();
    });
  }

  // ── Flashcards Processing Datastore ──
  const FLASHCARDS = [
    { term: "OSI Model mnemonic", answer: "All People Seem To Need Data Processing — layers 7 to 1: Application, Presentation, Session, Transport, Network, Data Link, Physical" },
    { term: "PDU at Layer 4", answer: "Segment — TCP breaks data into numbered segments with source/destination port numbers and sequence numbers" },
    { term: "PDU at Layer 3", answer: "Packet — IP wraps the segment adding source and destination IP addresses. Routers forward at this layer" },
    { term: "PDU at Layer 2", answer: "Frame — Ethernet wraps the packet with MAC addresses + FCS trailer. Switches operate here" },
    { term: "RFC 1918 private ranges", answer: "10.0.0.0/8 (enterprise) · 172.16.0.0/12 (mid-size) · 192.168.0.0/16 (home/office)" },
    { term: "APIPA range", answer: "169.254.0.0/16 — self-assigned when DHCP fails. Seeing 169.254.x.x = DHCP unreachable" },
    { term: "Loopback address", answer: "127.0.0.1 — traffic sent here never leaves the host. Also accessible as 'localhost'" },
    { term: "Subnet formula: usable hosts", answer: "2^(host bits) − 2. Subtract 2 for network address and broadcast address" },
    { term: "CIDR /26 — key facts", answer: "Mask: 255.255.255.192 · Block size: 64 · Usable hosts: 62 · Subnets from /24: 4" },
    { term: "TCP three-way handshake", answer: "SYN (client initiates) → SYN-ACK (server confirms + sends seq) → ACK (client confirms). Connection established" },
    { term: "DNS port and protocol", answer: "Port 53. UDP for standard queries (small, fast). TCP for large responses (zone transfers, 512+ byte replies)" },
    { term: "NAT vs PAT", answer: "NAT = IP translation only (one private per public). PAT = IP + port translation (many private per public IP)" },
    { term: "Stateful vs stateless firewall", answer: "Stateless: examines each packet in isolation. Stateful: tracks connection state table — only allows responses to established outbound connections" },
    { term: "ARP purpose", answer: "Address Resolution Protocol — resolves IP addresses to MAC addresses within a subnet. Broadcasts 'Who has x.x.x.x?' and caches the reply" },
    { term: "Default gateway", answer: "The router's private-side IP configured on every device. Traffic to destinations outside the local subnet is forwarded here" },
    { term: "SYN flood attack", answer: "Attacker sends many SYN packets but never completes the handshake. Target's connection table fills with half-open connections, refusing legitimate traffic" },
    { term: "VLSM golden rule", answer: "Always allocate subnets from largest host requirement to smallest. Prevents large subnets consuming space needed by smaller ones" },
    { term: "BGP", answer: "Border Gateway Protocol — holds the public internet together. ISPs use it to advertise address blocks and determine routing paths globally" },
    { term: "FCS", answer: "Frame Check Sequence — a checksum trailer added at Layer 2. Receiver recalculates; mismatch = frame corrupted and discarded. Only footer in the stack" },
    { term: "IPv6 shortening rules", answer: "Rule 1: drop leading zeros in each group (0db8 → db8). Rule 2: replace one consecutive run of all-zero groups with :: (can appear only once)" },
    { term: "T568B mnemonic", answer: "O · G · B · G · B (2-1-2-1-2): Orange×2 → White/Green → Blue×2 → Green → Brown×2. Dominant standard for commercial and home cabling." },
    { term: "RJ45 T568A vs T568B difference", answer: "Only the orange and green pairs swap. Pins 4,5 (blue) and 7,8 (brown) are identical in both. T568B: Orange leads. T568A: Green leads." },
    { term: "Straight-through vs crossover cable", answer: "Straight-through: both ends T568B — connects different device types (PC→switch). Crossover: T568A one end, T568B other — connects same device types (PC→PC)." }
  ];

  function renderFlashcards() {
    const grid = document.getElementById('flashcardGrid');
    if (!grid) return;
    grid.innerHTML = FLASHCARDS.map((card) => `
      <div class="flashcard" tabindex="0" role="button" aria-label="Flashcard: ${card.term}" onclick="this.classList.toggle('flipped')" onkeydown="if(event.key===' ' || event.key==='Enter'){ event.preventDefault(); this.classList.toggle('flipped'); }">
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <div class="card-label">Term</div>
            <div class="card-term">${card.term}</div>
            <div class="card-hint">click to reveal</div>
          </div>
          <div class="flashcard-back">
            <div class="card-answer">${card.answer}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ── Quiz Datastore Logic Core ──
  const QUIZ_QUESTIONS = [
    {
      q: "Which OSI layer is responsible for logical addressing and routing packets across multiple networks?",
      options: ["Layer 2 — Data Link", "Layer 3 — Network", "Layer 4 — Transport", "Layer 7 — Application"],
      correct: 1,
      explain: "Layer 3 (Network) handles IP addressing and routing. Routers operate exclusively at this layer, reading the IP header to forward packets hop-by-hop."
    },
    {
      q: "What is the correct formula for calculating the number of usable host addresses in a subnet?",
      options: ["2^(host bits)", "2^(host bits) − 1", "2^(host bits) − 2", "2^(prefix length) − 2"],
      correct: 2,
      explain: "2^(host bits) − 2. You subtract 2 to exclude the network address (host bits all zeros) and broadcast address (host bits all ones)."
    },
    {
      q: "A device on your network has the IP address 169.254.45.12. What does this indicate?",
      options: ["The device has a valid DHCP-assigned address", "The device cannot reach a DHCP server and has self-assigned an APIPA address", "The device is using a loopback address", "The device is on the 172.16.0.0/12 private range"],
      correct: 1,
      explain: "169.254.0.0/16 is the APIPA range. Seeing 169.254.x.x means DHCP failed — the device is isolated from the broader network."
    },
    {
      q: "You need to divide 192.168.1.0/24 into 8 equal subnets. What is the new prefix length?",
      options: ["/25", "/26", "/27", "/28"],
      correct: 2,
      explain: "8 subnets = 2³, so you borrow 3 bits. /24 + 3 = /27. Each /27 subnet has a block size of 32 and 30 usable hosts."
    },
    {
      q: "During the TCP three-way handshake, what is the correct sequence of messages?",
      options: ["ACK → SYN → SYN-ACK", "SYN → SYN-ACK → ACK", "SYN → ACK → SYN-ACK", "SYN-ACK → SYN → ACK"],
      correct: 1,
      explain: "SYN (client initiates) → SYN-ACK (server acknowledges and sends its sequence number) → ACK (client confirms). Connection is now established."
    },
    {
      q: "Which statement correctly describes the difference between a stateless and stateful firewall?",
      options: ["A stateless firewall is slower because it checks every packet twice", "A stateful firewall tracks the connection state table and only allows inbound packets matching established outbound connections", "A stateless firewall tracks MAC addresses; stateful tracks IP addresses", "A stateful firewall only works at layer 2"],
      correct: 1,
      explain: "A stateful firewall maintains a state table of active connections. Inbound packets that don't match an established outbound connection are dropped."
    },
    {
      q: "What is the purpose of ARP (Address Resolution Protocol)?",
      options: ["It translates domain names to IP addresses", "It assigns IP addresses to devices on a network", "It resolves IP addresses to MAC addresses within the same subnet", "It encrypts traffic between two devices"],
      correct: 2,
      explain: "ARP resolves an IP address to its corresponding MAC address on the local subnet. The device broadcasts 'Who has IP x.x.x.x?' and the owner replies with its MAC address."
    },
    {
      q: "A DNS query for 'www.example.com' reaches a recursive resolver that has no cached answer. What is the correct order of servers it contacts?",
      options: ["Authoritative NS → TLD server → Root server", "TLD server → Root server → Authoritative NS", "Root server → TLD server → Authoritative NS", "Root server → Authoritative NS → TLD server"],
      correct: 2,
      explain: "Root server → TLD server → Authoritative NS. The root tells the resolver which TLD handles .com, the TLD tells it which NS handles example.com, and the NS returns the IP."
    },
    {
      q: "In T568B wiring, what colour wire is connected to pin 1?",
      options: ["White/Green", "Green", "White/Orange", "Orange"],
      correct: 2,
      explain: "T568B: Pin 1 = White/Orange. The mnemonic O·G·B·G·B (2-1-2-1-2) tells you Orange pair leads, so pin 1 = White/Orange, pin 2 = Orange."
    },
    {
      q: "You are summarising four networks: 10.0.0.0/24, 10.0.1.0/24, 10.0.2.0/24, 10.0.3.0/24. What is the correct summary route?",
      options: ["10.0.0.0/22", "10.0.0.0/23", "10.0.0.0/24", "10.0.0.0/20"],
      correct: 0,
      explain: "The four networks share the first 22 bits — they diverge at bit 23. Summary = 10.0.0.0/22. Block size 2^10 = 1024 addresses, range 10.0.0.0 → 10.0.3.255 ✓"
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
            <label class="quiz-option" id="opt${qi}_${oi}" onclick="selectOption(${qi}, ${oi})">
              <input type="radio" name="q${qi}" value="${oi}" />
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  window.selectOption = function(qi, oi) {
    userAnswers[qi] = oi;
    document.querySelectorAll(`#qq${qi} .quiz-option`).forEach((opt, i) => {
      opt.classList.toggle('selected', i === oi);
    });
    const answered = userAnswers.filter(a => a !== null).length;
    document.getElementById('quizProgressFill').style.width = (answered / QUIZ_QUESTIONS.length * 100) + '%';
  };

  window.submitQuiz = function() {
    const answered = userAnswers.filter(a => a !== null).length;
    if (answered < QUIZ_QUESTIONS.length) {
      const fb = document.getElementById('quizFeedback');
      fb.className = 'quiz-feedback incorrect';
      fb.textContent = `Please answer all ${QUIZ_QUESTIONS.length} questions before submitting. (${answered}/${QUIZ_QUESTIONS.length} answered)`;
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
        explain.innerHTML = `<strong>${isCorrect ? 'Correct' : 'Incorrect'}</strong>${q.explain}`;
        qEl.appendChild(explain);
      }
    });

    document.getElementById('quizFeedback').style.display = 'none';
    document.getElementById('quizScore').classList.add('show');
    document.getElementById('scoreNum').textContent = score + '/' + QUIZ_QUESTIONS.length;
    
    const pct = Math.round(score / QUIZ_QUESTIONS.length * 100);
    // NEW: Save highest score to local storage
    const previousBest = localStorage.getItem('gc-score-networking') || 0;
    if (pct > previousBest) {
      localStorage.setItem('gc-score-networking', pct);
    }

    let msg = '';
    if (pct === 100) msg = 'Perfect score — outstanding command of networking fundamentals.';
    else if (pct >= 80) msg = 'Strong result — revisit any incorrect questions and you are ready to move on.';
    else if (pct >= 60) msg = 'Good foundation — review the sections where you made errors before advancing.';
    else msg = 'Keep studying — revisit the accordion sections above, then try again.';
    
    document.getElementById('scoreMsg').textContent = pct + '% — ' + msg;
    document.getElementById('quizScore').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  window.resetQuiz = function() {
    userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);
    document.getElementById('quizScore').classList.remove('show');
    document.getElementById('quizFeedback').className = 'quiz-feedback';
    document.getElementById('quizProgressFill').style.width = '0%';
    renderQuiz();
  };

  // Run initial render configurations safely inside DOMContentLoaded
  renderFlashcards();
  renderQuiz();
});