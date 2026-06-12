// ============================================================
// SHARED GLOBAL UI ENGINE (Runs on all pages)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

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
    hamburger.addEventListener('click', () => { sidebar.classList.toggle('open'); overlay.classList.toggle('show'); });
    overlay.addEventListener('click', () => { sidebar.classList.remove('open'); overlay.classList.remove('show'); });
  }
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
    item.addEventListener('click', () => { sidebar?.classList.remove('open'); overlay?.classList.remove('show'); });
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
        'Section 1 — Filesystem Structure',
        'Section 2 — File & Directory Ops',
        'Section 3 — Permissions & Ownership',
        'Section 4 — Processes & Job Control',
        'Section 5 — SSH & Remote Access',
        'Section 6 — Package Management',
        'Section 7 — Bash Scripting',
        'Section 8 — Systemd & Services',
        'Section 9 — Text Processing (grep, sed, awk)',
        'Section 10 — Networking Commands'
      ],
      quizKey: 'linux-quiz-passed',
      sectionPrefix: 'linux-section-'
    },
    security: { placeholder: true, name: 'Security' },
    scripting: { placeholder: true, name: 'Scripting' },
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
        }
      });
    });
  }

  // Expose globally so pillar pages can call it
    window.showPillarDetail = showPillarDetail; // Expose globally for fallback

  // ============================================================
  // OVERRIDE CHIP CLICK HANDLERS IN PHASE 1 AND PHASE 2 SCROLLERS
  // ============================================================

  // Original renderPhase1ModalScroller – modify the click handler
  function renderPhase1ModalScroller() {
    const track = document.getElementById('phase1ModalTrack');
    if (!track) return;
    const pillars = ['networking','linux','security','scripting','databases'];
    const names = ['Networking', 'Linux & CLI', 'Security', 'Scripting', 'Databases'];
    const icons = ['🌐', '🐧', '🔒', '⚙️', '🗄️'];
    const links = ['html/networking.html', 'html/linux.html', '#', '#', '#'];
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

  // --- Copy Buttons ---
  function initCopyButtons() {
    document.querySelectorAll('.code-block').forEach(block => {
      if (block.querySelector('.copy-btn')) return;
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 1H4a2 2 0 00-2 2v14h2V3h12V1z"/><path d="M8 5h12a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2z"/></svg>';
      btn.setAttribute('aria-label', 'Copy code');
      btn.style.cssText = 'position:absolute; top:8px; right:8px; background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:4px 8px; cursor:pointer; opacity:0.7; transition:opacity 0.2s;';
      block.style.position = 'relative';
      block.appendChild(btn);
      btn.addEventListener('click', async () => {
        const text = block.querySelector('pre')?.innerText || block.innerText;
        await navigator.clipboard.writeText(text);
        btn.innerHTML = '✓';
        setTimeout(() => btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 1H4a2 2 0 00-2 2v14h2V3h12V1z"/><path d="M8 5h12a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2z"/></svg>', 1500);
      });
    });
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
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(err => console.error('SW registration failed:', err)));
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
      case 'security': return 0;
      case 'scripting': return 0;
      case 'databases': return 0;
      default: return 0;
    }
  }

  function getPhase2PillarCompletion(pillar) {
    return localStorage.getItem(`phase2-${pillar}`) === 'true' ? 1 : 0;
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

  function updateAllUI() {
    updateSidebarProgress();
    updatePhase1RoadmapAndCards();
    updatePhase2RoadmapAndCards();
    updateFloatingRings();
    updateHeroStats();
    updateMethodBadges();
    updatePhase1HeaderTag();
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
                   'Encryption, TLS, PKI, least privilege, OWASP',
                   'Python and Bash, file I/O, APIs, JSON',
                   'SQL, NoSQL, indexing, ACID, caching, CAP theorem'];
    const icons = ['net', 'linux', 'sec', 'script', 'db'];
    const links = ['html/networking.html', 'html/linux.html', '#', '#', '#'];

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

  function updatePhase2RoadmapAndCards() {
    const phases = ['docker', 'cicd', 'kubernetes', 'terraform', 'monitoring'];
    const titles = ['Docker & Containers', 'CI/CD Pipelines', 'Kubernetes', 'IaC — Terraform & Ansible', 'Monitoring & Observability'];
    const descs = ['Images, containers, registries, Dockerfile, docker-compose',
                   'GitHub Actions, GitLab CI, Jenkins',
                   'Pods, Services, Deployments, Ingress, ConfigMaps, Secrets',
                   'Infrastructure as Code, state management, modules, configuration management',
                   'Prometheus, Grafana, logging stacks, alerting, distributed tracing'];
    const icons = ['docker', 'cicd', 'k8s', 'terraform', 'monitor'];

    // Roadmap
    const roadmapContainer = document.getElementById('phase2Roadmap');
    if (roadmapContainer) {
      roadmapContainer.innerHTML = phases.map((p, idx) => {
        const completed = getPhase2PillarCompletion(p);
        const statusClass = completed ? 'complete' : 'locked';
        const statusText = completed ? 'COMPLETE' : 'LOCKED';
        return `<div class="phase-item ${statusClass}">
                  <div class="phase-dot" aria-hidden="true">${idx+1}</div>
                  <div class="phase-content">
                    <div class="phase-name">Phase 2 · ${idx+1} — ${titles[idx]}</div>
                    <div class="phase-desc">${descs[idx]}</div>
                  </div>
                  <span class="phase-status">${statusText}</span>
                </div>`;
      }).join('');
    }

    // Cards
    const cardsContainer = document.getElementById('phase2Cards');
    if (cardsContainer) {
      cardsContainer.innerHTML = phases.map((p, idx) => {
        const completed = getPhase2PillarCompletion(p);
        const cardClass = completed ? 'pillar-card complete' : 'pillar-card locked-card';
        const statusClass = completed ? 'complete' : 'locked-badge';
        const statusText = completed ? 'Complete' : 'Locked';
        const fillClass = completed ? 'complete' : 'not-started';
        return `<div class="${cardClass}" aria-disabled="true">
                  <div class="card-top">
                    <div class="card-icon ${icons[idx]}" aria-hidden="true">${icons[idx]==='docker'?'🐳':icons[idx]==='cicd'?'🔁':icons[idx]==='k8s'?'☸️':icons[idx]==='terraform'?'🏗️':'📊'}</div>
                    <span class="card-status-badge ${statusClass}">${statusText}</span>
                  </div>
                  <div><div class="card-number">Phase 2 · 0${idx+1}</div><div class="card-title">${titles[idx]}</div></div>
                  <div class="card-desc">${descs[idx]}</div>
                  <div class="card-progress"><div class="card-progress-fill ${fillClass}" style="width:${completed?100:0}%;"></div></div>
                  <div class="card-footer">
                    <div class="card-meta-pills"><span class="meta-pill">${completed?'100%':'0%'} complete</span></div>
                    <div class="card-arrow" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/></svg></div>
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
        if (tabId === 'tab1') setTimeout(() => centerPhase1Arrow(), 50);
        if (tabId === 'tab2') setTimeout(() => centerPhase2Arrow(), 50);
      });
    });

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
    const existing = document.querySelector('.coming-soon-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'coming-soon-toast';
    toast.textContent = `${pillarName} — page coming soon after the previous pillars are complete`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 2500);
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
            <button class="tab-button active" data-tab="tab0">Overall</button>
            <button class="tab-button" data-tab="tab1">Phase 1</button>
            <button class="tab-button" data-tab="tab2">Phase 2</button>
            <button class="tab-button" data-tab="tab3">Pillar Details</button>
          </div>
          <div class="tab-pane active" id="tab0">...</div>
          <div class="tab-pane" id="tab1">...</div>
          <div class="tab-pane" id="tab2">...</div>
          <div class="tab-pane" id="tab3">
            <div id="pillarDetailContainer" style="min-height: 200px;">
              <div class="info-box note">Loading...</div>
            </div>
          </div>
          <div class="progress-modal-footer">
            <button class="btn btn-secondary btn-sm" id="modalCloseFooter">Close</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    // Re-initialize modal event listeners
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

  // // ============================================================
  // // WELCOME LIGHTBOX all three languages (First-time visitors per pillar)
  // // ============================================================
  
  // function initWelcomeLightbox() {
  //   const lightbox = document.getElementById('welcomeLightbox');
  //   const closeBtn = document.getElementById('closeWelcomeLightbox');
  //   const startBtn = document.getElementById('startLearningBtn');
  //   const dontShowCheckbox = document.getElementById('dontShowAgain');
    
  //   if (!lightbox) return;
    
  //   // Determine current page/pillar from URL or body class
  //   let pageKey = '';
  //   if (window.location.pathname.includes('networking.html')) {
  //     pageKey = 'networking-pillar-welcome-seen';
  //   } else if (window.location.pathname.includes('linux.html')) {
  //     pageKey = 'linux-pillar-welcome-seen';
  //   } else if (window.location.pathname.includes('security.html')) {
  //     pageKey = 'security-pillar-welcome-seen';
  //   } else {
  //     // Default for home page or unknown – don't show welcome lightbox
  //     return;
  //   }
    
  //   // Check if user has seen the welcome message for this pillar
  //   const hasSeenWelcome = localStorage.getItem(pageKey);
    
  //   if (!hasSeenWelcome) {
  //     // Customize content based on pillar
  //     customizeWelcomeContent(pageKey);
  //     // Show lightbox after a short delay
  //     setTimeout(() => {
  //       lightbox.style.display = 'flex';
  //     }, 500);
  //   }
    
  //   // Customize the welcome message based on which pillar
  //   function customizeWelcomeContent(pageKey) {
  //     const iconSpan = document.querySelector('.welcome-icon');
  //     const titleEl = document.querySelector('.welcome-lightbox-header h2');
  //     const listEl = document.querySelector('.welcome-lightbox-body ul');
      
  //     if (!iconSpan || !titleEl || !listEl) return;
      
  //     if (pageKey === 'networking-pillar-welcome-seen') {
  //       iconSpan.textContent = '🌐';
  //       titleEl.textContent = 'Welcome to Networking Fundamentals';
  //       listEl.innerHTML = `
  //         <li>📡 OSI & TCP/IP models</li>
  //         <li>📍 IP addressing & subnetting</li>
  //         <li>🔀 Routing & switching</li>
  //         <li>🌍 DNS resolution</li>
  //         <li>📦 TCP vs UDP protocols</li>
  //         <li>🔒 Network security basics</li>
  //       `;
  //     } else if (pageKey === 'linux-pillar-welcome-seen') {
  //       iconSpan.textContent = '🐧';
  //       titleEl.textContent = 'Welcome to Linux & CLI Proficiency';
  //       listEl.innerHTML = `
  //         <li>📁 Filesystem navigation & structure</li>
  //         <li>📄 File operations (create, copy, move, delete)</li>
  //         <li>🔐 Permissions & ownership (chmod, chown, sudo)</li>
  //         <li>⚙️ Process management (ps, kill, top)</li>
  //         <li>📦 Package management (apt, yum, dnf)</li>
  //         <li>🖥️ Bash scripting fundamentals</li>
  //         <li>📊 Text processing (grep, sed, awk)</li>
  //         <li>🌐 Networking commands (ssh, curl, netstat)</li>
  //       `;
  //     }
  //     // Add more pillars as needed
  //   }
    
  //   // Function to close lightbox
  //   function closeLightbox() {
  //     lightbox.style.display = 'none';
  //   }
    
  //   // Save preference and close
  //   function saveAndClose() {
  //     if (dontShowCheckbox && dontShowCheckbox.checked) {
  //       localStorage.setItem(pageKey, 'true');
  //     }
  //     closeLightbox();
  //   }
    
  //   // Close button handler
  //   if (closeBtn) {
  //     closeBtn.addEventListener('click', saveAndClose);
  //   }
    
  //   // Start learning button handler
  //   if (startBtn) {
  //     startBtn.addEventListener('click', saveAndClose);
  //   }
    
  //   // Close when clicking outside
  //   const overlay = lightbox.querySelector('.welcome-lightbox-overlay');
  //   if (overlay) {
  //     overlay.addEventListener('click', saveAndClose);
  //   }
    
  //   // Close with Escape key
  //   document.addEventListener('keydown', (e) => {
  //     if (e.key === 'Escape' && lightbox.style.display === 'flex') {
  //       saveAndClose();
  //     }
  //   });
  // }
  
  // // Call the function (add to your existing initialisers)
  // initWelcomeLightbox();

  // ============================================================
  // WELCOME MESSAGE SYSTEM JS specific (Shows once per pillar/page)
  // ============================================================
  
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

  function setupGistBackup() {
    const footer = document.querySelector('.sidebar-footer');
    if (!footer) return;

    // Don't add duplicate
    if (footer.querySelector('.gist-backup-container')) return;

    const container = document.createElement('div');
    container.className = 'gist-backup-container';
    container.innerHTML = `
      <button id="gistBackupBtn" class="btn-gist" title="Backup to GitHub Gist">📤 Backup</button>
      <button id="gistRestoreBtn" class="btn-gist" title="Restore from GitHub Gist">📥 Restore</button>
      <button id="gistSettingsBtn" class="btn-gist" title="GitHub Settings">⚙️</button>
    `;
    footer.appendChild(container);

    // Load saved config from localStorage
    const savedToken = localStorage.getItem('github-token');
    const savedGistId = localStorage.getItem('github-gist-id');
    if (savedToken) GIST_CONFIG.token = savedToken;
    if (savedGistId) GIST_CONFIG.gistId = savedGistId;

    document.getElementById('gistBackupBtn')?.addEventListener('click', backupToGist);
    document.getElementById('gistRestoreBtn')?.addEventListener('click', restoreFromGist);
    document.getElementById('gistSettingsBtn')?.addEventListener('click', showGistSettings);
  }

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
          <input type="password" id="gistTokenInput" placeholder="ghp_xxxxxxxxxxxx" value="${GIST_CONFIG.token || ''}">
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
  setupGistBackup();   // Call setupGistBackup
  initGlobalSearch();
  initGlobalScrollSpy();
  initResourcePulse();
  initGlobalKeyboard();
  initCopyButtons();
  fetchLastUpdated();
  addResetButton();
  restoreAccordionStates();
  initClickableHeadings();
  initOfflineIndicator();
  updateAllUI();
  renderPhase1ModalScroller();
  renderPhase2ModalScroller();
  initModalAndFloatingRing();

  window.addEventListener('storage', () => { updateAllUI(); renderPhase1ModalScroller(); renderPhase2ModalScroller(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) updateAllUI(); });

});