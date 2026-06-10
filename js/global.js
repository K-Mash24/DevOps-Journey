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
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(err => console.error('SW registration failed:', err)));
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

  // --- Modal and scroller rendering ---
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
      const isComingSoon = (links[idx] === '#') ? 'true' : 'false';
      return `<button class="pillar-chip ${statusClass}" data-pillar="${p}" data-link="${links[idx]}" data-coming-soon="${isComingSoon}">
                <span class="chip-icon">${icons[idx]}</span>
                <span class="chip-name">${names[idx]}</span>
                <span class="chip-status">${statusSymbol}</span>
              </button>`;
    }).join('');
    // Attach click handlers
    track.querySelectorAll('.pillar-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const link = chip.getAttribute('data-link');
        const isComingSoon = chip.getAttribute('data-coming-soon') === 'true';
        if (!isComingSoon && link && link !== '#') {
          window.location.href = link;
        } else {
          showComingSoonToast(chip.querySelector('.chip-name')?.innerText);
        }
      });
    });
  }

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
      return `<button class="pillar-chip phase2-chip ${statusClass}" data-phase="${p}">
                <span class="chip-icon">${icons[idx]}</span>
                <span class="chip-name">${names[idx]}</span>
                <span class="chip-status">${statusSymbol}</span>
              </button>`;
    }).join('');
    // Click toggles completion
    track.querySelectorAll('.phase2-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const phase = chip.getAttribute('data-phase');
        const currentlyCompleted = getPhase2PillarCompletion(phase);
        const newState = !currentlyCompleted;
        localStorage.setItem(`phase2-${phase}`, newState);
        updateAllUI();
        renderPhase2ModalScroller();
      });
    });
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

  // --- Initialisation ---
  initGlobalSearch();
  initGlobalScrollSpy();
  initResourcePulse();
  initGlobalKeyboard();
  initCopyButtons();
  fetchLastUpdated();
  addResetButton();
  restoreAccordionStates();
  initClickableHeadings();

  updateAllUI();
  renderPhase1ModalScroller();
  renderPhase2ModalScroller();
  initModalAndFloatingRing();

  window.addEventListener('storage', () => { updateAllUI(); renderPhase1ModalScroller(); renderPhase2ModalScroller(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) updateAllUI(); });

});