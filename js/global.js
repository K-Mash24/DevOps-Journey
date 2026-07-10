// ============================================================
// SHARED GLOBAL UI ENGINE (Runs on all pages)
// ============================================================
// Base path for GitHub Pages project site
const BASE_PATH = window.location.pathname.includes('/DevOps-Journey/') ? '/DevOps-Journey' : '.';

// ============================================================
// SERVICE WORKER VERSION CHECK
// ============================================================

const APP_VERSION = '2026-07-10-v2.0'; // Match your CACHE_NAME

if (localStorage.getItem('sw-version') !== APP_VERSION) {
  console.log('🔄 New version detected — clearing old caches...');
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(reg => {
        reg.update(); // Force update check
      });
    });
  }
  
  localStorage.setItem('sw-version', APP_VERSION);
}

// ============================================================
// SHOW COMING SOON TOAST FOR PILLAR (called from onclick)
// ============================================================

function showComingSoonForPillar(element) {
  // Extract the pillar name from the element
  let name = element.textContent.trim();
  // Remove percentage and icons
  name = name.replace(/[0-9%]/g, '').replace(/[🌐🐧🔒⚙️🗄️🐳🔁☸️🏗️📊]/g, '').trim();
  // Remove "Pillar X — " prefix
  name = name.replace(/Pillar\s*\d+\s*[—\-]\s*/, '').trim();
  
  // Check if it's Phase 2
  if (element.closest('[data-phase2]') || 
      element.closest('.sidebar-nav')?.previousElementSibling?.textContent?.includes('Phase 2')) {
    name = 'Phase 2 — ' + name;
  }
  
  if (name && name !== '') {
    showComingSoonToast(name);
  } else {
    showComingSoonToast('This pillar');
  }
  
  return false; // Prevent any default behavior
}

