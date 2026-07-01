// ============================================================
// STARRY BACKGROUND - Canvas Animation (Responsive)
// ============================================================

(function () {
  "use strict";

// --- Configuration ---
const CONFIG = {
  // Number of stars to generate on the canvas
  // Higher = more dense starfield, lower = cleaner/less cluttered
  starCount: 150,

  // Minimum star size in pixels
  // Controls the smallest visible stars (faint background stars)
  minSize: 0.8,

  // Maximum star size in pixels
  // Controls the largest visible stars (bright foreground stars)
  maxSize: 2.5,

  // Speed of the twinkling effect
  // Higher = faster flickering, Lower = more subtle/gentle twinkle
  // 0.008 creates a very subtle, calming twinkle
  twinkleSpeed: 0.008,

  // Maximum opacity (brightness) of a star at its brightest point
  // 1.0 = fully bright white, 0.5 = half brightness
  maxOpacity: 0.9,

  // Minimum opacity (brightness) of a star at its dimmest point
  // Lower = stars fade more when twinkling, Higher = always somewhat visible
  minOpacity: 0.3,

  // Speed of star drift/movement across the canvas
  // 0.01 = noticeable drift, 0.00001 = almost stationary (barely perceptible)
  movementSpeed: 0.00001,

  // Maximum distance (in pixels) a star can drift from its origin point
  // Higher = stars wander further, Lower = stars stay closer to original position
  movementRange: 15,

  // Enable or disable connection lines between nearby stars
  // true = constellation effect, false = stars only (no lines)
  connectStars: true,

  // Maximum distance (in pixels) for two stars to be connected by a line
  // Higher = more connections, Lower = only very close stars connect
  connectionDistance: 350,

  // Maximum opacity (brightness) of the connection lines
  // Higher = more visible lines, Lower = more subtle/faint lines
  connectionOpacity: 0.07,

  // Minimum screen width (in pixels) for stars to appear
  // Stars only show on screens wider than this value
  // 800 = shows on desktop, hides on tablets and mobile
  desktopBreakpoint: 800,
};

  // --- Setup Canvas ---
  const canvas = document.getElementById("starCanvas");
  if (!canvas) {
    console.warn("⚠️ starCanvas not found");
    return;
  }

  const ctx = canvas.getContext("2d");
  let width, height;
  let stars = [];
  let animationFrameId;
  let isVisible = false;

  // --- Get current color from CSS ---
  function getCurrentColor() {
    const computedStyle = getComputedStyle(document.documentElement);
    let color = computedStyle.getPropertyValue('--text-muted').trim();
    if (!color || color === '') {
      color = 'currentColor';
    }
    return color;
  }

  // --- Check if stars should be visible ---
  function shouldShowStars() {
    const isDesktop = window.innerWidth >= CONFIG.desktopBreakpoint;
    // Check if sidebar has collapsed class
    const sidebar = document.getElementById('sidebar');
    const isCollapsed = sidebar ? sidebar.classList.contains('collapsed') : false;
    
    // Stars show on desktop AND when sidebar is collapsed
    return isDesktop && isCollapsed;
  }

  // --- Resize Handler ---
  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  // --- Star Class ---
  class Star {
    constructor() {
      this.reset();
      this.originX = this.x;
      this.originY = this.y;
      this.driftSpeed = CONFIG.movementSpeed * (0.5 + Math.random());
      this.driftOffset = Math.random() * Math.PI * 2;
    }

    reset() {
      this.x = Math.random() * (width || window.innerWidth);
      this.y = Math.random() * (height || window.innerHeight);
      this.size = Math.random() * (CONFIG.maxSize - CONFIG.minSize) + CONFIG.minSize;
      this.opacity = Math.random() * (CONFIG.maxOpacity - CONFIG.minOpacity) + CONFIG.minOpacity;
      this.twinkleSpeed = CONFIG.twinkleSpeed * (0.5 + Math.random() * 0.5);
      this.twinkleOffset = Math.random() * Math.PI * 2;
    }

    update(time) {
      const driftX = Math.sin(time * this.driftSpeed + this.driftOffset) * CONFIG.movementRange;
      const driftY = Math.cos(time * this.driftSpeed * 0.7 + this.driftOffset) * CONFIG.movementRange;
      this.currentX = this.originX + driftX;
      this.currentY = this.originY + driftY;

      const twinkleFactor = 0.7 + 0.3 * Math.sin(time * this.twinkleSpeed + this.twinkleOffset);
      this.currentOpacity = this.opacity * twinkleFactor;
    }

    draw(ctx, color) {
      ctx.beginPath();
      ctx.arc(this.currentX, this.currentY, this.size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = this.currentOpacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // --- Toast Notification (using flexbox container) ---
  function showPresetToast(presetName) {
    const preset = PRESETS[presetName];
    if (!preset) return;

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
    toast.style.background = 'var(--accent-primary)';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '40px';
    toast.style.fontSize = '0.85rem';
    toast.style.fontWeight = '500';
    toast.style.boxShadow = 'var(--shadow-md)';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '8px';
    
    // Add icon + message
    const icon = document.createElement('span');
    icon.textContent = '✅';
    toast.appendChild(icon);
    
    const message = document.createTextNode(` ${preset.icon} ${preset.name} preset applied`);
    toast.appendChild(message);

    container.appendChild(toast);

    // Auto-dismiss after 2 seconds
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
    }, 2000);
  }

  // --- Initialize Stars ---
  function initStars() {
    stars = [];
    for (let i = 0; i < CONFIG.starCount; i++) {
      stars.push(new Star());
    }
  }

  // --- Draw Connections ---
  function drawConnections(ctx, color) {
    if (!CONFIG.connectStars || stars.length < 2) return;

    const maxDist = CONFIG.connectionDistance;
    const maxOpacity = CONFIG.connectionOpacity;

    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].currentX - stars[j].currentX;
        const dy = stars[i].currentY - stars[j].currentY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDist) {
          const opacity = maxOpacity * (1 - (distance / maxDist));
          ctx.beginPath();
          ctx.moveTo(stars[i].currentX, stars[i].currentY);
          ctx.lineTo(stars[j].currentX, stars[j].currentY);
          ctx.strokeStyle = color;
          ctx.globalAlpha = opacity;
          ctx.lineWidth = 0.6;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  // --- Update Visibility ---
  function updateVisibility() {
    const shouldShow = shouldShowStars();
    
    if (shouldShow !== isVisible) {
      isVisible = shouldShow;
      
      if (isVisible) {
        canvas.style.display = 'block';
        canvas.style.opacity = '1';
        // Reposition stars
        resizeCanvas();
        for (const star of stars) {
          star.originX = Math.random() * width;
          star.originY = Math.random() * height;
          star.x = star.originX;
          star.y = star.originY;
        }
      } else {
        canvas.style.opacity = '0';
        setTimeout(() => {
          if (!isVisible) {
            canvas.style.display = 'none';
          }
        }, 500);
      }
    }
  }

  // --- Animation Loop ---
  function animate(time) {
    ctx.clearRect(0, 0, width, height);

    if (isVisible) {
      const color = getCurrentColor();
      for (const star of stars) {
        star.update(time);
        star.draw(ctx, color);
      }
      drawConnections(ctx, color);
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // --- Handle Resize ---
  function handleResize() {
    resizeCanvas();
    if (isVisible) {
      for (const star of stars) {
        star.originX = Math.random() * width;
        star.originY = Math.random() * height;
        star.x = star.originX;
        star.y = star.originY;
      }
    }
    updateVisibility();
  }

  // --- Start Animation ---
  function startAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    resizeCanvas();
    initStars();
    
    const shouldShow = shouldShowStars();
    isVisible = shouldShow;
    canvas.style.display = shouldShow ? 'block' : 'none';
    canvas.style.opacity = shouldShow ? '1' : '0';
    
    animate(0);
  }

  // --- Cleanup ---
  function stopAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  // --- Initialize ---
  if (document.readyState === 'complete') {
    startAnimation();
  } else {
    window.addEventListener('load', startAnimation);
  }

  // --- Resize ---
  let resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 200);
  });

  // --- Expose sidebar state handler for global.js ---
  window.updateStarsForSidebar = function(collapsed) {
    // This will be called from sidebar toggle
    updateVisibility();
  };

  // --- Toggle stars externally ---
  window.toggleStars = function(show) {
    updateVisibility();
  };

  // --- Update color on theme change ---
  window.updateStarColor = function() {
    if (canvas && isVisible) {
      canvas.style.opacity = '0.99';
      setTimeout(() => {
        canvas.style.opacity = '1';
      }, 10);
    }
  };

  // Listen for theme changes
  const observer = new MutationObserver(function() {
    window.updateStarColor();
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  // --- Listen for sidebar class changes ---
  const sidebarObserver = new MutationObserver(function() {
    updateVisibility();
  });
  
  // Wait for sidebar to exist
  const checkSidebar = setInterval(function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebarObserver.observe(sidebar, {
        attributes: true,
        attributeFilter: ['class']
      });
      clearInterval(checkSidebar);
      console.log('✅ Sidebar observer attached');
    }
  }, 100);

  console.log("✨ Starry background initialized (responsive)");

 window.showPresetToast = showPresetToast; 

// ============================================================
// ADVANCED SETTINGS – Fonts, Import, Export
// ============================================================

// --- Font Settings ---
const FONT_DEFAULTS = {
  family: 'Syne',
  size: 16,
  customURL: ''
};

let fontSettings = { ...FONT_DEFAULTS };

function loadFontSettings() {
  const saved = localStorage.getItem('gc-font-settings');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      fontSettings = { ...FONT_DEFAULTS, ...parsed };
    } catch (e) {
      fontSettings = { ...FONT_DEFAULTS };
    }
  } else {
    fontSettings = { ...FONT_DEFAULTS };
  }
  applyFontSettings();
}

