// ============================================================
// PILLAR 3: SECURITY – FLASHCARDS, QUIZ & PROGRESS TRACKING
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // FLASHCARDS (expanded to 50)
  // ============================================================

  const FLASHCARDS = [
    // SECTION 1 — Cryptography Fundamentals
    { term: "Symmetric encryption", answer: "Uses the same key for encryption and decryption. Fast and efficient for bulk data. Example: AES." },
    { term: "Asymmetric encryption", answer: "Uses a public/private key pair. Slower but enables secure key exchange and digital signatures. Example: RSA, ECC." },
    { term: "Hybrid cryptosystem", answer: "Uses asymmetric encryption to exchange a symmetric session key, then symmetric encryption for bulk data. How TLS, SSH, and VPNs work." },
    { term: "Key exchange problem", answer: "How do two parties agree on a secret key over an insecure channel without an eavesdropper learning it? Solved by asymmetric encryption." },
    { term: "AES", answer: "Advanced Encryption Standard. The industry-standard symmetric encryption algorithm. Uses 128, 192, or 256-bit keys." },
    { term: "RSA", answer: "The first practical asymmetric encryption algorithm (1977). Based on the difficulty of factoring large numbers. 2048-bit minimum." },
    { term: "ECC", answer: "Elliptic Curve Cryptography. More efficient than RSA — smaller keys for equivalent security. Used in modern TLS." },
    { term: "Forward secrecy", answer: "Ensures past sessions remain secure even if the long-term private key is stolen later. Implemented via ephemeral keys (DHE/ECDHE)." },

    // SECTION 2 — Hashing & Password Security
    { term: "Hash function", answer: "A one-way function that produces a fixed-size output (digest) from any input. Used for integrity checks and password storage." },
    { term: "Salt", answer: "A random value added to a password before hashing. Prevents rainbow table attacks. Stored alongside the hash in the database." },
    { term: "Pepper", answer: "A global secret key stored separately from the database. Adds an extra layer of defence if the database is breached." },
    { term: "bcrypt", answer: "A password hashing algorithm with a tunable work factor (cost). Designed to be slow, making brute-force expensive." },
    { term: "Argon2id", answer: "The modern password hashing algorithm (2015). Winner of the Password Hashing Competition. Recommended by OWASP." },
    { term: "Rainbow table", answer: "A precomputed lookup table of hash → plaintext pairs for common passwords. Defeated by salting." },
    { term: "Avalanche effect", answer: "A small change in input produces a dramatically different hash output. Essential property of good hash functions." },

    // SECTION 3 — TLS/SSL & the Handshake
    { term: "TLS", answer: "Transport Layer Security. The cryptographic protocol that secures HTTPS connections. Successor to SSL." },
    { term: "TLS handshake", answer: "The process where client and server negotiate encryption parameters, exchange certificates, and derive session keys." },
    { term: "TLS 1.3", answer: "The modern TLS version. Mandatory forward secrecy, removed weak ciphers, 1-RTT handshake, 0-RTT resumption." },
    { term: "ECDHE", answer: "Elliptic Curve Diffie-Hellman Ephemeral. Provides forward secrecy in TLS key exchange." },
    { term: "Certificate Authority", answer: "A trusted entity that issues digital certificates, verifying the identity of certificate holders." },
    { term: "SAN (Subject Alternative Name)", answer: "A TLS extension that lists domain names a certificate is valid for. Replaces the deprecated Common Name (CN)." },
    { term: "SNI (Server Name Indication)", answer: "A TLS extension that lets the client tell the server which domain it's connecting to during the handshake. Enables hosting multiple domains on one IP." },
    { term: "0-RTT", answer: "A TLS 1.3 feature allowing returning clients to send data immediately without waiting for the handshake. Reduces latency but has security caveats." },
    { term: "HSTS", answer: "HTTP Strict Transport Security. A header that forces browsers to always use HTTPS for a domain." },

    // SECTION 4 — PKI
    { term: "PKI", answer: "Public Key Infrastructure. The framework for managing public-key encryption and digital certificates." },
    { term: "Root CA", answer: "A Certificate Authority whose certificate is self-signed and trusted by browsers. The ultimate trust anchor." },
    { term: "Intermediate CA", answer: "A CA signed by a root CA. Used to issue leaf certificates. If compromised, it can be revoked without revoking the root." },
    { term: "OCSP", answer: "Online Certificate Status Protocol. A protocol for checking certificate revocation status in real-time." },
    { term: "CRL", answer: "Certificate Revocation List. A list of certificates that have been revoked before their expiration date." },

    // SECTION 5 — AuthN vs AuthZ
    { term: "Authentication (AuthN)", answer: "Verifying who you are. Identity verification. Example: logging in with a password." },
    { term: "Authorization (AuthZ)", answer: "Determining what you can do. Permissions. Example: access control lists (ACLs)." },
    { term: "MFA", answer: "Multi-Factor Authentication. Using two or more factors (something you know, have, or are) for authentication." },
    { term: "OAuth 2.0", answer: "An authorization framework that allows third-party applications to access user data without sharing passwords." },
    { term: "OpenID Connect", answer: "An authentication layer built on top of OAuth 2.0. Provides identity verification." },

    // SECTION 6 — Least Privilege
    { term: "Least privilege", answer: "Grant only the minimum permissions necessary to perform a task. Reduces the blast radius of a breach." },
    { term: "Role-based Access Control", answer: "Access control based on job roles. Users are assigned roles, and roles have permissions." },
    { term: "Attribute-based Access Control", answer: "Access control based on attributes of the user, resource, environment, and action. More granular than RBAC." },
    { term: "Zero Trust", answer: "A security model that assumes no implicit trust. Every access request must be authenticated and authorised regardless of source." },

    // SECTION 7 — OWASP Top 10 (Part 1)
    { term: "SQL Injection", answer: "A code injection attack where malicious SQL queries are inserted into input fields. Mitigated by prepared statements and parameterised queries." },
    { term: "XSS", answer: "Cross-Site Scripting. A code injection attack where malicious scripts are injected into trusted websites. Mitigated by input validation and output encoding." },
    { term: "CSRF", answer: "Cross-Site Request Forgery. A forced authenticated request attack. Mitigated by anti-CSRF tokens and SameSite cookies." },
    { term: "Broken Authentication", answer: "Authentication vulnerabilities like credential stuffing, session fixation, and weak password policies. Mitigated by MFA and strong session management." },
    { term: "Insecure Direct Object References", answer: "An access control vulnerability where unvalidated user input is used to directly access resources. Mitigated by indirect reference maps and access control checks." },

    // SECTION 8 — OWASP Top 10 (Part 2)
    { term: "Security Misconfiguration", answer: "Insecure default configurations, incomplete configurations, or exposed error details. Mitigated by secure defaults and automated configuration scanning." },
    { term: "Insecure Deserialization", answer: "Exploiting insecure deserialisation of data. Can lead to remote code execution. Mitigated by not accepting serialised data from untrusted sources." },
    { term: "Using Components with Known Vulnerabilities", answer: "Using outdated libraries or frameworks with known CVEs. Mitigated by dependency scanning and regular updates." },
    { term: "Logging & Monitoring Failures", answer: "Insufficient logging and monitoring to detect and respond to attacks. Mitigated by comprehensive logging and alerting systems." },
    { term: "Server-Side Request Forgery (SSRF)", answer: "An attack where a server makes requests to internal resources based on user input. Mitigated by allowlisting and validating URLs." },

    // SECTION 9 — Hardening
    { term: "Defence in Depth", answer: "A layered security approach where multiple controls are applied in sequence to protect a resource. If one fails, others are still in place." },
    { term: "Port hygiene", answer: "Keeping only necessary ports open. Reducing the attack surface by disabling unused services and closing unused ports." },
    { term: "Secure defaults", answer: "Configuring systems with the most secure settings by default, requiring explicit action to weaken security." },
    { term: "Patch management", answer: "The process of regularly applying updates to software to fix known vulnerabilities. Critical for system security." }
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
  // QUIZ SETS (expanded to 10 questions each)
  // ============================================================

  const QUIZ_SETS = {
    1: [
      { q: "What is symmetric encryption?", options: ["Uses one key for both encryption and decryption", "Uses two different keys", "Uses no key", "Uses three keys"], correct: 0, explain: "Symmetric encryption uses a single key for both encryption and decryption. Fast and efficient for bulk data." },
      { q: "What is a hash function?", options: ["Reversible", "One-way", "Uses a public key", "Encrypts data"], correct: 1, explain: "A hash function is one-way – you cannot recover the original input from the hash value." },
      { q: "What does TLS stand for?", options: ["Transport Layer Security", "Transmission Layer Standard", "Transfer Level Security", "Trusted Layer System"], correct: 0, explain: "TLS stands for Transport Layer Security, the successor to SSL. It encrypts data in transit." },
      { q: "What is a Certificate Authority?", options: ["A company that issues digital certificates", "A type of encryption", "A network protocol", "A hardware device"], correct: 0, explain: "A Certificate Authority is a trusted entity that issues digital certificates, verifying the identity of certificate holders." },
      { q: "What is the main difference between authentication and authorization?", options: ["AuthN is identity, AuthZ is permissions", "AuthN is permissions, AuthZ is identity", "They are the same", "AuthN uses passwords only"], correct: 0, explain: "Authentication verifies who you are (identity). Authorization determines what you can do (permissions)." },
      { q: "What is the principle of least privilege?", options: ["Give minimal permissions necessary", "Give full permissions to everyone", "No permissions at all", "Only root has access"], correct: 0, explain: "The principle of least privilege means granting only the permissions required to perform a specific task." },
      { q: "What is encryption at rest?", options: ["Encrypting stored data", "Encrypting data in transit", "Encrypting passwords", "Encrypting logs"], correct: 0, explain: "Encryption at rest protects data stored on disk or in databases. Encryption in transit protects data moving across networks." },
      { q: "What is PKI?", options: ["Public Key Infrastructure", "Private Key Integration", "Public Key Interface", "Private Key Infrastructure"], correct: 0, explain: "PKI is the framework for managing public-key encryption and digital certificates, enabling secure communications." },
      { q: "What is a salt in password hashing?", options: ["Random data added to the password before hashing", "A type of encryption", "A password manager", "A hash algorithm"], correct: 0, explain: "A salt is a random value added to a password before hashing, preventing rainbow table attacks." },
      { q: "What is the main purpose of a firewall?", options: ["Control network traffic based on rules", "Encrypt data", "Store passwords", "Manage users"], correct: 0, explain: "A firewall filters network traffic based on predefined rules, blocking or allowing connections." }
    ],
    2: [
      { q: "What is SQL injection?", options: ["Inserting malicious SQL code into a query", "A network-based attack", "A physical security breach", "A type of encryption"], correct: 0, explain: "SQL injection is an attack where malicious SQL statements are inserted into an input field, manipulating the database." },
      { q: "What is XSS?", options: ["Cross-Site Scripting", "Cross-Site Security", "Extra Secure System", "XML Site System"], correct: 0, explain: "XSS (Cross-Site Scripting) is an attack where malicious scripts are injected into trusted websites." },
      { q: "What is CSRF?", options: ["Cross-Site Request Forgery", "Client-Side Request Failure", "Central Security Response", "Cross-System Resource Failure"], correct: 0, explain: "CSRF forces an authenticated user to perform unwanted actions on a web application they're logged into." },
      { q: "What is a common defence against SQL injection?", options: ["Prepared statements", "Firewalls", "Encryption", "Two-factor authentication"], correct: 0, explain: "Prepared statements (parameterised queries) separate SQL logic from data, preventing injection." },
      { q: "What does OWASP stand for?", options: ["Open Web Application Security Project", "Open Web App Security Platform", "Open Worldwide Application Security", "Operational Web Application Security"], correct: 0, explain: "OWASP is the Open Web Application Security Project, a nonprofit focused on improving software security." },
      { q: "What is forward secrecy?", options: ["Past sessions stay secure even if the private key is stolen later", "Encrypting data at rest", "A type of hash function", "A network protocol"], correct: 0, explain: "Forward secrecy ensures past sessions cannot be decrypted even if the long-term private key is compromised later." },
      { q: "What is HSTS?", options: ["Forces browsers to always use HTTPS", "A type of encryption", "A hash algorithm", "A firewall rule"], correct: 0, explain: "HSTS (HTTP Strict Transport Security) forces browsers to always use HTTPS for a domain." },
      { q: "What is a pepper in password security?", options: ["A global secret stored outside the database", "A per-user random value", "A type of hash function", "A salt replacement"], correct: 0, explain: "A pepper is a global secret key stored separately from the database, adding an extra layer of defence if the database is breached." },
      { q: "What is SNI?", options: ["Tells the server which domain the client is connecting to", "A certificate authority", "A hash algorithm", "A firewall rule"], correct: 0, explain: "SNI (Server Name Indication) lets the client tell the server which domain it's connecting to during the TLS handshake." },
      { q: "What is 0-RTT in TLS 1.3?", options: ["Sending data immediately without waiting for the handshake", "A type of certificate", "A hash function", "A firewall rule"], correct: 0, explain: "0-RTT in TLS 1.3 allows returning clients to send data immediately without waiting for the handshake to complete." }
    ],
    3: [
      { q: "What is the difference between encryption and hashing?", options: ["Encryption is reversible; hashing is not", "Hashing is reversible; encryption is not", "They are the same", "Encryption uses one key; hashing uses two"], correct: 0, explain: "Encryption is designed to be reversible with the right key. Hashing is one-way by design." },
      { q: "What is the main advantage of ECC over RSA?", options: ["Smaller key sizes for equivalent security", "Faster symmetric encryption", "No key exchange problem", "More secure than AES"], correct: 0, explain: "ECC uses much smaller keys than RSA for the same level of security, making it faster and more efficient." },
      { q: "What is the TLS handshake used for?", options: ["Establishing a secure connection", "Hashing passwords", "Storing certificates", "Generating symmetric keys"], correct: 0, explain: "The TLS handshake negotiates encryption parameters, authenticates the server, and establishes a shared symmetric session key." },
      { q: "What is the difference between CBC and GCM mode in AES?", options: ["GCM is an authenticated encryption mode; CBC is not", "CBC is faster", "GCM uses more memory", "CBC is more secure"], correct: 0, explain: "GCM (Galois/Counter Mode) is an authenticated encryption mode that provides both confidentiality and integrity. CBC only provides confidentiality." },
      { q: "What is the primary purpose of a firewall?", options: ["Filter network traffic", "Encrypt data", "Hash passwords", "Store certificates"], correct: 0, explain: "Firewalls filter network traffic based on rules, blocking or allowing connections." },
      { q: "What is the difference between a vulnerability and an exploit?", options: ["A vulnerability is a weakness; an exploit uses it", "An exploit is a weakness; a vulnerability uses it", "They are the same", "Vulnerability is software; exploit is hardware"], correct: 0, explain: "A vulnerability is a weakness in a system. An exploit is the method used to take advantage of that vulnerability." },
      { q: "What is the purpose of certificate revocation?", options: ["Invalidate a certificate before it expires", "Extend certificate validity", "Change the certificate's public key", "Reissue the certificate"], correct: 0, explain: "Certificate revocation invalidates a certificate before its expiration date, for example if the private key is compromised." },
      { q: "What is a Man-in-the-Middle attack?", options: ["An attacker intercepts communication between two parties", "An attacker injects SQL queries", "An attacker sends spam emails", "An attacker steals a password"], correct: 0, explain: "A MITM (Man-in-the-Middle) attack involves an attacker intercepting communication between two parties, potentially reading or modifying the data." },
      { q: "What is the principle of defence in depth?", options: ["Multiple layers of security controls", "A single layer of security", "No security controls", "Only perimeter security"], correct: 0, explain: "Defence in depth uses multiple layers of security controls so that if one layer fails, others are still in place." },
      { q: "What is the most secure password storage method?", options: ["Argon2id with salt and pepper", "MD5", "SHA-256 without salt", "Storing passwords in plaintext"], correct: 0, explain: "Argon2id with salt and pepper is the recommended secure password storage method. MD5 and plaintext are completely insecure." }
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
  // PILLAR 3: SECURITY — DATA-DRIVEN CONTENT
  // ============================================================

  // ============================================================
  // OVERVIEW DATA
  // ============================================================

  const SECURITY_OVERVIEW = {
    purpose: {
      title: '📌 Purpose',
      description: [
        'Security is the pillar that explains <em>why</em> every other pillar behaves the way it does. Networking taught you how data moves; Linux taught you how systems are controlled; Security teaches you how to keep both from being abused. This is studied entirely from first principles — no AWS IAM, KMS, Security Groups, or ACM references unless you bring them up. The goal is to understand encryption, trust, identity, and common attack patterns well enough that when you eventually see AWS\'s security services, they read as "oh, that\'s just [concept] with a managed wrapper" rather than new magic.',
        'This also directly underpins Phase 2 (DevOps): container image scanning, secrets management, TLS in CI/CD pipelines, and Kubernetes RBAC all lean on these fundamentals.'
      ]
    },
    objectives: [
      'Explain symmetric vs asymmetric encryption and identify which one solves which problem',
      'Explain what a hash function is, why it\'s one-way, and where hashing is used (passwords, integrity checks, blockchains)',
      'Trace a full TLS/SSL handshake step by step, including certificate exchange and key negotiation',
      'Explain what a PKI (Public Key Infrastructure) is, what a Certificate Authority does, and how trust chains work',
      'Explain the difference between authentication and authorization, and give real examples of each',
      'Define the principle of least privilege and explain why it matters operationally',
      'Walk through the OWASP Top 10 and explain the mechanism behind each vulnerability class (not just the name)',
      'Explain common attack types: SQL injection, XSS, CSRF, and how each is mitigated',
      'Explain the difference between encryption at rest and encryption in transit',
      'Describe basic network hardening practices (firewalls revisited through a security lens, port hygiene, disabling unused services)'
    ],
    keyConcepts: [
      { term: 'Symmetric vs asymmetric encryption', definition: 'Foundation for everything else in this pillar' },
      { term: 'Hashing vs encryption', definition: 'Commonly confused — one is reversible, one isn\'t' },
      { term: 'TLS handshake', definition: 'Core of "how does HTTPS actually work"' },
      { term: 'PKI & Certificate Authorities', definition: 'Trust model underlying the entire internet' },
      { term: 'AuthN vs AuthZ', definition: 'Distinct concepts constantly conflated in real systems' },
      { term: 'Least privilege', definition: 'A design principle, not just a security checkbox' },
      { term: 'OWASP Top 10', definition: 'Industry-standard vulnerability taxonomy' },
      { term: 'SQLi / XSS / CSRF', definition: 'The three most common web attack classes' },
      { term: 'Encryption at rest vs in transit', definition: 'Two different problems, two different solutions' },
      { term: 'Salting & password storage', definition: 'Why plain hashing isn\'t enough for passwords' }
    ],
    stats: [
      { label: 'Sections', value: '10 total (3 complete, 7 in progress)' },
      { label: 'Topics covered', value: '20+' },
      { label: 'Estimated time', value: '~15–17 hours' },
      { label: 'Difficulty range', value: '🟡 Intermediate → 🟠 Advanced' },
      { label: 'Status', value: '🔜 In progress' }
    ],
    readmeLink: 'https://github.com/K-Mash24/Great_Cheatsheets/tree/Master/saa-foundation/03-security',
    repoPath: 'saa-foundation/03-security/'
  };

  // ============================================================
  // SECTION 1 — CRYPTOGRAPHY FUNDAMENTALS (10 accordions)
  // ============================================================

  const SECTION_1_ACCORDIONS = [
    {
      id: 's1-problem',
      title: '1.1 The Problem, With a Concrete Scenario',
      priority: false,
      icon: '🔓',
      bodyHTML: `
        <p>
          Imagine you run an online store. A customer, Alice, wants to enter her card number on your checkout page. Between her laptop and your server sits an untrusted path — her home router, her ISP, backbone routers, possibly a public Wi-Fi hotspot. Any one of these hops could, in principle, be run or compromised by someone hostile. Security engineers work under the default assumption: <strong>treat the network as hostile</strong> — design as if someone is always listening.
        </p>
        <p>
          The moment Alice tries to send her card number securely, two distinct problems appear:
        </p>
        <ol style="padding-left:1.2rem;margin:0.5rem 0;">
          <li><strong>Confidentiality</strong> — scramble the data so a listener sees gibberish.</li>
          <li><strong>Key exchange</strong> — the scrambling needs a "key," but how do Alice's browser and your server agree on that key <em>without</em> the listener also learning it?</li>
        </ol>
        <p>
          Problem 2 is the hard one. If the key itself is sent over the same network, the eavesdropper grabs it too — the entire scheme collapses. This is the <strong>key exchange problem</strong>, and modern cryptography largely exists to solve it.
        </p>
        <div class="info-box tip" style="margin-top:1rem;">
          <strong>🔑 The Locked Box Analogy</strong>
          <p>Think of cryptography as sending a package through a hostile postal system:</p>
          <ul style="margin-top:0.25rem;padding-left:1.2rem;">
            <li><strong>Symmetric:</strong> A lock with one key. You must physically hand the key to the recipient <em>before</em> sending anything. If the postal system is compromised, delivering the key is the weak point.</li>
            <li><strong>Asymmetric:</strong> A padlock that anyone can lock but only you can unlock. You publish copies of the open padlock to the world. Anyone can put a message in a box and snap the padlock shut. Only you have the key to open it — and the key never leaves your pocket.</li>
          </ul>
          <p style="margin-top:0.25rem;">This is the conceptual leap that makes modern cryptography work: <strong>instead of sharing a secret key, you share a public padlock.</strong></p>
        </div>
      `
    },
    {
      id: 's1-symmetric',
      title: '1.2 Symmetric Encryption',
      priority: false,
      icon: '🔐',
      bodyHTML: `
        <p>
          One key does both jobs — it encrypts and decrypts. Think of a physical padlock: whoever holds the key can lock the box or unlock it. There's no distinction between a "locking key" and an "unlocking key" — it's the same object.
        </p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Symmetric Encryption Flow</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.75rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
  ┌─────────────────────────────────────────────────────────────┐
  │                          Alice                             │
  │                                                            │
  │                     Plaintext: "4111"                      │
  │                           │                                │
  │                           ▼                                │
  │                  ┌──────────────┐                         │
  │                  │  AES Encrypt │                         │
  │                  └──────────────┘                         │
  │                           │                                │
  │                  Ciphertext: "9f2a..."                    │
  │                           │                                │
  └───────────────────────────┼─────────────────────────────────┘
                              │
                              ▼
  ┌─────────────────────────────────────────────────────────────┐
  │                         Network                            │
  │                                                            │
  │                  Ciphertext: "9f2a..."                    │
  │                           │                                │
  │                  Eavesdropper sees gibberish              │
  │                                                            │
  └───────────────────────────┼─────────────────────────────────┘
                              │
                              ▼
  ┌─────────────────────────────────────────────────────────────┐
  │                           Bob                              │
  │                                                            │
  │                  Ciphertext: "9f2a..."                    │
  │                           │                                │
  │                           ▼                                │
  │                  ┌──────────────┐                         │
  │                  │  AES Decrypt │                         │
  │                  └──────────────┘                         │
  │                           │                                │
  │                     Plaintext: "4111"                      │
  │                                                            │
  └─────────────────────────────────────────────────────────────┘

                            K = Shared Secret Key
                  (must be agreed upon before communication)
            </code>
          </pre>
        </div>
        <p><strong>Worked example:</strong> Alice and Bob agree in advance (in person, before any network is involved) on a shared secret key, <code>K</code>. Alice runs her message through AES using <code>K</code>, producing ciphertext, and sends it over the internet. Bob receives the ciphertext and runs AES in reverse using the <em>same</em> key <code>K</code>, recovering the plaintext.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pros</th><th>Cons</th></tr></thead>
            <tbody>
              <tr><td>Extremely fast — can encrypt gigabytes of data per second</td><td>The key exchange problem is completely unsolved. Alice and Bob had to agree on <code>K</code> beforehand.</td></tr>
              <tr><td>Used for encrypting large volumes of data: video streams, database backups, entire disk volumes</td><td>Over the open internet, with a stranger, at first contact — there's no "beforehand" to rely on.</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box note"><strong>📌 Algorithm to know:</strong> AES (Advanced Encryption Standard) — the current industry standard, running under the hood in HTTPS, VPNs, and disk encryption tools like BitLocker and LUKS.</div>
      `
    },
    {
      id: 's1-asymmetric',
      title: '1.3 Asymmetric Encryption (Public-Key Cryptography)',
      priority: false,
      icon: '🔑',
      bodyHTML: `
        <p>
          This is the breakthrough (Diffie–Hellman, RSA — 1970s) that solves the key exchange problem. Instead of a single shared key, each party generates a <strong>mathematically linked pair</strong>: a public key and a private key. Data encrypted with one half of the pair can <em>only</em> be decrypted with the other half — not a copy of the same key, but its mathematical counterpart.
        </p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Asymmetric Encryption Flow</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
  ┌───────────────┐          ┌───────────────┐
  │   Server      │          │   Alice       │
  │   (Bob)       │          │   (Customer)  │
  └───────┬───────┘          └───────┬───────┘
          │                          │
          │  1. Server generates     │
          │     key pair             │
          ▼                          │
  ┌───────────────┐                  │
  │ Public Key    │◄─────────────────┘
  │ Private Key   │  2. Public key sent to Alice
  └───────┬───────┘
          │
          │  3. Alice encrypts with
          │     Server's public key
          ▼
  ┌───────────────┐
  │ Ciphertext    │──────────────────► Eavesdropper
  │ "9f2a..."     │     (has public key + ciphertext
  └───────┬───────┘      → cannot decrypt)
          │
          │  4. Server decrypts with
          │     private key (never sent)
          ▼
  ┌───────────────┐
  │ Plaintext     │
  │ "4111"        │
  └───────────────┘
            </code>
          </pre>
        </div>
        <p><strong>Worked scenario — Alice and the online store:</strong></p>
        <ol style="padding-left:1.2rem;margin:0.5rem 0;">
          <li>Your server generated a key pair long before Alice ever connected. The public key is embedded in your server's TLS certificate and handed to anyone who connects.</li>
          <li>Alice's browser connects and receives your server's public key.</li>
          <li>Alice's browser encrypts her card number using your server's <em>public</em> key.</li>
          <li>The ciphertext travels across the hostile network. An eavesdropper captures it and already has the public key too (it's public) — neither piece of information helps them.</li>
          <li>Your server decrypts using its <em>private</em> key — which never left the server and was never transmitted anywhere.</li>
        </ol>
        <p>The elegant part: Alice never needed to have met you before, and no shared secret needed to exist in advance. The public key can be published to the entire planet, and it changes nothing — only the mathematically paired private key can reverse the encryption.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pros</th><th>Cons</th></tr></thead>
            <tbody>
              <tr><td>Solves key exchange cleanly for two strangers meeting for the first time online</td><td>Computationally expensive — RSA-2048 is roughly 100–1000x slower than AES</td></tr>
              <tr><td>Enables digital signatures (authenticity) and non-repudiation</td><td>Encrypting a 4GB backup file with RSA directly would be painfully slow</td></tr>
            </tbody>
          </table>
        </div>
        <div class="table-wrapper" style="margin-top:0.75rem;">
          <table class="data-table">
            <thead><tr><th>Algorithm</th><th>Year</th><th>Key size</th><th>Use case</th></tr></thead>
            <tbody>
              <tr><td>RSA</td><td>1977</td><td>2048–4096 bits</td><td>Widely supported, legacy systems</td></tr>
              <tr><td>ECC (Elliptic Curve)</td><td>1985</td><td>256–521 bits</td><td>Smaller keys, faster — increasingly preferred in modern TLS</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box warning">
          <strong>⚠️ A Common Misconception</strong>
          <p>It's tempting to assume asymmetric encryption is "strictly better" since it solves key exchange. It isn't a replacement for symmetric encryption — it <em>can't</em> be, due to the speed gap. If a server used pure RSA to encrypt an entire video stream, page loads would crawl. Early SSL implementations that overused asymmetric operations ran into exactly this bottleneck in practice.</p>
        </div>
      `
    },
    {
      id: 's1-why-asymmetric-alone',
      title: '1.4 Why Asymmetric Alone Isn\'t Enough',
      priority: false,
      icon: '⚡',
      bodyHTML: `
        <p>The speed gap is not academic — it's a hard engineering constraint.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Operation</th><th>Time (approx)</th></tr></thead>
            <tbody>
              <tr><td>Encrypt 1KB with AES</td><td>Microseconds</td></tr>
              <tr><td>Encrypt 1KB with RSA</td><td>Milliseconds</td></tr>
              <tr><td>Encrypt 1GB with AES</td><td>Seconds</td></tr>
              <tr><td>Encrypt 1GB with RSA</td><td>Minutes to hours</td></tr>
            </tbody>
          </table>
        </div>
        <p style="margin-top:0.75rem;">If a server uses RSA to encrypt every byte of a 4GB video file, the operation could take 100–1000x longer than using AES. That's the difference between a responsive API and a timeout.</p>
        <div class="info-box tip"><strong>💡 The key insight:</strong> Asymmetric encryption is used for <em>exchanging a small secret</em> — not for encrypting the bulk data itself.</div>
      `
    },
    {
      id: 's1-hybrid',
      title: '1.5 Hybrid Cryptosystems',
      priority: false,
      icon: '🔄',
      bodyHTML: `
        <p>No real system picks one approach exclusively. TLS, SSH, Signal, WhatsApp all do the same thing:</p>
        <ol style="padding-left:1.2rem;margin:0.5rem 0;">
          <li><strong>Asymmetric</strong> encryption exchanges a short-lived, randomly generated <strong>symmetric session key</strong> — a small amount of data, so the slower asymmetric operation is cheap here.</li>
          <li><strong>Symmetric</strong> encryption (AES) then handles all the actual bulk data — full page content, images, video, files — because it's fast.</li>
        </ol>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Hybrid Cryptosystem Flow</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
  Client (Alice)                              Server (Bob)
      │                                           │
      │  1. Connect + fetch public key            │
      │◄──────────────────────────────────────────│
      │                                           │
      │  2. Generate random session key (Ks)      │
      │                                           │
      │  3. Encrypt Ks with server's public key   │
      │     (asymmetric — small data, cheap)      │
      │──────────────────────────────────────────►│
      │                                           │
      │  4. Server decrypts Ks with private key   │
      │                                           │
      │  5. Encrypt all data with Ks (AES)        │
      │     (symmetric — bulk data, fast)         │
      │◄─────────────────────────────────────────►│
      │                                           │
      │  Ks is discarded after session ends       │
      │  (forward secrecy — see Section 3)        │
            </code>
          </pre>
        </div>
        <div class="info-box note">
          <strong>📌 Concrete numbers to anchor this:</strong>
          <ul style="margin-top:0.25rem;padding-left:1.2rem;">
            <li>Exchanging a 256-bit session key asymmetrically: ~milliseconds</li>
            <li>Encrypting a 4GB file symmetrically with that key: ~seconds</li>
            <li>Doing the same 4GB file with pure asymmetric encryption: an order of magnitude longer</li>
          </ul>
          <p style="margin-top:0.25rem;">This performance gap is <em>why</em> the hybrid model exists — it's a hard engineering requirement, not academic elegance.</p>
        </div>
        <div class="info-box tip" style="margin-top:0.75rem;">
          <strong>🔗 What's next:</strong> This exact handshake-then-bulk-transfer pattern is precisely what the TLS handshake implements step by step (Section 3) — no new concept, just this same idea as an actual protocol.
        </div>
      `
    },
    {
      id: 's1-key-length',
      title: '1.6 Key Length & Security Levels',
      priority: false,
      icon: '📏',
      bodyHTML: `
        <p>Not all keys are equal. Here's what the numbers actually mean:</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Algorithm</th><th>Key length</th><th>Equivalent security</th><th>Used for</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td><strong>AES</strong></td><td>128 bits</td><td>128 bits</td><td>Bulk encryption</td><td>Minimum for new systems</td></tr>
              <tr><td><strong>AES</strong></td><td>256 bits</td><td>256 bits</td><td>Bulk encryption</td><td>✅ Recommended; future-proof</td></tr>
              <tr><td><strong>RSA</strong></td><td>1024 bits</td><td>~80 bits</td><td>Legacy systems</td><td>❌ Broken — don't use</td></tr>
              <tr><td><strong>RSA</strong></td><td>2048 bits</td><td>~112 bits</td><td>General use</td><td>✅ Minimum for new systems</td></tr>
              <tr><td><strong>RSA</strong></td><td>3072 bits</td><td>~128 bits</td><td>Higher security</td><td>✅ Recommended for sensitive data</td></tr>
              <tr><td><strong>RSA</strong></td><td>4096 bits</td><td>~140 bits</td><td>Very high security</td><td>Slower; use ECC instead</td></tr>
              <tr><td><strong>ECC (P-256)</strong></td><td>256 bits</td><td>128 bits</td><td>Modern TLS</td><td>✅ Equivalent to RSA 3072, much faster</td></tr>
              <tr><td><strong>ECC (P-384)</strong></td><td>384 bits</td><td>192 bits</td><td>Higher security</td><td>✅ Recommended for long-term security</td></tr>
              <tr><td><strong>ECC (P-521)</strong></td><td>521 bits</td><td>256 bits</td><td>Future-proof</td><td>Very high security; overkill for most</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:1rem 0 0.25rem 0;">What "Equivalent Security" Actually Means</h4>
        <p>When we say "AES-128 has 128 bits of security," we mean:</p>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li>An attacker would need to try approximately 2^128 possible keys to break it.</li>
          <li>That's roughly 3.4 × 10^38 attempts.</li>
          <li>With all the world's computing power, that's effectively impossible.</li>
        </ul>
        <p>When we say "RSA-2048 has ~112 bits of security," we mean:</p>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li>The best attack on RSA-2048 is faster than brute-forcing 2^112 operations.</li>
          <li>This is why AES with a 128-bit key is considered stronger than RSA-2048, even though RSA-2048 looks like a much larger number.</li>
        </ul>
        <div class="info-box tip" style="margin-top:0.75rem;">
          <strong>💡 Key takeaway:</strong> For equivalent security, <strong>ECC uses much smaller keys than RSA</strong>, making it faster and more efficient. This is why modern TLS prefers ECC.
        </div>
      `
    },
    {
      id: 's1-pitfalls',
      title: '1.7 Common Pitfalls',
      priority: false,
      icon: '🚫',
      bodyHTML: `
        <p>Even with the right algorithms, implementation mistakes are common — and often catastrophic.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pitfall</th><th>Why it happens</th><th>How to avoid</th></tr></thead>
            <tbody>
              <tr><td><strong>Using AES-ECB mode</strong></td><td>Default in some libraries; lazy coding</td><td>Always use GCM, CBC, or CTR with a random IV</td></tr>
              <tr><td><strong>Hardcoding keys in source code</strong></td><td>Convenient for testing; forgotten in production</td><td>Use environment variables, secrets managers, or KMS</td></tr>
              <tr><td><strong>Reusing a nonce/IV</strong></td><td>Saves time; not understanding the risk</td><td>Generate a fresh random IV for each encryption</td></tr>
              <tr><td><strong>Rolling your own crypto</strong></td><td>Overconfidence; "I can write a better algorithm"</td><td>Use well-audited libraries (OpenSSL, libsodium, AWS KMS)</td></tr>
              <tr><td><strong>Using MD5 or SHA-1 for security</strong></td><td>Legacy systems; not keeping up</td><td>Use SHA-256 or SHA-3 for hashing</td></tr>
              <tr><td><strong>Using RSA-1024</strong></td><td>Old systems; not upgrading</td><td>Minimum RSA-2048, or preferably ECC</td></tr>
              <tr><td><strong>Storing keys in plaintext</strong></td><td>Misunderstanding threat models</td><td>Encrypt keys at rest; use HSMs or KMS</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:1rem 0 0.25rem 0;">Real-World Examples</h4>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><strong>ECB mode:</strong> The famous "Linux Penguin" image encrypted with ECB still shows the penguin silhouette — because identical blocks produce identical ciphertext.</li>
          <li><strong>Hardcoded keys:</strong> Uber's 2016 breach was linked to hardcoded AWS keys in source code pushed to GitHub.</li>
          <li><strong>IV reuse:</strong> WEP wireless encryption was broken largely because it reused IVs.</li>
        </ul>
      `
    },
    {
      id: 's1-forward-secrecy',
      title: '1.8 Forward Secrecy — Teaser for Section 3',
      priority: false,
      icon: '🔮',
      bodyHTML: `
        <p>There's one more twist to the key exchange problem.</p>
        <p>Even if you solve the key exchange today, an attacker could <em>record</em> your encrypted traffic today and <em>store</em> it. If they later steal your server's private key (via a breach, vulnerability, or insider threat), they can decrypt <em>all past sessions</em> they recorded.</p>
        <div class="info-box warning" style="margin-top:0.75rem;">
          <strong>🔓 Forward Secrecy</strong>
          <p>This solves the problem by ensuring that each session uses a <em>fresh, ephemeral</em> key that is:</p>
          <ol style="margin-top:0.25rem;padding-left:1.2rem;">
            <li>Exchanged using asymmetric cryptography during the handshake</li>
            <li>Used only for that one session</li>
            <li>Discarded immediately after the session ends</li>
          </ol>
          <p style="margin-top:0.25rem;">Even if an attacker steals your server's private key tomorrow, they cannot decrypt past sessions because each session's key was unique and never stored.</p>
        </div>
        <div class="info-box tip" style="margin-top:0.75rem;">
          <strong>🔗 What's next:</strong> This is implemented using <strong>Diffie-Hellman ephemeral (DHE/ECDHE)</strong> — the "E" stands for "ephemeral" (short-lived). Modern TLS requires it. We'll cover this in detail in <strong>Section 3 (TLS/SSL &amp; the Handshake)</strong>.
        </div>
      `
    },
    {
      id: 's1-devops-connection',
      title: '1.9 DevOps Connection',
      priority: false,
      icon: '⚙️',
      bodyHTML: `
        <p>This same pattern appears repeatedly in the DevOps world:</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>DevOps context</th><th>Where crypto appears</th></tr></thead>
            <tbody>
              <tr><td><strong>SSH key-based login</strong></td><td>Asymmetric key pair authenticates the connection; session traffic encrypted symmetrically</td></tr>
              <tr><td><strong>CI/CD secrets</strong></td><td>GitHub Secrets, GitLab CI variables — encrypted at rest, decrypted in memory during pipeline runs</td></tr>
              <tr><td><strong>Container image signing</strong></td><td>Cosign/Sigstore uses asymmetric signatures to verify image provenance</td></tr>
              <tr><td><strong>KMS / Secrets Manager</strong></td><td>Encryption at rest; key rotation policies; "envelope encryption" (KMS encrypts data keys, data keys encrypt data)</td></tr>
              <tr><td><strong>TLS termination</strong></td><td>Load balancers, ingress controllers, API gateways terminate TLS and forward plaintext (or re-encrypt) internally</td></tr>
              <tr><td><strong>mTLS (mutual TLS)</strong></td><td>Service-to-service authentication in microservices — both sides present certificates</td></tr>
              <tr><td><strong>Helm secrets</strong></td><td>Encrypted values files using sops or Helm Secrets</td></tr>
              <tr><td><strong>Vault</strong></td><td>Dynamic secrets, encryption as a service, transit engine</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box note" style="margin-top:0.75rem;">
          <strong>📌 The pattern is consistent:</strong> use asymmetric cryptography to establish trust and exchange a small secret, then use symmetric cryptography for all bulk work.
        </div>
      `
    },
    {
      id: 's1-hands-on',
      title: '1.10 Hands-On Practice (Codespace)',
      priority: false,
      icon: '🖥️',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">1. Generate an RSA Key Pair (Asymmetric)</h4>
        <div class="code-block">
          <pre>
  # Generate a private key
  openssl genrsa -out private.pem 2048

  # Extract the public key
  openssl rsa -in private.pem -pubout -out public.pem

  # View the public key (this is what a server sends to a client)
  cat public.pem</pre>
        </div>
        <p>Run <code>cat public.pem</code> — that block of text is exactly the kind of public key a browser receives from a server during a real TLS handshake. Worth seeing once so "public key" stops being an abstract idea.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">2. Encrypt and Decrypt a File with AES (Symmetric)</h4>
        <div class="code-block">
          <pre>
  # Create a test file
  echo "This is a secret message for my server" > plaintext.txt

  # Encrypt with AES-256-CBC
  openssl enc -aes-256-cbc -salt -in plaintext.txt -out encrypted.bin -pass pass:mysecretpassword

  # View the ciphertext (it's binary — use cat or hexdump)
  hexdump -C encrypted.bin | head

  # Decrypt it
  openssl enc -d -aes-256-cbc -in encrypted.bin -out decrypted.txt -pass pass:mysecretpassword

  # Verify
  cat decrypted.txt</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">3. Sign and Verify with RSA (Asymmetric — Preview)</h4>
        <div class="code-block">
          <pre>
  # Create a message
  echo "Deploy version v1.2.3" > message.txt

  # Sign it with your private key
  openssl dgst -sha256 -sign private.pem -out signature.bin message.txt

  # Verify with the public key
  openssl dgst -sha256 -verify public.pem -signature signature.bin message.txt</pre>
        </div>
        <p>This is how container image signing works — the publisher signs the image digest with their private key, and consumers verify with the public key.</p>
      `
    },
    {
      id: 's1-key-takeaways',
      title: 'Key Takeaways — Cryptography Fundamentals',
      priority: false,
      icon: '🧠',
      bodyHTML: `
        <div class="mental-model-grid">
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🔐</span><span class="mental-title">Symmetric is Fast</span></div>
            <div class="mental-card-body">Symmetric encryption (AES) is fast but has a key exchange problem. The same key encrypts and decrypts.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🔑</span><span class="mental-title">Asymmetric Solves Key Exchange</span></div>
            <div class="mental-card-body">Asymmetric encryption (RSA/ECC) solves key exchange but is slow. Public key encrypts; private key decrypts.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🔄</span><span class="mental-title">Hybrid Is the Real World</span></div>
            <div class="mental-card-body">Hybrid cryptosystems use asymmetric to exchange a session key, then symmetric for bulk data — this is how TLS, SSH, and VPNs work.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">📏</span><span class="mental-title">Key Length Matters</span></div>
            <div class="mental-card-body">2048-bit RSA ≈ 112 bits of security; 256-bit ECC ≈ 128 bits; AES-256 is 256 bits. ECC is more efficient for equivalent security.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🚫</span><span class="mental-title">Avoid These Mistakes</span></div>
            <div class="mental-card-body">Implementation mistakes are common — avoid ECB mode, hardcoded keys, and IV reuse. Use well-audited libraries.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🔮</span><span class="mental-title">Forward Secrecy</span></div>
            <div class="mental-card-body">Forward secrecy ensures past sessions stay secure even if the private key is stolen later. DHE/ECDHE makes each session key ephemeral.</div>
          </div>
          <div class="mental-card mental-card-full">
            <div class="mental-card-header"><span class="mental-icon">⚙️</span><span class="mental-title">DevOps Pattern</span></div>
            <div class="mental-card-body">The pattern repeats in DevOps — SSH, KMS, container signing, mTLS, and secrets management all use these same primitives: asymmetric for trust establishment, symmetric for bulk work.</div>
          </div>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 2 — HASHING & PASSWORD SECURITY (7 accordions)
  // ============================================================

  const SECTION_2_ACCORDIONS = [
    {
      id: 's2-what-is-hash',
      title: '2.1 What a Hash Function Is, With a Concrete Scenario',
      priority: false,
      icon: '🧮',
      bodyHTML: `
        <p>
          Say your company gets breached and the database dump leaks online (this happens constantly — LinkedIn 2012, Adobe 2013, RockYou 2009 are famous cases). If you stored passwords as plaintext, every user's login credential is now public. Hashing exists specifically to make this breach survivable.
        </p>
        <p>
          A <strong>hash function</strong> takes input of any size and produces a fixed-size output (a "digest"). Same input always produces the same output. Critically, it is <strong>one-way</strong> — there is no mathematical operation that reverses a hash back into its original input. This is fundamentally different from encryption, which is <em>designed</em> to be reversed by whoever holds the key.
        </p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th></th><th>Encryption</th><th>Hashing</th></tr></thead>
            <tbody>
              <tr><td><strong>Reversible?</strong></td><td>Yes, with the key</td><td>No — never, by design</td></tr>
              <tr><td><strong>Purpose</strong></td><td>Confidentiality</td><td>Integrity / verification</td></tr>
              <tr><td><strong>Output size</strong></td><td>Roughly matches input</td><td>Always fixed length (e.g. SHA-256 always outputs 256 bits)</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Hashing vs Encryption</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.75rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
  ┌─────────────────────────────────────────────────────────────────┐
  │                    Encryption (reversible)                     │
  │                                                                 │
  │    Plaintext ──encrypt + key──► Ciphertext ──decrypt + key──► Plaintext
  │                                                                 │
  └─────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────┐
  │                      Hashing (one-way)                         │
  │                                                                 │
  │    Plaintext ────────hash function─────► Digest (fixed length) │
  │                                                │               │
  │                                                ▼               │
  │                                         ⛔ No reverse operation │
  │                                                                 │
  └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
      `
    },
    {
      id: 's2-properties',
      title: '2.2 Properties a Good Hash Function Needs',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <ul style="padding-left:1.2rem;margin:0.5rem 0;">
          <li><strong>Deterministic</strong> — same input, same output, always</li>
          <li><strong>Fast to compute</strong> (for general use) — this becomes a <em>problem</em> for password hashing specifically, covered in 2.4</li>
          <li><strong>Collision-resistant</strong> — practically impossible to find two different inputs producing the same output</li>
          <li><strong>Avalanche effect</strong> — a tiny change in input produces a wildly different output. Example: <code>hash("password")</code> and <code>hash("Password")</code> look nothing alike, despite differing by one character.</li>
        </ul>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: The Avalanche Effect</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
  Input:  "password"  ──SHA-256──►  5e8848...
  Input:  "Password" ──SHA-256──►  e5e9fa...
  Input:  "password1"──SHA-256──►  0b14d5...

  ════════════════════════════════════════════════════════════

  Notice how one character change (lowercase p → uppercase P, or adding a single digit)
  produces a hash that bears NO resemblance to the original — this is the avalanche effect.
            </code>
          </pre>
        </div>
      `
    },
    {
      id: 's2-where-hashing',
      title: '2.3 Where Hashing Is Used',
      priority: false,
      icon: '🌍',
      bodyHTML: `
        <ul style="padding-left:1.2rem;margin:0.5rem 0;">
          <li><strong>Integrity checks</strong> — verifying a downloaded file wasn't corrupted or tampered with. You compare <code>sha256sum</code> of your download against the hash published on the project's site.</li>
          <li><strong>Password storage</strong> — servers store <code>hash(password)</code>, never the password itself.</li>
          <li><strong>Blockchain</strong> — blocks are chained together by including the previous block's hash.</li>
          <li><strong>Git</strong> — every commit is identified by a hash of its contents; changing one line in an old commit changes every commit hash after it.</li>
        </ul>
      `
    },
    {
      id: 's2-password-hashing',
      title: '2.4 Password Hashing — Where This Actually Bites',
      priority: false,
      icon: '🔓',
      bodyHTML: `
        <p><strong>Naive approach:</strong> store <code>hash(password)</code> directly. This fails for two independent reasons.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Problem 1: Rainbow Tables</h4>
        <p>A <strong>rainbow table</strong> is a precomputed lookup table: millions of common passwords mapped to their hash values. If two users both pick <code>"password123"</code>, they get the <em>identical</em> hash. An attacker with a rainbow table cracks both instantly — no brute-forcing needed, it's a lookup.</p>
        <div class="info-box warning" style="margin-top:0.5rem;">
          <strong>🔓 How Rainbow Tables Work</strong>
          <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
            <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;background:transparent;padding:0;">
  ┌─────────────────────────────────────────────────────────────────┐
  │              Rainbow Table Attack (Un-Salted)                  │
  │                                                                 │
  │    Leaked hash: 5e8848... ──► Look up in precomputed table    │
  │                                         │                       │
  │                                         ▼                       │
  │                              Found! Password: "password"       │
  │                                                                 │
  │                      ✅ Attacker now has the password           │
  └─────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────┐
  │                With Salt (Defeats Rainbow Tables)              │
  │                                                                 │
  │    Leaked hash: 0b14d5... ──► Look up in precomputed table    │
  │                                         │                       │
  │                                         ▼                       │
  │                        ❌ Not found — table doesn't include salt│
  │                                                                 │
  │                ❌ Attacker must brute-force each user individually│
  └─────────────────────────────────────────────────────────────────┘
            </pre>
          </div>
        </div>
        <p><strong>Fix — salting:</strong> generate a random string (the "salt") per user, and hash <code>password + salt</code> instead of just <code>password</code>. The salt is stored alongside the hash in the database — it doesn't need to be secret, it just needs to be unique per user. Identical passwords now produce completely different hashes, and precomputed rainbow tables become useless.</p>
        <div class="info-box tip"><strong>💡 Salt length:</strong> Use at least <strong>16 bytes (128 bits)</strong> of random data per salt. Modern systems use 32 bytes (256 bits).</div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Salt in Practice</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
  User A: "password" + Salt: xk9f2 ──► Hash: 0b14d5...
  User B: "password" + Salt: 7mQp3 ──► Hash: 9e3c7a...

  ════════════════════════════════════════════════════════════

  Identical password → different salt → completely different hash.
  Rainbow tables are useless.
            </code>
          </pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Problem 2: General-Purpose Hashes Are Fast</h4>
        <p>SHA-256 is designed to hash gigabytes per second — great for file integrity, terrible for passwords. A fast hash means an attacker with leaked hashes can brute-force <strong>billions of guesses per second</strong> on commodity GPU hardware.</p>
        <p><strong>Fix — slow, purpose-built password hashing algorithms:</strong></p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Algorithm</th><th>Year</th><th>Key feature</th><th>Recommended cost</th></tr></thead>
            <tbody>
              <tr><td><strong>bcrypt</strong></td><td>1999</td><td>Tunable work factor (<code>cost</code>)</td><td><code>cost=12</code> (modern default)</td></tr>
              <tr><td><strong>scrypt</strong></td><td>2009</td><td>Memory‑hard (resists GPU/ASIC)</td><td>Varies — tune for your hardware</td></tr>
              <tr><td><strong>Argon2id</strong></td><td>2015</td><td><strong>Recommended</strong> — hybrid of Argon2i (side‑channel resistance) and Argon2d (GPU resistance)</td><td><code>m=19MB, t=2, p=1</code> (OWASP recommendation)</td></tr>
            </tbody>
          </table>
        </div>
        <p style="margin-top:0.75rem;">These are deliberately, tunably slow — you can dial up the "cost factor" as hardware gets faster over the years, keeping brute-force attempts expensive even as computers speed up. Argon2id additionally makes attacks memory-intensive, which specifically defeats GPU/ASIC-based cracking rigs.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Password Storage Pipeline</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
  ┌─────────────────────────────────────────────────────────────────┐
  │                     Password Storage Pipeline                  │
  │                                                                 │
  │    User enters password                                        │
  │           │                                                     │
  │           ▼                                                     │
  │    Generate random salt (16+ bytes)                           │
  │           │                                                     │
  │           ▼                                                     │
  │    Argon2id(password + salt, cost=12)                         │
  │           │                                                     │
  │           ▼                                                     │
  │    Store: hash + salt in DB                                   │
  │                                                                 │
  │    ═══════════════════════════════════════════════════════════  │
  │                                                                 │
  │    Login attempt                                               │
  │           │                                                     │
  │           ▼                                                     │
  │    Fetch stored salt                                           │
  │           │                                                     │
  │           ▼                                                     │
  │    Argon2id(entered password + salt, cost=12)                 │
  │           │                                                     │
  │           ▼                                                     │
  │    ┌─────────────────────────────────────────────┐             │
  │    │     Matches stored hash?                     │             │
  │    └─────────────────────────────────────────────┘             │
  │           │                     │                               │
  │          Yes                    No                             │
  │           │                     │                               │
  │           ▼                     ▼                               │
  │    Login success          Login rejected                       │
  │                                                                 │
  └─────────────────────────────────────────────────────────────────┘

  The plaintext password is never stored, ever.
            </code>
          </pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">2.4.1 Pepper (Optional Extra Layer)</h4>
        <p>A <strong>pepper</strong> is a global secret key, stored separately from the database (e.g., in a secrets manager or environment variable), that is added to the password <em>before</em> hashing, alongside the per-user salt.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Layer</th><th>Scope</th><th>Where stored</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td><strong>Salt</strong></td><td>Per‑user</td><td>In the database (with the hash)</td><td>Defeats rainbow tables</td></tr>
              <tr><td><strong>Pepper</strong></td><td>Global</td><td>Separate from the database (secrets manager, env var)</td><td>If the database is breached, attackers still need the pepper to crack passwords</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box warning"><strong>⚠️ Important:</strong> Peppers add a layer of defence, but they are not a replacement for salts. Never skip salting.</div>
      `
    },
    {
      id: 's2-pitfalls',
      title: '2.5 Common Pitfalls',
      priority: false,
      icon: '🚫',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pitfall</th><th>Why it happens</th><th>How to avoid</th></tr></thead>
            <tbody>
              <tr><td><strong>Storing plaintext passwords</strong></td><td>Laziness, or "we'll add hashing later"</td><td>Never store plaintext, from day one</td></tr>
              <tr><td><strong>Hashing without a salt</strong></td><td>Assuming SHA-256 alone is "secure"</td><td>Always generate and store a unique per-user salt (16+ bytes)</td></tr>
              <tr><td><strong>Using a fast hash (MD5/SHA-256) for passwords</strong></td><td>Confusing "used for hashing" with "safe for passwords"</td><td>Use bcrypt, scrypt, or Argon2id specifically</td></tr>
              <tr><td><strong>Using MD5 for anything security-related</strong></td><td>Legacy code, old tutorials</td><td>MD5 is broken for collision resistance — avoid entirely</td></tr>
              <tr><td><strong>Reusing the same salt across all users</strong></td><td>Misunderstanding what the salt is for</td><td>Salt must be unique <em>per user</em>, generated fresh each time</td></tr>
              <tr><td><strong>Logging plaintext passwords accidentally</strong></td><td>Debug logging left in production</td><td>Scrub sensitive fields before logging, ever</td></tr>
              <tr><td><strong>Not using a pepper</strong></td><td>Unaware of the extra defence layer</td><td>Store a global secret outside the database for added security</td></tr>
              <tr><td><strong>Using Argon2i when you should use Argon2id</strong></td><td>Confusion between variants</td><td>Use <strong>Argon2id</strong> (hybrid of i + d) — it's the modern recommendation</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Real-World Examples</h4>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><strong>LinkedIn (2012 breach, disclosed 2016):</strong> ~117 million passwords were hashed with unsalted SHA-1. With no salt, attackers cracked the vast majority within days using precomputed tables.</li>
          <li><strong>Adobe (2013):</strong> Passwords were encrypted (reversibly!) rather than hashed, using a single shared key — a fundamental confusion of encryption with hashing. Password hints were also stored in plaintext alongside the encrypted passwords, letting attackers guess many passwords directly from the hints.</li>
          <li><strong>RockYou (2009):</strong> 32 million passwords stored in <strong>plaintext</strong>, no hashing at all. This breach became the source of the infamous "rockyou.txt" wordlist still used in password-cracking tools like <strong>hashcat</strong> and <strong>John the Ripper</strong> today.</li>
        </ul>
        <div class="info-box warning" style="margin-top:0.75rem;">
          <strong>💡 Why fast hashes are dangerous:</strong> A modern GPU can compute <strong>billions of SHA-256 hashes per second</strong>. If your database leaks and you used SHA-256 (unsalted), an attacker with a few hundred dollars of GPU hardware can crack most common passwords within hours. With bcrypt/Argon2id, the same attack drops to a few hundred guesses per second — making it effectively infeasible.
        </div>
      `
    },
    {
      id: 's2-hands-on',
      title: '2.6 Hands-On Practice (Codespace)',
      priority: false,
      icon: '🖥️',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">1. Hash a string with SHA-256</h4>
        <div class="code-block">
          <pre>
  # Hash a string (fast hash — fine for integrity, NOT for passwords)
  echo -n "password123" | sha256sum

  # Notice: hashing the exact same string always gives the exact same output
  echo -n "password123" | sha256sum

  # Now hash it with a "salt" appended manually, to see the avalanche effect
  echo -n "password123xk9f2" | sha256sum</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">2. Observe the Avalanche Effect</h4>
        <div class="code-block">
          <pre>
  # Create three files with slight differences
  echo "Deploy script v1" > deploy1.sh
  echo "Deploy script v1 " > deploy2.sh   # trailing space
  echo "Deploy script v1." > deploy3.sh   # period instead of space

  # Hash all three — compare the outputs
  sha256sum deploy1.sh
  sha256sum deploy2.sh
  sha256sum deploy3.sh
  # Each hash is completely different despite tiny input changes</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">3. Hash a file (integrity check)</h4>
        <div class="code-block">
          <pre>
  # Create a file and hash it
  echo "This is my configuration file" > config.txt
  sha256sum config.txt

  # Modify the file slightly
  echo "This is my configuration file v2" > config.txt
  sha256sum config.txt
  # The hash changes completely — detecting tampering</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">4. Proper password hashing with bcrypt</h4>
        <div class="code-block">
          <pre>
  # Install bcrypt (Python)
  pip install bcrypt --break-system-packages

  # Generate a hash with automatic salt
  python3 -c "import bcrypt; h = bcrypt.hashpw(b'mypassword', bcrypt.gensalt()); print(h)"

  # Run it twice — the output differs each time because bcrypt generates a new random salt
  python3 -c "import bcrypt; h = bcrypt.hashpw(b'mypassword', bcrypt.gensalt()); print(h)"</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">5. Observe bcrypt's cost factor</h4>
        <div class="code-block">
          <pre>
  # With cost factor 12 (default, recommended)
  python3 -c "import bcrypt, time; start=time.time(); h=bcrypt.hashpw(b'test', bcrypt.gensalt(12)); print(f'{time.time()-start:.3f}s')"

  # With cost factor 4 (weak, fast)
  python3 -c "import bcrypt, time; start=time.time(); h=bcrypt.hashpw(b'test', bcrypt.gensalt(4)); print(f'{time.time()-start:.3f}s')"

  # The cost factor directly controls how expensive each hash is
  # Higher cost = slower hash = harder to crack</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">6. (Optional) Argon2id — modern recommended algorithm</h4>
        <div class="code-block">
          <pre>
  # Install argon2-cffi
  pip install argon2-cffi --break-system-packages

  # Hash with Argon2id
  python3 -c "from argon2 import PasswordHasher; ph=PasswordHasher(); h=ph.hash('mypassword'); print(h)"
  # OWASP recommended: memory=19MB, time=2, parallelism=1</pre>
        </div>
      `
    },
    {
      id: 's2-devops-connection',
      title: '2.7 DevOps Connection',
      priority: false,
      icon: '⚙️',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>DevOps context</th><th>Where hashing appears</th></tr></thead>
            <tbody>
              <tr><td><strong>Git commit hashes</strong></td><td>Every commit is a hash of its contents, tree, and parent — changing anything changes the hash</td></tr>
              <tr><td><strong>Docker image digests</strong></td><td>Images are referenced by content hash (<code>sha256:...</code>) to guarantee immutability</td></tr>
              <tr><td><strong>Checksums in package managers</strong></td><td><code>pip</code>, <code>npm</code>, <code>apt</code> verify package integrity via published hashes before installing</td></tr>
              <tr><td><strong>Terraform state locking</strong></td><td>State file changes can be hash-verified to detect drift or tampering</td></tr>
              <tr><td><strong>CI/CD artifact verification</strong></td><td>Build pipelines hash artifacts to confirm the deployed binary matches what was tested</td></tr>
              <tr><td><strong>Software supply chain security</strong></td><td>SLSA (Supply Chain Levels for Software Artifacts) uses hashing to verify build provenance</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 's2-key-takeaways',
      title: 'Key Takeaways — Hashing & Password Security',
      priority: false,
      icon: '🧠',
      bodyHTML: `
        <div class="mental-model-grid">
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🔐</span><span class="mental-title">Hashing ≠ Encryption</span></div>
            <div class="mental-card-body">Hashing is <strong>one-way</strong> — encryption is reversible. Never confuse the two; they solve different problems.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🧂</span><span class="mental-title">Always Salt</span></div>
            <div class="mental-card-body">Never store <code>hash(password)</code> directly. Always use a unique per-user salt (16+ bytes) to defeat rainbow tables.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🐢</span><span class="mental-title">Slow Hashes for Passwords</span></div>
            <div class="mental-card-body">Use <strong>bcrypt</strong> (cost=12), <strong>scrypt</strong>, or <strong>Argon2id</strong> for passwords. Never use SHA-256 or MD5 for password storage.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🌶️</span><span class="mental-title">Pepper Adds Defence</span></div>
            <div class="mental-card-body">Store a global secret (pepper) outside the database. Even if the DB leaks, attackers still need the pepper to crack passwords.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">📊</span><span class="mental-title">Avalanche Effect</span></div>
            <div class="mental-card-body">A tiny change in input produces a completely different hash. This makes tampering immediately detectable.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">⚙️</span><span class="mental-title">Hashing in DevOps</span></div>
            <div class="mental-card-body">Git commits, Docker image digests, package manager checksums, and CI/CD artifact verification all rely on hashing.</div>
          </div>
          <div class="mental-card mental-card-full">
            <div class="mental-card-header"><span class="mental-icon">🚨</span><span class="mental-title">Real Breaches, Real Lessons</span></div>
            <div class="mental-card-body">LinkedIn failed with no salt. Adobe used encryption instead of hashing. RockYou stored plaintext. Each failed at a <em>different</em> step — showing multiple distinct ways this goes wrong.</div>
          </div>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 3 — TLS/SSL & THE HANDSHAKE (8 accordions)
  // ============================================================

  const SECTION_3_ACCORDIONS = [
    {
      id: 's3-why-tls',
      title: '3.1 Why TLS Exists, With a Concrete Scenario',
      priority: false,
      icon: '🔒',
      bodyHTML: `
        <p>
          Say you're on public airport Wi-Fi, logging into your bank's website. Plain HTTP sends everything — your username, password, account balance — as readable plaintext across that Wi-Fi network. Anyone running a packet sniffer on the same network (a trivially available tool, e.g. Wireshark) sees your credentials scroll past in the clear. This isn't hypothetical — "Firesheep," a 2010 browser extension, made exactly this attack a one-click affair on shared Wi-Fi, hijacking Facebook/Twitter sessions en masse until sites moved to HTTPS-by-default.
        </p>
        <p>
          TLS (Transport Layer Security — SSL is its deprecated predecessor; the terms get used interchangeably in casual speech, but SSL itself is broken and unused today) wraps HTTP in a secure channel and solves three problems simultaneously:
        </p>
        <ol style="padding-left:1.2rem;margin:0.5rem 0;">
          <li><strong>Confidentiality</strong> — nobody on the network path can read the data</li>
          <li><strong>Integrity</strong> — nobody can tamper with the data in transit without detection</li>
          <li><strong>Authentication</strong> — you can verify you're actually talking to your bank's real server, not an impostor</li>
        </ol>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: HTTP vs HTTPS on Hostile Wi-Fi</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
  ┌─────────────────────────────────────────────────────────────────┐
  │                    Plain HTTP                                   │
  │                                                                 │
  │    User ──"username=alice&password=hunter2"──► Public Wi-Fi    │
  │                                              │                  │
  │                                              ▼                  │
  │                              Eavesdropper: reads credentials directly
  │                                              │                  │
  │                                              ▼                  │
  │                                            Bank server         │
  └─────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────┐
  │                    HTTPS (TLS)                                  │
  │                                                                 │
  │    User ──"encrypted blob: 8f3a2c9e..."──► Public Wi-Fi       │
  │                                              │                  │
  │                                              ▼                  │
  │                                Eavesdropper: sees gibberish    │
  │                                              │                  │
  │                                              ▼                  │
  │                                            Bank server         │
  └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
      `
    },
    {
      id: 's3-handshake',
      title: '3.2 The Handshake, Step by Step',
      priority: false,
      icon: '🤝',
      bodyHTML: `
        <p>
          This is the hybrid cryptosystem from Section 1, implemented as an actual protocol. Here's the modern TLS 1.3 flow (simplified from TLS 1.2's extra round-trip — 1.3 is faster specifically because it cut a round-trip out of this process):
        </p>
        <ol style="padding-left:1.2rem;margin:0.5rem 0;">
          <li><strong>Client Hello</strong> — browser sends supported TLS versions, cipher suites, and a random number (<code>client_random</code>)</li>
          <li><strong>Server Hello</strong> — server picks a cipher suite, sends its own random number (<code>server_random</code>), and sends its <strong>digital certificate</strong> (contains the server's public key, signed by a Certificate Authority — full trust mechanics in Section 4)</li>
          <li><strong>Certificate verification</strong> — browser checks the certificate is valid, unexpired, matches the domain name (via Subject Alternative Name), and is signed by a CA the browser already trusts</li>
          <li><strong>Key exchange</strong> — using Diffie-Hellman (specifically <strong>ECDHE</strong> in modern TLS — the "E" means "ephemeral," covered in 3.3), both sides derive a shared secret without ever transmitting it directly across the network</li>
          <li><strong>Session keys derived</strong> — both sides independently compute the same symmetric session key from the shared secret and the earlier random numbers</li>
          <li><strong>Switch to symmetric encryption</strong> — all actual application data (login form, bank balance, everything) is now encrypted with the fast symmetric key, not the slow asymmetric operations</li>
        </ol>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: TLS 1.3 Handshake (Detailed)</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
  Client (Browser)                              Server (Bank)
      │                                              │
      │  Phase 1: Hello Exchange                     │
      │                                              │
      │  Client Hello (TLS versions, cipher suites,  │
      │  client_random, SNI)                         │
      │─────────────────────────────────────────────►│
      │                                              │
      │  Server Hello (chosen cipher, server_random) │
      │  Certificate (public key + chain)            │
      │  Server Certificate Verify (signature)       │
      │  Server Finished                             │
      │◄─────────────────────────────────────────────│
      │                                              │
      │  Verify certificate chain, SAN, expiration   │
      │  revocation                                  │
      │                                              │
      │  Phase 2: Key Exchange (ECDHE)               │
      │                                              │
      │  Client Key Exchange (ECDHE public value)    │
      │─────────────────────────────────────────────►│
      │                                              │
      │  Server Key Exchange (ECDHE public value)    │
      │◄─────────────────────────────────────────────│
      │                                              │
      │  Phase 3: Session Keys Derived               │
      │  (both sides independently derive key)       │
      │                                              │
      │  Phase 4: Secure Application Data            │
      │                                              │
      │  Encrypted application data                  │
      │◄────────────────────────────────────────────►│
            </code>
          </pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">3.2.1 Certificate Validation — How the Browser Actually Trusts the Certificate</h4>
        <p>When the browser receives the server's certificate, it performs a series of checks:</p>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
  Browser receives certificate
              │
              ▼
  ┌─────────────────────────┐
  │   Is it expired?        │
  └─────────────────────────┘
              │
        ┌─────┴─────┐
        │ Yes       │ No
        ▼           ▼
    ❌ Show     ┌─────────────────────────┐
    certificate │   Does SAN match domain?│
    error       └─────────────────────────┘
                      │
                ┌─────┴─────┐
                │ No        │ Yes
                ▼           ▼
            ❌ Show     ┌─────────────────────────────┐
            certificate │   Is it signed by a         │
            error       │   trusted CA?              │
                        └─────────────────────────────┘
                                  │
                            ┌─────┴─────┐
                            │ No        │ Yes
                            ▼           ▼
                        ❌ Show     ┌─────────────────────────────┐
                        certificate │   Is certificate revoked?   │
                        error       │   (OCSP/CRL)               │
                                    └─────────────────────────────┘
                                              │
                                        ┌─────┴─────┐
                                        │ Yes       │ No
                                        ▼           ▼
                                    ❌ Show     ✅ Connection
                                    certificate    is trusted
                                    error
            </code>
          </pre>
        </div>
        <div class="table-wrapper" style="margin-top:0.75rem;">
          <table class="data-table">
            <thead><tr><th>Certificate type</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td><strong>Root CA</strong></td><td>The ultimate trust anchor — browsers ship with a pre-installed list of trusted root CAs (Mozilla's CA Certificate Program)</td></tr>
              <tr><td><strong>Intermediate CA</strong></td><td>Signed by the root CA — used to issue leaf certificates; if compromised, can be revoked without revoking the root</td></tr>
              <tr><td><strong>Leaf (Server) Certificate</strong></td><td>Issued to your specific domain — contains the server's public key, domain name, expiration date</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 SAN (Subject Alternative Name):</strong> Modern certificates use SAN to specify domain names. The deprecated Common Name (CN) field is no longer sufficient. A single certificate can cover multiple domains (e.g., <code>example.com</code>, <code>www.example.com</code>, <code>api.example.com</code>) via SAN.</div>
      `
    },
    {
      id: 's3-forward-secrecy',
      title: '3.3 Forward Secrecy — Why Ephemeral Keys Matter',
      priority: false,
      icon: '🔮',
      bodyHTML: `
        <p>
          Consider this scenario: an attacker records <em>all</em> encrypted traffic to your bank today, without being able to decrypt any of it yet. Years later, they breach the bank and steal its private key. If the original key exchange used the server's long-term private key directly, <strong>every recorded session, going back years, becomes decryptable retroactively.</strong>
        </p>
        <p>
          This happened at scale — the 2013 Snowden disclosures revealed mass surveillance programs understood to rely partly on exactly this pattern: harvest encrypted traffic now, decrypt later if a key is ever obtained.
        </p>
        <p>
          <strong>Forward secrecy</strong> fixes this. Modern TLS uses <strong>ECDHE</strong> (Elliptic Curve Diffie-Hellman Ephemeral) — a <em>fresh</em>, temporary key pair generated for that single session only, then discarded immediately after. The server's long-term private key is used only to <em>sign</em> the exchange (proving authenticity), never to encrypt it directly. Even if the server's long-term private key is stolen tomorrow, none of yesterday's recorded sessions can be decrypted — each used its own disposable key that no longer exists anywhere.
        </p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Without vs With Forward Secrecy</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
  ┌─────────────────────────────────────────────────────────────────┐
  │              Without Forward Secrecy                            │
  │                                                                 │
  │    Attacker records 1000s of sessions over years               │
  │                              │                                  │
  │                              ▼                                  │
  │    Server's long-term private key stolen                       │
  │                              │                                  │
  │                              ▼                                  │
  │    ALL recorded sessions decrypted retroactively               │
  └─────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────┐
  │              With Forward Secrecy (ECDHE)                      │
  │                                                                 │
  │    Attacker records 1000s of sessions over years               │
  │                              │                                  │
  │                              ▼                                  │
  │    Each session used a unique, ephemeral key                   │
  │                              │                                  │
  │                              ▼                                  │
  │    Ephemeral keys discarded after each session                 │
  │                              │                                  │
  │                              ▼                                  │
  │    Server's long-term key stolen later                         │
  │                              │                                  │
  │                              ▼                                  │
  │    Past sessions still CANNOT be decrypted                     │
  └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
        <div class="info-box note"><strong>📌 Important:</strong> TLS 1.3 made forward secrecy <strong>mandatory</strong> — it was optional and cipher-suite dependent in TLS 1.2, which is precisely why incidents like the above were possible against older configurations.</div>
      `
    },
    {
      id: 's3-tls12-vs-tls13',
      title: '3.4 TLS 1.2 vs TLS 1.3 — What Actually Changed',
      priority: false,
      icon: '📊',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th></th><th>TLS 1.2</th><th>TLS 1.3</th></tr></thead>
            <tbody>
              <tr><td><strong>Round trips before data sent</strong></td><td>2</td><td>1 (faster page loads)</td></tr>
              <tr><td><strong>Forward secrecy</strong></td><td>Optional, cipher-suite dependent</td><td>Mandatory</td></tr>
              <tr><td><strong>Weak ciphers (RC4, MD5, static RSA)</strong></td><td>Permitted</td><td>Removed entirely</td></tr>
              <tr><td><strong>"0-RTT" resumption</strong></td><td>Not supported</td><td>Supported (returning clients can send data immediately)</td></tr>
              <tr><td><strong>Cipher suite count</strong></td><td>~37+</td><td>~5 (simplified, safer)</td></tr>
              <tr><td><strong>Certificate exchange</strong></td><td>RSA or ECDSA</td><td>ECDSA-only for key exchange (RSA still allowed for signing)</td></tr>
              <tr><td><strong>Session resumption</strong></td><td>Session IDs and tickets</td><td>More secure PSK (Pre-Shared Key) resumption</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">3.4.1 Key Technical Improvements in TLS 1.3</h4>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><strong>Removed static RSA key exchange</strong> — RSA key exchange doesn't provide forward secrecy; removed to make FS mandatory</li>
          <li><strong>Removed RC4, 3DES, MD5, SHA-1</strong> — All known weak or broken algorithms; removed to prevent downgrade attacks</li>
          <li><strong>Encrypted ServerHello extensions</strong> — Prevents certain traffic analysis attacks</li>
          <li><strong>0-RTT resumption</strong> — Returning clients can send data immediately; reduces latency significantly</li>
        </ul>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">3.4.2 ALPN — How TLS Negotiates HTTP/2 or HTTP/3</h4>
        <p><strong>ALPN</strong> (Application-Layer Protocol Negotiation) is a TLS extension that lets the client advertise which application protocols it supports (HTTP/1.1, HTTP/2, HTTP/3) during the handshake. The server picks one.</p>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
  Client: "I support HTTP/1.1, HTTP/2, HTTP/3" ────ALPN───► Server
                                                            │
                                                            ▼
                                              Server: "I pick HTTP/2"
                                                            │
                                                            ▼
                                              Connection uses HTTP/2
            </code>
          </pre>
        </div>
        <p>This avoids a separate, insecure round-trip to negotiate the protocol after TLS is already established.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">3.4.3 SNI — Hosting Multiple Domains on One IP</h4>
        <p><strong>SNI</strong> (Server Name Indication) is a TLS extension that lets the client tell the server which domain name it's trying to reach <em>during</em> the handshake. Without SNI, one IP address could only serve one TLS certificate. With SNI, a single load balancer or IP can host hundreds of domains with different certificates.</p>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
  Client: "I'm connecting to example.com" ────SNI───► Server
                                                            │
                                                            ▼
                                              Server: "Here's example.com's certificate"
            </code>
          </pre>
        </div>
        <div class="info-box warning"><strong>⚠️ Privacy note:</strong> SNI is sent unencrypted in plaintext during the handshake. This means anyone monitoring the network can see which domain you're visiting, even though the actual content is encrypted. TLS 1.3 Encrypted Client Hello (ECH) addresses this, but adoption is still limited.</div>
      `
    },
    {
      id: 's3-session-resumption',
      title: '3.5 Session Resumption and 0-RTT',
      priority: false,
      icon: '⚡',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">3.5.1 Session Resumption (TLS 1.2)</h4>
        <p>In TLS 1.2, returning clients can resume a session using a <strong>session ticket</strong> (issued by the server during the initial handshake). The client presents the ticket on reconnection, skipping the full handshake — reducing one full round-trip.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">3.5.2 0-RTT (TLS 1.3)</h4>
        <p>TLS 1.3 introduces <strong>0-RTT</strong> ("zero round-trip time") resumption: a returning client can send application data (e.g., the first HTTP request) on the very first packet, without waiting for the handshake to complete. This dramatically reduces latency for repeat visitors.</p>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
  Returning Client                              Server
      │                                              │
      │  Has PSK from previous session               │
      │                                              │
      │  Client Hello + 0-RTT encrypted data         │
      │  (Client sends data immediately)             │
      │─────────────────────────────────────────────►│
      │                                              │
      │  Server processes data while completing      │
      │  handshake                                   │
      │                                              │
      │  Server Hello + 0-RTT encrypted response     │
      │◄─────────────────────────────────────────────│
      │                                              │
      │  1 RTT saved vs standard handshake           │
            </code>
          </pre>
        </div>
        <div class="info-box warning"><strong>⚠️ 0-RTT security note:</strong> 0-RTT data is not forward-secret (it's encrypted with the PSK, which is derived from the previous session's key). This means 0-RTT data can be replayed by an attacker. It's safe for idempotent or low-sensitivity data, but not for critical operations (e.g., password changes, financial transactions).</div>
      `
    },
    {
      id: 's3-pitfalls',
      title: '3.6 Common Pitfalls',
      priority: false,
      icon: '🚫',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pitfall</th><th>Why it happens</th><th>How to avoid</th></tr></thead>
            <tbody>
              <tr><td><strong>Still supporting TLS 1.0/1.1</strong></td><td>Legacy client compatibility fears</td><td>Disable both — deprecated, vulnerable to known attacks (BEAST, POODLE)</td></tr>
              <tr><td><strong>Allowing weak cipher suites</strong></td><td>Default server config not hardened</td><td>Explicitly configure strong cipher suites only; disable RC4/3DES/static RSA</td></tr>
              <tr><td><strong>Self-signed certs in production</strong></td><td>Convenience during dev, forgotten before shipping</td><td>Use a real CA (Let's Encrypt is free) for anything public-facing</td></tr>
              <tr><td><strong>Ignoring certificate expiry</strong></td><td>No automated renewal</td><td>Automate renewal (certbot, ACM, cert-manager) — expired certs break trust entirely</td></tr>
              <tr><td><strong>Mixed content (HTTP resources on HTTPS)</strong></td><td>Legacy assets not migrated</td><td>Serve every resource over HTTPS; browsers block or warn on mixed content</td></tr>
              <tr><td><strong>Terminating TLS at LB, then plaintext internally</strong></td><td>Assuming "the internal network is safe"</td><td>Use mTLS or re-encrypt internally too — internal networks get breached constantly</td></tr>
              <tr><td><strong>Not using HSTS</strong></td><td>Unaware of HSTS</td><td>Set <code>Strict-Transport-Security</code> header to force browsers to always use HTTPS</td></tr>
              <tr><td><strong>Certificate with mismatched domain name</strong></td><td>Wrong CN/SAN, or missing SAN</td><td>Always use SAN; test with <code>openssl s_client -connect</code> before deploying</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Weak Cipher Suites to Avoid</h4>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><strong>RC4</strong> — Broken; biases in output allow plaintext recovery</li>
          <li><strong>3DES</strong> — Slow and weak (112-bit effective security)</li>
          <li><strong>NULL ciphers</strong> — No encryption at all</li>
          <li><strong>EXPORT ciphers</strong> — Intentionally weak (40-bit keys) mandated by US export law in the 1990s</li>
          <li><strong>Static RSA key exchange</strong> — No forward secrecy</li>
          <li><strong>CBC mode with TLS 1.0/1.1</strong> — Vulnerable to padding oracle attacks (POODLE, Lucky13)</li>
        </ul>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Real-World Examples</h4>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><strong>Heartbleed (2014):</strong> a buffer over-read bug in OpenSSL let attackers read server memory directly — including private keys, session tokens, and passwords — from any server running a vulnerable OpenSSL version, without leaving a trace in logs. It affected roughly half a million of the internet's certificates at the time.</li>
          <li><strong>POODLE (2014):</strong> exploited weaknesses in SSL 3.0's padding scheme, forcing the deprecation of SSL 3.0 industry-wide.</li>
          <li><strong>Superfish (2015):</strong> Lenovo pre-installed adware that hijacked TLS connections using a single, shared root certificate installed on every affected laptop — meaning anyone who extracted that one certificate could impersonate <em>any</em> HTTPS site to <em>any</em> Superfish-affected laptop.</li>
        </ul>
      `
    },
    {
      id: 's3-hands-on',
      title: '3.7 Hands-On Practice (Codespace)',
      priority: false,
      icon: '🖥️',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">1. Watch a real TLS handshake</h4>
        <div class="code-block"><pre>openssl s_client -connect google.com:443 -tls1_3</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">2. Inspect the certificate chain</h4>
        <div class="code-block"><pre>openssl s_client -connect google.com:443 -showcerts </dev/null 2>/dev/null | openssl x509 -noout -text | head -60</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">3. Check TLS version and cipher</h4>
        <div class="code-block"><pre>openssl s_client -connect google.com:443 2>/dev/null | grep -E "Protocol|Cipher"</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">4. Try an old protocol (should fail)</h4>
        <div class="code-block"><pre>openssl s_client -connect google.com:443 -tls1 2>&1 | head -10</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">5. Check certificate expiry</h4>
        <div class="code-block"><pre>echo | openssl s_client -connect google.com:443 2>/dev/null | openssl x509 -noout -dates</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">6. Check for forward secrecy</h4>
        <div class="code-block"><pre>openssl s_client -connect google.com:443 2>/dev/null | grep -E "Cipher|ECDHE"</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">7. Verify SAN</h4>
        <div class="code-block"><pre>echo | openssl s_client -connect google.com:443 2>/dev/null | openssl x509 -noout -text | grep -A1 "Subject Alternative Name"</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">8. Test your own server (once you have one)</h4>
        <div class="code-block"><pre>git clone --depth 1 https://github.com/drwetter/testssl.sh.git
  cd testssl.sh
  ./testssl.sh --quick your-server.com</pre></div>
        <p style="margin-top:0.5rem;">Optional — once you have your own public HTTPS endpoint deployed, run a full external audit against it at <strong>ssllabs.com/ssltest</strong> — it grades your actual TLS configuration (cipher suites, protocol versions, cert chain) the way a real security review would.</p>
      `
    },
    {
      id: 's3-devops-connection',
      title: '3.8 DevOps Connection',
      priority: false,
      icon: '⚙️',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>DevOps context</th><th>Where TLS appears</th></tr></thead>
            <tbody>
              <tr><td><strong>Load balancers / ingress controllers</strong></td><td>TLS termination — decrypting incoming HTTPS before forwarding to backend services</td></tr>
              <tr><td><strong>cert-manager (Kubernetes)</strong></td><td>Automates issuing and renewing TLS certificates for cluster ingress, often via Let's Encrypt</td></tr>
              <tr><td><strong>mTLS in service meshes</strong></td><td>Istio/Linkerd enforce mutual TLS between every service-to-service call automatically — both client and server present certificates</td></tr>
              <tr><td><strong>CI/CD pipelines</strong></td><td>Every <code>git push</code>, package download, and API call in a pipeline runs over TLS by default</td></tr>
              <tr><td><strong>ACM (AWS Certificate Manager)</strong></td><td>Managed certificate issuance/renewal for load balancers — automates exactly what cert-manager does for Kubernetes</td></tr>
              <tr><td><strong>SSL Labs / testssl.sh</strong></td><td>Standard tools DevOps engineers use to audit a server's actual TLS configuration before going live</td></tr>
              <tr><td><strong>API Gateways</strong></td><td>TLS termination and certificate management for external APIs</td></tr>
              <tr><td><strong>Service-to-service (mTLS)</strong></td><td>Microservices often use mutual TLS to authenticate between internal services, preventing lateral movement if one service is breached</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 's3-key-takeaways',
      title: 'Key Takeaways — TLS/SSL & the Handshake',
      priority: false,
      icon: '🧠',
      bodyHTML: `
        <div class="mental-model-grid">
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🔒</span><span class="mental-title">Three Goals</span></div>
            <div class="mental-card-body">TLS provides <strong>confidentiality, integrity, and authentication</strong> — not just encryption alone.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🤝</span><span class="mental-title">Hybrid Cryptosystem</span></div>
            <div class="mental-card-body">The handshake is the hybrid cryptosystem from Section 1: asymmetric to exchange a key, symmetric for the actual data.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🔮</span><span class="mental-title">Forward Secrecy</span></div>
            <div class="mental-card-body"><strong>ECDHE</strong> ensures a stolen long-term private key can't retroactively decrypt past sessions — mandatory in TLS 1.3.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">📊</span><span class="mental-title">TLS 1.3 Improvements</span></div>
            <div class="mental-card-body">Removed weak ciphers, cut a full round-trip, made forward secrecy mandatory, and added 0-RTT resumption.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">✅</span><span class="mental-title">Certificate Validation</span></div>
            <div class="mental-card-body">Browsers check: expiration, SAN (domain match), chain verification (root → intermediate → leaf), and revocation (OCSP/CRL).</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">⚡</span><span class="mental-title">0-RTT Caveat</span></div>
            <div class="mental-card-body">0-RTT reduces latency but is not forward-secret; use only for idempotent/low-sensitivity operations.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🚨</span><span class="mental-title">Real Breaches</span></div>
            <div class="mental-card-body">Heartbleed (OpenSSL bug), POODLE (SSL 3.0), Superfish (rogue root CA) — each failed at a different layer.</div>
          </div>
          <div class="mental-card mental-card-full">
            <div class="mental-card-header"><span class="mental-icon">⚙️</span><span class="mental-title">DevOps Reality</span></div>
            <div class="mental-card-body">Certificate validity, expiry, and trust chains (Section 4 goes deep on this) are just as operationally critical as the cryptography itself — expired certs break trust entirely.</div>
          </div>
        </div>
      `
    }
  ];

  // ============================================================
  // RENDER FUNCTIONS
  // ============================================================

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
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
          </svg>
        </button>
        <div class="accordion-body">
          ${acc.bodyHTML}
        </div>
      </div>
    `).join('');

    container.innerHTML = html;
  }

  function renderSecurityOverview() {
    const container = document.getElementById('js-overview-container');
    if (!container) {
      console.warn('⚠️ Overview container not found');
      return;
    }

    const objectives = SECURITY_OVERVIEW.objectives.map(obj => `<li>${obj}</li>`).join('');
    const keyConcepts = SECURITY_OVERVIEW.keyConcepts.map(item => `
      <dt>${item.term}</dt>
      <dd>${item.definition}</dd>
    `).join('');
    const stats = SECURITY_OVERVIEW.stats.map(stat => `
      <tr><td><strong>${stat.label}</strong></td><td>${stat.value}</td></tr>
    `).join('');

    container.innerHTML = `
      <div class="overview-content" style="margin-bottom: 2rem;">
        <div class="info-box note" style="margin-bottom: 1.5rem;">
          <strong>${SECURITY_OVERVIEW.purpose.title}</strong>
          ${SECURITY_OVERVIEW.purpose.description.map(p => `<p>${p}</p>`).join('')}
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
          <p style="margin-top: 0.25rem;">
            All markdown notes are committed to
            <a href="${SECURITY_OVERVIEW.readmeLink}" target="_blank" style="color: var(--accent-secondary);">
              Great_Cheatsheets/${SECURITY_OVERVIEW.repoPath}
            </a>
          </p>
        </div>
      </div>
    `;
  }


  // --- Render Overview ---
  renderSecurityOverview();

  // --- Render Sections ---
  renderAccordion('js-section1-container', SECTION_1_ACCORDIONS);
  renderAccordion('js-section2-container', SECTION_2_ACCORDIONS);
  renderAccordion('js-section3-container', SECTION_3_ACCORDIONS);
  // Sections 4-9 are currently placeholders — they will have content added later
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

  // Update page header
  if (typeof window.updatePageHeader === 'function') {
    window.updatePageHeader('security');
  } else {
    console.warn('⚠️ updatePageHeader not available – check global.js');
  }

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

