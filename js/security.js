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

  const SECTION_4_ACCORDIONS = [
    {
      id: 's4-trust-problem',
      title: '4.1 The Trust Problem, With a Concrete Scenario',
      priority: false,
      icon: '🏛️',
      bodyHTML: `
        <p>Section 3 glossed over one detail: in the TLS handshake, the server sends its public key. But here's the gap — <strong>how does your browser know that public key actually belongs to your bank, and not to an attacker running a fake "bank" server?</strong></p>
        <p>Concrete attack: you connect to public Wi-Fi at a coffee shop. An attacker runs a <strong>man-in-the-middle (MITM)</strong> device that intercepts your connection attempt to <code>yourbank.com</code> and instead hands you <em>its own</em> public key, pretending to be the bank. Without a way to verify identity, your browser would happily encrypt your login credentials — to the attacker's key. This is what tools like <strong>sslstrip</strong> are built to perform.</p>
        <p>This is the <strong>trust problem</strong>: encryption alone proves nothing about <em>identity</em>. Anyone can generate a key pair — a key pair proves you hold the matching private key, not that you're who you claim to be. <strong>PKI (Public Key Infrastructure)</strong> solves this by creating a chain of trust.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: MITM Attack Without PKI</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                    MITM Attack Without PKI                     │
    │                                                                 │
    │    User ──"Wants: yourbank.com"──► Public Wi-Fi               │
    │                                        │                        │
    │                                        ▼                        │
    │                              ┌───────────────────┐             │
    │                              │   Attacker (MITM) │             │
    │                              └───────────────────┘             │
    │                                        │                        │
    │                    ┌───────────────────┴───────────────────┐   │
    │                    │                                       │   │
    │                    ▼                                       ▼   │
    │    Sends attacker's own public key,        Forwards traffic to  │
    │    pretending to be the bank               real bank server,   │
    │                    │                       reading everything  │
    │                    ▼                       in between          │
    │             User encrypts login                                │
    │             to attacker's key                                 │
    │                    │                                           │
    │                    ▼                                           │
    │    ❌ Attacker now has the credentials                        │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
        <div class="info-box warning"><strong>⚠️ The key insight:</strong> A padlock proves encryption, not identity. PKI exists to solve this specific problem.</div>
      `
    },
    {
      id: 's4-certificate-structure',
      title: '4.2 What a Certificate Actually Is — The Structure',
      priority: false,
      icon: '📜',
      bodyHTML: `
        <p>A <strong>digital certificate</strong> binds a public key to an identity (a domain name, an organization) and is digitally signed by a <strong>Certificate Authority (CA)</strong> — a trusted third party whose entire business is vouching for identities.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Certificate Structure</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                     X.509 Certificate                          │
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  Version                                                │   │
    │  ├─────────────────────────────────────────────────────────┤   │
    │  │  Serial Number                                          │   │
    │  ├─────────────────────────────────────────────────────────┤   │
    │  │  Signature Algorithm                                    │   │
    │  ├─────────────────────────────────────────────────────────┤   │
    │  │  Issuer (CA that signed it)                            │   │
    │  ├─────────────────────────────────────────────────────────┤   │
    │  │  Validity (Not Before / Not After)                     │   │
    │  ├─────────────────────────────────────────────────────────┤   │
    │  │  Subject (who the cert is for)                         │   │
    │  ├─────────────────────────────────────────────────────────┤   │
    │  │  Subject Public Key Info                                │   │
    │  ├─────────────────────────────────────────────────────────┤   │
    │  │  Extensions (SAN, Key Usage, etc.)                     │   │
    │  ├─────────────────────────────────────────────────────────┤   │
    │  │  🔑 CA's Digital Signature (over all fields above)     │   │
    │  └─────────────────────────────────────────────────────────┘   │
    │                                                                 │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
        <p>The <strong>signature</strong> is the crucial part — it's created using asymmetric cryptography (Section 1) again: the CA signs the certificate with <em>its own</em> private key. Anyone can verify that signature using the CA's <em>public</em> key, which is bundled directly into every browser and OS.</p>
        <p>A certificate contains, among other fields:</p>
        <ul style="padding-left:1.2rem;margin:0.5rem 0;">
          <li>The domain name(s) it's valid for (Subject Alternative Name)</li>
          <li>The public key it certifies</li>
          <li>The issuing CA's identity</li>
          <li>A validity period (issued date, expiry date)</li>
          <li>A <strong>digital signature</strong> from the CA, over all of the above</li>
        </ul>
      `
    },
    {
      id: 's4-chain-of-trust',
      title: '4.3 The Chain of Trust',
      priority: false,
      icon: '🔗',
      bodyHTML: `
        <p>Browsers don't trust every CA in existence blindly — they ship with a curated list of <strong>root CAs</strong> (root certificates), pre-installed by the browser/OS vendor. Root CAs almost never sign website certificates directly — instead, they sign <strong>intermediate CAs</strong>, which then sign the actual website's certificate. This creates a chain:</p>
        <div class="code-block">
          <pre>
    Root CA (trusted, built into browser)
      └── signs ──► Intermediate CA
                        └── signs ──► yourbank.com's certificate</pre>
        </div>
        <p><strong>Why the extra layer?</strong> If an intermediate CA's key is ever compromised, it can be revoked without invalidating the root CA itself — the root stays offline and protected essentially all the time, minimizing its exposure.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Chain of Trust (Issuance Direction)</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                    Chain of Trust (Issuance)                   │
    │                                                                 │
    │  ┌─────────────────────────────────────────────┐               │
    │  │  Root CA (pre-installed in browser/OS)     │               │
    │  │  ✅ Trusted by default                      │               │
    │  └──────────────────────┬──────────────────────┘               │
    │                         │  signs                               │
    │                         ▼                                      │
    │  ┌─────────────────────────────────────────────┐               │
    │  │  Intermediate CA                            │               │
    │  │  (Signed by root, can be revoked)           │               │
    │  └──────────────────────┬──────────────────────┘               │
    │                         │  signs                               │
    │                         ▼                                      │
    │  ┌─────────────────────────────────────────────┐               │
    │  │  yourbank.com certificate                   │               │
    │  │  (Contains bank's public key)               │               │
    │  └─────────────────────────────────────────────┘               │
    │                                                                 │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Chain of Trust (Validation Direction)</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                    Chain of Trust (Validation)                 │
    │                                                                 │
    │  ┌─────────────────────────────────────────────┐               │
    │  │  yourbank.com certificate                   │               │
    │  │  (Presented during handshake)              │               │
    │  └──────────────────────┬──────────────────────┘               │
    │                         │  verify signature                     │
    │                         ▼                                      │
    │  ┌─────────────────────────────────────────────┐               │
    │  │  Intermediate CA                            │               │
    │  │  (Sent alongside leaf cert)                 │               │
    │  └──────────────────────┬──────────────────────┘               │
    │                         │  verify signature                     │
    │                         ▼                                      │
    │  ┌─────────────────────────────────────────────┐               │
    │  │  Root CA (pre-installed in                  │               │
    │  │  browser's trust store)                     │               │
    │  └──────────────────────┬──────────────────────┘               │
    │                         │                                       │
    │                         ▼                                      │
    │  ┌─────────────────────────────────────────────┐               │
    │  │  ✅ Connection is trusted                    │               │
    │  └─────────────────────────────────────────────┘               │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Certificate type</th><th>Role in the chain</th></tr></thead>
            <tbody>
              <tr><td><strong>Root CA</strong></td><td>The ultimate trust anchor — browsers ship with a pre-installed list of trusted root CAs (managed by Mozilla's CA Certificate Program)</td></tr>
              <tr><td><strong>Intermediate CA</strong></td><td>Signed by the root CA — used to issue leaf certificates; if compromised, can be revoked without revoking the root</td></tr>
              <tr><td><strong>Leaf Certificate</strong></td><td>Issued to your specific domain — contains the server's public key, domain name, expiration date</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 's4-verification',
      title: '4.4 How Browser Verification Actually Works, Step by Step',
      priority: false,
      icon: '🔍',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">Visual: Browser Certificate Validation</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                    Browser Certificate Validation              │
    │                                                                 │
    │  Server sends certificate + intermediate during handshake     │
    │                              │                                  │
    │                              ▼                                  │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  1. Domain match: SAN matches requested domain?        │   │
    │  └─────────────────────────────────────────────────────────┘   │
    │                    │                │                          │
    │                   No                Yes                        │
    │                    │                │                          │
    │                    ▼                ▼                          │
    │  ┌──────────────────────┐  ┌─────────────────────────────┐   │
    │  │ ❌ Show 'Connection  │  │  2. Expiration: Is it        │   │
    │  │   is not private'   │  │     within validity period?  │   │
    │  └──────────────────────┘  └─────────────────────────────┘   │
    │                                      │                │        │
    │                                     No                Yes      │
    │                                      │                │        │
    │                                      ▼                ▼        │
    │                      ┌─────────────────────────────┐          │
    │                      │  3. Chain validation:       │          │
    │                      │     Verify intermediate's   │          │
    │                      │     signature on leaf cert  │          │
    │                      └─────────────────────────────┘          │
    │                                      │                │        │
    │                                     Fails            Succeeds  │
    │                                      │                │        │
    │                                      ▼                ▼        │
    │                      ┌─────────────────────────────┐          │
    │                      │  4. Trust anchor: Verify     │          │
    │                      │     intermediate's cert was  │          │
    │                      │     signed by a trusted root │          │
    │                      └─────────────────────────────┘          │
    │                                      │                │        │
    │                                     Fails            Succeeds  │
    │                                      │                │        │
    │                                      ▼                ▼        │
    │                      ┌─────────────────────────────┐          │
    │                      │  5. Revocation check:       │          │
    │                      │     Is certificate revoked? │          │
    │                      │     (OCSP/CRL)              │          │
    │                      └─────────────────────────────┘          │
    │                                      │                │        │
    │                                     Revoked          Not       │
    │                                      │                │        │
    │                                      ▼                ▼        │
    │                      ┌─────────────────────────────┐          │
    │                      │  ✅ Connection is trusted   │          │
    │                      │     — show padlock         │          │
    │                      └─────────────────────────────┘          │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
        <p><strong>Step-by-step explanation:</strong></p>
        <ol style="padding-left:1.2rem;margin:0.5rem 0;">
          <li>Server sends its certificate <em>and</em> the intermediate CA's certificate during the TLS handshake</li>
          <li>Browser checks: is this certificate's domain name a match for the site I'm trying to reach? (SAN)</li>
          <li>Browser checks: is the certificate within its validity period (not expired, not "not yet valid")?</li>
          <li>Browser verifies the intermediate CA's signature on the site's certificate, using the intermediate CA's public key</li>
          <li>Browser then verifies the intermediate CA's <em>own</em> certificate was signed by a root CA it already trusts (built into its trust store)</li>
          <li>Browser optionally checks revocation status (OCSP or CRL)</li>
          <li>If every link in the chain checks out, the browser shows the padlock. If any link fails, you get the "Your connection is not private" warning</li>
        </ol>
      `
    },
    {
      id: 's4-formats',
      title: '4.5 Certificate Formats',
      priority: false,
      icon: '📄',
      bodyHTML: `
        <p>When working with certificates, you'll encounter different file formats. Here's what they mean:</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Format</th><th>Extension(s)</th><th>Description</th><th>Common use</th></tr></thead>
            <tbody>
              <tr><td><strong>PEM</strong></td><td><code>.pem</code>, <code>.crt</code>, <code>.cer</code></td><td>Base64-encoded, human-readable (starts with <code>-----BEGIN CERTIFICATE-----</code>)</td><td>Most common; used in web servers, Kubernetes secrets, and most Linux tools</td></tr>
              <tr><td><strong>DER</strong></td><td><code>.der</code>, <code>.cer</code></td><td>Binary format (not human-readable)</td><td>Windows systems, some Java keystores</td></tr>
              <tr><td><strong>PKCS#12</strong></td><td><code>.p12</code>, <code>.pfx</code></td><td>Binary bundle containing certificate + private key (password-protected)</td><td>Windows IIS, mutual TLS client certificates</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Converting Between Formats (Handy Reference)</h4>
        <div class="code-block">
          <pre>
    # PEM → DER
    openssl x509 -in cert.pem -outform DER -out cert.der

    # DER → PEM
    openssl x509 -in cert.der -inform DER -out cert.pem

    # PEM → PKCS#12 (cert + key bundle)
    openssl pkcs12 -export -in cert.pem -inkey key.pem -out bundle.p12

    # PKCS#12 → PEM (extract cert and key separately)
    openssl pkcs12 -in bundle.p12 -nokeys -out cert.pem
    openssl pkcs12 -in bundle.p12 -nocerts -out key.pem</pre>
        </div>
      `
    },
    {
      id: 's4-private-key',
      title: '4.6 Private Key Protection',
      priority: false,
      icon: '🔑',
      bodyHTML: `
        <p>The private key is the most sensitive part of the PKI system. If it's stolen, the certificate becomes useless — anyone with the private key can impersonate the server.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Private Key Storage Options</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Method</th><th>Security Level</th><th>Use case</th></tr></thead>
            <tbody>
              <tr><td><strong>Filesystem (plaintext)</strong></td><td>Low</td><td>Development only — never production</td></tr>
              <tr><td><strong>Encrypted filesystem</strong></td><td>Medium</td><td>Small deployments, protected by OS-level encryption</td></tr>
              <tr><td><strong>HSM (Hardware Security Module)</strong></td><td>Very High</td><td>Banking, government, high-security environments — keys never leave the hardware</td></tr>
              <tr><td><strong>TPM (Trusted Platform Module)</strong></td><td>High</td><td>Server hardware with built-in cryptographic coprocessor</td></tr>
              <tr><td><strong>KMS (Key Management Service)</strong></td><td>High</td><td>Cloud environments — AWS KMS, GCP Cloud KMS, Azure Key Vault — keys stored in managed HSM-backed services</td></tr>
              <tr><td><strong>Secrets Manager</strong></td><td>Medium-High</td><td>Storing TLS private keys as encrypted secrets with rotation</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Best practice:</strong> In production, never store private keys in plaintext on disk. Use a KMS, HSM, or at minimum, encrypt the key with a strong passphrase.</div>
      `
    },
    {
      id: 's4-certificate-types',
      title: '4.7 Certificate Types',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Type</th><th>What's verified</th><th>Example use case</th></tr></thead>
            <tbody>
              <tr><td><strong>DV (Domain Validated)</strong></td><td>Only that you control the domain (e.g. via DNS record or email)</td><td>Free certs (Let's Encrypt), personal sites, most of the modern web</td></tr>
              <tr><td><strong>OV (Organization Validated)</strong></td><td>Domain control + verified business registration</td><td>Corporate sites wanting extra legitimacy</td></tr>
              <tr><td><strong>EV (Extended Validation)</strong></td><td>Domain + rigorous legal/business identity verification</td><td>Historically banks; largely deprecated in browser UI today since browsers stopped showing the special green-bar indicator</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box warning"><strong>⚠️ Important:</strong> None of these certificate types guarantee the site itself is trustworthy — only that the domain/identity claim checks out. A padlock means "this is the real domain" not "this domain is safe."</div>
      `
    },
    {
      id: 's4-transparency',
      title: '4.8 Certificate Transparency — A Modern PKI Safeguard',
      priority: false,
      icon: '📊',
      bodyHTML: `
        <p><strong>Certificate Transparency (CT)</strong> is a system that requires CAs to publicly log every certificate they issue. These logs are public, auditable, and append-only.</p>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                    Certificate Transparency Flow               │
    │                                                                 │
    │  CA issues certificate                                         │
    │          │                                                     │
    │          ▼                                                     │
    │  Certificate logged in public CT log                          │
    │          │                                                     │
    │    ┌─────┴─────┐                                              │
    │    │           │                                              │
    │    ▼           ▼                                              │
    │  Browsers/   Anyone can                                       │
    │  Operators   audit the log                                    │
    │  monitor logs  to detect                                      │
    │  for unexpected mis-issuance                                  │
    │  certificates                                                 │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
        <p><strong>Why CT matters:</strong></p>
        <ul style="padding-left:1.2rem;margin:0.5rem 0;">
          <li>If a CA is breached (like DigiNotar), the fraudulent certificates will appear in the public logs</li>
          <li>Domain owners can monitor CT logs for certificates issued for their domain without their knowledge</li>
          <li>Browsers now require CT for all public TLS certificates</li>
        </ul>
        <div class="info-box note"><strong>📌 ACME Protocol:</strong> (Automatic Certificate Management Environment) is how Let's Encrypt and other modern CAs automate issuance. It handles the domain validation and certificate issuance over HTTPS, without manual intervention.</div>
      `
    },
    {
      id: 's4-pitfalls',
      title: '4.9 Common Pitfalls',
      priority: false,
      icon: '⚠️',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pitfall</th><th>Why it happens</th><th>How to avoid</th></tr></thead>
            <tbody>
              <tr><td><strong>Self-signed certificates in production</strong></td><td>No signature from a trusted CA at all — browsers reject or warn loudly</td><td>Use a real CA (Let's Encrypt is free and automatable)</td></tr>
              <tr><td><strong>Expired certificates</strong></td><td>No automated renewal process</td><td>Automate renewal (certbot, cert-manager, ACM)</td></tr>
              <tr><td><strong>Incomplete certificate chain (missing intermediate)</strong></td><td>Server only sends its own cert, not the intermediate</td><td>Configure the server to send the full chain, not just the leaf cert</td></tr>
              <tr><td><strong>Wildcard certificate misuse</strong></td><td>Using one <code>*.example.com</code> cert across too many unrelated subdomains/services</td><td>Scope certificates tightly; a leak on one service shouldn't compromise all subdomains</td></tr>
              <tr><td><strong>Not pinning certificates for high-security mobile apps</strong></td><td>Assuming the OS trust store is always sufficient</td><td>Certificate pinning defends specifically against a compromised or coerced CA issuing a fraudulent cert for your domain</td></tr>
              <tr><td><strong>Trusting any CA blindly</strong></td><td>Assuming "it has a padlock" means "it's safe"</td><td>A padlock only proves <em>encryption + identity of the domain</em>, not that the site itself is trustworthy or non-malicious</td></tr>
              <tr><td><strong>Storing private keys in plaintext</strong></td><td>Convenience; lack of understanding of the risk</td><td>Use KMS, HSM, or at minimum encrypt the key with a passphrase</td></tr>
              <tr><td><strong>Using weak key algorithms</strong></td><td>Legacy systems</td><td>Use RSA-2048+ or ECC (P-256 or higher) for modern security</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Real-World Examples</h4>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><strong>DigiNotar (2011):</strong> a Dutch CA was breached, and the attacker issued fraudulent certificates for domains including <code>*.google.com</code>. These fake certificates were used in real MITM attacks against Iranian internet users. The fallout was severe enough that DigiNotar was removed from every major browser's trust store, effectively ending the company.</li>
          <li><strong>Superfish (2015, revisited from Section 3):</strong> a PKI failure specifically — Lenovo's adware installed its <em>own</em> root CA certificate into the OS trust store on every affected laptop, meaning the adware could silently forge valid-looking certificates for any HTTPS site. This also demonstrates why trust stores should only contain legitimate, audited CAs.</li>
          <li><strong>Let's Encrypt (2015–present):</strong> founded specifically to fix a PKI accessibility problem — before it existed, certificates commonly cost money and required manual, tedious renewal, which pushed many site operators toward the self-signed and expired-cert pitfalls above. Free, automatable, short-lived (90-day) certificates changed the entire industry's default behavior. The <strong>CA/Browser Forum</strong> (the governing body that sets the rules for CAs) now mandates maximum certificate lifetimes of 398 days (≈13 months), pushing the industry toward shorter, more frequently renewed certificates.</li>
        </ul>
      `
    },
    {
      id: 's4-hands-on',
      title: '4.10 Hands-On Practice (Codespace)',
      priority: false,
      icon: '🖥️',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">1. Inspect the full certificate chain for a real site</h4>
        <div class="code-block">
          <pre>
    openssl s_client -connect github.com:443 -showcerts </dev/null 2>/dev/null | grep -E "s:|i:"
    # "s:" = subject (who the cert is for), "i:" = issuer (who signed it)
    # Trace the chain: leaf cert's issuer should match the next cert's subject, and so on up to the root</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">2. Generate your own self-signed certificate (to see what browsers reject and why)</h4>
        <div class="code-block">
          <pre>
    openssl req -x509 -newkey rsa:2048 -keyout selfsigned-key.pem -out selfsigned-cert.pem -days 365 -nodes -subj "/CN=localhost"</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">3. Inspect your self-signed cert's fields</h4>
        <div class="code-block">
          <pre>
    openssl x509 -in selfsigned-cert.pem -noout -text | head -20
    # Notice: issuer and subject are IDENTICAL — this is exactly what marks it as self-signed,
    # and exactly what a browser flags as untrusted (no external CA vouching for it)</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">4. Check a real certificate's validity dates and issuing CA</h4>
        <div class="code-block">
          <pre>
    echo | openssl s_client -connect github.com:443 2>/dev/null | openssl x509 -noout -issuer -dates</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">5. Convert a certificate between formats (if you have one)</h4>
        <div class="code-block">
          <pre>
    # Create a self-signed cert if you don't have one
    openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes

    # Convert PEM to DER
    openssl x509 -in cert.pem -outform DER -out cert.der

    # Convert DER to PEM
    openssl x509 -in cert.der -inform DER -out cert.pem

    # Create a PKCS#12 bundle
    openssl pkcs12 -export -in cert.pem -inkey key.pem -out bundle.p12 -password pass:test123</pre>
        </div>
      `
    },
    {
      id: 's4-devops-connection',
      title: '4.11 DevOps Connection',
      priority: false,
      icon: '⚙️',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>DevOps context</th><th>Where PKI appears</th></tr></thead>
            <tbody>
              <tr><td><strong>cert-manager (Kubernetes)</strong></td><td>Automates the entire chain-of-trust lifecycle — requesting, issuing, and renewing certs from a CA like Let's Encrypt</td></tr>
              <tr><td><strong>Internal CAs (HashiCorp Vault PKI secrets engine)</strong></td><td>Organizations run their own private CA to issue short-lived certs for internal service-to-service mTLS</td></tr>
              <tr><td><strong>AWS ACM</strong></td><td>Managed CA-issued certificates for load balancers, auto-renewed, no manual PEM file handling</td></tr>
              <tr><td><strong>Container image signing (Cosign/Sigstore)</strong></td><td>Uses a similar trust-chain concept — verifying a signature traces back to a trusted identity</td></tr>
              <tr><td><strong>Corporate device management (MDM)</strong></td><td>Company-issued devices often have an internal root CA installed to inspect/proxy corporate traffic</td></tr>
              <tr><td><strong>mTLS in service meshes</strong></td><td>Istio/Linkerd use PKI internally to issue certificates for each service for mutual TLS authentication</td></tr>
              <tr><td><strong>Code signing</strong></td><td>CI/CD pipelines sign build artifacts with code-signing certificates to verify authenticity</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 's4-key-takeaways',
      title: 'Key Takeaways — PKI & Certificate Authorities',
      priority: false,
      icon: '🧠',
      bodyHTML: `
        <div class="mental-model-grid">
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🏛️</span><span class="mental-title">PKI Solves the Trust Problem</span></div>
            <div class="mental-card-body">Encryption alone proves nothing about <strong>identity</strong> — PKI creates a chain of trust to verify who you're talking to.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">📜</span><span class="mental-title">Certificate = Public Key + Identity + Signature</span></div>
            <div class="mental-card-body">A certificate binds a public key to an identity, signed by a CA using asymmetric cryptography (Section 1).</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🔗</span><span class="mental-title">Chain of Trust</span></div>
            <div class="mental-card-body">Browsers trust pre-installed <strong>root CAs</strong>. Everything else chains back: Root → Intermediate → Leaf.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🛡️</span><span class="mental-title">Intermediate Layer Protects the Root</span></div>
            <div class="mental-card-body">If an intermediate is compromised, it can be revoked without invalidating the root CA itself.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">📊</span><span class="mental-title">Certificate Transparency</span></div>
            <div class="mental-card-body">All public certificates are logged. Anyone can detect fraudulent certs.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🔑</span><span class="mental-title">Protect the Private Key</span></div>
            <div class="mental-card-body">Use HSMs, KMS, or encrypted storage in production. Never store private keys in plaintext.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">📄</span><span class="mental-title">Know Your Formats</span></div>
            <div class="mental-card-body">PEM (text), DER (binary), PKCS#12 (bundle) — each has its use case.</div>
          </div>
          <div class="mental-card mental-card-full">
            <div class="mental-card-header"><span class="mental-icon">🚨</span><span class="mental-title">Real Breaches, Real Lessons</span></div>
            <div class="mental-card-body">DigiNotar (breached CA), Superfish (rogue root CA), Let's Encrypt (fixed accessibility) — the trust model's weakest point is often the CA itself, not the cryptographic math.</div>
          </div>
        </div>
      `
    }
  ];

  const SECTION_5_ACCORDIONS = [
    {
      id: 's5-distinction',
      title: '5.1 The Distinction, With a Concrete Scenario',
      priority: false,
      icon: '🚪',
      bodyHTML: `
        <p>Picture an office building. <strong>Authentication</strong> is showing your ID badge at the front door so the guard confirms <em>you are who you claim to be</em>. <strong>Authorization</strong> is separate — once inside, your badge only opens certain doors: your floor, maybe the server room if you're IT staff, but not the CEO's office or the finance vault. You were authenticated once at the entrance, but authorization is checked <em>again, separately</em>, at every single door.</p>
        <p>This distinction gets conflated constantly in casual conversation ("I logged in" vs "I have access"), but they answer fundamentally different questions:</p>
        <ul style="padding-left:1.2rem;margin:0.5rem 0;">
          <li><strong>Authentication (AuthN):</strong> "Who are you?" — verifying identity</li>
          <li><strong>Authorization (AuthZ):</strong> "What are you allowed to do?" — verifying permissions</li>
        </ul>
        <p>A system can authenticate you perfectly (you proved you're really Alice) and still deny you access to something (Alice isn't authorized to view payroll data). These are two separate checks, and conflating them in code or design is a very common, very real security bug.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: AuthN vs AuthZ as Two Separate Gates</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                    AuthN vs AuthZ as Two Gates                 │
    │                                                                 │
    │    User attempts login                                         │
    │           │                                                     │
    │           ▼                                                     │
    │    ┌─────────────────────────────────────────────┐             │
    │    │  Authentication: Are you who you claim?    │             │
    │    └─────────────────────────────────────────────┘             │
    │           │                     │                               │
    │          Fail                   Pass                           │
    │           │                     │                               │
    │           ▼                     ▼                               │
    │    ┌───────────────────┐  ┌─────────────────────────────┐     │
    │    │ 401 Unauthorized  │  │ Authorization: Are you      │     │
    │    │ (identity not    │  │ allowed to do this action?  │     │
    │    │  proven)         │  └─────────────────────────────┘     │
    │    └───────────────────┘           │                     │     │
    │                                   Fail                   Pass   │
    │                                    │                     │     │
    │                                    ▼                     ▼     │
    │                         ┌─────────────────────┐  ┌──────────┐ │
    │                         │ 403 Forbidden       │  │  ✅       │ │
    │                         │ (identity confirmed │  │  Action  │ │
    │                         │  but no permission) │  │  succeeds│ │
    │                         └─────────────────────┘  └──────────┘ │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
        <p>Notice the distinct HTTP status codes — <code>401</code> means "I don't know who you are," <code>403</code> means "I know exactly who you are, and the answer is still no." Mixing these up in an API's error handling is itself a common real-world bug that leaks information.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Status Code</th><th>Meaning</th><th>AuthN/AuthZ</th></tr></thead>
            <tbody>
              <tr><td><code>200 OK</code></td><td>Success</td><td>AuthZ passed</td></tr>
              <tr><td><code>401 Unauthorized</code></td><td>Authentication failed or missing</td><td>AuthN failure</td></tr>
              <tr><td><code>403 Forbidden</code></td><td>Authentication succeeded, but AuthZ failed</td><td>AuthZ failure</td></tr>
              <tr><td><code>404 Not Found</code></td><td>Resource doesn't exist (sometimes used to hide existence from unauthorised users)</td><td>Often AuthZ failure masquerading as 404</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 's5-factors',
      title: '5.2 Authentication Factors',
      priority: false,
      icon: '🔑',
      bodyHTML: `
        <p>Authentication proves identity using one or more "factors":</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Factor type</th><th>Example</th><th>Weakness</th></tr></thead>
            <tbody>
              <tr><td><strong>Something you know</strong></td><td>Password, PIN</td><td>Can be guessed, phished, leaked in a breach</td></tr>
              <tr><td><strong>Something you have</strong></td><td>Phone (SMS code), hardware key (YubiKey), authenticator app</td><td>Can be lost or stolen; SMS specifically vulnerable to SIM-swapping</td></tr>
              <tr><td><strong>Something you are</strong></td><td>Fingerprint, face ID</td><td>Can't be "changed" if compromised — no password reset for your face</td></tr>
            </tbody>
          </table>
        </div>
        <p><strong>Multi-Factor Authentication (MFA)</strong> combines two or more of these categories. Crucially, <em>two passwords</em> is not MFA — that's still one factor type (something you know), just twice. Real MFA requires factors from <em>different</em> categories.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: MFA Flow</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                       MFA Flow                                  │
    │                                                                 │
    │    User enters username + password                             │
    │           │                                                     │
    │           ▼                                                     │
    │    ┌─────────────────────────────────────────────┐             │
    │    │  Factor 1: Something you know               │             │
    │    │  (password)                                 │             │
    │    └─────────────────────────────────────────────┘             │
    │           │                     │                               │
    │         Correct               Incorrect                        │
    │           │                     │                               │
    │           ▼                     ▼                               │
    │    ┌───────────────────┐  ┌───────────────────┐               │
    │    │  Factor 2:        │  │  ❌ Access denied │               │
    │    │  Something you    │  └───────────────────┘               │
    │    │  have (OTP code)  │                                       │
    │    └───────────────────┘                                       │
    │           │                     │                               │
    │         Correct               Incorrect                        │
    │           │                     │                               │
    │           ▼                     ▼                               │
    │    ┌───────────────────┐  ┌───────────────────┐               │
    │    │  ✅ Authenticated │  │  ❌ Access denied │               │
    │    └───────────────────┘  └───────────────────┘               │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
      `
    },
    {
      id: 's5-session-vs-token',
      title: '5.3 Session-Based vs Token-Based Authentication',
      priority: false,
      icon: '🔄',
      bodyHTML: `
        <p>Once you're authenticated, the system needs to remember you across requests — HTTP itself is stateless, so "remembering" has to be built on top.</p>
        <p><strong>Session-based (traditional):</strong> server creates a session record (stored server-side, often in memory or a database) and gives the browser a <strong>session ID</strong> in a cookie. Every request, the browser sends the cookie, and the server looks up the session record to know who you are.</p>
        <ul style="padding-left:1.2rem;margin:0.5rem 0;">
          <li><strong>Pro:</strong> server can instantly revoke a session (just delete the record)</li>
          <li><strong>Con:</strong> doesn't scale easily across multiple servers without a shared session store (like Redis)</li>
        </ul>
        <p><strong>Token-based (JWT — JSON Web Token):</strong> instead of a server-side record, the server issues a signed token containing the user's identity and claims directly inside it. The server doesn't need to "look anything up" — it just verifies the token's signature.</p>
        <ul style="padding-left:1.2rem;margin:0.5rem 0;">
          <li><strong>Pro:</strong> stateless, scales trivially across many servers (no shared session store needed)</li>
          <li><strong>Con:</strong> harder to revoke early — a JWT is valid until it expires, no matter what, unless you build extra infrastructure (a blocklist) specifically to handle revocation, which partially defeats the "stateless" benefit</li>
        </ul>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Session Cookies vs JWT</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                   Session-Based Authentication                 │
    │                                                                 │
    │    Browser                                 Server               │
    │       │                                         │              │
    │       │  Session ID cookie                       │              │
    │       │────────────────────────────────────────►│              │
    │       │                                         │              │
    │       │                                     looks up           │
    │       │                                         │              │
    │       │                                         ▼              │
    │       │                              ┌─────────────────────┐  │
    │       │                              │  Session store      │  │
    │       │                              │  (server-side)      │  │
    │       │                              └─────────────────────┘  │
    │       │                                         │              │
    │       │                                   returns:             │
    │       │                                   "user=alice"        │
    │       │                                         │              │
    │       │◄────────────────────────────────────────│              │
    │                                                                 │
    └─────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────────────┐
    │                   Token-Based (JWT) Authentication             │
    │                                                                 │
    │    Browser                                 Server               │
    │       │                                         │              │
    │       │  JWT (self-contained, signed)            │              │
    │       │────────────────────────────────────────►│              │
    │       │                                         │              │
    │       │                               verifies signature       │
    │       │                               no lookup needed         │
    │       │                                         │              │
    │       │◄────────────────────────────────────────│              │
    │                                                                 │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: JWT Structure</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                       JWT Structure                            │
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  HEADER (Base64Url)                                     │   │
    │  │  {"alg":"HS256","typ":"JWT"}                            │   │
    │  └─────────────────────────────────────────────────────────┘   │
    │                              │                                  │
    │                              ▼                                  │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  PAYLOAD (Base64Url)                                    │   │
    │  │  {"sub":"123","name":"Alice","role":"admin"}            │   │
    │  └─────────────────────────────────────────────────────────┘   │
    │                              │                                  │
    │                              ▼                                  │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  SIGNATURE (HMAC-SHA256)                                │   │
    │  │  (verifies header + payload weren't altered)            │   │
    │  └─────────────────────────────────────────────────────────┘   │
    │                                                                 │
    │  ═══════════════════════════════════════════════════════════    │
    │                                                                 │
    │  🔑 JWT is SIGNED, NOT encrypted — anyone can read the        │
    │     payload. Only tampering is prevented.                     │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
      `
    },
    {
      id: 's5-refresh-tokens',
      title: '5.4 Refresh Tokens — The Complete Picture',
      priority: false,
      icon: '🔄',
      bodyHTML: `
        <p>JWTs have a natural tension: short expiry is secure (less window for abuse) but annoying for users; long expiry is convenient but risky. <strong>Refresh tokens</strong> solve this:</p>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                    Refresh Token Flow                          │
    │                                                                 │
    │    Client                               Auth Server             │
    │       │                                         │              │
    │       │  1. Login (username + password)         │              │
    │       │────────────────────────────────────────►│              │
    │       │                                         │              │
    │       │  2. Access Token (short-lived) +        │              │
    │       │     Refresh Token (long-lived)          │              │
    │       │◄────────────────────────────────────────│              │
    │       │                                         │              │
    │       │  3. API Request with Access Token       │              │
    │       │────────────────────────────────────────►│              │
    │       │                                         │              │
    │       │  4. Response (or 401 if expired)        │              │
    │       │◄────────────────────────────────────────│              │
    │       │                                         │              │
    │       │  5. Exchange Refresh Token for new      │              │
    │       │     Access Token                        │              │
    │       │────────────────────────────────────────►│              │
    │       │                                         │              │
    │       │  6. New Access Token (and optionally    │              │
    │       │     new Refresh Token)                  │              │
    │       │◄────────────────────────────────────────│              │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Token type</th><th>Lifetime</th><th>Purpose</th><th>Storage</th></tr></thead>
            <tbody>
              <tr><td><strong>Access Token</strong></td><td>Short (15-60 min)</td><td>Authorise API requests</td><td>Client (memory or httpOnly cookie)</td></tr>
              <tr><td><strong>Refresh Token</strong></td><td>Long (days to months)</td><td>Get new Access Tokens without re-login</td><td>Secure, often stored server-side or in httpOnly cookie</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Best practice:</strong> Store Access Tokens in memory (not localStorage) and Refresh Tokens in httpOnly cookies to prevent XSS theft.</div>
      `
    },
    {
      id: 's5-authz-concepts',
      title: '5.5 Authorization Concepts',
      priority: false,
      icon: '🛡️',
      bodyHTML: `
        <p>Authorization decides what an authenticated identity can <em>do</em>.</p>
        <p><strong>Role-Based Access Control (RBAC):</strong> users are assigned roles (<code>admin</code>, <code>editor</code>, <code>viewer</code>), and permissions attach to the role, not the individual user. Adding a new admin is just "assign the admin role" — no need to individually configure dozens of permissions per person. (Full access control models, including RBAC in depth, are covered in Section 6.)</p>
        <p><strong>Common real-world confusion:</strong> many systems check <em>authentication</em> ("is this a logged-in user?") when they actually needed to check <em>authorization</em> ("is this logged-in user allowed to edit THIS specific resource?"). This exact gap is the root cause of a huge class of real vulnerabilities, covered concretely below.</p>
      `
    },
    {
      id: 's5-oauth-teaser',
      title: '5.6 OAuth 2.0 and OpenID Connect — Teaser',
      priority: false,
      icon: '🔗',
      bodyHTML: `
        <p>You've probably used "Login with Google" or "Login with GitHub" — that's <strong>OAuth 2.0</strong> and <strong>OpenID Connect (OIDC)</strong> in action.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Protocol</th><th>Purpose</th><th>What it gives you</th></tr></thead>
            <tbody>
              <tr><td><strong>OAuth 2.0</strong></td><td>Authorization</td><td>Delegated access — "This app can read my Google Drive files"</td></tr>
              <tr><td><strong>OpenID Connect</strong></td><td>Authentication</td><td>Identity verification — "This user is really alice@gmail.com"</td></tr>
              <tr><td><strong>JWT</strong></td><td>Token format</td><td>A specific way to encode and sign claims</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box note"><strong>📌 Note:</strong> JWT is a token format, OAuth is a protocol. They're not the same thing — OAuth can use JWTs (and often does), but JWTs can be used independently of OAuth. We'll cover OAuth and OIDC in detail in later sections.</div>
      `
    },
    {
      id: 's5-pitfalls',
      title: '5.7 Common Pitfalls',
      priority: false,
      icon: '⚠️',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pitfall</th><th>Why it happens</th><th>How to avoid</th></tr></thead>
            <tbody>
              <tr><td><strong>Broken Object Level Authorization (BOLA/IDOR)</strong></td><td>Checking "is user logged in" but not "does this user own THIS specific resource"</td><td>Explicitly verify resource ownership on every request, not just login status</td></tr>
              <tr><td><strong>Storing JWTs in localStorage</strong></td><td>Convenient for frontend developers</td><td>Vulnerable to XSS-based token theft; prefer httpOnly cookies where possible</td></tr>
              <tr><td><strong>Never expiring sessions/tokens</strong></td><td>Convenience, avoiding "annoying" re-logins</td><td>Set reasonable expiry; use refresh tokens for longer-lived sessions</td></tr>
              <tr><td><strong>Treating "authenticated" as "authorized for everything"</strong></td><td>Conflating the two concepts in code</td><td>Always check authorization separately and explicitly, per action/resource</td></tr>
              <tr><td><strong>SMS-based MFA treated as equally strong as an authenticator app</strong></td><td>Assuming all MFA is equivalent</td><td>SIM-swapping defeats SMS MFA; prefer app-based or hardware-key MFA for sensitive accounts</td></tr>
              <tr><td><strong>Putting secrets in JWT payloads</strong></td><td>Assuming JWT is encrypted</td><td>JWT is signed, NOT encrypted — anyone can read the payload</td></tr>
              <tr><td><strong>Not validating JWT signature</strong></td><td>Assuming any token is valid</td><td>Always verify signature using the server's secret or public key</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: IDOR Attack Pattern</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                    IDOR Attack Pattern                         │
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  The Attack                                               │   │
    │  │                                                          │   │
    │  │  Attacker is logged in (authenticated)                   │   │
    │  │           │                                              │   │
    │  │           ▼                                              │   │
    │  │  GET /api/invoices/12345                                 │   │
    │  │           │                                              │   │
    │  │           ▼                                              │   │
    │  │  Server checks: Is user logged in? ✅                   │   │
    │  │           │                                              │   │
    │  │           ▼                                              │   │
    │  │  Server returns invoice 12345                            │   │
    │  │  (never checked if owner = attacker)                    │   │
    │  │                                                          │   │
    │  │  ❌ Attacker sees someone else's data                    │   │
    │  └─────────────────────────────────────────────────────────┘   │
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  Proper Authorization                                    │   │
    │  │                                                          │   │
    │  │  Attacker requests: GET /api/invoices/12345             │   │
    │  │           │                                              │   │
    │  │           ▼                                              │   │
    │  │  Server checks: Is user logged in? ✅                   │   │
    │  │           │                                              │   │
    │  │           ▼                                              │   │
    │  │  Server checks: Does user OWN invoice 12345?            │   │
    │  │           │                                              │   │
    │  │           ▼                                              │   │
    │  │  Owner mismatch → 403 Forbidden                         │   │
    │  │                                                          │   │
    │  │  ✅ Attacker blocked                                     │   │
    │  └─────────────────────────────────────────────────────────┘   │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Real-World Examples</h4>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><strong>IDOR / BOLA vulnerabilities</strong> are so common they've topped the OWASP API Security Top 10 for years (full OWASP coverage in Sections 7–8). Classic pattern: an API endpoint like <code>GET /api/invoices/12345</code> checks that you're <em>logged in</em>, but never checks that invoice <code>12345</code> actually <em>belongs to you</em>. Simply changing the number in the URL — no hacking tools required, just editing a number — lets any logged-in user view or edit anyone else's data. This exact bug has been found in production at major companies repeatedly; it's less "exotic exploit" and more "someone forgot one <code>if</code> statement."</li>
          <li><strong>Twitter's 2020 breach:</strong> attackers used social engineering to gain access to an internal admin tool. Once <em>authenticated</em> as an employee (via a phished credential), the tool's <em>authorization</em> model apparently didn't sufficiently limit which accounts that access could touch, allowing high-profile account takeovers used to tweet a crypto scam.</li>
        </ul>
      `
    },
    {
      id: 's5-hands-on',
      title: '5.8 Hands-On Practice (Codespace)',
      priority: false,
      icon: '🖥️',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">1. Decode a JWT's structure (JWTs are base64, NOT encrypted!)</h4>
        <div class="code-block">
          <pre>
    # A JWT looks like: header.payload.signature

    # Decode the header
    echo '{"alg":"HS256","typ":"JWT"}' | base64

    # Decode the payload
    echo '{"sub":"1234567890","name":"Alice","role":"admin"}' | base64

    # Notice: this is BASE64, not encryption — anyone can decode and READ a JWT's contents.
    # Only the SIGNATURE prevents tampering; the payload itself is fully readable by anyone.</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">2. Generate a signature to see what "signing" a token means</h4>
        <div class="code-block">
          <pre>
    # Sign a payload with HMAC-SHA256
    echo -n '{"sub":"1234567890","role":"admin"}' | openssl dgst -sha256 -hmac "supersecretkey"
    # This HMAC is conceptually what a JWT signature is — proof the payload wasn't altered,
    # without encrypting the payload itself</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">3. Verify a signature (simulate server-side validation)</h4>
        <div class="code-block">
          <pre>
    # Step 1: Original payload
    PAYLOAD='{"sub":"1234567890","role":"admin"}'
    SECRET="supersecretkey"

    # Step 2: Compute signature
    SIGNATURE=$(echo -n "$PAYLOAD" | openssl dgst -sha256 -hmac "$SECRET" | awk '{print $2}')
    echo "Original signature: $SIGNATURE"

    # Step 3: Attacker tampers with payload
    TAMPERED='{"sub":"1234567890","role":"superadmin"}'
    NEW_SIG=$(echo -n "$TAMPERED" | openssl dgst -sha256 -hmac "$SECRET" | awk '{print $2}')
    echo "Tampered signature: $NEW_SIG"

    # The signatures don't match! The server would detect tampering immediately.</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">4. Notice the avalanche effect</h4>
        <div class="code-block">
          <pre>
    # Change one character in the payload
    PAYLOAD1='{"role":"admin"}'
    PAYLOAD2='{"role":"Admin"}'  # Capital A

    echo -n "$PAYLOAD1" | openssl dgst -sha256 -hmac "secret"
    echo -n "$PAYLOAD2" | openssl dgst -sha256 -hmac "secret"
    # The HMAC outputs are completely different — one character change = totally different signature</pre>
        </div>
        <div class="info-box warning"><strong>⚠️ Important realization from exercise 1:</strong> a JWT is <em>not</em> encrypted, just base64-encoded and signed. This is a very common misconception — never put secrets inside a JWT payload assuming they're hidden. They're plainly readable by anyone who intercepts the token; only tampering is prevented, not reading.</div>
      `
    },
    {
      id: 's5-devops-connection',
      title: '5.9 DevOps Connection',
      priority: false,
      icon: '⚙️',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>DevOps context</th><th>Where AuthN/AuthZ appears</th></tr></thead>
            <tbody>
              <tr><td><strong>Kubernetes RBAC</strong></td><td>Every <code>kubectl</code> action is checked against Role/ClusterRole bindings — pure authorization, layered on top of authentication (via certs or tokens)</td></tr>
              <tr><td><strong>CI/CD pipeline secrets</strong></td><td>Pipeline runners authenticate to cloud providers via service accounts/tokens, then are authorized only for specific scoped actions</td></tr>
              <tr><td><strong>API Gateways</strong></td><td>Commonly centralize authentication (verify the JWT) while delegating fine-grained authorization to each backend service</td></tr>
              <tr><td><strong>SSO (Single Sign-On) in enterprises</strong></td><td>One authentication event (e.g. via SAML/OIDC) grants access across many separate tools, each still enforcing its own authorization rules</td></tr>
              <tr><td><strong>GitHub/GitLab repo permissions</strong></td><td>Classic RBAC in action — Owner/Maintainer/Developer/Reporter roles each authorized for different actions on the same authenticated account</td></tr>
              <tr><td><strong>Service accounts in cloud</strong></td><td>AWS IAM roles, GCP service accounts — authentication via credentials, authorization via policies (covered in Section 6)</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 's5-key-takeaways',
      title: 'Key Takeaways — Authentication vs Authorization',
      priority: false,
      icon: '🧠',
      bodyHTML: `
        <div class="mental-model-grid">
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🚪</span><span class="mental-title">AuthN ≠ AuthZ</span></div>
            <div class="mental-card-body">Authentication answers <strong>"who are you"</strong>; authorization answers <strong>"what can you do"</strong>. They are separate checks, and conflating them is a serious class of bug.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">📊</span><span class="mental-title">401 vs 403</span></div>
            <div class="mental-card-body"><code>401</code> = authentication failed (identity unknown). <code>403</code> = authentication succeeded, authorization failed.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🔑</span><span class="mental-title">MFA Requires Different Factors</span></div>
            <div class="mental-card-body">Real MFA requires factors from <strong>different</strong> categories (know/have/are). Two passwords is not MFA.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🔄</span><span class="mental-title">Session vs JWT</span></div>
            <div class="mental-card-body">Session-based auth is stateful and revocable. JWT auth is stateless, scales better, but is harder to revoke.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🔓</span><span class="mental-title">JWT is Signed, Not Encrypted</span></div>
            <div class="mental-card-body">Anyone can read a JWT's payload (base64). <strong>Only tampering is prevented</strong> by the signature.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🔄</span><span class="mental-title">Refresh Tokens</span></div>
            <div class="mental-card-body">Access token (short-lived) + Refresh token (long-lived) = secure + convenient. Refresh tokens get new access tokens without re-login.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🎯</span><span class="mental-title">IDOR/BOLA</span></div>
            <div class="mental-card-body">Checking login but not resource ownership is one of the most common authorization vulnerabilities. Always verify ownership.</div>
          </div>
          <div class="mental-card mental-card-full">
            <div class="mental-card-header"><span class="mental-icon">🚨</span><span class="mental-title">Real-World Incidents</span></div>
            <div class="mental-card-body">Twitter 2020 breach showed that authentication compromise plus weak authorization scope multiplies the blast radius of a single stolen credential. <strong>Authenticated ≠ Authorized.</strong></div>
          </div>
        </div>
      `
    }
  ];

  const SECTION_6_ACCORDIONS = [
    {
      id: 's6-principle',
      title: '6.1 The Principle, With a Concrete Scenario',
      priority: false,
      icon: '🛡️',
      bodyHTML: `
        <p>Say a junior developer needs to deploy code to a staging server. The lazy approach: give them full admin access to the entire production AWS account, because "it's easier than figuring out exactly what they need." Six months later, that developer's laptop gets phished. Because their account had full admin rights, the attacker now has full admin rights too — over production databases, billing, IAM, everything — not because the attacker was sophisticated, but because nobody scoped the original access down.</p>
        <p><strong>Principle of Least Privilege (PoLP):</strong> every user, process, or system should have the <em>minimum</em> access necessary to do its job — nothing more. Not "access I might need someday." Not "access that's convenient." The minimum, full stop.</p>
        <p>This sounds obvious stated plainly, but it's violated constantly in practice because scoping access down takes deliberate effort, while granting broad access is the path of least resistance in the moment. The 2017 Equifax breach and countless smaller incidents trace back to exactly this: a service or account had far more access than its actual job required, and that excess access is precisely what an attacker exploited once they got in anywhere.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Blast Radius With and Without Least Privilege</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │            Blast Radius With and Without Least Privilege        │
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  Overprivileged Account Compromised                     │   │
    │  │                                                          │   │
    │  │  Phished developer account ──► Attacker has FULL admin  │   │
    │  │  (has FULL admin)                       │              │   │
    │  │                                          ▼              │   │
    │  │                          Access: prod DB, billing,     │   │
    │  │                          IAM, all services             │   │
    │  │                                                          │   │
    │  │  ❌ Blast radius: ENTIRE ACCOUNT                        │   │
    │  └─────────────────────────────────────────────────────────┘   │
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  Least-Privilege Account Compromised                    │   │
    │  │                                                          │   │
    │  │  Phished developer account ──► Attacker can access:    │   │
    │  │  (scoped to staging deploy only)        │              │   │
    │  │                                          ▼              │   │
    │  │                          Access: staging environment    │   │
    │  │                          only                          │   │
    │  │                                                          │   │
    │  │  ✅ Blast radius: LIMITED TO STAGING                    │   │
    │  └─────────────────────────────────────────────────────────┘   │
    │                                                                 │
    │  💡 Key insight: The account gets compromised either way.      │
    │     Least privilege limits the blast radius, not the breach.   │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
        <div class="info-box tip"><strong>💡 Key insight:</strong> Least privilege is about <strong>limiting blast radius</strong>, not about preventing breaches entirely. Assume breach somewhere; design so it can't go everywhere.</div>
      `
    },
    {
      id: 's6-models',
      title: '6.2 Access Control Models',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <p>There are several standard models for actually implementing "who can do what." Each solves the same underlying problem differently.</p>
        
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">RBAC — Role-Based Access Control</h4>
        <p>Permissions are attached to <strong>roles</strong>, and users are assigned roles. You don't configure permissions per-person; you configure them per-role, then assign people to roles.</p>
        <p><strong>Worked example:</strong> at a company, the roles might be <code>viewer</code>, <code>editor</code>, <code>admin</code>. <code>editor</code> can create and modify documents but not delete users. <code>admin</code> can do both. When Alice joins as a new editor, she's simply assigned the <code>editor</code> role — she instantly inherits exactly the right permission set, no manual configuration per person.</p>
        <ul style="padding-left:1.2rem;margin:0.5rem 0;">
          <li><strong>Pro:</strong> scales cleanly as organizations grow — managing 10 roles is far simpler than managing custom permissions for 10,000 individual employees</li>
          <li><strong>Con:</strong> can become rigid — "role explosion" happens when edge cases pile up and you end up creating dozens of hyper-specific roles to handle exceptions</li>
        </ul>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Role Explosion</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                      Role Explosion                             │
    │                                                                 │
    │                    ┌─────────────────────────┐                 │
    │                    │      Editor             │                 │
    │                    └─────────────────────────┘                 │
    │                              │                                  │
    │          ┌───────────────────┼───────────────────┐             │
    │          ▼                   ▼                   ▼             │
    │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐     │
    │  │ Editor-EMEA   │  │ Editor-APAC   │  │ Editor-Prod   │     │
    │  └───────────────┘  └───────────────┘  └───────────────┘     │
    │          │                   │                   │             │
    │          ▼                   ▼                   ▼             │
    │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐     │
    │  │ Editor-Prod-  │  │ Editor-Prod-  │  │ Editor-Prod-  │     │
    │  │ EMEA          │  │ ReadOnly      │  │ ReadOnly-EMEA │     │
    │  └───────────────┘  └───────────────┘  └───────────────┘     │
    │                              │                                  │
    │                              ▼                                  │
    │                    ┌─────────────────────────┐                 │
    │                    │  ❌ Too many roles!      │                 │
    │                    └─────────────────────────┘                 │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
        
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">ABAC — Attribute-Based Access Control</h4>
        <p>Permissions are decided dynamically based on <strong>attributes</strong> of the user, resource, and context — not a fixed role.</p>
        <p><strong>Worked example:</strong> "Allow access to this document IF the user's department attribute matches the document's department tag, AND the request is coming from a corporate IP address, AND it's during business hours." None of that is a fixed "role" — it's a real-time policy evaluation across multiple attributes.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: ABAC Attributes</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                      ABAC Attributes                            │
    │                                                                 │
    │  ┌─────────────────────┐  ┌─────────────────────────────────┐  │
    │  │  User Attributes    │  │  Resource Attributes            │  │
    │  │                     │  │                                 │  │
    │  │  Department: Finance│  │  Department: Finance            │  │
    │  │  Clearance: Secret  │  │  Classification: Secret        │  │
    │  │  Location: Office   │  │  Owner: Alice                  │  │
    │  └─────────────────────┘  └─────────────────────────────────┘  │
    │           │                           │                         │
    │           └───────────┬───────────────┘                         │
    │                       ▼                                         │
    │  ┌─────────────────────┐  ┌─────────────────────────────────┐  │
    │  │  Context Attributes │  │  Policy Engine                  │  │
    │  │                     │  │                                 │  │
    │  │  Time: Business hrs │  │  ┌─────────────────────────┐   │  │
    │  │  IP: Corporate      │  │  │  All conditions match?  │   │  │
    │  │  Device: Company    │  │  └─────────────────────────┘   │  │
    │  │  laptop             │  │           │                     │  │
    │  └─────────────────────┘  │           ▼                     │  │
    │                           │  ✅ Access granted               │  │
    │                           └─────────────────────────────────┘  │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
        <ul style="padding-left:1.2rem;margin:0.5rem 0;">
          <li><strong>Pro:</strong> far more granular and context-aware than RBAC</li>
          <li><strong>Con:</strong> significantly more complex to design, audit, and reason about — harder to answer "who can access X" at a glance, since the answer depends on live context</li>
        </ul>
        
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">ACL — Access Control Lists</h4>
        <p>Permissions attached directly to individual resources, listing exactly which users/groups can perform which actions on that specific resource.</p>
        <p><strong>Worked example:</strong> a specific file on a Linux server has an ACL saying "user alice: read+write, group finance: read-only, everyone else: no access." This is per-resource, not per-role.</p>
        <ul style="padding-left:1.2rem;margin:0.5rem 0;">
          <li><strong>Pro:</strong> very precise, fine-grained control over individual resources</li>
          <li><strong>Con:</strong> doesn't scale — managing thousands of files each with their own custom ACL becomes unmanageable at scale, unlike RBAC's "assign a role once" model</li>
        </ul>
        
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Three Models Side by Side</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                Three Access Control Models Side by Side         │
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  RBAC (Role-Based)                                       │   │
    │  │                                                          │   │
    │  │  User: Alice ───► Role: Editor ───► Permissions:       │   │
    │  │                                    read, write, delete  │   │
    │  └─────────────────────────────────────────────────────────┘   │
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  ABAC (Attribute-Based)                                  │   │
    │  │                                                          │   │
    │  │  User: Alice      ───┐                                  │   │
    │  │  Dept: Finance         │                                 │   │
    │  │  Resource: doc123   ───┼──► Policy Engine ──► Access   │   │
    │  │  Dept: Finance         │    (real-time)    granted/    │   │
    │  │  Context: 10am,     ───┘                   denied     │   │
    │  │  Office IP                                             │   │
    │  └─────────────────────────────────────────────────────────┘   │
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  ACL (Access Control List)                              │   │
    │  │                                                          │   │
    │  │  Resource: file.txt                                     │   │
    │  │    ├── Alice: rw                                       │   │
    │  │    ├── Finance: r                                      │   │
    │  │    └── Others: none                                    │   │
    │  └─────────────────────────────────────────────────────────┘   │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
      `
    },
    {
      id: 's6-separation-duties',
      title: '6.3 Separation of Duties',
      priority: false,
      icon: '🔀',
      bodyHTML: `
        <p>A related concept: <strong>Separation of Duties (SoD)</strong> ensures that no single person has enough access to perform a critical action alone. This prevents fraud, errors, and insider threats.</p>
        <p><strong>Example:</strong> In financial systems, one person shouldn't be able to both request and approve a payment. In DevOps, the same person shouldn't be able to both write code and deploy it to production without a review.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th></th><th>Least Privilege</th><th>Separation of Duties</th></tr></thead>
            <tbody>
              <tr><td><strong>Focus</strong></td><td>Limit access scope</td><td>Distribute critical access across multiple people</td></tr>
              <tr><td><strong>Goal</strong></td><td>Reduce blast radius</td><td>Prevent unilateral action</td></tr>
              <tr><td><strong>Example</strong></td><td>Developer only has staging access</td><td>Require two-person approval for production deployments</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 's6-zero-trust',
      title: '6.4 Zero Trust — A Related, Broader Philosophy',
      priority: false,
      icon: '🌐',
      bodyHTML: `
        <p>Least privilege is one piece of a broader philosophy called <strong>Zero Trust</strong>: "never trust, always verify." Traditional network security assumed anything <em>inside</em> the corporate firewall was trustworthy — the "castle and moat" model. Zero Trust rejects this assumption entirely: every request, from anywhere, internal or external, is authenticated and authorized <em>every time</em>, as if the network itself is hostile.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Zero Trust vs Castle and Moat</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                Castle and Moat vs Zero Trust                   │
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  Castle and Moat                                         │   │
    │  │                                                          │   │
    │  │  User ──► ✅ Corporate Network ──► ✅ Trusted by default│   │
    │  │                                          │              │   │
    │  │                                          ▼              │   │
    │  │                          ❌ Once inside, can move freely│   │
    │  │                                                          │   │
    │  │  Problem: Breach the moat → breach everything           │   │
    │  └─────────────────────────────────────────────────────────┘   │
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  Zero Trust                                              │   │
    │  │                                                          │   │
    │  │  User ──► 🌐 Any Network ──► 🔐 Authenticate every     │   │
    │  │                              request                    │   │
    │  │                              │                          │   │
    │  │                              ▼                          │   │
    │  │                         🔑 Authorize every request     │   │
    │  │                              │                          │   │
    │  │                              ▼                          │   │
    │  │                         ✅ Only specific access        │   │
    │  │                            granted                     │   │
    │  │                                                          │   │
    │  │  Benefit: Breach is contained; no free movement         │   │
    │  └─────────────────────────────────────────────────────────┘   │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
        <p>This matters practically because internal networks get breached constantly — once an attacker is "inside" the moat in a castle-and-moat model, they often have free rein. Zero Trust assumes breach is inevitable somewhere, and designs so that a breach in one place doesn't cascade everywhere.</p>
      `
    },
    {
      id: 's6-service-accounts',
      title: '6.5 Service Account Rotation',
      priority: false,
      icon: '🤖',
      bodyHTML: `
        <p>Service accounts (used by CI/CD pipelines, automated jobs, and system daemons) are a special case of least privilege — they're even more dangerous because they often have no human review process.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Best practice</th><th>Why it matters</th></tr></thead>
            <tbody>
              <tr><td><strong>Short-lived credentials</strong></td><td>Reduce the window of opportunity if credentials are compromised</td></tr>
              <tr><td><strong>Automated rotation</strong></td><td>Eliminates the human failure point of "I forgot to rotate"</td></tr>
              <tr><td><strong>Scoped permissions</strong></td><td>Exactly the actions the pipeline needs, nothing more</td></tr>
              <tr><td><strong>Audit trail</strong></td><td>Know when and how service accounts are used</td></tr>
              <tr><td><strong>Human review</strong></td><td>Don't let service accounts run forever without review</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Cloud example:</strong> AWS recommends using IAM roles (not long-term access keys) for EC2 instances and services. The role credentials are automatically rotated by the service.</div>
      `
    },
    {
      id: 's6-privilege-escalation',
      title: '6.6 Privilege Escalation — What Least Privilege Defends Against',
      priority: false,
      icon: '📈',
      bodyHTML: `
        <p><strong>Privilege escalation</strong> is an attack where an attacker gains access to a low-privilege account and then exploits a vulnerability to gain higher privileges (e.g., admin).</p>
        <p>Least privilege defends against this in two ways:</p>
        <ol style="padding-left:1.2rem;margin:0.5rem 0;">
          <li><strong>Vertical privilege escalation:</strong> A low-privilege user can't become admin if there are no admin capabilities to exploit — the "admin" role shouldn't be accessible from a normal user's session</li>
          <li><strong>Horizontal privilege escalation:</strong> A user in one department shouldn't be able to access another department's data even if they're both "regular users" — because resource ownership checks are part of authorization</li>
        </ol>
      `
    },
    {
      id: 's6-pitfalls',
      title: '6.7 Common Pitfalls',
      priority: false,
      icon: '⚠️',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pitfall</th><th>Why it happens</th><th>How to avoid</th></tr></thead>
            <tbody>
              <tr><td><strong>Granting broad access "to be safe" / "just in case"</strong></td><td>Convenience, avoiding future access requests</td><td>Grant exactly what's needed now; expand only when a real, specific need arises</td></tr>
              <tr><td><strong>Never auditing/rotating old permissions</strong></td><td>"Set and forget" mentality</td><td>Periodic access reviews — remove permissions from roles/people who no longer need them</td></tr>
              <tr><td><strong>Shared admin accounts across a team</strong></td><td>Convenience, avoiding individual account setup</td><td>Individual accounts per person, even if they share the same role — enables accountability and easy revocation</td></tr>
              <tr><td><strong>Over-scoped service accounts</strong></td><td>Easier than scoping exact permissions needed</td><td>Scope service accounts to the minimum actions that specific pipeline actually performs</td></tr>
              <tr><td><strong>Role explosion in RBAC</strong></td><td>Handling every edge case with a new custom role</td><td>Consider ABAC for genuinely dynamic/contextual access needs instead of endless new roles</td></tr>
              <tr><td><strong>Confusing "authenticated" with "should have broad access"</strong></td><td>Conflating AuthN and AuthZ (Section 5) again</td><td>Authorization must be scoped deliberately, regardless of how strong authentication was</td></tr>
              <tr><td><strong>Long-lived service account keys</strong></td><td>Easier than implementing rotation</td><td>Use short-lived credentials (IAM roles, workload identity, OIDC) where possible</td></tr>
              <tr><td><strong>Not separating duties</strong></td><td>One person does everything</td><td>Enforce approval workflows for critical actions (e.g., deployment approvals)</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Real-World Examples</h4>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><strong>Equifax (2017):</strong> attackers exploited an unpatched web application vulnerability, but the breach became catastrophic (147 million people's data) partly because the compromised system had far more access to sensitive internal databases than its actual function required — a textbook least-privilege failure compounding a separate vulnerability.</li>
          <li><strong>Capital One (2019):</strong> a former AWS employee exploited a misconfigured web application firewall to assume an overly-permissive IAM role, which then had access to far more S3 storage than that specific application actually needed — the initial entry point was one flaw, but the <em>scale</em> of the breach (100+ million records) was a direct consequence of that role's excessive scope.</li>
          <li><strong>Target (2013):</strong> attackers initially breached the network through a third-party HVAC (heating/cooling) vendor's credentials. Those vendor credentials should never have had a path into payment systems at all — a clear least-privilege and network segmentation failure, letting a small, unrelated vendor access balloon into a massive breach of 40 million credit cards.</li>
        </ul>
      `
    },
    {
      id: 's6-hands-on',
      title: '6.8 Hands-On Practice (Codespace)',
      priority: false,
      icon: '🖥️',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">1. Inspect Linux file permissions</h4>
        <div class="code-block">
          <pre>
    touch secret-config.txt
    ls -l secret-config.txt
    # Notice the rwx permission bits for owner/group/others</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">2. Restrict a file to owner-only access</h4>
        <div class="code-block">
          <pre>
    chmod 600 secret-config.txt
    ls -l secret-config.txt
    # Now only the file owner can read/write it — group and others have zero access</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">3. View and set Linux ACLs (finer-grained permissions)</h4>
        <div class="code-block">
          <pre>
    # View current ACLs
    getfacl secret-config.txt

    # Add a specific user with read permission
    setfacl -m u:alice:r secret-config.txt

    # Verify the ACL was applied
    getfacl secret-config.txt
    # Now Alice has read access even if she's not the owner or in the group</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">4. Simulate role-based grouping using Linux groups</h4>
        <div class="code-block">
          <pre>
    # Create a group
    sudo groupadd deployers

    # Add yourself to the group
    sudo usermod -aG deployers $(whoami)

    # Check your groups
    groups
    # In real systems, group membership is exactly the RBAC pattern —
    # permissions attach to the group ("role"), users are added to it</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">5. Check what sudo privileges your current user actually has</h4>
        <div class="code-block">
          <pre>
    sudo -l
    # This shows exactly which commands your account is authorized to run as another user —
    # a live, practical example of scoped authorization</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">6. Create a file with group-based permissions (RBAC simulation)</h4>
        <div class="code-block">
          <pre>
    # Create a file
    touch shared-file.txt

    # Set group ownership to the deployers group
    sudo chown :deployers shared-file.txt

    # Set permissions: owner rw, group rw, others none
    chmod 660 shared-file.txt

    # Verify
    ls -l shared-file.txt
    # -rw-rw---- 1 user deployers 0 date shared-file.txt</pre>
        </div>
      `
    },
    {
      id: 's6-devops-connection',
      title: '6.9 DevOps Connection',
      priority: false,
      icon: '⚙️',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>DevOps context</th><th>Where least privilege / access control models appear</th></tr></thead>
            <tbody>
              <tr><td><strong>AWS IAM policies</strong></td><td>The canonical example — scoping a role to exactly the S3 buckets/EC2 actions it needs, nothing more</td></tr>
              <tr><td><strong>Kubernetes RBAC</strong></td><td>Roles and RoleBindings scope exactly which pods/namespaces a service account can touch</td></tr>
              <tr><td><strong>Terraform Cloud/Enterprise workspace permissions</strong></td><td>Different teams get scoped access to apply changes only to their own infrastructure workspaces</td></tr>
              <tr><td><strong>CI/CD pipeline service accounts</strong></td><td>A deploy pipeline should hold credentials scoped only to the deployment target, never broader account-wide access</td></tr>
              <tr><td><strong>HashiCorp Vault policies</strong></td><td>ABAC-like dynamic secret access — policies grant access to specific secret paths based on identity and context</td></tr>
              <tr><td><strong>Zero Trust network architectures (e.g. BeyondCorp)</strong></td><td>Google's internal model — no "trusted internal network," every request authenticated/authorized regardless of origin</td></tr>
              <tr><td><strong>AWS IAM Roles for Service Accounts (IRSA)</strong></td><td>In Kubernetes, assign IAM roles to pods — each pod gets exactly the permissions it needs, not full account access</td></tr>
              <tr><td><strong>GitHub branch protection rules</strong></td><td>Require approvals for merges, restrict who can push to main — a practical separation of duties</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 's6-key-takeaways',
      title: 'Key Takeaways — Least Privilege & Access Control Models',
      priority: false,
      icon: '🧠',
      bodyHTML: `
        <div class="mental-model-grid">
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🛡️</span><span class="mental-title">Least Privilege</span></div>
            <div class="mental-card-body">The minimum access necessary — not "access that might be convenient someday." Limits <strong>blast radius</strong>, not breaches themselves.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">📋</span><span class="mental-title">RBAC</span></div>
            <div class="mental-card-body">Scales well via roles but risks <strong>role explosion</strong> for edge cases. Permissions attach to roles, users to roles.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🔬</span><span class="mental-title">ABAC</span></div>
            <div class="mental-card-body">More granular and context-aware but harder to audit. Permissions based on user + resource + context attributes.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">📄</span><span class="mental-title">ACL</span></div>
            <div class="mental-card-body">Precise per-resource but doesn't scale to large numbers of resources. Good for filesystems, not for enterprise-wide access.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🔀</span><span class="mental-title">Separation of Duties</span></div>
            <div class="mental-card-body">No single person can perform critical actions alone. Prevents fraud, errors, and insider threats.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🌐</span><span class="mental-title">Zero Trust</span></div>
            <div class="mental-card-body">"Never trust, always verify." Every request, from anywhere, is authenticated and authorized every time.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🤖</span><span class="mental-title">Service Accounts</span></div>
            <div class="mental-card-body">Special attention needed — use short-lived credentials, automated rotation, and scoped permissions.</div>
          </div>
          <div class="mental-card mental-card-full">
            <div class="mental-card-header"><span class="mental-icon">🚨</span><span class="mental-title">Real Breaches, Real Lessons</span></div>
            <div class="mental-card-body">Equifax, Capital One, Target: an initial entry point becomes catastrophic because <em>something</em> along the chain had far more access than it needed. <strong>Scope access tightly.</strong></div>
          </div>
        </div>
      `
    }
  ];

  const SECTION_7_ACCORDIONS = [
    {
      id: 's7-what-is-owasp',
      title: '7.1 What OWASP Is, and Why This List Matters',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <p>OWASP (Open Web Application Security Project) is a nonprofit that maintains, among other things, the <strong>OWASP Top 10</strong> — a periodically updated ranking of the most critical web application security risks, based on real-world data contributed by security firms and bug bounty programs across the industry. It's not theoretical — it's a distillation of what actually keeps getting exploited in production, over and over, across thousands of real applications.</p>
        <p>This section and Section 8 cover the current (2021) Top 10 in two halves. The goal isn't memorizing a list — it's understanding the <em>mechanism</em> behind each category well enough to recognize it in real code, not just recite the name.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">OWASP Top 10 (2021) — Overview</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Rank</th><th>Category</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><strong>A01</strong></td><td>Broken Access Control</td><td>Authentication without proper authorization checks</td></tr>
              <tr><td><strong>A02</strong></td><td>Cryptographic Failures</td><td>Weak crypto, missing TLS, hardcoded keys, bad hashing</td></tr>
              <tr><td><strong>A03</strong></td><td>Injection</td><td>SQL, command, LDAP injection (covered in this section)</td></tr>
              <tr><td><strong>A04</strong></td><td>Insecure Design</td><td>Architectural flaws that can't be patched easily</td></tr>
              <tr><td><strong>A05</strong></td><td>Security Misconfiguration</td><td>Default credentials, open ports, exposed error messages</td></tr>
              <tr><td><strong>A06</strong></td><td>Vulnerable and Outdated Components</td><td>Known CVEs in dependencies (Section 8)</td></tr>
              <tr><td><strong>A07</strong></td><td>Identification and Authentication Failures</td><td>Weak session management, credential stuffing (Section 8)</td></tr>
              <tr><td><strong>A08</strong></td><td>Software and Data Integrity Failures</td><td>Supply chain attacks, unsigned updates (Section 8)</td></tr>
              <tr><td><strong>A09</strong></td><td>Security Logging and Monitoring Failures</td><td>Insufficient detection and response (Section 8)</td></tr>
              <tr><td><strong>A10</strong></td><td>Server-Side Request Forgery</td><td>SSRF attacks (Section 8)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box note"><strong>📌 Note:</strong> A04–A10 are covered in Section 8.</div>
      `
    },
    {
      id: 's7-a01-broken-access-control',
      title: '7.2 A01: Broken Access Control',
      priority: false,
      icon: '🚪',
      bodyHTML: `
        <p>This is currently the #1 risk on the list — and it's the exact IDOR/BOLA pattern already covered in Section 5.5, now framed at the OWASP category level. Broken access control means the system fails to properly enforce what an authenticated user is allowed to do or access.</p>
        <p><strong>Concrete example beyond the invoice-ID case from Section 5:</strong> an e-commerce site's admin panel is reachable at <code>/admin/dashboard</code>. The developer assumed "nobody will guess this URL," so the page itself never checks whether the logged-in user actually has the admin role — it just renders if you're logged in <em>at all</em>. Any regular customer who happens to type that URL gets full admin access. This is called <strong>security through obscurity</strong> — hiding something rather than actually protecting it — and it's a well-known anti-pattern precisely because URLs, API endpoints, and file paths get discovered constantly, whether through crawling, leaked documentation, or simple guessing.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Access Control Bypass Pattern</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                    Access Control Bypass Pattern                │
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  The Attack                                               │   │
    │  │                                                          │   │
    │  │  Attacker logs in as regular user                       │   │
    │  │           │                                              │   │
    │  │           ▼                                              │   │
    │  │  Requests: /admin/dashboard                             │   │
    │  │           │                                              │   │
    │  │           ▼                                              │   │
    │  │  Server checks: Is user logged in? ✅                   │   │
    │  │           │                                              │   │
    │  │           ▼                                              │   │
    │  │  Server returns admin dashboard                         │   │
    │  │           │                                              │   │
    │  │           ▼                                              │   │
    │  │  ❌ Attacker has admin access without admin role        │   │
    │  └─────────────────────────────────────────────────────────┘   │
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  Proper Authorization                                     │   │
    │  │                                                          │   │
    │  │  Attacker logs in as regular user                       │   │
    │  │           │                                              │   │
    │  │           ▼                                              │   │
    │  │  Requests: /admin/dashboard                             │   │
    │  │           │                                              │   │
    │  │           ▼                                              │   │
    │  │  Server checks: Is user logged in? ✅                   │   │
    │  │           │                                              │   │
    │  │           ▼                                              │   │
    │  │  Server checks: Does user have admin role? ❌           │   │
    │  │           │                                              │   │
    │  │           ▼                                              │   │
    │  │  ✅ 403 Forbidden — no access                           │   │
    │  └─────────────────────────────────────────────────────────┘   │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
      `
    },
    {
      id: 's7-a02-cryptographic-failures',
      title: '7.3 A02: Cryptographic Failures',
      priority: false,
      icon: '🔐',
      bodyHTML: `
        <p>This category covers cryptography done wrong — not "no cryptography," but cryptography implemented in a way that fails to actually protect data. It directly connects everything from Sections 1, 2, and 3.</p>
        <p><strong>Concrete examples:</strong></p>
        <ul style="padding-left:1.2rem;margin:0.5rem 0;">
          <li>Transmitting sensitive data (passwords, card numbers) over plain HTTP instead of HTTPS — no TLS at all (Section 3)</li>
          <li>Using a weak or outdated cipher (e.g. still supporting SSL 3.0, or using MD5 for anything security-related) — covered in Sections 2 and 3's pitfalls</li>
          <li>Storing passwords with a fast, unsalted hash instead of bcrypt/Argon2id — the exact Section 2 pitfall</li>
          <li>Hardcoding encryption keys directly in source code, where anyone with repo access (or a leaked repo) gets the key too</li>
        </ul>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Hardcoded Secrets Flow</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                    Hardcoded Secrets Flow                       │
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  Development                                             │   │
    │  │                                                          │   │
    │  │  Developer hardcodes AWS key in source                  │   │
    │  │                    │                                     │   │
    │  │                    ▼                                     │   │
    │  │  Commits to GitHub                                      │   │
    │  └─────────────────────────────────────────────────────────┘   │
    │                              │                                  │
    │                              ▼                                  │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  Attack                                                 │   │
    │  │                                                          │   │
    │  │  Repository leaked or made public                       │   │
    │  │                    │                                     │   │
    │  │                    ▼                                     │   │
    │  │  Attacker finds key in code                             │   │
    │  │                    │                                     │   │
    │  │                    ▼                                     │   │
    │  │  Attacker accesses AWS account                         │   │
    │  │                                                          │   │
    │  │  ❌ Breach                                               │   │
    │  └─────────────────────────────────────────────────────────┘   │
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  Fix                                                     │   │
    │  │                                                          │   │
    │  │  Store secrets in environment variables                 │   │
    │  │                    │                                     │   │
    │  │                    ▼                                     │   │
    │  │  Secrets Manager / Vault                                │   │
    │  │                    │                                     │   │
    │  │                    ▼                                     │   │
    │  │  ✅ Credentials never in source                         │   │
    │  └─────────────────────────────────────────────────────────┘   │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Cryptographic Failure Chain</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                    Cryptographic Failure Chain                  │
    │                                                                 │
    │    Sensitive data (passwords, cards, PII)                      │
    │           │                                                     │
    │           ▼                                                     │
    │    ┌─────────────────────────────────────────────┐             │
    │    │  Properly encrypted/hashed?                  │             │
    │    └─────────────────────────────────────────────┘             │
    │           │                     │                               │
    │          No                     Yes                            │
    │           │                     │                               │
    │           ▼                     ▼                               │
    │    ┌───────────────────┐  ┌───────────────────┐               │
    │    │ Cryptographic     │  │  ✅ Data protected│               │
    │    │ Failure (A02)     │  └───────────────────┘               │
    │    └───────────────────┘                                       │
    │                                                                 │
    │    Examples:                                                    │
    │    • Plaintext storage                                         │
    │    • Weak cipher (MD5, SSL 3.0)                               │
    │    • Hardcoded key                                            │
    │    • No TLS                                                    │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
      `
    },
    {
      id: 's7-a03-injection',
      title: '7.4 A03: Injection',
      priority: false,
      icon: '💉',
      bodyHTML: `
        <p>This is one of the oldest, most well-understood vulnerability classes — and still shows up constantly in real code. Injection happens when untrusted user input is inserted directly into a command, query, or interpreter without being properly separated from the code itself.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">SQL Injection — the Classic Example</h4>
        <p>Imagine a login form built naively like this (pseudocode, illustrating the vulnerability pattern, not real production code):</p>
        <div class="code-block">
          <pre>
    query = "SELECT * FROM users WHERE username = '" + userInput + "' AND password = '" + passwordInput + "'"</pre>
        </div>
        <p>If a user types <code>admin' --</code> into the username field, the query becomes:</p>
        <div class="code-block">
          <pre>
    SELECT * FROM users WHERE username = 'admin' --' AND password = '...'</pre>
        </div>
        <p>The <code>--</code> starts a SQL comment, so everything after it is ignored — including the password check entirely. The attacker logs in as <code>admin</code> without ever knowing the actual password. This isn't a hypothetical exploit; it's one of the very first things any security scanner or attacker tries against a login form.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: SQL Injection Anatomy</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                    SQL Injection Anatomy                        │
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  Malicious Input                                         │   │
    │  │                                                          │   │
    │  │  Username: admin' --                                    │   │
    │  │  Password: anything                                     │   │
    │  └─────────────────────────────────────────────────────────┘   │
    │                              │                                  │
    │                              ▼                                  │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  Constructed Query                                       │   │
    │  │                                                          │   │
    │  │  Original: SELECT * FROM users WHERE username = '       │   │
    │  │                                                          │   │
    │  │  + Input: admin' --' AND password = 'anything'          │   │
    │  │                                                          │   │
    │  │  Result: SELECT * FROM users WHERE username = 'admin'   │   │
    │  │          --' AND password = 'anything'                  │   │
    │  └─────────────────────────────────────────────────────────┘   │
    │                              │                                  │
    │                              ▼                                  │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  Result                                                 │   │
    │  │                                                          │   │
    │  │  -- starts comment                                      │   │
    │  │        │                                                │   │
    │  │        ▼                                                │   │
    │  │  Password check ignored                                 │   │
    │  │        │                                                │   │
    │  │        ▼                                                │   │
    │  │  ✅ Attacker logged in as admin                         │   │
    │  └─────────────────────────────────────────────────────────┘   │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
        <p><strong>The fix — parameterized queries (prepared statements):</strong> instead of building a query string by concatenating user input directly, the query and the data are sent to the database <em>separately</em>. The database engine treats user input strictly as <em>data</em>, never as executable query syntax, no matter what characters it contains.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Visual: Parameterized Query Flow</h4>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────────────────────────────────────────────────────────┐
    │                    Parameterized Query Flow                     │
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  Step 1: Prepare Query                                   │   │
    │  │                                                          │   │
    │  │  Query template:                                         │   │
    │  │  SELECT * FROM users WHERE username = ?                 │   │
    │  │                    │                                     │   │
    │  │                    ▼                                     │   │
    │  │  Database compiles query structure                       │   │
    │  │  (without executing)                                    │   │
    │  └─────────────────────────────────────────────────────────┘   │
    │                              │                                  │
    │                              ▼                                  │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  Step 2: Send Data Separately                           │   │
    │  │                                                          │   │
    │  │  User input: admin' --                                  │   │
    │  │                    │                                     │   │
    │  │                    ▼                                     │   │
    │  │  Database treats input as literal string                │   │
    │  └─────────────────────────────────────────────────────────┘   │
    │                              │                                  │
    │                              ▼                                  │
    │  ┌─────────────────────────────────────────────────────────┐   │
    │  │  Step 3: Execute Safely                                 │   │
    │  │                                                          │   │
    │  │  Database searches for literal username 'admin' --'    │   │
    │  │                    │                                     │   │
    │  │                    ▼                                     │   │
    │  │  ❌ No match — login fails safely                      │   │
    │  └─────────────────────────────────────────────────────────┘   │
    └─────────────────────────────────────────────────────────────────┘
            </code>
          </pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Command Injection — Another Injection Variant</h4>
        <p>Injection isn't limited to SQL. The same fundamental flaw shows up in <strong>command injection</strong>:</p>
        <div class="code-block">
          <pre>
    # Vulnerable
    command = f"ping -c 1 {user_input}"
    os.system(command)  # user_input: "8.8.8.8; rm -rf /"
    # Executes: ping -c 1 8.8.8.8; rm -rf /

    # Safe
    import subprocess
    subprocess.run(["ping", "-c", "1", user_input])  # treats input as data only</pre>
        </div>
        <p>The underlying lesson is identical every time: <strong>never build executable syntax by concatenating untrusted input directly into it.</strong></p>
      `
    },
    {
      id: 's7-defence-depth',
      title: '7.5 Defence in Depth — Multiple Layers, Not Just One',
      priority: false,
      icon: '🧅',
      bodyHTML: `
        <p>None of these controls alone is sufficient. Security works as a series of layers:</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Layer</th><th>Tool/Control</th><th>What it protects against</th></tr></thead>
            <tbody>
              <tr><td><strong>Application code</strong></td><td>Parameterized queries, role checks</td><td>Injection, access control</td></tr>
              <tr><td><strong>CI/CD</strong></td><td>SAST, secrets scanning</td><td>Catching issues before they reach production</td></tr>
              <tr><td><strong>Infrastructure</strong></td><td>WAF, rate limiting</td><td>Blocking attacks at the network layer</td></tr>
              <tr><td><strong>Monitoring</strong></td><td>Logging, alerting</td><td>Detecting attacks in progress</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box warning"><strong>⚠️ Important:</strong> WAFs can be bypassed. They're a helpful extra layer, not a replacement for writing secure code.</div>
      `
    },
    {
      id: 's7-pitfalls',
      title: '7.6 Common Pitfalls (A01–A03)',
      priority: false,
      icon: '⚠️',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pitfall</th><th>Why it happens</th><th>How to avoid</th></tr></thead>
            <tbody>
              <tr><td><strong>Relying on "hidden" URLs for admin access</strong></td><td>Assumes obscurity is sufficient protection</td><td>Explicitly check role/permission on every sensitive endpoint, every request</td></tr>
              <tr><td><strong>Building SQL queries via string concatenation</strong></td><td>Feels simpler, especially in quick prototypes</td><td>Always use parameterized queries / prepared statements, no exceptions</td></tr>
              <tr><td><strong>Trusting client-side validation alone</strong></td><td>Client-side checks feel "good enough" in testing</td><td>Client-side validation is UX only — the server must independently re-validate everything</td></tr>
              <tr><td><strong>Hardcoding secrets/keys in source code</strong></td><td>Convenience during development</td><td>Use environment variables or a secrets manager; never commit secrets to git</td></tr>
              <tr><td><strong>Assuming HTTPS alone means "secure"</strong></td><td>Conflates transport security with all security</td><td>HTTPS protects data in transit only — it says nothing about access control, injection, or storage</td></tr>
              <tr><td><strong>WAF as a substitute for fixing code</strong></td><td>Misunderstanding WAF capabilities</td><td>WAFs can be bypassed; they're a defence-in-depth measure, not a complete solution</td></tr>
              <tr><td><strong>Not validating input on the server</strong></td><td>Assumes client-side validation is sufficient</td><td>Server-side validation is mandatory; client-side is UX only</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Real-World Examples</h4>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><strong>Uber (2016 breach):</strong> attackers found AWS credentials <strong>hardcoded in a private GitHub repository</strong> — a textbook A02 cryptographic/secrets failure. Those credentials granted access to cloud storage containing data on 57 million users and drivers. Uber reportedly paid the attackers to delete the data and stay quiet, which later triggered its own separate legal and regulatory fallout for concealment.</li>
          <li><strong>Sony Pictures (2011 PSN breach, and separately the 2014 hack):</strong> among many issues, investigators found evidence of passwords stored in plaintext and poor access segmentation — overlapping A01 and A02 failures compounding each other.</li>
          <li><strong>Countless SQL injection breaches over decades:</strong> SQLi has been used in some of the largest data breaches in history (including large-scale credit card theft rings in the 2000s–2010s) precisely because so many applications, even now, still build queries via string concatenation rather than parameterized queries.</li>
        </ul>
      `
    },
    {
      id: 's7-hands-on',
      title: '7.7 Hands-On Practice (Codespace)',
      priority: false,
      icon: '🖥️',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">1. Set up a minimal SQLite database to demonstrate injection</h4>
        <div class="code-block">
          <pre>
    python3 -c "
    import sqlite3
    conn = sqlite3.connect(':memory:')
    c = conn.cursor()
    c.execute('CREATE TABLE users (username TEXT, password TEXT)')
    c.execute(\"INSERT INTO users VALUES ('admin', 'supersecret')\")
    conn.commit()

    # VULNERABLE: string concatenation
    user_input = \"admin' --\"
    query = f\"SELECT * FROM users WHERE username = '{user_input}'\"
    print('Vulnerable query:', query)
    result = c.execute(query).fetchall()
    print('Result (bypassed password check!):', result)
    "</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">2. SAFE version — parameterized query</h4>
        <div class="code-block">
          <pre>
    python3 -c "
    import sqlite3
    conn = sqlite3.connect(':memory:')
    c = conn.cursor()
    c.execute('CREATE TABLE users (username TEXT, password TEXT)')
    c.execute(\"INSERT INTO users VALUES ('admin', 'supersecret')\")
    conn.commit()

    # SAFE: parameterized query — user input is treated strictly as data
    user_input = \"admin' --\"
    result = c.execute('SELECT * FROM users WHERE username = ?', (user_input,)).fetchall()
    print('Safe query result (correctly finds nothing):', result)
    "</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">3. Search your own past commits for accidentally hardcoded secrets</h4>
        <div class="code-block">
          <pre>
    git log -p | grep -iE "api[_-]?key|secret|password" | head -20</pre>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">4. Command injection demo (safe demonstration)</h4>
        <div class="code-block">
          <pre>
    python3 -c "
    import os, subprocess

    # VULNERABLE: string concatenation
    user_input = '8.8.8.8; echo \"INJECTED\"'
    command = f'ping -c 1 {user_input}'
    print('Vulnerable command:', command)
    # os.system(command)  # Don't actually run this!

    # SAFE: argument list
    try:
        subprocess.run(['ping', '-c', '1', user_input], capture_output=True, timeout=2)
    except Exception as e:
        print('Safe execution: treated as invalid hostname, not injected')
    "</pre>
        </div>
        <p style="margin-top:0.5rem;">Running exercises 1 and 2 side by side makes the injection vulnerability concrete rather than abstract — the <em>exact same malicious input string</em> either bypasses authentication entirely, or correctly fails to match anything, purely based on how the query was constructed.</p>
      `
    },
    {
      id: 's7-devops-connection',
      title: '7.8 DevOps Connection',
      priority: false,
      icon: '⚙️',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>DevOps context</th><th>Where this OWASP category appears</th></tr></thead>
            <tbody>
              <tr><td><strong>Static Application Security Testing (SAST) in CI/CD</strong></td><td>Tools like Semgrep, SonarQube scan code for injection patterns and access control issues before merge</td></tr>
              <tr><td><strong>Secrets scanning (git-secrets, TruffleHog, GitHub secret scanning)</strong></td><td>Automatically catches hardcoded credentials in commits before they reach a shared repo — a direct defense against the Uber-style breach</td></tr>
              <tr><td><strong>Dependency/vulnerability scanning (Snyk, Dependabot)</strong></td><td>Flags known cryptographic weaknesses or injection-prone library versions before deployment</td></tr>
              <tr><td><strong>Infrastructure as Code security scanning (tfsec, Checkov)</strong></td><td>Catches Terraform/CloudFormation misconfigurations that create broken access control at the infrastructure level</td></tr>
              <tr><td><strong>WAF (Web Application Firewall) rules</strong></td><td>Often specifically tuned to detect and block common SQL injection and access-control-bypass attack patterns in real time</td></tr>
              <tr><td><strong>Secrets Managers (Vault, AWS Secrets Manager, Doppler)</strong></td><td>Prevent hardcoded secrets by providing a secure way to inject credentials at runtime</td></tr>
              <tr><td><strong>Dynamic Application Security Testing (DAST)</strong></td><td>Runs simulated attacks against running applications to find injection vulnerabilities and access control issues</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 's7-key-takeaways',
      title: 'Key Takeaways — OWASP Top 10 Part 1',
      priority: false,
      icon: '🧠',
      bodyHTML: `
        <div class="mental-model-grid">
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">📋</span><span class="mental-title">OWASP is Data-Driven</span></div>
            <div class="mental-card-body">The OWASP Top 10 is drawn from <strong>real-world exploitation data</strong>, not theoretical risk — that's what makes it worth internalizing.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🚪</span><span class="mental-title">A01: Broken Access Control</span></div>
            <div class="mental-card-body">The #1 risk — checking authentication but not authorization. Security through obscurity is not real protection.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🔐</span><span class="mental-title">A02: Cryptographic Failures</span></div>
            <div class="mental-card-body">Weak ciphers, missing TLS, bad hashing, hardcoded keys. Connects directly to Sections 1–3.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">💉</span><span class="mental-title">A03: Injection</span></div>
            <div class="mental-card-body">Untrusted input concatenated into executable syntax. <strong>Parameterized queries</strong> are the fix, always.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🧅</span><span class="mental-title">Defence in Depth</span></div>
            <div class="mental-card-body">Multiple layers: secure code + CI/CD scanning + infrastructure controls + monitoring. No single layer is sufficient.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🛡️</span><span class="mental-title">Server-Side Validation is Mandatory</span></div>
            <div class="mental-card-body">Client-side validation is UX only — the server must independently validate everything, since the client can always be bypassed.</div>
          </div>
          <div class="mental-card">
            <div class="mental-card-header"><span class="mental-icon">🔑</span><span class="mental-title">Never Hardcode Secrets</span></div>
            <div class="mental-card-body">Use environment variables or secrets managers. Hardcoded keys (like the Uber breach) are A02 failures.</div>
          </div>
          <div class="mental-card mental-card-full">
            <div class="mental-card-header"><span class="mental-icon">🚨</span><span class="mental-title">Real Breaches, Real Lessons</span></div>
            <div class="mental-card-body">Uber (hardcoded keys), Sony (plaintext passwords + access control), and countless SQLi breaches show these categories compounding. <strong>A single unchecked endpoint or one hardcoded key can cascade into a breach affecting tens of millions.</strong></div>
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
  renderAccordion('js-section4-container', SECTION_4_ACCORDIONS);
  renderAccordion('js-section5-container', SECTION_5_ACCORDIONS);
  renderAccordion('js-section6-container', SECTION_6_ACCORDIONS);
  renderAccordion('js-section7-container', SECTION_7_ACCORDIONS);
  
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

