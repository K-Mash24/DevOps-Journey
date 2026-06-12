// ============================================================
// PILLAR 1: NETWORKING – FLASHCARDS & QUIZ (only pillar-specific)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  //----- FLASHCARD DATA & RENDERING -----
  const FLASHCARDS = [
    // Original cards (23)
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
    { term: "Straight-through vs crossover cable", answer: "Straight-through: both ends T568B — connects different device types (PC→switch). Crossover: T568A one end, T568B other — connects same device types (PC→PC)." }, 
    // New cards (15)
    { term: "OSI Layer 7 protocols", answer: "HTTP, HTTPS, FTP, SMTP, SSH, DNS — Application layer protocols that enable communication between applications and the network" },
    { term: "OSI Layer 4 protocols", answer: "TCP (Transmission Control Protocol) — reliable, connection-oriented. UDP (User Datagram Protocol) — fast, connectionless" },
    { term: "OSI Layer 3 protocols", answer: "IP (Internet Protocol) — routing and addressing. ICMP (Internet Control Message Protocol) — used by ping and traceroute" },
    { term: "Difference between hub, switch, router", answer: "Hub: broadcasts to all ports (obsolete). Switch: forwards based on MAC address. Router: forwards based on IP address between networks" },
    { term: "Public vs private IP addresses", answer: "Public: globally unique, routable on internet, assigned by IANA. Private: RFC 1918 ranges, reusable, not routable on internet" },
    { term: "What is a subnet mask?", answer: "32-bit number that separates IP address into network and host portions. 1s = network bits, 0s = host bits. Example: 255.255.255.0 = /24" },
    { term: "CIDR notation explained", answer: "Classless Inter-Domain Routing — writes IP address followed by slash and prefix length. /24 means first 24 bits are network, 8 bits are hosts" },
    { term: "Broadcast address vs multicast address", answer: "Broadcast: sent to ALL devices on network (255.255.255.255). Multicast: sent to specific group of devices (224.0.0.0 to 239.255.255.255)" },
    { term: "What is NAT overloading (PAT)?", answer: "Port Address Translation — maps multiple private IPs to one public IP using unique source port numbers. Most common form of NAT in home routers" },
    { term: "DNS record types — A vs AAAA vs CNAME", answer: "A: IPv4 address. AAAA: IPv6 address. CNAME: alias/canonical name (maps one hostname to another)" },
    { term: "TCP congestion control algorithms", answer: "Slow start (exponential growth) → Congestion avoidance (linear growth) → Fast retransmit/fast recovery (on packet loss)" },
    { term: "UDP use cases (why not TCP)", answer: "DNS queries (small, fast), VoIP (latency-sensitive), video streaming (dropped frames better than delay), DHCP (no IP yet)" },
    { term: "What is ARP poisoning/spoofing?", answer: "Attacker sends fake ARP replies, associating their MAC address with another device's IP. Traffic intended for that device goes to attacker instead" },
    { term: "Difference between IDS and IPS", answer: "IDS (Intrusion Detection System): monitors and alerts. IPS (Intrusion Prevention System): monitors and actively blocks/threatens traffic" },
    { term: "What is the DMZ in networking?", answer: "Demilitarized Zone — network segment between internet and internal network. Hosts public-facing servers (web, email). If compromised, internal network remains protected" }
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
  
  // ----- QUIZ DATA SETS -----
  const QUIZ_SETS = {
    // SET 1 – Core Networking Fundamentals (Original 10 questions)
    1: [
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
    ],

    // SET 2 – Subnetting & CIDR (New)
    2: [
      {
        q: "What is the subnet mask for a /27 CIDR block?",
        options: ["255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248"],
        correct: 1,
        explain: "/27 = 27 network bits, 5 host bits. The last octet has 3 bits for network (128+64+32=224) → 255.255.255.224."
      },
      {
        q: "How many usable host addresses are in a /29 subnet?",
        options: ["8", "6", "4", "2"],
        correct: 1,
        explain: "/29 = 32-29=3 host bits → 2³ = 8 total addresses. Subtract network and broadcast → 6 usable hosts."
      },
      {
        q: "Which of the following is a valid VLSM subnet of 192.168.0.0/24?",
        options: ["192.168.0.0/23", "192.168.0.0/25", "192.168.1.0/24", "192.168.0.0/16"],
        correct: 1,
        explain: "VLSM subnets must be smaller than the parent. /25 fits inside /24. /23 is larger, 192.168.1.0/24 is a different network, /16 is much larger."
      },
      {
        q: "You have a network 10.0.0.0/16. What is the broadcast address for subnet 10.0.64.0/18?",
        options: ["10.0.127.255", "10.0.63.255", "10.0.95.255", "10.0.64.255"],
        correct: 0,
        explain: "/18 block size = 2^(32-18)=2^14=16384 addresses. Starting at 10.0.64.0, broadcast = start + block size -1 = 10.0.64.0 + 16383 = 10.0.127.255."
      },
      {
        q: "What is the CIDR notation for a subnet mask of 255.255.240.0?",
        options: ["/20", "/21", "/22", "/24"],
        correct: 0,
        explain: "255.255.240.0 = 11111111.11111111.11110000.00000000 → 20 consecutive 1s → /20."
      },
      {
        q: "Which of the following is the network address of 172.16.50.25/20?",
        options: ["172.16.0.0", "172.16.32.0", "172.16.48.0", "172.16.64.0"],
        correct: 2,
        explain: "/20 = 255.255.240.0. The third octet increments by 16. 50 falls in the 48-63 range → network address 172.16.48.0."
      },
      {
        q: "You need 50 subnets from 10.0.0.0/8. How many bits must you borrow?",
        options: ["4", "5", "6", "7"],
        correct: 2,
        explain: "2^5 = 32 (not enough), 2^6 = 64 (≥50). Borrow 6 bits → new prefix /14 (8+6)."
      },
      {
        q: "What is the maximum number of hosts on a /30 subnet?",
        options: ["2", "4", "6", "8"],
        correct: 0,
        explain: "/30 leaves 2 host bits → 2² = 4 total addresses, minus 2 (network & broadcast) = 2 usable hosts. Commonly used for point-to-point links."
      },
      {
        q: "Supernetting 192.168.0.0/24 and 192.168.1.0/24 results in which summary route?",
        options: ["192.168.0.0/22", "192.168.0.0/23", "192.168.0.0/24", "192.168.1.0/23"],
        correct: 1,
        explain: "The first 23 bits are common. 192.168.0.0/23 covers 192.168.0.0–192.168.1.255."
      },
      {
        q: "A /26 subnet has how many total addresses?",
        options: ["32", "64", "128", "256"],
        correct: 1,
        explain: "/26 = 32-26=6 host bits → 2^6 = 64 total addresses."
      }
    ],

    // SET 3 – Network Security & Advanced Topics (New)
    3: [
      {
        q: "What type of attack sends TCP SYN packets but never completes the handshake?",
        options: ["DDoS", "SYN flood", "ARP spoofing", "IP spoofing"],
        correct: 1,
        explain: "SYN flood attack sends many SYN packets without ACK, exhausting the target's connection table."
      },
      {
        q: "Which firewall type tracks the state of active connections?",
        options: ["Stateless firewall", "Stateful firewall", "Packet filter", "Proxy firewall"],
        correct: 1,
        explain: "Stateful firewalls maintain a state table and only allow return traffic that matches an established outbound connection."
      },
      {
        q: "What does the acronym DMZ stand for in networking?",
        options: ["Demilitarized Zone", "Dynamic Management Zone", "Data Mirroring Zone", "Domain Name Zone"],
        correct: 0,
        explain: "Demilitarized Zone — a network segment between the internet and internal network that hosts public‑facing servers."
      },
      {
        q: "Which protocol is used to resolve an IP address to a MAC address?",
        options: ["DNS", "DHCP", "ARP", "ICMP"],
        correct: 2,
        explain: "ARP (Address Resolution Protocol) resolves IPv4 addresses to MAC addresses within a local subnet."
      },
      {
        q: "What is the primary purpose of a VLAN?",
        options: ["Increase bandwidth", "Segment a physical network into logical broadcast domains", "Encrypt traffic between switches", "Provide redundancy"],
        correct: 1,
        explain: "VLANs logically separate networks on the same physical switch, improving security and reducing broadcast traffic."
      },
      {
        q: "Which of the following is a common defense against SYN flood attacks?",
        options: ["SYN cookies", "ARP inspection", "DMZ", "Stateful firewall"],
        correct: 0,
        explain: "SYN cookies encode connection information in the initial SYN-ACK, avoiding resource allocation until the handshake completes."
      },
      {
        q: "What type of attack involves an attacker intercepting communication between two parties?",
        options: ["DoS", "Man-in-the-Middle (MITM)", "Port scanning", "IP spoofing"],
        correct: 1,
        explain: "MITM attacks secretly relay or alter communication between two parties who believe they are talking directly."
      },
      {
        q: "Which command would you use to scan for open ports on a remote host?",
        options: ["ping", "traceroute", "nmap", "ifconfig"],
        correct: 2,
        explain: "nmap (Network Mapper) is a port scanner used to discover open ports and services on a network."
      },
      {
        q: "What is the function of the FCS (Frame Check Sequence) in an Ethernet frame?",
        options: ["Encryption", "Error detection", "Addressing", "Flow control"],
        correct: 1,
        explain: "FCS is a checksum trailer at layer 2. The receiver recalculates it; a mismatch means the frame was corrupted in transit."
      },
      {
        q: "Which protocol is used by the `ping` command to test reachability?",
        options: ["TCP", "UDP", "ICMP", "ARP"],
        correct: 2,
        explain: "ICMP (Internet Control Message Protocol) Echo Request and Echo Reply are used by ping."
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
    const fill = document.getElementById('quizProgressFill');
    if (fill) fill.style.width = (answered / currentQuestions.length * 100) + '%';
  };

  window.submitQuiz = function() {
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
      localStorage.setItem(`networking-quiz-set-${currentSet}-passed`, 'true');
      
      // Check if ANY set is mastered to update the floating ring
      if (isQuizMastered()) {
        localStorage.setItem('networking-quiz-passed', 'true');
      }
    }
    
    // Force update of the floating ring
    if (window.updateFloatingRing) window.updateFloatingRing();

    document.getElementById('quizFeedback').style.display = 'none';
    document.getElementById('quizScore').classList.add('show');
    document.getElementById('scoreNum').textContent = `${score}/${currentQuestions.length}`;

    const pct = Math.round(score / currentQuestions.length * 100);
    const previousBest = localStorage.getItem('gc-score-networking') || 0;
    if (pct > previousBest) {
      localStorage.setItem('gc-score-networking', pct);
      if (typeof window.updateGlobalProgress === 'function') {
        window.updateGlobalProgress();
      }
    }

    let msg = '';
    if (pct === 100) msg = 'Perfect score — outstanding command of networking fundamentals.';
    else if (pct >= 80) msg = 'Strong result — revisit any incorrect questions and you are ready to move on.';
    else if (pct >= 60) msg = 'Good foundation — review the sections where you made errors before advancing.';
    else msg = 'Keep studying — revisit the accordion sections above, then try again.';
    document.getElementById('scoreMsg').textContent = `${pct}% — ${msg}`;
    document.getElementById('quizScore').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  window.resetQuiz = function() {
    userAnswers = new Array(currentQuestions.length).fill(null);
    document.getElementById('quizScore').classList.remove('show');
    const fb = document.getElementById('quizFeedback');
    fb.className = 'quiz-feedback';
    fb.style.display = 'none';
    const fill = document.getElementById('quizProgressFill');
    if (fill) fill.style.width = '0%';
    renderQuiz();

    // Only reset mastery for the CURRENT set (not all sets)
    localStorage.removeItem(`networking-quiz-set-${currentSet}-passed`);

    // If no sets are mastered anymore, remove the overall flag
    if (!isQuizMastered()) {
      localStorage.removeItem('networking-quiz-passed');
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
      if (localStorage.getItem(`networking-quiz-set-${i}-passed`) === 'true') {
        return true;
      }
    }
    return false;
  }

  function resetAllQuizProgress() {
    for (let i = 1; i <= 3; i++) {
      localStorage.removeItem(`networking-quiz-set-${i}-passed`);
    }
    localStorage.removeItem('networking-quiz-passed');
    if (window.updateFloatingRing) window.updateFloatingRing();
  }
  // ============================================

  // Floating progress ring for pillar sections + modal popup
  function initFloatingProgressRing() {
    const checkboxes = document.querySelectorAll('.section-checkbox');
    if (!checkboxes.length) return;

    // Create floating ring element
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
    const circumference = 2 * Math.PI * 26; // ≈ 163.36

        // Load saved states and update ring
    function updateFloatingRing() {
      const checkboxes = document.querySelectorAll('.section-checkbox');
      const total = checkboxes.length + 1; // +1 for quiz
      let checked = 0;

      // Count section checkboxes
      checkboxes.forEach(cb => {
        const section = cb.dataset.section;
        const saved = localStorage.getItem(`networking-section-${section}`);
        const isChecked = saved === 'true' ? true : false;
        cb.checked = isChecked;
        if (isChecked) checked++;
      });

      // Count quiz if passed
      const quizPassed = localStorage.getItem('networking-quiz-passed') === 'true';
      if (quizPassed) checked++;

      const percent = Math.round((checked / total) * 100);
      const offset = circumference - (percent / 100) * circumference;
      ringFill.style.strokeDasharray = circumference;
      ringFill.style.strokeDashoffset = offset;
      percentSpan.textContent = `${percent}%`;

      // Show congratulations toast when 100% is reached (only once)
      if (percent === 100) {
        const alreadyCongratulated = localStorage.getItem('networking-100-congrats-shown');
        if (!alreadyCongratulated) {
          // Mark as shown so it doesn't repeat
          localStorage.setItem('networking-100-congrats-shown', 'true');
          
          // Create and show toast
          const toast = document.createElement('div');
          toast.className = 'coming-soon-toast';
          toast.innerHTML = '🎉 CONGRATULATIONS! 🎉<br>You have mastered Networking Fundamentals!';
          toast.style.background = 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))';
          toast.style.padding = '12px 24px';
          toast.style.fontSize = '0.9rem';
          toast.style.fontWeight = 'bold';
          toast.style.textAlign = 'center';
          toast.style.borderRadius = '40px';
          document.body.appendChild(toast);
          
          // Auto-remove after 4 seconds
          setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
          }, 4000);
        }
      }
    }

    // Expose globally so quiz submission can call it
    window.updateFloatingRing = updateFloatingRing;

    // Save checkbox state
    function saveCheckboxState() {
      checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
          localStorage.setItem(`networking-section-${cb.dataset.section}`, cb.checked);
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
      
      // Load Networking pillar details (using globally exposed function)
      if (typeof window.showPillarDetail === 'function') {
        window.showPillarDetail('networking', 'phase1');
      }
    }

    function closeProgressModal() {
      const modal = document.getElementById('progressModal');
      if (modal) modal.style.display = 'none';
    }

    function getSectionTitle(sectionNum) {
      const titles = {
        '1': 'Section 1 — Internet Structure',
        '2': 'Section 2 — IP Addressing',
        '3': 'Section 3 — Subnetting & CIDR',
        '4': 'Section 4 — Routing & Switching',
        '5': 'Section 5 — DNS',
        '6': 'Section 6 — TCP & UDP',
        '7': 'Section 7 — Network Security'
      };
      return titles[sectionNum] || `Section ${sectionNum}`;
    }

    floatingDiv.addEventListener('click', (e) => {
      e.stopPropagation();
      if (typeof window.openModalToPillarDetails === 'function') {
        window.openModalToPillarDetails('networking', 'phase1');
      } else {
        openProgressModal(); // fallback
      }
    });

    // Global close handlers
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

    // Reset pillar progress button
    const resetBtn = document.getElementById('modalResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('⚠️ Are you sure? This will reset ALL section checkboxes and quiz mastery for Networking. This cannot be undone.')) {
          // Reset all 7 section checkboxes
          for (let i = 1; i <= 7; i++) {
            localStorage.removeItem(`networking-section-${i}`);
          }
          // Reset quiz mastery
          localStorage.removeItem('networking-quiz-passed');
          // Reset congratulations flag so it can show again
          localStorage.removeItem('networking-100-congrats-shown');

          // Reset quiz mastery
          localStorage.removeItem('networking-quiz-passed');
          localStorage.removeItem('networking-100-congrats-shown');
          
          // Update actual checkboxes on the page
          const checkboxes = document.querySelectorAll('.section-checkbox');
          checkboxes.forEach(cb => {
            cb.checked = false;
          });
          
          // Update floating ring
          if (window.updateFloatingRing) window.updateFloatingRing();
          
          // Close modal
          closeProgressModal();
          
          // Show confirmation toast
          const toast = document.createElement('div');
          toast.className = 'coming-soon-toast';
          toast.textContent = '✅ Networking progress has been reset';
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

  // Run on networking page only
  if (document.querySelector('.section-checkbox')) {
    initFloatingProgressRing();
  }

  // Render flashcards and quiz when the page loads
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