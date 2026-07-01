// ============================================================
// THEMES – Color Personalization (tab6)
// ============================================================
(function () {
  "use strict";

// ============================================================
// PERSONALIZATION – COLOR THEMES (25 palettes)
// ============================================================
const COLOR_THEMES = {
  // 🔵 Blue / Cyan
  indigo: {
    name: 'Indigo',
    icon: '🔮',
    light: {
      primary: '#1e1b4b',
      secondary: '#14b8a6',
      bgPrimary: '#f0efe8',
      bgSecondary: '#faf9f6',
      border: '#e2ddd6',
      textPrimary: '#1e1b4b',
      textSecondary: '#4a5568',
    },
    dark: {
      primary: '#7c72e8',
      secondary: '#2dd4bf',
      bgPrimary: '#0a0a14',
      bgSecondary: '#141428',
      border: '#2a2a40',
      textPrimary: '#e8e6f0',
      textSecondary: '#a0a8bc',
    },
  },
  ocean: {
    name: 'Ocean',
    icon: '🌊',
    light: {
      primary: '#1a365d',
      secondary: '#0891b2',
      bgPrimary: '#f0f5f9',
      bgSecondary: '#f8fbfd',
      border: '#d4e2ed',
      textPrimary: '#1a365d',
      textSecondary: '#2c5282',
    },
    dark: {
      primary: '#60a5fa',
      secondary: '#22d3ee',
      bgPrimary: '#0b1120',
      bgSecondary: '#111c2e',
      border: '#1e3a5f',
      textPrimary: '#e2e8f0',
      textSecondary: '#94a3b8',
    },
  },
  cobalt: {
    name: 'Cobalt',
    icon: '⚡',
    light: {
      primary: '#1e3a8a',
      secondary: '#2563eb',
      bgPrimary: '#eff6ff',
      bgSecondary: '#f8faff',
      border: '#bfdbfe',
      textPrimary: '#1e3a8a',
      textSecondary: '#1e40af',
    },
    dark: {
      primary: '#60a5fa',
      secondary: '#3b82f6',
      bgPrimary: '#0f172a',
      bgSecondary: '#1e293b',
      border: '#334155',
      textPrimary: '#e2e8f0',
      textSecondary: '#94a3b8',
    },
  },
  azure: {
    name: 'Azure',
    icon: '☁️',
    light: {
      primary: '#082f49',
      secondary: '#0284c7',
      bgPrimary: '#f0f9ff',
      bgSecondary: '#f8fcff',
      border: '#bae6fd',
      textPrimary: '#082f49',
      textSecondary: '#0369a1',
    },
    dark: {
      primary: '#7dd3fc',
      secondary: '#0ea5e9',
      bgPrimary: '#0a1828',
      bgSecondary: '#12283a',
      border: '#1e3a5f',
      textPrimary: '#e0f2fe',
      textSecondary: '#bae6fd',
    },
  },
  denim: {
    name: 'Denim',
    icon: '👖',
    light: {
      primary: '#1e293b',
      secondary: '#64748b',
      bgPrimary: '#f8fafc',
      bgSecondary: '#f1f5f9',
      border: '#cbd5e1',
      textPrimary: '#1e293b',
      textSecondary: '#475569',
    },
    dark: {
      primary: '#94a3b8',
      secondary: '#cbd5e1',
      bgPrimary: '#0f172a',
      bgSecondary: '#1e293b',
      border: '#334155',
      textPrimary: '#e2e8f0',
      textSecondary: '#94a3b8',
    },
  },
  frost: {
    name: 'Frost',
    icon: '❄️',
    light: {
      primary: '#0f172a',
      secondary: '#0ea5e9',
      bgPrimary: '#f8fafc',
      bgSecondary: '#ffffff',
      border: '#e2e8f0',
      textPrimary: '#0f172a',
      textSecondary: '#334155',
    },
    dark: {
      primary: '#bae6fd',
      secondary: '#38bdf8',
      bgPrimary: '#020617',
      bgSecondary: '#0f172a',
      border: '#1e293b',
      textPrimary: '#f0f9ff',
      textSecondary: '#bae6fd',
    },
  },
  midnight: {
    name: 'Midnight',
    icon: '🌙',
    light: {
      primary: '#172554',
      secondary: '#115e59',
      bgPrimary: '#f0f4f8',
      bgSecondary: '#f8fafc',
      border: '#cbd5e1',
      textPrimary: '#172554',
      textSecondary: '#1e3a8a',
    },
    dark: {
      primary: '#818cf8',
      secondary: '#5eead4',
      bgPrimary: '#0b1120',
      bgSecondary: '#141e33',
      border: '#2a3a5f',
      textPrimary: '#e0e7ff',
      textSecondary: '#a5b4fc',
    },
  },

  // 🟣 Purple / Pink
  amethyst: {
    name: 'Amethyst',
    icon: '💎',
    light: {
      primary: '#4c1d95',
      secondary: '#be185d',
      bgPrimary: '#f5f3ff',
      bgSecondary: '#faf9fe',
      border: '#ddd6fe',
      textPrimary: '#4c1d95',
      textSecondary: '#7e22ce',
    },
    dark: {
      primary: '#a78bfa',
      secondary: '#f472b6',
      bgPrimary: '#0f0826',
      bgSecondary: '#1a1038',
      border: '#3b2a5f',
      textPrimary: '#ede9fe',
      textSecondary: '#c4b5fd',
    },
  },
  lilac: {
    name: 'Lilac',
    icon: '🌸',
    light: {
      primary: '#4c1d95',
      secondary: '#8b5cf6',
      bgPrimary: '#f5f3ff',
      bgSecondary: '#faf9fe',
      border: '#e9d5ff',
      textPrimary: '#4c1d95',
      textSecondary: '#7c3aed',
    },
    dark: {
      primary: '#c4b5fd',
      secondary: '#a78bfa',
      bgPrimary: '#0f0826',
      bgSecondary: '#1a1038',
      border: '#3b2a5f',
      textPrimary: '#ede9fe',
      textSecondary: '#c4b5fd',
    },
  },
  rose: {
    name: 'Rose',
    icon: '🌹',
    light: {
      primary: '#881337',
      secondary: '#4c0519',
      bgPrimary: '#fff1f2',
      bgSecondary: '#fff5f6',
      border: '#fecdd3',
      textPrimary: '#881337',
      textSecondary: '#be185d',
    },
    dark: {
      primary: '#fda4af',
      secondary: '#d8b4fe',
      bgPrimary: '#1a0a12',
      bgSecondary: '#2a1220',
      border: '#4a1a30',
      textPrimary: '#fee2e2',
      textSecondary: '#fca5a5',
    },
  },

  // 🔴 Red / Coral / Terracotta
  ruby: {
    name: 'Ruby',
    icon: '❤️',
    light: {
      primary: '#7f1d1d',
      secondary: '#9b2c2c',
      bgPrimary: '#fef2f2',
      bgSecondary: '#fff5f5',
      border: '#fecaca',
      textPrimary: '#7f1d1d',
      textSecondary: '#991b1b',
    },
    dark: {
      primary: '#fca5a5',
      secondary: '#f87171',
      bgPrimary: '#1a0a0a',
      bgSecondary: '#2a1212',
      border: '#4a1a1a',
      textPrimary: '#fef2f2',
      textSecondary: '#fca5a5',
    },
  },
  coral: {
    name: 'Coral',
    icon: '🐠',
    light: {
      primary: '#831843',
      secondary: '#db2777',
      bgPrimary: '#fdf2f8',
      bgSecondary: '#fff5f9',
      border: '#fbcfe8',
      textPrimary: '#831843',
      textSecondary: '#be185d',
    },
    dark: {
      primary: '#fda4af',
      secondary: '#fb7185',
      bgPrimary: '#1a0a12',
      bgSecondary: '#2a1220',
      border: '#4a1a30',
      textPrimary: '#fee2e2',
      textSecondary: '#fca5a5',
    },
  },
  crimson: {
    name: 'Crimson',
    icon: '🔴',
    light: {
      primary: '#7f1d1d',
      secondary: '#b91c1c',
      bgPrimary: '#fef2f2',
      bgSecondary: '#fff5f5',
      border: '#fecaca',
      textPrimary: '#7f1d1d',
      textSecondary: '#b91c1c',
    },
    dark: {
      primary: '#fca5a5',
      secondary: '#ef4444',
      bgPrimary: '#1a0a0a',
      bgSecondary: '#2a1212',
      border: '#4a1a1a',
      textPrimary: '#fef2f2',
      textSecondary: '#f87171',
    },
  },
  scarlet: {
    name: 'Scarlet',
    icon: '🔥',
    light: {
      primary: '#7c2d12',
      secondary: '#dc2626',
      bgPrimary: '#fef2f2',
      bgSecondary: '#fff5f5',
      border: '#fecaca',
      textPrimary: '#7c2d12',
      textSecondary: '#b91c1c',
    },
    dark: {
      primary: '#f97316',
      secondary: '#ef4444',
      bgPrimary: '#1a0a0a',
      bgSecondary: '#2a1212',
      border: '#4a1a1a',
      textPrimary: '#fef2f2',
      textSecondary: '#f87171',
    },
  },
  terracotta: {
    name: 'Terracotta',
    icon: '🏺',
    light: {
      primary: '#451a03',
      secondary: '#b45309',
      bgPrimary: '#fdf6f0',
      bgSecondary: '#fef9f5',
      border: '#fde68a',
      textPrimary: '#451a03',
      textSecondary: '#92400e',
    },
    dark: {
      primary: '#fdba74',
      secondary: '#ea580c',
      bgPrimary: '#1a0f08',
      bgSecondary: '#2a1a10',
      border: '#4a2a10',
      textPrimary: '#fef3c7',
      textSecondary: '#fcd34d',
    },
  },

  // 🟠 Orange / Warm
  sunset: {
    name: 'Sunset',
    icon: '🌅',
    light: {
      primary: '#7c2d12',
      secondary: '#be185d',
      bgPrimary: '#fdf4ed',
      bgSecondary: '#fef9f2',
      border: '#fde68a',
      textPrimary: '#7c2d12',
      textSecondary: '#b91c1c',
    },
    dark: {
      primary: '#fb923c',
      secondary: '#f472b6',
      bgPrimary: '#1a0f08',
      bgSecondary: '#2a1a10',
      border: '#4a2a10',
      textPrimary: '#fef3c7',
      textSecondary: '#fcd34d',
    },
  },

  // 🟡 Yellow / Gold / Amber
  gold: {
    name: 'Gold',
    icon: '🏅',
    light: {
      primary: '#78350f',
      secondary: '#b45309',
      bgPrimary: '#fdf6f0',
      bgSecondary: '#fef9f2',
      border: '#fde68a',
      textPrimary: '#78350f',
      textSecondary: '#92400e',
    },
    dark: {
      primary: '#fbbf24',
      secondary: '#f59e0b',
      bgPrimary: '#1a0f08',
      bgSecondary: '#2a1a10',
      border: '#4a2a10',
      textPrimary: '#fef3c7',
      textSecondary: '#fcd34d',
    },
  },
  amber: {
    name: 'Amber',
    icon: '🟡',
    light: {
      primary: '#78350f',
      secondary: '#d97706',
      bgPrimary: '#fdf6f0',
      bgSecondary: '#fef9f2',
      border: '#fde68a',
      textPrimary: '#78350f',
      textSecondary: '#92400e',
    },
    dark: {
      primary: '#fcd34d',
      secondary: '#f59e0b',
      bgPrimary: '#1a0f08',
      bgSecondary: '#2a1a10',
      border: '#4a2a10',
      textPrimary: '#fef3c7',
      textSecondary: '#fcd34d',
    },
  },
  saffron: {
    name: 'Saffron',
    icon: '🌼',
    light: {
      primary: '#78350f',
      secondary: '#d97706',
      bgPrimary: '#fdf6f0',
      bgSecondary: '#fef9f2',
      border: '#fde68a',
      textPrimary: '#78350f',
      textSecondary: '#92400e',
    },
    dark: {
      primary: '#fcd34d',
      secondary: '#fbbf24',
      bgPrimary: '#1a0f08',
      bgSecondary: '#2a1a10',
      border: '#4a2a10',
      textPrimary: '#fef3c7',
      textSecondary: '#fcd34d',
    },
  },

  // 🟢 Green / Teal
  forest: {
    name: 'Forest',
    icon: '🌲',
    light: {
      primary: '#064e3b',
      secondary: '#047857',
      bgPrimary: '#f0fdf4',
      bgSecondary: '#f7fef9',
      border: '#bbf7d0',
      textPrimary: '#064e3b',
      textSecondary: '#065f46',
    },
    dark: {
      primary: '#34d399',
      secondary: '#6ee7b7',
      bgPrimary: '#082f1a',
      bgSecondary: '#0e4025',
      border: '#1a5a30',
      textPrimary: '#d1fae5',
      textSecondary: '#6ee7b7',
    },
  },
  sage: {
    name: 'Sage',
    icon: '🌿',
    light: {
      primary: '#14532d',
      secondary: '#4ade80',
      bgPrimary: '#f0fdf4',
      bgSecondary: '#f7fef9',
      border: '#bbf7d0',
      textPrimary: '#14532d',
      textSecondary: '#15803d',
    },
    dark: {
      primary: '#86efac',
      secondary: '#22c55e',
      bgPrimary: '#082f1a',
      bgSecondary: '#0e4025',
      border: '#1a5a30',
      textPrimary: '#d1fae5',
      textSecondary: '#6ee7b7',
    },
  },
  moss: {
    name: 'Moss',
    icon: '🍃',
    light: {
      primary: '#064e3b',
      secondary: '#047857',
      bgPrimary: '#f0fdf4',
      bgSecondary: '#f7fef9',
      border: '#bbf7d0',
      textPrimary: '#064e3b',
      textSecondary: '#065f46',
    },
    dark: {
      primary: '#6ee7b7',
      secondary: '#34d399',
      bgPrimary: '#082f1a',
      bgSecondary: '#0e4025',
      border: '#1a5a30',
      textPrimary: '#d1fae5',
      textSecondary: '#6ee7b7',
    },
  },

  // ⚪ Neutral
  slate: {
    name: 'Slate',
    icon: '🪨',
    light: {
      primary: '#0f172a',
      secondary: '#334155',
      bgPrimary: '#f8fafc',
      bgSecondary: '#f1f5f9',
      border: '#cbd5e1',
      textPrimary: '#0f172a',
      textSecondary: '#334155',
    },
    dark: {
      primary: '#94a3b8',
      secondary: '#64748b',
      bgPrimary: '#0f172a',
      bgSecondary: '#1e293b',
      border: '#334155',
      textPrimary: '#e2e8f0',
      textSecondary: '#94a3b8',
    },
  },
  graphite: {
    name: 'Graphite',
    icon: '✏️',
    light: {
      primary: '#111827',
      secondary: '#374151',
      bgPrimary: '#f9fafb',
      bgSecondary: '#f3f4f6',
      border: '#d1d5db',
      textPrimary: '#111827',
      textSecondary: '#374151',
    },
    dark: {
      primary: '#9ca3af',
      secondary: '#6b7280',
      bgPrimary: '#111827',
      bgSecondary: '#1f2937',
      border: '#374151',
      textPrimary: '#f3f4f6',
      textSecondary: '#9ca3af',
    },
  },
  charcoal: {
    name: 'Charcoal',
    icon: '🖤',
    light: {
      primary: '#1f2937',
      secondary: '#4b5563',
      bgPrimary: '#f9fafb',
      bgSecondary: '#f3f4f6',
      border: '#d1d5db',
      textPrimary: '#1f2937',
      textSecondary: '#374151',
    },
    dark: {
      primary: '#9ca3af',
      secondary: '#6b7280',
      bgPrimary: '#111827',
      bgSecondary: '#1f2937',
      border: '#374151',
      textPrimary: '#f3f4f6',
      textSecondary: '#9ca3af',
    },
  },
};
  // --- Apply Theme ---
  function applyTheme(themeName, preview = false) {
    const theme = COLOR_THEMES[themeName];
    if (!theme) return;

    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    const vars = isDark ? theme.dark : theme.light;

    document.documentElement.style.setProperty(
      "--accent-primary",
      vars.primary,
    );
    document.documentElement.style.setProperty(
      "--accent-secondary",
      vars.secondary,
    );
    document.documentElement.style.setProperty("--bg-primary", vars.bgPrimary);
    document.documentElement.style.setProperty(
      "--bg-secondary",
      vars.bgSecondary,
    );
    document.documentElement.style.setProperty("--border-color", vars.border);
    document.documentElement.style.setProperty(
      "--text-primary",
      vars.textPrimary,
    );
    document.documentElement.style.setProperty(
      "--text-secondary",
      vars.textSecondary,
    );

    if (!preview) {
      localStorage.setItem("gc-color-theme", themeName);
      renderThemeCards();
      showToast(`🎨 Theme "${theme.name}" applied!`, "success");
    } else {
      document.querySelectorAll(".theme-card").forEach((card) => {
        card.classList.toggle("preview", card.dataset.theme === themeName);
      });
    }
  }


  function renderThemeCards() {
    const container = document.getElementById("themeGrid");
    if (!container) return;

    const savedTheme = localStorage.getItem("gc-color-theme") || "indigo";

    container.innerHTML = Object.entries(COLOR_THEMES)
      .map(([key, theme]) => {
        const isActive = key === savedTheme;
        return `
          <div class="theme-card ${isActive ? "active" : ""}" data-theme="${key}">
            <div class="theme-icon">${theme.icon}</div>
            <div class="theme-name">${theme.name}</div>
            <div class="theme-swatches">
              <span class="theme-swatch" style="background: ${theme.light.primary};" title="Light primary"></span>
              <span class="theme-swatch" style="background: ${theme.light.secondary};" title="Light secondary"></span>
              <span class="theme-swatch" style="background: ${theme.dark.primary};" title="Dark primary"></span>
              <span class="theme-swatch" style="background: ${theme.dark.secondary};" title="Dark secondary"></span>
            </div>
            <div class="theme-actions">
              <button class="theme-preview-btn" data-theme="${key}" title="Preview this theme (modal will become transparent)">Preview</button>
              <button class="theme-apply-btn" data-theme="${key}" title="Apply and save this theme">Apply</button>
            </div>
          </div>
        `;
      })
      .join("");

    // Use event delegation for theme card actions
    container.addEventListener('click', handleThemeClick);
  }

  function handleThemeClick(e) {
    const container = document.getElementById("themeGrid");
    if (!container) return;
    if (!container.contains(e.target)) return;

    // Preview button
    const previewBtn = e.target.closest('.theme-preview-btn');
    if (previewBtn) {
      e.stopPropagation();
      const theme = previewBtn.dataset.theme;
      if (theme) {
        // Apply theme as preview (preview mode = true)
        applyTheme(theme, true);
        // Set modal to preview mode (transparent)
        const modal = document.getElementById('progressModal');
        if (modal) {
          modal.classList.add('modal-preview-mode');
        }
        // Store the previewed theme to revert if cancelled
        previewThemeName = theme;
        showToast(`👁️ Previewing "${COLOR_THEMES[theme].name}" theme (click outside to cancel)`, 'info');
      }
      return;
    }

    // Apply button
    const applyBtn = e.target.closest('.theme-apply-btn');
    if (applyBtn) {
      e.stopPropagation();
      const theme = applyBtn.dataset.theme;
      if (theme) {
        applyTheme(theme, false);
        // Ensure preview mode is off
        const modal = document.getElementById('progressModal');
        if (modal) {
          modal.classList.remove('modal-preview-mode');
        }
        previewThemeName = null;
      }
      return;
    }

    // Click on card body -> apply (if not clicking on buttons)
    const card = e.target.closest('.theme-card');
    if (card && !e.target.closest('button')) {
      const theme = card.dataset.theme;
      if (theme) {
        applyTheme(theme, false);
        const modal = document.getElementById('progressModal');
        if (modal) {
          modal.classList.remove('modal-preview-mode');
        }
        previewThemeName = null;
      }
    }
  }

  // Variable to track preview state
  let previewThemeName = null;
  let previewSavedTheme = null;

  // Override applyTheme to handle preview mode separately
  // We'll keep applyTheme as is, but we'll add logic to cancel preview on outside click

  function cancelPreview() {
    const modal = document.getElementById('progressModal');
    if (!modal) return;
    modal.classList.remove('modal-preview-mode');
    // Revert to saved theme
    const saved = localStorage.getItem('gc-color-theme');
    if (saved && COLOR_THEMES[saved]) {
      applyTheme(saved, false);
    } else {
      applyTheme('indigo', false);
    }
    previewThemeName = null;
    showToast('👁️ Preview cancelled', 'info');
  }

  // Attach click outside modal to cancel preview
  document.addEventListener('click', function(e) {
    const modal = document.getElementById('progressModal');
    if (!modal) return;
    if (!modal.classList.contains('modal-preview-mode')) return;
    // If click is outside the modal content, cancel
    const content = modal.querySelector('.progress-modal-content');
    if (content && !content.contains(e.target)) {
      cancelPreview();
    }
  });

  // Also listen for Escape key to cancel preview
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const modal = document.getElementById('progressModal');
      if (modal && modal.classList.contains('modal-preview-mode')) {
        cancelPreview();
      }
    }
  });

  // --- Reset Theme ---
  function resetTheme() {
    document.documentElement.style.removeProperty("--accent-primary");
    document.documentElement.style.removeProperty("--accent-secondary");
    document.documentElement.style.removeProperty("--bg-primary");
    document.documentElement.style.removeProperty("--bg-secondary");
    document.documentElement.style.removeProperty("--border-color");
    document.documentElement.style.removeProperty("--text-primary");
    document.documentElement.style.removeProperty("--text-secondary");
    localStorage.removeItem("gc-color-theme");
    renderThemeCards();
    showToast("🔄 Theme reset to default (Indigo)", "info");
  }

  // --- Load Saved Theme ---
  function loadSavedTheme() {
    const saved = localStorage.getItem("gc-color-theme");
    if (saved && COLOR_THEMES[saved]) {
      applyTheme(saved, false);
    }
  }

  

  // --- Toast Helper ---
  function showToast(message, type = "info") {
    const existing = document.querySelector(".global-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = `global-toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}</span>
      <span class="toast-message">${message}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // --- Initialize ---
  function initThemes() {
    console.log("🎨 Initializing themes...");

    // Load saved theme
    loadSavedTheme();

    // Render cards
    renderThemeCards();

    // Reset button
    document
      .getElementById("resetThemeBtn")
      ?.addEventListener("click", resetTheme);

    // Re-render when tab6 is opened
    document.querySelectorAll('.tab-button[data-tab="tab6"]').forEach((btn) => {
      btn.addEventListener("click", function () {
        setTimeout(renderThemeCards, 50);
      });
    });

    console.log("✅ Themes initialized");
  }

  // --- Auto-init ---
  if (document.readyState === "complete") {
    initThemes();
  } else {
    document.addEventListener("DOMContentLoaded", initThemes);
  }

  // Also init when modal tabs are switched (for dynamic loading)
  document.addEventListener("click", function (e) {
    const tabBtn = e.target.closest('.tab-button[data-tab="tab6"]');
    if (tabBtn) {
      setTimeout(initThemes, 100);
    }
  });

  // Expose globally for other scripts
  window.applyTheme = applyTheme;
  window.resetTheme = resetTheme;
  window.renderThemeCards = renderThemeCards;
  window.COLOR_THEMES = COLOR_THEMES;
})();