function saveFontSettings() {
  localStorage.setItem('gc-font-settings', JSON.stringify(fontSettings));
  applyFontSettings();
}

function applyFontSettings() {
  const html = document.documentElement;
  const body = document.body;
  
  // Apply font family
  if (fontSettings.family === 'custom' && fontSettings.customURL) {
    loadCustomFont(fontSettings.customURL);
  } else if (fontSettings.family !== 'custom') {
    // Apply to both html and body for maximum coverage
    html.style.fontFamily = fontSettings.family + ', sans-serif';
    body.style.fontFamily = fontSettings.family + ', sans-serif';
  }
  
  // Apply font size
  html.style.fontSize = fontSettings.size + 'px';
  body.style.fontSize = fontSettings.size + 'px';
  
  // Also set a CSS custom property for other elements to inherit
  html.style.setProperty('--font-body', fontSettings.family + ', sans-serif');
  html.style.setProperty('--font-size-base', fontSettings.size + 'px');
  
  // Update UI elements if they exist
  updateFontUI();
}

function loadCustomFont(url) {
  // Clean the URL - remove quotes and whitespace
  let cleanUrl = url.trim().replace(/^['"]|['"]$/g, '');
  
  // If it's a full URL, use it directly
  // If it's just a font name, assume it's from Google Fonts
  let fontUrl = cleanUrl;
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    // Assume it's a font name from Google Fonts
    fontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(cleanUrl)}:wght@400;500;600;700&display=swap`;
  }
  
  const linkId = 'custom-font-link';
  let link = document.getElementById(linkId);
  
  if (!link) {
    link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = fontUrl;
    document.head.appendChild(link);
  } else {
    link.href = fontUrl;
  }
  
  link.onload = function() {
    // Extract font name from URL for display
    let fontName = cleanUrl;
    if (cleanUrl.includes('family=')) {
      fontName = cleanUrl.split('family=')[1].split('&')[0];
    }
    document.documentElement.style.fontFamily = `'${fontName}', sans-serif`;
    showToast(`✅ Font "${fontName}" loaded successfully`, 'success');
  };
  
  link.onerror = function() {
    showToast('❌ Failed to load custom font. Please check the URL.', 'error');
  };
}

function updateFontUI() {
  const familySelect = document.getElementById('fontFamilySelect');
  const customInput = document.getElementById('customFontInput');
  const customURL = document.getElementById('customFontURL');
  const sizeSlider = document.getElementById('fontSizeSlider');
  const sizeDisplay = document.getElementById('fontSizeDisplay');

  if (familySelect) {
    familySelect.value = fontSettings.family;
    if (customInput) {
      customInput.style.display = (fontSettings.family === 'custom') ? 'flex' : 'none';
    }
  }
  if (customURL) {
    customURL.value = fontSettings.customURL || '';
  }
  if (sizeSlider) {
    sizeSlider.value = fontSettings.size;
    if (sizeDisplay) sizeDisplay.textContent = fontSettings.size + 'px';
  }
}

function attachAdvancedEvents() {
  // Font Family
  const familySelect = document.getElementById('fontFamilySelect');
  const customInput = document.getElementById('customFontInput');
  const customURL = document.getElementById('customFontURL');
  const loadCustomBtn = document.getElementById('loadCustomFontBtn');
  const sizeSlider = document.getElementById('fontSizeSlider');
  const sizeDisplay = document.getElementById('fontSizeDisplay');
  const exportBtn = document.getElementById('exportSettingsBtn');
  const importBtn = document.getElementById('importSettingsBtn');
  const importFile = document.getElementById('importFileInput');

  if (familySelect) {
    familySelect.addEventListener('change', function() {
      const val = this.value;
      fontSettings.family = val;
      if (customInput) {
        customInput.style.display = (val === 'custom') ? 'flex' : 'none';
      }
      if (val === 'custom' && customURL && customURL.value.trim()) {
        loadCustomFont(customURL.value.trim());
      } else if (val !== 'custom') {
        saveFontSettings();
      } else {
        saveFontSettings();
      }
    });
  }

  if (loadCustomBtn && customURL) {
    loadCustomBtn.addEventListener('click', function() {
      let url = customURL.value.trim();
      if (url) {
        // Remove any quotes the user might have typed
        url = url.replace(/^['"]|['"]$/g, '');
        
        // Validate it's a proper URL
        if (!url.startsWith('http://') && !url.startsWith('https://') && !url.includes('fonts.googleapis.com')) {
          // If it looks like just a font name, build the Google Fonts URL
          if (!url.includes(' ')) {
            url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(url)}:wght@400;500;600;700&display=swap`;
          }
        }
        
        fontSettings.customURL = url;
        fontSettings.family = 'custom';
        saveFontSettings();
        
        // Update select to custom
        const familySelect = document.getElementById('fontFamilySelect');
        if (familySelect) familySelect.value = 'custom';
        const customInput = document.getElementById('customFontInput');
        if (customInput) customInput.style.display = 'flex';
        
        // Load the font
        loadCustomFont(url);
      } else {
        showToast('Please enter a valid font URL or font name', 'error');
      }
    });
  }

  if (sizeSlider) {
    sizeSlider.addEventListener('input', function() {
      const val = parseInt(this.value);
      if (sizeDisplay) sizeDisplay.textContent = val + 'px';
      fontSettings.size = val;
      // Live preview without saving
      document.documentElement.style.fontSize = val + 'px';
    });
    sizeSlider.addEventListener('change', function() {
      // Save when user releases slider
      saveFontSettings();
    });
  }

  // Export
  if (exportBtn) {
    exportBtn.addEventListener('click', exportAllSettings);
  }

  // Import
  if (importBtn && importFile) {
    importBtn.addEventListener('click', function() {
      importFile.click();
    });
    importFile.addEventListener('change', function(e) {
      if (this.files && this.files[0]) {
        importAllSettings(this.files[0]);
        this.value = ''; // reset
      }
    });
  }
}

