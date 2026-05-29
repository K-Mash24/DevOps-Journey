// ============================================================
// SHARED GLOBAL UI ENGINE (Runs on all pages)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // ── Theme Toggle Layer ──
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
  if (saved) {
    setTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  }

  // ── Responsive Mobile Sidebar Control ──
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('sidebarOverlay');

  if (hamburger && sidebar && overlay) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('show');
    });
    
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
  }

  // Auto-collapse mobile sidebar drawer upon selecting links
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (sidebar) sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('show');
    });
  });

  // ── Scroll to Top (FIXED: Added missing Click Handler) ──
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });

    // Click handler to physically scroll window smoothly
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Home Page Progress Indicator Initialization ──
  const progressFill = document.querySelector('.overall-progress .progress-fill');
  if (progressFill) {
    setTimeout(() => {
      progressFill.style.width = '10%';
    }, 300);
  }
});