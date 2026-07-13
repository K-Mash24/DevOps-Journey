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

  // ============================================================
  // SECTION 1 — Python Fundamentals
  // ============================================================
  const SECTION_1_ACCORDIONS = [
    {
      id: 's1-what-is-python',
      title: '1.1 What is Python, Actually?',
      priority: false,
      icon: '🐍',
      bodyHTML: `
        <p>Python is an <strong>interpreted</strong> language — there is no separate compile step producing a standalone executable before running (contrast with C, where source is compiled into a binary first). A program called the <strong>Python interpreter</strong> reads a <code>.py</code> file line by line and executes it directly.</p>
        <p>This gives a fast feedback loop: write code, run it, see the result immediately — exactly why Python dominates scripting and automation work.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Check version:</h4>
        <div class="code-block"><pre>python3 --version</pre></div>
        <p>Expected output:</p>
        <div class="code-block"><pre>Python 3.11.x</pre></div>
        <div class="info-box note">
          <strong>📌 Note:</strong> Always use <code>python3</code>, not <code>python</code>, on Linux. Many systems don't alias <code>python</code> to <code>python3</code> — bare <code>python</code> may fail with "command not found" or invoke a legacy Python 2 install if one still exists on the system.
        </div>
      `
    },
    {
      id: 's1-running-python',
      title: '1.2 Running Python Two Ways',
      priority: false,
      icon: '▶️',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">1. The interactive interpreter (REPL — Read-Eval-Print Loop)</h4>
        <div class="code-block"><pre>python3</pre></div>
        <p>Lands in an interactive prompt:</p>
        <div class="code-block"><pre>Python 3.11.4 (main, ...)
  Type "help", "copyright", "credits" or "license" for more information.
  >>></pre></div>
        <p>Type expressions, see results instantly:</p>
        <div class="code-block"><pre>>>> 2 + 2
  4
  >>> "hello" + " world"
  'hello world'</pre></div>
        <p>Exit with <code>exit()</code> or <code>Ctrl+D</code>.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">2. Running a script file</h4>
        <div class="code-block"><pre>nano hello.py</pre></div>
        <div class="code-block"><pre><span class="code-comment"># hello.py</span>
  print("Hello, DevOps Journey")</pre></div>
        <div class="code-block"><pre>python3 hello.py</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>Hello, DevOps Journey</pre></div>
        <div class="info-box tip">
          <strong>💡 Pro tip:</strong> The REPL is for quick experiments. Script files are for anything saved, edited, and reused — essentially everything in automation.
        </div>
      `
    },
    {
      id: 's1-variables',
      title: '1.3 Variables',
      priority: false,
      icon: '📦',
      bodyHTML: `
        <p>A <strong>variable</strong> is a name referring to a value stored in memory. Python is <strong>dynamically typed</strong> — no type declaration up front; the interpreter infers the type from the assigned value.</p>
        <div class="code-block"><pre>name = "Keith"
  age = 5
  is_learning = True</pre></div>
        <p>No <code>int name = 5</code> syntax (unlike Java/C). Just <code>name = value</code>.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Naming rules:</h4>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li>Letters, digits, underscores only; cannot start with a digit</li>
          <li>Case‑sensitive (<code>age</code> ≠ <code>Age</code>)</li>
          <li>Convention: <code>snake_case</code> (<code>user_name</code>, not <code>userName</code> — that's a Java/JavaScript convention)</li>
          <li><strong>Reserved keywords</strong> cannot be used as variable names (e.g., <code>if</code>, <code>for</code>, <code>while</code>, <code>def</code>, <code>return</code>).</li>
        </ul>
      `
    },
    {
      id: 's1-data-types',
      title: '1.4 Core Data Types',
      priority: false,
      icon: '📊',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Type</th><th>Example</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>int</code></td><td><code>42</code></td><td>Whole number</td></tr>
              <tr><td><code>float</code></td><td><code>3.14</code></td><td>Decimal number</td></tr>
              <tr><td><code>str</code></td><td><code>"hello"</code></td><td>Text (single or double quotes both valid)</td></tr>
              <tr><td><code>bool</code></td><td><code>True</code> / <code>False</code></td><td>Boolean — capitalized, unlike JSON/JS</td></tr>
              <tr><td><code>NoneType</code></td><td><code>None</code></td><td>Represents "no value" — Python's null</td></tr>
            </tbody>
          </table>
        </div>

        <p>Check type at runtime:</p>
        <div class="code-block"><pre>>>> x = 42
  >>> type(x)
  &lt;class 'int'&gt;</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Type conversion (casting):</h4>
        <div class="code-block"><pre>>>> str(42)        # '42'
  >>> int("42")       # 42
  >>> float("3.14")   # 3.14
  >>> int("abc")      # ValueError: invalid literal for int() with base 10: 'abc'</pre></div>
        <div class="info-box warning">
          <strong>⚠️ Callout:</strong> An impossible conversion raises an <strong>exception</strong> — an error that can be caught and handled programmatically (covered in Section 2). Scripts that accept external input must anticipate this.
        </div>
      `
    },
    {
      id: 's1-operators',
      title: '1.5 Basic Operators',
      priority: false,
      icon: '➕',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">Arithmetic:</h4>
        <div class="code-block"><pre>>>> 7 + 3    # 10
  >>> 7 - 3    # 4
  >>> 7 * 3    # 21
  >>> 7 / 3    # 2.333... (true division, always float)
  >>> 7 // 3   # 2 (floor division, discards remainder)
  >>> 7 % 3    # 1 (modulo — the remainder)
  >>> 7 ** 3   # 343 (exponentiation)</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Comparison</h4>
        <p>Returns <code>bool</code>:</p>
        <div class="code-block"><pre>>>> 5 == 5    # True
  >>> 5 != 3    # True
  >>> 5 > 3     # True
  >>> 5 <= 5    # True</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Logical:</h4>
        <div class="code-block"><pre>>>> True and False   # False
  >>> True or False    # True
  >>> not True          # False</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Truthiness (important!)</h4>
        <p>In Python, any value can be used in a boolean context. The following are considered <code>False</code>:</p>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><code>None</code></li>
          <li><code>False</code></li>
          <li>Zero of any numeric type (<code>0</code>, <code>0.0</code>)</li>
          <li>Empty sequences/collections (<code>""</code>, <code>[]</code>, <code>()</code>, <code>{}</code>, <code>set()</code>)</li>
        </ul>
        <p>Everything else is <code>True</code>.</p>
        <div class="code-block"><pre>>>> if []:
  ...     print("True")
  ... else:
  ...     print("False")
  False</pre></div>
        <p>This makes code like <code>if not user_list:</code> very common and clean.</p>
      `
    },
    {
      id: 's1-strings',
      title: '1.6 Strings in Depth',
      priority: false,
      icon: '📝',
      bodyHTML: `
        <p>Strings are <strong>immutable</strong> — an existing string object cannot be changed in place. Methods that appear to modify a string actually return a new string.</p>
        <div class="code-block"><pre>>>> s = "hello"
  >>> s.upper()
  'HELLO'
  >>> s              # unchanged
  'hello'</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">f-strings</h4>
        <p>Modern, preferred formatting method:</p>
        <div class="code-block"><pre>>>> name = "Keith"
  >>> pillar = 4
  >>> print(f"{name} is on Pillar {pillar}")
  Keith is on Pillar 4</pre></div>
        <p>The <code>f</code> prefix enables <code>{}</code> to embed variables directly, replacing older <code>.format()</code> and <code>%</code>-style formatting (still seen in legacy code, but you don't need to master them — just recognise them).</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Common string methods:</h4>
        <div class="code-block"><pre>>>> s = "  Hello World  "
  >>> s.strip()                       # 'Hello World' — trims whitespace
  >>> s.lower()                       # '  hello world  '
  >>> s.replace("World", "Python")    # '  Hello Python  '
  >>> s.split(" ")                    # ['', '', 'Hello', 'World', '', '']
  >>> len(s)                          # 15 (includes spaces)</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Slicing:</h4>
        <div class="code-block"><pre>>>> s = "networking"
  >>> s[0]        # 'n' (first character, index 0)
  >>> s[0:4]      # 'netw' (index 0 up to, not including, 4)
  >>> s[-1]       # 'g' (negative indexing counts from the end)
  >>> s[::-1]     # 'gnikrowten' (reversed)</pre></div>
        <div class="info-box warning">
          <strong>⚠️ Critical detail:</strong> Python indexing is <strong>zero-based</strong> — the first character is index <code>0</code>. This is consistent across all sequence types (strings, lists, tuples) and is a frequent early source of off-by-one errors.
        </div>
      `
    },
    {
      id: 's1-comments',
      title: '1.7 Comments',
      priority: false,
      icon: '💬',
      bodyHTML: `
        <p>Comments are ignored by the interpreter; they exist solely for human readers. Use them to explain <em>why</em> something is done, not <em>what</em> is done (the code itself shows what).</p>
        <div class="code-block"><pre><span class="code-comment"># Single-line comment</span>

  <span class="code-comment">"""
  Multi-line comment / docstring
  (usually used for function/module documentation)
  """</span></pre></div>
        <p>In scripts, always start with a comment explaining the purpose:</p>
        <div class="code-block"><pre><span class="code-comment"># check_pillar_status.py</span>
  <span class="code-comment"># Checks the completion status of Phase 1 pillars</span></pre></div>
      `
    },
    {
      id: 's1-collections',
      title: '1.8 Collections: Lists, Tuples, Dicts',
      priority: false,
      icon: '📚',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">Lists</h4>
        <p>Ordered, mutable:</p>
        <div class="code-block"><pre>>>> tools = ["docker", "kubernetes", "terraform"]
  >>> tools[0]                # 'docker'
  >>> tools.append("ansible")
  >>> tools
  ['docker', 'kubernetes', 'terraform', 'ansible']
  >>> tools[1] = "k8s"        # mutate in place
  >>> len(tools)              # 4</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Tuples</h4>
        <p>Ordered, <strong>immutable</strong>:</p>
        <div class="code-block"><pre>>>> coords = (10, 20)
  >>> coords[0]      # 10
  >>> coords[0] = 5  # TypeError: 'tuple' object does not support item assignment</pre></div>
        <p>Use tuples for data that should not change — e.g., a fixed coordinate pair, or a function returning a fixed group of values.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Dictionaries (<code>dict</code>)</h4>
        <p>Key-value pairs:</p>
        <div class="code-block"><pre>>>> user = {"name": "Keith", "pillar": 4, "active": True}
  >>> user["name"]           # 'Keith'
  >>> user["pillar"] = 5      # update value
  >>> user["cert"] = "CCP"    # add new key
  >>> user
  {'name': 'Keith', 'pillar': 5, 'active': True, 'cert': 'CCP'}
  >>> user.keys()             # dict_keys(['name', 'pillar', 'active', 'cert'])
  >>> user.values()           # dict_values(['Keith', 5, True, 'CCP'])</pre></div>
        <div class="info-box note">
          <strong>📌 DevOps connection:</strong> Dictionaries map almost one‑to‑one onto <strong>JSON</strong> objects — the data format used by virtually every REST API (Sections 6–8 of this pillar).
        </div>
      `
    },
    {
      id: 's1-conditionals',
      title: '1.9 Control Flow — Conditionals',
      priority: false,
      icon: '🔀',
      bodyHTML: `
        <div class="code-block"><pre>score = 85

  if score >= 90:
      print("A grade")
  elif score >= 80:
      print("B grade")
  else:
      print("C grade or below")</pre></div>
        <p>Output: <code>B grade</code></p>
        <div class="info-box warning">
          <strong>⚠️ Critical syntax rule:</strong> Python uses <strong>indentation</strong> to define code blocks — not curly braces <code>{}</code> (unlike C/Java/JavaScript). Convention: <strong>4 spaces</strong> per level. Never mix tabs and spaces — causes <code>IndentationError</code>.
        </div>
      `
    },
    {
      id: 's1-loops',
      title: '1.10 Control Flow — Loops',
      priority: false,
      icon: '🔄',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;"><code>for</code> loop:</h4>
        <div class="code-block"><pre>tools = ["docker", "kubernetes", "terraform"]
  for tool in tools:
      print(f"Learning: {tool}")</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>Learning: docker
  Learning: kubernetes
  Learning: terraform</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>range()</code>:</h4>
        <div class="code-block"><pre>for i in range(5):
      print(i)</pre></div>
        <p>Output: <code>0 1 2 3 4</code> — <code>range(5)</code> produces five values, 0 through 4, not through 5.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>while</code> loop:</h4>
        <div class="code-block"><pre>count = 0
  while count < 3:
      print(f"Count is {count}")
      count += 1   # shorthand for count = count + 1</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>Count is 0
  Count is 1
  Count is 2</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>break</code> and <code>continue</code></h4>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><code>break</code> exits the loop immediately.</li>
          <li><code>continue</code> skips the rest of the current iteration and moves to the next.</li>
        </ul>
      `
    },
    {
      id: 's1-input-output',
      title: '1.11 Simple Input/Output',
      priority: false,
      icon: '⌨️',
      bodyHTML: `
        <p>To make scripts interactive, use <code>input()</code>:</p>
        <div class="code-block"><pre>name = input("Enter your name: ")
  print(f"Hello, {name}!")</pre></div>
        <p><code>input()</code> always returns a string. Convert if needed:</p>
        <div class="code-block"><pre>age = int(input("Enter your age: "))</pre></div>
      `
    },
    {
      id: 's1-hands-on',
      title: '🖥️ Hands-on Exercise',
      priority: false,
      icon: '💻',
      bodyHTML: `
        <p>Create a script called <code>pillar_status.py</code> that:</p>
        <ol style="padding-left:1.2rem;margin:0.5rem 0;">
          <li>Defines a dictionary for each Phase 1 pillar (networking, linux, security, scripting, databases) with keys <code>name</code> and <code>completed</code> (boolean).</li>
          <li>Stores these dictionaries in a list.</li>
          <li>Loops through the list and prints:
            <ul style="margin:0.25rem 0 0 1.2rem;">
              <li><code>"Pillar: &lt;name&gt; — COMPLETE"</code> if <code>completed</code> is <code>True</code></li>
              <li><code>"Pillar: &lt;name&gt; — IN PROGRESS"</code> if <code>completed</code> is <code>False</code></li>
            </ul>
          </li>
          <li>Asks the user for their current pillar and prints a personalised status message using the data.</li>
        </ol>
        <div class="code-block"><pre>nano pillar_status.py</pre></div>
        <p>Run:</p>
        <div class="code-block"><pre>python3 pillar_status.py</pre></div>
      `
    },
    {
      id: 's1-devops-connection',
      title: 'DevOps Connection',
      priority: false,
      icon: '⚙️',
      bodyHTML: `
        <p>Python is the dominant language for infrastructure automation glue code — custom scripts calling APIs, parsing config files, orchestrating deployment steps beyond what Bash alone handles cleanly. Ansible (Phase 2, Pillar 4) is written in Python; its modules are Python under the hood.</p>
        <div class="info-box note">
          <strong>📌 Next section:</strong> <a href="#" style="color:var(--accent-secondary);">Python Functions, Modules &amp; Error Handling</a>
        </div>
      `
    }
  ];
  // ============================================================
  // SECTION 2 — Python Functions, Modules & Error Handling
  // ============================================================
  const SECTION_2_ACCORDIONS = [
    {
      id: 's2-functions',
      title: '2.1 Functions — Why They Exist',
      priority: false,
      icon: '⚡',
      bodyHTML: `
        <p>A <strong>function</strong> is a named, reusable block of code that performs a specific task. Instead of copy-pasting the same logic repeatedly, you define it once and <em>call</em> it wherever needed.</p>
        <div class="code-block"><pre>def greet(name):
      print(f"Hello, {name}")

  greet("Keith")
  greet("Codespace")</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>Hello, Keith
  Hello, Codespace</pre></div>
        <p>Breaking this down:</p>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><code>def</code> — keyword that begins a function definition</li>
          <li><code>greet</code> — the function's name (snake_case convention, same as variables)</li>
          <li><code>(name)</code> — a <strong>parameter</strong>: a placeholder for input the function needs to do its job</li>
          <li>The indented block below is the function <strong>body</strong> — executed every time the function is called</li>
          <li><code>greet("Keith")</code> — a <strong>function call</strong>; <code>"Keith"</code> here is the <strong>argument</strong> — the actual value passed in for <code>name</code></li>
        </ul>
      `
    },
    {
      id: 's2-return',
      title: '2.2 return — Sending a Value Back',
      priority: false,
      icon: '↩️',
      bodyHTML: `
        <p><code>print()</code> displays something to the terminal, but it doesn't give the caller a value to use afterward. <code>return</code> does.</p>
        <div class="code-block"><pre>def add(a, b):
      return a + b

  result = add(5, 3)
  print(result)      # 8</pre></div>
        <p>Once <code>return</code> executes, the function exits immediately — code after <code>return</code> in that function never runs.</p>
        <div class="code-block"><pre>def check_positive(n):
      if n > 0:
          return "positive"
      return "not positive"</pre></div>
        <p>A function with no explicit <code>return</code> implicitly returns <code>None</code>:</p>
        <div class="code-block"><pre>def log_message(msg):
      print(msg)

  output = log_message("test")
  print(output)   # None</pre></div>
        <div class="info-box warning">
          <strong>⚠️ Pitfall:</strong> Forgetting that a function returns <code>None</code> can cause confusing downstream errors. If the caller expects a value, always add an explicit <code>return</code>.
        </div>
      `
    },
    {
      id: 's2-default-params',
      title: '2.3 Default Parameters and Keyword Arguments',
      priority: false,
      icon: '⚙️',
      bodyHTML: `
        <p>Parameters can have default values, making them optional at call time:</p>
        <div class="code-block"><pre>def greet(name, greeting="Hello"):
      print(f"{greeting}, {name}")

  greet("Keith")                     # Hello, Keith
  greet("Keith", "Welcome back")     # Welcome back, Keith
  greet(name="Keith", greeting="Hi") # Hi, Keith — keyword arguments, order doesn't matter</pre></div>
        <div class="info-box warning">
          <strong>⚠️ Pitfall:</strong> Default parameters must come <em>after</em> non-default ones in the function signature. <code>def greet(greeting="Hello", name)</code> is a <code>SyntaxError</code>.
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Mutable Default Arguments — Classic Python Trap</h4>
        <div class="code-block"><pre>def add_item(item, items=[]):
      items.append(item)
      return items

  print(add_item("a"))   # ['a']
  print(add_item("b"))   # ['a', 'b']  ← Unexpected! The same list persists</pre></div>
        <p><strong>Fix:</strong> Use <code>None</code> as default and create the mutable object inside the function:</p>
        <div class="code-block"><pre>def add_item(item, items=None):
      if items is None:
          items = []
      items.append(item)
      return items

  print(add_item("a"))   # ['a']
  print(add_item("b"))   # ['b']  ← Correct! Fresh list each time</pre></div>
      `
    },
    {
      id: 's2-args-kwargs',
      title: '2.4 *args and **kwargs',
      priority: false,
      icon: '📦',
      bodyHTML: `
        <p>Sometimes you don't know in advance how many arguments a function needs to accept.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>*args</code></h4>
        <p>Collects any number of extra positional arguments into a tuple:</p>
        <div class="code-block"><pre>def total(*args):
      return sum(args)

  total(1, 2, 3)        # 6
  total(1, 2, 3, 4, 5)  # 15</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>**kwargs</code></h4>
        <p>Collects any number of extra keyword arguments into a dict:</p>
        <div class="code-block"><pre>def describe(**kwargs):
      for key, value in kwargs.items():
          print(f"{key}: {value}")

  describe(name="Keith", pillar=4, status="in progress")</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>name: Keith
  pillar: 4
  status: in progress</pre></div>
        <div class="info-box note">
          <strong>📌 Note:</strong> <code>*args</code> and <code>**kwargs</code> appear constantly in library code — they let a function accept flexible, open-ended input.
        </div>
      `
    },
    {
      id: 's2-scope',
      title: '2.5 Scope — Local vs Global',
      priority: false,
      icon: '🔭',
      bodyHTML: `
        <p>A variable created inside a function only exists inside that function — this is called <strong>local scope</strong>.</p>
        <div class="code-block"><pre>def my_function():
      x = 10       # local to my_function
      print(x)

  my_function()   # 10
  print(x)        # NameError: name 'x' is not defined</pre></div>

        <p>Variables defined outside any function have <strong>global scope</strong> and are readable (but not directly writable) from inside functions:</p>
        <div class="code-block"><pre>counter = 0

  def show_counter():
      print(counter)   # readable — 0

  show_counter()</pre></div>

        <p>To <em>modify</em> a global variable from inside a function, it must be explicitly declared with <code>global</code>:</p>
        <div class="code-block"><pre>counter = 0

  def increment():
      global counter
      counter += 1

  increment()
  increment()
  print(counter)   # 2</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">⚠️ Why <code>global</code> is Dangerous</h4>
        <div class="code-block"><pre><span class="code-comment"># BAD — this function silently modifies a global variable</span>
  total = 0
  def add_to_total(n):
      global total
      total += n
      <span class="code-comment"># No indication to the caller that total changed</span>

  <span class="code-comment"># GOOD — explicit and predictable</span>
  def add(n, total):
      return total + n</pre></div>
        <div class="info-box warning">
          <strong>⚠️ Rule:</strong> Avoid <code>global</code> except for genuinely shared state in very small scripts. Prefer passing values as arguments and returning results.
        </div>
      `
    },
    {
      id: 's2-modules',
      title: '2.6 Modules — Organizing and Reusing Code',
      priority: false,
      icon: '📁',
      bodyHTML: `
        <p>A <strong>module</strong> is simply a <code>.py</code> file containing Python code — functions, variables, classes — that can be imported and reused in other files.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Using a built-in module:</h4>
        <div class="code-block"><pre>import math

  print(math.sqrt(16))     # 4.0
  print(math.pi)           # 3.141592653589793</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Importing specific names only:</h4>
        <div class="code-block"><pre>from math import sqrt, pi

  print(sqrt(16))   # 4.0
  print(pi)          # 3.141592653589793</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Aliasing on import:</h4>
        <div class="code-block"><pre>import datetime as dt

  now = dt.datetime.now()
  print(now)</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Writing your own module:</h4>
        <p>Create <code>helpers.py</code>:</p>
        <div class="code-block"><pre>def double(n):
      return n * 2</pre></div>
        <p>In another file in the same directory:</p>
        <div class="code-block"><pre>import helpers

  print(helpers.double(5))   # 10</pre></div>
        <div class="info-box note">
          <strong>📌 Note:</strong> This is exactly the pattern used once scripts grow beyond a single file — shared logic (API calls, logging setup, config loading) lives in its own module and gets imported wherever needed.
        </div>
      `
    },
    {
      id: 's2-stdlib',
      title: '2.7 Commonly Used Standard Library Modules',
      priority: false,
      icon: '📚',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Module</th><th>Purpose</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td><code>os</code></td><td>Interact with the operating system</td><td><code>os.getcwd()</code>, <code>os.listdir()</code></td></tr>
              <tr><td><code>sys</code></td><td>Interact with the interpreter/runtime</td><td><code>sys.argv</code> (command-line arguments)</td></tr>
              <tr><td><code>datetime</code></td><td>Dates and times</td><td><code>datetime.datetime.now()</code></td></tr>
              <tr><td><code>json</code></td><td>Parse/generate JSON (Section 8)</td><td><code>json.loads()</code>, <code>json.dumps()</code></td></tr>
              <tr><td><code>subprocess</code></td><td>Run shell commands from Python</td><td><code>subprocess.run(["ls", "-l"])</code></td></tr>
              <tr><td><code>random</code></td><td>Generate random values</td><td><code>random.randint(1, 10)</code></td></tr>
            </tbody>
          </table>
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>sys.argv</code> — Command-line arguments:</h4>
        <div class="code-block"><pre><span class="code-comment"># script.py</span>
  import sys

  print(f"Script name: {sys.argv[0]}")
  print(f"Arguments: {sys.argv[1:]}")

  <span class="code-comment"># python3 script.py arg1 arg2</span>
  <span class="code-comment"># Script name: script.py</span>
  <span class="code-comment"># Arguments: ['arg1', 'arg2']</span></pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>subprocess</code> — Running shell commands:</h4>
        <div class="code-block"><pre>import subprocess

  result = subprocess.run(["ls", "-l"], capture_output=True, text=True)
  print(result.stdout)   # outputs the directory listing</pre></div>
      `
    },
    {
      id: 's2-exceptions',
      title: '2.8 Errors and Exceptions',
      priority: false,
      icon: '🚨',
      bodyHTML: `
        <p>When Python encounters a problem it can't proceed past, it raises an <strong>exception</strong> — the program halts and prints a <strong>traceback</strong> showing what went wrong and where.</p>
        <div class="code-block"><pre>>>> 10 / 0
  ZeroDivisionError: division by zero

  >>> int("abc")
  ValueError: invalid literal for int() with base 10: 'abc'

  >>> undefined_variable
  NameError: name 'undefined_variable' is not defined</pre></div>

        <p><strong>Exception hierarchy:</strong> Exceptions form a tree. <code>ZeroDivisionError</code> is a subclass of <code>ArithmeticError</code>, which is a subclass of <code>Exception</code>. This means catching <code>Exception</code> catches everything — which is convenient, but also dangerous (see pitfalls below).</p>

        <div class="info-box warning">
          <strong>⚠️ Important:</strong> Left unhandled, an exception <strong>crashes the script</strong>. In automation, that's often unacceptable — a script processing 1,000 files shouldn't die entirely because file #47 was malformed.
        </div>
      `
    },
    {
      id: 's2-try-except',
      title: '2.9 try/except — Handling Exceptions Gracefully',
      priority: false,
      icon: '🛡️',
      bodyHTML: `
        <div class="code-block"><pre>try:
      result = 10 / 0
  except ZeroDivisionError:
      print("Cannot divide by zero")</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>Cannot divide by zero</pre></div>
        <p>The program continues running after the <code>except</code> block — it does not crash.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Catching multiple exception types:</h4>
        <div class="code-block"><pre>def safe_divide(a, b):
      try:
          return a / b
      except ZeroDivisionError:
          print("Error: division by zero")
      except TypeError:
          print("Error: invalid types for division")

  safe_divide(10, 0)      # Error: division by zero
  safe_divide(10, "a")    # Error: invalid types for division</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Catching any exception (use sparingly — see pitfalls below):</h4>
        <div class="code-block"><pre>try:
      risky_operation()
  except Exception as e:
      print(f"Something went wrong: {e}")</pre></div>
        <p><code>as e</code> binds the exception object to a variable so its message can be inspected.</p>
      `
    },
    {
      id: 's2-else-finally',
      title: '2.10 else and finally',
      priority: false,
      icon: '🔚',
      bodyHTML: `
        <div class="code-block"><pre>try:
      result = 10 / 2
  except ZeroDivisionError:
      print("Error")
  else:
      print(f"Success: {result}")    # runs only if no exception occurred
  finally:
      print("This always runs")      # runs no matter what — success or failure</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>Success: 5.0
  This always runs</pre></div>

        <p><code>finally</code> is commonly used for cleanup — closing a file, closing a network connection — that must happen whether or not an error occurred.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>finally</code> with file operations (preview of Section 3):</h4>
        <div class="code-block"><pre>f = None
  try:
      f = open("data.txt", "r")
      content = f.read()
  except FileNotFoundError:
      print("File not found")
  finally:
      if f:
          f.close()   # Always close the file, even if an error occurs</pre></div>
      `
    },
    {
      id: 's2-raise',
      title: '2.11 Raising Your Own Exceptions',
      priority: false,
      icon: '🔴',
      bodyHTML: `
        <p><code>raise</code> deliberately triggers an exception — useful for enforcing that input meets certain conditions:</p>
        <div class="code-block"><pre>def set_age(age):
      if age < 0:
          raise ValueError("Age cannot be negative")
      return age

  set_age(-5)   # ValueError: Age cannot be negative</pre></div>
        <div class="info-box note">
          <strong>📌 Note:</strong> This is how well-written functions protect against invalid input rather than silently producing wrong results.
        </div>
      `
    },
    {
      id: 's2-pitfalls',
      title: 'Pitfalls Table',
      priority: false,
      icon: '🚫',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pitfall</th><th>Why it's a problem</th><th>Fix</th></tr></thead>
            <tbody>
              <tr>
                <td>Bare <code>except:</code> with no exception type</td>
                <td>Silently swallows <em>every</em> error, including ones you didn't anticipate (e.g., <code>KeyboardInterrupt</code>), making bugs invisible</td>
                <td>Catch specific exception types; use <code>except Exception as e</code> at most, and log <code>e</code></td>
              </tr>
              <tr>
                <td>Overusing <code>global</code></td>
                <td>Functions that mutate shared state become hard to trace and debug as scripts grow</td>
                <td>Pass values as arguments, return results; reserve <code>global</code> for genuinely shared counters/state</td>
              </tr>
              <tr>
                <td>Default parameter comes before non-default</td>
                <td><code>SyntaxError</code> at definition time</td>
                <td>Order non-default parameters first, defaults after</td>
              </tr>
              <tr>
                <td>Mutable default arguments (<code>def f(items=[])</code>)</td>
                <td>The same list object is reused across all calls, causing unexpected shared state</td>
                <td>Use <code>None</code> as default, then create the mutable object inside the function body</td>
              </tr>
              <tr>
                <td>Forgetting a function has an implicit <code>None</code> return</td>
                <td>Assigning the result of a function with no <code>return</code> gives <code>None</code>, causing confusing downstream errors</td>
                <td>Always add an explicit <code>return</code> if the caller needs a value</td>
              </tr>
              <tr>
                <td>Catching <code>Exception</code> without logging</td>
                <td>Errors become invisible, making debugging impossible</td>
                <td>Log the exception with <code>print(e)</code> or use a proper logging library</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 's2-hands-on',
      title: '🖥️ Hands-on Exercise',
      priority: false,
      icon: '💻',
      bodyHTML: `
        <p>In <code>/workspaces/DevOps-Journey</code>:</p>
        <div class="code-block"><pre>nano practice2.py</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Part 1:</h4>
        <ol style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li>Define a function <code>divide(a, b)</code> that returns <code>a / b</code>, using <code>try/except</code> to catch <code>ZeroDivisionError</code> and print a friendly message instead of crashing</li>
          <li>Define a function <code>pillar_status(**kwargs)</code> that prints each keyword argument passed in (e.g., call it with <code>name="scripting", section=2, status="in progress"</code>)</li>
          <li>Import the <code>os</code> module and print the current working directory</li>
        </ol>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Part 2:</h4>
        <ol style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;" start="4">
          <li>Write a function <code>validate_username(username)</code> that:
            <ul style="margin:0.25rem 0 0 1.2rem;">
              <li>Raises <code>ValueError("Username must be at least 3 characters")</code> if too short</li>
              <li>Raises <code>ValueError("Username must be alphanumeric")</code> if it contains spaces or special characters</li>
              <li>Returns <code>True</code> if valid</li>
            </ul>
          </li>
          <li>Test it with <code>validate_username("a")</code>, <code>validate_username("user name")</code>, and <code>validate_username("valid_user")</code></li>
        </ol>

        <p>Run:</p>
        <div class="code-block"><pre>python3 practice2.py</pre></div>
      `
    },
    {
      id: 's2-devops-connection',
      title: 'DevOps Connection',
      priority: false,
      icon: '⚙️',
      bodyHTML: `
        <p>Error handling is the difference between a script that fails loudly and stops an entire pipeline, versus one that logs the problem, skips the bad input, and keeps going. CI/CD pipelines (Phase 2) live or die on scripts handling unexpected input predictably — a deployment script that crashes on one malformed config file instead of catching and reporting the issue can take down an entire release process.</p>
        <div class="info-box note">
          <strong>📌 Next section:</strong> <a href="#" style="color:var(--accent-secondary);">File I/O in Python</a>
        </div>
      `
    }
  ];
  // ============================================================
  // SECTION 3 — File I/O in Python
  // ============================================================
  const SECTION_3_ACCORDIONS = [
    {
      id: 's3-why-file-io',
      title: '3.1 Why File I/O Matters for Automation',
      priority: false,
      icon: '📁',
      bodyHTML: `
        <p>Scripts in DevOps constantly read configuration, write logs, or process data dumped by other tools. Being comfortable opening, reading, and writing files is the difference between a script that only works interactively and one that runs unattended as part of a pipeline.</p>
        <div class="info-box note">
          <strong>📌 Key insight:</strong> File I/O is the bridge between your script and the outside world — configuration files, logs, data exports, and state persistence all rely on it.
        </div>
      `
    },
    {
      id: 's3-open-basics',
      title: '3.2 Opening a File — The Basics',
      priority: false,
      icon: '📂',
      bodyHTML: `
        <div class="code-block"><pre>f = open("notes.txt", "r")
  content = f.read()
  print(content)
  f.close()</pre></div>

        <p><code>open()</code> takes a filename and a <strong>mode</strong>:</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Mode</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>"r"</code></td><td>Read (default) — file must exist</td></tr>
              <tr><td><code>"w"</code></td><td>Write — creates file if missing, <strong>overwrites</strong> if it exists</td></tr>
              <tr><td><code>"a"</code></td><td>Append — creates file if missing, adds to the end if it exists</td></tr>
              <tr><td><code>"x"</code></td><td>Exclusive create — fails if file already exists</td></tr>
              <tr><td><code>"r+"</code></td><td>Read and write, file must exist</td></tr>
              <tr><td><code>"rb"</code></td><td>Read binary (e.g., images, binaries)</td></tr>
              <tr><td><code>"wb"</code></td><td>Write binary</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box warning">
          <strong>⚠️ Critical:</strong> <code>"w"</code> mode <strong>destroys existing content</strong> the instant the file is opened, even if <code>.write()</code> is never called. Double-check the mode before running a script against a file you care about.
        </div>
        <p>Calling <code>f.close()</code> manually is required to release the file handle — forgetting it can leave data unflushed to disk or lock the file on some systems.</p>
      `
    },
    {
      id: 's3-with-statement',
      title: '3.3 The with Statement — Context Managers (The Correct Way)',
      priority: false,
      icon: '🔒',
      bodyHTML: `
        <p>Manually closing files is error-prone — an exception between <code>open()</code> and <code>close()</code> skips the close entirely. Python's <code>with</code> statement guarantees the file closes automatically, even if an error occurs inside the block.</p>
        <div class="code-block"><pre>with open("notes.txt", "r") as f:
      content = f.read()
      print(content)
  <span class="code-comment"># f is automatically closed here, even if an exception occurred above</span></pre></div>
        <p>This is called a <strong>context manager</strong> — <code>with</code> handles setup (opening) and guaranteed teardown (closing) around the indented block. This is the idiomatic way to work with files in Python; manual <code>open()</code>/<code>close()</code> is considered legacy style.</p>
        <div class="info-box note">
          <strong>📌 Note:</strong> <code>with</code> works with any context manager, not just files — database connections, network sockets, and locks all use the same pattern.
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Specifying encoding (critical for cross-platform compatibility):</h4>
        <div class="code-block"><pre>with open("notes.txt", "r", encoding="utf-8") as f:
      content = f.read()</pre></div>
        <p>Without specifying encoding, Python uses the system default, which may differ across platforms and cause unexpected errors when reading files with non-ASCII characters.</p>
      `
    },
    {
      id: 's3-reading-files',
      title: '3.4 Reading Files — Three Methods',
      priority: false,
      icon: '📖',
      bodyHTML: `
        <div class="code-block"><pre><span class="code-comment"># Method 1: .read() — entire file as one string</span>
  with open("notes.txt", "r") as f:
      content = f.read()</pre></div>

        <div class="code-block"><pre><span class="code-comment"># Method 2: .readlines() — list of strings, one per line</span>
  with open("notes.txt", "r") as f:
      lines = f.readlines()       # each line keeps its trailing \\n</pre></div>

        <div class="code-block"><pre><span class="code-comment"># Method 3: Iterate directly — memory-efficient, reads one line at a time</span>
  with open("notes.txt", "r") as f:
      for line in f:
          print(line.strip())      # .strip() removes the trailing newline</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">When to use which:</h4>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><code>.read()</code> — small files, need the whole content as one block (e.g., a config string)</li>
          <li><code>.readlines()</code> — need random access to specific lines, or need a list to manipulate</li>
          <li>Iterating directly over <code>f</code> — large files, processing line-by-line without loading everything into memory at once</li>
        </ul>
      `
    },
    {
      id: 's3-writing-files',
      title: '3.5 Writing Files',
      priority: false,
      icon: '✍️',
      bodyHTML: `
        <div class="code-block"><pre>with open("output.txt", "w") as f:
      f.write("First line\\n")
      f.write("Second line\\n")</pre></div>
        <div class="info-box warning">
          <strong>⚠️ Note:</strong> <code>.write()</code> does <strong>not</strong> add a newline automatically — <code>\\n</code> must be included manually, unlike <code>print()</code> which adds one by default.
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Writing multiple lines from a list:</h4>
        <div class="code-block"><pre>lines = ["docker\\n", "kubernetes\\n", "terraform\\n"]

  with open("tools.txt", "w") as f:
      f.writelines(lines)</pre></div>
        <p><code>.writelines()</code> does not add newlines between items either — they must already be present in each string.</p>
      `
    },
    {
      id: 's3-append-vs-overwrite',
      title: '3.6 Appending vs Overwriting',
      priority: false,
      icon: '➕',
      bodyHTML: `
        <div class="code-block"><pre><span class="code-comment"># First run</span>
  with open("log.txt", "w") as f:
      f.write("Log started\\n")

  <span class="code-comment"># Second run — using "w" again would DESTROY the first line</span>
  with open("log.txt", "a") as f:
      f.write("Second entry\\n")</pre></div>
        <p>After both runs, <code>log.txt</code> contains:</p>
        <div class="code-block"><pre>Log started
  Second entry</pre></div>
        <div class="info-box warning">
          <strong>⚠️ Critical:</strong> Using <code>"w"</code> on the second run instead of <code>"a"</code> would leave only <code>Second entry</code> — the first line gone without warning.
        </div>
      `
    },
    {
      id: 's3-file-exists',
      title: '3.7 Checking Whether a File Exists First',
      priority: false,
      icon: '🔍',
      bodyHTML: `
        <p>Attempting to read a file that doesn't exist raises <code>FileNotFoundError</code>:</p>
        <div class="code-block"><pre>>>> open("missing.txt", "r")
  FileNotFoundError: [Errno 2] No such file or directory: 'missing.txt'</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Option 1: Check first (using <code>os.path</code>)</h4>
        <div class="code-block"><pre>import os

  if os.path.exists("notes.txt"):
      with open("notes.txt", "r") as f:
          print(f.read())
  else:
      print("File not found")</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Option 2: Handle the exception (preferred — avoids race conditions)</h4>
        <div class="code-block"><pre>try:
      with open("notes.txt", "r") as f:
          print(f.read())
  except FileNotFoundError:
      print("File not found")</pre></div>
        <div class="info-box tip">
          <strong>💡 Why exception handling is preferred:</strong> Checking existence first and then opening is technically two separate operations — something else (another process, a scheduled cleanup job) could delete the file in between, causing the "checked" branch to still fail.
        </div>
      `
    },
    {
      id: 's3-file-paths',
      title: '3.8 Working with File Paths',
      priority: false,
      icon: '🗺️',
      bodyHTML: `
        <p>Hardcoding paths like <code>"notes.txt"</code> only works if the script runs from the exact directory containing that file.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Using <code>os.path</code> (traditional):</h4>
        <div class="code-block"><pre>import os

  path = os.path.join("saa-foundation", "04-scripting", "notes.txt")
  print(path)   # saa-foundation/04-scripting/notes.txt</pre></div>
        <p><code>os.path.join()</code> handles the correct path separator for the operating system automatically (<code>/</code> on Linux/Mac, <code>\\</code> on Windows) — safer than hardcoding slashes.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Useful <code>os.path</code> functions:</h4>
        <div class="code-block"><pre>os.path.exists(path)     # True/False — does it exist
  os.path.isfile(path)     # True/False — is it a file (not a directory)
  os.path.isdir(path)      # True/False — is it a directory
  os.path.abspath(path)    # converts to full absolute path
  os.path.basename(path)   # just the filename, e.g. 'notes.txt'
  os.path.dirname(path)    # just the directory portion</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Using <code>pathlib</code> (modern, recommended):</h4>
        <div class="code-block"><pre>from pathlib import Path

  path = Path("saa-foundation") / "04-scripting" / "notes.txt"
  print(path)               # saa-foundation/04-scripting/notes.txt
  print(path.exists())      # True/False
  print(path.is_file())     # True/False
  print(path.name)          # 'notes.txt'
  print(path.parent)        # 'saa-foundation/04-scripting'

  <span class="code-comment"># Read and write directly from pathlib</span>
  content = Path("notes.txt").read_text()
  Path("output.txt").write_text("Hello, World!\\n")</pre></div>
        <div class="info-box tip">
          <strong>💡 Recommendation:</strong> <code>pathlib</code> is the modern standard in Python 3.4+ and is more intuitive than <code>os.path</code>. It's worth adopting for new code.
        </div>
      `
    },
    {
      id: 's3-delimited-data',
      title: '3.9 Reading and Writing Simple Delimited Data Manually',
      priority: false,
      icon: '📊',
      bodyHTML: `
        <p>Not every task needs the <code>csv</code> module — sometimes simple line-splitting is enough for basic comma- or pipe-separated data:</p>
        <div class="code-block"><pre>with open("servers.txt", "r") as f:
      for line in f:
          parts = line.strip().split(",")
          name, ip = parts[0], parts[1]
          print(f"Server: {name}, IP: {ip}")</pre></div>
        <p>Given <code>servers.txt</code> containing:</p>
        <div class="code-block"><pre>web01,192.168.1.10
  web02,192.168.1.11</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>Server: web01, IP: 192.168.1.10
  Server: web02, IP: 192.168.1.11</pre></div>
        <div class="info-box note">
          <strong>📌 Note:</strong> For anything beyond trivial comma-separated lines (quoted fields, embedded commas, headers), Python's built-in <code>csv</code> module handles edge cases this manual approach doesn't — worth knowing it exists even though it's outside this section's scope.
        </div>
      `
    },
    {
      id: 's3-pitfalls',
      title: 'Pitfalls Table',
      priority: false,
      icon: '🚫',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pitfall</th><th>Why it's a problem</th><th>Fix</th></tr></thead>
            <tbody>
              <tr>
                <td>Using <code>"w"</code> mode on a file you meant to append to</td>
                <td>Silently destroys all existing content the moment the file is opened</td>
                <td>Use <code>"a"</code> for appending; double check mode before running against real files</td>
              </tr>
              <tr>
                <td>Forgetting <code>.close()</code> on manually opened files</td>
                <td>File handle stays open, risking unflushed data or resource leaks in long-running scripts</td>
                <td>Always use <code>with open(...) as f:</code> instead of manual open/close</td>
              </tr>
              <tr>
                <td>Assuming <code>.write()</code> adds a newline</td>
                <td>Output lines run together with no separation</td>
                <td>Explicitly append <code>\\n</code> to each write</td>
              </tr>
              <tr>
                <td>Checking <code>os.path.exists()</code> then opening separately</td>
                <td>Race condition — file can be deleted between the check and the open, causing a crash anyway</td>
                <td>Prefer <code>try/except FileNotFoundError</code> around the open itself</td>
              </tr>
              <tr>
                <td>Hardcoding paths with <code>/</code> or <code>\\</code></td>
                <td>Breaks when the script runs on a different OS</td>
                <td>Use <code>os.path.join()</code> or <code>pathlib</code> to build paths portably</td>
              </tr>
              <tr>
                <td>Not specifying <code>encoding</code></td>
                <td>Different systems may use different default encodings, causing <code>UnicodeDecodeError</code></td>
                <td>Always use <code>encoding="utf-8"</code> for text files</td>
              </tr>
              <tr>
                <td>Using <code>.read()</code> on a huge file</td>
                <td>Loads the entire file into memory, potentially exhausting RAM</td>
                <td>Use iteration over the file object for large files</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 's3-hands-on',
      title: '🖥️ Hands-on Exercise',
      priority: false,
      icon: '💻',
      bodyHTML: `
        <p>In <code>/workspaces/DevOps-Journey</code>:</p>
        <div class="code-block"><pre>nano file_practice.py</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Part 1:</h4>
        <ol style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li>Write three pillar names to <code>pillars.txt</code>, one per line, using <code>"w"</code> mode</li>
          <li>Reopen the file with <code>"r"</code> mode and print each line (stripped of the trailing newline) using a <code>for</code> loop over the file object</li>
          <li>Append a fourth pillar name using <code>"a"</code> mode</li>
          <li>Wrap the read operation in a <code>try/except FileNotFoundError</code> block</li>
        </ol>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Part 2:</h4>
        <ol style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;" start="5">
          <li>Create a list of dictionaries: <code>[{"name": "web01", "ip": "192.168.1.10"}, {"name": "web02", "ip": "192.168.1.11"}]</code></li>
          <li>Write them to <code>servers.csv</code> in a simple comma-separated format (name,ip) using <code>"w"</code></li>
          <li>Read the file back and print each server's name and IP</li>
        </ol>

        <p>Run:</p>
        <div class="code-block"><pre>python3 file_practice.py</pre></div>
        <p>Then verify:</p>
        <div class="code-block"><pre>cat pillars.txt
  cat servers.csv</pre></div>
      `
    },
    {
      id: 's3-devops-connection',
      title: 'DevOps Connection',
      priority: false,
      icon: '⚙️',
      bodyHTML: `
        <p>Reading configuration files, parsing log files, and writing structured output are constant tasks in automation — a deployment script might read a list of servers from a file to loop over, or a monitoring script might tail a log file looking for error patterns. The <code>with</code> statement's guaranteed cleanup matters even more in long-running automation, where an unclosed file handle in a script that runs thousands of times can quietly exhaust system resources.</p>
        <div class="info-box note">
          <strong>📌 Next section:</strong> <a href="#" style="color:var(--accent-secondary);">Bash Scripting Fundamentals</a>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 4 — Bash Scripting Fundamentals
  // ============================================================
  const SECTION_4_ACCORDIONS = [
    {
      id: 's4-what-is-bash',
      title: '4.1 What is Bash, and Why Script It?',
      priority: false,
      icon: '🐚',
      bodyHTML: `
        <p>Bash (<strong>Bourne Again SHell</strong>) is the command-line interpreter already in use in the Codespace terminal every time a command like <code>cd</code>, <code>ls</code>, or <code>cat</code> is typed. A <strong>Bash script</strong> is just a text file containing a sequence of those same commands, saved so it can be run repeatedly without retyping.</p>
        <div class="info-box note">
          <strong>📌 Key insight:</strong> If Python is the language for structured logic and data handling, Bash is the language for gluing together system commands, files, and processes quickly — it's what most CI/CD pipeline steps, cron jobs, and container entrypoint scripts are written in.
        </div>
      `
    },
    {
      id: 's4-shebang',
      title: '4.2 The Shebang Line',
      priority: false,
      icon: '#!',
      bodyHTML: `
        <p>Every Bash script starts with a <strong>shebang</strong> — a special first line telling the operating system which interpreter should execute the file:</p>
        <div class="code-block"><pre><span class="code-comment">#!/bin/bash</span></pre></div>
        <p><code>#</code> normally starts a comment in Bash, but <code>#!</code> at the very start of a file is special-cased by the OS — it means "run this file using the program at this path." <code>/bin/bash</code> is the standard location of the Bash interpreter on virtually all Linux systems.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Alternative (more portable):</h4>
        <div class="code-block"><pre><span class="code-comment">#!/usr/bin/env bash</span></pre></div>
        <p>This uses <code>env</code> to find <code>bash</code> in the user's <code>PATH</code>, which is more portable across systems where Bash might be installed in a non-standard location (e.g., <code>/usr/local/bin/bash</code> on some BSD/macOS systems). This is the recommended shebang for scripts intended to run on multiple platforms.</p>
        <div class="info-box warning">
          <strong>⚠️ Important:</strong> Without a shebang, running the script directly (<code>./script.sh</code>) may use the wrong interpreter or fail — always include it as line 1.
        </div>
      `
    },
    {
      id: 's4-first-script',
      title: '4.3 Creating and Running Your First Script',
      priority: false,
      icon: '🚀',
      bodyHTML: `
        <div class="code-block"><pre>nano hello.sh</pre></div>
        <p>Contents:</p>
        <div class="code-block"><pre><span class="code-comment">#!/bin/bash</span>
  echo "Hello, DevOps Journey"</pre></div>
        <p><code>echo</code> is Bash's equivalent of Python's <code>print()</code> — it outputs text to the terminal.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Making it executable and running it:</h4>
        <div class="code-block"><pre>chmod +x hello.sh
  ./hello.sh</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>Hello, DevOps Journey</pre></div>
        <p><code>chmod +x</code> adds the <strong>execute permission</strong> to the file (covered in depth in Pillar 3 — Security, and Pillar 2 — Linux permissions). Without it, <code>./hello.sh</code> fails with <code>Permission denied</code>.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Alternative — running without execute permission:</h4>
        <div class="code-block"><pre>bash hello.sh</pre></div>
        <p>This works even without <code>chmod +x</code>, since Bash is being told directly to interpret the file rather than asking the OS to execute it as a program.</p>
      `
    },
    {
      id: 's4-variables',
      title: '4.4 Variables',
      priority: false,
      icon: '📦',
      bodyHTML: `
        <div class="code-block"><pre><span class="code-comment">#!/bin/bash</span>
  name="Keith"
  echo "Hello, $name"</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>Hello, Keith</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Critical syntax rules:</h4>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><strong>No spaces around <code>=</code>.</strong> <code>name = "Keith"</code> is a syntax error in Bash — it's interpreted as trying to run a command called <code>name</code> with arguments <code>=</code> and <code>"Keith"</code>.</li>
          <li>Reference a variable's value with <code>$name</code> or <code>${name}</code> — the curly-brace form is safer when the variable name is adjacent to other text: <code>"${name}_journey"</code> vs the ambiguous <code>"$name_journey"</code> (which Bash would try to read as a variable called <code>name_journey</code>).</li>
        </ul>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Command substitution:</h4>
        <p>Capturing the output of a command into a variable:</p>
        <div class="code-block"><pre>current_dir=$(pwd)
  echo "Currently in: $current_dir"</pre></div>
        <p><code>$(...)</code> runs the command inside and substitutes its output as a string. This is one of the most-used Bash patterns.</p>
      `
    },
    {
      id: 's4-read-input',
      title: '4.5 Reading User Input',
      priority: false,
      icon: '⌨️',
      bodyHTML: `
        <div class="code-block"><pre><span class="code-comment">#!/bin/bash</span>
  echo "What's your name?"
  read name
  echo "Hello, $name"</pre></div>
        <p>Running this pauses at <code>read name</code>, waits for terminal input, then continues.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Inline prompt (cleaner):</h4>
        <div class="code-block"><pre>read -p "What's your name? " name
  echo "Hello, $name"</pre></div>
        <p>The <code>-p</code> flag displays the prompt before reading input, eliminating the separate <code>echo</code> line.</p>
      `
    },
    {
      id: 's4-conditionals',
      title: '4.6 Comparison and Conditionals — if/then/else',
      priority: false,
      icon: '🔀',
      bodyHTML: `
        <p>Bash's conditional syntax differs substantially from Python's:</p>
        <div class="code-block"><pre><span class="code-comment">#!/bin/bash</span>
  score=85

  if [ $score -ge 90 ]; then
      echo "A grade"
  elif [ $score -ge 80 ]; then
      echo "B grade"
  else
      echo "C grade or below"
  fi</pre></div>
        <p>Output: <code>B grade</code></p>

        <p>Breaking this down:</p>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><code>[ ]</code> — the <strong>test command</strong>, evaluates the condition inside (spaces around the brackets are required — <code>[$score</code> is a syntax error)</li>
          <li><code>-ge</code> — "greater than or equal" (Bash uses letter-codes for numeric comparison, not <code>>=</code>)</li>
          <li><code>then</code> — begins the block to run if true</li>
          <li><code>fi</code> — closes the <code>if</code> block (<code>if</code> spelled backwards — a Bash convention also seen in <code>case</code>/<code>esac</code>)</li>
        </ul>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Numeric comparison operators:</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Operator</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>-eq</code></td><td>equal</td></tr>
              <tr><td><code>-ne</code></td><td>not equal</td></tr>
              <tr><td><code>-gt</code></td><td>greater than</td></tr>
              <tr><td><code>-ge</code></td><td>greater than or equal</td></tr>
              <tr><td><code>-lt</code></td><td>less than</td></tr>
              <tr><td><code>-le</code></td><td>less than or equal</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box warning">
          <strong>⚠️ Critical pitfall:</strong> <code>></code> and <code><</code> inside <code>[ ]</code> do <strong>string comparison</strong>, not numeric — and worse, <code>></code> gets interpreted as output redirection in most contexts. Always use <code>-gt</code>/<code>-lt</code> etc. for numbers.
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">String comparison:</h4>
        <div class="code-block"><pre>name="Keith"

  if [ "$name" == "Keith" ]; then
      echo "Match"
  fi</pre></div>
        <div class="info-box warning">
          <strong>⚠️ Pitfall:</strong> Always quote variables inside <code>[ ]</code> (<code>"$name"</code>, not <code>$name</code>). An empty or unset variable without quotes can break the test's syntax entirely (<code>[ == "Keith" ]</code> is invalid — missing an operand).
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Checking file conditions:</h4>
        <div class="code-block"><pre>if [ -f "notes.txt" ]; then
      echo "File exists"
  fi

  if [ -d "saa-foundation" ]; then
      echo "Directory exists"
  fi</pre></div>
        <p><code>-f</code> tests for a regular file, <code>-d</code> for a directory — both return true/false based on existence and type.</p>
      `
    },
    {
      id: 's4-brackets-vs-double-brackets',
      title: '4.7 [ ] vs [[ ]] — Which to Use',
      priority: false,
      icon: '🔲',
      bodyHTML: `
        <p>Bash provides two test syntaxes:</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Syntax</th><th>Used in</th><th>Pros</th><th>Cons</th></tr></thead>
            <tbody>
              <tr><td><code>[ ]</code></td><td>All POSIX shells</td><td>Portable (works in <code>sh</code>)</td><td>Requires quoting, no regex, no <code>&&</code>/<code>||</code> inside</td></tr>
              <tr><td><code>[[ ]]</code></td><td>Bash only</td><td>Safer (no word splitting), supports <code>&&</code>/<code>||</code>, regex, glob patterns</td><td>Not POSIX-compliant (won't work in <code>sh</code>)</td></tr>
            </tbody>
          </table>
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Example:</h4>
        <div class="code-block"><pre><span class="code-comment"># [ ] — safe but requires quoting</span>
  if [ "$name" == "Keith" ] && [ "$age" -gt 18 ]; then
      echo "Adult Keith"
  fi

  <span class="code-comment"># [[ ]] — cleaner and safer</span>
  if [[ $name == "Keith" && $age -gt 18 ]]; then
      echo "Adult Keith"
  fi</pre></div>
        <div class="info-box tip">
          <strong>💡 Recommendation:</strong> Use <code>[[ ]]</code> for Bash scripts (safer and more readable). Use <code>[ ]</code> only if the script needs to run with <code>sh</code> (which is rare for DevOps automation — most CI/CD runners use Bash).
        </div>
      `
    },
    {
      id: 's4-file-conditions',
      title: '4.8 Checking File Conditions',
      priority: false,
      icon: '📄',
      bodyHTML: `
        <div class="code-block"><pre>if [ -f "notes.txt" ]; then
      echo "File exists"
  fi

  if [ -d "saa-foundation" ]; then
      echo "Directory exists"
  fi</pre></div>
        <p><code>-f</code> tests for a regular file, <code>-d</code> for a directory — both return true/false based on existence and type.</p>
      `
    },
    {
      id: 's4-loops',
      title: '4.9 Loops',
      priority: false,
      icon: '🔄',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;"><code>for</code> loop over a list:</h4>
        <div class="code-block"><pre><span class="code-comment">#!/bin/bash</span>
  for tool in docker kubernetes terraform; do
      echo "Learning: $tool"
  done</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>Learning: docker
  Learning: kubernetes
  Learning: terraform</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>for</code> loop over a range of numbers:</h4>
        <div class="code-block"><pre>for i in {1..5}; do
      echo "Number: $i"
  done</pre></div>
        <p>Output: <code>Number: 1</code> through <code>Number: 5</code>.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>for</code> loop over files matching a pattern (glob):</h4>
        <div class="code-block"><pre>for file in *.md; do
      echo "Found: $file"
  done</pre></div>
        <p>Loops over every <code>.md</code> file in the current directory — a pattern used constantly for batch-processing files.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>for</code> loop over command output:</h4>
        <div class="code-block"><pre>for file in $(ls *.txt); do
      echo "Processing $file"
  done</pre></div>
        <div class="info-box warning">
          <strong>⚠️ Pitfall:</strong> Command substitution with <code>$(ls *.txt)</code> can break if filenames contain spaces — safer to use <code>for file in *.txt</code> directly (no <code>ls</code> needed) or use <code>find -print0</code> for edge cases.
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>while</code> loop:</h4>
        <div class="code-block"><pre>count=1
  while [ $count -le 3 ]; do
      echo "Count is $count"
      count=$((count + 1))
  done</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>Count is 1
  Count is 2
  Count is 3</pre></div>
        <p><code>$((...))</code> is <strong>arithmetic expansion</strong> — the syntax for doing math in Bash, since <code>count + 1</code> alone would just be treated as text.</p>
      `
    },
    {
      id: 's4-functions',
      title: '4.10 Functions in Bash',
      priority: false,
      icon: '⚡',
      bodyHTML: `
        <div class="code-block"><pre><span class="code-comment">#!/bin/bash</span>

  greet() {
      echo "Hello, $1"
  }

  greet "Keith"</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>Hello, Keith</pre></div>
        <p>Unlike Python, Bash functions don't declare named parameters — arguments are accessed positionally via <code>$1</code>, <code>$2</code>, <code>$3</code>, etc., in the order they were passed.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Returning a value:</h4>
        <p>Bash functions don't <code>return</code> data the way Python does — <code>return</code> in Bash only sets a numeric <strong>exit status</strong> (0–255, conventionally 0 = success). To get a value back, either <code>echo</code> it and capture with command substitution, or use a global variable:</p>
        <div class="code-block"><pre>add() {
      echo $(($1 + $2))
  }

  result=$(add 5 3)
  echo "Result: $result"    # Result: 8</pre></div>
      `
    },
    {
      id: 's4-pitfalls',
      title: 'Pitfalls Table',
      priority: false,
      icon: '🚫',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pitfall</th><th>Why it's a problem</th><th>Fix</th></tr></thead>
            <tbody>
              <tr>
                <td>Spaces around <code>=</code> in variable assignment</td>
                <td><code>name = "Keith"</code> is a syntax error — Bash tries to run <code>name</code> as a command</td>
                <td>Never put spaces around <code>=</code>: <code>name="Keith"</code></td>
              </tr>
              <tr>
                <td>Using <code>></code>/<code><</code> for numeric comparison in <code>[ ]</code></td>
                <td>Does string comparison, or gets read as output redirection</td>
                <td>Use <code>-gt</code>, <code>-lt</code>, <code>-ge</code>, <code>-le</code>, <code>-eq</code>, <code>-ne</code> for numbers</td>
              </tr>
              <tr>
                <td>Not quoting variables inside <code>[ ]</code></td>
                <td>Empty/unset variables can break the test's syntax entirely</td>
                <td>Always quote: <code>[ "$name" == "Keith" ]</code></td>
              </tr>
              <tr>
                <td>Expecting <code>return</code> to hand back data like Python</td>
                <td><code>return</code> only sets a 0–255 exit status code</td>
                <td><code>echo</code> the value and capture it with <code>$(function_name)</code></td>
              </tr>
              <tr>
                <td>Forgetting <code>chmod +x</code> before <code>./script.sh</code></td>
                <td><code>Permission denied</code> error</td>
                <td>Run <code>chmod +x script.sh</code>, or invoke with <code>bash script.sh</code> instead</td>
              </tr>
              <tr>
                <td>Using <code>$()</code> around <code>ls</code> for filename loops</td>
                <td>Breaks on filenames with spaces</td>
                <td>Use <code>for file in *.txt</code> directly (no <code>ls</code>)</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 's4-hands-on',
      title: '🖥️ Hands-on Exercise',
      priority: false,
      icon: '💻',
      bodyHTML: `
        <p>In <code>/workspaces/DevOps-Journey</code>:</p>
        <div class="code-block"><pre>nano practice.sh
  chmod +x practice.sh</pre></div>

        <ol style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li>Declare a variable <code>pillar="scripting"</code> and echo <code>"Current pillar: $pillar"</code></li>
          <li>Use a <code>for</code> loop to print each <code>.md</code> file in <code>saa-foundation/04-scripting/</code></li>
          <li>Include an <code>if</code> statement checking whether a file called <code>README.md</code> exists in the current directory, printing a message either way</li>
          <li>Define a function <code>add()</code> that takes two arguments and echoes their sum, then call it and capture the result in a variable</li>
          <li>Use <code>read -p</code> to ask the user for their name and print a greeting</li>
        </ol>

        <p>Run:</p>
        <div class="code-block"><pre>./practice.sh</pre></div>
      `
    },
    {
      id: 's4-devops-connection',
      title: 'DevOps Connection',
      priority: false,
      icon: '⚙️',
      bodyHTML: `
        <p>Nearly every CI/CD pipeline step, Docker container entrypoint, and cron job on a Linux server is a Bash script under the hood — GitHub Actions workflow steps frequently run raw <code>bash</code> commands, and Dockerfiles use <code>RUN</code> and <code>ENTRYPOINT</code> instructions that execute shell scripts. Fluency here transfers directly into Phase 2.</p>
        <div class="info-box note">
          <strong>📌 Next section:</strong> <a href="#" style="color:var(--accent-secondary);">Bash Scripting — Advanced</a>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 5 — Bash Scripting — Advanced
  // ============================================================
  const SECTION_5_ACCORDIONS = [
    {
      id: 's5-arrays',
      title: '5.1 Arrays',
      priority: false,
      icon: '📊',
      bodyHTML: `
        <p>Bash supports arrays — ordered lists of values, similar to Python lists but with notably different syntax.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Declaring and populating:</h4>
        <div class="code-block"><pre>tools=("docker" "kubernetes" "terraform")</pre></div>
        <p>No commas between elements — just spaces, inside parentheses.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Accessing elements:</h4>
        <div class="code-block"><pre>echo "\${tools[0]}"     # docker
  echo "\${tools[1]}"     # kubernetes</pre></div>
        <div class="info-box warning">
          <strong>⚠️ Critical:</strong> Array access always requires curly braces: <code>\${tools[0]}</code>, not <code>$tools[0]</code>. Without the braces, Bash reads <code>$tools</code> (which evaluates to the <em>first</em> element only) followed by the literal text <code>[0]</code>.
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">All elements, and count:</h4>
        <div class="code-block"><pre>echo "\${tools[@]}"      # docker kubernetes terraform
  echo "\${#tools[@]}"      # 3 — the number of elements</pre></div>
        <p><code>@</code> inside <code>[ ]</code> means "all elements." <code>#</code> before the array name means "count of."</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Looping over an array:</h4>
        <div class="code-block"><pre>for tool in "\${tools[@]}"; do
      echo "Learning: $tool"
  done</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>Learning: docker
  Learning: kubernetes
  Learning: terraform</pre></div>
        <div class="info-box warning">
          <strong>⚠️ Pitfall:</strong> Always quote <code>"\${tools[@]}"</code> in loops. Without quotes, an element containing spaces (e.g., <code>"docker compose"</code>) would get split into two separate loop iterations instead of staying intact.
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Adding an element:</h4>
        <div class="code-block"><pre>tools+=("ansible")
  echo "\${tools[@]}"    # docker kubernetes terraform ansible</pre></div>
      `
    },
    {
      id: 's5-positional-params',
      title: '5.2 Positional Parameters and Script Arguments',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <p>Scripts can accept arguments from the command line, accessed the same way function arguments were in Section 4:</p>
        <div class="code-block"><pre><span class="code-comment">#!/bin/bash</span>
  echo "Script name: $0"
  echo "First arg: $1"
  echo "Second arg: $2"
  echo "All args: $@"
  echo "Number of args: $#"</pre></div>
        <p>Running:</p>
        <div class="code-block"><pre>./script.sh hello world</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>Script name: ./script.sh
  First arg: hello
  Second arg: world
  All args: hello world
  Number of args: 2</pre></div>

        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Variable</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>$0</code></td><td>The script's own name/path</td></tr>
              <tr><td><code>$1</code>, <code>$2</code>, ...</td><td>Individual positional arguments</td></tr>
              <tr><td><code>$@</code></td><td>All arguments as separate words</td></tr>
              <tr><td><code>$#</code></td><td>Total count of arguments</td></tr>
              <tr><td><code>$?</code></td><td>Exit status of the <em>last</em> command run (covered in 5.4)</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 's5-shift',
      title: '5.3 shift — Processing Arguments One at a Time',
      priority: false,
      icon: '➡️',
      bodyHTML: `
        <p><code>shift</code> removes <code>$1</code> and shifts every remaining argument down by one position — <code>$2</code> becomes the new <code>$1</code>, and so on. This is the standard pattern for looping through an unknown number of arguments:</p>
        <div class="code-block"><pre><span class="code-comment">#!/bin/bash</span>
  while [ $# -gt 0 ]; do
      echo "Processing: $1"
      shift
  done</pre></div>
        <p>Running <code>./script.sh a b c</code> outputs:</p>
        <div class="code-block"><pre>Processing: a
  Processing: b
  Processing: c</pre></div>
        <p>Each iteration, <code>$1</code> is the "current" argument, and <code>shift</code> advances to the next one — the loop ends when <code>$#</code> (the remaining count) hits 0.</p>
      `
    },
    {
      id: 's5-exit-codes',
      title: '5.4 Exit Codes',
      priority: false,
      icon: '🚦',
      bodyHTML: `
        <p>Every command and script, when it finishes, produces a numeric <strong>exit status</strong> between 0 and 255. By convention:</p>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><code>0</code> = success</li>
          <li>Any nonzero value (typically <code>1</code>) = some kind of failure</li>
        </ul>

        <div class="code-block"><pre>ls /nonexistent
  echo $?     # prints the exit code of the previous command — 2, meaning "No such file or directory"</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Setting your own script's exit code with <code>exit</code>:</h4>
        <div class="code-block"><pre><span class="code-comment">#!/bin/bash</span>
  if [ ! -f "config.txt" ]; then
      echo "Error: config.txt not found"
      exit 1
  fi
  echo "Proceeding..."</pre></div>
        <p><code>exit 1</code> immediately stops the script and sets its exit status to <code>1</code> — anything checking this script's success (another script, a CI/CD pipeline step) sees the failure.</p>

        <div class="info-box warning">
          <strong>⚠️ Why this matters enormously in automation:</strong> CI/CD pipelines, <code>cron</code> jobs, and orchestration tools all decide whether to proceed, retry, or alert <em>based on exit codes</em> — not on whether output "looked okay." A script that encounters an error but exits with <code>0</code> anyway will silently report success to everything downstream.
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Checking exit codes to control flow:</h4>
        <div class="code-block"><pre>grep "error" logfile.txt
  if [ $? -eq 0 ]; then
      echo "Error found in log"
  else
      echo "No errors found"
  fi</pre></div>
        <p><code>grep</code> exits <code>0</code> if it found a match, <code>1</code> if it didn't — a common pattern for using search commands as conditionals.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Shorthand using <code>&&</code> and <code>||</code>:</h4>
        <div class="code-block"><pre>mkdir new_folder && echo "Created successfully"
  cd missing_folder || echo "Failed to enter directory"</pre></div>
        <p><code>&&</code> runs the next command only if the previous one succeeded (exit <code>0</code>); <code>||</code> runs the next command only if the previous one failed (nonzero exit).</p>
      `
    },
    {
      id: 's5-set-euo',
      title: '5.5 set -e, set -u, set -o pipefail — Safer Scripts',
      priority: false,
      icon: '🛡️',
      bodyHTML: `
        <p>By default, Bash scripts <strong>keep running even after a command fails</strong> — a dangerous default for automation, where a failed step should usually stop everything rather than continue on possibly-corrupted state.</p>

        <div class="code-block"><pre><span class="code-comment">#!/bin/bash</span>
  set -e   # exit immediately if any command exits non-zero
  set -u   # treat unset variables as an error, not empty string
  set -o pipefail   # a pipeline fails if ANY command in it fails, not just the last one</pre></div>

        <p>Placed at the top of a script, these three lines are an extremely common defensive pattern (sometimes combined as <code>set -euo pipefail</code>):</p>

        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><strong><code>set -e</code></strong> — without it, a script that fails on line 3 will still barrel ahead to line 4, 5, etc., often causing confusing downstream failures instead of stopping cleanly at the actual point of failure.</li>
          <li><strong><code>set -u</code></strong> — without it, a typo like <code>$nmae</code> instead of <code>$name</code> silently evaluates to an empty string rather than raising an error, which can cause a script to (for example) <code>rm -rf $nmae/</code> and delete the entire current directory instead of a subfolder.</li>
          <li><strong><code>set -o pipefail</code></strong> — without it, <code>false | true</code> reports success (exit <code>0</code>) because only the <em>last</em> command in the pipe (<code>true</code>) is checked by default.</li>
        </ul>

        <div class="info-box tip">
          <strong>💡 Best practice:</strong> This trio is close to a default best practice for any Bash script meant to run unattended (cron jobs, CI/CD steps, deployment scripts). Interactive one-off scripts can skip it, but anything automated should almost always include it.
        </div>
      `
    },
    {
      id: 's5-trap',
      title: '5.6 trap — Running Cleanup Code on Exit or Signal',
      priority: false,
      icon: '🔧',
      bodyHTML: `
        <p><code>trap</code> lets a script run a specific command when it receives a signal (like being interrupted) or when it exits — regardless of whether it exited successfully or due to an error.</p>

        <div class="code-block"><pre><span class="code-comment">#!/bin/bash</span>

  cleanup() {
      echo "Cleaning up temporary files..."
      rm -f /tmp/tempfile
  }

  trap cleanup EXIT

  echo "Doing work..."
  touch /tmp/tempfile
  sleep 2
  echo "Work done"</pre></div>

        <p><code>trap cleanup EXIT</code> registers the <code>cleanup</code> function to run automatically whenever the script exits — whether it finished normally, hit <code>exit 1</code>, or was interrupted with <code>Ctrl+C</code>.</p>

        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Signal</th><th>Trigger</th></tr></thead>
            <tbody>
              <tr><td><code>EXIT</code></td><td>Script exits, for any reason (success, error, or interrupt)</td></tr>
              <tr><td><code>SIGINT</code></td><td>User presses <code>Ctrl+C</code></td></tr>
              <tr><td><code>SIGTERM</code></td><td>Process receives a termination request (e.g., from <code>kill</code>)</td></tr>
            </tbody>
          </table>
        </div>

        <p>This is the Bash equivalent of Python's <code>finally</code> block from Section 2 — guaranteed cleanup regardless of how the script ends.</p>
      `
    },
    {
      id: 's5-getopts',
      title: '5.7 getopts — Proper Flag-Based Argument Parsing',
      priority: false,
      icon: '⚙️',
      bodyHTML: `
        <p>Positional arguments (<code>$1</code>, <code>$2</code>) work for simple scripts, but real-world CLI tools use named flags (<code>-f filename</code>, <code>-v</code> for verbose). <code>getopts</code> is Bash's built-in tool for parsing these.</p>

        <div class="code-block"><pre><span class="code-comment">#!/bin/bash</span>

  while getopts "n:v" opt; do
      case $opt in
          n) name="$OPTARG" ;;
          v) verbose=true ;;
          \\?) echo "Invalid option"; exit 1 ;;
      esac
  done

  echo "Name: $name"
  echo "Verbose: $verbose"</pre></div>

        <p>Running:</p>
        <div class="code-block"><pre>./script.sh -n Keith -v</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>Name: Keith
  Verbose: true</pre></div>

        <p>Breaking down the flag string <code>"n:v"</code>:</p>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><code>n:</code> — the colon means <code>-n</code> <strong>requires a value</strong> (accessed via <code>$OPTARG</code>)</li>
          <li><code>v</code> — no colon means <code>-v</code> is a standalone flag (a boolean switch, no value needed)</li>
        </ul>

        <p><code>case</code>/<code>esac</code> works like a more readable alternative to a long <code>if</code>/<code>elif</code> chain when checking one variable against multiple possible values — <code>esac</code> is <code>case</code> spelled backwards, following the same convention as <code>fi</code> and <code>done</code>.</p>
      `
    },
    {
      id: 's5-pitfalls',
      title: 'Pitfalls Table',
      priority: false,
      icon: '🚫',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pitfall</th><th>Why it's a problem</th><th>Fix</th></tr></thead>
            <tbody>
              <tr>
                <td>Accessing array elements without <code>\${}</code></td>
                <td><code>$tools[0]</code> reads as the first element plus literal text <code>[0]</code></td>
                <td>Always use <code>\${tools[0]}</code></td>
              </tr>
              <tr>
                <td>Looping over an array without quotes</td>
                <td>Elements containing spaces get split into multiple iterations</td>
                <td>Use <code>"\${tools[@]}"</code> with quotes</td>
              </tr>
              <tr>
                <td>Assuming a script that "ran" means it succeeded</td>
                <td>A script can produce output and still exit non-zero (or vice versa)</td>
                <td>Always check <code>$?</code> or use <code>set -e</code></td>
              </tr>
              <tr>
                <td>Skipping <code>set -euo pipefail</code> in automated scripts</td>
                <td>Unset variables, mid-pipeline failures, and later-line errors go unnoticed</td>
                <td>Add the trio at the top of every unattended script</td>
              </tr>
              <tr>
                <td>Forgetting <code>trap</code> for cleanup</td>
                <td>Temp files/processes can be left behind if a script errors or is interrupted</td>
                <td>Register a <code>cleanup</code> function with <code>trap cleanup EXIT</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 's5-hands-on',
      title: '🖥️ Hands-on Exercise',
      priority: false,
      icon: '💻',
      bodyHTML: `
        <p>In <code>/workspaces/DevOps-Journey</code>:</p>
        <div class="code-block"><pre>nano advanced_practice.sh
  chmod +x advanced_practice.sh</pre></div>

        <ol style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li>Start with <code>set -euo pipefail</code></li>
          <li>Declare an array of pillar names and loop over it with <code>"\${array[@]}"</code></li>
          <li>Use <code>getopts</code> to accept a <code>-p</code> flag (a pillar number, requires a value) and a <code>-v</code> flag (verbose, no value)</li>
          <li>Register a <code>trap</code> that echoes <code>"Script finished"</code> on <code>EXIT</code></li>
          <li>Check <code>$#</code> and exit with code <code>1</code> and an error message if no flags were provided</li>
        </ol>

        <p>Run it several ways:</p>
        <div class="code-block"><pre>./advanced_practice.sh -p 4 -v
  ./advanced_practice.sh          <span class="code-comment"># confirm the exit-code error path works</span></pre></div>
        <p>Then check <code>echo $?</code> after each run.</p>
      `
    },
    {
      id: 's5-devops-connection',
      title: 'DevOps Connection',
      priority: false,
      icon: '⚙️',
      bodyHTML: `
        <p>Nearly every production-grade shell script — deployment scripts, entrypoint scripts in Docker images, CI/CD pipeline steps — relies on this section's tools specifically: <code>set -euo pipefail</code> to fail fast and loudly, <code>trap</code> for guaranteed cleanup of temporary resources, and <code>getopts</code> for accepting configuration flags rather than hardcoding values. Scripts without these safeguards are a common source of silent failures in real infrastructure.</p>
        <div class="info-box note">
          <strong>📌 Next section:</strong> <a href="#" style="color:var(--accent-secondary);">REST APIs — Concepts</a>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 6 — REST APIs — Concepts
  // ============================================================
  const SECTION_6_ACCORDIONS = [
    {
      id: 's6-what-is-api',
      title: '6.1 What is an API?',
      priority: false,
      icon: '🔌',
      bodyHTML: `
        <p>An <strong>API</strong> (Application Programming Interface) is a defined way for two pieces of software to communicate with each other. Instead of a human clicking buttons in a browser, one program sends a structured request to another program and gets a structured response back.</p>
        <p>A <strong>REST API</strong> (Representational State Transfer) is the most common style of web API — it uses standard HTTP (the same protocol a browser uses to load web pages) as its communication method, with a specific set of conventions around how requests and responses are structured.</p>
        <div class="info-box note">
          <strong>📌 Key insight:</strong> An API is a contract between two programs — the client promises to send requests in a certain format, and the server promises to respond in a certain format.
        </div>
      `
    },
    {
      id: 's6-client-server',
      title: '6.2 The Client-Server Model',
      priority: false,
      icon: '🖥️',
      bodyHTML: `
        <p>Every API interaction has two sides:</p>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><strong>Client</strong> — the program making the request (a Python script, a browser, <code>curl</code>, another server)</li>
          <li><strong>Server</strong> — the program receiving the request, processing it, and sending back a response</li>
        </ul>
        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.75rem;white-space:pre;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
  Client  ──── HTTP Request ────>  Server
  Client  <─── HTTP Response ───   Server</pre>
        </div>
        <p>The client always initiates — servers don't reach out to clients unprompted in the standard REST model (that's a different pattern, covered by things like webhooks, outside this section's scope).</p>
      `
    },
    {
      id: 's6-resources-endpoints',
      title: '6.3 Resources and Endpoints',
      priority: false,
      icon: '📍',
      bodyHTML: `
        <p>REST APIs organize everything around <strong>resources</strong> — nouns representing "things" the API manages (a user, an order, a file). Each resource type typically has a base <strong>endpoint</strong> — a URL representing where to interact with it.</p>
        <div class="code-block"><pre>https://api.example.com/users
  https://api.example.com/users/42
  https://api.example.com/orders</pre></div>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><code>/users</code> — the collection of all users</li>
          <li><code>/users/42</code> — one specific user, identified by ID <code>42</code></li>
          <li><code>/orders</code> — a completely different resource, the collection of orders</li>
        </ul>
        <div class="info-box note">
          <strong>📌 Convention:</strong> Resource endpoints are almost always <strong>plural nouns</strong> (<code>/users</code>, not <code>/user</code>), representing a collection. A specific item within that collection is addressed by appending its identifier (<code>/users/42</code>).
        </div>
      `
    },
    {
      id: 's6-http-methods',
      title: '6.4 HTTP Methods — The Verbs',
      priority: false,
      icon: '⚡',
      bodyHTML: `
        <p>The URL identifies <em>what</em> is being acted on (the resource); the <strong>HTTP method</strong> identifies <em>what action</em> to take.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Method</th><th>Purpose</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td><code>GET</code></td><td>Retrieve data — should never change anything on the server</td><td><code>GET /users/42</code> — fetch user 42's data</td></tr>
              <tr><td><code>POST</code></td><td>Create a new resource</td><td><code>POST /users</code> — create a new user</td></tr>
              <tr><td><code>PUT</code></td><td>Replace an existing resource entirely</td><td><code>PUT /users/42</code> — overwrite all of user 42's data</td></tr>
              <tr><td><code>PATCH</code></td><td>Partially update an existing resource</td><td><code>PATCH /users/42</code> — update just one field, e.g. email</td></tr>
              <tr><td><code>DELETE</code></td><td>Remove a resource</td><td><code>DELETE /users/42</code> — delete user 42</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box warning">
          <strong>⚠️ Critical distinction — PUT vs PATCH:</strong> <code>PUT</code> expects the <em>entire</em> resource representation and replaces it wholesale — omitted fields may get wiped out or reset to defaults. <code>PATCH</code> only touches the fields explicitly included in the request. Using <code>PUT</code> when <code>PATCH</code> was intended is a common source of accidentally erasing data that wasn't included in the request body.
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Idempotency of methods</h4>
        <p>An operation that produces the same result no matter how many times it's applied:</p>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><code>GET</code>, <code>PUT</code>, <code>DELETE</code> — <strong>idempotent</strong>. Calling <code>DELETE /users/42</code> five times has the same end state as calling it once (user 42 is gone either way).</li>
          <li><code>POST</code> — <strong>not</strong> idempotent by default. Calling <code>POST /users</code> five times typically creates five separate new users.</li>
        </ul>
        <div class="info-box tip">
          <strong>💡 Why this matters in automation:</strong> A retry mechanism that blindly re-sends a failed <code>POST</code> request risks creating duplicate resources, whereas retrying a <code>PUT</code> or <code>DELETE</code> is generally safe.
        </div>
      `
    },
    {
      id: 's6-status-codes',
      title: '6.5 Status Codes — The Response\'s Headline',
      priority: false,
      icon: '📊',
      bodyHTML: `
        <p>Every HTTP response includes a three-digit <strong>status code</strong> summarizing the outcome. They're grouped by their first digit:</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Range</th><th>Category</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>1xx</code></td><td>Informational</td><td>Request received, still processing (rarely seen directly)</td></tr>
              <tr><td><code>2xx</code></td><td>Success</td><td>The request worked</td></tr>
              <tr><td><code>3xx</code></td><td>Redirection</td><td>Further action needed to complete the request</td></tr>
              <tr><td><code>4xx</code></td><td>Client error</td><td>Something wrong with the request itself</td></tr>
              <tr><td><code>5xx</code></td><td>Server error</td><td>Something went wrong on the server's side</td></tr>
            </tbody>
          </table>
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Commonly encountered codes:</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Code</th><th>Name</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>200</code></td><td>OK</td><td>Request succeeded, response body contains the result</td></tr>
              <tr><td><code>201</code></td><td>Created</td><td>A new resource was successfully created (typical response to <code>POST</code>)</td></tr>
              <tr><td><code>204</code></td><td>No Content</td><td>Request succeeded, but there's nothing to return (common for <code>DELETE</code>)</td></tr>
              <tr><td><code>400</code></td><td>Bad Request</td><td>The request was malformed — invalid syntax, missing required data</td></tr>
              <tr><td><code>401</code></td><td>Unauthorized</td><td>Authentication is required and missing or invalid</td></tr>
              <tr><td><code>403</code></td><td>Forbidden</td><td>Authenticated, but not permitted to perform this action</td></tr>
              <tr><td><code>404</code></td><td>Not Found</td><td>The requested resource doesn't exist</td></tr>
              <tr><td><code>429</code></td><td>Too Many Requests</td><td>Rate limit exceeded — slow down</td></tr>
              <tr><td><code>500</code></td><td>Internal Server Error</td><td>Something broke on the server, unrelated to what was sent</td></tr>
              <tr><td><code>503</code></td><td>Service Unavailable</td><td>Server temporarily can't handle the request (overload, maintenance)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box warning">
          <strong>⚠️ Automation depends on checking these:</strong> A script blindly assuming success because it got <em>any</em> response, without checking the status code, is a common source of silent automation failures — e.g., treating a <code>404</code> or <code>500</code> response body as valid data.
        </div>
      `
    },
    {
      id: 's6-headers',
      title: '6.6 Headers — Metadata About the Request/Response',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <p><strong>Headers</strong> are key-value pairs sent alongside a request or response, carrying metadata that isn't part of the main data itself.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Common request headers:</h4>
        <div class="code-block"><pre>Content-Type: application/json
  Authorization: Bearer &lt;token&gt;
  Accept: application/json</pre></div>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><code>Content-Type</code> — tells the server what format the request body is in (almost always <code>application/json</code> for modern APIs)</li>
          <li><code>Authorization</code> — carries credentials proving who's making the request (API keys, tokens — covered further in Section 7)</li>
          <li><code>Accept</code> — tells the server what format the client wants the response in</li>
        </ul>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Common response headers:</h4>
        <div class="code-block"><pre>Content-Type: application/json
  X-RateLimit-Remaining: 42</pre></div>
        <p><code>X-RateLimit-Remaining</code> (and similar <code>X-*</code> headers) are non-standard but extremely common conventions APIs use to communicate things like remaining rate-limit quota.</p>
      `
    },
    {
      id: 's6-request-body',
      title: '6.7 The Request Body',
      priority: false,
      icon: '📦',
      bodyHTML: `
        <p>For methods that send data (<code>POST</code>, <code>PUT</code>, <code>PATCH</code>), the <strong>body</strong> carries the actual payload — typically formatted as <strong>JSON</strong> (JavaScript Object Notation, covered in depth in Section 8).</p>
        <div class="code-block"><pre>POST /users
  Content-Type: application/json

  {
    "name": "Keith",
    "role": "student"
  }</pre></div>
        <p><code>GET</code> and <code>DELETE</code> requests typically have no body — any parameters they need are usually passed in the URL itself (see 6.8).</p>
      `
    },
    {
      id: 's6-query-params',
      title: '6.8 Query Parameters',
      priority: false,
      icon: '🔍',
      bodyHTML: `
        <p>Additional options for a request — filters, sorting, pagination — are commonly passed as <strong>query parameters</strong>, appended to the URL after a <code>?</code>:</p>
        <div class="code-block"><pre>GET /users?role=admin&limit=10</pre></div>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><code>?</code> starts the query string</li>
          <li>Each parameter is <code>key=value</code></li>
          <li><code>&amp;</code> separates multiple parameters</li>
        </ul>
        <p>This example requests users filtered to <code>role=admin</code>, limited to <code>10</code> results. Query parameters are a <code>GET</code>-request convention — since <code>GET</code> has no body, filtering criteria travel in the URL instead.</p>
      `
    },
    {
      id: 's6-complete-example',
      title: '6.9 A Complete Request/Response Example',
      priority: false,
      icon: '📄',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">Request:</h4>
        <div class="code-block"><pre>GET /users/42
  Authorization: Bearer abc123
  Accept: application/json</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Response:</h4>
        <div class="code-block"><pre>Status: 200 OK
  Content-Type: application/json

  {
    "id": 42,
    "name": "Keith",
    "role": "student"
  }</pre></div>
        <p>Everything from this section is present here: an endpoint (<code>/users/42</code>), a method (<code>GET</code>), headers (<code>Authorization</code>, <code>Accept</code>, <code>Content-Type</code>), a status code (<code>200</code>), and a JSON body.</p>
      `
    },
    {
      id: 's6-pitfalls',
      title: 'Pitfalls Table',
      priority: false,
      icon: '🚫',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pitfall</th><th>Why it's a problem</th><th>Fix</th></tr></thead>
            <tbody>
              <tr>
                <td>Not checking the status code before using the response</td>
                <td>A <code>404</code> or <code>500</code> response body might be treated as valid data</td>
                <td>Always check status code first; branch on success vs error</td>
              </tr>
              <tr>
                <td>Blindly retrying a failed <code>POST</code></td>
                <td>Can create duplicate resources since <code>POST</code> isn't idempotent</td>
                <td>Use idempotency keys if the API supports them, or check for existing resources before retrying</td>
              </tr>
              <tr>
                <td>Using <code>PUT</code> when <code>PATCH</code> was intended</td>
                <td>Fields not included in the request body may get wiped or reset</td>
                <td>Use <code>PATCH</code> for partial updates; reserve <code>PUT</code> for full replacement</td>
              </tr>
              <tr>
                <td>Forgetting <code>Content-Type: application/json</code> on a request with a JSON body</td>
                <td>Server may fail to parse the body correctly or reject the request</td>
                <td>Always set the header explicitly when sending JSON</td>
              </tr>
              <tr>
                <td>Assuming <code>GET</code> requests can carry a body</td>
                <td>Many servers ignore or reject bodies on <code>GET</code></td>
                <td>Pass parameters via the query string instead</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 's6-hands-on',
      title: '🖥️ Hands-on Practice (Codespace Terminal)',
      priority: false,
      icon: '💻',
      bodyHTML: `
        <p>APIs are best explored with <code>curl</code> — a command-line tool for making HTTP requests, available by default in the Codespace.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Basic GET request:</h4>
        <div class="code-block"><pre>curl -i https://jsonplaceholder.typicode.com/users/1</pre></div>
        <p><code>-i</code> includes the response headers and status line in the output, not just the body. This is a free public test API — safe to experiment against.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Try a non-existent resource:</h4>
        <div class="code-block"><pre>curl -i https://jsonplaceholder.typicode.com/users/999</pre></div>
        <p>Notice the status code — this ID doesn't exist, so <code>404</code> should appear rather than a silent failure or empty success.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">POST request (creating a resource):</h4>
        <div class="code-block"><pre>curl -i -X POST https://jsonplaceholder.typicode.com/posts \\
    -H "Content-Type: application/json" \\
    -d '{"title": "test", "body": "hello", "userId": 1}'</pre></div>
        <p><code>-X POST</code> sets the method, <code>-H</code> adds a header, <code>-d</code> sends the request body. The status code returned should be <code>201 Created</code>.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Try it yourself:</h4>
        <ol style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li>GET a user with ID 3</li>
          <li>POST a new post with your own data</li>
          <li>GET a non-existent resource and check the status code</li>
        </ol>
      `
    },
    {
      id: 's6-devops-connection',
      title: 'DevOps Connection',
      priority: false,
      icon: '⚙️',
      bodyHTML: `
        <p>Virtually every modern infrastructure tool exposes or consumes a REST API — Docker, Kubernetes, GitHub, Terraform providers, and monitoring tools like Grafana all communicate over REST underneath their CLIs and dashboards. Understanding status codes and idempotency directly informs writing reliable automation: knowing that a <code>POST</code> retry can create duplicates, but a <code>PUT</code>/<code>DELETE</code> retry is safe, shapes how deployment and provisioning scripts are designed to handle failures.</p>
        <div class="info-box note">
          <strong>📌 Next section:</strong> <a href="#" style="color:var(--accent-secondary);">Working with APIs in Python (requests library)</a>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 7 — Working with APIs in Python (requests library)
  // ============================================================
  const SECTION_7_ACCORDIONS = [
    {
      id: "s7-installing-requests",
      title: "7.1 Installing and importing requests",
      priority: false,
      icon: "📦",
      bodyHTML: `
        <p><code>requests</code> is Python's most widely used library for making HTTP calls — it wraps the messy details of raw socket/HTTP handling into a simple, readable interface.</p>
        <div class="code-block"><pre>pip install requests --break-system-packages</pre></div>
        <div class="code-block"><pre>import requests</pre></div>
        <div class="info-box note">
          <strong>📌 Note:</strong> <code>requests</code> is a third-party library, not part of Python's standard library — unlike <code>os</code>, <code>json</code>, or <code>sys</code> from Section 2, it must be installed separately before it can be imported.
        </div>
      `
    },
    {
      id: "s7-get-request",
      title: "7.2 Making a GET request",
      priority: false,
      icon: "📥",
      bodyHTML: `
        <div class="code-block"><pre>import requests

  response = requests.get("https://jsonplaceholder.typicode.com/users/1")
  print(response.status_code)   # 200
  print(response.text)          # raw response body as a string</pre></div>
        <p>The <code>response</code> object bundles status code, headers, and body from Section 6 into one object with convenient attributes and methods.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Key <code>response</code> attributes (quick reference):</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Attribute/Method</th><th>Returns</th></tr></thead>
            <tbody>
              <tr><td><code>response.status_code</code></td><td>The HTTP status code as an integer, e.g. <code>200</code></td></tr>
              <tr><td><code>response.text</code></td><td>The response body as a raw string</td></tr>
              <tr><td><code>response.json()</code></td><td>The response body parsed into a Python dict/list (only works if the body is valid JSON)</td></tr>
              <tr><td><code>response.headers</code></td><td>A dict-like object of response headers</td></tr>
              <tr><td><code>response.ok</code></td><td><code>True</code> if status code is under <code>400</code>, <code>False</code> otherwise</td></tr>
              <tr><td><code>response.url</code></td><td>The final URL after any redirects</td></tr>
              <tr><td><code>response.history</code></td><td>List of redirect responses if any</td></tr>
            </tbody>
          </table>
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Parsing JSON directly:</h4>
        <div class="code-block"><pre>response = requests.get("https://jsonplaceholder.typicode.com/users/1")
  data = response.json()
  print(data["name"])    # accesses it like any Python dict</pre></div>
        <p><code>.json()</code> does the equivalent of <code>json.loads(response.text)</code> (JSON-parsing mechanics covered in Section 8) — it's a convenience method built into <code>requests</code> itself.</p>
      `
    },
    {
      id: "s7-check-success",
      title: "7.3 Checking for success before using the response",
      priority: false,
      icon: "✅",
      bodyHTML: `
        <div class="code-block"><pre>response = requests.get("https://jsonplaceholder.typicode.com/users/999")

  if response.status_code == 200:
      data = response.json()
      print(data["name"])
  else:
      print(f"Request failed with status {response.status_code}")</pre></div>
        <div class="info-box warning">
          <strong>⚠️ Critical:</strong> Never assume a request succeeded just because it returned <em>a</em> response — a failed request (<code>404</code>, <code>500</code>) still returns a valid <code>response</code> object; only the status code confirms the body actually contains what's expected. Calling <code>.json()</code> on an error response can raise its own exception if the error body isn't valid JSON, compounding the confusion.
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>response.ok</code> as a simpler alternative:</h4>
        <div class="code-block"><pre>if response.ok:
      data = response.json()
      print(data["name"])
  else:
      print(f"Request failed with status {response.status_code}")</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>raise_for_status()</code></h4>
        <p>A shortcut that raises an exception automatically on any <code>4xx</code>/<code>5xx</code> response:</p>
        <div class="code-block"><pre>try:
      response = requests.get("https://jsonplaceholder.typicode.com/users/999")
      response.raise_for_status()
      data = response.json()
  except requests.exceptions.HTTPError as e:
      print(f"HTTP error occurred: {e}")   # e.g., "404 Client Error: Not Found for url: ..."</pre></div>
        <p>This combines Section 2's <code>try/except</code> directly with API error handling — a very common real-world pattern.</p>
      `
    },
    {
      id: "s7-post-request",
      title: "7.4 Making a POST request",
      priority: false,
      icon: "📤",
      bodyHTML: `
        <div class="code-block"><pre>import requests

  payload = {"title": "test post", "body": "hello", "userId": 1}
  response = requests.post("https://jsonplaceholder.typicode.com/posts", json=payload)

  print(response.status_code)   # 201
  print(response.json())</pre></div>
        <p>The <code>json=</code> parameter does two things automatically:</p>
        <ol style="padding-left:1.2rem;margin:0.5rem 0;">
          <li>Converts the Python dict <code>payload</code> into a JSON string</li>
          <li>Sets the <code>Content-Type: application/json</code> header automatically</li>
        </ol>
        <div class="info-box tip">
          <strong>💡 Pro tip:</strong> This replaces manually setting headers and serializing data — <code>requests</code> handles both, which is exactly why it's preferred over lower-level HTTP libraries.
        </div>
      `
    },
    {
      id: "s7-put-patch-delete",
      title: "7.5 PUT, PATCH, and DELETE",
      priority: false,
      icon: "🔄",
      bodyHTML: `
        <div class="code-block"><pre><span class="code-comment"># PUT - full replacement</span>
  response = requests.put(
      "https://jsonplaceholder.typicode.com/posts/1",
      json={"id": 1, "title": "updated", "body": "new content", "userId": 1}
  )

  <span class="code-comment"># PATCH - partial update</span>
  response = requests.patch(
      "https://jsonplaceholder.typicode.com/posts/1",
      json={"title": "just updating the title"}
  )

  <span class="code-comment"># DELETE</span>
  response = requests.delete("https://jsonplaceholder.typicode.com/posts/1")
  print(response.status_code)   # 200 (this test API always returns 200, real APIs often return 204)</pre></div>
        <p>Each method mirrors its corresponding HTTP verb from Section 6 directly — <code>requests.get()</code>, <code>requests.post()</code>, <code>requests.put()</code>, <code>requests.patch()</code>, <code>requests.delete()</code>.</p>
      `
    },
    {
      id: "s7-query-params",
      title: "7.6 Query parameters",
      priority: false,
      icon: "🔍",
      bodyHTML: `
        <p>Rather than manually building a URL string with <code>?key=value&key2=value2</code>, <code>requests</code> handles it via the <code>params</code> argument:</p>
        <div class="code-block"><pre>response = requests.get(
      "https://jsonplaceholder.typicode.com/posts",
      params={"userId": 1}
  )
  print(response.url)   # https://jsonplaceholder.typicode.com/posts?userId=1</pre></div>
        <div class="info-box tip">
          <strong>💡 Pro tip:</strong> <code>requests</code> handles URL-encoding special characters automatically — spaces, ampersands, etc. in parameter values — which is easy to get wrong doing it manually.
        </div>
      `
    },
    {
      id: "s7-headers-auth",
      title: "7.7 Headers and authentication",
      priority: false,
      icon: "🔐",
      bodyHTML: `
        <p>Most real-world APIs require authentication — proving who's making the request. Two of the most common patterns:</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">API key in a header:</h4>
        <div class="code-block"><pre>headers = {"Authorization": "Bearer abc123token"}
  response = requests.get("https://api.example.com/data", headers=headers)</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Basic authentication (username/password):</h4>
        <div class="code-block"><pre>response = requests.get(
      "https://api.example.com/data",
      auth=("username", "password")
  )</pre></div>
        <p><code>requests</code> handles encoding the <code>auth</code> tuple into the correct <code>Authorization</code> header format automatically.</p>

        <div class="info-box warning">
          <strong>⚠️ Critical security callout:</strong> Never hardcode API keys, tokens, or passwords directly into a script committed to a repository. Load them from environment variables instead:
          <div class="code-block" style="margin-top:0.5rem;"><pre>import os
  token = os.environ.get("API_TOKEN")
  headers = {"Authorization": f"Bearer {token}"}</pre></div>
          <p style="margin-top:0.5rem;">This ties directly back to <code>os</code> from Section 2 and to the security principles from Pillar 3 — a secret leaked into <code>Great_Cheatsheets</code> or <code>DevOps-Journey</code> git history is extremely difficult to fully remove afterward, even after "deleting" it in a later commit.</p>
        </div>
      `
    },
    {
      id: "s7-sessions",
      title: "7.8 Sessions — Reusing Headers and Connections",
      priority: false,
      icon: "🔗",
      bodyHTML: `
        <p>A <strong>Session</strong> object in <code>requests</code> persists headers, cookies, and connection settings across multiple requests — useful when making many calls to the same API.</p>
        <div class="code-block"><pre>import requests

  <span class="code-comment"># Create a session</span>
  session = requests.Session()
  session.headers.update({"Authorization": "Bearer mytoken"})

  <span class="code-comment"># All requests from this session include the token</span>
  response1 = session.get("https://api.example.com/users")
  response2 = session.get("https://api.example.com/posts")

  <span class="code-comment"># Session also reuses TCP connections for performance</span>
  session.close()</pre></div>
        <div class="info-box tip">
          <strong>💡 When to use:</strong> If you're making more than 2-3 requests to the same API with the same headers, use a <code>Session</code> — it's cleaner and more performant than passing headers every time.
        </div>
      `
    },
    {
      id: "s7-timeouts",
      title: "7.9 Timeouts — a critical defensive habit",
      priority: false,
      icon: "⏰",
      bodyHTML: `
        <p>By default, <code>requests</code> waits <strong>indefinitely</strong> for a server to respond — a hung server can freeze the entire script forever.</p>
        <div class="code-block"><pre>try:
      response = requests.get("https://api.example.com/data", timeout=5)
  except requests.exceptions.Timeout:
      print("Request timed out after 5 seconds")</pre></div>
        <p><code>timeout=5</code> means "give up and raise an exception if no response arrives within 5 seconds."</p>
        <div class="info-box warning">
          <strong>⚠️ Callout:</strong> Always set a <code>timeout</code> on requests used in automation. A script without one, running as a scheduled job, can hang indefinitely on a slow or dead server — turning a five-minute cron job into one that never finishes and blocks everything scheduled after it.
        </div>
      `
    },
    {
      id: "s7-pagination",
      title: "7.10 Pagination",
      priority: false,
      icon: "📄",
      bodyHTML: `
        <p>APIs handling large datasets rarely return everything in one response — they <strong>paginate</strong>, returning a limited number of results per request along with information on how to get the next batch.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Common pagination style — page number and page size:</h4>
        <div class="code-block"><pre>import requests

  all_users = []
  page = 1

  while True:
      response = requests.get(
          "https://api.example.com/users",
          params={"page": page, "per_page": 50},
          timeout=5
      )
      data = response.json()

      if not data:          # empty list means no more results
          break

      all_users.extend(data)
      page += 1

  print(f"Total users fetched: {len(all_users)}")</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Common pagination style — cursor/token-based</h4>
        <p>Frequent in modern APIs like GitHub's:</p>
        <div class="code-block"><pre>all_items = []
  url = "https://api.example.com/items"

  while url:
      response = requests.get(url, timeout=5)
      data = response.json()
      all_items.extend(data["results"])
      url = data.get("next_page_url")   # None once there are no more pages</pre></div>

        <p>Both patterns share the same shape: loop, request a batch, accumulate results, check for a "more data" signal, repeat until it's gone. The specific mechanism (page numbers vs cursor tokens) varies by API — always check the target API's documentation for which style it uses.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Respecting rate limits</h4>
        <p>Many APIs enforce rate limits — exceeding them results in <code>429 Too Many Requests</code>. Add a small delay between paginated requests:</p>
        <div class="code-block"><pre>import time

  <span class="code-comment"># Inside pagination loop</span>
  time.sleep(0.1)   # 100ms between requests</pre></div>
      `
    },
    {
      id: "s7-pitfalls",
      title: "Pitfalls Table",
      priority: false,
      icon: "🚫",
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pitfall</th><th>Why it's a problem</th><th>Fix</th></tr></thead>
            <tbody>
              <tr>
                <td>Not checking status code before calling <code>.json()</code></td>
                <td>Error response bodies may not be valid JSON, raising a confusing secondary exception</td>
                <td>Check <code>response.status_code</code> or use <code>raise_for_status()</code> first</td>
              </tr>
              <tr>
                <td>No <code>timeout</code> set</td>
                <td>A hung server freezes the script indefinitely</td>
                <td>Always pass <code>timeout=</code> (e.g. <code>timeout=5</code>)</td>
              </tr>
              <tr>
                <td>Hardcoding API keys/tokens in script source</td>
                <td>Secrets committed to git history are extremely hard to fully remove later</td>
                <td>Load credentials via <code>os.environ.get()</code></td>
              </tr>
              <tr>
                <td>Assuming all APIs paginate the same way</td>
                <td>A script written for page-based pagination silently breaks against a cursor-based API</td>
                <td>Always check the specific API's documentation for its pagination style</td>
              </tr>
              <tr>
                <td>Forgetting <code>json=</code> sends <code>Content-Type</code> automatically and using <code>data=</code> with a manually dumped string instead</td>
                <td>Easy to forget the header, causing servers to reject or misparse the body</td>
                <td>Prefer <code>json=payload</code> over manually serializing with <code>json.dumps()</code> and <code>data=</code></td>
              </tr>
              <tr>
                <td>Not respecting rate limits</td>
                <td>Hitting <code>429 Too Many Requests</code> causes requests to fail</td>
                <td>Add <code>time.sleep()</code> between paginated requests</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: "s7-hands-on",
      title: "🖥️ Hands-on Exercise",
      priority: false,
      icon: "💻",
      bodyHTML: `
        <p>In <code>/workspaces/DevOps-Journey</code>:</p>
        <div class="code-block"><pre>nano api_practice.py</pre></div>

        <ol style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li>Make a <code>GET</code> request to <code>https://jsonplaceholder.typicode.com/posts</code>, with <code>timeout=5</code></li>
          <li>Use <code>raise_for_status()</code> inside a <code>try/except requests.exceptions.HTTPError</code> block</li>
          <li>Parse the JSON response and print the <code>title</code> of the first 5 posts using a <code>for</code> loop with slicing (<code>data[:5]</code>)</li>
          <li>Make a <code>POST</code> request creating a new post with a <code>json=</code> payload, and print the resulting status code and the <code>id</code> field from the response</li>
          <li><strong>Bonus:</strong> Use <code>os.environ.get()</code> to load a GitHub token (optional), then make a request to GitHub's API</li>
        </ol>

        <p>Run:</p>
        <div class="code-block"><pre>python3 api_practice.py</pre></div>
      `
    },
    {
      id: "s7-devops-connection",
      title: "DevOps Connection",
      priority: false,
      icon: "⚙️",
      bodyHTML: `
        <p>Nearly every infrastructure automation task involving a cloud provider, monitoring tool, or CI/CD platform ultimately comes down to Python scripts wrapping this exact <code>requests</code> pattern — authenticate, request, check status, parse JSON, handle pagination. Tools like the AWS SDK (<code>boto3</code>) are essentially very elaborate wrappers around this same fundamental workflow, tailored to a specific API's endpoints and authentication scheme.</p>
        <div class="info-box note">
          <strong>📌 Next section:</strong> <a href="#" style="color:var(--accent-secondary);">JSON Parsing &amp; Data Manipulation</a>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 8 — JSON Parsing & Data Manipulation
  // ============================================================
  const SECTION_8_ACCORDIONS = [
    {
      id: "s8-what-is-json",
      title: "8.1 What is JSON?",
      priority: false,
      icon: "📋",
      bodyHTML: `
        <p><strong>JSON</strong> (JavaScript Object Notation) is a lightweight, text-based data format for representing structured data. Despite the name, it's language-agnostic — virtually every programming language can read and write it. It's the dominant format for REST API request/response bodies (Sections 6–7) and for configuration files.</p>
        <div class="code-block"><pre>{
    "name": "Keith",
    "pillar": 4,
    "active": true,
    "tools": ["docker", "kubernetes"],
    "cert": null
  }</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">JSON data types and their Python equivalents:</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>JSON type</th><th>Python equivalent</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td>object <code>{}</code></td><td><code>dict</code></td><td>key-value pairs, keys always in double quotes</td></tr>
              <tr><td>array <code>[]</code></td><td><code>list</code></td><td>ordered collection</td></tr>
              <tr><td>string</td><td><code>str</code></td><td>always double-quoted — single quotes are invalid JSON</td></tr>
              <tr><td>number</td><td><code>int</code> or <code>float</code></td><td>no distinction in JSON itself</td></tr>
              <tr><td><code>true</code> / <code>false</code></td><td><code>True</code> / <code>False</code></td><td>lowercase in JSON, capitalized in Python</td></tr>
              <tr><td><code>null</code></td><td><code>None</code></td><td>JSON's version of "no value"</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box warning">
          <strong>⚠️ Critical syntax note:</strong> JSON requires <strong>double quotes</strong> for strings and keys — <code>{'name': 'Keith'}</code> (single quotes) is <strong>not</strong> valid JSON, even though it's valid Python. This trips people up constantly when hand-writing JSON payloads.
        </div>
        <div class="info-box note">
          <strong>📌 JSON vs YAML:</strong> YAML is a superset of JSON — valid JSON is valid YAML. Kubernetes and Ansible use YAML for human readability, but many tools (cloud CLIs) output JSON. Understanding JSON directly translates to understanding YAML.
        </div>
      `
    },
    {
      id: "s8-json-module",
      title: "8.2 Python's json module — the four core functions",
      priority: false,
      icon: "📦",
      bodyHTML: `
        <div class="code-block"><pre>import json</pre></div>

        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Function</th><th>Direction</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td><code>json.loads()</code></td><td>JSON string → Python object</td><td>Parse a JSON string already in memory</td></tr>
              <tr><td><code>json.load()</code></td><td>JSON file → Python object</td><td>Parse JSON directly from an open file</td></tr>
              <tr><td><code>json.dumps()</code></td><td>Python object → JSON string</td><td>Serialize a Python object to a JSON string</td></tr>
              <tr><td><code>json.dump()</code></td><td>Python object → JSON file</td><td>Serialize and write directly to an open file</td></tr>
            </tbody>
          </table>
        </div>
        <p>The naming pattern: <strong>no <code>s</code></strong> means it works with <strong>files</strong>; <strong>with <code>s</code></strong> means it works with <strong>strings</strong> already in memory ("loads" = "load string", "dumps" = "dump string").</p>
      `
    },
    {
      id: "s8-json-loads",
      title: "8.3 json.loads() — parsing a JSON string",
      priority: false,
      icon: "📥",
      bodyHTML: `
        <div class="code-block"><pre>import json

  json_string = '{"name": "Keith", "pillar": 4, "active": true}'
  data = json.loads(json_string)

  print(data["name"])       # Keith
  print(type(data))         # <class 'dict'></pre></div>
        <p>This is exactly what <code>response.json()</code> does internally in Section 7 — <code>requests</code> calls <code>json.loads()</code> on <code>response.text</code> behind the scenes.</p>
      `
    },
    {
      id: "s8-json-dumps",
      title: "8.4 json.dumps() — converting Python back to a JSON string",
      priority: false,
      icon: "📤",
      bodyHTML: `
        <div class="code-block"><pre>import json

  data = {"name": "Keith", "pillar": 4, "active": True}
  json_string = json.dumps(data)

  print(json_string)
  # {"name": "Keith", "pillar": 4, "active": true}
  print(type(json_string))   # <class 'str'></pre></div>
        <p>Notice <code>True</code> (Python) became <code>true</code> (JSON) automatically — <code>json.dumps()</code> handles this type conversion.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Pretty-printing with <code>indent</code>:</h4>
        <div class="code-block"><pre>print(json.dumps(data, indent=2))</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>{
    "name": "Keith",
    "pillar": 4,
    "active": true
  }</pre></div>
        <p>Without <code>indent</code>, <code>dumps()</code> produces a single compact line — fine for sending over the network, unreadable for humans debugging output. <code>indent=2</code> (or <code>4</code>) formats it for readability.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Sorting keys for reproducible output:</h4>
        <div class="code-block"><pre>print(json.dumps(data, indent=2, sort_keys=True))</pre></div>
        <div class="info-box tip">
          <strong>💡 Pro tip:</strong> <code>sort_keys=True</code> is useful when generating config files that are checked into version control — it prevents unnecessary diff noise when fields are reordered.
        </div>
      `
    },
    {
      id: "s8-json-files",
      title: "8.5 Reading and writing JSON files directly",
      priority: false,
      icon: "📄",
      bodyHTML: `
        <div class="code-block"><pre>import json

  <span class="code-comment"># Writing</span>
  data = {"name": "Keith", "pillar": 4}
  with open("config.json", "w") as f:
      json.dump(data, f, indent=2)

  <span class="code-comment"># Reading</span>
  with open("config.json", "r") as f:
      loaded_data = json.load(f)

  print(loaded_data["name"])   # Keith</pre></div>
        <p><code>json.load(f)</code> and <code>json.dump(data, f, ...)</code> take the file object <code>f</code> directly — no need to manually <code>.read()</code> the file first and then call <code>json.loads()</code> on the resulting string, though that would also work. Combining this with Section 3's <code>with</code> statement is the standard pattern for config files in real scripts.</p>
      `
    },
    {
      id: "s8-nested-json",
      title: "8.6 Navigating nested JSON structures",
      priority: false,
      icon: "🔍",
      bodyHTML: `
        <p>Real-world JSON is rarely flat — it commonly nests objects inside objects, and arrays of objects:</p>
        <div class="code-block"><pre>data = {
      "user": {
          "name": "Keith",
          "pillars": ["networking", "linux", "security"],
          "contact": {
              "email": "keith@example.com"
          }
      }
  }

  print(data["user"]["name"])                    # Keith
  print(data["user"]["pillars"][0])              # networking
  print(data["user"]["contact"]["email"])        # keith@example.com</pre></div>
        <p>Chained bracket access mirrors the nesting structure exactly — each <code>[]</code> steps one level deeper.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Looping over a list of nested objects</h4>
        <p>A very common API response shape:</p>
        <div class="code-block"><pre>users = [
      {"name": "Keith", "role": "student"},
      {"name": "Alice", "role": "mentor"}
  ]

  for user in users:
      print(f"{user['name']} — {user['role']}")</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>Keith — student
  Alice — mentor</pre></div>
      `
    },
    {
      id: "s8-missing-keys",
      title: "8.7 Handling missing keys safely",
      priority: false,
      icon: "🛡️",
      bodyHTML: `
        <p>Directly indexing a dict with <code>[]</code> raises <code>KeyError</code> if the key doesn't exist:</p>
        <div class="code-block"><pre>data = {"name": "Keith"}
  print(data["email"])   # KeyError: 'email'</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>.get()</code> — the safer alternative</h4>
        <p>Returns <code>None</code> (or a specified default) instead of raising an exception:</p>
        <div class="code-block"><pre>print(data.get("email"))              # None
  print(data.get("email", "no email"))  # no email</pre></div>
        <div class="info-box warning">
          <strong>⚠️ Critical for real-world API data:</strong> Fields are often optional or inconsistently present across different records in a response. Using <code>.get()</code> instead of <code>[]</code> when parsing external data prevents a single missing field from crashing an entire batch-processing script — directly connecting back to Section 2's error-handling philosophy.
        </div>
      `
    },
    {
      id: "s8-jsondecode-error",
      title: "8.8 Handling malformed JSON",
      priority: false,
      icon: "🚨",
      bodyHTML: `
        <div class="code-block"><pre>import json

  bad_json = '{"name": "Keith", "pillar": }'   # missing value — invalid JSON

  try:
      data = json.loads(bad_json)
  except json.JSONDecodeError as e:
      print(f"Invalid JSON: {e}")</pre></div>
        <p><code>json.JSONDecodeError</code> is raised when the string simply isn't valid JSON syntax — distinct from <code>KeyError</code> (a missing key in otherwise-valid JSON). Scripts parsing JSON from external, untrusted, or unreliable sources (an API having a bad day, a corrupted config file) should anticipate both failure modes.</p>
      `
    },
    {
      id: "s8-jq",
      title: "8.9 jq — JSON parsing from the command line / Bash",
      priority: false,
      icon: "🖥️",
      bodyHTML: `
        <p><code>jq</code> is a command-line tool for filtering and transforming JSON, used constantly alongside <code>curl</code> in Bash scripts (tying directly back to Sections 4–6).</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Basic pretty-printing:</h4>
        <div class="code-block"><pre>curl -s https://jsonplaceholder.typicode.com/users/1 | jq</pre></div>
        <p><code>-s</code> (silent) suppresses <code>curl</code>'s progress output; piping into <code>jq</code> pretty-prints the JSON automatically.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Extracting a specific field:</h4>
        <div class="code-block"><pre>curl -s https://jsonplaceholder.typicode.com/users/1 | jq '.name'</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>"Keith Mash"</pre></div>
        <p><code>.name</code> accesses the <code>name</code> key — the leading <code>.</code> is required syntax for <code>jq</code>, representing "the root of the JSON document."</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Nested field access:</h4>
        <div class="code-block"><pre>curl -s https://jsonplaceholder.typicode.com/users/1 | jq '.address.city'</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Extracting from an array of objects:</h4>
        <div class="code-block"><pre>curl -s https://jsonplaceholder.typicode.com/users | jq '.[0].name'</pre></div>
        <p><code>.[0]</code> accesses the first element of the top-level array, then <code>.name</code> on that element.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Extracting a field from every item in an array:</h4>
        <div class="code-block"><pre>curl -s https://jsonplaceholder.typicode.com/users | jq '.[].name'</pre></div>
        <p><code>.[]</code> (no index) iterates over every element, applying <code>.name</code> to each — outputs one quoted string per user.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Filtering objects:</h4>
        <div class="code-block"><pre>curl -s https://jsonplaceholder.typicode.com/users | jq '.[] | select(.id > 5)'</pre></div>
        <p>This returns all users with <code>id</code> greater than 5. <code>select()</code> filters the stream — very useful for extracting specific items from API responses.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Raw output without quotes:</h4>
        <div class="code-block"><pre>curl -s https://jsonplaceholder.typicode.com/users/1 | jq -r '.name'</pre></div>
        <p>Output:</p>
        <div class="code-block"><pre>Keith Mash</pre></div>
        <p><code>-r</code> strips the surrounding quotes <code>jq</code> normally adds — critical when the extracted value needs to be used directly in a Bash variable or another command, since <code>"Keith Mash"</code> (with quotes) and <code>Keith Mash</code> behave differently once assigned to a shell variable.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Combining with Bash variables:</h4>
        <div class="code-block"><pre>name=$(curl -s https://jsonplaceholder.typicode.com/users/1 | jq -r '.name')
  echo "User name: $name"</pre></div>
      `
    },
    {
      id: "s8-pitfalls",
      title: "Pitfalls Table",
      priority: false,
      icon: "🚫",
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pitfall</th><th>Why it's a problem</th><th>Fix</th></tr></thead>
            <tbody>
              <tr>
                <td>Hand-writing JSON with single quotes</td>
                <td>Invalid JSON — <code>json.loads()</code> will raise <code>JSONDecodeError</code></td>
                <td>Always use double quotes for JSON strings and keys</td>
              </tr>
              <tr>
                <td>Using <code>[]</code> instead of <code>.get()</code> on external/API data</td>
                <td>A single missing key raises <code>KeyError</code> and can crash batch processing</td>
                <td>Use <code>.get()</code> with a sensible default when parsing untrusted or variable-shape data</td>
              </tr>
              <tr>
                <td>Forgetting <code>-r</code> when piping <code>jq</code> output into a Bash variable</td>
                <td>The variable ends up containing literal quote characters</td>
                <td>Add <code>-r</code> to strip quotes from string output</td>
              </tr>
              <tr>
                <td>Assuming all JSON parses successfully</td>
                <td>Malformed JSON (missing commas, unquoted keys, trailing commas) raises <code>JSONDecodeError</code></td>
                <td>Wrap parsing in <code>try/except json.JSONDecodeError</code> for untrusted input</td>
              </tr>
              <tr>
                <td>Confusing <code>jq '.[0]'</code> and <code>jq '.[]'</code></td>
                <td><code>.[0]</code> returns one element; <code>.[]</code> returns/iterates all elements — easy to mix up</td>
                <td>Remember: index number = one item, empty brackets = every item</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: "s8-hands-on",
      title: "🖥️ Hands-on Exercise",
      priority: false,
      icon: "💻",
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">Python side</h4>
        <p>In <code>/workspaces/DevOps-Journey</code> — <code>nano json_practice.py</code>:</p>
        <ol style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li>Create a nested Python dict representing a pillar (<code>name</code>, <code>sections_complete</code>, and a nested <code>topics</code> list)</li>
          <li>Write it to <code>pillar_status.json</code> using <code>json.dump()</code> with <code>indent=2</code></li>
          <li>Read it back with <code>json.load()</code> and print the <code>topics</code> list using a <code>for</code> loop</li>
          <li>Use <code>.get()</code> to safely check for a <code>"deadline"</code> key that doesn't exist, printing a default message if absent</li>
        </ol>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Bash side</h4>
        <p>In the terminal:</p>
        <ol style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;" start="5">
          <li>Run <code>cat pillar_status.json | jq '.topics'</code></li>
          <li>Run <code>cat pillar_status.json | jq -r '.name'</code> and confirm the output has no surrounding quotes</li>
          <li><strong>Bonus:</strong> Use <code>curl</code> and <code>jq</code> together: <code>curl -s https://jsonplaceholder.typicode.com/users | jq '.[] | select(.id < 3)'</code></li>
        </ol>
      `
    },
    {
      id: "s8-devops-connection",
      title: "DevOps Connection",
      priority: false,
      icon: "⚙️",
      bodyHTML: `
        <p>JSON is the universal data-interchange format across the entire DevOps toolchain — Kubernetes manifests (often authored in YAML but convertible to/from JSON), Terraform state files, GitHub Actions workflow outputs, and every cloud provider's CLI (<code>--output json</code>) all speak JSON. <code>jq</code> specifically is a staple in CI/CD pipeline scripts for extracting values from tool output to pass into subsequent steps.</p>
        <div class="info-box note">
          <strong>📌 Next section:</strong> <a href="#" style="color:var(--accent-secondary);">Automation Patterns</a>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 9 — Automation Patterns
  // ============================================================
  const SECTION_9_ACCORDIONS = [
    {
      id: "s9-automation-ready",
      title: "9.1 What makes a script 'automation-ready'?",
      priority: false,
      icon: "🤖",
      bodyHTML: `
        <p>Everything up to this point covered how to write functional scripts. This section covers what separates a script that works <em>once, when run and watched</em> from one that works reliably <em>unattended, on a schedule, for months, without anyone watching.</em> This section ties Sections 1–8 together into production-quality thinking.</p>
        <div class="info-box note">
          <strong>📌 Key insight:</strong> A script that works when you run it manually is the minimum. A script that works when run unattended at 3 AM, with network flakiness, missing config, and unexpected input — that's automation-ready.
        </div>
      `
    },
    {
      id: "s9-idempotency",
      title: "9.2 Idempotency — the central automation principle",
      priority: false,
      icon: "🔄",
      bodyHTML: `
        <p>An <strong>idempotent</strong> operation produces the same end state no matter how many times it's applied.</p>
        <p>Why this matters for automation specifically: scheduled scripts, retries, and re-runs are inevitable. A script that isn't idempotent creates a growing list of problems every time it accidentally runs twice.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Non-idempotent example:</h4>
        <div class="code-block"><pre>def create_log_entry():
      with open("audit.log", "a") as f:
          f.write("User created\\n")</pre></div>
        <p>Run this script twice (e.g., a retry after a network blip made it look like it failed) and <code>audit.log</code> now falsely shows two user-creation events instead of one.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Idempotent version — check before acting:</h4>
        <div class="code-block"><pre>import os

  def create_log_entry():
      entry = "User created\\n"
      if os.path.exists("audit.log"):
          with open("audit.log", "r") as f:
              if entry in f.read():
                  return   # already logged, do nothing
      with open("audit.log", "a") as f:
          f.write(entry)</pre></div>
        <p>Now running it multiple times leaves the same end state as running it once.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">The general idempotency pattern:</h4>
        <ol style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li>Check whether the desired end state already exists</li>
          <li>If yes, do nothing (or confirm and exit cleanly)</li>
          <li>If no, make the change</li>
        </ol>
        <div class="info-box note">
          <strong>📌 Why this matters in DevOps:</strong> This exact pattern is why Terraform and Ansible (Phase 2) can be safely re-run repeatedly — they check current state before making changes, rather than blindly re-executing every action.
        </div>
      `
    },
    {
      id: "s9-idempotency-api",
      title: "9.3 Idempotency with API operations",
      priority: false,
      icon: "🔁",
      bodyHTML: `
        <p>Tying back to Section 6/7's discussion of HTTP method idempotency — the same principle applies at the script level:</p>
        <div class="code-block"><pre>import requests

  def ensure_user_exists(name, email):
      <span class="code-comment"># Check first</span>
      response = requests.get(
          "https://api.example.com/users",
          params={"email": email},
          timeout=5
      )
      existing = response.json()

      if existing:
          print(f"User {email} already exists — skipping creation")
          return existing[0]

      <span class="code-comment"># Only create if it doesn't already exist</span>
      response = requests.post(
          "https://api.example.com/users",
          json={"name": name, "email": email},
          timeout=5
      )
      return response.json()</pre></div>
        <p>This wraps a non-idempotent <code>POST</code> in a "check-then-act" pattern, making the overall function safe to call repeatedly.</p>
      `
    },
    {
      id: "s9-logging",
      title: "9.4 Logging — replacing print() with structured records",
      priority: false,
      icon: "📝",
      bodyHTML: `
        <p><code>print()</code> has been used throughout this pillar for simplicity, but real automation scripts use Python's built-in <code>logging</code> module instead. The difference matters once a script runs unattended: <code>print()</code> output vanishes unless someone happened to be watching the terminal, while logs can be written to a file, timestamped, and categorized by severity.</p>
        <div class="code-block"><pre>import logging

  logging.basicConfig(
      level=logging.INFO,
      format="%(asctime)s [%(levelname)s] %(message)s",
      filename="script.log"
  )

  logging.info("Script started")
  logging.warning("Config value missing, using default")
  logging.error("Failed to connect to API")</pre></div>
        <p>Output written to <code>script.log</code>:</p>
        <div class="code-block"><pre>2026-07-13 10:15:32 [INFO] Script started
  2026-07-13 10:15:33 [WARNING] Config value missing, using default
  2026-07-13 10:15:34 [ERROR] Failed to connect to API</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Logging severity levels, in increasing order of seriousness:</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Level</th><th>When to use</th></tr></thead>
            <tbody>
              <tr><td><code>DEBUG</code></td><td>Fine-grained diagnostic detail, useful only when actively troubleshooting</td></tr>
              <tr><td><code>INFO</code></td><td>Normal operation milestones — "script started," "processed 50 records"</td></tr>
              <tr><td><code>WARNING</code></td><td>Something unexpected but not breaking — a missing optional config, a slow response</td></tr>
              <tr><td><code>ERROR</code></td><td>Something failed — a request errored, a file couldn't be read</td></tr>
              <tr><td><code>CRITICAL</code></td><td>The whole script/system is in serious trouble and likely can't continue</td></tr>
            </tbody>
          </table>
        </div>
        <p>Setting <code>level=logging.INFO</code> means messages at <code>INFO</code> and above are recorded; <code>DEBUG</code> messages are silently ignored unless the level is lowered. This lets a script ship with verbose <code>DEBUG</code> logging built in, quietly available by changing one line, without cluttering normal output.</p>
        <div class="info-box warning">
          <strong>⚠️ Callout:</strong> For any script that runs unattended (cron job, CI/CD step), logging to a file is not optional in practice — it's the only record of what happened if something goes wrong at 3 AM with nobody watching.
        </div>
      `
    },
    {
      id: "s9-logging-errors",
      title: "9.5 Combining logging with error handling",
      priority: false,
      icon: "🛡️",
      bodyHTML: `
        <div class="code-block"><pre>import logging
  import requests

  logging.basicConfig(level=logging.INFO, filename="script.log",
                      format="%(asctime)s [%(levelname)s] %(message)s")

  def fetch_data(url):
      try:
          response = requests.get(url, timeout=5)
          response.raise_for_status()
          logging.info(f"Successfully fetched {url}")
          return response.json()
      except requests.exceptions.Timeout:
          logging.error(f"Timeout while fetching {url}")
          return None
      except requests.exceptions.HTTPError as e:
          logging.error(f"HTTP error fetching {url}: {e}")
          return None</pre></div>
        <p>This is Section 2's <code>try/except</code> and Section 7's <code>requests</code> error handling, now feeding into a permanent, timestamped record instead of a <code>print()</code> statement that disappears the moment the terminal closes.</p>
      `
    },
    {
      id: "s9-retry-backoff",
      title: "9.6 Retry logic with backoff",
      priority: false,
      icon: "⏳",
      bodyHTML: `
        <p>Transient failures (a brief network blip, a server momentarily overloaded) are common enough that automation scripts often retry before giving up entirely — but retrying instantly and repeatedly can make an already-struggling server worse.</p>
        <div class="code-block"><pre>import time
  import logging

  def fetch_with_retry(url, max_attempts=3, max_wait=60):
      for attempt in range(1, max_attempts + 1):
          try:
              response = requests.get(url, timeout=5)
              response.raise_for_status()
              return response.json()
          except requests.exceptions.RequestException as e:
              logging.warning(f"Attempt {attempt} failed: {e}")
              if attempt == max_attempts:
                  logging.error(f"All {max_attempts} attempts failed for {url}")
                  raise
              wait = min(2 ** attempt, max_wait)   <span class="code-comment"># Cap at max_wait</span>
              time.sleep(wait)   <span class="code-comment"># exponential backoff: 2s, 4s, 8s...</span></pre></div>
        <p><code>2 ** attempt</code> is <strong>exponential backoff</strong> — each retry waits longer than the last (2 seconds, then 4, then 8), giving a struggling server increasing breathing room rather than hammering it with immediate retries.</p>
        <div class="info-box warning">
          <strong>⚠️ Critical connection:</strong> This is only safe to do because of Section 9.3's idempotency pattern. Retrying a non-idempotent <code>POST</code> blindly can create duplicate resources on every retry — retry logic and idempotency are two halves of the same reliability strategy.
        </div>
      `
    },
    {
      id: "s9-cron",
      title: "9.7 Scheduling automation — cron",
      priority: false,
      icon: "⏰",
      bodyHTML: `
        <p><strong>cron</strong> is the standard Linux utility for running scripts automatically on a schedule, without any human triggering them.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Cron syntax — five fields plus the command:</h4>
        <div class="code-block"><pre>* * * * * /path/to/script.sh
  │ │ │ │ │
  │ │ │ │ └── day of week (0-6, Sunday=0)
  │ │ │ └──── month (1-12)
  │ │ └────── day of month (1-31)
  │ └──────── hour (0-23)
  └────────── minute (0-59)</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Examples:</h4>
        <div class="code-block"><pre><span class="code-comment"># Run every day at 2:00 AM</span>
  0 2 * * * /home/user/backup.sh

  <span class="code-comment"># Run every 15 minutes</span>
  */15 * * * * /home/user/check_status.sh

  <span class="code-comment"># Run every Monday at 9:00 AM</span>
  0 9 * * 1 /home/user/weekly_report.sh</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Editing your crontab:</h4>
        <div class="code-block"><pre>crontab -e</pre></div>
        <p>Opens an editor where each line is one scheduled job, using the syntax above.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Viewing current scheduled jobs:</h4>
        <div class="code-block"><pre>crontab -l</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Cron environment pitfalls — concrete example:</h4>
        <p>A script that runs fine manually fails silently under cron:</p>
        <div class="code-block"><pre><span class="code-comment"># Fails under cron — python3 not found, relative path wrong</span>
  0 2 * * * python3 backup.py

  <span class="code-comment"># Fix: absolute paths and explicit environment</span>
  0 2 * * * /usr/bin/python3 /home/user/backup.py &gt;&gt; /home/user/backup.log 2&gt;&amp;1</pre></div>
        <div class="info-box warning">
          <strong>⚠️ Critical automation pitfall:</strong> Cron jobs run in a minimal environment — they don't have the same <code>PATH</code>, environment variables, or working directory as an interactive terminal session. A script that works fine when run manually can fail silently under cron because it can't find a command it assumed was available, or a relative file path doesn't resolve to what was expected. Always use absolute paths in cron-scheduled scripts, and explicitly set any environment variables the script needs.
        </div>
      `
    },
    {
      id: "s9-complete-script",
      title: "9.8 Bringing it all together — a realistic automation script shape",
      priority: false,
      icon: "📋",
      bodyHTML: `
        <div class="code-block"><pre><span class="code-comment">#!/usr/bin/env python3</span>
  import logging
  import time
  import requests
  import os

  logging.basicConfig(
      level=logging.INFO,
      filename="automation.log",
      format="%(asctime)s [%(levelname)s] %(message)s"
  )

  def check_resource_exists(name):
      <span class="code-comment">"""Idempotency check before acting."""</span>
      response = requests.get(
          "https://api.example.com/resources",
          params={"name": name},
          timeout=5
      )
      return len(response.json()) > 0

  def create_resource(name, max_attempts=3, max_wait=60):
      <span class="code-comment">"""Retry with exponential backoff."""</span>
      for attempt in range(1, max_attempts + 1):
          try:
              response = requests.post(
                  "https://api.example.com/resources",
                  json={"name": name},
                  timeout=5
              )
              response.raise_for_status()
              logging.info(f"Created resource: {name}")
              return response.json()
          except requests.exceptions.RequestException as e:
              logging.warning(f"Attempt {attempt} failed: {e}")
              if attempt == max_attempts:
                  logging.error(f"Failed to create {name} after {max_attempts} attempts")
                  raise
              wait = min(2 ** attempt, max_wait)
              time.sleep(wait)

  def main():
      resource_name = "web-server-01"

      if check_resource_exists(resource_name):
          logging.info(f"{resource_name} already exists — nothing to do")
          return

      create_resource(resource_name)

  <span class="code-comment"># The __name__ guard ensures main() only runs when executed directly</span>
  <span class="code-comment"># Not when imported as a module into another script</span>
  if __name__ == "__main__":
      main()</pre></div>
        <p>Every piece introduced across this entire pillar appears here: functions and modules (Section 2), the <code>requests</code> library (Section 7), JSON handling (Section 8), idempotency, logging, and retry logic (Section 9). This is the realistic shape of a small production automation script.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Why <code>if __name__ == "__main__":</code> matters</h4>
        <p>When you run <code>python3 script.py</code>, Python sets <code>__name__</code> to <code>"__main__"</code>. When the same file is imported as a module (<code>import script</code>), <code>__name__</code> is set to the module name (<code>"script"</code>). This guard ensures <code>main()</code> only runs when the script is executed directly, not when imported — a standard convention for any script that might also be reused as a library.</p>
      `
    },
    {
      id: "s9-pitfalls",
      title: "Pitfalls Table",
      priority: false,
      icon: "🚫",
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pitfall</th><th>Why it's a problem</th><th>Fix</th></tr></thead>
            <tbody>
              <tr>
                <td>Non-idempotent operations in scheduled/retried scripts</td>
                <td>Duplicate resources, duplicate log entries, or corrupted state on re-run</td>
                <td>Always check current state before acting (check-then-act pattern)</td>
              </tr>
              <tr>
                <td>Using <code>print()</code> in unattended scripts</td>
                <td>Output vanishes with no record if nobody was watching the terminal</td>
                <td>Use the <code>logging</code> module writing to a file</td>
              </tr>
              <tr>
                <td>Retrying instantly and repeatedly on failure</td>
                <td>Can worsen an already-struggling server ("retry storm")</td>
                <td>Use exponential backoff (<code>time.sleep(2 ** attempt)</code>)</td>
              </tr>
              <tr>
                <td>Retrying non-idempotent operations blindly</td>
                <td>Can create duplicate resources on every retry</td>
                <td>Combine retry logic with idempotency checks</td>
              </tr>
              <tr>
                <td>Relative file paths or missing env vars in cron jobs</td>
                <td>Script works manually but fails silently under cron's minimal environment</td>
                <td>Use absolute paths; explicitly set required environment variables</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: "s9-hands-on",
      title: "🖥️ Hands-on Exercise",
      priority: false,
      icon: "💻",
      bodyHTML: `
        <p>In <code>/workspaces/DevOps-Journey</code>:</p>
        <div class="code-block"><pre>nano automation_practice.py</pre></div>

        <ol style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li>Set up <code>logging</code> to write to <code>practice.log</code>, with <code>INFO</code> level and timestamps</li>
          <li>Define a function <code>resource_exists(path)</code> that checks with <code>os.path.exists()</code> whether a file already exists (idempotency check)</li>
          <li>Define a function <code>create_resource(path, content)</code> that creates the file only if <code>resource_exists()</code> returns <code>False</code>, logging either "already exists" or "created" accordingly</li>
          <li>Wrap a network call (reuse the <code>jsonplaceholder</code> API from earlier sections) in retry logic with exponential backoff, logging each attempt</li>
          <li>Use the <code>if __name__ == "__main__":</code> guard</li>
        </ol>

        <p>Run the script twice in a row and confirm via <code>cat practice.log</code> that the second run correctly detects the file already exists rather than recreating it.</p>

        <p><strong>Optional (if comfortable):</strong> Set up a real cron job using <code>crontab -e</code> that runs this script every 5 minutes, then check <code>practice.log</code> a few minutes later to confirm it ran unattended.</p>
      `
    },
    {
      id: "s9-devops-connection",
      title: "DevOps Connection",
      priority: false,
      icon: "⚙️",
      bodyHTML: `
        <p>This section <em>is</em> the DevOps connection — idempotency, structured logging, retry-with-backoff, and scheduling are the exact patterns underlying Ansible playbooks, Terraform applies, Kubernetes reconciliation loops, and CI/CD pipeline steps. Every tool in Phase 2 is, at its core, a more sophisticated implementation of the same principles just built here from scratch in Python and Bash.</p>
        <div class="info-box note">
          <strong>📌 Pillar 4 complete.</strong> All 9 sections finished:
          <ul style="margin-top:0.25rem;padding-left:1.2rem;">
            <li>Python Fundamentals ✅</li>
            <li>Python Functions, Modules &amp; Error Handling ✅</li>
            <li>File I/O in Python ✅</li>
            <li>Bash Scripting Fundamentals ✅</li>
            <li>Bash Scripting — Advanced ✅</li>
            <li>REST APIs — Concepts ✅</li>
            <li>Working with APIs in Python (requests) ✅</li>
            <li>JSON Parsing &amp; Data Manipulation ✅</li>
            <li>Automation Patterns ✅</li>
          </ul>
        </div>
        <div class="info-box tip" style="margin-top:0.75rem;">
          <strong>Next:</strong> Publish workflow — commit all markdown to <code>Great_Cheatsheets</code>, build <code>html/scripting.html</code> matching the existing site style, update <code>index.html</code>, commit to <code>DevOps-Journey</code>, verify live.
        </div>
      `
    }
  ];

  renderScriptingOverview();
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

  // renderScriptingOverview();
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