// --- Import / Export ---
function getAllSettings() {
  return {
    version: '1.0',
    exportDate: new Date().toISOString(),
    settings: {
      colorTheme: localStorage.getItem('gc-color-theme') || 'indigo',
      starPreset: localStorage.getItem('star-preset') || 'calm',
      starCustom: JSON.parse(localStorage.getItem('star-custom') || '{}'),
      font: JSON.parse(localStorage.getItem('gc-font-settings') || JSON.stringify(FONT_DEFAULTS))
    }
  };
}

function applyAllSettings(data) {
  if (!data || !data.settings) return;
  const s = data.settings;
  // Color theme
  if (s.colorTheme && window.COLOR_THEMES && window.COLOR_THEMES[s.colorTheme]) {
    localStorage.setItem('gc-color-theme', s.colorTheme);
    if (typeof window.applyTheme === 'function') {
      window.applyTheme(s.colorTheme, false);
    }
  }
  // Star preset
  if (s.starPreset) {
    localStorage.setItem('star-preset', s.starPreset);
    if (typeof window.applyStarPreset === 'function') {
      window.applyStarPreset(s.starPreset);
    }
  }
  // Star custom
  if (s.starCustom && Object.keys(s.starCustom).length > 0) {
    localStorage.setItem('star-custom', JSON.stringify(s.starCustom));
    if (typeof window.reloadStars === 'function') {
      window.reloadStars();
    }
  }
  // Font settings
  if (s.font) {
    localStorage.setItem('gc-font-settings', JSON.stringify(s.font));
    fontSettings = { ...FONT_DEFAULTS, ...s.font };
    applyFontSettings();
  }
  showToast('✅ All settings imported successfully', 'success');
  // Reload page to refresh UI (optional, but ensures everything is applied)
  setTimeout(() => location.reload(), 1500);
}

