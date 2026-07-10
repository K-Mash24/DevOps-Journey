// ============================================================
// PILLAR 4: SCRIPTING & AUTOMATION – FLASHCARDS & QUIZ
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  //----- FLASHCARD DATA & RENDERING -----
  const FLASHCARDS = [
    { term: "Placeholder term 1", answer: "Placeholder answer 1" },
    { term: "Placeholder term 2", answer: "Placeholder answer 2" },
    { term: "Placeholder term 3", answer: "Placeholder answer 3" },
    { term: "Placeholder term 4", answer: "Placeholder answer 4" },
    { term: "Placeholder term 5", answer: "Placeholder answer 5" }
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

    const countSpan = document.getElementById('flashcardCount');
    if (countSpan) countSpan.textContent = `${FLASHCARDS.length} cards`;

    initFlashcardScroller();
  }

  // ============================================================
  // SCRIPTING PAGE — Overview Content
  // ============================================================

  const SCRIPTING_OVERVIEW = {
    purpose: {
      title: '📌 Purpose',
      description: [
        'This pillar builds genuine scripting and automation skills from first principles. Automation is the heart of DevOps — if you do something twice, you should script it. This pillar covers both Python and Bash, the two most essential languages for any DevOps engineer.',
        'You will learn to write scripts that are reliable, maintainable, and production-ready. Every concept is taught with practical examples and real-world use cases.'
      ]
    },
    objectives: [
      'Write Python scripts with proper syntax, data structures, and control flow',
      'Define and call functions with parameters, return values, and docstrings',
      'Handle errors gracefully using try/except blocks',
      'Read from and write to files using Python\'s built-in file I/O',
      'Write Bash scripts with variables, conditionals, loops, and functions',
      'Use grep, sed, and awk for text processing in Bash',
      'Understand REST API concepts: endpoints, methods, status codes, authentication',
      'Make API calls using Python\'s requests library',
      'Parse JSON data and extract specific fields',
      'Apply automation patterns: cron jobs, polling, idempotency'
    ],
    keyConcepts: [
      { term: 'Variables & Data Types', definition: 'int, float, str, bool, list, tuple, dict, set' },
      { term: 'Conditionals', definition: 'if, elif, else — control flow based on conditions' },
      { term: 'Loops', definition: 'for loops (iterating) and while loops (conditional)' },
      { term: 'Functions', definition: 'def, return, parameters, default args, *args, **kwargs' },
      { term: 'Error Handling', definition: 'try/except/else/finally — graceful failure' },
      { term: 'File I/O', definition: 'open(), read(), write(), with statement, file modes' },
      { term: 'Bash Variables', definition: 'VAR=value, $VAR, command substitution $(cmd)' },
      { term: 'grep', definition: 'Pattern searching in files — grep, grep -r, grep -i' },
      { term: 'sed', definition: 'Stream editor — find and replace' },
      { term: 'awk', definition: 'Text processing — awk \'{print $1}\', field separation' },
      { term: 'REST API', definition: 'GET, POST, PUT, DELETE, endpoints, status codes' },
      { term: 'requests library', definition: 'requests.get(), .post(), .json(), .status_code' },
      { term: 'JSON', definition: 'json.loads(), json.dumps(), keys, values, nesting' },
      { term: 'Cron', definition: 'Scheduled tasks — crontab -e, * * * * * command' },
      { term: 'Idempotency', definition: 'Operation yields same result regardless of how many times it runs' }
    ],
    stats: [
      { label: 'Sections', value: '9/9 (100%)' },
      { label: 'Topics covered', value: '50+' },
      { label: 'Estimated time', value: '~12-14 hours' },
      { label: 'Difficulty range', value: '🟢 Beginner → 🟡 Intermediate' },
      { label: 'Status', value: '🚧 IN PROGRESS' }
    ],
    readmeLink: 'https://github.com/K-Mash24/Great_Cheatsheets/tree/Master/saa-foundation/04-scripting',
    readmeDetailLink: 'https://github.com/K-Mash24/Great_Cheatsheets/blob/Master/saa-foundation/04-scripting/README.md'
  };

  function renderScriptingOverview() {
    const container = document.getElementById('js-overview-container');
    if (!container) return;

    const objectives = SCRIPTING_OVERVIEW.objectives.map(obj => `<li>${obj}</li>`).join('');
    const keyConcepts = SCRIPTING_OVERVIEW.keyConcepts.map(item => `
      <dt>${item.term}</dt>
      <dd>${item.definition}</dd>
    `).join('');
    const stats = SCRIPTING_OVERVIEW.stats.map(stat => `
      <tr><td><strong>${stat.label}</strong></td><td>${stat.value}</td></tr>
    `).join('');

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
          <p style="margin-top: 0.25rem;">All markdown notes are committed to <a href="${SCRIPTING_OVERVIEW.readmeLink}" target="_blank" style="color: var(--accent-secondary);">Great_Cheatsheets/saa-foundation/04-scripting/</a>. The <a href="${SCRIPTING_OVERVIEW.readmeDetailLink}" target="_blank" style="color: var(--accent-secondary);">README.md</a> in that folder contains the complete pillar summary, learning objectives, and revision checklist.</p>
        </div>
      </div>
    `;
  }

  // ============================================================
  // SECTION ACCORDIONS (9 sections — replace content)
  // ============================================================
  function renderAccordion(containerId, accordionData) {
    const container = document.getElementById(containerId);
    if (!container) return;

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
        <div class="accordion-body">${acc.bodyHTML}</div>
      </div>
    `).join('');

    container.innerHTML = html;
  }

  // function buildPlaceholderAccordion(sectionNum) {
  //   return {
  //     id: `section-${sectionNum}`,
  //     title: `Section ${sectionNum} — Placeholder`,
  //     priority: sectionNum === 1,
  //     icon: '📄',
  //     bodyHTML: `
  //       <p>This is a placeholder for Section ${sectionNum}. Replace with actual content.</p>
  //       <div class="code-block"><pre><span class="code-comment"># Placeholder code block</span>
  // echo "Replace me"</pre></div>
  //       <div class="info-box note">Add your notes here.</div>
  //     `
  //   };
  // }

  // ============================================================
  // SECTION 1 — Python Fundamentals
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
  // // ============================================================
  // // SECTION 2 — Functions, Modules & Error Handling
  // // ============================================================
  const SECTION_2_ACCORDIONS = [
    {
      id: 'python-functions',
      title: 'Defining & Calling Functions',
      priority: true,
      icon: '⚡',
      bodyHTML: `
        <p>Functions are reusable blocks of code.</p>
        <div class="code-block"><pre>def greet(name):
        return f"Hello, {name}!"

    print(greet("Alice"))</pre></div>
      `
    },
    {
      id: 'python-modules',
      title: 'Modules & Imports',
      priority: false,
      icon: '📦',
      bodyHTML: `
        <p>Python modules are files containing Python code.</p>
        <div class="code-block"><pre><span class="code-comment"># Import entire module</span>
    import math
    print(math.sqrt(16))

    <span class="code-comment"># Import specific functions</span>
    from math import sqrt, pi</pre></div>
      `
    },
    {
      id: 'python-error-handling',
      title: 'Error Handling (try/except)',
      priority: false,
      icon: '🛡️',
      bodyHTML: `
        <p>Python uses exceptions to handle errors.</p>
        <div class="code-block"><pre>try:
        x = int(input("Enter a number: "))
        result = 10 / x
    except ValueError:
        print("That's not a valid number!")
    except ZeroDivisionError:
        print("Cannot divide by zero!")</pre></div>
      `
    }
  ];

  // // ============================================================
  // // SECTION 3 — File I/O in Python
  // // ============================================================
  const SECTION_3_ACCORDIONS = [
    {
      id: 'python-file-read',
      title: 'Reading Files',
      priority: true,
      icon: '📖',
      bodyHTML: `
        <p>The <code>with</code> statement ensures files are properly closed.</p>
        <div class="code-block"><pre><span class="code-comment"># Read entire file</span>
    with open("data.txt", "r") as file:
        content = file.read()

    <span class="code-comment"># Read line by line</span>
    with open("data.txt", "r") as file:
        for line in file:
            print(line.strip())</pre></div>
      `
    },
    {
      id: 'python-file-write',
      title: 'Writing Files',
      priority: false,
      icon: '✍️',
      bodyHTML: `
        <div class="code-block"><pre><span class="code-comment"># Write to file</span>
    with open("output.txt", "w") as file:
        file.write("Hello, World!\\n")

    <span class="code-comment"># Append to file</span>
    with open("output.txt", "a") as file:
        file.write("Appended line.\\n")</pre></div>
      `
    }
  ];

  // // ============================================================
  // // SECTION 4 — Bash Scripting Fundamentals
  // // ============================================================
  const SECTION_4_ACCORDIONS = [
    {
      id: 'bash-hello-world',
      title: 'Hello World & Shebang',
      priority: true,
      icon: '🚀',
      bodyHTML: `
        <p>Bash scripts start with a <strong>shebang</strong> line.</p>
        <div class="code-block"><pre><span class="code-comment">#!/bin/bash</span>
    echo "Hello, World!"</pre></div>
      `
    },
    {
      id: 'bash-variables',
      title: 'Variables & Command Substitution',
      priority: false,
      icon: '📦',
      bodyHTML: `
        <div class="code-block"><pre><span class="code-comment"># Variables (no spaces around =)</span>
    name="Alice"
    echo "Hello, $name"

    <span class="code-comment"># Command substitution</span>
    current_date=$(date)
    echo "Today is $current_date"</pre></div>
      `
    },
    {
      id: 'bash-conditionals',
      title: 'Conditionals (if, elif, else)',
      priority: false,
      icon: '🔀',
      bodyHTML: `
        <div class="code-block"><pre>if [ "$age" -gt 18 ]; then
        echo "Adult"
    else
        echo "Minor"
    fi</pre></div>
      `
    },
    {
      id: 'bash-loops',
      title: 'Loops (for, while)',
      priority: false,
      icon: '🔄',
      bodyHTML: `
        <div class="code-block"><pre><span class="code-comment"># For loop</span>
    for i in {1..5}; do
        echo "Number: $i"
    done

    <span class="code-comment"># While loop</span>
    count=0
    while [ $count -lt 5 ]; do
        echo "Count: $count"
        ((count++))
    done</pre></div>
      `
    }
  ];

  // // ============================================================
  // // SECTION 5 — Bash Scripting Advanced
  // // ============================================================
  const SECTION_5_ACCORDIONS = [
    {
      id: 'bash-functions',
      title: 'Functions & Arguments',
      priority: false,
      icon: '⚡',
      bodyHTML: `
        <div class="code-block"><pre>greet() {
        echo "Hello, $1!"
    }
    greet "Alice"</pre></div>
      `
    },
    {
      id: 'bash-text-processing',
      title: 'Text Processing — grep, sed, awk',
      priority: true,
      icon: '📊',
      bodyHTML: `
        <h4>grep — Search for patterns</h4>
        <div class="code-block"><pre>grep "error" /var/log/system.log
    grep -i "warning" log.txt
    grep -r "TODO" src/</pre></div>

        <h4>sed — Stream Editor</h4>
        <div class="code-block"><pre>sed 's/old/new/g' file.txt
    sed -i 's/old/new/g' file.txt</pre></div>

        <h4>awk — Pattern Scanning</h4>
        <div class="code-block"><pre>awk '{print $1, $3}' data.txt
    awk '$2 > 100 {print $1}' data.txt</pre></div>
      `
    },
    {
      id: 'bash-exit-codes',
      title: 'Exit Codes & Error Handling',
      priority: false,
      icon: '🛡️',
      bodyHTML: `
        <div class="code-block"><pre><span class="code-comment"># Exit code — 0 = success</span>
    ls /nonexistent
    echo $?                              <span class="code-comment"># 2</span>

    <span class="code-comment"># Exit on error</span>
    set -e
    set -euo pipefail</pre></div>
      `
    }
  ];

  // // ============================================================
  // // SECTION 6 — REST APIs Concepts
  // // ============================================================
  const SECTION_6_ACCORDIONS = [
    {
      id: 'rest-basics',
      title: 'REST API Fundamentals',
      priority: true,
      icon: '🌐',
      bodyHTML: `
        <h4>HTTP Methods</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Method</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td><code>GET</code></td><td>Retrieve data</td></tr>
              <tr><td><code>POST</code></td><td>Create resource</td></tr>
              <tr><td><code>PUT</code></td><td>Replace resource</td></tr>
              <tr><td><code>PATCH</code></td><td>Partial update</td></tr>
              <tr><td><code>DELETE</code></td><td>Remove resource</td></tr>
            </tbody>
          </table>
        </div>

        <h4>HTTP Status Codes</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Code</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><strong>200</strong> OK</td><td>Success</td></tr>
              <tr><td><strong>201</strong> Created</td><td>Resource created</td></tr>
              <tr><td><strong>404</strong> Not Found</td><td>Resource not found</td></tr>
              <tr><td><strong>500</strong> Server Error</td><td>Server error</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'rest-authentication',
      title: 'Authentication Methods',
      priority: false,
      icon: '🔐',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Method</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><strong>API Key</strong></td><td>Static token in header</td></tr>
              <tr><td><strong>Bearer Token</strong></td><td>JWT in Authorization header</td></tr>
              <tr><td><strong>OAuth 2.0</strong></td><td>Delegated authorization</td></tr>
            </tbody>
          </table>
        </div>
        <div class="code-block"><pre>Authorization: Bearer eyJhbGciOiJIUzI1NiIs...</pre></div>
      `
    }
  ];

  // // ============================================================
  // // SECTION 7 — Working with APIs in Python
  // // ============================================================
  const SECTION_7_ACCORDIONS = [
    {
      id: 'python-requests-get',
      title: 'Making GET Requests',
      priority: true,
      icon: '📥',
      bodyHTML: `
        <div class="code-block"><pre><span class="code-comment"># pip install requests</span>
    import requests

    response = requests.get("https://api.github.com/users/octocat")
    print(response.status_code)
    print(response.json())

    <span class="code-comment"># With query parameters</span>
    params = {"q": "python", "per_page": 10}
    response = requests.get("https://api.github.com/search/repositories", params=params)</pre></div>
      `
    },
    {
      id: 'python-requests-post',
      title: 'Making POST, PUT, DELETE Requests',
      priority: false,
      icon: '📤',
      bodyHTML: `
        <div class="code-block"><pre><span class="code-comment"># POST with JSON</span>
    data = {"name": "Alice", "email": "alice@example.com"}
    response = requests.post(
        "https://api.example.com/users",
        json=data
    )

    <span class="code-comment"># PUT (replace)</span>
    response = requests.put(
        "https://api.example.com/users/123",
        json={"name": "Alice Smith"}
    )

    <span class="code-comment"># DELETE</span>
    response = requests.delete(
        "https://api.example.com/users/123"
    )</pre></div>
      `
    }
  ];

  // // ============================================================
  // // SECTION 8 — JSON Parsing & Data Manipulation
  // // ============================================================
  const SECTION_8_ACCORDIONS = [
    {
      id: 'json-parse',
      title: 'Parsing JSON in Python',
      priority: true,
      icon: '🔍',
      bodyHTML: `
        <div class="code-block"><pre>import json

    <span class="code-comment"># Parse JSON string</span>
    json_string = '{"name": "Alice", "age": 30}'
    data = json.loads(json_string)
    print(data["name"])

    <span class="code-comment"># Convert Python to JSON</span>
    person = {"name": "Bob", "age": 25}
    json_string = json.dumps(person, indent=2)

    <span class="code-comment"># Read from file</span>
    with open("data.json", "r") as file:
        data = json.load(file)</pre></div>
      `
    },
    {
      id: 'json-advanced',
      title: 'Advanced JSON — Data Extraction',
      priority: false,
      icon: '🔄',
      bodyHTML: `
        <div class="code-block"><pre><span class="code-comment"># Safe access with .get()</span>
    city = data.get("address", {}).get("city", "Unknown")

    <span class="code-comment"># Extract fields from API response</span>
    response = requests.get("https://api.github.com/users/octocat")
    data = response.json()
    print(data.get("login"))
    print(data.get("name"))

    <span class="code-comment"># List comprehension to extract field</span>
    names = [item["name"] for item in api_response["results"]]</pre></div>
      `
    }
  ];

  // // ============================================================
  // // SECTION 9 — Automation Patterns
  // // ============================================================
  const SECTION_9_ACCORDIONS = [
    {
      id: 'automation-patterns',
      title: 'Common Automation Patterns',
      priority: true,
      icon: '🤖',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pattern</th><th>Description</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td><strong>Scheduled (Cron)</strong></td><td>Run at fixed times</td><td>Daily backups at 2am</td></tr>
              <tr><td><strong>Polling</strong></td><td>Check for changes periodically</td><td>Check for new files every 5 minutes</td></tr>
              <tr><td><strong>Idempotent</strong></td><td>Safe to run multiple times</td><td>Create user only if they don't exist</td></tr>
              <tr><td><strong>Retry</strong></td><td>Retry on failure with backoff</td><td>API call retries 3 times</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'automation-cron',
      title: 'Scheduling with Cron',
      priority: false,
      icon: '⏰',
      bodyHTML: `
        <div class="code-block"><pre><span class="code-comment"># Crontab format</span>
    <span class="code-comment"># ┌───────────── minute</span>
    <span class="code-comment"># │ ┌───────────── hour</span>
    <span class="code-comment"># │ │ ┌───────────── day of month</span>
    <span class="code-comment"># │ │ │ ┌───────────── month</span>
    <span class="code-comment"># │ │ │ │ ┌───────────── day of week</span>
    <span class="code-comment"># │ │ │ │ │</span>
    <span class="code-comment"># * * * * * command</span>

    30 2 * * * /home/user/backup.sh     <span class="code-comment"># daily at 2:30am</span>
    */5 * * * * /home/user/check.sh      <span class="code-comment"># every 5 minutes</span>
    0 9 * * 1 /home/user/weekly.sh       <span class="code-comment"># Monday at 9am</span></pre></div>
      `
    },
    {
      id: 'automation-python-scripting',
      title: 'Automation with Python',
      priority: false,
      icon: '🐍',
      bodyHTML: `
        <div class="code-block"><pre><span class="code-comment">#!/usr/bin/env python3</span>
    <span class="code-comment"># Idempotent user creation</span>

    import json
    import os

    def create_user(username, email):
        users_file = "users.json"

        if os.path.exists(users_file):
            with open(users_file, "r") as f:
                users = json.load(f)
        else:
            users = []

        for user in users:
            if user["username"] == username:
                print(f"User {username} already exists")
                return

        users.append({"username": username, "email": email})
        with open(users_file, "w") as f:
            json.dump(users, f, indent=2)
        print(f"User {username} created")

    if __name__ == "__main__":
        create_user("alice", "alice@example.com")</pre></div>
      `
    }
  ];




  // renderAccordion();
  renderAccordion('js-section1-container', SECTION_1_ACCORDIONS);
  renderAccordion('js-section2-container', SECTION_2_ACCORDIONS);
  renderAccordion('js-section3-container', SECTION_3_ACCORDIONS);
  renderAccordion('js-section4-container', SECTION_4_ACCORDIONS);
  renderAccordion('js-section5-container', SECTION_5_ACCORDIONS);
  renderAccordion('js-section6-container', SECTION_6_ACCORDIONS);
  renderAccordion('js-section7-container', SECTION_7_ACCORDIONS);
  renderAccordion('js-section8-container', SECTION_8_ACCORDIONS);
  renderAccordion('js-section9-container', SECTION_9_ACCORDIONS);

  // ============================================================
  // FLASHCARD SCROLLER
  // ============================================================

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
      dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
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
          scroller.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
        });
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => scroller.scrollBy({ left: -280, behavior: 'smooth' }));
    if (nextBtn) nextBtn.addEventListener('click', () => scroller.scrollBy({ left: 280, behavior: 'smooth' }));

    scroller.addEventListener('scroll', () => requestAnimationFrame(updateIndicator));
    setTimeout(updateIndicator, 100);
    window.addEventListener('resize', () => setTimeout(updateIndicator, 100));
  }

  // ============================================================
  // QUIZ SYSTEM
  // ============================================================

  const QUIZ_SETS = {
    1: [
      { q: "Placeholder question 1?", options: ["A", "B", "C", "D"], correct: 0, explain: "Placeholder explanation." },
      { q: "Placeholder question 2?", options: ["A", "B", "C", "D"], correct: 1, explain: "Placeholder explanation." }
    ],
    2: [
      { q: "Placeholder question 3?", options: ["A", "B", "C", "D"], correct: 2, explain: "Placeholder explanation." },
      { q: "Placeholder question 4?", options: ["A", "B", "C", "D"], correct: 3, explain: "Placeholder explanation." }
    ],
    3: [
      { q: "Placeholder question 5?", options: ["A", "B", "C", "D"], correct: 0, explain: "Placeholder explanation." },
      { q: "Placeholder question 6?", options: ["A", "B", "C", "D"], correct: 1, explain: "Placeholder explanation." }
    ]
  };

  let currentSet = 1;
  let currentQuestions = QUIZ_SETS[currentSet];
  let userAnswers = new Array(currentQuestions.length).fill(null);

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

  function renderQuiz() {
    const body = document.getElementById('quizBody');
    if (!body) return;
    body.innerHTML = currentQuestions.map((q, qi) => `
      <div class="quiz-question" id="qq${qi}" style="margin-bottom:1.75rem;padding-bottom:1.75rem;border-bottom:1px solid var(--border-color);">
        <span class="q-number">Question ${qi + 1} of ${currentQuestions.length}</span>
        ${q.q}
        <div class="quiz-options" style="margin-top:0.875rem;">
          ${q.options.map((opt, oi) => `
            <label class="quiz-option" id="opt${qi}_${oi}" onclick="window.selectOption(${qi}, ${oi})">
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
      localStorage.setItem(`scripting-quiz-set-${currentSet}-passed`, 'true');
      if (isQuizMastered()) localStorage.setItem('scripting-quiz-passed', 'true');
    }
    if (window.updateFloatingRing) window.updateFloatingRing();

    // ✅ Update the header ring
    if (typeof updatePageHeader === 'function') {
      updatePageHeader('scripting');
    }

    document.getElementById('quizFeedback').style.display = 'none';
    document.getElementById('quizScore').classList.add('show');
    document.getElementById('scoreNum').textContent = `${score}/${currentQuestions.length}`;

    const pct = Math.round(score / currentQuestions.length * 100);
    const previousBest = localStorage.getItem('gc-score-scripting') || 0;
    if (pct > previousBest) {
      localStorage.setItem('gc-score-scripting', pct);
      if (typeof window.updateGlobalProgress === 'function') window.updateGlobalProgress();
    }

    let msg = '';
    if (pct === 100) msg = 'Perfect score!';
    else if (pct >= 80) msg = 'Strong result — review incorrect questions.';
    else if (pct >= 60) msg = 'Good foundation — review the sections.';
    else msg = 'Keep studying — revisit the sections above.';
    document.getElementById('scoreMsg').textContent = `${pct}% — ${msg}`;
    document.getElementById('quizScore').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  window.resetQuiz = function() {
    userAnswers = new Array(currentQuestions.length).fill(null);
    document.getElementById('quizScore').classList.remove('show');
    const fb = document.getElementById('quizFeedback');
    fb.className = 'quiz-feedback';
    fb.style.display = 'none';
    document.getElementById('quizProgressFill').style.width = '0%';
    renderQuiz();

    localStorage.removeItem(`scripting-quiz-set-${currentSet}-passed`);
    if (!isQuizMastered()) localStorage.removeItem('scripting-quiz-passed');
    if (window.updateFloatingRing) window.updateFloatingRing();

    // ✅ Update the header ring
    if (typeof updatePageHeader === 'function') {
      updatePageHeader('scripting');
    }
  };

  function isQuizMastered() {
    for (let i = 1; i <= 3; i++) {
      if (localStorage.getItem(`scripting-quiz-set-${i}-passed`) === 'true') return true;
    }
    return false;
  }

  document.getElementById('set1Btn')?.addEventListener('click', () => loadQuizSet(1));
  document.getElementById('set2Btn')?.addEventListener('click', () => loadQuizSet(2));
  document.getElementById('set3Btn')?.addEventListener('click', () => loadQuizSet(3));
  document.getElementById('resetAllBtn')?.addEventListener('click', function() {
    for (let i = 1; i <= 3; i++) localStorage.removeItem(`scripting-quiz-set-${i}-passed`);
    localStorage.removeItem('scripting-quiz-passed');
    if (window.updateFloatingRing) window.updateFloatingRing();
    if (typeof updatePageHeader === 'function') updatePageHeader('scripting');
  });

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
        const saved = localStorage.getItem(`scripting-section-${section}`);
        const isChecked = saved === 'true' ? true : false;
        cb.checked = isChecked;
        if (isChecked) checked++;
      });

      const quizPassed = localStorage.getItem('scripting-quiz-passed') === 'true';
      if (quizPassed) checked++;

      const percent = Math.round((checked / total) * 100);
      const offset = circumference - (percent / 100) * circumference;
      ringFill.style.strokeDasharray = circumference;
      ringFill.style.strokeDashoffset = offset;
      percentSpan.textContent = `${percent}%`;

      if (percent === 100) {
        const already = localStorage.getItem('scripting-100-congrats-shown');
        if (!already) {
          localStorage.setItem('scripting-100-congrats-shown', 'true');
          const toast = document.createElement('div');
          toast.className = 'coming-soon-toast';
          toast.innerHTML = '🎉 CONGRATULATIONS! 🎉<br>You have mastered Scripting & Automation!';
          toast.style.background = 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))';
          toast.style.padding = '12px 24px';
          toast.style.fontSize = '0.9rem';
          toast.style.fontWeight = 'bold';
          toast.style.textAlign = 'center';
          toast.style.borderRadius = '40px';
          document.body.appendChild(toast);
          setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
          }, 4000);
        }
      }
    }

    window.updateFloatingRing = updateFloatingRing;

    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const section = cb.dataset.section;
        localStorage.setItem(`scripting-section-${section}`, cb.checked);
        updateFloatingRing();

        // ✅ Update the header ring
        if (typeof updatePageHeader === 'function') {
          updatePageHeader('scripting');
        }
      });
    });

    floatingDiv.addEventListener('click', (e) => {
      e.stopPropagation();
      if (typeof window.openModalToPillarDetails === 'function') {
        window.openModalToPillarDetails('scripting', 'phase1');
      }
    });

    updateFloatingRing();
  }

  // ============================================================
  // IMAGE LIGHTBOX
  // ============================================================

  function initImageLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    if (!lightbox) return;

    document.querySelectorAll('.accordion-body img, .overview-content img').forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        const lightboxImg = document.getElementById('lightboxImg');
        if (lightboxImg) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'Enlarged image';
          lightbox.classList.add('active');
        }
      });
    });

    const closeBtn = document.getElementById('lightboxClose');
    if (closeBtn) closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
  }

  // ============================================================
  // RENDER EVERYTHING
  // ============================================================

  renderScriptingOverview();

  const containerIds = [
    'js-section1-container', 'js-section2-container', 'js-section3-container',
    'js-section4-container', 'js-section5-container', 'js-section6-container',
    'js-section7-container', 'js-section8-container', 'js-section9-container'
  ];

  containerIds.forEach((id, index) => {
    renderAccordion(id, [SECTION_ACCORDIONS[index]]);
  });

  renderFlashcards();
  renderQuiz();

  setTimeout(() => {
    if (typeof initCopyButtons === 'function') {
      const added = initCopyButtons();
      console.log(`✅ Copy buttons re-attached: ${added} added`);
    }
  }, 150);

  setTimeout(() => {
    if (typeof updateNavBadges === 'function') updateNavBadges();
  }, 200);

  initFloatingProgressRing();
  initImageLightbox();

  // ✅ Update page header
  if (typeof updatePageHeader === 'function') {
    updatePageHeader('scripting');
  }

  console.log('✅ Scripting & Automation pillar loaded');
});

// ============================================================
// ACCORDION TOGGLE (fallback)
// ============================================================
function toggleAccordion(header) {
  const accordion = header.closest('.accordion');
  if (!accordion) return;
  accordion.classList.toggle('open');
  header.setAttribute('aria-expanded', accordion.classList.contains('open'));
  const id = accordion.querySelector('.accordion-title')?.innerText || 'unknown';
  const openStates = JSON.parse(localStorage.getItem('gc-accordion-states') || '{}');
  openStates[id] = accordion.classList.contains('open');
  localStorage.setItem('gc-accordion-states', JSON.stringify(openStates));
}