document.addEventListener('DOMContentLoaded', () => {

  initCopyButtons();
  setupCopyButtonObserver();

  // --- Theme Toggle ---
  const html = document.documentElement;
  const lightBtn = document.getElementById('lightBtn');
  const darkBtn = document.getElementById('darkBtn');
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('gc-theme', theme);
    if (lightBtn) lightBtn.classList.toggle('active', theme === 'light');
    if (darkBtn) darkBtn.classList.toggle('active', theme === 'dark');
  }
  if (lightBtn && darkBtn) {
    lightBtn.addEventListener('click', () => setTheme('light'));
    darkBtn.addEventListener('click', () => setTheme('dark'));
  }
  const saved = localStorage.getItem('gc-theme');
  if (saved) setTheme(saved);
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');

  // --- Mobile Sidebar ---
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('sidebarOverlay');

  if (hamburger && sidebar && overlay) {
    hamburger.addEventListener('click', () => { 
      sidebar.classList.toggle('open'); 
      overlay.classList.toggle('show'); 
      hamburger.classList.toggle('active'); // ADD THIS for animation
    });
    overlay.addEventListener('click', () => { 
      sidebar.classList.remove('open'); 
      overlay.classList.remove('show');
      hamburger.classList.remove('active'); // ADD THIS
    });
  }

  document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
    item.addEventListener('click', () => { 
      sidebar?.classList.remove('open'); 
      overlay?.classList.remove('show');
      hamburger?.classList.remove('active'); // ADD THIS
    });
  });

  // --- Scroll to Top ---
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => scrollTopBtn.classList.toggle('show', window.scrollY > 400), { passive: true });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ============================================================
  // PILLAR DETAILS (for both Phase 1 and Phase 2)
  // ============================================================

  // Phase 1 pillar data
  const phase1PillarData = {
    networking: {
      sections: 7,
      quiz: true,
      titles: [
        'Section 1 — Internet Structure',
        'Section 2 — IP Addressing',
        'Section 3 — Subnetting & CIDR',
        'Section 4 — Routing & Switching',
        'Section 5 — DNS',
        'Section 6 — TCP & UDP',
        'Section 7 — Network Security'
      ],
      quizKey: 'networking-quiz-passed',
      sectionPrefix: 'networking-section-'
    },
    linux: {
      sections: 10,
      quiz: true,
      titles: [
        'Section 1 — Filesystem Structure & Navigation',
        'Section 2 — File & Directory Operations',
        'Section 3 — Permissions & Ownership',
        'Section 4 — Users & Groups',
        'Section 5 — Processes & Job Control',
        'Section 6 — Package Management',
        'Section 7 — Bash Scripting',
        'Section 8 — Systemd & Services',
        'Section 9 — Text Processing (grep, sed, awk)',
        'Section 10 — Networking Commands'
      ],
      quizKey: 'linux-quiz-passed',
      sectionPrefix: 'linux-section-'
    },
    security: { 
      sections: 9, 
      quiz: true, 
      titles: [
        'Section 1 — Cryptography fundamentals',
        'Section 2 — Hashing & password security',
        'Section 3 — TLS/SSL & the handshake',
        'Section 4 — PKI & Certificate Authorities',
        'Section 5 — Authentication vs Authorization',
        'Section 6 — Least Privilege & Access Control Models',
        'Section 7 — OWASP Top 10 (1)', 
        'Section 8 — OWASP Top 10 (2)', 
        'Section 9 — Network & system hardening Hardening'
      ], 
      quizKey: 'security-quiz-passed', 
      sectionPrefix: 'security-section-' 
    },
    scripting: { 
      sections: 9,
      quiz: true,
      titles: [
        'Section 1 — Python fundamentals',
        'Section 2 — Python Functions, Modules & Error Handling',
        'Section 3 — File I/O in Python',
        'Section 4 — Bash Scripting Fundamentals',
        'Section 5 — Bash Scripting — Advanced',
        'Section 6 — REST APIs — Concepts',
        'Section 7 — Working with APIs in Python',
        'Section 8 — JSON Parsing & Data Manipulation',
        'Section 9 — Automation Patterns'
      ],
      quizKey: 'scripting-quiz-passed',
      sectionPrefix: 'scripting-section-'
     },
    databases: { placeholder: true, name: 'Databases' }
  };

  // Phase 2 pillar data – each has a list of topics and a binary key (used by the Phase 2 chip)
  const phase2PillarData = {
    docker: {
      name: 'Docker & Containers',
      topics: [
        'Docker architecture (daemon, client, registry)',
        'Images and layers',
        'Containers (run, stop, rm)',
        'Dockerfile basics',
        'Building and tagging images',
        'Container networking',
        'Volumes and persistence',
        'Docker Compose'
      ],
      binaryKey: 'phase2-docker',
      topicPrefix: 'phase2-docker-topic-'
    },
    cicd: {
      name: 'CI/CD Pipelines',
      topics: [
        'CI/CD concepts (continuous integration, delivery, deployment)',
        'GitHub Actions workflows',
        'YAML syntax for pipelines',
        'Build, test, and deploy stages',
        'Secrets management',
        'Self-hosted runners',
        'Artifact storage',
        'Pipeline monitoring'
      ],
      binaryKey: 'phase2-cicd',
      topicPrefix: 'phase2-cicd-topic-'
    },
    kubernetes: {
      name: 'Kubernetes',
      topics: [
        'Cluster architecture (control plane, nodes)',
        'Pods and containers',
        'Deployments and replicasets',
        'Services (ClusterIP, NodePort, LoadBalancer)',
        'Ingress controllers',
        'ConfigMaps and Secrets',
        'Persistent Volumes and Claims',
        'Helm charts'
      ],
      binaryKey: 'phase2-kubernetes',
      topicPrefix: 'phase2-kubernetes-topic-'
    },
    terraform: {
      name: 'Terraform & Ansible',
      topics: [
        'Infrastructure as Code concepts',
        'Terraform configuration language',
        'Providers and resources',
        'State management (local and remote)',
        'Modules and reusability',
        'Ansible playbooks and inventory',
        'Idempotency and declarative config',
        'Integration with cloud providers'
      ],
      binaryKey: 'phase2-terraform',
      topicPrefix: 'phase2-terraform-topic-'
    },
    monitoring: {
      name: 'Monitoring & Observability',
      topics: [
        'Metrics, logs, traces',
        'Prometheus architecture (scrape, rules, alerts)',
        'Exporters and service discovery',
        'Grafana dashboards and data sources',
        'Logging stacks (Loki, ELK)',
        'Alertmanager configuration',
        'Distributed tracing (Jaeger, Zipkin)',
        'SLIs, SLOs, error budgets'
      ],
      binaryKey: 'phase2-monitoring',
      topicPrefix: 'phase2-monitoring-topic-'
    }
  };

  // ============================================================
  // STUDY PATH CONFIGURATION – Used for the timeline on index.html
  // ============================================================

  const STUDY_PATH = [
    {
      id: 'networking',
      icon: '✓',
      status: 'complete',
      name: 'Pillar 1 — Networking Fundamentals',
      sub: '7 sections · OSI, IP, subnetting, routing, DNS, TCP/UDP, security, RJ45 · 11 files committed',
      link: 'html/networking.html'
    },
    {
      id: 'linux',
      icon: '→',
      status: 'complete',
      name: 'Pillar 2 — Linux & CLI Proficiency',
      sub: '10 sections · File system, permissions, processes, SSH, package management, bash scripting, systemd, text processing, networking commands',
      link: 'html/linux.html',
      highlight: '← YOU ARE HERE'
    },
    {
      id: 'security',
      icon: '3',
      status: 'complete',
      name: 'Pillar 3 — Security Concepts',
      sub: '9 sections · Cryptography fundamentals, Hashing & password security, TLS/SSL & the handshake, PKI & Certificate Authorities, Authentication vs Authorization, Network & system hardening',
      link: 'html/security.html'
    },
    {
      id: 'scripting',
      icon: '4',
      status: 'in-progress',
      name: 'Pillar 4 — Scripting & Automation',
      sub: '9 sections · Python fundamentals, Functions % Modules, Bash Scripting, REST APIs, Working with APIs, JSON Parsing, Data Manipulation, Automation Patterns',
      link: 'html/scripting.html'
    },
    {
      id: 'databases',
      icon: '5',
      status: 'locked',
      name: 'Pillar 5 — Databases & Storage',
      sub: 'SQL, NoSQL, ACID, indexing, caching, CAP theorem',
      link: '#'
    },
    {
      id: 'Solutions Architect Associate (SAA)',
      icon: '★',
      status: 'locked',
      name: 'AWS Solutions Architect Associate (SAA)',
      sub: 'Begins after all 5 pillars complete. AWS restrictions lift here.',
      link: '#'
    },
    {
      id: 'phase2',
      icon: '∞',
      status: 'locked',
      name: 'Phase 2 — roadmap.sh DevOps Roadmap',
      sub: 'Docker → CI/CD → Kubernetes → Terraform → Monitoring. Full DevOps engineer path.',
      link: '#'
    }
  ];

  // ============================================================
  // INDEX PAGE CONTENT — Migrated from HTML to JS
  // ============================================================

  const INDEX_HERO = {
    tagline: 'DevOps Journey',
    title: 'Zero to Cloud',
    subtitle: 'Foundations-first DevOps',
    description: 'Learn the fundamentals so deeply that the cloud is just an implementation detail.',
    badges: ['Foundations first.', 'Cloud later.', 'Always learning.'],
    pills: [
      { text: '5 foundational pillars' },
      { text: '5 Intermediate pillars' },
      { text: 'Self-paced' },
      { text: 'Route to be Cloud-ready' }
    ],
    floatIcons: ['✦', '⬡'],
    stats: [
      { id: 'heroPillarsComplete', label: 'Pillars complete', value: '0/5' },
      { label: 'Files committed', value: '10+' },
      { label: 'Current stage', value: 'Phase 1' },
      { label: 'Next milestone', value: 'SAA' }
    ]
  };

  const INDEX_OVERVIEW = {
    heading: 'DevOps Journey – From Zero to Cloud',
    description: `This is a <strong>self‑contained, self‑paced study roadmap</strong> designed to build genuine, production‑ready foundations before touching any cloud infrastructure. The goal is not just to pass certifications but to internalise the core concepts that every DevOps engineer needs – no shortcuts, no black‑box magic, just deep understanding through practice.`,
    
    phase1: {
      title: 'Phase 1 – Foundations (5 pillars)',
      duration: '~3‑4 months (self‑paced)',
      prereq: 'None – absolute beginners welcome.',
      pillars: [
        {
          id: 'networking',
          icon: '🌐',
          title: 'Pillar 1 – Networking Fundamentals (complete)',
          description: 'OSI & TCP/IP models, IPv4/IPv6, subnetting, CIDR, VLSM, routing & switching, DNS, TCP/UDP, network security, RJ45 cabling.',
          why: 'Every system you\'ll ever touch lives on a network. You cannot secure, scale, or troubleshoot what you don\'t understand.'
        },
        {
          id: 'linux',
          icon: '🐧',
          title: 'Pillar 2 – Linux & CLI Proficiency (in progress)',
          description: 'Filesystem navigation, file operations, permissions, processes, SSH, package management, bash scripting, systemd, text processing (grep/sed/awk), networking commands.',
          why: 'Linux runs the cloud. Every server, container, and virtual machine speaks Linux – your terminal is your primary weapon.'
        },
        {
          id: 'security',
          icon: '🔒',
          title: 'Pillar 3 – Security Concepts (locked)',
          description: 'Encryption (symmetric/asymmetric), TLS/SSL, PKI, hashing, authentication, least privilege, OWASP Top 10, secure defaults.',
          why: 'Security is everyone\'s responsibility. You cannot design safe systems without knowing the threats and the controls.'
        },
        {
          id: 'scripting',
          icon: '⚙️',
          title: 'Pillar 4 – Scripting & Automation (locked)',
          description: '9 sections · Python fundamentals, Functions % Modules, Bash Scripting, REST APIs, Working with APIs, JSON Parsing, Data Manipulation, Automation Patterns',
          why: 'Automate everything. The difference between a good engineer and a great one is the ability to script repetitive tasks.'
        },
        {
          id: 'databases',
          icon: '🗄️',
          title: 'Pillar 5 – Databases & Storage (locked)',
          description: 'SQL vs NoSQL, normalisation, indexing, ACID properties, transactions, caching strategies, CAP theorem, backup & recovery.',
          why: 'State is hard. Databases are at the heart of almost every application – understanding them prevents catastrophic data loss.'
        }
      ]
    },
    
    phase2: {
      title: 'Phase 2 – DevOps Roadmap (after SAA)',
      description: 'Once Phase 1 is complete and the AWS Solutions Architect Associate (SAA) certification is earned, the full <a href="https://roadmap.sh/devops" target="_blank">roadmap.sh/devops</a> is followed:',
      items: [
        '🐳 Docker &amp; Containers – images, Dockerfile, Compose, registries',
        '🔁 CI/CD Pipelines – GitHub Actions, GitLab CI, Jenkins',
        '☸️ Kubernetes – pods, deployments, services, ingress, Helm',
        '🏗️ Infrastructure as Code – Terraform, Ansible, CloudFormation',
        '📊 Monitoring &amp; Observability – Prometheus, Grafana, Loki, tracing',
        '🔁 GitOps – ArgoCD, Flux'
      ]
    },
    
    methodology: {
      title: 'Methodology & Learning Principles',
      principles: [
        {
          title: 'Foundations first:',
          description: 'No AWS, no cloud abstractions until the raw concepts are mastered. Every topic is studied from first principles – e.g., subnetting by hand before touching a VPC.'
        },
        {
          title: 'Hands‑on, not passive:',
          description: 'Each section includes practical labs, exercises, and quizzes. Theory without practice is forgotten.'
        },
        {
          title: 'Public & versioned:',
          description: 'All notes are committed to GitHub (Great_Cheatsheets repo). The website (DevOps‑Journey repo) is built pillar by pillar – flashcards, self‑grading quizzes, and progress rings are part of the learning experience.'
        },
        {
          title: 'Spaced repetition:',
          description: 'Key concepts are highlighted and revisited across pillars. The site remembers your progress (localStorage) and congratulates you on milestones.'
        },
        {
          title: 'Real‑world relevance:',
          description: 'Every concept is explicitly connected to the DevOps tools and AWS services that will use it – but only after the foundation is solid.'
        }
      ]
    }
  };

  const INDEX_METHOD = {
    title: '📐 The Method — Foundations First',
    description: 'I hold the AWS Cloud Practitioner (CCP) certification, but I\'m not moving straight to Solutions Architect. Instead, I\'m building genuine depth through <strong>5 prerequisite pillars</strong> before touching any cloud infrastructure.',
    phases: [
      {
        title: 'Phase 1',
        description: '5 foundations pillars → SAA certification → Phase 2'
      },
      {
        title: 'Phase 2',
        description: 'Full <a href="https://roadmap.sh/devops" target="_blank" style="color: var(--accent-primary);">roadmap.sh/devops</a> — Docker → CI/CD → K8s → Terraform → Monitoring'
      }
    ],
    badges: [
      { id: 'methodBadgeNetworking', text: '✅ Networking', defaultClass: 'complete' },
      { id: 'methodBadgeLinux', text: '⏳ Linux & CLI', defaultClass: 'in-progress' },
      { id: 'methodBadgeSecurity', text: '🔒 Security', defaultClass: 'locked' },
      { id: 'methodBadgeScripting', text: '⚙️ Scripting', defaultClass: 'locked' },
      { id: 'methodBadgeDatabases', text: '🗄️ Databases', defaultClass: 'locked' }
    ],
    footnote: 'AWS restriction: OFF until Phase 1 complete'
  };

  // ============================================================
  // RENDER STUDY PATH TIMELINE (Dynamic – auto-updates status)
  // ============================================================

  function renderStudyPath() {
    const container = document.getElementById('studyPathTimeline');
    if (!container) return;

    // If there's no data, show a placeholder
    if (!STUDY_PATH || STUDY_PATH.length === 0) {
      container.innerHTML = `<div class="path-item locked-path"><div class="path-content"><div class="path-name">Loading study path...</div></div></div>`;
      return;
    }

    // Create a dynamic copy with real-time statuses
    const dynamicPath = STUDY_PATH.map(item => {
      const newItem = { ...item };

      // --- Phase 1 Pillars: Check real progress ---
      if (['networking', 'linux', 'security', 'scripting', 'databases'].includes(item.id)) {
        const progress = getPhase1PillarCompletion(item.id);
        
        if (progress >= 0.8) {
          newItem.status = 'complete';
          newItem.icon = '✓';
          newItem.highlight = ''; // Remove "YOU ARE HERE" if complete
        } else if (progress > 0) {
          newItem.status = 'in-progress';
          newItem.icon = '→';
          // Add "YOU ARE HERE" to the first in-progress pillar
          // (only if it's not already set)
          if (!newItem.highlight) {
            newItem.highlight = '← CURRENTLY HERE';
          }
        } else {
          newItem.status = 'locked';
          newItem.icon = item.icon || '🔒'; // Keep original icon or fallback
          newItem.highlight = ''; // Remove any highlight
        }
      }

      // --- Special case: SAA unlocks after all Phase 1 pillars are complete ---
      if (item.id === 'saa') {
        const phase1Pillars = ['networking', 'linux', 'security', 'scripting', 'databases'];
        let allComplete = true;
        phase1Pillars.forEach(p => {
          if (getPhase1PillarCompletion(p) < 0.8) allComplete = false;
        });
        if (allComplete) {
          newItem.status = 'complete';
          newItem.icon = '✓';
        } else {
          newItem.status = 'locked';
          newItem.icon = '★';
        }
      }

      // --- Special case: Phase 2 unlocks after SAA is complete ---
      if (item.id === 'phase2') {
        // Check if SAA is complete (we'll use the same logic)
        const phase1Pillars = ['networking', 'linux', 'security', 'scripting', 'databases'];
        let allComplete = true;
        phase1Pillars.forEach(p => {
          if (getPhase1PillarCompletion(p) < 0.8) allComplete = false;
        });
        if (allComplete) {
          newItem.status = 'in-progress';
          newItem.icon = '→';
        } else {
          newItem.status = 'locked';
          newItem.icon = '∞';
        }
      }

      // --- Determine if the link should be clickable ---
      const isClickable = newItem.link && newItem.link !== '#' && newItem.status !== 'locked';

      // Build the link wrapper
      let linkWrapper = '';
      if (isClickable) {
        linkWrapper = `<a href="${newItem.link}" style="text-decoration:none;display:contents;">`;
      } else {
        linkWrapper = `<span style="display:contents;">`;
      }
      const linkClose = isClickable ? '</a>' : '</span>';

      // Build the highlight HTML
      let highlightHtml = '';
      if (newItem.highlight && newItem.status !== 'complete') {
        highlightHtml = `<span style="font-size:0.7rem;color:var(--accent-primary);font-family:var(--font-mono);margin-left:6px;">${newItem.highlight}</span>`;
      }

      return `
        <div class="path-item ${newItem.status}">
          <div class="path-dot-wrap">
            <div class="path-dot" aria-hidden="true">${newItem.icon}</div>
          </div>
          <div class="path-content">
            <div class="path-name">
              ${linkWrapper}
              ${newItem.name}
              ${highlightHtml}
              ${linkClose}
            </div>
            <div class="path-sub">${newItem.sub}</div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = dynamicPath;
  }

  // ============================================================
  // RENDER FUNCTIONS FOR INDEX PAGE
  // ============================================================

  function renderHero() {
    const container = document.querySelector('.hero-section');
    if (!container) {
      console.warn('⚠️ Hero section container not found');
      return;
    }
    
    container.innerHTML = `
      <span class="hero-float-icon">${INDEX_HERO.floatIcons[0]}</span>
      <span class="hero-float-icon">${INDEX_HERO.floatIcons[1]}</span>
      
      <div class="hero-tagline">
        <span class="line"></span>
        <span class="label">${INDEX_HERO.tagline}</span>
        <span class="line"></span>
      </div>
      
      <h1 class="hero-title">
        <span class="gradient-text">${INDEX_HERO.title}</span>
        <span class="sub-text">${INDEX_HERO.subtitle}</span>
      </h1>
      
      <p class="hero-subtitle">
        ${INDEX_HERO.description}
        ${INDEX_HERO.badges.map(b => `<span class="badge">${b}</span>`).join(' ')}
      </p>
      
      <div class="hero-pills">
        ${INDEX_HERO.pills.map(pill => `
          <span class="pill"><span class="dot"></span>${pill.text}</span>
        `).join('')}
      </div>
    `;
  }

  function renderOverview() {
    const container = document.getElementById('js-overview-container');
    if (!container) {
      console.warn('⚠️ Overview container not found');
      return;
    }
    
    const phase1Pillars = INDEX_OVERVIEW.phase1.pillars.map(p => `
      <li>
        <strong>${p.icon} ${p.title}</strong><br>
        ${p.description}<br>
        <em>Why it matters:</em> ${p.why}
      </li>
    `).join('');
    
    const phase2Items = INDEX_OVERVIEW.phase2.items.map(item => `
      <li>${item}</li>
    `).join('');
    
    const methodologyItems = INDEX_OVERVIEW.methodology.principles.map(p => `
      <li><strong>${p.title}</strong> ${p.description}</li>
    `).join('');
    
    // ADD THE overview-description CLASS HERE
    container.innerHTML = `
      <div class="overview-description">
        <h3>📖 ${INDEX_OVERVIEW.heading}</h3>
        <p>${INDEX_OVERVIEW.description}</p>
        
        <div class="section-divider">
          <div class="section-number" aria-hidden="true">I</div>
          <h2>🎯 ${INDEX_OVERVIEW.phase1.title}</h2>
        </div>
        
        <p><strong>Duration:</strong> ${INDEX_OVERVIEW.phase1.duration} · <strong>Pre‑requisites:</strong> ${INDEX_OVERVIEW.phase1.prereq}</p>
        <ul>
          ${phase1Pillars}
        </ul>
        
        <div class="section-divider">
          <div class="section-number" aria-hidden="true">II</div>
          <h2>🚀 ${INDEX_OVERVIEW.phase2.title}</h2>
        </div>
        
        <p>${INDEX_OVERVIEW.phase2.description}</p>
        <ul>
          ${phase2Items}
        </ul>
        
        <div class="section-divider">
          <div class="section-number" aria-hidden="true">III</div>
          <h2>📐 ${INDEX_OVERVIEW.methodology.title}</h2>
        </div>
        
        <ul>
          ${methodologyItems}
        </ul>
        
        <div class="info-box warning" style="margin-top: 0.5rem;">
          <strong>📈 Current Status (2026)</strong>
          <dl id="statusList" class="key-concepts-list" style="margin-top: 0.75rem;"></dl>
        </div>
      </div>
    `;
  }

  function renderMethodSection() {
    const container = document.getElementById('js-method-container');
    if (!container) {
      console.warn('⚠️ Method container not found');
      return;
    }
    
    const phases = INDEX_METHOD.phases.map(p => `
      <div style="flex: 1; min-width: 180px; background: var(--bg-primary); border-radius: var(--radius-md); padding: 0.75rem; border-left: 3px solid var(--accent-primary);">
        <div style="font-weight: 600; font-family: var(--font-display);">${p.title}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">${p.description}</div>
      </div>
    `).join('');
    
    const badges = INDEX_METHOD.badges.map(b => `
      <span id="${b.id}" class="method-badge">${b.text}</span>
    `).join('');
    
    container.innerHTML = `
      <div class="method-section" style="background: var(--bg-card); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem; border: 1px solid var(--border-color);">
        <h3 style="margin-bottom: 0.75rem;">${INDEX_METHOD.title}</h3>
        <p style="margin-bottom: 1rem; color: var(--text-secondary);">${INDEX_METHOD.description}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin: 1.25rem 0;">
          ${phases}
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
          ${badges}
          <span style="margin-left: auto; font-size: 0.7rem; color: var(--text-muted);">${INDEX_METHOD.footnote}</span>
        </div>
      </div>
    `;
  }

  function showPillarDetail(pillarId, phase = 'phase1') {
    const container = document.getElementById('pillarDetailContainer');
    if (!container) return;

    let data, checkedCount = 0, totalItems = 0;

    if (phase === 'phase1') {
      data = phase1PillarData[pillarId];
      if (!data) return;
      if (data.placeholder) {
        container.innerHTML = `<div class="info-box note"><strong>📌 Coming soon</strong><p>The ${data.name} pillar will have its own detailed checklist once you start studying it.</p></div>`;
        return;
      }
      // Build Phase 1 checklist
      let checklistHtml = '';
      for (let i = 1; i <= data.sections; i++) {
        const key = `${data.sectionPrefix}${i}`;
        const checked = localStorage.getItem(key) === 'true';
        if (checked) checkedCount++;
        checklistHtml += `
          <div class="pillar-checklist-item" data-key="${key}">
            <input type="checkbox" class="pillar-detail-cb" data-key="${key}" ${checked ? 'checked' : ''}>
            <label>${data.titles[i-1]}</label>
            <span class="pillar-checklist-status">${checked ? '✓' : '⬚'}</span>
          </div>
        `;
      }
      let quizHtml = '';
      if (data.quiz) {
        const quizChecked = localStorage.getItem(data.quizKey) === 'true';
        if (quizChecked) checkedCount++;
        quizHtml = `
          <div class="pillar-checklist-item" data-key="${data.quizKey}">
            <input type="checkbox" class="pillar-detail-cb" data-key="${data.quizKey}" ${quizChecked ? 'checked' : ''}>
            <label><strong>🏆 Quiz mastered (100%)</strong></label>
            <span class="pillar-checklist-status">${quizChecked ? '✓' : '⬚'}</span>
          </div>
        `;
      }
      totalItems = data.sections + (data.quiz ? 1 : 0);
      const percent = Math.round((checkedCount / totalItems) * 100);
      const circumference = 2 * Math.PI * 52;
      const offset = circumference - (percent / 100) * circumference;
      const ringHtml = `
        <div style="padding: 0 0.5rem; display: flex; flex-wrap: wrap; gap: 1.0rem; align-items: center;">
          <div class="pillar-ring-wrapper" style="position: relative; width: 160px; height: 160px;">
            <svg width="160" height="160" viewBox="0 0 120 120">
              <circle class="pillar-ring-bg" cx="60" cy="60" r="52" fill="none" stroke="var(--border-color)" stroke-width="8"/>
              <circle class="pillar-ring-fill" cx="60" cy="60" r="52" fill="none" stroke="var(--accent-secondary)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" transform="rotate(-90 60 60)"/>
            </svg>
            <div class="pillar-ring-percent" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.5rem; font-weight: bold;">${percent}%</div>
          </div>
          <div style="flex: 1;">
            <div class="pillar-checklist">
              ${checklistHtml}
              ${quizHtml}
            </div>
          </div>
        </div>
        <div style="margin-top: 0.75rem; font-size: 0.75rem; text-align: center;">
          <span>${checkedCount}/${totalItems} items complete</span>
        </div>
      `;
      container.innerHTML = ringHtml;
    } 
    else if (phase === 'phase2') {
      data = phase2PillarData[pillarId];
      if (!data) return;
      // Build Phase 2 checklist from topics
      let checklistHtml = '';
      for (let i = 0; i < data.topics.length; i++) {
        const key = `${data.topicPrefix}${i+1}`;
        const checked = localStorage.getItem(key) === 'true';
        if (checked) checkedCount++;
        checklistHtml += `
          <div class="pillar-checklist-item" data-key="${key}">
            <input type="checkbox" class="pillar-detail-cb" data-key="${key}" ${checked ? 'checked' : ''}>
            <label>${data.topics[i]}</label>
            <span class="pillar-checklist-status">${checked ? '✓' : '⬚'}</span>
          </div>
        `;
        updatePhase2RoadmapAndCards();
      }
      totalItems = data.topics.length;
      // Also update the binary pillar completion key based on whether all topics are checked
      const binaryKey = data.binaryKey;
      const allChecked = (checkedCount === totalItems);
      localStorage.setItem(binaryKey, allChecked ? 'true' : 'false');
      // Force update of Phase 2 chip UI in the Phase 2 tab (will be refreshed later)
      const percent = Math.round((checkedCount / totalItems) * 100);
      const circumference = 2 * Math.PI * 52;
      const offset = circumference - (percent / 100) * circumference;
      const ringHtml = `
        <div style="padding: 0 0.5rem; display: flex; flex-wrap: wrap; gap: 1.0rem; align-items: center;">
          <div class="pillar-ring-wrapper" style="position: relative; width: 160px; height: 160px;">
            <svg width="160" height="160" viewBox="0 0 120 120">
              <circle class="pillar-ring-bg" cx="60" cy="60" r="52" fill="none" stroke="var(--border-color)" stroke-width="8"/>
              <circle class="pillar-ring-fill" cx="60" cy="60" r="52" fill="none" stroke="var(--accent-secondary)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" transform="rotate(-90 60 60)"/>
            </svg>
            <div class="pillar-ring-percent" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.5rem; font-weight: bold;">${percent}%</div>
          </div>
          <div style="flex: 1;">
            <div class="pillar-checklist">
              ${checklistHtml}
            </div>
          </div>
        </div>
        <div style="margin-top: 0.75rem; font-size: 0.75rem; text-align: center;">
          <span>${checkedCount}/${totalItems} topics complete</span>
        </div>
      `;
      container.innerHTML = ringHtml;
    }

    // Attach event handlers for checkboxes
    document.querySelectorAll('.pillar-detail-cb').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const key = cb.dataset.key;
        if (key) {
          localStorage.setItem(key, cb.checked ? 'true' : 'false');
          // Re-render the same pillar to update ring and counts
          showPillarDetail(pillarId, phase);
          if (typeof updatePageHeader === 'function') updatePageHeader(pillarId);
        }
      });
    });
  }

  // Expose globally so pillar pages can call it
    window.showPillarDetail = showPillarDetail; // Expose globally for fallback

  // ============================================================
  // OVERRIDE CHIP CLICK HANDLERS IN PHASE 1 AND PHASE 2 SCROLLERS 
  // REMEMBER TO ALTER AS YOU ADD ON NEW PAGES TO THE SITE
  // ============================================================

  // Original renderPhase1ModalScroller – modify the click handler
  function renderPhase1ModalScroller() {
    const track = document.getElementById('phase1ModalTrack');
    if (!track) return;
    const pillars = ['networking','linux','security','scripting','databases'];
    const names = ['Networking', 'Linux & CLI', 'Security', 'Scripting', 'Databases'];
    const icons = ['🌐', '🐧', '👀', '⚙️', '🗄️'];
    const links = ['html/networking.html', 'html/linux.html', 'html/security.html', 'html/scripting.html', '#'];
    track.innerHTML = pillars.map((p, idx) => {
      const progress = getPhase1PillarCompletion(p);
      const percent = Math.round(progress * 100);
      let statusClass = 'locked';
      let statusSymbol = '🔒';
      if (percent >= 80) { statusClass = 'complete'; statusSymbol = '✓'; }
      else if (percent > 0) { statusClass = 'active'; statusSymbol = '→'; }
      return `<button class="pillar-chip ${statusClass}" data-pillar="${p}" data-phase="phase1" data-link="${links[idx]}" data-coming-soon="${links[idx]==='#'? 'true':'false'}">
                <span class="chip-icon">${icons[idx]}</span>
                <span class="chip-name">${names[idx]}</span>
                <span class="chip-status">${statusSymbol}</span>
              </button>`;
    }).join('');
    track.querySelectorAll('.pillar-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const pillar = chip.getAttribute('data-pillar');
        const phase = chip.getAttribute('data-phase');
        const isComingSoon = chip.getAttribute('data-coming-soon') === 'true';
        if (isComingSoon) {
          showComingSoonToast(chip.querySelector('.chip-name')?.innerText);
          return;
        }
        if (pillar && phase) {
          showPillarDetail(pillar, phase);
          // Switch to the Pillar Details tab
          const tabButton = document.querySelector('.tab-button[data-tab="tab3"]');
          if (tabButton) tabButton.click();
        }
      });
    });
  }

  // Original renderPhase2ModalScroller – modify click handler to show detail
  function renderPhase2ModalScroller() {
    const track = document.getElementById('phase2ModalTrack');
    if (!track) return;
    const phases = ['docker','cicd','kubernetes','terraform','monitoring'];
    const names = ['Docker', 'CI/CD', 'Kubernetes', 'Terraform', 'Monitoring'];
    const icons = ['🐳', '🔁', '☸️', '🏗️', '📊'];
    track.innerHTML = phases.map((p, idx) => {
      const completed = getPhase2PillarCompletion(p);
      const statusClass = completed ? 'complete' : 'locked';
      const statusSymbol = completed ? '✓' : '🔒';
      return `<button class="pillar-chip phase2-chip ${statusClass}" data-pillar="${p}" data-phase="phase2">
                <span class="chip-icon">${icons[idx]}</span>
                <span class="chip-name">${names[idx]}</span>
                <span class="chip-status">${statusSymbol}</span>
              </button>`;
    }).join('');
    track.querySelectorAll('.phase2-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const pillar = chip.getAttribute('data-pillar');
        const phase = chip.getAttribute('data-phase');
        if (pillar && phase) {
          showPillarDetail(pillar, phase);
          // Switch to the Pillar Details tab
          const tabButton = document.querySelector('.tab-button[data-tab="tab3"]');
          if (tabButton) tabButton.click();
        }
      });
    });
  }

  // Ensure the modal initialisation calls these render functions
  // (You likely already have initModalAndFloatingRing calling them)
  // We'll override the existing calls.

  // ... rest of your existing code (initGlobalSearch, etc.) ...

  // After everything, call the render functions
  if (document.getElementById('phase1ModalTrack')) {
    renderPhase1ModalScroller();
    renderPhase2ModalScroller();
  }

  function openModalToPillarDetails(pillarId, phase) {
    const modal = document.getElementById('progressModal');
    if (!modal) return;
    
    // Open modal
    modal.style.display = 'flex';
    
    // Switch to Pillar Details tab (tab 3)
    const tabButton = document.querySelector('.tab-button[data-tab="tab3"]');
    if (tabButton) tabButton.click();
    
    // Load the pillar data
    showPillarDetail(pillarId, phase);
  }

// Expose globally so pillar pages can call it
window.openModalToPillarDetails = openModalToPillarDetails;

  // --- Accordion Toggle ---
  window.toggleAccordion = function(header) {
    const accordion = header.closest('.accordion');
    if (!accordion) return;
    accordion.classList.toggle('open');
    header.setAttribute('aria-expanded', accordion.classList.contains('open'));
    const id = accordion.querySelector('.accordion-title')?.innerText || 'unknown';
    const openStates = JSON.parse(localStorage.getItem('gc-accordion-states') || '{}');
    openStates[id] = accordion.classList.contains('open');
    localStorage.setItem('gc-accordion-states', JSON.stringify(openStates));
  };
  function restoreAccordionStates() {
    const openStates = JSON.parse(localStorage.getItem('gc-accordion-states') || '{}');
    document.querySelectorAll('.accordion').forEach(acc => {
      const id = acc.querySelector('.accordion-title')?.innerText;
      if (id && openStates[id] === true) {
        acc.classList.add('open');
        acc.querySelector('.accordion-header')?.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // --- Search Engine ---
  function initGlobalSearch() {
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');
    if (!searchInput) return;
    let debounceTimeout;
    const removeHighlights = (el) => el.querySelectorAll('.highlight').forEach(h => h.outerHTML = h.textContent);
    const highlightText = (el, term) => {
      if (!term) return;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        if (!node.textContent.toLowerCase().includes(term.toLowerCase())) return;
        const span = document.createElement('span');
        span.innerHTML = node.textContent.replace(new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi'), '<mark class="highlight">$1</mark>');
        node.parentNode.replaceChild(span, node);
      });
    };
    function scrollToElement(element) {
      if (!element) return;
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
    function createResultsDropdown(results, searchTerm) {
      const existing = document.querySelector('.search-results-dropdown');
      if (existing) existing.remove();
      if (!results.length) return;
      const dropdown = document.createElement('div');
      dropdown.className = 'search-results-dropdown';
      dropdown.style.cssText = `position:absolute; top:${searchInput.getBoundingClientRect().bottom + window.scrollY}px; left:${searchInput.getBoundingClientRect().left}px; width:${searchInput.offsetWidth}px; max-height:400px; overflow-y:auto; background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); box-shadow:var(--shadow-md); z-index:1000; backdrop-filter:blur(4px);`;
      results.forEach(result => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.style.cssText = 'padding:10px 12px; cursor:pointer; border-bottom:1px solid var(--border-color); transition:background 0.2s;';
        const titleHighlight = result.title.replace(new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi'), '<mark class="highlight">$1</mark>');
        const previewHighlight = result.preview.replace(new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi'), '<mark class="highlight">$1</mark>');
        item.innerHTML = `<div style="font-weight:600; font-family:var(--font-display); font-size:0.85rem;">${titleHighlight}</div><div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">${previewHighlight}</div>`;
        item.addEventListener('click', () => {
          scrollToElement(result.element);
          result.element.style.transition = 'background 0.3s';
          result.element.style.background = 'var(--pillar-color-light)';
          setTimeout(() => result.element.style.background = '', 1500);
          dropdown.remove();
          searchInput.blur();
        });
        item.addEventListener('mouseenter', () => item.style.background = 'var(--bg-tertiary)');
        item.addEventListener('mouseleave', () => item.style.background = '');
        dropdown.appendChild(item);
      });
      document.body.appendChild(dropdown);
      const closeDropdown = (e) => { if (!dropdown.contains(e.target) && e.target !== searchInput) { dropdown.remove(); document.removeEventListener('click', closeDropdown); } };
      setTimeout(() => document.addEventListener('click', closeDropdown), 100);
    }
    function performSearch(term) {
      const results = [];
      const lowerTerm = term.toLowerCase();
      const addResult = (element, title, preview) => {
        if (preview.toLowerCase().includes(lowerTerm) || title.toLowerCase().includes(lowerTerm)) results.push({ element, title, preview: preview.substring(0,150) });
      };
      document.querySelectorAll('.accordion[data-searchable]').forEach(accordion => {
        const title = accordion.querySelector('.accordion-title')?.innerText.trim() || 'Section';
        const preview = accordion.querySelector('.accordion-body')?.innerText.trim() || '';
        if (preview.toLowerCase().includes(lowerTerm) || title.toLowerCase().includes(lowerTerm)) {
          addResult(accordion, title, preview);
          if (!accordion.classList.contains('open')) window.toggleAccordion?.(accordion.querySelector('.accordion-header'));
        }
      });
      document.querySelectorAll('.pillar-card').forEach(card => {
        const title = card.querySelector('.card-title')?.innerText || '';
        const desc = card.querySelector('.card-desc')?.innerText || '';
        if ((title+desc).toLowerCase().includes(lowerTerm)) addResult(card, `📚 ${title}`, desc);
      });
      document.querySelectorAll('.path-item').forEach(item => {
        const name = item.querySelector('.path-name')?.innerText || '';
        const sub = item.querySelector('.path-sub')?.innerText || '';
        if ((name+sub).toLowerCase().includes(lowerTerm)) addResult(item, `🔄 ${name}`, sub);
      });
      document.querySelectorAll('.phase-item').forEach(phase => {
        const name = phase.querySelector('.phase-name')?.innerText || '';
        const desc = phase.querySelector('.phase-desc')?.innerText || '';
        if ((name+desc).toLowerCase().includes(lowerTerm)) addResult(phase, `📌 ${name}`, desc);
      });
      return results;
    }
    searchInput.addEventListener('input', function() {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        const term = this.value.trim().toLowerCase();
        document.querySelectorAll('.accordion, .pillar-card, .path-item, .phase-item').forEach(removeHighlights);
        if (!term) {
          document.querySelectorAll('.accordion').forEach(acc => acc.classList.remove('search-hidden'));
          if (noResults) noResults.classList.remove('show');
          document.querySelector('.search-results-dropdown')?.remove();
          return;
        }
        const results = performSearch(term);
        document.querySelectorAll('.accordion[data-searchable]').forEach(acc => {
          const title = acc.querySelector('.accordion-title')?.innerText.trim() || '';
          const content = acc.querySelector('.accordion-body')?.innerText.trim() || '';
          if (!title.toLowerCase().includes(term) && !content.toLowerCase().includes(term)) acc.classList.add('search-hidden');
          else { acc.classList.remove('search-hidden'); highlightText(acc, term); }
        });
        if (noResults) noResults.classList.toggle('show', document.querySelectorAll('.accordion[data-searchable]:not(.search-hidden)').length === 0);
        if (results.length) createResultsDropdown(results, term);
        else document.querySelector('.search-results-dropdown')?.remove();
      }, 250);
    });
    searchInput.addEventListener('keydown', (e) => { if (e.key === 'Escape') { document.querySelector('.search-results-dropdown')?.remove(); searchInput.blur(); } });
  }

  // --- Scroll Spy ---
  function initGlobalScrollSpy() {
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item[href^="#"]');
    if (!navItems.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navItems.forEach(item => item.classList.toggle('active', item.getAttribute('href') === `#${id}`));
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    navItems.forEach(item => {
      const targetEl = document.getElementById(item.getAttribute('href').substring(1));
      if (targetEl) observer.observe(targetEl);
    });
  }

  // --- Resource Pulse ---
  function initResourcePulse() {
    const resContainer = document.getElementById('resources');
    if (!resContainer) return;
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.querySelectorAll('.resource-card').forEach((card,i) => setTimeout(() => card.classList.add('lighting-flash'), i*100));
      });
    }, { rootMargin: '0px 0px -10% 0px' }).observe(resContainer);
  }

  // ============================================================
  // INIT COPY BUTTONS — Robust version
  // ============================================================

  function initCopyButtons() {
    console.log('📋 initCopyButtons called');
    
    const blocks = document.querySelectorAll('.code-block');
    console.log(`📋 Found ${blocks.length} code blocks`);
    
    let added = 0;
    blocks.forEach(block => {
      // Skip if a copy button already exists
      if (block.querySelector('.copy-btn')) return;

      // Create the copy button
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M16 1H4a2 2 0 00-2 2v14h2V3h12V1z"/>
          <path d="M8 5h12a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2z"/>
        </svg>
      `;
      btn.setAttribute('aria-label', 'Copy code');

      // Style the button
      Object.assign(btn.style, {
        position: 'absolute',
        top: '8px',
        right: '8px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-sm)',
        padding: '4px 8px',
        cursor: 'pointer',
        opacity: '0.7',
        transition: 'opacity 0.2s, background 0.2s, transform 0.2s'
      });

      // Ensure code-block has position:relative
      block.style.position = 'relative';
      block.appendChild(btn);
      added++;

      // Copy functionality with visual feedback
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const text = block.querySelector('pre')?.innerText || block.innerText;
        try {
          await navigator.clipboard.writeText(text);
          // Success feedback
          btn.innerHTML = '✓';
          btn.style.opacity = '1';
          btn.style.background = 'var(--accent-secondary)';
          btn.style.color = 'white';
          btn.style.transform = 'scale(1.1)';
          setTimeout(() => {
            btn.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 1H4a2 2 0 00-2 2v14h2V3h12V1z"/>
                <path d="M8 5h12a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2z"/>
              </svg>
            `;
            btn.style.opacity = '0.7';
            btn.style.background = 'var(--bg-card)';
            btn.style.color = '';
            btn.style.transform = 'scale(1)';
          }, 1500);
        } catch (err) {
          console.warn('Copy failed:', err);
          btn.innerHTML = '✕';
          btn.style.opacity = '1';
          btn.style.background = 'var(--accent-danger)';
          btn.style.color = 'white';
          setTimeout(() => {
            btn.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 1H4a2 2 0 00-2 2v14h2V3h12V1z"/>
                <path d="M8 5h12a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2z"/>
              </svg>
            `;
            btn.style.opacity = '0.7';
            btn.style.background = 'var(--bg-card)';
            btn.style.color = '';
          }, 1500);
        }
      });

      // Hover effects
      btn.addEventListener('mouseenter', () => {
        btn.style.opacity = '1';
        btn.style.background = 'var(--accent-primary)';
        btn.style.color = 'white';
      });
      btn.addEventListener('mouseleave', () => {
        if (btn.innerHTML === '✓' || btn.innerHTML === '✕') return;
        btn.style.opacity = '0.7';
        btn.style.background = 'var(--bg-card)';
        btn.style.color = '';
      });
    });

    if (added > 0) console.log(`📋 Added ${added} copy buttons`);
    return added;
  }

  // ============================================================
  // MUTATION OBSERVER — Reliable detection of new code blocks
  // ============================================================

  function setupCopyButtonObserver() {
    const observer = new MutationObserver((mutations) => {
      let needsUpdate = false;
      
      mutations.forEach(mutation => {
        // Check added nodes
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            // Check if the node itself is a code block
            if (node.classList && node.classList.contains('code-block')) {
              needsUpdate = true;
            }
            // Check if it contains code blocks (using querySelectorAll on the node)
            if (node.querySelectorAll) {
              const childCodeBlocks = node.querySelectorAll('.code-block');
              if (childCodeBlocks.length > 0) {
                needsUpdate = true;
              }
            }
          }
        });
      });
      
      if (needsUpdate) {
        // Use requestAnimationFrame to ensure DOM is fully updated
        requestAnimationFrame(() => {
          // Small delay to let the browser paint
          setTimeout(() => {
            initCopyButtons();
          }, 50);
        });
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('🔍 Copy button observer active');
  }

  // --- Fetch Last Updated ---
  async function fetchLastUpdated() {
    try {
      const res = await fetch('https://api.github.com/repos/K-Mash24/DevOps-Journey/commits/main');
      if (!res.ok) throw new Error();
      const data = await res.json();
      const date = new Date(data.commit.committer.date);
      const footer = document.querySelector('.sidebar-footer-text');
      if (footer && !footer.querySelector('.last-updated')) {
        const span = document.createElement('div');
        span.className = 'last-updated';
        span.style.cssText = 'margin-top:6px; font-size:0.55rem;';
        span.textContent = `Last updated: ${date.toLocaleDateString()}`;
        footer.appendChild(span);
      }
    } catch(e) { console.debug('Could not fetch last updated date'); }
  }

  // --- Reset All Progress ---
  function addResetButton() {
    const footer = document.querySelector('.sidebar-footer');
    if (!footer || footer.querySelector('.btn-reset-progress')) return;
    const btn = document.createElement('button');
    btn.textContent = 'Reset all progress';
    btn.className = 'btn-reset-progress';
    btn.style.cssText = 'margin-top:10px; background:none; border:none; color:var(--text-sidebar-muted); font-size:0.65rem; cursor:pointer; text-decoration:underline;';
    btn.addEventListener('click', () => {
      if (confirm('Are you sure? This will delete all quiz scores and pillar progress.')) {
        ['gc-score-networking','gc-score-linux','gc-score-security','gc-score-scripting','gc-score-databases',
         ...Array.from({length:7}, (_,i)=>`networking-section-${i+1}`), 'networking-quiz-passed',
         ...Array.from({length:10}, (_,i)=>`linux-section-${i+1}`), 'linux-quiz-passed',
          ...Array.from({length:10}, (_,i)=>`security-section-${i+1}`), 'security-quiz-passed',
          ...Array.from({length:10}, (_,i)=>`scripting-section-${i+1}`), 'scripting-quiz-passed',
         'phase2-docker','phase2-cicd','phase2-kubernetes','phase2-terraform','phase2-monitoring'
        ].forEach(key => localStorage.removeItem(key));
        updateAllUI();
        alert('Progress reset. Refresh to see changes.');
      }
    });
    footer.appendChild(btn);
  }

  // --- Clickable Headings ---
  function initClickableHeadings() {
    document.querySelectorAll('h2[id], h3[id]').forEach(heading => {
      heading.style.cursor = 'pointer';
      heading.addEventListener('click', () => {
        const url = `${window.location.pathname}#${heading.id}`;
        navigator.clipboard.writeText(url);
        const toast = document.createElement('div');
        toast.textContent = 'Link copied to clipboard';
        toast.style.cssText = 'position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:var(--accent-primary); color:white; padding:8px 16px; border-radius:20px; z-index:999; font-size:0.8rem;';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
      });
    });
  }

  // --- Service Worker ---
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Use absolute path for GitHub Pages project site
      const swPath = '/DevOps-Journey/sw.js';
      navigator.serviceWorker.register(swPath)
        .then(reg => console.log('✅ Service Worker registered:', reg.scope))
        .catch(err => console.error('❌ SW registration failed:', err));
    });
  }

  // ========== CORE PROGRESS CALCULATIONS ==========
  function getPhase1PillarCompletion(pillar) {
    switch(pillar) {
      case 'networking':
        let count = 0;
        for (let i=1; i<=7; i++) if (localStorage.getItem(`networking-section-${i}`) === 'true') count++;
        if (localStorage.getItem('networking-quiz-passed') === 'true') count++;
        return count / 8;
      case 'linux':
        let lcount = 0;
        for (let i=1; i<=10; i++) if (localStorage.getItem(`linux-section-${i}`) === 'true') lcount++;
        if (localStorage.getItem('linux-quiz-passed') === 'true') lcount++;
        return lcount / 11;
      case 'security':
        let secCount = 0;
        for (let i = 1; i <= 9; i++) {
          if (localStorage.getItem(`security-section-${i}`) === 'true') secCount++;
        }
        if (localStorage.getItem('security-quiz-passed') === 'true') secCount++;
        return secCount / 10; // 9 sections + quiz
      case 'scripting':
        let sCount = 0;
        for (let i = 1; i <= 9; i++) {
          if (localStorage.getItem(`scripting-section-${i}`) === 'true') sCount++;
        }
        if (localStorage.getItem('scripting-quiz-passed') === 'true') sCount++;
        return sCount / 10; // 9 sections + quiz
      case 'databases': return 0;
      default: return 0;
    }
  }

  function getPhase2PillarCompletion(pillar) {
    // First check the binary key (set when all topics are checked)
    const binaryKey = `phase2-${pillar}`;
    if (localStorage.getItem(binaryKey) === 'true') return 1;
    
    // If binary key is not set, check topics individually
    const data = phase2PillarData[pillar];
    if (!data) return 0;
    
    let completedTopics = 0;
    for (let i = 0; i < data.topics.length; i++) {
      const key = `${data.topicPrefix}${i + 1}`;
      if (localStorage.getItem(key) === 'true') completedTopics++;
    }
    
    // If all topics are complete, set the binary key and return 1
    if (completedTopics === data.topics.length) {
      localStorage.setItem(binaryKey, 'true');
      return 1;
    }
    
    // Return progress as a fraction (0 to 1) for partial progress
    return completedTopics / data.topics.length;
  }

  function updateHeroStats() {
      const heroSpan = document.getElementById('heroPillarsComplete');
      if (!heroSpan) return;
      const pillars = ['networking', 'linux', 'security', 'scripting', 'databases'];
      let completedCount = 0;
      pillars.forEach(p => {
        if (getPhase1PillarCompletion(p) >= 0.8) completedCount++;
      });
      heroSpan.textContent = `${completedCount}/5`;
    }

  function updateMethodBadges() {
    const pillars = ['networking', 'linux', 'security', 'scripting', 'databases'];
    const badges = ['methodBadgeNetworking', 'methodBadgeLinux', 'methodBadgeSecurity', 'methodBadgeScripting', 'methodBadgeDatabases'];
    pillars.forEach((p, idx) => {
      const progress = getPhase1PillarCompletion(p);
      const badge = document.getElementById(badges[idx]);
      if (!badge) return;
      let icon, text;
      if (progress >= 0.8) {
        icon = '✅';
        text = p === 'networking' ? 'Networking' : p === 'linux' ? 'Linux & CLI' : p.charAt(0).toUpperCase() + p.slice(1);
      } else if (progress > 0) {
        icon = '⏳';
        text = p === 'networking' ? 'Networking' : p === 'linux' ? 'Linux & CLI' : p.charAt(0).toUpperCase() + p.slice(1);
      } else {
        icon = '🔒';
        text = p === 'networking' ? 'Networking' : p === 'linux' ? 'Linux & CLI' : p.charAt(0).toUpperCase() + p.slice(1);
      }
      badge.textContent = `${icon} ${text}`;
      // Update opacity/style – we can also set background
      if (progress === 0) badge.style.opacity = '0.6';
      else badge.style.opacity = '1';
    });
  }

  function updatePhase1HeaderTag() {
    const tag = document.getElementById('phase1StatusTag');
    if (!tag) return;
    const pillars = ['networking', 'linux', 'security', 'scripting', 'databases'];
    let total = 0;
    pillars.forEach(p => total += getPhase1PillarCompletion(p));
    const percent = (total / 5) * 100; // average percentage
    if (percent >= 99.5) {
      tag.textContent = 'COMPLETE';
      tag.classList.remove('locked-tag');
      tag.classList.add('complete-tag'); // you may need to style this
    } else {
      tag.textContent = 'IN PROGRESS';
      tag.classList.remove('complete-tag');
      tag.classList.add('locked-tag');
    }
  }

  // ============================================================
  // RENDER STATUS LIST (Phase 1 or Phase 2, depending on progress)
  // ============================================================
  function renderStatusList() {
    const container = document.getElementById('statusList');
    if (!container) return;

    const pillars = ['networking', 'linux', 'security', 'scripting', 'databases'];
    const names = {
      networking: 'Networking',
      linux: 'Linux & CLI',
      security: 'Security',
      scripting: 'Scripting',
      databases: 'Databases'
    };
    const icons = {
      networking: '🌐',
      linux: '🐧',
      security: '🔒',
      scripting: '⚙️',
      databases: '🗄️'
    };

    // Phase 2 data
    const phase2Pillars = ['docker', 'cicd', 'kubernetes', 'terraform', 'monitoring'];
    const phase2Names = {
      docker: 'Docker & Containers',
      cicd: 'CI/CD Pipelines',
      kubernetes: 'Kubernetes',
      terraform: 'IaC — Terraform & Ansible',
      monitoring: 'Monitoring & Observability'
    };
    const phase2Icons = {
      docker: '🐳',
      cicd: '🔁',
      kubernetes: '☸️',
      terraform: '🏗️',
      monitoring: '📊'
    };

    // --- Check if Phase 1 is complete (all pillars ≥ 80%) ---
    const phase1Complete = pillars.every(p => getPhase1PillarCompletion(p) >= 0.8);
    let itemsHtml = '';
    let nextMilestone = null;
    let anyIncomplete = false;

    if (phase1Complete) {
      // --- Phase 2 Status ---
      phase2Pillars.forEach((pillar, index) => {
        const completed = getPhase2PillarCompletion(pillar) === 1;
        const name = phase2Names[pillar] || pillar;
        const icon = phase2Icons[pillar] || '📌';
        let statusText;
        let statusClass;

        if (completed) {
          statusText = `<strong>Complete!</strong> All topics mastered. Ready for the next challenge. 🚀`;
          statusClass = 'complete';
        } else {
          // Not yet complete – check if it's the first incomplete (next milestone)
          const previousPillar = index > 0 ? phase2Pillars[index - 1] : null;
          const prevName = previousPillar ? phase2Names[previousPillar] : null;
          if (!anyIncomplete) {
            // This is the next milestone
            nextMilestone = pillar;
            anyIncomplete = true;
            statusText = `<strong>Next up:</strong> ${name}. The next big step in your DevOps journey. 🎯`;
            statusClass = 'next-up';
          } else {
            statusText = `Locked — will unlock once you've completed <strong>${nextMilestone ? phase2Names[nextMilestone] : 'the previous'}</strong>.`;
            statusClass = 'locked';
          }
        }

        itemsHtml += `
          <dt>${icon} ${name}</dt>
          <dd>${statusText}</dd>
        `;
      });

      // No next milestone means all Phase 2 complete!
      if (!anyIncomplete) {
        itemsHtml += `
          <dt>🏁 Next milestone</dt>
          <dd style="font-weight: 700; color: var(--accent-secondary);">
            🎉 All Phase 2 pillars are <strong>complete!</strong> You've finished the entire DevOps roadmap. You're now a full‑stack DevOps engineer! 🌟
          </dd>
        `;
      } else {
        // Add a next milestone entry for Phase 2
        const nextName = phase2Names[nextMilestone] || nextMilestone;
        const nextIcon = phase2Icons[nextMilestone] || '🏁';
        let nextText = '';
        if (nextMilestone === 'docker') {
          nextText = `🐳 Master Docker — containers are the foundation of modern deployment. Learn images, Dockerfile, Compose, and registries.`;
        } else if (nextMilestone === 'cicd') {
          nextText = `🔁 Automate everything with CI/CD. Dive into GitHub Actions, pipelines, and deployment automation.`;
        } else if (nextMilestone === 'kubernetes') {
          nextText = `☸️ Orchestrate at scale. Learn Pods, Services, Ingress, and Helm — the industry standard for container orchestration.`;
        } else if (nextMilestone === 'terraform') {
          nextText = `🏗️ Treat infrastructure as code. Terraform and Ansible will make you a master of provisioning and configuration.`;
        } else if (nextMilestone === 'monitoring') {
          nextText = `📊 Observe everything. Prometheus, Grafana, and logging stacks give you superpowers in production.`;
        }
        itemsHtml += `
          <dt style="font-weight: 700; color: var(--accent-secondary);">🏁 Next milestone</dt>
          <dd style="font-weight: 500; font-size: 0.95rem;">${nextText}</dd>
        `;
      }

    } else {
      // --- Phase 1 Status (as before, enhanced) ---
      pillars.forEach((pillar, index) => {
        const progress = getPhase1PillarCompletion(pillar);
        const percent = Math.round(progress * 100);
        const data = phase1PillarData[pillar];
        let statusText = '';
        let icon = icons[pillar] || '📌';

        if (data && !data.placeholder) {
          const totalSections = data.sections || 0;
          let completedSections = 0;
          for (let i = 1; i <= totalSections; i++) {
            if (localStorage.getItem(`${data.sectionPrefix}${i}`) === 'true') completedSections++;
          }
          const quizPassed = localStorage.getItem(data.quizKey) === 'true';
          const totalItems = totalSections + (data.quiz ? 1 : 0);
          const completedItems = completedSections + (quizPassed ? 1 : 0);

          if (percent >= 80) {
            icon = '🎉';
            statusText = `<strong>Complete!</strong> All ${totalSections} sections and the quiz are mastered. Ready for the next challenge! 🚀`;
          } else if (percent > 0) {
            icon = '⚡';
            const remaining = totalItems - completedItems;
            const nextAction = remaining > 0 ? `Keep going — you have ${remaining} more item${remaining > 1 ? 's' : ''} to finish.` : 'Almost there!';
            statusText = `<strong>${percent}% done</strong> — ${completedItems} of ${totalItems} items complete. ${nextAction}`;
          } else {
            icon = '🔒';
            const previousPillar = index > 0 ? pillars[index - 1] : null;
            const prevName = previousPillar ? names[previousPillar] : 'the previous';
            statusText = `Locked — will unlock once you've completed ${prevName} (≥80%). Stay tuned!`;
          }
        } else {
          icon = '🚧';
          statusText = `Coming soon! This pillar is not yet available.`;
        }

        itemsHtml += `
          <dt>${icon} ${names[pillar]}</dt>
          <dd>${statusText}</dd>
        `;

        // Determine next milestone (first incomplete phase1 with progress < 80)
        if (percent < 80 && !anyIncomplete) {
          nextMilestone = pillar;
          anyIncomplete = true;
        }
      });

      // --- Next milestone (Phase 1) ---
      let nextText = '';
      if (nextMilestone) {
        const nextName = names[nextMilestone] || nextMilestone;
        const data = phase1PillarData[nextMilestone];
        const percent = Math.round(getPhase1PillarCompletion(nextMilestone) * 100);

        if (nextMilestone === 'networking' && percent === 0) {
          nextText = `🚀 Start with Networking — the foundation of everything. Dive into OSI, IP, subnetting, and more!`;
        } else if (nextMilestone === 'linux' && percent < 80) {
          nextText = `🐧 Dive deeper into Linux! Master the command line, file system, permissions, and scripting. The cloud runs on Linux — own it!`;
        } else if (nextMilestone === 'security' && percent === 0) {
          nextText = `🔐 Ready to secure the world? After Linux, you'll tackle encryption, TLS, PKI, and OWASP. Essential for every DevOps engineer.`;
        } else if (nextMilestone === 'scripting' && percent === 0) {
          nextText = `⚙️ Automate everything! Scripting (Python + Bash) will make you unstoppable. Coming after Security.`;
        } else if (nextMilestone === 'databases' && percent === 0) {
          nextText = `🗄️ Data is the new oil. You'll learn SQL, NoSQL, ACID, and caching — critical for any application.`;
        } else {
          nextText = `Complete <strong>${nextName}</strong> to unlock the next stage. You're building a rock‑solid foundation! 💪`;
        }
      } else {
        // Phase 1 is complete — but this branch is only reached if phase1Complete is false, so this won't happen
        // (We have a separate Phase 1 complete check earlier)
        // But as a fallback:
        nextText = `🎉 All Phase 1 pillars are <strong>complete!</strong> You're ready to move on to Phase 2 — DevOps tools and cloud. Amazing work! 🌟`;
      }

      // Add next milestone entry with a special class for emphasis
      itemsHtml += `
        <dt style="font-weight: 700; color: var(--accent-secondary);">🏁 Next milestone</dt>
        <dd style="font-weight: 500; font-size: 0.95rem;">${nextText}</dd>
      `;
    }

    container.innerHTML = itemsHtml;
  }  

  function updateSidebarProgress() {
    const phase1Pillars = ['networking', 'linux', 'security', 'scripting', 'databases'];
    phase1Pillars.forEach(pillar => {
      const progress = getPhase1PillarCompletion(pillar);
      const percent = Math.round(progress * 100);
      const percentSpan = document.querySelector(`[data-pillar-progress="${pillar}"]`);
      if (percentSpan) percentSpan.textContent = `${percent}%`;
    });
    const phase2Pillars = ['docker', 'cicd', 'kubernetes', 'terraform', 'monitoring'];
    phase2Pillars.forEach(pillar => {
      const completed = getPhase2PillarCompletion(pillar);
      const percent = completed ? 100 : 0;
      const percentSpan = document.querySelector(`[data-phase2-progress="${pillar}"]`);
      if (percentSpan) percentSpan.textContent = `${percent}%`;
    });
  }

  function updatePhase1RoadmapAndCards() {
    const pillars = ['networking', 'linux', 'security', 'scripting', 'databases'];
    const titles = ['Networking Fundamentals', 'Linux & CLI Proficiency', 'Security Concepts', 'Scripting & Automation', 'Databases & Storage'];
    const descs = ['OSI model, IP addressing, subnetting, routing, DNS, TCP/UDP, security, RJ45 cabling',
                   'File system, permissions, SSH, bash scripting, systemd, text processing, networking commands',
                   'Cryptography fundamentals, Hashing & password security, TLS/SSL & the handshake, PKI & Certificate Authorities, Authentication vs Authorization, Network & system hardening',
                   'Python fundamentals, Functions % Modules, Bash Scripting, REST APIs, Working with APIs, JSON Parsing, Data Manipulation, Automation Patterns',
                   'SQL, NoSQL, indexing, ACID, caching, CAP theorem'];
    const icons = ['net', 'linux', 'sec', 'script', 'db'];
    const links = ['html/networking.html', 'html/linux.html', 'html/security.html', 'html/scripting.html', '#'];

    // Update roadmap phases
    const roadmapContainer = document.getElementById('phase1Roadmap');
    if (roadmapContainer) {
      roadmapContainer.innerHTML = pillars.map((p, idx) => {
        const progress = getPhase1PillarCompletion(p);
        let statusClass = 'locked';
        let statusText = 'LOCKED';
        if (progress >= 0.8) { statusClass = 'complete'; statusText = 'COMPLETE'; }
        else if (progress > 0) { statusClass = 'in-progress'; statusText = 'IN PROGRESS'; }
        return `<div class="phase-item ${statusClass}">
                  <div class="phase-dot" aria-hidden="true">${idx+1}</div>
                  <div class="phase-content">
                    <div class="phase-name">Pillar ${idx+1} — ${titles[idx]}</div>
                    <div class="phase-desc">${descs[idx]}</div>
                  </div>
                  <span class="phase-status">${statusText}</span>
                </div>`;
      }).join('');
    }

    // Update progress cards
    const cardsContainer = document.getElementById('phase1Cards');
    if (cardsContainer) {
      cardsContainer.innerHTML = pillars.map((p, idx) => {
        const progress = getPhase1PillarCompletion(p);
        let statusClass = 'locked-card';
        let statusBadge = 'Locked';
        let cardClass = 'pillar-card locked-card';
        let fillClass = 'not-started';
        if (progress >= 0.8) { cardClass = 'pillar-card complete'; statusClass = 'complete'; statusBadge = 'Complete'; fillClass = 'complete'; }
        else if (progress > 0) { cardClass = 'pillar-card in-progress'; statusClass = 'in-progress'; statusBadge = 'In Progress'; fillClass = 'active'; }
        const progressPercent = Math.round(progress * 100);
        const isDisabled = (progress === 0 && links[idx] === '#') ? 'aria-disabled="true" style="pointer-events:none;"' : '';
        return `<a href="${links[idx]}" class="${cardClass}" ${isDisabled}>
                  <div class="card-top">
                    <div class="card-icon ${icons[idx]}" aria-hidden="true">${icons[idx]==='net'?'🌐':icons[idx]==='linux'?'🐧':'🔒'}</div>
                    <span class="card-status-badge ${statusClass}">${statusBadge}</span>
                  </div>
                  <div><div class="card-number">Pillar 0${idx+1}</div><div class="card-title">${titles[idx]}</div></div>
                  <div class="card-desc">${descs[idx]}</div>
                  <div class="card-progress"><div class="card-progress-fill ${fillClass}" style="width:${progressPercent}%;"></div></div>
                  <div class="card-footer">
                    <div class="card-meta-pills"><span class="meta-pill">${progressPercent}% complete</span></div>
                    <div class="card-arrow" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg></div>
                  </div>
                </a>`;
      }).join('');
    }
  }

  // ============================================================
  // PHASE 2 — ROADMAP & CARDS (Fully Dynamic)
  // ============================================================
  function updatePhase2RoadmapAndCards() {
    const phases = ['docker', 'cicd', 'kubernetes', 'terraform', 'monitoring'];
    const titles = {
      docker: 'Docker & Containers',
      cicd: 'CI/CD Pipelines',
      kubernetes: 'Kubernetes',
      terraform: 'IaC — Terraform & Ansible',
      monitoring: 'Monitoring & Observability'
    };
    const descs = {
      docker: 'Images, containers, registries, Dockerfile, docker-compose',
      cicd: 'GitHub Actions, GitLab CI, Jenkins — automate everything',
      kubernetes: 'Pods, Services, Deployments, Ingress, ConfigMaps, Secrets',
      terraform: 'Infrastructure as Code, state management, modules, configuration management',
      monitoring: 'Prometheus, Grafana, logging stacks, alerting, distributed tracing'
    };
    const icons = {
      docker: '🐳',
      cicd: '🔁',
      kubernetes: '☸️',
      terraform: '🏗️',
      monitoring: '📊'
    };

    // --- Roadmap ---
    const roadmapContainer = document.getElementById('phase2Roadmap');
    if (roadmapContainer) {
      roadmapContainer.innerHTML = phases.map((p, idx) => {
        const completed = getPhase2PillarCompletion(p) === 1;
        const progress = getPhase2PillarCompletion(p);
        const statusClass = completed ? 'complete' : (progress > 0 ? 'in-progress' : 'locked');
        const statusText = completed ? '✅ COMPLETE' : (progress > 0 ? '⏳ IN PROGRESS' : '🔒 LOCKED');

        return `<div class="phase-item ${statusClass}">
                  <div class="phase-dot" aria-hidden="true">${idx + 1}</div>
                  <div class="phase-content">
                    <div class="phase-name">Phase 2 · ${idx + 1} — ${titles[p]}</div>
                    <div class="phase-desc">${descs[p]}</div>
                  </div>
                  <span class="phase-status">${statusText}</span>
                </div>`;
      }).join('');
    }

    // --- Cards ---
    const cardsContainer = document.getElementById('phase2Cards');
    if (cardsContainer) {
      cardsContainer.innerHTML = phases.map((p, idx) => {
        const completed = getPhase2PillarCompletion(p) === 1;
        const progress = getPhase2PillarCompletion(p);
        const data = phase2PillarData[p];

        // Count completed topics for this pillar
        let completedTopics = 0;
        const totalTopics = data ? data.topics.length : 0;
        if (data) {
          for (let i = 0; i < data.topics.length; i++) {
            const key = `${data.topicPrefix}${i + 1}`;
            if (localStorage.getItem(key) === 'true') completedTopics++;
          }
        }

        const percent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
        const isComplete = completed || percent >= 100;

        const cardClass = isComplete ? 'pillar-card complete' : (percent > 0 ? 'pillar-card in-progress' : 'pillar-card locked-card');
        const statusClass = isComplete ? 'complete' : (percent > 0 ? 'in-progress' : 'locked-badge');
        const statusText = isComplete ? '✅ Complete' : (percent > 0 ? `⏳ ${percent}%` : '🔒 Locked');
        const fillClass = isComplete ? 'complete' : (percent > 0 ? 'active' : 'not-started');

        const icon = icons[p] || '📌';
        const title = titles[p] || p;
        const desc = descs[p] || '';

        return `<div class="${cardClass}" data-phase2="${p}">
                  <div class="card-top">
                    <div class="card-icon ${p}" aria-hidden="true">${icon}</div>
                    <span class="card-status-badge ${statusClass}">${statusText}</span>
                  </div>
                  <div>
                    <div class="card-number">Phase 2 · ${String(idx + 1).padStart(2, '0')}</div>
                    <div class="card-title">${title}</div>
                  </div>
                  <div class="card-desc">${desc}</div>
                  <div class="card-progress">
                    <div class="card-progress-fill ${fillClass}" style="width:${percent}%;"></div>
                  </div>
                  <div class="card-footer">
                    <div class="card-meta-pills">
                      <span class="meta-pill">${percent}% complete</span>
                      <span class="meta-pill">${completedTopics}/${totalTopics} topics</span>
                    </div>
                    ${isComplete ? `<div class="card-arrow" aria-hidden="true">✓</div>` : `<div class="card-arrow" aria-hidden="true">→</div>`}
                  </div>
                </div>`;
      }).join('');
    }
  }

  function updateFloatingRings() {
    // Global floating ring (overall progress: 50% Phase1 + 50% Phase2)
    const phase1Pillars = ['networking','linux','security','scripting','databases'];
    let phase1Sum = 0;
    phase1Pillars.forEach(p => phase1Sum += getPhase1PillarCompletion(p));
    const phase1Avg = phase1Sum / 5;
    const phase2Pillars = ['docker','cicd','kubernetes','terraform','monitoring'];
    let phase2Sum = 0;
    phase2Pillars.forEach(p => phase2Sum += getPhase2PillarCompletion(p));
    const phase2Avg = phase2Sum / 5;
    const overall = (phase1Avg * 0.5 + phase2Avg * 0.5) * 100;
    const overallPercent = Math.round(overall);
    const globalRingFill = document.querySelector('.global-ring-fill');
    const globalPercentSpan = document.getElementById('globalRingPercent');
    if (globalRingFill && globalPercentSpan) {
      const circumference = 2 * Math.PI * 26;
      const offset = circumference - (overallPercent / 100) * circumference;
      globalRingFill.style.strokeDasharray = circumference;
      globalRingFill.style.strokeDashoffset = offset;
      globalPercentSpan.textContent = `${overallPercent}%`;
    }

    // Phase1 modal ring
    const phase1Total = phase1Sum * 20;
    const phase1Percent = Math.round(phase1Total);
    const phase1RingFill = document.querySelector('.phase1-ring-fill');
    const phase1ModalPercent = document.getElementById('phase1ModalPercent');
    if (phase1RingFill && phase1ModalPercent) {
      const circumference = 490.09;
      const offset = circumference - (phase1Percent / 100) * circumference;
      phase1RingFill.style.strokeDasharray = circumference;
      phase1RingFill.style.strokeDashoffset = offset;
      phase1ModalPercent.textContent = `${phase1Percent}%`;
    }

    // Phase2 modal ring
    const phase2Percent = Math.round(phase2Avg * 100);
    const phase2RingFill = document.querySelector('.phase2-ring-modal');
    const phase2ModalPercent = document.getElementById('phase2ModalPercent');
    if (phase2RingFill && phase2ModalPercent) {
      const circumference = 490.09;
      const offset = circumference - (phase2Percent / 100) * circumference;
      phase2RingFill.style.strokeDasharray = circumference;
      phase2RingFill.style.strokeDashoffset = offset;
      phase2ModalPercent.textContent = `${phase2Percent}%`;
    }

    // Overall modal ring
    const overallModalRing = document.querySelector('.overall-ring-fill');
    const overallModalPercentSpan = document.getElementById('overallRingPercent');
    if (overallModalRing && overallModalPercentSpan) {
      const circumference = 490.09;
      const offset = circumference - (overallPercent / 100) * circumference;
      overallModalRing.style.strokeDasharray = circumference;
      overallModalRing.style.strokeDashoffset = offset;
      overallModalPercentSpan.textContent = `${overallPercent}%`;
    }
  }

  function updateAllUI() {
    updateSidebarProgress();
    updatePhase1RoadmapAndCards();
    updatePhase2RoadmapAndCards();
    updateFloatingRings();
    updateHeroStats();
    updateMethodBadges();
    updatePhase1HeaderTag();
    renderStudyPath();
    renderStatusList();
  }

  function initModalAndFloatingRing() {
    const floatingRing = document.getElementById('globalFloatingRing');
    const modal = document.getElementById('progressModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const closeFooter = document.getElementById('modalCloseFooter');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    function openModal() { if (modal) modal.style.display = 'flex'; }
    function closeModal() { if (modal) modal.style.display = 'none'; }

    if (floatingRing) floatingRing.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeFooter) closeFooter.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.style.display === 'flex') closeModal(); });
    }

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
        
        // In your tab click handler (inside initModalAndFloatingRing)
        if (tabId === 'tab4') {
          if (typeof createAndRenderBackupTab === 'function') {
            createAndRenderBackupTab();
          }
        }
        
        if (tabId === 'tab1') setTimeout(() => centerPhase1Arrow(), 50);
        if (tabId === 'tab2') setTimeout(() => centerPhase2Arrow(), 50);
      });
    });

    // Complete backup tab function definition
  function createAndRenderBackupTab() {
    const container = document.getElementById('backupContainer');
    if (!container) {
      console.error('backupContainer not found');
      return;
    }
    
    const savedToken = localStorage.getItem('github-token') || '';
    const savedGistId = localStorage.getItem('github-gist-id') || '';
    
    container.innerHTML = `
      <div class="backup-tab-header">
        <h4>💾 Backup & Sync Your Progress</h4>
        <p>Save your study progress to a private GitHub Gist and restore it on any device.</p>
      </div>
      
      <div class="backup-status-card">
        <div class="backup-status-item">
          <span class="status-label">GitHub Token:</span>
          <span class="status-value ${savedToken ? 'configured' : 'missing'}">
            ${savedToken ? '✓ Configured' : '⚠️ Not configured'}
          </span>
        </div>
        <div class="backup-status-item">
          <span class="status-label">Gist ID:</span>
          <span class="status-value ${savedGistId ? 'configured' : 'missing'}">
            ${savedGistId ? savedGistId.substring(0, 16) + '…' : 'Not set (will be created on first backup)'}
          </span>
        </div>
      </div>
      
      <div class="backup-settings">
        <h5>⚙️ GitHub Settings</h5>
        <div class="backup-form-group">
          <label for="backupTokenInput">Personal Access Token</label>
          <input type="password" id="backupTokenInput" placeholder="github_pat__xxxxxxxxxxxx" value="${savedToken}">
          <small>Create a <a href="https://github.com/settings/tokens" target="_blank" rel="noopener">token</a> with <strong>gist</strong> scope only.</small>
        </div>
        <div class="backup-form-group">
          <label for="backupGistIdInput">Gist ID (optional)</label>
          <input type="text" id="backupGistIdInput" placeholder="Leave empty for new Gist" value="${savedGistId}">
          <small>If you already have a backup Gist, enter its ID here.</small>
        </div>
        <button id="saveBackupSettingsBtn" class="btn btn-primary btn-sm">Save Settings</button>
      </div>
      
      <div class="backup-actions">
        <h5>📦 Backup & Restore</h5>
        <div class="backup-button-group">
          <button id="backupNowBtn" class="btn btn-primary">
            <span class="btn-icon">📤</span> Backup to Gist
          </button>
          <button id="restoreNowBtn" class="btn btn-secondary">
            <span class="btn-icon">📥</span> Restore from Gist
          </button>
        </div>
        <p class="backup-note">⚠️ Restore will overwrite your current progress. Make sure to backup first!</p>
      </div>
      <div class="backup-info">
        <h5>ℹ️ How to set up GitHub Backup (Fine-grained Token)</h5>
        <ol style="margin: 0.5rem 0 0 1.2rem; font-size: 0.75rem;">
          <li>Go to <a href="https://github.com/settings/tokens?type=beta" target="_blank">GitHub Fine-grained Tokens</a></li>
          <li>Click "Generate new token"</li>
          <li>Name it "Great Cheatsheets Backup"</li>
          <li>Set expiration (90 days or No expiration)</li>
          <li>Repository access: <strong>Public Repositories (read-only)</strong></li>
          <li><strong>SCROLL DOWN</strong> to "Repository permissions"</li>
          <li>Go to account permissions and find <strong>GISTS</strong> → Set to <strong>Read and write</strong> ⚠️</li>
          <li>All other permissions leave as "No access"</li>
          <li>Generate and copy the token (starts with <code>github_pat_</code>)</li>
          <li>Paste it above and click Save Settings</li>
          <li>Click "Backup to Gist" – your Gist ID will be saved automatically</li>
        </ol>
        <div class="backup-tip" style="margin-top: 0.75rem; padding: 0.5rem; background: rgba(83,70,212,0.1); border-radius: var(--radius-sm);">
          <strong>💡 Tip:</strong> The token is stored only in your browser. Keep your Gist ID to restore on other devices.
        </div>
    </div>
    `;
    
    // Save settings
    document.getElementById('saveBackupSettingsBtn')?.addEventListener('click', () => {
      const token = document.getElementById('backupTokenInput')?.value.trim() || '';
      const gistId = document.getElementById('backupGistIdInput')?.value.trim() || '';
      if (token) localStorage.setItem('github-token', token);
      if (gistId) localStorage.setItem('github-gist-id', gistId);
      alert('Settings saved! Click Backup to save your progress.');
      createAndRenderBackupTab(); // refresh
    });
    
    // Backup
    document.getElementById('backupNowBtn')?.addEventListener('click', async () => {
      const token = localStorage.getItem('github-token');
      if (!token) {
        alert('Please configure GitHub token first');
        return;
      }
      
      const progress = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('gc-') || key.includes('-section-') || key.includes('-quiz-') || key.includes('-passed'))) {
          progress[key] = localStorage.getItem(key);
        }
      }
      
      const gistId = localStorage.getItem('github-gist-id');
      
      try {
        let url = 'https://api.github.com/gists';
        let method = 'POST';
        let body = {
          description: `Great Cheatsheets Progress - ${new Date().toLocaleDateString()}`,
          public: false,
          files: { 'great-cheatsheets-progress.json': { content: JSON.stringify(progress, null, 2) } }
        };
        
        if (gistId) {
          url = `https://api.github.com/gists/${gistId}`;
          method = 'PATCH';
          body = { files: { 'great-cheatsheets-progress.json': { content: JSON.stringify(progress, null, 2) } } };
        }
        
        const response = await fetch(url, {
          method,
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        
        const data = await response.json();
        if (data.id) {
          if (!gistId) localStorage.setItem('github-gist-id', data.id);
          alert('✅ Backup successful! Gist ID saved.');
          createAndRenderBackupTab();
        } else {
          alert('❌ Backup failed: ' + JSON.stringify(data));
        }
      } catch (err) {
        alert('❌ Error: ' + err.message);
      }
    });
    
    // Restore
    document.getElementById('restoreNowBtn')?.addEventListener('click', async () => {
      const token = localStorage.getItem('github-token');
      const gistId = localStorage.getItem('github-gist-id');
      if (!token || !gistId) {
        alert('Please configure token and Gist ID first');
        return;
      }
      
      try {
        const response = await fetch(`https://api.github.com/gists/${gistId}`, {
          headers: { 'Authorization': `token ${token}` }
        });
        const data = await response.json();
        const content = data.files['great-cheatsheets-progress.json']?.content;
        if (content) {
          const progress = JSON.parse(content);
          let count = 0;
          Object.entries(progress).forEach(([key, value]) => {
            if (key !== 'github-token' && key !== 'github-gist-id') {
              localStorage.setItem(key, value);
              count++;
            }
          });
          alert(`✅ Restored ${count} items! Refresh the page.`);
          location.reload();
        } else {
          alert('No backup data found');
        }
      } catch (err) {
        alert('❌ Restore failed: ' + err.message);
      }
    });
  }

  // Now render the backup UI
  createAndRenderBackupTab();
  console.log('Backup tab rendered!');  

    // Scroller navigation
    const phase1Scroller = document.getElementById('phase1ModalScroller');
    const phase1Prev = document.getElementById('phase1ModalPrev');
    const phase1Next = document.getElementById('phase1ModalNext');
    if (phase1Prev && phase1Next && phase1Scroller) {
      phase1Prev.addEventListener('click', () => phase1Scroller.scrollBy({ left: -180, behavior: 'smooth' }));
      phase1Next.addEventListener('click', () => phase1Scroller.scrollBy({ left: 180, behavior: 'smooth' }));
    }

    const phase2Scroller = document.getElementById('phase2ModalScroller');
    const phase2Prev = document.getElementById('phase2ModalPrev');
    const phase2Next = document.getElementById('phase2ModalNext');
    if (phase2Prev && phase2Next && phase2Scroller) {
      phase2Prev.addEventListener('click', () => phase2Scroller.scrollBy({ left: -180, behavior: 'smooth' }));
      phase2Next.addEventListener('click', () => phase2Scroller.scrollBy({ left: 180, behavior: 'smooth' }));
    }

    function centerPhase1Arrow() {
      const activeChip = document.querySelector('#phase1ModalTrack .pillar-chip.active');
      const arrow = document.getElementById('phase1ModalArrow');
      if (!activeChip || !arrow || !phase1Scroller) return;
      const chipRect = activeChip.getBoundingClientRect();
      const scrollerRect = phase1Scroller.getBoundingClientRect();
      const relativeLeft = chipRect.left + chipRect.width/2 - scrollerRect.left;
      arrow.style.left = `${relativeLeft}px`;
      const scrollNeeded = chipRect.left - scrollerRect.left + phase1Scroller.scrollLeft - 20;
      phase1Scroller.scrollTo({ left: scrollNeeded, behavior: 'smooth' });
    }
    function centerPhase2Arrow() {
      const activeChip = document.querySelector('#phase2ModalTrack .pillar-chip.active');
      const arrow = document.getElementById('phase2ModalArrow');
      if (!activeChip || !arrow || !phase2Scroller) return;
      const chipRect = activeChip.getBoundingClientRect();
      const scrollerRect = phase2Scroller.getBoundingClientRect();
      const relativeLeft = chipRect.left + chipRect.width/2 - scrollerRect.left;
      arrow.style.left = `${relativeLeft}px`;
      const scrollNeeded = chipRect.left - scrollerRect.left + phase2Scroller.scrollLeft - 20;
      phase2Scroller.scrollTo({ left: scrollNeeded, behavior: 'smooth' });
    }
    setTimeout(() => { centerPhase1Arrow(); centerPhase2Arrow(); }, 200);
    window.addEventListener('resize', () => { centerPhase1Arrow(); centerPhase2Arrow(); });
  }

  function showComingSoonToast(pillarName) {
    // Get or create the toast container
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    // Create the toast
    const toast = document.createElement('div');
    toast.className = 'toast-item coming-soon-toast';
    toast.textContent = `${pillarName} — page coming soon after the previous pillars are complete`;
    toast.style.background = 'var(--accent-primary)';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '40px';
    toast.style.fontSize = '0.8rem';
    toast.style.fontWeight = '500';
    toast.style.boxShadow = 'var(--shadow-md)';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '8px';

    // Add a lock icon
    const icon = document.createElement('span');
    icon.textContent = '🔒';
    toast.prepend(icon);

    container.appendChild(toast);

    // Auto-dismiss after 2.5 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px) scale(0.95)';
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      setTimeout(() => {
        toast.remove();
        // Remove container if empty
        if (container.children.length === 0) {
          container.remove();
        }
      }, 300);
    }, 2500);
  }

  function initGlobalKeyboard() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      window.addEventListener('keydown', (e) => {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
        if (e.key === '/') { e.preventDefault(); searchInput.focus(); searchInput.select(); }
        if (e.key === 'Escape') {
          if (sidebar?.classList.contains('open')) { sidebar.classList.remove('open'); overlay?.classList.remove('show'); }
          searchInput.blur();
        }
      });
    }
  }

  // ============================================================
  // KEYBOARD SHORTCUTS – Pillar Page Navigation (1-9, 0)
  // ============================================================

  function initPillarKeyboardShortcuts() {
    // Only run on pages that have section navigation (pillar pages)
    // Check for the existence of #s1 or #overview which are unique to pillar pages
    const hasSections = document.getElementById('s1') || document.getElementById('overview');
    if (!hasSections) return;

    document.addEventListener('keydown', function(e) {
      // Ignore if the user is typing in an input, textarea, or select
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        return;
      }

      const key = e.key;

      // Check for number keys 1-9 → scroll to #s1 ... #s9
      if (key >= '1' && key <= '9') {
        const targetId = `s${key}`;
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Optional: highlight the section briefly
          targetElement.style.transition = 'background 0.3s ease';
          targetElement.style.background = 'var(--pillar-color-light)';
          setTimeout(() => {
            targetElement.style.background = '';
          }, 1500);
        }
        return;
      }

      // Check for '0' key → go to overview
      if (key === '0') {
        const targetElement = document.getElementById('overview');
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Optional: highlight the section briefly
          targetElement.style.transition = 'background 0.3s ease';
          targetElement.style.background = 'var(--pillar-color-light)';
          setTimeout(() => {
            targetElement.style.background = '';
          }, 1500);
        }
      }
    });
  }

  function ensureModalExists() {
    if (document.getElementById('progressModal')) return;
    
    const modalHTML = `
      <div id="progressModal" class="progress-modal" style="display: none;" role="dialog" aria-modal="true">
        <div class="progress-modal-content">
          <div class="progress-modal-header">
            <h3>📊 Global Progress Dashboard</h3>
            <button class="modal-close" id="closeModalBtn">&times;</button>
          </div>
          <div class="progress-modal-tabs">
            <button class="tab-button" data-tab="tab3">Pillar Details</button>
            <button class="tab-button" data-tab="tab4">💾 Backup</button>
            <button class="tab-button" data-tab="tab5">✨ Stars</button>
            <button class="tab-button" data-tab="tab6">🎨 Themes</button>
            <button class="tab-button" data-tab="tab7" style="display:none;">🎨 Custom Color</button>
          </div>
          <div class="tab-pane active" id="tab0">...</div>
          <div class="tab-pane" id="tab1">...</div>
          <div class="tab-pane" id="tab2">...</div>
          <div class="tab-pane" id="tab3">
            <div id="pillarDetailContainer" style="min-height: 200px;">...</div>
          </div>
          <div class="tab-pane" id="tab4">
            <div id="backupContainer" class="backup-tab-content"></div>
          </div>
          <!-- ============================================================ -->
          <!-- TAB 5: STARS, SNOW CUSTOMIZATION & ADVANCED SETTINGS         -->
          <!-- ============================================================ -->
          <div class="tab-pane" id="tab5">
            <div class="stars-tab-container">
              
              <!-- 🎯 Animation Mode Selector (Top) -->
              <div class="mode-selector-top">
                <label for="snowModeSelect">🎯 Animation Mode:</label>
                <select id="snowModeSelect">
                  <option value="stars">✨ Stars Only</option>
                  <option value="snow">❄️ Snow Only</option>
                  <option value="both">🌌 Both</option>
                </select>
                <span class="mode-hint">Choose what shows on the background</span>
              </div>

              <!-- ✨ Starfield Section -->
              <details class="star-container" open>
                <summary>✨ Starfield Presets</summary>
                <div class="star-content">
                  <p class="star-description">Choose a starfield style or customize your own. Changes apply instantly.</p>
                  
                  <div class="star-preset-grid">
                    <button class="star-preset-btn active" data-preset="calm">
                      <span class="preset-icon">🌙</span>
                      <span class="preset-name">Calm Night</span>
                      <span class="preset-desc">Gentle, serene</span>
                    </button>
                    <button class="star-preset-btn" data-preset="active">
                      <span class="preset-icon">🌌</span>
                      <span class="preset-name">Active</span>
                      <span class="preset-desc">Lively drift</span>
                    </button>
                    <button class="star-preset-btn" data-preset="minimal">
                      <span class="preset-icon">⭐</span>
                      <span class="preset-name">Minimal</span>
                      <span class="preset-desc">Clean & simple</span>
                    </button>
                    <button class="star-preset-btn" data-preset="constellation">
                      <span class="preset-icon">🔭</span>
                      <span class="preset-name">Constellation</span>
                      <span class="preset-desc">Rich connections</span>
                    </button>
                    <button class="star-preset-btn" data-preset="dense">
                      <span class="preset-icon">🌠</span>
                      <span class="preset-name">Dense</span>
                      <span class="preset-desc">Full starfield</span>
                    </button>
                    <button class="star-preset-btn" data-preset="off">
                      <span class="preset-icon">🚫</span>
                      <span class="preset-name">Off</span>
                      <span class="preset-desc">Disable stars</span>
                    </button>
                  </div>

                  <details class="star-customize">
                    <summary>⚙️ Customize</summary>
                    <div class="star-custom-controls">
                      <div class="custom-controls-grid">
                        <div class="star-control-group">
                          <label>Star Count: <span id="starCountDisplay">150</span></label>
                          <input type="range" id="starCountSlider" min="50" max="400" value="150" step="10">
                        </div>
                        <div class="star-control-group">
                          <label>Twinkle Speed: <span id="twinkleSpeedDisplay">0.008</span></label>
                          <input type="range" id="twinkleSpeedSlider" min="0" max="0.05" value="0.008" step="0.001">
                        </div>
                        <div class="star-control-group">
                          <label>Movement Speed: <span id="movementSpeedDisplay">0.00001</span></label>
                          <input type="range" id="movementSpeedSlider" min="0" max="0.02" value="0.00001" step="0.0001">
                        </div>
                        <div class="star-control-group">
                          <label>Connection Distance: <span id="connectionDistanceDisplay">350</span></label>
                          <input type="range" id="connectionDistanceSlider" min="0" max="600" value="350" step="10">
                        </div>
                        <div class="star-control-group full-width">
                          <label>Brightness: <span id="brightnessDisplay">100%</span></label>
                          <input type="range" id="brightnessSlider" min="20" max="200" value="100" step="1">
                        </div>
                      </div>
                      <button class="btn btn-primary btn-sm" id="applyCustomStars">Apply Custom</button>
                    </div>
                  </details>
                </div>
              </details>

              <!-- ❄️ Snowfield Section -->
              <details class="snow-container">
                <summary>❄️ Snowfield Presets</summary>
                <div class="snow-content">
                  <p class="snow-description">Choose a snow style or customize your own. Changes apply instantly.</p>
                  
                  <div class="snow-preset-grid">
                    <button class="snow-preset-btn" data-snow-preset="lightFlurry">
                      <span class="preset-icon">❄️</span>
                      <span class="preset-name">Light Flurry</span>
                      <span class="preset-desc">Gentle flakes</span>
                    </button>
                    <button class="snow-preset-btn" data-snow-preset="gentle">
                      <span class="preset-icon">🌨️</span>
                      <span class="preset-name">Gentle</span>
                      <span class="preset-desc">Soft falling</span>
                    </button>
                    <button class="snow-preset-btn active" data-snow-preset="moderate">
                      <span class="preset-icon">❄️</span>
                      <span class="preset-name">Moderate</span>
                      <span class="preset-desc">Steady snow</span>
                    </button>
                    <button class="snow-preset-btn" data-snow-preset="heavy">
                      <span class="preset-icon">🌨️</span>
                      <span class="preset-name">Heavy</span>
                      <span class="preset-desc">Dense fall</span>
                    </button>
                    <button class="snow-preset-btn" data-snow-preset="blizzard">
                      <span class="preset-icon">❄️</span>
                      <span class="preset-name">Blizzard</span>
                      <span class="preset-desc">Intense</span>
                    </button>
                    <button class="snow-preset-btn" data-snow-preset="off">
                      <span class="preset-icon">🚫</span>
                      <span class="preset-name">Off</span>
                      <span class="preset-desc">Disable snow</span>
                    </button>
                  </div>

                  <details class="snow-customize">
                    <summary>⚙️ Customize Snow</summary>
                    <div class="snow-custom-controls">
                      <div class="custom-controls-grid">
                        <div class="snow-control-group">
                          <label>Snowflake Count: <span id="snowCountDisplay">200</span></label>
                          <input type="range" id="snowCountSlider" min="20" max="500" value="200" step="10">
                        </div>
                        <div class="snow-control-group">
                          <label>Fall Speed: <span id="snowSpeedDisplay">1.0</span></label>
                          <input type="range" id="snowSpeedSlider" min="0.1" max="3.0" value="1.0" step="0.1">
                        </div>
                        <div class="snow-control-group">
                          <label>Snowflake Size: <span id="snowSizeDisplay">3</span></label>
                          <input type="range" id="snowSizeSlider" min="1" max="8" value="3" step="0.5">
                        </div>
                        <div class="snow-control-group">
                          <label>Wind Strength: <span id="snowWindDisplay">0.5</span></label>
                          <input type="range" id="snowWindSlider" min="0" max="2.0" value="0.5" step="0.1">
                        </div>
                        <div class="snow-control-group full-width">
                          <label>Opacity: <span id="snowOpacityDisplay">0.9</span></label>
                          <input type="range" id="snowOpacitySlider" min="0.1" max="1.0" value="0.9" step="0.05">
                        </div>
                      </div>
                      <button class="btn btn-primary btn-sm" id="snowApplyBtn">Apply Snow Settings</button>
                    </div>
                  </details>
                </div>
              </details>

              <!-- ⚙️ Advanced Settings -->
              <div class="star-advanced-settings">
                <details class="advanced-settings-container">
                  <summary>⚙️ Advanced Settings</summary>
                  <div class="advanced-settings-content">
                    <div class="select-group">
                      <label for="fontFamilySelect">Font Family:</label>
                      <select id="fontFamilySelect" class="styled-select">
                        <option value="Syne">Syne</option>
                        <option value="DM Sans">DM Sans</option>
                        <option value="JetBrains Mono">JetBrains Mono</option>
                        <option value="custom">Custom</option>
                      </select>
                      <span class="hint">(Choose your preferred font)</span>
                    </div>
                    <div class="custom-font-input" id="customFontInput">
                      <input type="text" id="customFontURL" placeholder="https://fonts.googleapis.com/css2?family=Inter">
                      <button id="loadCustomFontBtn">Load Font</button>
                    </div>

                    <div class="setting-group">
                      <label>
                        <span class="setting-label">Font Size</span>
                        <input type="range" id="fontSizeSlider" min="12" max="24" value="16">
                        <span class="setting-value" id="fontSizeDisplay">16px</span>
                      </label>
                    </div>

                    <hr class="settings-divider">

                    <div class="import-export-buttons">
                      <button id="exportSettingsBtn" class="btn btn-primary btn-sm">📤 Export Settings</button>
                      <button id="importSettingsBtn" class="btn btn-secondary btn-sm">📥 Import Settings</button>
                      <input type="file" id="importFileInput" accept=".json">
                    </div>
                    <p class="import-export-note">Export/Import all your settings (theme, star presets, fonts) as JSON.</p>
                  </div>
                </details>
              </div>

            </div>
          </div>          
          <div class="tab-pane" id="tab6">
            <div class="themes-container" style="padding: 0 1rem;">
              <h4 style="margin-bottom: 0.5rem;">🎨 Color Themes</h4>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
                Choose a color theme for the entire site. Click a theme to preview, then Apply to save.
              </p>
              <div class="theme-grid" id="themeGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.75rem; max-height: 350px; overflow-y: auto; padding-right: 0.5rem;">
                <!-- Theme cards will be rendered by JavaScript -->
              </div>
              <div style="display: flex; gap: 0.75rem; justify-content: center; margin-top: 1rem;">
                <button id="openCustomColorBtn" class="btn btn-secondary btn-sm" title="Create your own custom color theme">🎨 Custom Color</button>
                <button id="resetThemeBtn" class="btn btn-secondary btn-sm" title="Reset to Indigo Theme">Reset to Default</button>
              </div>
            </div>
          </div>
          <!-- Tab 7: Custom Color Editor (hidden from tabs, accessed via button) -->
          <div class="tab-pane" id="tab7">
            <div class="custom-color-editor" id="customColorEditor">
              <div id="customColorEditorContent">
                <div class="editor-header">
                  <h4>🎨 Custom Color Editor</h4>
                  <button id="closeCustomColorBtn" class="btn btn-secondary btn-sm" title="Back to Themes">← Back to Themes</button>
                </div>
                <div id="colorEditorBody">
                  <!-- Loaded by JavaScript -->
                  <p style="text-align: center; color: var(--text-muted); padding: 2rem;">Loading color editor...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    initModalAndFloatingRing();
  }

  // Modify openModalToPillarDetails to ensure modal exists
  function openModalToPillarDetails(pillarId, phase) {
    ensureModalExists();
    const modal = document.getElementById('progressModal');
    if (!modal) return;
    
    modal.style.display = 'flex';
    const tabButton = document.querySelector('.tab-button[data-tab="tab3"]');
    if (tabButton) tabButton.click();
    showPillarDetail(pillarId, phase);
  }

  // ============================================================
  // BACKUP TAB UI (rendered inside modal)
  // ============================================================
  
  function renderBackupTab() {
    const container = document.getElementById('backupContainer');
    if (!container) return;
    
    const savedToken = localStorage.getItem('github-token') || '';
    const savedGistId = localStorage.getItem('github-gist-id') || '';
    
    container.innerHTML = `
      <div class="backup-tab-header">
        <h4>💾 Backup & Sync Your Progress</h4>
        <p>Save your study progress to a private GitHub Gist and restore it on any device.</p>
      </div>
      
      <div class="backup-status-card">
        <div class="backup-status-item">
          <span class="status-label">GitHub Token:</span>
          <span class="status-value ${savedToken ? 'configured' : 'missing'}">
            ${savedToken ? '✓ Configured' : '⚠️ Not configured'}
          </span>
        </div>
        <div class="backup-status-item">
          <span class="status-label">Gist ID:</span>
          <span class="status-value ${savedGistId ? 'configured' : 'missing'}">
            ${savedGistId ? savedGistId.substring(0, 16) + '…' : 'Not set (will be created on first backup)'}
          </span>
        </div>
      </div>
      
      <div class="backup-settings">
        <h5>⚙️ GitHub Settings</h5>
        <div class="backup-form-group">
          <label for="backupTokenInput">Personal Access Token</label>
          <input type="password" id="backupTokenInput" placeholder="github_pat_xxxxxxxxxxxx" value="${savedToken}">
          <small>Create a <a href="https://github.com/settings/tokens" target="_blank" rel="noopener">token</a> with <strong>gist</strong> scope only.</small>
        </div>
        <div class="backup-form-group">
          <label for="backupGistIdInput">Gist ID (optional)</label>
          <input type="text" id="backupGistIdInput" placeholder="Leave empty for new Gist" value="${savedGistId}">
          <small>If you already have a backup Gist, enter its ID here.</small>
        </div>
        <button id="saveBackupSettingsBtn" class="btn btn-primary btn-sm">Save Settings</button>
      </div>
      
      <div class="backup-actions">
        <h5>📦 Backup & Restore</h5>
        <div class="backup-button-group">
          <button id="backupNowBtn" class="btn btn-primary">
            <span class="btn-icon">📤</span> Backup to Gist
          </button>
          <button id="restoreNowBtn" class="btn btn-secondary">
            <span class="btn-icon">📥</span> Restore from Gist
          </button>
        </div>
        <p class="backup-note">⚠️ Restore will overwrite your current progress. Make sure to backup first!</p>
      </div>
      
      <div class="backup-info">
        <h5>ℹ️ How it works</h5>
        <ul>
          <li><strong>Token:</strong> Stored only in your browser (localStorage)</li>
          <li><strong>Gist:</strong> Private Gist created in your GitHub account</li>
          <li><strong>Data backed up:</strong> Quiz scores, section completion, welcome messages, and all progress</li>
          <li><strong>Sync:</strong> Use the same token and Gist ID on another device to restore</li>
        </ul>
      </div>
    `;
    
    // Attach event listeners
    document.getElementById('saveBackupSettingsBtn')?.addEventListener('click', saveBackupSettings);
    document.getElementById('backupNowBtn')?.addEventListener('click', () => backupToGist(true));
    document.getElementById('restoreNowBtn')?.addEventListener('click', restoreFromGist);
  }
  
  function saveBackupSettings() {
    const token = document.getElementById('backupTokenInput')?.value.trim() || '';
    const gistId = document.getElementById('backupGistIdInput')?.value.trim() || '';
    
    if (token) {
      GIST_CONFIG.token = token;
      localStorage.setItem('github-token', token);
    }
    if (gistId) {
      GIST_CONFIG.gistId = gistId;
      localStorage.setItem('github-gist-id', gistId);
    }
    
    // Re-render the backup tab to show updated status
    renderBackupTab();
    showToast('Settings saved! You can now backup your progress.', 'success');
  }
  
  // Modified backupToGist function (add silent parameter to control toast)
  async function backupToGist(silent = false) {
    if (!GIST_CONFIG.token) {
      showToast('Please configure GitHub token in Backup tab first', 'error');
      return;
    }

    // Collect all progress data from localStorage
    const progress = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('gc-') || key.includes('-section-') || 
          key.includes('-quiz-') || key.includes('-passed') || key.includes('-welcome-seen')) &&
          key !== 'github-token' && key !== 'github-gist-id') {
        progress[key] = localStorage.getItem(key);
      }
    }

    const content = JSON.stringify(progress, null, 2);
    
    try {
      let url = 'https://api.github.com/gists';
      let method = 'POST';
      let body = {
        description: `Great Cheatsheets Progress - ${new Date().toLocaleDateString()}`,
        public: false,
        files: {
          [GIST_CONFIG.filename]: { content }
        }
      };

      if (GIST_CONFIG.gistId) {
        url = `https://api.github.com/gists/${GIST_CONFIG.gistId}`;
        method = 'PATCH';
        body = { files: { [GIST_CONFIG.filename]: { content } } };
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `token ${GIST_CONFIG.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Backup failed');
      }
      
      const data = await response.json();
      if (!GIST_CONFIG.gistId) {
        GIST_CONFIG.gistId = data.id;
        localStorage.setItem('github-gist-id', data.id);
        // Re-render backup tab to show the new Gist ID
        renderBackupTab();
      }
      showToast('✅ Progress backed up to GitHub Gist!', 'success');
    } catch (error) {
      console.error('Backup error:', error);
      showToast(`❌ Backup failed: ${error.message}`, 'error');
    }
  }
  
  // Modified restoreFromGist (add silent parameter)
  async function restoreFromGist(silent = false) {
    if (!GIST_CONFIG.token || !GIST_CONFIG.gistId) {
      showToast('No backup found. Please backup first or configure Gist ID.', 'error');
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/gists/${GIST_CONFIG.gistId}`, {
        headers: { 'Authorization': `token ${GIST_CONFIG.token}` }
      });
      
      if (!response.ok) throw new Error('Failed to fetch Gist');
      
      const data = await response.json();
      const content = data.files[GIST_CONFIG.filename]?.content;
      
      if (content) {
        const progress = JSON.parse(content);
        let restoredCount = 0;
        Object.entries(progress).forEach(([key, value]) => {
          if (key !== 'github-token' && key !== 'github-gist-id') {
            localStorage.setItem(key, value);
            restoredCount++;
          }
        });
        showToast(`✅ Restored ${restoredCount} items! Refresh to see changes.`, 'success');
        setTimeout(() => window.location.reload(), 1500);
      } else {
        showToast('No backup data found in Gist', 'error');
      }
    } catch (error) {
      console.error('Restore error:', error);
      showToast('❌ Restore failed. Check your token and Gist ID.', 'error');
    }
  }
  
  function showWelcomeMessage(pageKey, title, messageLines, icon = '📘') {
    // Check if this welcome message has been shown before
    if (localStorage.getItem(pageKey)) return;
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'welcome-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 60px;
      right: 20px;
      max-width: 320px;
      background: var(--bg-card);
      border-left: 4px solid var(--accent-primary);
      border-radius: var(--radius-md);
      padding: 1rem;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      animation: slideInRight 0.3s ease;
      font-size: 0.85rem;
    `;
    
    toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
        <span style="font-size: 1.5rem;">${icon}</span>
        <strong style="font-family: var(--font-display); font-size: 1rem;">${title}</strong>
        <button class="welcome-close" style="margin-left: auto; background: none; border: none; cursor: pointer; color: var(--text-muted);">&times;</button>
      </div>
      <ul style="margin: 0; padding-left: 1.5rem; color: var(--text-secondary);">
        ${messageLines.map(line => `<li style="margin-bottom: 4px;">${line}</li>`).join('')}
      </ul>
      <p style="margin-top: 8px; font-size: 0.7rem; color: var(--text-muted);">This message won't appear again.</p>
    `;
    
    document.body.appendChild(toast);
    
    // Close button functionality
    const closeBtn = toast.querySelector('.welcome-close');
    closeBtn.addEventListener('click', () => {
      toast.remove();
    });
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 8000);
    
    // Mark as seen
    localStorage.setItem(pageKey, 'true');
  }
  
  // Add animation CSS if not present
  if (!document.querySelector('#welcome-toast-styles')) {
    const style = document.createElement('style');
    style.id = 'welcome-toast-styles';
    style.textContent = `
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Determine which page we're on and show appropriate welcome message
  function initWelcomeMessage() {
    const path = window.location.pathname;
    
    // Homepage (index.html)
    if (path === '/' || path === '/index.html' || path.endsWith('DevOps-Journey/')) {
      showWelcomeMessage(
        'homepage-welcome-seen',
        'Welcome to DevOps Journey',
        [
          '📐 Foundations-first approach to DevOps',
          '📚 5 pillars before touching AWS',
          '✅ Track your progress with interactive rings',
          '🎴 Test yourself with flashcards & quizzes',
          '🔍 Click any diagram to zoom in'
        ],
        '🚀'
      );
    }
    // Networking Pillar
    else if (path.includes('networking.html')) {
      showWelcomeMessage(
        'networking-pillar-welcome-seen',
        'Welcome to Networking Fundamentals',
        [
          '📡 OSI & TCP/IP models explained',
          '📍 IP addressing & subnetting practice',
          '🔀 Routing & switching concepts',
          '🌍 DNS resolution walkthrough',
          '📦 TCP vs UDP protocols comparison',
          '🔒 Network security basics (firewalls, ACLs, attacks)',
          '🔌 RJ45 cabling (T568A/T568B, straight‑through, crossover)'
        ],
        '🌐'
      );
    }
    // Linux Pillar
    else if (path.includes('linux.html')) {
      showWelcomeMessage(
        'linux-pillar-welcome-seen',
        'Welcome to Linux & CLI Proficiency',
        [
          '📁 Filesystem navigation & structure (FHS)',
          '📄 File operations (touch, cp, mv, rm, wildcards)',
          '🔐 Permissions & ownership (chmod, chown, umask)',
          '⚙️ Process management (ps, kill, top, jobs)',
          '🖥️ Bash scripting (variables, loops, conditionals)',
          '📦 Package management (apt, yum, dnf)',
          '📊 Text processing (grep, sed, awk, pipes)',
          '🌐 Networking commands (ssh, curl, netstat, ss)',
          '🔧 Systemd & service management (systemctl, journalctl)'
        ],
        '🐧'
      );
    }
    // Add more pillars here as they are built
    else if (path.includes('security.html')) {
      showWelcomeMessage(
        'security-pillar-welcome-seen',
        'Welcome to Security Concepts',
        [
          '🔐 Symmetric & asymmetric encryption',
          '📜 TLS/SSL & certificate management (PKI)',
          '🔑 Authentication & authorisation (OAuth, SSO)',
          '🛡️ Least privilege & access control models',
          '🌐 OWASP Top 10 web vulnerabilities',
          '🔒 Network hardening & secure defaults'
        ],
        '🔒'
      );
    }
    else if (path.includes('scripting.html')) {
      showWelcomeMessage(
        'scripting-pillar-welcome-seen',
        'Welcome to Scripting & Automation',
        [
          '🐍 Python fundamentals (variables, loops, functions)',
          '📂 File I/O & error handling',
          '🌐 REST APIs & JSON parsing (requests library)',
          '⚙️ Bash scripting for automation',
          '🤖 Cron jobs & task scheduling',
          '📊 Log parsing & data transformation'
        ],
        '⚙️'
      );
    }
    else if (path.includes('databases.html')) {
      showWelcomeMessage(
        'databases-pillar-welcome-seen',
        'Welcome to Databases & Storage',
        [
          '🗄️ SQL vs NoSQL comparison',
          '📐 Database normalisation (1NF, 2NF, 3NF)',
          '⚡ Indexing strategies & performance',
          '🔒 ACID properties & transactions',
          '💾 Caching strategies (Redis, Memcached)',
          '🧠 CAP theorem & distributed databases'
        ],
        '🗄️'
      );
    }
  }

  // Reset welcome messages button
  const resetWelcomeBtn = document.getElementById('resetWelcomeBtn');
  if (resetWelcomeBtn) {
    resetWelcomeBtn.addEventListener('click', () => {
      const keys = [
        'homepage-welcome-seen',
        'networking-pillar-welcome-seen',
        'linux-pillar-welcome-seen',
        'security-pillar-welcome-seen',
        'scripting-pillar-welcome-seen',
        'databases-pillar-welcome-seen'
      ];
      keys.forEach(key => localStorage.removeItem(key));
      alert('Welcome messages reset. Refresh the page to see them again.');
    });
  }
  
  // Offline Mode Indicator (Ribbon style)
  function initOfflineIndicator() {
    console.log('initOfflineIndicator called');
    const indicator = document.createElement('div');
    indicator.id = 'offlineIndicator';
    indicator.className = 'offline-indicator';
    indicator.innerHTML = `
      <span class="offline-dot"></span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="2" x2="22" y2="22"/>
      </svg>
      <span>OFFLINE — cached content only</span>
    `;
    document.body.appendChild(indicator);
    console.log('Indicator added to DOM');

    function updateOfflineStatus() {
      if (!navigator.onLine) {
        indicator.classList.add('show');
      } else {
        indicator.classList.remove('show');
      }
    }

    window.addEventListener('online', () => {
      indicator.classList.remove('show');
      showOfflineToast('Back online! 🎉', 'success');
    });
    
    window.addEventListener('offline', updateOfflineStatus);
    updateOfflineStatus();
  }
  
  function showOfflineToast(message, type) {
    const toast = document.createElement('div');
    toast.className = 'offline-toast';
    toast.innerHTML = `
      <span class="offline-toast-icon">${type === 'success' ? '✅' : '⚠️'}</span>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ============================================================
  // PWA INSTALLATION PROMPT
  // ============================================================
  
  let deferredPrompt;
  let isPWAInstalled = false;

  // Check if already installed as PWA
  window.addEventListener('appinstalled', () => {
    isPWAInstalled = true;
    deferredPrompt = null;
    console.log('PWA was installed');
    // Remove the install banner if it exists
    const banner = document.getElementById('pwaInstallBanner');
    if (banner) banner.remove();
  });

  // Detect if running in standalone mode (already installed)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    isPWAInstalled = true;
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Show the install banner after a short delay
    setTimeout(() => {
      if (!isPWAInstalled && !localStorage.getItem('pwa-install-dismissed')) {
        showPWAInstallBanner();
      }
    }, 2000);
  });

  function showPWAInstallBanner() {
    // Don't show if already dismissed or installed
    if (localStorage.getItem('pwa-install-dismissed') || isPWAInstalled) return;
    
    // Remove existing banner if any
    const existingBanner = document.getElementById('pwaInstallBanner');
    if (existingBanner) existingBanner.remove();
    
    const banner = document.createElement('div');
    banner.id = 'pwaInstallBanner';
    banner.className = 'pwa-install-banner';
    banner.innerHTML = `
      <div class="pwa-install-content">
        <span class="pwa-install-icon">📱</span>
        <div class="pwa-install-text">
          <strong>Install Great Cheatsheets</strong>
          <small>Install as an app for offline access and faster learning</small>
        </div>
        <button id="pwaInstallBtn" class="btn btn-primary btn-sm">Install</button>
        <button id="pwaDismissBtn" class="pwa-dismiss-btn" aria-label="Dismiss">✕</button>
      </div>
    `;
    document.body.appendChild(banner);
    
    // Add animation class after a tiny delay
    setTimeout(() => banner.classList.add('show'), 10);
    
    document.getElementById('pwaInstallBtn')?.addEventListener('click', async () => {
      if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to install prompt: ${outcome}`);
        if (outcome === 'accepted') {
          isPWAInstalled = true;
        }
        deferredPrompt = null;
      }
      banner.remove();
    });
    
    document.getElementById('pwaDismissBtn')?.addEventListener('click', () => {
      localStorage.setItem('pwa-install-dismissed', 'true');
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 300);
    });
  }

  // ============================================================
  // GITHUB GIST BACKUP & SYNC
  // ============================================================
  
  const GIST_CONFIG = {
    token: null,
    gistId: null,
    filename: 'great-cheatsheets-progress.json'
  };

  function showToast(message, type = 'info') {
    // Remove any existing toast
    const existing = document.querySelector('.global-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `global-toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
      <span class="toast-message">${message}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Expose showToast globally so stars.js can use it
  window.showToast = showToast;

  async function backupToGist() {
    if (!GIST_CONFIG.token) {
      showToast('Please configure GitHub token first (click ⚙️)', 'error');
      return;
    }

    // Collect all progress data from localStorage
    const progress = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('gc-') || key.includes('-section-') || 
          key.includes('-quiz-') || key.includes('-passed') || key.includes('-welcome-seen')) &&
          key !== 'github-token' && key !== 'github-gist-id') {
        progress[key] = localStorage.getItem(key);
      }
    }

    const content = JSON.stringify(progress, null, 2);
    
    try {
      let url = 'https://api.github.com/gists';
      let method = 'POST';
      let body = {
        description: `Great Cheatsheets Progress - ${new Date().toLocaleDateString()}`,
        public: false,
        files: {
          [GIST_CONFIG.filename]: { content }
        }
      };

      if (GIST_CONFIG.gistId) {
        url = `https://api.github.com/gists/${GIST_CONFIG.gistId}`;
        method = 'PATCH';
        body = { files: { [GIST_CONFIG.filename]: { content } } };
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `token ${GIST_CONFIG.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Backup failed');
      }
      
      const data = await response.json();
      if (!GIST_CONFIG.gistId) {
        GIST_CONFIG.gistId = data.id;
        localStorage.setItem('github-gist-id', data.id);
      }
      showToast('✅ Progress backed up to GitHub Gist!', 'success');
    } catch (error) {
      console.error('Backup error:', error);
      showToast(`❌ Backup failed: ${error.message}`, 'error');
    }
  }

  async function restoreFromGist() {
    if (!GIST_CONFIG.token || !GIST_CONFIG.gistId) {
      showToast('No backup found. Please backup first or configure Gist ID.', 'error');
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/gists/${GIST_CONFIG.gistId}`, {
        headers: { 'Authorization': `token ${GIST_CONFIG.token}` }
      });
      
      if (!response.ok) throw new Error('Failed to fetch Gist');
      
      const data = await response.json();
      const content = data.files[GIST_CONFIG.filename]?.content;
      
      if (content) {
        const progress = JSON.parse(content);
        let restoredCount = 0;
        Object.entries(progress).forEach(([key, value]) => {
          if (key !== 'github-token' && key !== 'github-gist-id') {
            localStorage.setItem(key, value);
            restoredCount++;
          }
        });
        showToast(`✅ Restored ${restoredCount} items! Refresh to see changes.`, 'success');
        setTimeout(() => window.location.reload(), 1500);
      } else {
        showToast('No backup data found in Gist', 'error');
      }
    } catch (error) {
      console.error('Restore error:', error);
      showToast('❌ Restore failed. Check your token and Gist ID.', 'error');
    }
  }

  function showGistSettings() {
    // Remove existing modal
    const existingModal = document.querySelector('.gist-modal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.className = 'gist-modal';
    modal.innerHTML = `
      <div class="gist-modal-content">
        <h3>⚙️ GitHub Gist Settings</h3>
        <p>Create a <a href="https://github.com/settings/tokens" target="_blank" rel="noopener">personal access token</a> with <strong>gist</strong> scope.</p>
        <div class="gist-form-group">
          <label>GitHub Token:</label>
          <input type="password" id="gistTokenInput" placeholder="github_pat_hp_xxxxxxxxxxxx" value="${GIST_CONFIG.token || ''}">
          <small>Token is stored only in your browser.</small>
        </div>
        <div class="gist-form-group">
          <label>Gist ID (optional):</label>
          <input type="text" id="gistIdInput" placeholder="e.g., 123abc456def" value="${GIST_CONFIG.gistId || ''}">
          <small>Leave empty to create a new Gist on first backup.</small>
        </div>
        <div class="gist-modal-buttons">
          <button id="gistSaveBtn" class="btn btn-primary">Save</button>
          <button id="gistCloseBtn" class="btn btn-secondary">Cancel</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById('gistTokenInput')?.focus();
    
    document.getElementById('gistSaveBtn')?.addEventListener('click', () => {
      const token = document.getElementById('gistTokenInput').value.trim();
      const gistId = document.getElementById('gistIdInput').value.trim();
      
      if (token) {
        GIST_CONFIG.token = token;
        localStorage.setItem('github-token', token);
      }
      if (gistId) {
        GIST_CONFIG.gistId = gistId;
        localStorage.setItem('github-gist-id', gistId);
      }
      modal.remove();
      showToast('Settings saved! You can now backup your progress.', 'success');
    });
    
    document.getElementById('gistCloseBtn')?.addEventListener('click', () => modal.remove());
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }

   // --- Initialisation ---
    initWelcomeMessage();  // Call the welcome message initinializer on page load
    // setupGistBackup();   // Call setupGistBackup
    initGlobalSearch();
    initGlobalScrollSpy();
    initResourcePulse();
    initGlobalKeyboard();
    fetchLastUpdated();
    addResetButton();
    restoreAccordionStates();
    initClickableHeadings();
    initOfflineIndicator();
    updateAllUI();
    renderPhase1ModalScroller();
    renderPhase2ModalScroller();
    initModalAndFloatingRing();
    initPillarKeyboardShortcuts();

    window.addEventListener('storage', () => { updateAllUI(); renderPhase1ModalScroller(); renderPhase2ModalScroller(); });
    document.addEventListener('visibilitychange', () => { if (!document.hidden) updateAllUI(); });

    console.log('🚀 DOMContentLoaded firing...');

    // --- Render Index Page Content (if on index.html) ---
    if (document.querySelector('.hero-section')) {
      renderHero();
      renderOverview();
      renderMethodSection();
      console.log('✅ Index page content rendered');
  }

  });

  
  // Call after DOM ready
  document.addEventListener('DOMContentLoaded', updateNavBadges);

  // ============================================================
  // SIDEBAR - Hamburger Syncs with All Toggle Methods
  // ============================================================

  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('sidebarOverlay');
  const sidebarToggle = document.getElementById('sidebarToggle');

  // --- State ---
  let isMobileOpen = false;
  let isSidebarCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
  let isTransitioning = false;

  // --- Helper: Update hamburger animation based on sidebar state ---
  function updateHamburgerState() {
    if (!hamburger) return;
    
    const isMobile = window.innerWidth <= 768;
    let isExpanded;
    
    if (isMobile) {
      // Mobile: hamburger shows X when sidebar is OPEN
      isExpanded = isMobileOpen;
    } else {
      // Desktop: hamburger shows X when sidebar is EXPANDED (not collapsed)
      isExpanded = !isSidebarCollapsed;
    }
    
    // Update hamburger
    if (isExpanded) {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
    } else {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  // --- Helper: Update overlay ---
  function updateOverlay(show) {
    if (!overlay) return;
    if (show) {
      overlay.classList.add('show');
      overlay.style.display = 'block';
      overlay.style.pointerEvents = 'auto';
      overlay.style.opacity = '1';
    } else {
      overlay.classList.remove('show');
      overlay.style.display = 'none';
      overlay.style.pointerEvents = 'none';
      overlay.style.opacity = '0';
    }
  }

  // --- Helper: Update toggle position ---
  function updateTogglePosition() {
    if (!sidebarToggle) return;
    if (window.innerWidth <= 768) {
      sidebarToggle.style.display = 'none';
      return;
    }
    sidebarToggle.style.display = 'flex';
    const sidebarWidth = isSidebarCollapsed ? 0 : 260;
    sidebarToggle.style.left = `${sidebarWidth}px`;
  }

  // --- Helper: Sync ALL UI elements ---
  function syncSidebarUI() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // Mobile: sync with isMobileOpen
      sidebar.classList.toggle('open', isMobileOpen);
      overlay.classList.toggle('show', isMobileOpen);
      updateOverlay(isMobileOpen);
    } else {
      // Desktop: sync with isSidebarCollapsed
      sidebar.classList.toggle('collapsed', isSidebarCollapsed);
      updateOverlay(!isSidebarCollapsed);
      updateTogglePosition();
    }
    
    // ALWAYS update hamburger state after any change
    updateHamburgerState();
  }

  // --- MOBILE TOGGLE (Hamburger) - FORCED ---
  if (hamburger) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      
      const isMobile = window.innerWidth <= 768;
      console.log('Hamburger clicked. Mobile:', isMobile);
      
      if (isMobile) {
        // Toggle mobile state
        isMobileOpen = !isMobileOpen;
        console.log('Setting isMobileOpen to:', isMobileOpen);
        
        // FORCE toggle classes
        if (isMobileOpen) {
          sidebar.classList.add('open');
          overlay.classList.add('show');
          this.classList.add('active');
          overlay.style.display = 'block';
          overlay.style.opacity = '1';
          overlay.style.pointerEvents = 'auto';
        } else {
          sidebar.classList.remove('open');
          overlay.classList.remove('show');
          this.classList.remove('active');
          overlay.style.display = 'none';
          overlay.style.opacity = '0';
          overlay.style.pointerEvents = 'none';
        }
        
        console.log('Sidebar classes:', sidebar.className);
        console.log('Sidebar transform:', window.getComputedStyle(sidebar).transform);
      } else {
        // Desktop: use desktop toggle
        toggleSidebar();
      }
    });
  }

  // --- Also make overlay click work ---
  if (overlay) {
    overlay.addEventListener('click', function() {
      if (window.innerWidth <= 768 && isMobileOpen) {
        isMobileOpen = false;
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        overlay.style.display = 'none';
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        hamburger.classList.remove('active');
        console.log('Sidebar closed via overlay');
      }
    });
  }

  // --- DESKTOP TOGGLE (Sidebar Toggle Button) ---
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      if (window.innerWidth > 768) {
        toggleSidebar();
      }
    });
  }

  // --- OVERLAY CLICK ---
  if (overlay) {
    overlay.addEventListener('click', function() {
      if (window.innerWidth <= 768 && isMobileOpen) {
        isMobileOpen = false;
        syncSidebarUI();
      } else if (window.innerWidth > 768 && !isSidebarCollapsed) {
        toggleSidebar(true);
      }
    });
  }

  // --- NAV ITEMS CLICK (Mobile) ---
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth <= 768 && isMobileOpen) {
        isMobileOpen = false;
        syncSidebarUI();
      }
    });
  });

  // --- MAIN TOGGLE FUNCTION (Desktop) ---
  function toggleSidebar(collapse) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    if (collapse === undefined) {
      isSidebarCollapsed = !isSidebarCollapsed;
    } else {
      isSidebarCollapsed = collapse;
    }
    
    // Save state
    localStorage.setItem('sidebar-collapsed', isSidebarCollapsed);
    
    // Sync all UI (including hamburger)
    syncSidebarUI();
    
    setTimeout(() => {
      isTransitioning = false;
    }, 350);

    // Toggle stars visibility
    const canvas = document.getElementById('starCanvas');
    if (canvas) {
      const isCollapsed = sidebar.classList.contains('collapsed');
      canvas.style.opacity = isCollapsed ? '1' : '0.3';
      canvas.style.transition = 'opacity 0.5s ease';
    }

    // Notify stars about sidebar state change
    if (window.updateStarsForSidebar) {
      setTimeout(function() {
        window.updateStarsForSidebar(isSidebarCollapsed);
      }, 50);
    }
  }

  // --- KEYBOARD SHORTCUT: Ctrl+B ---
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      if (window.innerWidth <= 768) {
        // Mobile: toggle sidebar
        isMobileOpen = !isMobileOpen;
        syncSidebarUI();
      } else {
        toggleSidebar();
      }
    }
  });

  // --- RESIZE HANDLER ---
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Switch to mobile mode
        sidebar.classList.remove('collapsed');
        if (isSidebarCollapsed) {
          isSidebarCollapsed = false;
          localStorage.setItem('sidebar-collapsed', 'false');
        }
        // If sidebar was open on desktop, keep it open on mobile
        if (!isMobileOpen) {
          isMobileOpen = false;
        }
      } else {
        // Switch to desktop mode
        sidebar.classList.remove('open');
        if (isMobileOpen) {
          isMobileOpen = false;
        }
        // Restore desktop state
        const stored = localStorage.getItem('sidebar-collapsed') === 'true';
        if (stored !== isSidebarCollapsed) {
          isSidebarCollapsed = stored;
        }
      }
      
      // Sync everything (including hamburger)
      syncSidebarUI();
    }, 150);
  });

  // --- RESTORE STATE ON LOAD ---
  function restoreState() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      sidebar.classList.remove('open', 'collapsed');
      isMobileOpen = false;
    } else {
      if (isSidebarCollapsed) {
        sidebar.classList.add('collapsed');
      } else {
        sidebar.classList.remove('collapsed');
      }
    }
    
    // Sync everything
    syncSidebarUI();
  }

  // Run restore
  if (document.readyState === 'complete') {
    restoreState();
  } else {
    window.addEventListener('load', restoreState);
  }

  console.log('✅ Hamburger syncs with all toggle methods');

  // Add this after your DOMContentLoaded to debug
  console.log('=== SIDEBAR DEBUG ===');
  console.log('Sidebar element:', sidebar);
  console.log('Sidebar classes:', sidebar ? sidebar.className : 'NOT FOUND');
  console.log('Hamburger element:', hamburger);
  console.log('Overlay element:', overlay);
  console.log('Window width:', window.innerWidth);
  console.log('isMobileOpen:', isMobileOpen);
  console.log('isSidebarCollapsed:', isSidebarCollapsed);

  // Check computed styles
  if (sidebar) {
    const styles = window.getComputedStyle(sidebar);
    console.log('Sidebar transform:', styles.transform);
    console.log('Sidebar display:', styles.display);
    console.log('Sidebar left:', styles.left);
  }

  // ============================================================
  // STAR PRESETS - Modal Integration
  // ============================================================

  (function() {
    'use strict';

    // --- Preset Definitions ---
    const PRESETS = {
      calm: {
        name: 'Calm Night',
        icon: '🌙',
        desc: 'Gentle, serene',
        starCount: 150,
        minSize: 0.8,
        maxSize: 2.5,
        twinkleSpeed: 0.008,
        maxOpacity: 0.9,
        minOpacity: 0.3,
        movementSpeed: 0.00001,
        movementRange: 15,
        connectStars: true,
        connectionDistance: 350,
        connectionOpacity: 0.07,
        desktopBreakpoint: 800,
      },
      active: {
        name: 'Active',
        icon: '🌌',
        desc: 'Lively drift',
        starCount: 200,
        minSize: 0.5,
        maxSize: 3,
        twinkleSpeed: 0.025,
        maxOpacity: 1,
        minOpacity: 0.2,
        movementSpeed: 0.005,
        movementRange: 30,
        connectStars: true,
        connectionDistance: 200,
        connectionOpacity: 0.12,
        desktopBreakpoint: 800,
      },
      minimal: {
        name: 'Minimal',
        icon: '⭐',
        desc: 'Clean & simple',
        starCount: 80,
        minSize: 1,
        maxSize: 2,
        twinkleSpeed: 0.005,
        maxOpacity: 0.7,
        minOpacity: 0.4,
        movementSpeed: 0,
        movementRange: 0,
        connectStars: false,
        connectionDistance: 0,
        connectionOpacity: 0,
        desktopBreakpoint: 800,
      },
      constellation: {
        name: 'Constellation',
        icon: '🔭',
        desc: 'Rich connections',
        starCount: 180,
        minSize: 0.6,
        maxSize: 2.5,
        twinkleSpeed: 0.01,
        maxOpacity: 0.95,
        minOpacity: 0.25,
        movementSpeed: 0.0005,
        movementRange: 10,
        connectStars: true,
        connectionDistance: 500,
        connectionOpacity: 0.15,
        desktopBreakpoint: 800,
      },
      dense: {
        name: 'Dense',
        icon: '🌠',
        desc: 'Full starfield',
        starCount: 350,
        minSize: 0.4,
        maxSize: 2,
        twinkleSpeed: 0.015,
        maxOpacity: 0.85,
        minOpacity: 0.2,
        movementSpeed: 0.001,
        movementRange: 20,
        connectStars: true,
        connectionDistance: 150,
        connectionOpacity: 0.08,
        desktopBreakpoint: 800,
      },
      off: {
        name: 'Off',
        icon: '🚫',
        desc: 'Disable stars',
        starCount: 0,
        minSize: 0,
        maxSize: 0,
        twinkleSpeed: 0,
        maxOpacity: 0,
        minOpacity: 0,
        movementSpeed: 0,
        movementRange: 0,
        connectStars: false,
        connectionDistance: 0,
        connectionOpacity: 0,
        desktopBreakpoint: 9999,
      }
    };

    // --- Apply Preset ---
    function applyStarPreset(presetName) {
      const preset = PRESETS[presetName];
      if (!preset) {
        console.warn('⚠️ Preset not found:', presetName);
        return;
      }

      // Update global CONFIG if it exists (for stars.js)
      if (window.CONFIG) {
        // Copy only the config values (not name, icon, desc)
        const configValues = { ...preset };
        delete configValues.name;
        delete configValues.icon;
        delete configValues.desc;
        Object.assign(window.CONFIG, configValues);
      }

      // Store preference
      localStorage.setItem('star-preset', presetName);

      // Update UI buttons
      document.querySelectorAll('.star-preset-btn').forEach(btn => {
        const isActive = btn.dataset.preset === presetName;
        btn.classList.toggle('active', isActive);
        if (isActive) {
          btn.style.borderColor = 'var(--accent-primary)';
          btn.style.background = 'var(--pillar-color-light)';
        } else {
          btn.style.borderColor = 'var(--border-color)';
          btn.style.background = 'var(--bg-card)';
        }
      });

      // Update slider values
      updateSliders(preset);

      // Notify star system to reload
      if (window.reloadStars) {
        window.reloadStars();
      } else if (window.updateStarsForSidebar) {
        window.updateStarsForSidebar();
      }

      // If preset is 'off', hide the canvas
      if (presetName === 'off') {
        const canvas = document.getElementById('starCanvas');
        if (canvas) {
          canvas.style.display = 'none';
          canvas.style.opacity = '0';
        }
      } else {
        // Make sure canvas is visible
        const canvas = document.getElementById('starCanvas');
        if (canvas) {
          canvas.style.display = 'block';
          canvas.style.opacity = '1';
        }
      }

      // Show toast notification
      showPresetToast(presetName);

      console.log('✨ Star preset applied:', presetName);
    }

    // --- Update Sliders ---
    function updateSliders(preset) {
      const sliderMap = {
        starCountSlider: 'starCount',
        twinkleSpeedSlider: 'twinkleSpeed',
        movementSpeedSlider: 'movementSpeed',
        connectionDistanceSlider: 'connectionDistance',
      };

      Object.entries(sliderMap).forEach(([sliderId, key]) => {
        const slider = document.getElementById(sliderId);
        const display = document.getElementById(sliderId.replace('Slider', 'Display'));
        if (slider && preset[key] !== undefined) {
          slider.value = preset[key];
          if (display) {
            if (key === 'movementSpeed') {
              display.textContent = parseFloat(preset[key]).toFixed(4);
            } else {
              display.textContent = preset[key];
            }
          }
        }
      });
    }

    // --- Toast Notification (using global toast system) ---
    function showPresetToast(presetName) {
      const preset = PRESETS[presetName];
      if (!preset) return;

      // Use the global showToast function (if available)
      if (typeof window.showToast === 'function') {
        window.showToast(`${preset.icon} ${preset.name} preset applied`, 'success');
      } else {
        // Fallback: create toast manually
        const existing = document.querySelector('.global-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'global-toast success';
        toast.innerHTML = `
          <span class="toast-icon">✅</span>
          <span class="toast-message">${preset.icon} ${preset.name} preset applied</span>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
          toast.style.opacity = '0';
          setTimeout(() => toast.remove(), 300);
        }, 3000);
      }
    }

    // --- Initialize Star Presets ---
    function initStarPresets() {
      console.log('✨ Initializing star presets...');

      // Load saved preset
      const saved = localStorage.getItem('star-preset') || 'calm';
      
      // Find preset buttons
      const presetBtns = document.querySelectorAll('.star-preset-btn');
      
      if (presetBtns.length === 0) {
        console.log('⏳ No preset buttons found yet, waiting...');
        // Wait for modal to load
        const observer = new MutationObserver(function() {
          const btns = document.querySelectorAll('.star-preset-btn');
          if (btns.length > 0) {
            observer.disconnect();
            setupPresetButtons(btns, saved);
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        return;
      }

      setupPresetButtons(presetBtns, saved);
    }

    // --- Setup Preset Buttons ---
    function setupPresetButtons(buttons, savedPreset) {
      // Apply saved preset after a small delay
      setTimeout(() => {
        applyStarPreset(savedPreset);
      }, 300);

      // Add click handlers
      buttons.forEach(btn => {
        btn.addEventListener('click', function() {
          const preset = this.dataset.preset;
          if (preset) {
            applyStarPreset(preset);
          }
        });
      });

      // Setup custom controls
      setupCustomControls();

      console.log('✅ Star presets UI ready');
    }

    function showComingSoonToast(pillarName) {
      // Get or create the toast container
      let container = document.querySelector('.toast-container');
      if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
      }

      // Create the toast
      const toast = document.createElement('div');
      toast.className = 'toast-item coming-soon-toast';
      toast.textContent = `${pillarName} — page coming soon after the previous pillars are complete`;
      toast.style.background = 'var(--accent-primary)';
      toast.style.color = 'white';
      toast.style.padding = '10px 20px';
      toast.style.borderRadius = '40px';
      toast.style.fontSize = '0.8rem';
      toast.style.fontWeight = '500';
      toast.style.boxShadow = 'var(--shadow-md)';
      toast.style.display = 'flex';
      toast.style.alignItems = 'center';
      toast.style.gap = '8px';

      // Add a lock icon
      const icon = document.createElement('span');
      icon.textContent = '🔒';
      toast.prepend(icon);

      container.appendChild(toast);

      // Auto-dismiss after 2.5 seconds
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px) scale(0.95)';
        toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        setTimeout(() => {
          toast.remove();
          // Remove container if empty
          if (container.children.length === 0) {
            container.remove();
          }
        }, 300);
      }, 2500);
    }
    
    // --- Setup Custom Controls ---
    function setupCustomControls() {
      const applyBtn = document.getElementById('applyCustomStars');
      if (applyBtn) {
        applyBtn.addEventListener('click', function() {
          const custom = {
            starCount: parseInt(document.getElementById('starCountSlider')?.value || 150),
            twinkleSpeed: parseFloat(document.getElementById('twinkleSpeedSlider')?.value || 0.008),
            movementSpeed: parseFloat(document.getElementById('movementSpeedSlider')?.value || 0.00001),
            connectionDistance: parseInt(document.getElementById('connectionDistanceSlider')?.value || 350),
            minSize: 0.8,
            maxSize: 2.5,
            maxOpacity: 0.9,
            minOpacity: 0.3,
            movementRange: 15,
            connectStars: true,
            connectionOpacity: 0.07,
            desktopBreakpoint: 800,
          };

          // Apply custom
          if (window.CONFIG) {
            Object.assign(window.CONFIG, custom);
          }

          localStorage.setItem('star-preset', 'custom');
          localStorage.setItem('star-custom', JSON.stringify(custom));

          if (window.reloadStars) {
            window.reloadStars();
          }

          showPresetToast('custom');
        });
      }

      // Live slider updates
      document.querySelectorAll('.star-control-group input[type="range"]').forEach(slider => {
        slider.addEventListener('input', function() {
          const display = document.getElementById(this.id.replace('Slider', 'Display'));
          if (display) {
            if (this.id === 'movementSpeedSlider') {
              display.textContent = parseFloat(this.value).toFixed(4);
            } else {
              display.textContent = this.value;
            }
          }
        });
      });
      // --- NEW: Brightness slider ---
      const brightnessSlider = document.getElementById('brightnessSlider');
      const brightnessDisplay = document.getElementById('brightnessDisplay');

      if (brightnessSlider) {
        // Load saved value into slider
        const saved = localStorage.getItem('star-brightness');
        if (saved !== null) {
          const val = parseInt(saved);
          brightnessSlider.value = val;
          CONFIG.brightness = val / 100;
          if (brightnessDisplay) brightnessDisplay.textContent = val + '%';
        } else {
          brightnessSlider.value = 200;
          CONFIG.brightness = 1.0;
          if (brightnessDisplay) brightnessDisplay.textContent = '100%';
        }
        
        // Live update on input
        brightnessSlider.addEventListener('input', function() {
          const val = parseInt(this.value);
          const normalized = val / 100;
          CONFIG.brightness = Math.max(0.2, Math.min(2.0, normalized));
          if (brightnessDisplay) brightnessDisplay.textContent = val + '%';
          
          // Save to localStorage
          localStorage.setItem('star-brightness', val);
        });
      }
    }

    // --- Load custom preset from localStorage ---
    function loadCustomPreset() {
      const custom = localStorage.getItem('star-custom');
      if (custom) {
        try {
          return JSON.parse(custom);
        } catch (e) {
          return null;
        }
      }
      return null;
    }

    // --- Expose globally ---
    window.PRESETS = PRESETS;
    window.applyStarPreset = applyStarPreset;
    window.loadCustomPreset = loadCustomPreset;

    // --- Auto-init when DOM is ready ---
    if (document.readyState === 'complete') {
      initStarPresets();
    } else {
      document.addEventListener('DOMContentLoaded', initStarPresets);
    }

    // Also init when modal tabs are switched (for dynamic loading)
    document.addEventListener('click', function(e) {
      const tabBtn = e.target.closest('.tab-button[data-tab="tab5"]');
      if (tabBtn) {
        setTimeout(initStarPresets, 100);
      }
    });

    console.log('🎨 Star presets system loaded');

  })();

  // ============================================================
  // PAGE HEADER - Shared (in global.js)
  // ============================================================

  function updatePageHeader(pillarId) {
    const pillarConfig = {
      networking: {
        name: 'Networking Fundamentals',
        totalSections: 7,
        sectionPrefix: 'networking-section-',
        quizKey: 'networking-quiz-passed',
      },
      linux: {
        name: 'Linux & CLI Proficiency',
        totalSections: 10,
        sectionPrefix: 'linux-section-',
        quizKey: 'linux-quiz-passed',
      },
      // Add more as needed
      security: {
        name: 'Security Concepts',
        totalSections: 9,
        sectionPrefix: 'security-section-',
        quizKey: 'security-quiz-passed',
      },
      // Placeholders for future pillars
      scripting: {
        name: 'Scripting & Automation',
        totalSections: 9,
        sectionPrefix: 'scripting-section-',
        quizKey: 'scripting-quiz-passed',
      },
      databases: {
        name: 'Databases & Storage',
        totalSections: 0,
        sectionPrefix: 'databases-section-',
        quizKey: 'databases-quiz-passed',
      }
    };
    
    const config = pillarConfig[pillarId];
    if (!config) return;
    
    // Calculate completion
    let completedSections = 0;
    for (let i = 1; i <= config.totalSections; i++) {
      if (localStorage.getItem(`${config.sectionPrefix}${i}`) === 'true') {
        completedSections++;
      }
    }
    
    const quizPassed = localStorage.getItem(config.quizKey) === 'true';
    const totalItems = config.totalSections + 1;
    const completedItems = completedSections + (quizPassed ? 1 : 0);
    const percent = Math.round((completedItems / totalItems) * 100);
    
    // Update ring
    const ringFill = document.querySelector('#completionRing .ring-fill');
    const percentDisplay = document.getElementById('completionPercent');
    if (ringFill && percentDisplay) {
      const circumference = 2 * Math.PI * 20;
      const offset = circumference - (percent / 100) * circumference;
      ringFill.style.strokeDashoffset = offset;
      percentDisplay.textContent = `${percent}%`;
    }
    
    // Update badges
    const container = document.getElementById('metaBadges');
    if (container) {
      let statusClass, statusIcon, statusText;
      if (percent === 100) {
        statusClass = 'status-complete';
        statusIcon = '✓';
        statusText = 'Complete';
      } else if (percent > 0) {
        statusClass = 'status-progress';
        statusIcon = '⟳';
        statusText = 'In Progress';
      } else {
        statusClass = 'status-locked';
        statusIcon = '○';
        statusText = 'Not Started';
      }
      
      container.innerHTML = `
        <span class="meta-badge ${statusClass}">
          <span class="icon">${statusIcon}</span> ${statusText}
        </span>
        <span class="meta-badge">
          <span class="icon">📄</span> ${config.totalSections} sections
        </span>
        <span class="meta-badge">
          <span class="icon">✓</span> ${completedSections}/${config.totalSections}
        </span>
        <span class="meta-badge ${quizPassed ? 'quiz-passed' : ''}">
          <span class="icon">${quizPassed ? '🎯' : '📝'}</span> ${quizPassed ? 'Quiz passed' : 'Quiz pending'}
        </span>
      `;
    }
  }

  // ============================================================
  // DYNAMIC NAV BADGES – count accordions per section
  // ============================================================
  function updateNavBadges() {
    // Get all section dividers with IDs like #s1, #s2, etc.
    const sectionDividers = document.querySelectorAll('.section-divider[id^="s"]');
    
    sectionDividers.forEach(divider => {
      const id = divider.id; // e.g., "s1"
      const link = document.querySelector(`.sidebar-nav a.nav-item[href="#${id}"]`);
      if (!link) return;
      
      const badge = link.querySelector('.nav-badge');
      if (!badge) return;
      
      // Count all accordions that are descendants of this section
      // (including those inside dynamically rendered containers)
      let count = 0;
      let current = divider.nextElementSibling;
      
      while (current && !current.id?.startsWith('s') && !current.classList?.contains('section-divider')) {
        // Count accordions in this element and all its descendants
        if (current.classList.contains('accordion')) {
          count++;
        }
        // Also count accordions inside this element (if it's a container)
        const nestedAccordions = current.querySelectorAll('.accordion');
        count += nestedAccordions.length;
        
        current = current.nextElementSibling;
      }
      
      badge.textContent = count;
    });
  }

  // Auto-detect pillar page and initialize
  document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    let pillarId = null;
    
    if (path.includes('networking.html')) pillarId = 'networking';
    else if (path.includes('linux.html')) pillarId = 'linux';
    else if (path.includes('security.html')) pillarId = 'security';
    else if (path.includes('scripting.html')) pillarId = 'scripting';
    // Add more as needed
    
    if (pillarId) {
      updatePageHeader(pillarId);
      
      // Listen for storage changes
      window.addEventListener('storage', function(e) {
        if (e.key && e.key.includes(pillarId)) {
          updatePageHeader(pillarId);
        }
      });
    }
  });
  