function exportAllSettings() {
  const data = getAllSettings();
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `devops-journey-settings-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('📤 Settings exported successfully', 'success');
}

function importAllSettings(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.settings) {
        showToast('❌ Invalid settings file', 'error');
        return;
      }
      applyAllSettings(data);
    } catch (err) {
      showToast('❌ Failed to parse settings file', 'error');
    }
  };
  reader.readAsText(file);
}

// --- Initialize ---
loadFontSettings();

// Attach events when DOM is ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  attachAdvancedEvents();
} else {
  document.addEventListener('DOMContentLoaded', attachAdvancedEvents);
}

// Also re-attach when modal is opened (for dynamically created elements)
document.addEventListener('click', function(e) {
  const tabBtn = e.target.closest('.tab-button[data-tab="tab5"]');
  if (tabBtn) {
    setTimeout(attachAdvancedEvents, 100);
  }
});

// Expose functions globally
window.fontSettings = fontSettings;
window.loadFontSettings = loadFontSettings;
window.saveFontSettings = saveFontSettings;
window.applyFontSettings = applyFontSettings;
window.exportAllSettings = exportAllSettings;
window.importAllSettings = importAllSettings;
window.getAllSettings = getAllSettings;
window.applyAllSettings = applyAllSettings; 

// ============================================================
// EXPANDED ADVANCED SETTINGS
// ============================================================

// --- Appearance Settings ---
const APPEARANCE_DEFAULTS = {
  accentIntensity: 100,
  borderRadius: 8,
  shadowIntensity: 100,
  reducedMotion: false,
  highContrast: false,
  defaultTheme: 'indigo'
};

let appearanceSettings = { ...APPEARANCE_DEFAULTS };

function loadAppearanceSettings() {
  const saved = localStorage.getItem('gc-appearance-settings');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      appearanceSettings = { ...APPEARANCE_DEFAULTS, ...parsed };
    } catch (e) {
      appearanceSettings = { ...APPEARANCE_DEFAULTS };
    }
  } else {
    appearanceSettings = { ...APPEARANCE_DEFAULTS };
  }
  applyAppearanceSettings();
}

function saveAppearanceSettings() {
  localStorage.setItem('gc-appearance-settings', JSON.stringify(appearanceSettings));
  applyAppearanceSettings();
}

function applyAppearanceSettings() {
  const html = document.documentElement;
  
  // Accent Intensity (affects accent colors via filter)
  const intensity = appearanceSettings.accentIntensity / 100;
  html.style.setProperty('--accent-intensity', intensity);
  // We'll use this to adjust accent colors if needed
  
  // Border Radius
  const radius = appearanceSettings.borderRadius;
  html.style.setProperty('--radius-sm', `${radius * 0.75}px`);
  html.style.setProperty('--radius-md', `${radius}px`);
  html.style.setProperty('--radius-lg', `${radius * 1.5}px`);
  html.style.setProperty('--radius-xl', `${radius * 2.5}px`);
  
  // Shadow Intensity
  const shadow = appearanceSettings.shadowIntensity / 100;
  const shadowSm = `0 1px 3px rgba(0,0,0,${0.06 * shadow}), 0 1px 2px rgba(0,0,0,${0.04 * shadow})`;
  const shadowMd = `0 4px 12px rgba(0,0,0,${0.08 * shadow}), 0 2px 4px rgba(0,0,0,${0.04 * shadow})`;
  const shadowLg = `0 10px 30px rgba(0,0,0,${0.1 * shadow}), 0 4px 8px rgba(0,0,0,${0.06 * shadow})`;
  html.style.setProperty('--shadow-sm', shadowSm);
  html.style.setProperty('--shadow-md', shadowMd);
  html.style.setProperty('--shadow-lg', shadowLg);
  
  // Reduced Motion
  if (appearanceSettings.reducedMotion) {
    html.classList.add('reduced-motion');
    html.style.setProperty('--transition', '0s');
    html.style.setProperty('--animation-duration', '0s');
  } else {
    html.classList.remove('reduced-motion');
    html.style.removeProperty('--transition');
    html.style.removeProperty('--animation-duration');
  }
  
  // High Contrast
  if (appearanceSettings.highContrast) {
    html.classList.add('high-contrast');
  } else {
    html.classList.remove('high-contrast');
  }
  
  updateAppearanceUI();
}

function renderAdvancedSettings() {
  const container = document.querySelector('.advanced-settings-content');
  if (!container) return;
  
  // Check if appearance settings already exist
  if (container.querySelector('.appearance-settings')) return;
  
  const html = `
    <div class="appearance-settings">
      <h5 style="margin: 0.5rem 0 0.75rem; font-family: var(--font-display); font-size: 0.9rem;">🎨 Appearance Settings</h5>
      
      <div class="setting-group">
        <label>
          <span class="setting-label">Accent Intensity</span>
          <input type="range" id="accentIntensitySlider" min="0" max="100" value="${appearanceSettings.accentIntensity}">
          <span class="setting-value" id="accentIntensityDisplay">${appearanceSettings.accentIntensity}%</span>
        </label>
      </div>
      
      <div class="setting-group">
        <label>
          <span class="setting-label">Border Radius</span>
          <input type="range" id="borderRadiusSlider" min="0" max="20" value="${appearanceSettings.borderRadius}">
          <span class="setting-value" id="borderRadiusDisplay">${appearanceSettings.borderRadius}px</span>
        </label>
      </div>
      
      <div class="setting-group">
        <label>
          <span class="setting-label">Shadow Intensity</span>
          <input type="range" id="shadowIntensitySlider" min="0" max="100" value="${appearanceSettings.shadowIntensity}">
          <span class="setting-value" id="shadowIntensityDisplay">${appearanceSettings.shadowIntensity}%</span>
        </label>
      </div>
      
      <hr class="settings-divider">
      
      <h5 style="margin: 0.5rem 0 0.75rem; font-family: var(--font-display); font-size: 0.9rem;">♿ Accessibility</h5>
      
      <div class="setting-group" style="flex-direction: row; align-items: center; gap: 0.75rem;">
        <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
          <input type="checkbox" id="reducedMotionToggle" ${appearanceSettings.reducedMotion ? 'checked' : ''}>
          <span>Reduced Motion</span>
        </label>
        <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
          <input type="checkbox" id="highContrastToggle" ${appearanceSettings.highContrast ? 'checked' : ''}>
          <span>High Contrast</span>
        </label>
      </div>
      
      <hr class="settings-divider">
      
      <h5 style="margin: 0.5rem 0 0.75rem; font-family: var(--font-display); font-size: 0.9rem;">🔧 Default Settings</h5>
      
      <div class="select-group">
        <label for="defaultThemeSelect">Default Theme:</label>
        <select id="defaultThemeSelect" class="styled-select">
        <option value="">— Select a theme —</option>
          ${Object.entries(COLOR_THEMES).map(([key, theme]) => `
            <option value="${key}" ${appearanceSettings.defaultTheme === key ? 'selected' : ''}>
              ${theme.icon} ${theme.name}
            </option>
          `).join('')}
        </select>
        <span class="hint">(Load and select as default 📺)</span>
      </div>
      
      <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem; flex-wrap: wrap;">
        <button id="applyAppearanceBtn" class="btn btn-primary btn-sm">Apply All</button>
        <button id="resetAppearanceBtn" class="btn btn-secondary btn-sm">Reset All</button>
      </div>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', html);
  attachAppearanceEvents();
}

