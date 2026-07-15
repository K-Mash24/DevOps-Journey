// ============================================================
// PILLAR 5: Databases & Storage – FLASHCARDS & QUIZ
// 📌 SKELETON / TEMPLATE – Replace placeholder content only!
//    DO NOT change the logic unless you know what you're doing.
//    See comments below for key integration points.
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  const FLASHCARDS = [
    { term: "Database", answer: "Organized, persistent storage that provides structure, concurrency control, and powerful querying capabilities." },
    { term: "Primary Key", answer: "A column (or set of columns) that uniquely identifies each row in a table. Must be unique and never NULL." },
    { term: "Foreign Key", answer: "A column in one table that references the primary key of another table, establishing a relationship between tables." },
    { term: "SQL", answer: "Structured Query Language – a declarative language used to communicate with relational databases." },
    { term: "JOIN", answer: "A SQL operation that combines rows from two or more tables based on a related column (foreign key relationship)." },
    { term: "Normalization", answer: "The process of organizing tables to reduce redundancy and prevent data anomalies (update, insert, delete)." },
    { term: "1NF (First Normal Form)", answer: "Every column must hold atomic (indivisible) values – no lists or repeating groups." },
    { term: "2NF (Second Normal Form)", answer: "Must be in 1NF and every non-key column must depend on the whole primary key (no partial dependencies)." },
    { term: "3NF (Third Normal Form)", answer: "Must be in 2NF and no non-key column may depend on another non-key column (no transitive dependencies)." },
    { term: "Index", answer: "A separate data structure (like a B-Tree) that speeds up read queries by allowing the database to jump directly to rows, at the cost of slower writes and extra storage." },
    { term: "B-Tree", answer: "A balanced tree data structure used by most database indexes to achieve O(log n) lookups, enabling fast equality and range queries." },
    { term: "Transaction", answer: "A group of database operations treated as a single unit of work – either all succeed or none do (ACID)." },
    { term: "ACID", answer: "Atomicity, Consistency, Isolation, Durability – the four properties that guarantee reliable transaction processing." },
    { term: "Dirty Read", answer: "Reading uncommitted data from another transaction that may later be rolled back – prevented by isolation levels like Read Committed." },
    { term: "Isolation Level", answer: "Defines how much a transaction is isolated from concurrent transactions – from Read Uncommitted (weakest) to Serializable (strongest)." },
    { term: "Write-Ahead Log (WAL)", answer: "A durability mechanism where every change is written to a sequential log before being applied to data files, enabling crash recovery." },
    { term: "CAP Theorem", answer: "In a distributed system, you can only guarantee two of three: Consistency, Availability, and Partition Tolerance – and partitions are inevitable." },
    { term: "Eventual Consistency", answer: "A relaxed consistency model where writes eventually propagate to all nodes; reads may see stale data temporarily, but all replicas converge." },
    { term: "Cache Stampede", answer: "When a cached item expires and many simultaneous requests miss the cache, all hitting the database at once – also called the thundering herd problem." },
    { term: "SQL Injection", answer: "A vulnerability where untrusted input is concatenated into a SQL query, allowing attackers to alter query logic. Fixed by using parameterized queries." },
  ];

  // ----- Flashcard rendering (do not modify) -----
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

  // ============================================================
  // 2. OVERVIEW DATA
  // ============================================================

  const DATABASES_OVERVIEW = {
    purpose: {
      title: "📌 Purpose",
      description: [
        "Every application and automation tool eventually needs to store and retrieve data reliably — user records, configuration state, logs, metrics. This pillar builds first-principles understanding of how databases actually work: how data is organized, how it's queried, how consistency is guaranteed, and how performance is managed at scale.",
        "Studied independently of any specific vendor or cloud offering — the concepts transfer identically regardless of what you eventually run them on. By the end, you'll understand when to choose SQL vs NoSQL, how to design schemas that don't fall apart under load, and why databases behave the way they do."
      ],
    },
    objectives: [
      "Understand the difference between relational (SQL) and non-relational (NoSQL) databases, and when each fits",
      "Write core SQL: SELECT, INSERT, UPDATE, DELETE, and joins across related tables",
      "Understand normalization — organizing data to eliminate redundancy and inconsistency",
      "Understand indexing — how databases find data fast, and the tradeoffs involved",
      "Understand ACID properties and why they matter for reliable transactions",
      "Understand common NoSQL data models (key-value, document, column-family, graph) and the CAP theorem tradeoffs that motivate them",
      "Understand caching — reducing database load by storing frequently-accessed data closer to where it's needed",
      "Understand baseline database security principles (least privilege, injection risks)",
    ],
    keyConcepts: [
      {
        term: "Relational Databases & SQL Fundamentals",
        definition:
          "Tables, rows, columns, primary/foreign keys, SELECT/INSERT/UPDATE/DELETE — the foundation of SQL.",
      },
      {
        term: "Joins & Relationships",
        definition:
          "INNER JOIN, LEFT JOIN, one-to-many, many-to-many — connecting data across tables.",
      },
      {
        term: "Normalization",
        definition:
          "1NF/2NF/3NF — organizing data to eliminate redundancy and update anomalies.",
      },
      {
        term: "Indexing",
        definition:
          "How indexes speed up lookups (B-trees conceptually) and the write-cost tradeoff.",
      },
      {
        term: "ACID Transactions",
        definition:
          "Atomicity, Consistency, Isolation, Durability — concrete failure-scenario examples.",
      },
      {
        term: "NoSQL Data Models & CAP Theorem",
        definition:
          "Key-value, document, column-family, graph models — motivated directly by CAP theorem tradeoffs.",
      },
      {
        term: "Caching & Database Security Basics",
        definition:
          "Cache-aside, write-through, TTL/eviction, stale-data tradeoffs; least-privilege DB access and SQL injection awareness.",
      },
    ],
    stats: [
      { label: "Sections", value: "7/7 (100%)" },
      { label: "Topics covered", value: "40+" },
      { label: "Estimated time", value: "~10-12 hours" },
      { label: "Difficulty range", value: "🟡 Intermediate → 🟠 Advanced" },
      { label: "Status", value: "🚧 IN PROGRESS" },
    ],
    readmeLink:
      "https://github.com/K-Mash24/Great_Cheatsheets/tree/Master/saa-foundation/05-databases",
    readmeDetailLink:
      "https://github.com/K-Mash24/Great_Cheatsheets/blob/Master/saa-foundation/05-databases/README.md",
  };

  // ----- Overview rendering (do not modify) -----
  function renderDatabasesOverview() {
    const container = document.getElementById("js-overview-container");
    if (!container) return;

    const objectives = DATABASES_OVERVIEW.objectives
      .map((obj) => `<li>${obj}</li>`)
      .join("");
    const keyConcepts = DATABASES_OVERVIEW.keyConcepts
      .map(
        (item) => `
      <dt>${item.term}</dt>
      <dd>${item.definition}</dd>
    `,
      )
      .join("");
    const stats = DATABASES_OVERVIEW.stats
      .map(
        (stat) => `
      <tr><td><strong>${stat.label}</strong></td><td>${stat.value}</td></tr>
    `,
      )
      .join("");

    container.innerHTML = `
      <div class="overview-content" style="margin-bottom: 2rem;">
        <div class="info-box note" style="margin-bottom: 1.5rem;">
          <strong>${DATABASES_OVERVIEW.purpose.title}</strong>
          <p>${DATABASES_OVERVIEW.purpose.description[0]}</p>
          <p style="margin-top: 0.5rem;">${DATABASES_OVERVIEW.purpose.description[1]}</p>
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
          <p style="margin-top: 0.25rem;">All markdown notes are committed to <a href="${DATABASES_OVERVIEW.readmeLink}" target="_blank" style="color: var(--accent-secondary);">Great_Cheatsheets/saa-foundation/05-databases/</a>. The <a href="${DATABASES_OVERVIEW.readmeDetailLink}" target="_blank" style="color: var(--accent-secondary);">README.md</a> in that folder contains the complete pillar summary, learning objectives, and revision checklist.</p>
        </div>
      </div>
    `;
  }

  // ============================================================
  // SECTION 1 — Relational Databases & SQL Fundamentals
  // ============================================================
  const SECTION_1_ACCORDIONS = [
    {
      id: "db-what-is",
      title: "1.1 What is a Database, Really?",
      priority: false,
      icon: "🗄️",
      bodyHTML: `
        <p>A database is <strong>organized, persistent storage</strong> — a system that keeps data on disk (so it survives a restart) and lets you retrieve, add, change, or delete it in controlled ways.</p>

        <p>You could store data in a plain text file, but databases solve three problems text files don't:</p>
        <ol style="padding-left:1.2rem;margin:0.5rem 0;">
          <li><strong>Structure</strong> — enforced schema (a defined shape for the data), instead of freeform text.</li>
          <li><strong>Concurrency</strong> — many users/programs reading and writing at once, safely, without corrupting data.</li>
          <li><strong>Querying</strong> — asking complex questions ("all orders over $50 from Nairobi customers") without custom parsing code.</li>
        </ol>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Concrete example of the concurrency problem:</h4>
        <p>If two users update the same text file simultaneously, one update overwrites the other. If User A reads a balance, User B updates it, then User A writes back the old value, the update is lost. Databases solve this with <strong>transactions</strong> (covered in Section 5).</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Concrete example of the querying problem:</h4>
        <p>A CSV file with 10,000 customer rows. To find "all customers in Nairobi who joined after 2020", you'd need to write custom Python code to parse and filter. A database does the same with a single line of SQL.</p>
      `
    },
    {
      id: "db-relational-model",
      title: "1.2 The Relational Model",
      priority: false,
      icon: "📊",
      bodyHTML: `
        <p>A <strong>relational database</strong> organizes data into <strong>tables</strong> (aka relations):</p>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><strong>Row</strong> = one record (one instance of a thing).</li>
          <li><strong>Column</strong> = one attribute (a property every record has).</li>
          <li>Each column has an enforced <strong>data type</strong> (integer, text, date, boolean, etc.).</li>
        </ul>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Example — <code>customers</code> table:</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>customer_id</th><th>name</th><th>email</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Keith</td><td>keith@email.com</td></tr>
              <tr><td>2</td><td>Amara</td><td>amara@email.com</td></tr>
            </tbody>
          </table>
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Common SQLite data types:</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Type</th><th>Description</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td><code>INTEGER</code></td><td>Whole numbers</td><td><code>42</code>, <code>-5</code>, <code>0</code></td></tr>
              <tr><td><code>TEXT</code></td><td>Strings</td><td><code>"Keith"</code>, <code>"hello"</code></td></tr>
              <tr><td><code>REAL</code></td><td>Decimal numbers</td><td><code>3.14</code>, <code>-0.5</code></td></tr>
              <tr><td><code>BLOB</code></td><td>Binary data</td><td>Images, files</td></tr>
              <tr><td><code>NULL</code></td><td>Missing/unknown value</td><td><code>NULL</code></td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: "db-primary-key",
      title: "1.3 The Primary Key",
      priority: false,
      icon: "🔑",
      bodyHTML: `
        <p>A <strong>primary key (PK)</strong> is a column (or set of columns) that <strong>uniquely identifies each row</strong>. Rules:</p>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li>Must be unique across all rows.</li>
          <li>Can never be null (empty).</li>
        </ul>

        <div class="info-box warning">
          <strong>⚠️ Callout — Why not use "name" as a key?</strong>
          <ul style="margin-top:0.25rem;padding-left:1.2rem;">
            <li>Names collide (two people named Keith).</li>
            <li>Names can change (legal name change).</li>
            <li>Names can be blank.</li>
          </ul>
          <p style="margin-top:0.25rem;">A good primary key is <strong>stable, unique, and never changes</strong> — which is why systems typically use auto-incrementing integers or generated IDs instead of "real world" data.</p>
        </div>

        <div class="info-box note">
          <strong>📌 Foreign key teaser</strong> (covered in Section 2): A <strong>foreign key</strong> is a column that references the primary key of another table. It's how tables are connected — e.g., <code>orders.customer_id</code> references <code>customers.customer_id</code>.
        </div>
      `
    },
    {
      id: "db-sql-families",
      title: "1.4 SQL — Structured Query Language",
      priority: false,
      icon: "📝",
      bodyHTML: `
        <p><strong>SQL (Structured Query Language)</strong> is used to communicate with a relational database. It is <strong>declarative</strong> — you describe <em>what</em> you want, not <em>how</em> to retrieve it.</p>

        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Family</th><th>Purpose</th><th>Example commands</th></tr></thead>
            <tbody>
              <tr><td><strong>DDL</strong> — Data Definition Language</td><td>Define/change structure</td><td><code>CREATE TABLE</code>, <code>ALTER TABLE</code>, <code>DROP TABLE</code></td></tr>
              <tr><td><strong>DML</strong> — Data Manipulation Language</td><td>Change data</td><td><code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code></td></tr>
              <tr><td><strong>DQL</strong> — Data Query Language</td><td>Read data</td><td><code>SELECT</code></td></tr>
              <tr><td><strong>DCL</strong> — Data Control Language</td><td>Permissions</td><td><code>GRANT</code>, <code>REVOKE</code></td></tr>
            </tbody>
          </table>
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Brief examples:</h4>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><strong>DDL:</strong> <code>CREATE TABLE customers (id INTEGER, name TEXT);</code></li>
          <li><strong>DML:</strong> <code>INSERT INTO customers VALUES (1, 'Keith');</code></li>
          <li><strong>DQL:</strong> <code>SELECT * FROM customers;</code></li>
          <li><strong>DCL:</strong> <code>GRANT SELECT ON customers TO read_only_user;</code></li>
        </ul>
      `
    },
    {
      id: "db-create-table",
      title: "1.5 Creating a Table (DDL)",
      priority: false,
      icon: "📋",
      bodyHTML: `
        <div class="code-block"><pre>CREATE TABLE customers (
      customer_id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE
  );</pre></div>

        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><code>customer_id INTEGER PRIMARY KEY</code> — integer column, uniquely identifies each row.</li>
          <li><code>name TEXT NOT NULL</code> — text column, cannot be left empty.</li>
          <li><code>email TEXT UNIQUE</code> — text column, no two rows may share a value.</li>
        </ul>

        <div class="info-box warning">
          <strong>⚠️ Callout — NOT NULL vs UNIQUE vs PRIMARY KEY</strong>
          <ul style="margin-top:0.25rem;padding-left:1.2rem;">
            <li><code>NOT NULL</code> — value required, duplicates allowed.</li>
            <li><code>UNIQUE</code> — duplicates forbidden, empty/null generally allowed.</li>
            <li><code>PRIMARY KEY</code> — required <strong>and</strong> unique, combined. Every table should have exactly one.</li>
          </ul>
        </div>
      `
    },
    {
      id: "db-insert",
      title: "1.6 Inserting Data (DML)",
      priority: false,
      icon: "📥",
      bodyHTML: `
        <div class="code-block"><pre>INSERT INTO customers (customer_id, name, email)
  VALUES (1, 'Keith', 'keith@email.com');</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">If you insert without specifying columns:</h4>
        <div class="code-block"><pre>INSERT INTO customers VALUES (2, 'Amara', 'amara@email.com');</pre></div>
        <p>This works only if the order matches the table's column order exactly. <strong>Explicitly naming columns is safer and more readable.</strong></p>
      `
    },
    {
      id: "db-select",
      title: "1.7 Querying Data (DQL) — SELECT",
      priority: false,
      icon: "🔍",
      bodyHTML: `
        <div class="code-block"><pre>SELECT name, email
  FROM customers
  WHERE customer_id = 1;</pre></div>
        <p>Reads as: "Select the <code>name</code> and <code>email</code> columns, from the <code>customers</code> table, where <code>customer_id</code> equals 1."</p>

        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Clause</th><th>Purpose</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td><code>SELECT</code></td><td>which columns</td><td><code>SELECT name, email</code></td></tr>
              <tr><td><code>FROM</code></td><td>which table</td><td><code>FROM customers</code></td></tr>
              <tr><td><code>WHERE</code></td><td>filter rows</td><td><code>WHERE customer_id = 1</code></td></tr>
              <tr><td><code>ORDER BY</code></td><td>sort results</td><td><code>ORDER BY name ASC</code></td></tr>
              <tr><td><code>LIMIT</code></td><td>cap row count</td><td><code>LIMIT 10</code></td></tr>
            </tbody>
          </table>
        </div>

        <p><code>SELECT *</code> = all columns. Fine for exploring, but real applications should name only needed columns.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>ORDER BY</code> examples:</h4>
        <div class="code-block"><pre><span class="code-comment">-- Ascending (default)</span>
  SELECT * FROM customers ORDER BY name;

  <span class="code-comment">-- Descending</span>
  SELECT * FROM customers ORDER BY name DESC;

  <span class="code-comment">-- Multiple columns</span>
  SELECT * FROM customers ORDER BY name ASC, customer_id DESC;</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;"><code>LIMIT</code> example:</h4>
        <div class="code-block"><pre>SELECT * FROM customers LIMIT 5;  <span class="code-comment">-- only returns 5 rows</span></pre></div>
      `
    },
    {
      id: "db-hands-on",
      title: "🖥️ Hands-on Practice (Codespace Terminal)",
      priority: false,
      icon: "💻",
      bodyHTML: `
        <p>SQLite is a full relational database engine in a single file — no server setup needed.</p>

        <div class="code-block"><pre><span class="code-comment"># Check installation</span>
  sqlite3 --version

  <span class="code-comment"># Create and open a new database file</span>
  sqlite3 practice.db</pre></div>

        <p>Inside the <code>sqlite3</code> prompt:</p>
        <div class="code-block"><pre>CREATE TABLE customers (
      customer_id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE
  );

  INSERT INTO customers (customer_id, name, email)
  VALUES (1, 'Keith', 'keith@email.com');

  INSERT INTO customers (customer_id, name, email)
  VALUES (2, 'Amara', 'amara@email.com');

  SELECT * FROM customers;</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Progressive Exercises</h4>
        <ol style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li>Insert a third customer of your choice.</li>
          <li>Select only the <code>name</code> column for all customers.</li>
          <li>Select the customer where <code>customer_id = 2</code>.</li>
          <li>Try inserting a customer with a <code>NULL</code> name — what happens?</li>
          <li>Try inserting two customers with the same email — what happens?</li>
          <li>Use <code>ORDER BY name DESC</code> to sort customers in reverse alphabetical order.</li>
          <li>Use <code>LIMIT 1</code> to select just the first customer in the table.</li>
        </ol>

        <details style="margin-top:0.75rem;background:var(--bg-tertiary);border-radius:var(--radius-md);padding:0.75rem;">
          <summary style="cursor:pointer;font-weight:600;color:var(--text-primary);">Click to show answers</summary>
          <div class="code-block" style="margin-top:0.5rem;"><pre><span class="code-comment">-- 1</span>
  INSERT INTO customers (customer_id, name, email) VALUES (3, 'Zainab', 'zainab@email.com');

  <span class="code-comment">-- 2</span>
  SELECT name FROM customers;

  <span class="code-comment">-- 3</span>
  SELECT * FROM customers WHERE customer_id = 2;

  <span class="code-comment">-- 4 — ERROR: "NOT NULL constraint failed: customers.name"</span>
  INSERT INTO customers (customer_id, name, email) VALUES (4, NULL, 'test@email.com');

  <span class="code-comment">-- 5 — ERROR: "UNIQUE constraint failed: customers.email"</span>
  INSERT INTO customers (customer_id, name, email) VALUES (5, 'Test', 'keith@email.com');

  <span class="code-comment">-- 6</span>
  SELECT * FROM customers ORDER BY name DESC;

  <span class="code-comment">-- 7</span>
  SELECT * FROM customers LIMIT 1;</pre></div>
        </details>

        <p style="margin-top:0.75rem;">Exit with <code>.quit</code>.</p>
      `
    },
    {
      id: "db-devops-connection",
      title: "DevOps Connection",
      priority: false,
      icon: "⚙️",
      bodyHTML: `
        <p>Almost every deployed application — web apps, APIs, CI/CD metadata stores — sits on a relational database. Understanding schemas and constraints here directly prepares for:</p>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><strong>Schema migrations</strong> — tools like Alembic, Flyway, or Liquibase manage database changes alongside application code.</li>
          <li><strong>Application configuration</strong> — database connection strings, pooling settings, and timeouts are standard CI/CD variables.</li>
          <li><strong>Infrastructure as Code</strong> — Terraform and CloudFormation often provision managed databases (RDS, Cloud SQL) with schema definitions.</li>
        </ul>
        <div class="info-box note">
          <strong>📌 Next section:</strong> <a href="#" style="color:var(--accent-secondary);">Joins &amp; Relationships</a>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 2 — Joins & Relationships
  // ============================================================
  const SECTION_2_ACCORDIONS = [
    {
      id: "db-split-tables",
      title: "2.1 Why Split Data into Multiple Tables?",
      priority: false,
      icon: "📊",
      bodyHTML: `
        <p>A single flat table repeats data unnecessarily:</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>order_id</th><th>customer_name</th><th>customer_email</th><th>product</th><th>price</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Keith</td><td>keith@email.com</td><td>Laptop</td><td>900</td></tr>
              <tr><td>2</td><td>Keith</td><td>keith@email.com</td><td>Mouse</td><td>20</td></tr>
            </tbody>
          </table>
        </div>
        <p>"Keith" and his email repeat on every order — this is <strong>redundancy</strong>. Problems it causes:</p>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><strong>Update anomalies:</strong> changing Keith's email means updating every row; miss one and data becomes inconsistent.</li>
          <li><strong>Wasted storage.</strong></li>
        </ul>
        <p><strong>Fix:</strong> split into separate tables and <strong>link them</strong> using keys.</p>
      `
    },
    {
      id: "db-foreign-keys",
      title: "2.2 Foreign Keys",
      priority: false,
      icon: "🔗",
      bodyHTML: `
        <p>A <strong>foreign key (FK)</strong> is a column in one table that references the primary key of another table — representing "this row relates to that row" without duplicating data.</p>

        <div class="code-block"><pre>CREATE TABLE customers (
      customer_id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE
  );

  CREATE TABLE orders (
      order_id INTEGER PRIMARY KEY,
      customer_id INTEGER,
      product TEXT NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
  );</pre></div>

        <p><code>orders.customer_id</code> stores only a reference (the ID) back to <code>customers</code> — Keith's info lives in exactly one place.</p>

        <div class="info-box warning">
          <strong>⚠️ Callout — Referential integrity</strong>
          <p>A foreign key constraint prevents "orphaned" data: you cannot insert an order referencing a <code>customer_id</code> that doesn't exist in <code>customers</code>. The database rejects such inserts automatically (when enforcement is enabled — see SQLite gotcha below).</p>
        </div>
      `
    },
    {
      id: "db-relationship-types",
      title: "2.3 Relationship Types",
      priority: false,
      icon: "🔀",
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Type</th><th>Meaning</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td><strong>One-to-many</strong></td><td>One row in A relates to many rows in B</td><td>One customer → many orders</td></tr>
              <tr><td><strong>Many-to-many</strong></td><td>Many rows in A relate to many rows in B</td><td>Many students ↔ many courses</td></tr>
              <tr><td><strong>One-to-one</strong></td><td>One row in A relates to exactly one row in B</td><td>One person → one passport</td></tr>
            </tbody>
          </table>
        </div>

        <p><strong>Many-to-many</strong> relationships require a <strong>junction table</strong> (join table), since a foreign key column can only point to one row at a time.</p>

        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre-wrap;word-break:break-all;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
    ┌─────────────┐          ┌───────────────┐          ┌─────────────┐
    │  students   │          │  enrollments  │          │  courses    │
    ├─────────────┤          ├───────────────┤          ├─────────────┤
    │ student_id  │─────────►│ student_id    │◄─────────│ course_id   │
    │ name        │          │ course_id     │          │ title       │
    └─────────────┘          └───────────────┘          └─────────────┘
    </code>
          </pre>
        </div>

        <p><code>enrollments</code> holds two foreign keys — one to <code>students</code>, one to <code>courses</code>. Each row means "this student is enrolled in this course."</p>
      `
    },
    {
      id: "db-join-basics",
      title: "2.4 The JOIN — Combining Tables in a Query",
      priority: false,
      icon: "🔗",
      bodyHTML: `
        <p>A <code>JOIN</code> queries across tables as if they were one, matching foreign keys to primary keys.</p>

        <div class="code-block"><pre>SELECT customers.name, orders.product, orders.price
  FROM customers
  JOIN orders ON customers.customer_id = orders.customer_id;</pre></div>

        <p>Result:</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>name</th><th>product</th><th>price</th></tr></thead>
            <tbody>
              <tr><td>Keith</td><td>Laptop</td><td>900</td></tr>
              <tr><td>Keith</td><td>Mouse</td><td>20</td></tr>
            </tbody>
          </table>
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Joining multiple tables — you can chain joins:</h4>
        <div class="code-block"><pre>SELECT customers.name, orders.product, order_items.quantity
  FROM customers
  JOIN orders ON customers.customer_id = orders.customer_id
  JOIN order_items ON orders.order_id = order_items.order_id;</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Types of Joins</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Join type</th><th>Returns</th></tr></thead>
            <tbody>
              <tr><td><code>INNER JOIN</code> (aka <code>JOIN</code>)</td><td>Only rows that match in both tables</td></tr>
              <tr><td><code>LEFT JOIN</code></td><td>All rows from the left table, plus matches from the right (unmatched = NULL)</td></tr>
              <tr><td><code>RIGHT JOIN</code></td><td>All rows from the right table, plus matches from the left (unmatched = NULL)</td></tr>
              <tr><td><code>FULL OUTER JOIN</code></td><td>All rows from both tables, matched where possible</td></tr>
            </tbody>
          </table>
        </div>

        <p><strong>Concrete example — difference between <code>INNER</code> and <code>LEFT</code>:</strong></p>
        <p>If a customer has zero orders, <code>INNER JOIN</code> omits them entirely. <code>LEFT JOIN</code> still shows the customer, with <code>NULL</code> in the order columns:</p>

        <div class="code-block"><pre>SELECT customers.name, orders.product
  FROM customers
  LEFT JOIN orders ON customers.customer_id = orders.customer_id;</pre></div>

        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>name</th><th>product</th></tr></thead>
            <tbody>
              <tr><td>Keith</td><td>Laptop</td></tr>
              <tr><td>Keith</td><td>Mouse</td></tr>
              <tr><td>Amara</td><td>NULL</td></tr>
            </tbody>
          </table>
        </div>

        <div class="info-box warning">
          <strong>⚠️ Callout — SQLite and RIGHT/FULL JOIN</strong>
          <p>Older SQLite versions don't support <code>RIGHT JOIN</code> or <code>FULL OUTER JOIN</code> consistently.</p>
          <p><strong>Workaround:</strong> A <code>RIGHT JOIN</code> from A to B is equivalent to a <code>LEFT JOIN</code> from B to A — flip the table order.</p>
          <div class="code-block"><pre><span class="code-comment">-- Instead of:</span>
  SELECT * FROM A RIGHT JOIN B ON A.id = B.id;
  <span class="code-comment">-- Use:</span>
  SELECT * FROM B LEFT JOIN A ON A.id = B.id;</pre></div>
        </div>
      `
    },
    {
      id: "db-hands-on-joins",
      title: "🖥️ Hands-on Practice",
      priority: false,
      icon: "💻",
      bodyHTML: `
        <div class="code-block"><pre>sqlite3 practice.db</pre></div>

        <div class="code-block"><pre>CREATE TABLE orders (
      order_id INTEGER PRIMARY KEY,
      customer_id INTEGER,
      product TEXT NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
  );

  INSERT INTO orders (order_id, customer_id, product, price) VALUES (1, 1, 'Laptop', 900);
  INSERT INTO orders (order_id, customer_id, product, price) VALUES (2, 1, 'Mouse', 20);</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Progressive Exercises</h4>
        <ol style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li>Write an <code>INNER JOIN</code> to list every order alongside the customer's name.</li>
          <li>Write a <code>LEFT JOIN</code> from <code>customers</code> to <code>orders</code> so every customer shows, even those with no orders.</li>
          <li>Try inserting an order with <code>customer_id = 999</code> (a customer that doesn't exist) — what happens?</li>
          <li>Add a <code>WHERE</code> clause to your join query to show only orders over $50.</li>
          <li><strong>Combine clauses:</strong> Show all customers and their orders over $50, ordered by customer name.</li>
          <li>Design your own many-to-many junction table (e.g., books and authors).</li>
        </ol>

        <details style="margin-top:0.75rem;background:var(--bg-tertiary);border-radius:var(--radius-md);padding:0.75rem;">
          <summary style="cursor:pointer;font-weight:600;color:var(--text-primary);">Click to show answers</summary>
          <div class="code-block" style="margin-top:0.5rem;"><pre><span class="code-comment">-- 1</span>
  SELECT customers.name, orders.product, orders.price
  FROM customers
  JOIN orders ON customers.customer_id = orders.customer_id;

  <span class="code-comment">-- 2</span>
  SELECT customers.name, orders.product
  FROM customers
  LEFT JOIN orders ON customers.customer_id = orders.customer_id;

  <span class="code-comment">-- 3 — ERROR (if foreign keys enforced): "FOREIGN KEY constraint failed"</span>
  INSERT INTO orders (order_id, customer_id, product, price) VALUES (3, 999, 'Keyboard', 40);

  <span class="code-comment">-- 4</span>
  SELECT customers.name, orders.product, orders.price
  FROM customers
  JOIN orders ON customers.customer_id = orders.customer_id
  WHERE orders.price > 50;

  <span class="code-comment">-- 5</span>
  SELECT customers.name, orders.product, orders.price
  FROM customers
  LEFT JOIN orders ON customers.customer_id = orders.customer_id
  WHERE orders.price > 50 OR orders.price IS NULL
  ORDER BY customers.name;

  <span class="code-comment">-- 6 — example: books and authors (many-to-many)</span>
  CREATE TABLE authors (author_id INTEGER PRIMARY KEY, name TEXT);
  CREATE TABLE books (book_id INTEGER PRIMARY KEY, title TEXT);
  CREATE TABLE book_authors (
      book_id INTEGER,
      author_id INTEGER,
      FOREIGN KEY (book_id) REFERENCES books(book_id),
      FOREIGN KEY (author_id) REFERENCES authors(author_id)
  );</pre></div>
        </details>

        <div class="info-box warning" style="margin-top:0.75rem;">
          <strong>⚠️ Practical gotcha:</strong> SQLite does <strong>not</strong> enforce foreign keys by default. Run <code>PRAGMA foreign_keys = ON;</code> at the start of each session, or constraint violations will silently succeed instead of erroring.
        </div>
      `
    },
    {
      id: "db-devops-connection-joins",
      title: "DevOps Connection",
      priority: false,
      icon: "⚙️",
      bodyHTML: `
        <p>Most production bugs around "duplicate data" or "orphaned records" trace back to missing or misunderstood foreign key relationships. This mirrors how infrastructure-as-code tools (Terraform/Ansible) model relationships — e.g., a server referencing a security group by ID rather than duplicating its rules — the same "reference by key, not by copy" principle.</p>
        <div class="info-box note">
          <strong>📌 Next section:</strong> <a href="#" style="color:var(--accent-secondary);">Normalization</a>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 3 — Normalization
  // ============================================================
  const SECTION_3_ACCORDIONS = [
    {
      id: "db-what-is-normalization",
      title: "3.1 What is Normalization?",
      priority: false,
      icon: "📐",
      bodyHTML: `
        <p><strong>Normalization</strong> is the process of organizing tables to reduce redundancy and prevent data inconsistency. It's a series of formal rules ("normal forms") applied step by step, each fixing a specific class of problem.</p>
        <div class="info-box note">
          <strong>📌 Key insight:</strong> Normalization is about <strong>removing redundancy</strong> — ensuring each fact is stored in exactly one place, so updates only need to happen once.
        </div>
      `
    },
    {
      id: "db-anomalies",
      title: "3.2 The Problems Normalization Fixes: Anomalies",
      priority: false,
      icon: "⚠️",
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Anomaly</th><th>What happens</th></tr></thead>
            <tbody>
              <tr>
                <td><strong>Update anomaly</strong></td>
                <td>Same fact stored in multiple rows; updating one place but not others creates contradictions</td>
              </tr>
              <tr>
                <td><strong>Insert anomaly</strong></td>
                <td>Can't add a new fact without also having unrelated data available</td>
              </tr>
              <tr>
                <td><strong>Delete anomaly</strong></td>
                <td>Deleting one record accidentally destroys unrelated information</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Concrete example — all three anomalies:</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>order_id</th><th>customer_name</th><th>customer_email</th><th>product</th><th>product_price</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Keith</td><td>keith@email.com</td><td>Laptop</td><td>900</td></tr>
              <tr><td>2</td><td>Keith</td><td>keith@email.com</td><td>Mouse</td><td>20</td></tr>
            </tbody>
          </table>
        </div>
        <ul style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li><strong>Update anomaly:</strong> Change Keith's email → update 2 rows.</li>
          <li><strong>Insert anomaly:</strong> Can't add a new customer without an order.</li>
          <li><strong>Delete anomaly:</strong> Delete order 1 → lose Keith entirely.</li>
        </ul>
      `
    },
    {
      id: "db-1nf",
      title: "3.3 First Normal Form (1NF)",
      priority: false,
      icon: "1️⃣",
      bodyHTML: `
        <p><strong>Rule:</strong> Every column must hold a single, atomic (indivisible) value — no lists, no repeating groups.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Violation example:</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>order_id</th><th>customer</th><th>products</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Keith</td><td>Laptop, Mouse, Keyboard</td></tr>
            </tbody>
          </table>
        </div>
        <p>The <code>products</code> column crams multiple values into one field, breaking querying (can't easily ask "which orders contain a Mouse?").</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Fixed (1NF-compliant):</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>order_id</th><th>customer</th><th>product</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Keith</td><td>Laptop</td></tr>
              <tr><td>1</td><td>Keith</td><td>Mouse</td></tr>
              <tr><td>1</td><td>Keith</td><td>Keyboard</td></tr>
            </tbody>
          </table>
        </div>
        <p>Each row now holds one atomic value.</p>
      `
    },
    {
      id: "db-2nf",
      title: "3.4 Second Normal Form (2NF)",
      priority: false,
      icon: "2️⃣",
      bodyHTML: `
        <p><strong>Rule:</strong> Must already be in 1NF, AND every non-key column must depend on the <strong>whole</strong> primary key — not just part of it. This only matters with a <strong>composite primary key</strong> (a primary key made of more than one column).</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Violation example — composite key <code>(order_id, product_id)</code>:</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>order_id</th><th>product_id</th><th>product_name</th><th>quantity</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>101</td><td>Laptop</td><td>1</td></tr>
              <tr><td>1</td><td>102</td><td>Mouse</td><td>2</td></tr>
            </tbody>
          </table>
        </div>
        <p><code>product_name</code> depends only on <code>product_id</code>, not on the full composite key — a <strong>partial dependency</strong>, violating 2NF. If "Laptop" is renamed, every order row referencing product 101 must be updated.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Fixed (2NF-compliant):</h4>
        <div class="code-block"><pre>CREATE TABLE products (
      product_id INTEGER PRIMARY KEY,
      product_name TEXT
  );

  CREATE TABLE order_items (
      order_id INTEGER,
      product_id INTEGER,
      quantity INTEGER,
      PRIMARY KEY (order_id, product_id),
      FOREIGN KEY (product_id) REFERENCES products(product_id)
  );</pre></div>
        <p><code>product_name</code> now lives in exactly one place.</p>
      `
    },
    {
      id: "db-3nf",
      title: "3.5 Third Normal Form (3NF)",
      priority: false,
      icon: "3️⃣",
      bodyHTML: `
        <p><strong>Rule:</strong> Must already be in 2NF, AND no non-key column may depend on another non-key column (only on the primary key) — eliminating <strong>transitive dependencies</strong>.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Violation example:</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>customer_id</th><th>name</th><th>zip_code</th><th>city</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Keith</td><td>00100</td><td>Nairobi</td></tr>
            </tbody>
          </table>
        </div>
        <p><code>city</code> depends on <code>zip_code</code>, not directly on <code>customer_id</code> — a transitive dependency (customer_id → zip_code → city). If zip code changes but city isn't updated, a contradiction results.</p>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Fixed (3NF-compliant):</h4>
        <div class="code-block"><pre>CREATE TABLE zip_codes (
      zip_code TEXT PRIMARY KEY,
      city TEXT
  );

  CREATE TABLE customers (
      customer_id INTEGER PRIMARY KEY,
      name TEXT,
      zip_code TEXT,
      FOREIGN KEY (zip_code) REFERENCES zip_codes(zip_code)
  );</pre></div>

        <div class="info-box tip">
          <strong>💡 Pro tip:</strong> A good rule of thumb: <strong>every non-key column should describe the key, the whole key, and nothing but the key.</strong>
        </div>
      `
    },
    {
      id: "db-bcnf",
      title: "3.6 Boyce-Codd Normal Form (BCNF)",
      priority: false,
      icon: "🔬",
      bodyHTML: `
        <p><strong>Rule:</strong> A stricter version of 3NF. For every functional dependency (A → B, "A determines B"), A must be a <strong>candidate key</strong> (a column or set of columns that could serve as a primary key).</p>

        <p>3NF has a loophole BCNF closes: it's possible to satisfy 3NF while a non-candidate-key column still determines another column, if the determining column is part of an overlapping composite key. Rare in practice — most schema design stops at 3NF; BCNF is included for completeness and exam relevance.</p>

        <div class="info-box warning">
          <strong>⚠️ Callout — Normalization is a trade-off, not a law</strong>
          <p>Full normalization minimizes redundancy but increases joins needed per query. In high-read-volume systems, engineers sometimes deliberately <strong>denormalize</strong> (reintroduce redundancy) to improve read performance. Revisited in Section 7 (Caching).</p>
        </div>
      `
    },
    {
      id: "db-summary-table",
      title: "3.7 Summary Table",
      priority: false,
      icon: "📋",
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Normal Form</th><th>Fixes</th><th>Rule</th></tr></thead>
            <tbody>
              <tr><td><strong>1NF</strong></td><td>Multi-valued columns</td><td>Atomic values only</td></tr>
              <tr><td><strong>2NF</strong></td><td>Partial dependency</td><td>Non-key columns depend on the <em>whole</em> composite key</td></tr>
              <tr><td><strong>3NF</strong></td><td>Transitive dependency</td><td>Non-key columns depend <em>only</em> on the key, not on each other</td></tr>
              <tr><td><strong>BCNF</strong></td><td>Rare edge cases in 3NF</td><td>Every determinant must be a candidate key</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: "db-hands-on-normalization",
      title: "🖥️ Hands-on Practice",
      priority: false,
      icon: "💻",
      bodyHTML: `
        <div class="code-block"><pre>sqlite3 practice.db</pre></div>

        <p>Given this <strong>unnormalized</strong> table, normalize it yourself:</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>student_id</th><th>student_name</th><th>course_id</th><th>course_name</th><th>instructor</th><th>instructor_office</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Zainab</td><td>C1</td><td>Databases</td><td>Dr. Otieno</td><td>Room 4B</td></tr>
              <tr><td>1</td><td>Zainab</td><td>C2</td><td>Networking</td><td>Dr. Wanjiru</td><td>Room 2A</td></tr>
            </tbody>
          </table>
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Progressive Exercises</h4>
        <ol style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li>Identify the transitive dependency (hint: what does <code>instructor_office</code> depend on?).</li>
          <li>Split this into 3NF-compliant tables (students, courses, instructors, enrollments).</li>
          <li>Write the <code>CREATE TABLE</code> statements for your normalized design.</li>
          <li>Write a query using <code>JOIN</code>s that reconstructs the original flat view.</li>
          <li>Note one scenario where you'd deliberately denormalize this design.</li>
        </ol>

        <details style="margin-top:0.75rem;background:var(--bg-tertiary);border-radius:var(--radius-md);padding:0.75rem;">
          <summary style="cursor:pointer;font-weight:600;color:var(--text-primary);">Click to show answers</summary>
          <div class="code-block" style="margin-top:0.5rem;"><pre><span class="code-comment">-- 1</span>
  <span class="code-comment">-- instructor_office depends on instructor, not on student_id or course_id directly — transitive dependency.</span>

  <span class="code-comment">-- 2 & 3</span>
  CREATE TABLE instructors (
      instructor_name TEXT PRIMARY KEY,
      office TEXT
  );

  CREATE TABLE courses (
      course_id TEXT PRIMARY KEY,
      course_name TEXT,
      instructor_name TEXT,
      FOREIGN KEY (instructor_name) REFERENCES instructors(instructor_name)
  );

  CREATE TABLE students (
      student_id INTEGER PRIMARY KEY,
      student_name TEXT
  );

  CREATE TABLE enrollments (
      student_id INTEGER,
      course_id TEXT,
      PRIMARY KEY (student_id, course_id),
      FOREIGN KEY (student_id) REFERENCES students(student_id),
      FOREIGN KEY (course_id) REFERENCES courses(course_id)
  );

  <span class="code-comment">-- 4</span>
  SELECT students.student_name, courses.course_name, instructors.instructor_name, instructors.office
  FROM enrollments
  JOIN students ON enrollments.student_id = students.student_id
  JOIN courses ON enrollments.course_id = courses.course_id
  JOIN instructors ON courses.instructor_name = instructors.instructor_name;

  <span class="code-comment">-- 5</span>
  <span class="code-comment">-- If read millions of times per second on a dashboard and rarely changed, denormalizing</span>
  <span class="code-comment">-- (storing instructor + office directly on the course row) avoids an extra join and speeds</span>
  <span class="code-comment">-- up reads, at the cost of needing multi-row updates if an instructor changes office.</span></pre></div>
        </details>
      `
    },
    {
      id: "db-devops-connection-normalization",
      title: "DevOps Connection",
      priority: false,
      icon: "⚙️",
      bodyHTML: `
        <p>Poorly normalized production databases are a common source of data drift bugs — e.g., a config value stored in two places falling out of sync. This mirrors the IaC principle of a single source of truth: one Terraform state file, not scattered manual changes.</p>
        <div class="info-box note">
          <strong>📌 Next section:</strong> <a href="#" style="color:var(--accent-secondary);">Indexing</a>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 4 — Indexing
  // ============================================================
  const SECTION_4_ACCORDIONS = [
    {
      id: "db-full-table-scan",
      title: "4.1 The Problem: Searching Without an Index",
      priority: false,
      icon: "🔍",
      bodyHTML: `
        <p>Running <code>SELECT * FROM customers WHERE email = 'keith@email.com';</code> requires the database to find matching rows. Without help, it performs a <strong>full table scan</strong> — checking every row one by one.</p>
        <p>For 10 rows, that's instant. For 50 million rows, that's an enormous amount of work per query.</p>
        <div class="info-box note">
          <strong>📌 Key insight:</strong> A full table scan checks <strong>every single row</strong> in the table. The time grows linearly with table size — O(n).
        </div>
      `
    },
    {
      id: "db-what-is-index",
      title: "4.2 What is an Index?",
      priority: false,
      icon: "📑",
      bodyHTML: `
        <p>An <strong>index</strong> is a separate data structure letting the database jump straight to needed rows instead of scanning everything — like a textbook's index: instead of reading every page to find "normalization," you look it up and jump straight to page 214.</p>

        <div class="code-block"><pre>CREATE INDEX idx_customers_email ON customers(email);</pre></div>

        <p>Now <code>WHERE email = '...'</code> queries can jump directly to matching rows.</p>

        <div class="info-box warning">
          <strong>⚠️ Callout — Primary keys are already indexed</strong>
          <p>Most database engines automatically index the primary key. That's why looking up a row by ID is fast by default — no manual indexing needed.</p>
        </div>
      `
    },
    {
      id: "db-btree",
      title: "4.3 How Does an Index Actually Work? (B-Trees)",
      priority: false,
      icon: "🌳",
      bodyHTML: `
        <p>The most common index structure is a <strong>B-Tree</strong> (balanced tree) — a decision tree that narrows down where a value could be, level by level, instead of checking every row.</p>

        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.7rem;white-space:pre;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
                      ┌─────────────────┐
                      │   Root: M-Z?    │
                      └────────┬────────┘
                            │
                ┌────────────┼────────────┐
                │            │            │
                ▼            ▼            ▼
          ┌─────────┐  ┌─────────┐  ┌─────────┐
          │  A-F    │  │  G-L    │  │  M-R    │
          └─────────┘  └─────────┘  └─────────┘
                │            │            │
                ▼            ▼            ▼
          ┌─────────┐  ┌─────────┐  ┌─────────┐
          │ Amara   │  │ Keith   │  │ Mary    │
          │ Ben     │  │ Laura   │  │ Otieno  │
          └─────────┘  └─────────┘  └─────────┘
            </code>
          </pre>
        </div>

        <p>Instead of <strong>O(n)</strong> (linear time, growing proportionally with table size), a B-Tree lookup only traverses the tree's height — <strong>O(log n)</strong> (logarithmic time).</p>

        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Rows</th><th>Full scan (worst case)</th><th>B-Tree index (approx)</th></tr></thead>
            <tbody>
              <tr><td>1,000</td><td>1,000</td><td>~10</td></tr>
              <tr><td>1,000,000</td><td>1,000,000</td><td>~20</td></tr>
              <tr><td>1,000,000,000</td><td>1,000,000,000</td><td>~30</td></tr>
            </tbody>
          </table>
        </div>

        <p>This is why indexing matters enormously at scale, even though it's invisible at small scale.</p>
      `
    },
    {
      id: "db-index-tradeoff",
      title: "4.4 The Trade-Off: Indexes Aren't Free",
      priority: false,
      icon: "⚖️",
      bodyHTML: `
        <p>Indexes speed up reads (<code>SELECT</code>) but slow down writes (<code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>) — every row change requires the index structure to be updated too. Indexes also consume extra disk space.</p>

        <div class="code-block" style="background:transparent;border:none;padding:0;margin:0.5rem 0;">
          <pre style="color:var(--text-primary);font-size:0.75rem;white-space:pre;background:var(--bg-tertiary);padding:1rem;border-radius:var(--radius-md);">
            <code>
      ┌─────────────────┐
      │  More indexes   │
      └────────┬────────┘
              │
      ┌────────┼────────────────────────────┐
      │        │                            │
      ▼        ▼                            ▼
    ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
    │  Faster SELECT  │  │  Slower INSERT  │  │  More disk      │
    │  / WHERE        │  │  / UPDATE       │  │  space used     │
    │                 │  │  / DELETE       │  │                 │
    └─────────────────┘  └─────────────────┘  └─────────────────┘
            </code>
          </pre>
        </div>

        <div class="info-box warning">
          <strong>⚠️ Callout — Don't index everything</strong>
          <p>A common beginner mistake is indexing every column "just in case." In write-heavy systems (logging tables, high-frequency transaction tables), excessive indexing noticeably slows write throughput. Index columns frequently used in <code>WHERE</code>, <code>JOIN</code>, or <code>ORDER BY</code> clauses — not columns rarely queried.</p>
        </div>
      `
    },
    {
      id: "db-index-types",
      title: "4.5 Types of Indexes",
      priority: false,
      icon: "📊",
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Index type</th><th>Best for</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td><strong>B-Tree</strong> (default)</td><td>Equality and range queries (<code>=</code>, <code><</code>, <code>></code>, <code>BETWEEN</code>)</td><td>Most common, general-purpose</td></tr>
              <tr><td><strong>Hash index</strong></td><td>Exact equality only (<code>=</code>)</td><td>Faster for equality, useless for ranges</td></tr>
              <tr><td><strong>Composite index</strong></td><td>Queries filtering on multiple columns together</td><td>Column order matters</td></tr>
              <tr><td><strong>Unique index</strong></td><td>Enforcing uniqueness (auto-created by <code>UNIQUE</code>/<code>PRIMARY KEY</code>)</td><td>Also speeds up lookups</td></tr>
            </tbody>
          </table>
        </div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Composite index example:</h4>
        <div class="code-block"><pre>CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);</pre></div>

        <p>Helps queries filtering by <code>customer_id</code> alone, or <code>customer_id</code> AND <code>order_date</code> together — but <strong>not</strong> queries filtering by <code>order_date</code> alone.</p>

        <div class="info-box tip">
          <strong>💡 The phone book analogy:</strong> A phone book sorted by last name then first name — great for "find Otieno," useless for "find everyone named Keith" regardless of last name. The first column in a composite index is the most important.
        </div>
      `
    },
    {
      id: "db-explain",
      title: "4.6 Reading a Query Plan",
      priority: false,
      icon: "📋",
      bodyHTML: `
        <p>Most databases support asking "how would you actually run this query?" via <code>EXPLAIN</code>:</p>

        <div class="code-block"><pre>EXPLAIN QUERY PLAN
  SELECT * FROM customers WHERE email = 'keith@email.com';</pre></div>

        <p>Reveals whether the database used an index (<code>SEARCH ... USING INDEX</code>) or fell back to a full scan (<code>SCAN customers</code>) — the primary tool for diagnosing "why is this query slow?" in production systems.</p>

        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Plan output</th><th>What it means</th></tr></thead>
            <tbody>
              <tr><td><code>SCAN customers</code></td><td>Full table scan — slow</td></tr>
              <tr><td><code>SEARCH ... USING INDEX</code></td><td>Index lookup — fast</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: "db-hands-on-indexing",
      title: "🖥️ Hands-on Practice",
      priority: false,
      icon: "💻",
      bodyHTML: `
        <div class="code-block"><pre>sqlite3 practice.db</pre></div>

        <div class="code-block"><pre><span class="code-comment">-- Check current query plan (likely a full scan without an index)</span>
  EXPLAIN QUERY PLAN
  SELECT * FROM customers WHERE email = 'keith@email.com';

  <span class="code-comment">-- Create an index</span>
  CREATE INDEX idx_customers_email ON customers(email);

  <span class="code-comment">-- Re-check the plan</span>
  EXPLAIN QUERY PLAN
  SELECT * FROM customers WHERE email = 'keith@email.com';</pre></div>

        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Progressive Exercises</h4>
        <ol style="padding-left:1.2rem;margin:0.25rem 0 0.5rem 0;">
          <li>Compare <code>EXPLAIN QUERY PLAN</code> output before and after creating the index — what changed?</li>
          <li>Create an index on <code>orders.customer_id</code> and check if it changes the plan for a join query.</li>
          <li>Create a composite index on <code>orders(customer_id, price)</code>.</li>
          <li>Try <code>EXPLAIN QUERY PLAN</code> on a query filtering only by <code>price</code> — does the composite index get used? Why or why not?</li>
          <li>Drop an index with <code>DROP INDEX idx_customers_email;</code> and confirm the plan reverts to a full scan.</li>
        </ol>

        <details style="margin-top:0.75rem;background:var(--bg-tertiary);border-radius:var(--radius-md);padding:0.75rem;">
          <summary style="cursor:pointer;font-weight:600;color:var(--text-primary);">Click to show answers</summary>
          <div class="code-block" style="margin-top:0.5rem;"><pre><span class="code-comment">-- 1</span>
  <span class="code-comment">-- Before: "SCAN customers" (full table scan)</span>
  <span class="code-comment">-- After: "SEARCH customers USING INDEX idx_customers_email (email=?)"</span>

  <span class="code-comment">-- 2</span>
  CREATE INDEX idx_orders_customer ON orders(customer_id);
  EXPLAIN QUERY PLAN
  SELECT * FROM orders JOIN customers ON orders.customer_id = customers.customer_id;

  <span class="code-comment">-- 3</span>
  CREATE INDEX idx_orders_customer_price ON orders(customer_id, price);

  <span class="code-comment">-- 4</span>
  EXPLAIN QUERY PLAN
  SELECT * FROM orders WHERE price > 50;
  <span class="code-comment">-- Likely still a full scan — the composite index is ordered by customer_id first,</span>
  <span class="code-comment">-- so it can't efficiently filter on price alone (like a phone book: can't find</span>
  <span class="code-comment">-- "everyone named Keith" from a last-name-first index).</span>

  <span class="code-comment">-- 5</span>
  DROP INDEX idx_customers_email;
  EXPLAIN QUERY PLAN
  SELECT * FROM customers WHERE email = 'keith@email.com';
  <span class="code-comment">-- Reverts to "SCAN customers"</span></pre></div>
        </details>
      `
    },
    {
      id: "db-devops-connection-indexing",
      title: "DevOps Connection",
      priority: false,
      icon: "⚙️",
      bodyHTML: `
        <p>Slow database queries are among the most common root causes of production incidents and are typically the first thing investigated during performance troubleshooting. Understanding indexing is essential groundwork before working with database monitoring dashboards later — you need to know what "slow query" alerts are actually telling you.</p>
        <div class="info-box note">
          <strong>📌 Next section:</strong> <a href="#" style="color:var(--accent-secondary);">ACID Transactions</a>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 5 — ACID Transactions 
  // ============================================================
  const SECTION_5_ACCORDIONS = [
    // ---------- 5.1 ----------
    {
      id: "acid-what-is-transaction",
      title: "5.1 What is a Transaction?",
      priority: false,
      icon: "💳",
      bodyHTML: `
        <p>A <strong>transaction</strong> is a group of one or more database operations treated as a single, indivisible unit of work. Either <strong>all</strong> operations succeed, or <strong>none</strong> do — no in‑between state.</p>

        <p><strong>Classic example — bank transfer:</strong></p>
        <div class="code-block"><pre><span class="code-comment">-- Withdraw from Keith</span>
  UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
  <span class="code-comment">-- Deposit to Amara</span>
  UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;</pre></div>

        <p>If power fails after the first <code>UPDATE</code> but before the second, without transactions Keith loses $100 and Amara never receives it — money vanishes. A transaction guarantees this can't happen.</p>
      `
    },

    // ---------- 5.2 ACID Overview ----------
    {
      id: "acid-overview",
      title: "5.2 ACID — The Four Guarantees",
      priority: false,
      icon: "🧩",
      bodyHTML: `
        <p><strong>ACID</strong> describes the four properties a reliable transaction system must guarantee.</p>

        <div class="code-block">
          <pre class="ascii-art">
      ACID
      ├── Atomicity     – all or nothing
      ├── Consistency   – valid state only
      ├── Isolation     – transactions don't interfere
      └── Durability    – survives crashes
          </pre>
        </div>

        <p>Each property addresses a distinct failure mode — we'll explore them one by one.</p>
      `
    },

    // ---------- 5.2.1 ----------
    {
      id: "acid-atomicity",
      title: "5.2.1 Atomicity",
      priority: false,
      icon: "⚛️",
      bodyHTML: `
        <p><strong>All operations in a transaction succeed together, or none do.</strong> If any statement fails, the entire transaction rolls back (undoes) as if it never happened.</p>

        <div class="code-block"><pre>BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
  <span class="code-comment">-- something fails here, e.g. a constraint violation</span>
  ROLLBACK;  <span class="code-comment">-- undoes the withdrawal above too</span></pre></div>

        <div class="info-box note">
          <strong>📌 Key insight</strong>
          <p>Atomicity ensures that partial failures don't leave the database in an inconsistent state. Either the whole transaction is applied, or nothing is applied.</p>
        </div>
      `
    },

    // ---------- 5.2.2 ----------
    {
      id: "acid-consistency",
      title: "5.2.2 Consistency",
      priority: false,
      icon: "✅",
      bodyHTML: `
        <p>A transaction can only move the database from one valid state to another valid state — it must not violate any defined rules (constraints, foreign keys, data types). A transaction that would break a rule is rejected entirely.</p>

        <p><strong>Example:</strong> With a <code>CHECK (balance >= 0)</code> constraint, a transaction pushing a balance negative is rejected — the database never enters an invalid state, even temporarily.</p>

        <div class="info-box warning">
          <strong>💡 Nuance</strong>
          <p>In most databases, a constraint violation fails the <em>statement</em>, not the entire transaction. You can choose to <code>ROLLBACK</code> or continue with other operations after handling the error. However, the key point remains — the invalid state is never committed.</p>
        </div>
      `
    },

    // ---------- 5.2.3 ----------
    {
      id: "acid-isolation",
      title: "5.2.3 Isolation",
      priority: false,
      icon: "🔒",
      bodyHTML: `
        <p><strong>Concurrent transactions shouldn't interfere with each other</strong>, even running simultaneously. Each transaction behaves as if it's the only one running.</p>

        <p><strong>Problem this solves — the "dirty read":</strong></p>

        <div class="code-block">
          <pre class="ascii-art">
      T1 (Transaction 1)          DB          T2 (Transaction 2)
            │                                │
            ├── UPDATE balance = -100 ──────►│
            │     (uncommitted!)             │
            │                                ├── READ balance ──────┐
            │                                │     (sees -100!)    │
            │                                │◄─────────────────────┘
            ├── ROLLBACK ──────────────────►│
            │     (undo the change)          │
            │                                │
            ▼                                ▼
      T2 acted on data that never really existed.
          </pre>
        </div>

        <p>Without isolation, Transaction 2 could read a value Transaction 1 later rolls back — a <strong>dirty read</strong>.</p>

        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Isolation Level</th><th>Prevents</th><th>Anomalies Still Possible</th></tr></thead>
            <tbody>
              <tr><td><code>READ UNCOMMITTED</code></td><td>Nothing</td><td>Dirty reads, non‑repeatable reads, phantom reads</td></tr>
              <tr><td><code>READ COMMITTED</code></td><td>Dirty reads</td><td>Non‑repeatable reads, phantom reads</td></tr>
              <tr><td><code>REPEATABLE READ</code></td><td>Dirty reads, non‑repeatable reads</td><td>Phantom reads</td></tr>
              <tr><td><code>SERIALIZABLE</code></td><td>Everything</td><td>None (true serializability)</td></tr>
            </tbody>
          </table>
        </div>

        <div class="info-box warning">
          <strong>⚠️ Callout — Isolation is a trade‑off</strong>
          <p>Stricter isolation (Serializable) is safest but slowest, requiring more aggressive locking. Weaker isolation (Read Committed) is faster but risks certain anomalies. Most production systems default to Read Committed as a practical middle ground.</p>
        </div>

        <div class="info-box note">
          <strong>📘 Deep Dive — MVCC (Multi‑Version Concurrency Control)</strong>
          <p>Many modern databases (PostgreSQL, MySQL/InnoDB, Oracle) implement isolation using MVCC rather than simple locking. Instead of blocking readers for writers, MVCC maintains multiple versions of each row. Readers see a consistent snapshot of the database at the moment their transaction began, without waiting for writers to release locks.</p>
        </div>

        <div class="info-box warning">
          <strong>⚠️ Advanced Note — Serializable Nuance</strong>
          <p>Some databases advertise "Serializable" isolation but implement <strong>Serializable Snapshot Isolation (SSI)</strong>, which isn't true serializability in all edge cases (e.g., write skew). PostgreSQL's SSI catches most anomalies but isn't perfect. True serializability typically requires significant performance overhead — another reason many production systems stick with Read Committed or Repeatable Read.</p>
        </div>
      `
    },

    // ---------- 5.2.4 ----------
    {
      id: "acid-durability",
      title: "5.2.4 Durability",
      priority: false,
      icon: "💾",
      bodyHTML: `
        <p><strong>Once a transaction is committed, it survives even if the database crashes immediately after.</strong> The change is written to permanent, non‑volatile storage before the commit is confirmed.</p>

        <p><strong>How it works — Write‑Ahead Logging (WAL):</strong></p>
        <ul class="compact-list">
          <li>Every change is first written to a sequential, append‑only log file on durable storage <em>before</em> being applied to the main data files.</li>
          <li>On crash, the WAL is replayed to reconstruct any committed changes not yet flushed to data files.</li>
          <li>Writes to the log are sequential (fast) rather than random I/O to data files (slow).</li>
          <li>The WAL also stores undo information, enabling rollback of uncommitted transactions.</li>
        </ul>

        <div class="code-block"><pre><span class="code-comment">-- Operation flow</span>
  1. Transaction begins
  2. Change is written to WAL (durable)
  3. Change is applied to in‑memory buffer
  4. On COMMIT, WAL is flushed to disk (fsync)
  5. Acknowledgment sent to client
  6. Later, dirty pages are written to data files (checkpoint)</pre></div>

        <p>If a crash occurs between steps 4 and 6, the WAL ensures the committed change is recovered. If a crash occurs before step 4, the transaction is simply replayed from the last checkpoint — no partial changes.</p>
      `
    },

    // ---------- 5.3 ----------
    {
      id: "acid-sql-syntax",
      title: "5.3 SQL Transaction Syntax",
      priority: false,
      icon: "📝",
      bodyHTML: `
        <div class="code-block"><pre>BEGIN TRANSACTION;

  UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;

  COMMIT;   <span class="code-comment">-- makes changes permanent</span>
  <span class="code-comment">-- or:</span>
  ROLLBACK; <span class="code-comment">-- undoes everything since BEGIN TRANSACTION</span></pre></div>

        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Command</th><th>Effect</th></tr></thead>
            <tbody>
              <tr><td><code>BEGIN TRANSACTION</code></td><td>Start a new transaction</td></tr>
              <tr><td><code>COMMIT</code></td><td>Make all changes in the transaction permanent</td></tr>
              <tr><td><code>ROLLBACK</code></td><td>Undo all changes since the transaction began</td></tr>
            </tbody>
          </table>
        </div>

        <div class="info-box note">
          <strong>ℹ️ Note</strong>
          <p>SQLite accepts <code>BEGIN TRANSACTION</code> or simply <code>BEGIN</code>. PostgreSQL accepts both. MySQL requires <code>START TRANSACTION</code> or <code>BEGIN</code> (but not <code>BEGIN TRANSACTION</code> in all contexts). Always check your database's syntax.</p>
        </div>
      `
    },

    // ---------- 5.4 (NOW CLEAN) ----------
    {
      id: "acid-hands-on",
      title: "🖥️ 5.4 Hands‑on Practice",
      priority: false,
      icon: "💻",
      bodyHTML: `
        <div class="code-block"><pre>sqlite3 practice.db</pre></div>

        <div class="code-block"><pre>CREATE TABLE accounts (
      account_id INTEGER PRIMARY KEY,
      owner TEXT,
      balance REAL CHECK (balance >= 0)
  );

  INSERT INTO accounts (account_id, owner, balance) VALUES (1, 'Keith', 500);
  INSERT INTO accounts (account_id, owner, balance) VALUES (2, 'Amara', 200);</pre></div>

        <h4 class="sub-heading">Progressive Exercises</h4>
        <ol class="compact-list ordered">
          <li>Run a transaction that transfers $100 from Keith to Amara, then <code>COMMIT</code> it. Verify both balances.</li>
          <li>Start a transaction that would push Keith's balance negative (e.g., withdraw $10,000) — what happens, given the <code>CHECK</code> constraint?</li>
          <li>Start a transaction, make a change, then <code>ROLLBACK</code> instead of <code>COMMIT</code> — verify the change did NOT persist.</li>
          <li>Open two separate <code>sqlite3</code> sessions on <code>practice.db</code> at once. In session A, <code>BEGIN TRANSACTION</code> and update a balance without committing. In session B, try to read or update the same row — what happens?</li>
          <li>Explain in your own words why <code>CHECK (balance >= 0)</code> is a <strong>Consistency</strong> guarantee, not an Atomicity one.</li>
        </ol>

        <details class="details-box">
          <summary>Click to show answers</summary>
          <div class="code-block" style="margin-top:0.5rem;"><pre><span class="code-comment">-- 1</span>
  BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
  COMMIT;
  SELECT * FROM accounts;

  <span class="code-comment">-- 2</span>
  BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 10000 WHERE account_id = 1;
  <span class="code-comment">-- ERROR: CHECK constraint failed: balance >= 0</span>
  <span class="code-comment">-- The statement fails; you can ROLLBACK or continue with other operations.</span>
  <span class="code-comment">-- If you COMMIT after handling the error, no change was made to Keith's balance.</span>
  <span class="code-comment">-- The invalid state is never committed.</span>

  <span class="code-comment">-- 3</span>
  BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance + 50 WHERE account_id = 1;
  ROLLBACK;
  SELECT * FROM accounts;
  <span class="code-comment">-- balance is unchanged, as if the UPDATE never happened</span>

  <span class="code-comment">-- 4</span>
  <span class="code-comment">-- Session A: BEGIN TRANSACTION; UPDATE accounts SET balance = balance - 50 WHERE account_id = 1;</span>
  <span class="code-comment">-- Session B: attempts to UPDATE the same row typically gets "database is locked" in SQLite.</span>
  <span class="code-comment">-- In PostgreSQL/MySQL, the write would block until Session A commits or rolls back.</span>
  <span class="code-comment">-- Reads in PostgreSQL/MySQL would see the old value (MVCC snapshot).</span>
  <span class="code-comment">-- SQLite uses database-level locking for writes — Session B gets "database is locked" immediately.</span>
  <span class="code-comment">-- Other databases (PostgreSQL, MySQL/InnoDB) use row-level locking + MVCC:</span>
  <span class="code-comment">--   • Session B can READ the old version (no lock).</span>
  <span class="code-comment">--   • Session B WRITES block until Session A commits or rolls back.</span>

  <span class="code-comment">-- 5</span>
  <span class="code-comment">-- CHECK (balance >= 0) is a Consistency guarantee because it defines a RULE about what counts</span>
  <span class="code-comment">-- as a valid database state (no negative balances). Atomicity is about whether the whole</span>
  <span class="code-comment">-- transaction succeeds or fails together — Consistency is about whether the resulting state</span>
  <span class="code-comment">-- obeys the rules at all. The CHECK constraint causes the statement (and typically the</span>
  <span class="code-comment">-- transaction) to be rejected, and Atomicity ensures that if you ROLLBACK, everything is undone.</span>
  <span class="code-comment">-- In other words: Consistency defines what "valid" means; Atomicity ensures that a failed</span>
  <span class="code-comment">-- attempt to reach that valid state doesn't leave behind a half‑done mess.</span></pre></div>
        </details>

        <div class="info-box note mt">
          <strong>📘 Context — Locking behavior varies by database</strong>
          <p>SQLite uses <strong>database‑level locking</strong> for write operations — Session B will get <code>database is locked</code> immediately. Other databases behave differently:</p>
          <ul>
            <li><strong>PostgreSQL</strong> uses row‑level locking with MVCC — Session B can <em>read</em> the old version but will <em>block</em> on writes until Session A commits or rolls back.</li>
            <li><strong>MySQL/InnoDB</strong> uses row‑level locking — similar to PostgreSQL, reads see the old version, writes block.</li>
          </ul>
          <p>This behavior is why understanding your database's locking model matters for production performance tuning.</p>
        </div>
      `
    },

    // ---------- 5.5 ----------
    {
      id: "acid-devops",
      title: "5.5 DevOps Connection",
      priority: false,
      icon: "⚙️",
      bodyHTML: `
        <p>Understanding transactions and isolation levels is essential when diagnosing <strong>"why did this deploy corrupt data"</strong> or <strong>"why do two services see different values for the same record"</strong> incidents.</p>

        <p><strong>Common real‑world scenarios:</strong></p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Problem</th><th>Root Cause</th><th>Solution</th></tr></thead>
            <tbody>
              <tr><td>Application timeouts under load</td><td>Long‑running transactions holding locks; queries blocked by uncommitted writes</td><td>Shorten transactions; use appropriate isolation level; index for faster queries</td></tr>
              <tr><td>"Lost update" bugs</td><td>Two transactions read the same value, modify it, and write back — second overwrites first without seeing the change</td><td>Use <code>SELECT ... FOR UPDATE</code>; increase isolation to Repeatable Read; use optimistic locking</td></tr>
              <tr><td>Stale reads in microservices</td><td>Service A reads a value, Service B updates it, Service A reads again and sees old value (non‑repeatable read)</td><td>Use Read Committed or higher; consider eventual consistency trade‑offs</td></tr>
              <tr><td>Data corruption after restore</td><td>Backup taken during an open transaction</td><td>Use <code>pg_dump</code> with <code>--no-sync</code> flags or ensure transaction isolation; always use consistent snapshots</td></tr>
            </tbody>
          </table>
        </div>

        <p><strong>On‑call troubleshooting checklist:</strong></p>
        <ul class="compact-list">
          <li>Check for long‑running transactions (<code>SELECT * FROM pg_stat_activity</code> in PostgreSQL)</li>
          <li>Identify blocking locks (<code>pg_locks</code> in PostgreSQL; <code>SHOW ENGINE INNODB STATUS</code> in MySQL)</li>
          <li>Consider lowering isolation level if strict consistency isn't required</li>
          <li>Add retry logic with exponential backoff for transaction conflicts</li>
          <li>Monitor WAL disk usage — a full WAL can halt all writes</li>
        </ul>

        <div class="info-box note">
          <strong>📌 Next section:</strong> <a href="#">Section 6 — NoSQL Data Models &amp; CAP Theorem</a>
        </div>
      `
    }
  ];
  
  // ============================================================
  // SECTION 6 — NoSQL Data Models & CAP Theorem 
  // ============================================================
  const SECTION_6_ACCORDIONS = [
    // ---------- 6.1 ----------
    {
      id: "nosql-why",
      title: "6.1 Why Does NoSQL Exist?",
      priority: false,
      icon: "🤔",
      bodyHTML: `
        <p>Everything so far assumes a <strong>relational</strong> model: fixed schemas, tables, joins, ACID guarantees. This works extremely well for structured data with clear relationships, but has limits:</p>
        <ul class="compact-list">
          <li>Rigid schemas make storing wildly variable data (e.g., user profiles with different optional fields) painful.</li>
          <li>Joins across many tables get slow at massive scale, across many machines.</li>
          <li>Some workloads don't need strict consistency — they need to handle massive, distributed write volume instead.</li>
        </ul>
        <p><strong>NoSQL</strong> ("Not Only SQL") is an umbrella term for database models that intentionally relax some relational rules to gain flexibility or scale. It's several different data models, each suited to different problems.</p>

        <div class="info-box tip">
          <strong>🧩 Polyglot Persistence</strong>
          <p>Modern applications rarely use a single database. A typical e‑commerce platform might use:</p>
          <ul>
            <li><strong>Relational (PostgreSQL)</strong> for orders and inventory (ACID required)</li>
            <li><strong>Key‑Value (Redis)</strong> for session state and caching</li>
            <li><strong>Document (MongoDB)</strong> for product catalogs (variable attributes)</li>
            <li><strong>Search engine (Elasticsearch)</strong> for full‑text product search</li>
          </ul>
          <p>This "right tool for the right job" approach is called <strong>Polyglot Persistence</strong> – a first‑class architectural consideration in cloud‑native systems.</p>
        </div>
      `
    },

    // ---------- 6.2.1 ----------
    {
      id: "nosql-kv",
      title: "6.2.1 Key‑Value Stores",
      priority: false,
      icon: "🗝️",
      bodyHTML: `
        <p>The simplest model: every piece of data is a <strong>key</strong> paired with an opaque <strong>value</strong>. The database doesn't know or care what's inside the value.</p>
        <div class="code-block"><pre>key: "session:abc123"
  value: "{user_id: 42, expires: 1720000000}"</pre></div>
        <p>Like a giant dictionary/hashmap. Extremely fast for simple lookups, but can't query <em>inside</em> the value without extra tooling.</p>
        <p><strong>Real‑world examples:</strong> Redis, Amazon DynamoDB (simplest usage), Memcached.</p>
      `
    },

    // ---------- 6.2.2 ----------
    {
      id: "nosql-doc",
      title: "6.2.2 Document Stores",
      priority: false,
      icon: "📄",
      bodyHTML: `
        <p>Stores data as <strong>documents</strong> — typically JSON‑like structures — where each document can have a different shape, unlike a rigid SQL table.</p>
        <div class="code-block"><pre>{
    "customer_id": 1,
    "name": "Keith",
    "interests": ["devops", "hiking"],
    "address": {
      "city": "Nairobi",
      "zip": "00100"
    }
  }</pre></div>
        <p>This nests structure directly (array, nested object) — something a 1NF‑compliant relational table isn't supposed to do. Different documents in the same collection can have entirely different fields.</p>
        <p><strong>Real‑world examples:</strong> MongoDB, Couchbase, Amazon DocumentDB.</p>
      `
    },

    // ---------- 6.2.3 ----------
    {
      id: "nosql-column",
      title: "6.2.3 Column‑Family Stores",
      priority: false,
      icon: "📊",
      bodyHTML: `
        <p>Optimized for storing and reading <strong>huge volumes of data organized by column rather than by row</strong> — the opposite orientation from a normal relational table.</p>

        <p><strong>Why this matters – concrete example:</strong></p>
        <p>Suppose you have a table with 1 billion rows and you run <code>SELECT AVG(score) FROM sensor_readings</code>.</p>
        <ul class="compact-list">
          <li><strong>Row‑oriented (SQL):</strong> the database must scan every row, read the entire row from disk, extract the <code>score</code> column, and discard the rest. Massive I/O.</li>
          <li><strong>Column‑oriented:</strong> the <code>score</code> values are stored together contiguously as a single block. The database reads only that compressed block and computes the average directly – orders of magnitude faster.</li>
        </ul>

        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Storage type</th><th>Data layout on disk</th><th>Best for</th></tr></thead>
            <tbody>
              <tr><td><strong>Row‑oriented</strong></td><td><code>[row1: id, name, score], [row2: id, name, score]</code></td><td>OLTP (many row‑level writes/reads)</td></tr>
              <tr><td><strong>Column‑oriented</strong></td><td><code>[id: 1,2,3...], [name: ...], [score: 95,88,76...]</code></td><td>OLAP / analytics (aggregations on specific columns)</td></tr>
            </tbody>
          </table>
        </div>

        <p><strong>Real‑world examples:</strong> Apache Cassandra, HBase, Google Bigtable.</p>
      `
    },

    // ---------- 6.2.4 – ASCII diagram now in .code-block ----------
    {
      id: "nosql-graph",
      title: "6.2.4 Graph Databases",
      priority: false,
      icon: "🕸️",
      bodyHTML: `
        <p>Optimized for data fundamentally about <strong>relationships/connections</strong> — social networks, recommendation engines, fraud detection. Stores data as <strong>nodes</strong> (things) and <strong>edges</strong> (relationships), built for fast traversal rather than tabular queries.</p>

        <div class="code-block">
          <pre class="ascii-art">
      (Keith) --FRIENDS_WITH--> (Amara)
      (Amara) --FRIENDS_WITH--> (Zainab)
      (Keith) --WORKS_AT--> (Company X)
          </pre>
        </div>

        <p>Relational databases can model this via junction tables, but traversing many "hops" (friends of friends of friends) gets slow with repeated joins. Graph databases make deep traversal fast.</p>
        <p><strong>Real‑world examples:</strong> Neo4j, Amazon Neptune.</p>
      `
    },

    // ---------- 6.3 ----------
    {
      id: "nosql-comparison",
      title: "6.3 Summary — Choosing a Model",
      priority: false,
      icon: "📋",
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Model</th><th>Good for</th><th>Schema flexibility</th><th>Query complexity</th><th>Real‑world example</th></tr></thead>
            <tbody>
              <tr><td><strong>Relational</strong></td><td>Structured data, complex relationships, strong consistency needs</td><td>Rigid</td><td>High (SQL/joins)</td><td>Banking, inventory systems</td></tr>
              <tr><td><strong>Key‑Value</strong></td><td>Simple, extremely fast lookups</td><td>Opaque (app‑side)</td><td>Very low</td><td>Session storage, caching</td></tr>
              <tr><td><strong>Document</strong></td><td>Flexible/nested data, rapid schema evolution</td><td>High</td><td>Medium</td><td>User profiles, content management</td></tr>
              <tr><td><strong>Column‑family</strong></td><td>Massive scale, analytics on specific columns</td><td>Moderate</td><td>Low (key‑based)</td><td>Time‑series data, IoT sensor data</td></tr>
              <tr><td><strong>Graph</strong></td><td>Deeply connected/relationship‑heavy data</td><td>Flexible</td><td>High (traversal)</td><td>Social networks, fraud detection</td></tr>
            </tbody>
          </table>
        </div>

        <div class="info-box warning">
          <strong>⚠️ Callout — NoSQL usually trades consistency for scale</strong>
          <p>Most NoSQL systems relax ACID guarantees (especially strict consistency) in exchange for easier distribution across many machines and handling huge write volumes. A deliberate design trade‑off, formalised by the CAP theorem below.</p>
        </div>
      `
    },

    // ---------- 6.4 – CAP diagrams now in .code-block ----------
    {
      id: "nosql-cap",
      title: "6.4 The CAP Theorem",
      priority: false,
      icon: "🔺",
      bodyHTML: `
        <p>When a database is <strong>distributed</strong> — spread across multiple machines/nodes, often in different physical locations — it's mathematically impossible to simultaneously guarantee all three:</p>

        <div class="code-block">
          <pre class="ascii-art">
      CAP Theorem: pick 2 of 3
      ├── Consistency    – all nodes see the same data
      ├── Availability   – every request gets a response
      └── Partition Tolerance – system survives network splits
          </pre>
        </div>

        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Property</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><strong>C</strong>onsistency</td><td>Every read receives the most recent write (or an error) — all nodes see the same data at the same time</td></tr>
              <tr><td><strong>A</strong>vailability</td><td>Every request receives a response (success or failure), even if some nodes are down</td></tr>
              <tr><td><strong>P</strong>artition Tolerance</td><td>The system keeps working even if network communication between nodes breaks down (a "partition")</td></tr>
            </tbody>
          </table>
        </div>

        <p><strong>Key insight:</strong> network partitions <strong>will</strong> happen (cables get cut, data centers lose connectivity, packets drop) — partition tolerance isn't really optional. In practice, the real choice is between <strong>Consistency</strong> and <strong>Availability</strong> <em>when a partition occurs</em>.</p>

        <div class="code-block">
          <pre class="ascii-art">
      Network partition occurs between Node A and Node B
                          │
          ┌───────────────┴───────────────┐
          │                               │
      Choose Consistency            Choose Availability
      (CP system)                    (AP system)
          │                               │
      Reject some requests         Answer all requests,
      until nodes can sync          even with stale data
          </pre>
        </div>

        <ul class="compact-list">
          <li><strong>CP (Consistency + Partition Tolerance):</strong> During a partition, the system refuses to respond rather than risk stale data.<br />
          <em>Real‑world examples:</em> MongoDB (with <code>{w: "majority"}</code> write concern), HBase, Redis (with <code>WAIT</code> / synchronous replication), ZooKeeper.</li>
          <li><strong>AP (Availability + Partition Tolerance):</strong> During a partition, the system keeps responding to every request, even if nodes temporarily disagree.<br />
          <em>Real‑world examples:</em> Cassandra, Amazon DynamoDB (default settings), CouchDB, Riak.</li>
        </ul>

        <div class="info-box warning">
          <strong>⚠️ Callout — "Choose 2 of 3" is a simplification</strong>
          <p>C and A aren't perfectly binary during normal operation (no partition) — most systems provide both when healthy. CAP describes what you sacrifice <em>specifically during a network partition</em>. Useful mental model, but the nuance matters for real design discussions.</p>
        </div>
      `
    },

    // ---------- 6.4.1 ----------
    {
      id: "nosql-eventual",
      title: "6.4.1 Eventual Consistency",
      priority: false,
      icon: "⏳",
      bodyHTML: `
        <p>A common middle ground for AP systems: <strong>eventual consistency</strong> — writes propagate to all nodes given enough time (no partition), so if writes stop, all replicas will <em>eventually</em> converge. A relaxed guarantee compared to strict consistency's "every read sees the latest write, immediately."</p>
        <div class="info-box note">
          <strong>📌 Key takeaway</strong>
          <p>Eventual consistency is a deliberate design choice for systems that prioritise availability and low latency over absolute freshness – common in social feeds, analytics, and caching layers.</p>
        </div>
      `
    },

    // ---------- 6.5 ----------
    {
      id: "nosql-hands-on",
      title: "🖥️ 6.5 Hands‑On / Conceptual Practice",
      priority: false,
      icon: "💻",
      bodyHTML: `
        <p>No local install needed — these exercises are conceptual/design‑based, since experiencing multi‑node partition behaviour needs a real distributed cluster (touched later in Kubernetes/Docker Compose, Phase 2).</p>

        <h4 class="sub-heading">Progressive Exercises</h4>
        <ol class="compact-list ordered">
          <li>You're designing a shopping cart session store needing blazing‑fast reads/writes with no complex queries. Which NoSQL model fits best, and why?</li>
          <li>You're building a "recommended friends" feature for a social app. Which model fits best, and why?</li>
          <li>A banking system absolutely cannot show a stale account balance. Would you lean CP or AP? Why?</li>
          <li>A social media "like count" can be slightly out of date without real harm. Would you lean CP or AP? Why?</li>
          <li>Explain in your own words why partition tolerance isn't really a "choice" in real distributed systems.</li>
          <li><strong>[NEW]</strong> Name one real‑world scenario where you'd deliberately use <em>two different</em> NoSQL models in the same application. What are they and why?</li>
        </ol>

        <details>
          <summary>Click to show answers</summary>
          <div class="details-answer-body">
            <p><strong>1.</strong> <strong>Key‑Value store.</strong> Session data is a simple lookup by session ID, no need to query inside the value, and speed matters most.</p>

            <p><strong>2.</strong> <strong>Graph database.</strong> "Recommended friends" requires traversing relationships (friends‑of‑friends), which graph databases are purpose‑built for.</p>

            <p><strong>3.</strong> <strong>CP.</strong> Showing a stale balance could mean someone spends money they don't have, or a transaction processes against outdated data — correctness matters more than always getting an instant response.</p>

            <p><strong>4.</strong> <strong>AP.</strong> A slightly stale like count is a harmless cosmetic issue; keeping the app responsive for every user matters more than perfect real‑time accuracy.</p>

            <p><strong>5.</strong> <strong>Networks are physical and fallible</strong> – cables get cut, hardware fails, data centres lose connectivity, packets get dropped or delayed. A truly distributed system cannot guarantee this never happens, so "not tolerating partitions" effectively means the system fails outright whenever a partition occurs – not a realistic design choice. The real design decision is what to do <em>when</em> (not if) a partition happens.</p>

            <p><strong>6.</strong> <strong>[NEW]</strong> A typical e‑commerce app: use <strong>Relational (PostgreSQL)</strong> for orders and inventory (ACID required), <strong>Key‑Value (Redis)</strong> for session caching (low latency), and <strong>Document (MongoDB)</strong> for product catalogues (because products have variable attributes like size, colour, specs that change frequently). Each database serves the workload it's best at.</p>
          </div>
        </details>
      `
    },

    // ---------- 6.6 ----------
    {
      id: "nosql-devops",
      title: "6.6 DevOps Connection",
      priority: false,
      icon: "⚙️",
      bodyHTML: `
        <p>Choosing between SQL and NoSQL, understanding CAP trade‑offs, and practising <strong>Polyglot Persistence</strong> directly informs decisions about database services in cloud infrastructure – and how applications are architected for resilience during network issues. These are foundational before touching distributed systems tooling like Kubernetes in Phase 2.</p>

        <div class="info-box note">
          <strong>📌 Next section:</strong> <a href="#">Section 7 — Caching &amp; Database Security Basics</a>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 7 — Caching & Database Security Basics
  // ============================================================
  const SECTION_7_ACCORDIONS = [
    // ---------- 7.1 ----------
    {
      id: "cache-why",
      title: "7.1 Why Caching Exists",
      priority: false,
      icon: "⚡",
      bodyHTML: `
        <p>Even with good indexing, hitting the database for every read is expensive at scale — disk I/O, network round-trips, and query execution all add latency. <strong>Caching</strong> means storing a copy of frequently-accessed data somewhere faster to retrieve from, so repeated requests don't go all the way back to the database.</p>

        <div class="code-block">
          <pre class="ascii-art">
      App                    Cache                    DB
      │                       │                       │
      ├── Request data ──────►│                       │
      │                       │                       │
      │  ┌───────────────────────────────────────────┐
      │  │           Cache HIT (fast)               │
      │  └───────────────────────────────────────────┘
      │◄── Return cached data ────│                   │
      │                       │                       │
      │  ┌───────────────────────────────────────────┐
      │  │           Cache MISS (slow)              │
      │  └───────────────────────────────────────────┘
      │                       ├── Fetch from DB ────►│
      │                       │◄── Return data ──────┤
      │◄── Return data (store in cache) ─────────────┤
          </pre>
        </div>

        <p>A <strong>cache hit</strong> means data was found in the cache (fast). A <strong>cache miss</strong> means it wasn't, so the system falls back to the database (slow), then usually stores the result in the cache for next time.</p>
      `
    },

    // ---------- 7.2 ----------
    {
      id: "cache-where",
      title: "7.2 Where Caching Lives",
      priority: false,
      icon: "📍",
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Layer</th><th>Example</th><th>Typical use</th></tr></thead>
            <tbody>
              <tr><td><strong>In-memory application cache</strong></td><td>A Python dictionary, local variable</td><td>Very short-lived, single-process data</td></tr>
              <tr><td><strong>Dedicated cache server</strong></td><td>Redis, Memcached</td><td>Shared cache across multiple application servers</td></tr>
              <tr><td><strong>Database query cache</strong></td><td>Built into some database engines</td><td>Caches results of repeated identical queries</td></tr>
              <tr><td><strong>CDN (Content Delivery Network)</strong></td><td>Cloudflare, Fastly</td><td>Caches static content close to users geographically</td></tr>
            </tbody>
          </table>
        </div>

        <p>Redis (from Section 6, as a key-value store) is a common dedicated caching layer precisely because key-value lookups are extremely fast — the same property that makes it useful as a session store makes it useful as a cache.</p>

        <div class="info-box note">
          <strong>📘 Redis persistence note</strong>
          <p>When Redis is used as a <em>cache</em>, data loss on restart is acceptable. But when used as a <em>primary store</em> (e.g., session state that must survive restarts), Redis offers two persistence options:</p>
          <ul>
            <li><strong>RDB (snapshots):</strong> periodic point-in-time dumps (fast recovery, potential data loss).</li>
            <li><strong>AOF (append-only log):</strong> every write is logged (slower, but minimal data loss).</li>
          </ul>
          <p>Choose based on whether you need Redis as a cache or a primary data store.</p>
        </div>
      `
    },

    // ---------- 7.3 ----------
    {
      id: "cache-invalidation",
      title: "7.3 Cache Invalidation — The Hard Part",
      priority: false,
      icon: "🔄",
      bodyHTML: `
        <p>Famous saying: <em>"There are only two hard things in computer science: cache invalidation and naming things."</em></p>

        <p><strong>Cache invalidation</strong> is knowing <em>when</em> cached data is stale and needs refreshing or removal. If a customer's balance changes in the database but the cache still holds the old value, anyone reading from the cache gets wrong data.</p>

        <p><strong>Common strategies:</strong></p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Strategy</th><th>How it works</th><th>Trade-off</th></tr></thead>
            <tbody>
              <tr><td><strong>TTL (Time To Live)</strong></td><td>Cached data automatically expires after N seconds</td><td>Simple, but data can be stale for up to the TTL window</td></tr>
              <tr><td><strong>Write-through</strong></td><td>Every write updates both cache and database at the same time</td><td>Cache always fresh, but writes are slower (two writes instead of one)</td></tr>
              <tr><td><strong>Write-behind</strong></td><td>Write goes to cache first, database updated asynchronously later</td><td>Fast writes, but risk of data loss if cache fails before syncing</td></tr>
              <tr><td><strong>Cache-aside (lazy loading)</strong></td><td>Application checks cache first; on a miss, reads DB and populates cache</td><td>Most common pattern; simple, but first request after invalidation is always slow</td></tr>
            </tbody>
          </table>
        </div>

        <div class="code-block">
          <pre class="ascii-art">
      Cache invalidation strategies
      ├── TTL: auto-expire after N seconds
      ├── Write-through: update cache + DB together
      ├── Write-behind: cache first, DB later
      └── Cache-aside: check cache, fall back to DB on miss
          </pre>
        </div>

        <h4 class="sub-heading">7.3.1 The Cache Stampede Problem (Thundering Herd)</h4>
        <p>A <strong>cache stampede</strong> (or <strong>thundering herd</strong>) occurs when a cached item expires and <em>many</em> simultaneous requests all miss the cache and hit the database at once — overwhelming it.</p>

        <p><strong>Scenario:</strong></p>
        <ul class="compact-list">
          <li>A popular item (e.g., "trending products") has a TTL of 60 seconds.</li>
          <li>At 60 seconds, it expires from the cache.</li>
          <li>Hundreds of requests arrive simultaneously asking for that item.</li>
          <li>All miss the cache. All hit the database.</li>
          <li>The database is overwhelmed — potentially causing a cascading failure.</li>
        </ul>

        <p><strong>Solutions:</strong></p>
        <ul class="compact-list">
          <li><strong>Stale-while-revalidate:</strong> serve the stale cached value while asynchronously refreshing in the background (popular in CDNs).</li>
          <li><strong>Mutex locking:</strong> only one request is allowed to refresh the cache; others wait for it to complete.</li>
          <li><strong>Jittered TTL:</strong> add a small random offset to expiry times so they don't all expire at exactly the same moment.</li>
        </ul>

        <div class="code-block"><pre><span class="code-comment"># Pseudocode — mutex locking approach</span>
  def get_trending_products():
      cache_key = "trending_products"
      cached = cache.get(cache_key)
      if cached is not None:
          return cached

      <span class="code-comment"># Only one request acquires the lock and refreshes</span>
      if cache.acquire_lock(cache_key, ttl=5):
          try:
              data = db.query("SELECT * FROM products ORDER BY sales DESC LIMIT 10")
              cache.set(cache_key, data, ttl=60)
          finally:
              cache.release_lock(cache_key)
      else:
          time.sleep(0.1)
          return get_trending_products()

      return data</pre></div>

        <div class="info-box warning">
          <strong>⚠️ Callout — Caching reintroduces the redundancy problem from Section 3</strong>
          <p>Caching is deliberate denormalization/duplication for speed — the exact trade-off flagged in Section 3.6. You intentionally accept the risk of two copies of the truth (cache and database) becoming inconsistent, in exchange for speed. This is why cache invalidation strategy matters so much — it's how that risk is managed.</p>
        </div>
      `
    },

    // ---------- 7.4 ----------
    {
      id: "db-security",
      title: "7.4 Database Security Basics",
      priority: false,
      icon: "🔐",
      bodyHTML: `
        <p>A shift from performance to protection. Three foundational principles:</p>

        <h4 class="sub-heading">7.4.1 Least Privilege</h4>
        <p>Every application, service, or user connecting to a database should have <strong>only the permissions it actually needs</strong> — nothing more.</p>

        <div class="code-block"><pre>CREATE USER app_readonly WITH PASSWORD 'securepassword';
  GRANT SELECT ON customers TO app_readonly;
  <span class="code-comment">-- app_readonly can read customer data, but cannot INSERT, UPDATE, DELETE, or DROP tables</span></pre></div>

        <p>If that account's credentials leak, the damage is limited to what it's allowed to do — a read-only reporting service should never hold <code>DROP TABLE</code> permission.</p>

        <div class="info-box note">
          <strong>📘 Simulating least privilege in SQLite (conceptual)</strong>
          <p>SQLite doesn't have user-level permissions like PostgreSQL or MySQL. Instead, you enforce least privilege at the <em>application layer</em>:</p>
          <div class="code-block"><pre><span class="code-comment"># Read-only connection for analytics dashboard</span>
  readonly_conn = sqlite3.connect("file:practice.db?mode=ro")

  <span class="code-comment"># Read-write connection for order processing backend</span>
  rw_conn = sqlite3.connect("practice.db")</pre></div>
          <p>The analytics code uses <code>readonly_conn</code> — it literally cannot write to the database because the connection is opened in read-only mode.</p>
        </div>

        <h4 class="sub-heading">7.4.2 SQL Injection</h4>
        <p><strong>SQL injection</strong> is an attack where untrusted input is inserted directly into a SQL query string, letting an attacker manipulate the query's logic.</p>

        <p><strong>Vulnerable code (conceptual):</strong></p>
        <div class="code-block"><pre>query = "SELECT * FROM customers WHERE email = '" + user_input + "'"</pre></div>

        <p>If <code>user_input</code> is <code>' OR '1'='1</code>, the resulting query becomes:</p>
        <div class="code-block"><pre>SELECT * FROM customers WHERE email = '' OR '1'='1'</pre></div>

        <p>Since <code>'1'='1'</code> is always true, this returns <strong>every row in the table</strong> — bypassing the intended filter entirely. Worse payloads can delete data or extract unauthorized information.</p>

        <p><strong>The fix — parameterized queries (prepared statements):</strong> input is passed separately as a parameter, and the database driver handles it safely without ever treating it as executable SQL syntax.</p>

        <div class="code-block"><pre><span class="code-comment"># Vulnerable</span>
  cursor.execute(f"SELECT * FROM customers WHERE email = '{user_input}'")

  <span class="code-comment"># Safe - parameterized query</span>
  cursor.execute("SELECT * FROM customers WHERE email = ?", (user_input,))</pre></div>

        <div class="code-block">
          <pre class="ascii-art">
      User input
          │
          ├── String concatenation ──► VULNERABLE: input can alter query logic
          │
          └── Parameterized placeholder ──► SAFE: input always treated as data, never as code
          </pre>
        </div>

        <div class="info-box warning">
          <strong>⚠️ Callout — Not just a "web security" topic</strong>
          <p>SQL injection is one of the most persistent vulnerabilities in software history and appears in the OWASP Top 10. It matters here because it's fundamentally a <em>database interaction</em> problem — it happens at the exact point where application code builds SQL.</p>
        </div>

        <h4 class="sub-heading">7.4.3 Encryption</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Type</th><th>Protects against</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td><strong>Encryption at rest</strong></td><td>Someone stealing the physical disk/backup files</td><td>Database files encrypted on disk</td></tr>
              <tr><td><strong>Encryption in transit</strong></td><td>Someone intercepting network traffic between app and database</td><td>TLS/SSL connection between application and database server</td></tr>
            </tbody>
          </table>
        </div>

        <p>Both matter — encrypting the disk does nothing to protect data traveling over the network, and vice versa.</p>
      `
    },

    // ---------- 7.5 ----------
    {
      id: "cache-hands-on",
      title: "🖥️ 7.5 Hands-On Practice",
      priority: false,
      icon: "💻",
      bodyHTML: `
        <div class="code-block"><pre>sqlite3 practice.db</pre></div>

        <p>SQLite doesn't have user-level permissions like a client-server database, so the least-privilege exercise is conceptual. The SQL injection exercise is fully hands-on with Python.</p>

        <h4 class="sub-heading">Progressive Exercises</h4>
        <ol class="compact-list ordered">
          <li>Write out what permissions a read-only analytics dashboard should have on the <code>orders</code> table, versus the application backend that processes new orders.</li>
          <li>In Python, write a vulnerable query using an f-string against <code>practice.db</code>, and demonstrate an injection payload that returns all rows regardless of the WHERE clause.</li>
          <li>Fix the query from #2 using a parameterized query with <code>?</code> placeholders.</li>
          <li>Design a cache-aside strategy (pseudocode) for a <code>GET /customer/{id}</code> API endpoint — describe cache hit and cache miss behavior.</li>
          <li>Explain why TTL-based caching might be a bad fit for account balance data, but a good fit for a "trending products" list.</li>
          <li><strong>[NEW]</strong> Describe the thundering herd problem in your own words, and name two mitigation strategies.</li>
        </ol>

        <details class="details-box">
          <summary>Click to show answers</summary>
          <div class="details-answer-body">
            <div class="code-block"><pre><span class="code-comment">-- 1</span>
  <span class="code-comment">-- Analytics dashboard: SELECT only on orders (read-only, reporting).</span>
  <span class="code-comment">-- Order-processing backend: SELECT, INSERT, UPDATE on orders (needs to create and modify</span>
  <span class="code-comment">-- orders), but should NOT have DROP or ALTER — it doesn't need to change table structure.</span></pre></div>

            <div class="code-block"><pre><span class="code-comment"># 2 — vulnerable</span>
  import sqlite3
  conn = sqlite3.connect("practice.db")
  cursor = conn.cursor()

  user_input = "' OR '1'='1"
  query = f"SELECT * FROM customers WHERE email = '{user_input}'"
  cursor.execute(query)
  print(cursor.fetchall())  <span class="code-comment"># returns ALL customers, not just one matching email</span>

  <span class="code-comment"># 3 — fixed</span>
  user_input = "keith@email.com"
  cursor.execute("SELECT * FROM customers WHERE email = ?", (user_input,))
  print(cursor.fetchall())</pre></div>

            <div class="code-block"><pre><span class="code-comment">-- 4</span>
  <span class="code-comment">-- GET /customer/{id}:</span>
  <span class="code-comment">-- def get_customer(id):</span>
  <span class="code-comment">--     cache_key = f"customer:{id}"</span>
  <span class="code-comment">--     cached = cache.get(cache_key)</span>
  <span class="code-comment">--     if cached is not None:</span>
  <span class="code-comment">--         return cached  # Cache HIT: fast path</span>
  <span class="code-comment">--     # Cache MISS: fetch from DB</span>
  <span class="code-comment">--     customer = db.query("SELECT * FROM customers WHERE id = ?", (id,))</span>
  <span class="code-comment">--     cache.set(cache_key, customer, ttl=300)  # Store for 5 minutes</span>
  <span class="code-comment">--     return customer</span>

  <span class="code-comment">-- 5</span>
  <span class="code-comment">-- Account balances must always be accurate — a stale balance could mislead someone into</span>
  <span class="code-comment">-- overspending or cause a support incident. TTL-based caching accepts staleness for a</span>
  <span class="code-comment">-- window of time, dangerous for financial correctness. A "trending products" list doesn't</span>
  <span class="code-comment">-- need to be perfectly real-time — being a few minutes stale causes no real harm, so TTL</span>
  <span class="code-comment">-- caching is a great fit (and much cheaper than recalculating "trending" constantly).</span>

  <span class="code-comment">-- 6 [NEW]</span>
  <span class="code-comment">-- The thundering herd problem happens when a popular cache key expires and many</span>
  <span class="code-comment">-- simultaneous requests all miss the cache and hit the database at once, overwhelming it.</span>
  <span class="code-comment">-- Two mitigation strategies:</span>
  <span class="code-comment">--   1. Mutex locking: only one request refreshes the cache; others wait.</span>
  <span class="code-comment">--   2. Stale-while-revalidate: serve the stale value while asynchronously refreshing.</span></pre></div>
          </div>
        </details>
      `
    },

    // ---------- 7.6 ----------
    {
      id: "cache-devops",
      title: "7.6 DevOps Connection",
      priority: false,
      icon: "⚙️",
      bodyHTML: `
        <p>Caching strategy directly affects infrastructure decisions (provisioning a Redis cluster, memory sizing) and is a frequent topic in cost/performance trade-off discussions. Understanding the <strong>thundering herd problem</strong> helps diagnose production incidents where a sudden cache expiry causes a database load spike.</p>

        <p>Database security basics — least privilege, parameterized queries, encryption — are exactly what's audited during security reviews and compliance checks, connecting directly back to Pillar 3 (Security) principles already covered.</p>

        <div class="info-box note">
          <strong>🎉 Pillar 5 — Databases &amp; Storage: COMPLETE</strong>
          <p>You've covered all seven sections: Relational Databases, Joins, Normalization, Indexing, ACID Transactions, NoSQL &amp; CAP, and Caching &amp; Security.</p>
          <p style="margin-top:0.25rem;">Next up: <strong>Phase 2 — Containerization &amp; Orchestration</strong></p>
        </div>
      `
    }
  ];

  // ------------------------------------------------------------------
  // 4. QUIZ SETS – Three sets (Set 1, 2, 3). Each set is an array of
  //    question objects. Replace the placeholder questions with your own.
  //    Each question: { q, options: [], correct: index, explain: string }
  // ------------------------------------------------------------------
  const QUIZ_SETS = {
    1: [
      {
        q: "What is the main purpose of a primary key in a relational table?",
        options: [
          "To enforce a foreign key relationship",
          "To uniquely identify each row in the table",
          "To create an index on the table",
          "To store binary data",
        ],
        correct: 1,
        explain: "A primary key uniquely identifies each row; it must be unique and never NULL. Foreign keys reference primary keys, but that's not their purpose.",
      },
      {
        q: "Which SQL command is used to retrieve data from a database?",
        options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
        correct: 2,
        explain: "SELECT is the Data Query Language (DQL) command for reading data. INSERT, UPDATE, and DELETE are Data Manipulation Language (DML) for modifying data.",
      },
      {
        q: "What is an INNER JOIN?",
        options: [
          "Returns all rows from the left table and matching rows from the right",
          "Returns only rows that have matching values in both tables",
          "Returns all rows from both tables, matched where possible",
          "Returns all rows from the right table and matching rows from the left",
        ],
        correct: 1,
        explain: "INNER JOIN returns only the rows where the join condition is true in both tables. LEFT JOIN returns all left rows, RIGHT JOIN all right rows, and FULL OUTER JOIN all rows from both.",
      },
      {
        q: "In the context of normalization, what does 2NF fix?",
        options: [
          "Multi-valued columns",
          "Partial dependencies on a composite primary key",
          "Transitive dependencies",
          "Duplicate rows",
        ],
        correct: 1,
        explain: "2NF eliminates partial dependencies – non-key columns must depend on the whole composite key, not just part of it. 1NF fixes multi-valued columns, 3NF fixes transitive dependencies.",
      },
      {
        q: "Which of the following is an example of a transitive dependency?",
        options: [
          "customer_id → name",
          "zip_code → city",
          "order_id → product_id",
          "student_id → course_id",
        ],
        correct: 1,
        explain: "A transitive dependency exists when a non-key column (city) depends on another non-key column (zip_code), not directly on the primary key. This is a violation of 3NF.",
      },
      {
        q: "Why is it a bad practice to use a person's name as a primary key?",
        options: [
          "Names are too long",
          "Names can change, collide, or be NULL",
          "Names are not indexed",
          "Names are case-sensitive",
        ],
        correct: 1,
        explain: "Names can change (e.g., marriage), collide (two people named Keith), or be blank. A primary key must be stable, unique, and never change – hence we use surrogate keys like auto-incrementing integers.",
      },
    ],
    2: [
      {
        q: "What is the main trade-off of adding an index to a column?",
        options: [
          "Faster reads but slower writes",
          "Faster writes but slower reads",
          "Uses less disk space",
          "Improves all operations equally",
        ],
        correct: 0,
        explain: "Indexes speed up SELECT queries (reads) but slow down INSERT, UPDATE, and DELETE (writes) because the index must be updated too. They also consume extra disk space.",
      },
      {
        q: "Which isolation level prevents dirty reads but allows non-repeatable reads?",
        options: [
          "READ UNCOMMITTED",
          "READ COMMITTED",
          "REPEATABLE READ",
          "SERIALIZABLE",
        ],
        correct: 1,
        explain: "READ COMMITTED prevents dirty reads (no reading uncommitted data) but allows non-repeatable reads (you might see different values within the same transaction if another transaction commits).",
      },
      {
        q: "What is a dirty read in database transactions?",
        options: [
          "Reading data that has been committed",
          "Reading data that is later rolled back",
          "Reading the same row twice with different results",
          "Reading data from a corrupted table",
        ],
        correct: 1,
        explain: "A dirty read occurs when a transaction reads data written by another transaction that hasn't been committed yet. If that transaction rolls back, the read data is invalid.",
      },
      {
        q: "How does Write-Ahead Logging (WAL) ensure durability?",
        options: [
          "By writing changes to memory first",
          "By writing changes to a durable log before the data files",
          "By duplicating data across multiple disks",
          "By taking periodic snapshots",
        ],
        correct: 1,
        explain: "WAL ensures durability by writing every change to an append-only log on durable storage before it is applied to the main data files. On crash recovery, the log is replayed to reconstruct committed changes.",
      },
      {
        q: "Which of the following is true about atomicity?",
        options: [
          "It ensures that all operations in a transaction succeed or none do",
          "It prevents dirty reads",
          "It guarantees data survives a crash",
          "It enforces referential integrity",
        ],
        correct: 0,
        explain: "Atomicity is the 'all or nothing' property – if any operation fails, the entire transaction rolls back. The other options describe Consistency, Durability, and Integrity constraints.",
      },
      {
        q: "In SQLite, what command forces foreign key constraint enforcement?",
        options: [
          "PRAGMA foreign_keys = ON;",
          "SET FOREIGN_KEY_CHECKS = 1;",
          "ALTER TABLE ENABLE KEYS;",
          "BEGIN TRANSACTION WITH FOREIGN KEYS;",
        ],
        correct: 0,
        explain: "SQLite does not enforce foreign keys by default. You must run `PRAGMA foreign_keys = ON;` at the start of each session to enable constraint enforcement.",
      },
    ],
    3: [
      {
        q: "Which NoSQL model is best suited for storing user profiles with varying attributes (e.g., different fields per user)?",
        options: [
          "Key-Value store",
          "Document store",
          "Column-family store",
          "Graph database",
        ],
        correct: 1,
        explain: "Document stores (like MongoDB) store JSON-like documents with flexible schemas – perfect for user profiles where each user may have different optional fields. Key-Value stores are opaque, column-family is for analytics, and graphs are for relationships.",
      },
      {
        q: "In CAP theorem, what does 'Partition Tolerance' mean?",
        options: [
          "The system can handle node failures",
          "The system continues operating despite network communication failures between nodes",
          "The system can split data across multiple partitions",
          "The system guarantees strong consistency",
        ],
        correct: 1,
        explain: "Partition Tolerance means the system can continue working even if network communication between nodes is broken (a network partition). Since partitions are inevitable in distributed systems, P is not optional.",
      },
      {
        q: "A banking system that must never show a stale balance should lean towards which CAP characteristic during a network partition?",
        options: ["Availability", "Consistency", "Partition Tolerance", "Eventual Consistency"],
        correct: 1,
        explain: "The system should prioritize Consistency (CP) – during a partition, it would refuse to serve stale data (reject requests) to avoid showing an incorrect balance. Availability is sacrificed for correctness.",
      },
      {
        q: "What is cache-aside (lazy loading)?",
        options: [
          "Writing to cache and database simultaneously",
          "Writing to cache first, then database asynchronously",
          "Checking cache first; on a miss, reading from DB and populating cache",
          "Automatically expiring cache after a fixed time",
        ],
        correct: 2,
        explain: "Cache-aside is the most common pattern: the application checks the cache first. If there's a hit, it returns the value; on a miss, it reads from the database, stores the result in the cache, then returns it. The other options are write-through, write-behind, and TTL.",
      },
      {
        q: "What is the best defense against SQL injection attacks?",
        options: [
          "Using stored procedures",
          "Parameterized queries (prepared statements)",
          "Escaping user input with backslashes",
          "Validating input with regular expressions",
        ],
        correct: 1,
        explain: "Parameterized queries are the definitive fix: they separate SQL logic from data, so user input is always treated as data, never as executable code. Stored procedures can help but are not a complete substitute; escaping and validation are error-prone.",
      },
      {
        q: "A 'trending products' list can be cached with TTL because:",
        options: [
          "It must always be accurate to the millisecond",
          "Slight staleness is acceptable and the cost of recalculating is high",
          "It is updated frequently by users",
          "It requires strong consistency",
        ],
        correct: 1,
        explain: "A trending products list doesn't need perfect real-time accuracy – being a few minutes stale causes no harm. TTL caching dramatically reduces the cost of recalculating the list on every request, making it a perfect fit.",
      },
    ],
  };

  // ============================================================
  // RENDER FUNCTIONS (do not modify – identical to networking.js)
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
      localStorage.setItem(`databases-quiz-set-${currentSet}-passed`, "true");
      if (isQuizMastered())
        localStorage.setItem("databases-quiz-passed", "true");
    }
    if (window.updateFloatingRing) window.updateFloatingRing();

    // ⚠️ IMPORTANT: If you want the header ring to update after quiz submit,
    //    uncomment the following lines:
    if (typeof updatePageHeader === 'function') {
      updatePageHeader('databases');
    }

    document.getElementById("quizFeedback").style.display = "none";
    document.getElementById("quizScore").classList.add("show");
    document.getElementById("scoreNum").textContent =
      `${score}/${currentQuestions.length}`;

    const pct = Math.round((score / currentQuestions.length) * 100);
    const previousBest = localStorage.getItem("gc-score-databases") || 0;
    if (pct > previousBest) {
      localStorage.setItem("gc-score-databases", pct);
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
    localStorage.removeItem(`databases-quiz-set-${currentSet}-passed`);
    if (!isQuizMastered()) localStorage.removeItem("databases-quiz-passed");
    if (window.updateFloatingRing) window.updateFloatingRing();

    // ⚠️ IMPORTANT: If you want the header ring to update after quiz reset,
    //    uncomment the following lines:
    // if (typeof updatePageHeader === 'function') {
    //   updatePageHeader('databases');
    // }
  };

  function isQuizMastered() {
    for (let i = 1; i <= 3; i++) {
      if (localStorage.getItem(`databases-quiz-set-${i}-passed`) === "true")
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
        localStorage.removeItem(`databases-quiz-set-${i}-passed`);
      localStorage.removeItem("databases-quiz-passed");
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
        const saved = localStorage.getItem(`databases-section-${section}`);
        const isChecked = saved === "true" ? true : false;
        cb.checked = isChecked;
        if (isChecked) checked++;
      });

      const quizPassed =
        localStorage.getItem("databases-quiz-passed") === "true";
      if (quizPassed) checked++;

      const percent = Math.round((checked / total) * 100);
      const offset = circumference - (percent / 100) * circumference;
      ringFill.style.strokeDasharray = circumference;
      ringFill.style.strokeDashoffset = offset;
      percentSpan.textContent = `${percent}%`;

      if (percent === 100) {
        const already = localStorage.getItem("databases-100-congrats-shown");
        if (!already) {
          localStorage.setItem("databases-100-congrats-shown", "true");
          const toast = document.createElement("div");
          toast.className = "coming-soon-toast";
          toast.innerHTML =
            "🎉 CONGRATULATIONS! 🎉<br>You have mastered Databases & Storage!";
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
          `databases-section-${cb.dataset.section}`,
          cb.checked,
        );
        updateFloatingRing();

        // ⚠️ IMPORTANT: If you want the header ring to update when a section checkbox is toggled,
        //    uncomment the following lines:
        if (typeof updatePageHeader === 'function') {
          updatePageHeader('databases');
        }
      });
    });

    floatingDiv.addEventListener("click", (e) => {
      e.stopPropagation();
      if (typeof window.openModalToPillarDetails === "function") {
        window.openModalToPillarDetails("databases", "phase1");
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

  renderDatabasesOverview();

  renderAccordion("js-section1-container", SECTION_1_ACCORDIONS);
  renderAccordion("js-section2-container", SECTION_2_ACCORDIONS);
  renderAccordion("js-section3-container", SECTION_3_ACCORDIONS);
  renderAccordion("js-section4-container", SECTION_4_ACCORDIONS);
  renderAccordion("js-section5-container", SECTION_5_ACCORDIONS);
  renderAccordion("js-section6-container", SECTION_6_ACCORDIONS);
  renderAccordion("js-section7-container", SECTION_7_ACCORDIONS);

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

  // ⚠️ IMPORTANT: If you want the header ring to update on page load (and after any progress changes),
  if (typeof updatePageHeader === 'function') {
    updatePageHeader('databases');
  }

  console.log("✅ Databases & Storage pillar loaded (placeholder mode)");
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