function attachAppearanceEvents() {
  // Accent Intensity
  const accentSlider = document.getElementById('accentIntensitySlider');
  const accentDisplay = document.getElementById('accentIntensityDisplay');
  if (accentSlider) {
    accentSlider.addEventListener('input', function() {
      const val = parseInt(this.value);
      if (accentDisplay) accentDisplay.textContent = val + '%';
      appearanceSettings.accentIntensity = val;
      applyAppearanceSettings();
    });
  }
  
  // Border Radius
  const radiusSlider = document.getElementById('borderRadiusSlider');
  const radiusDisplay = document.getElementById('borderRadiusDisplay');
  if (radiusSlider) {
    radiusSlider.addEventListener('input', function() {
      const val = parseInt(this.value);
      if (radiusDisplay) radiusDisplay.textContent = val + 'px';
      appearanceSettings.borderRadius = val;
      applyAppearanceSettings();
    });
  }
  
  // Shadow Intensity
  const shadowSlider = document.getElementById('shadowIntensitySlider');
  const shadowDisplay = document.getElementById('shadowIntensityDisplay');
  if (shadowSlider) {
    shadowSlider.addEventListener('input', function() {
      const val = parseInt(this.value);
      if (shadowDisplay) shadowDisplay.textContent = val + '%';
      appearanceSettings.shadowIntensity = val;
      applyAppearanceSettings();
    });
  }
  
  // Reduced Motion
  const motionToggle = document.getElementById('reducedMotionToggle');
  if (motionToggle) {
    motionToggle.addEventListener('change', function() {
      appearanceSettings.reducedMotion = this.checked;
      saveAppearanceSettings();
      showToast(`♿ Reduced Motion ${this.checked ? 'enabled' : 'disabled'}`, 'info');
    });
  }
  
  // High Contrast
  const contrastToggle = document.getElementById('highContrastToggle');
  if (contrastToggle) {
    contrastToggle.addEventListener('change', function() {
      appearanceSettings.highContrast = this.checked;
      saveAppearanceSettings();
      showToast(`👁️ High Contrast ${this.checked ? 'enabled' : 'disabled'}`, 'info');
    });
  }
  
  // Default Theme
  const themeSelect = document.getElementById('defaultThemeSelect');
  if (themeSelect) {
    themeSelect.addEventListener('change', function() {
      appearanceSettings.defaultTheme = this.value;
      saveAppearanceSettings();
      showToast(`🔧 Default theme set to ${COLOR_THEMES[this.value].name}`, 'info');
    });
  }
  
  // Apply All
  const applyBtn = document.getElementById('applyAppearanceBtn');
  if (applyBtn) {
    applyBtn.addEventListener('click', function() {
      saveAppearanceSettings();
      showToast('✅ Appearance settings applied', 'success');
    });
  }
  
  // Reset All
  const resetBtn = document.getElementById('resetAppearanceBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      appearanceSettings = { ...APPEARANCE_DEFAULTS };
      saveAppearanceSettings();
      // Re-render the advanced settings UI to update values
      const container = document.querySelector('.advanced-settings-content');
      if (container) {
        const existing = container.querySelector('.appearance-settings');
        if (existing) existing.remove();
        renderAdvancedSettings();
      }
      showToast('🔄 Appearance settings reset to default', 'info');
    });
  }
}

function updateAppearanceUI() {
  // Update any UI elements if they exist
  const accentSlider = document.getElementById('accentIntensitySlider');
  const accentDisplay = document.getElementById('accentIntensityDisplay');
  const radiusSlider = document.getElementById('borderRadiusSlider');
  const radiusDisplay = document.getElementById('borderRadiusDisplay');
  const shadowSlider = document.getElementById('shadowIntensitySlider');
  const shadowDisplay = document.getElementById('shadowIntensityDisplay');
  const motionToggle = document.getElementById('reducedMotionToggle');
  const contrastToggle = document.getElementById('highContrastToggle');
  const themeSelect = document.getElementById('defaultThemeSelect');
  
  if (accentSlider) accentSlider.value = appearanceSettings.accentIntensity;
  if (accentDisplay) accentDisplay.textContent = appearanceSettings.accentIntensity + '%';
  if (radiusSlider) radiusSlider.value = appearanceSettings.borderRadius;
  if (radiusDisplay) radiusDisplay.textContent = appearanceSettings.borderRadius + 'px';
  if (shadowSlider) shadowSlider.value = appearanceSettings.shadowIntensity;
  if (shadowDisplay) shadowDisplay.textContent = appearanceSettings.shadowIntensity + '%';
  if (motionToggle) motionToggle.checked = appearanceSettings.reducedMotion;
  if (contrastToggle) contrastToggle.checked = appearanceSettings.highContrast;
  if (themeSelect) themeSelect.value = appearanceSettings.defaultTheme;
}

// Load appearance settings
loadAppearanceSettings();

// Expose appearance functions
window.appearanceSettings = appearanceSettings;
window.loadAppearanceSettings = loadAppearanceSettings;
window.saveAppearanceSettings = saveAppearanceSettings;
window.applyAppearanceSettings = applyAppearanceSettings;
window.renderAdvancedSettings = renderAdvancedSettings;
window.attachAppearanceEvents = attachAppearanceEvents;

// Also render advanced settings after DOM ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  renderAdvancedSettings();
} else {
  document.addEventListener('DOMContentLoaded', renderAdvancedSettings);
}

// Re-render when tab5 is opened
document.addEventListener('click', function(e) {
  const tabBtn = e.target.closest('.tab-button[data-tab="tab5"]');
  if (tabBtn) {
    setTimeout(renderAdvancedSettings, 150);
  }
});

// Also when advanced settings container is opened (details)
document.addEventListener('click', function(e) {
  const details = e.target.closest('.advanced-settings-container');
  if (details && details.open) {
    setTimeout(renderAdvancedSettings, 100);
  }
});
})();

