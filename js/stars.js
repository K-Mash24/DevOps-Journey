// ============================================================
// STARRY BACKGROUND - Canvas Animation (Responsive)
// ============================================================

(function () {
  "use strict";

  // --- Configuration ---
  const CONFIG = {
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
    brightness: 1.0,
  };

  // --- Star Configuration ---
  const STAR_CONFIG = {
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
    brightness: 1.0,
  };

  // --- Snow Configuration (Separate!) ---
  const SNOW_CONFIG = {
    count: 200,
    speed: 1.0,
    size: 3.0,
    wind: 0.5,
    opacity: 0.8,
    mode: "stars", // 'stars' | 'snow' | 'both'
    preset: "moderate",
  };

  // Expose both configs globally
  window.STAR_CONFIG = STAR_CONFIG;
  window.SNOW_CONFIG = SNOW_CONFIG;

  window.CONFIG = CONFIG;

  // Load brightness from localStorage
  const savedBrightness = localStorage.getItem("star-brightness");
  if (savedBrightness !== null) {
    CONFIG.brightness = Math.max(
      0.2,
      Math.min(1.0, parseInt(savedBrightness) / 200),
    );
  } else {
    CONFIG.brightness = 1.0;
  }

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
    let color = computedStyle.getPropertyValue("--text-muted").trim();
    if (!color || color === "") {
      color = "currentColor";
    }
    return color;
  }

  // --- Check if stars should be visible ---
  function shouldShowStars() {
    const isDesktop = window.innerWidth >= CONFIG.desktopBreakpoint;
    const sidebar = document.getElementById("sidebar");
    const isCollapsed = sidebar
      ? sidebar.classList.contains("collapsed")
      : false;
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
      this.driftSpeed = STAR_CONFIG.movementSpeed * (0.5 + Math.random());
      this.driftOffset = Math.random() * Math.PI * 2;
    }

    reset() {
      this.x = Math.random() * (width || window.innerWidth);
      this.y = Math.random() * (height || window.innerHeight);
      this.size =
        Math.random() * (STAR_CONFIG.maxSize - STAR_CONFIG.minSize) +
        STAR_CONFIG.minSize;
      this.opacity =
        Math.random() * (STAR_CONFIG.maxOpacity - STAR_CONFIG.minOpacity) +
        STAR_CONFIG.minOpacity;
      this.twinkleSpeed =
        STAR_CONFIG.twinkleSpeed * (0.5 + Math.random() * 0.5);
      this.twinkleOffset = Math.random() * Math.PI * 2;
    }

    update(time) {
      const driftX =
        Math.sin(time * this.driftSpeed + this.driftOffset) *
        STAR_CONFIG.movementRange;
      const driftY =
        Math.cos(time * this.driftSpeed * 0.7 + this.driftOffset) *
        STAR_CONFIG.movementRange;
      this.currentX = this.originX + driftX;
      this.currentY = this.originY + driftY;

      const twinkleFactor =
        0.7 + 0.3 * Math.sin(time * this.twinkleSpeed + this.twinkleOffset);
      this.currentOpacity = this.opacity * twinkleFactor;
    }

    draw(ctx, color) {
      const brightness = STAR_CONFIG.brightness || 1.0;
      const finalOpacity = Math.min(this.currentOpacity * brightness, 1.0);

      ctx.beginPath();
      ctx.arc(this.currentX, this.currentY, this.size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = finalOpacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // --- Toast Notification ---
  // function showPresetToast(presetName) {
  //   const preset = PRESETS[presetName];
  //   if (!preset) return;

  //   let container = document.querySelector(".toast-container");
  //   if (!container) {
  //     container = document.createElement("div");
  //     container.className = "toast-container";
  //     document.body.appendChild(container);
  //   }

  //   const toast = document.createElement("div");
  //   toast.className = "toast-item coming-soon-toast";
  //   toast.style.background = "var(--accent-primary)";
  //   toast.style.color = "white";
  //   toast.style.padding = "10px 20px";
  //   toast.style.borderRadius = "40px";
  //   toast.style.fontSize = "0.85rem";
  //   toast.style.fontWeight = "500";
  //   toast.style.boxShadow = "var(--shadow-md)";
  //   toast.style.display = "flex";
  //   toast.style.alignItems = "center";
  //   toast.style.gap = "8px";

  //   const icon = document.createElement("span");
  //   icon.textContent = "✅";
  //   toast.appendChild(icon);

  //   const message = document.createTextNode(
  //     ` ${preset.icon} ${preset.name} preset applied`,
  //   );
  //   toast.appendChild(message);

  //   container.appendChild(toast);

  //   setTimeout(() => {
  //     toast.style.opacity = "0";
  //     toast.style.transform = "translateY(-10px) scale(0.95)";
  //     toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  //     setTimeout(() => {
  //       toast.remove();
  //       if (container.children.length === 0) {
  //         container.remove();
  //       }
  //     }, 300);
  //   }, 2000);
  // }

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
    const brightness = CONFIG.brightness || 1.0;

    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].currentX - stars[j].currentX;
        const dy = stars[i].currentY - stars[j].currentY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDist) {
          const opacity = Math.min(
            maxOpacity * (1 - distance / maxDist) * brightness,
            1.0,
          );
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
    const mode = getSnowMode();
    const isSnowActive = (mode === 'snow' || mode === 'both');
    
    // ✅ FIX: Canvas should be visible if stars should show OR snow is active
    const shouldShowCanvas = shouldShow || isSnowActive;
    
    if (shouldShowCanvas !== isVisible) {
      isVisible = shouldShowCanvas;
      
      if (isVisible) {
        canvas.style.display = 'block';
        canvas.style.opacity = '1';
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

  // ============================================================
  // ❄️ SNOW ANIMATION ENGINE (Integrated)
  // ============================================================

  // --- Snow Presets ---
  const SNOW_PRESETS = {
    lightFlurry: {
      name: "Light Flurry",
      icon: "❄️",
      count: 60,
      speed: 0.5,
      size: 2.0,
      wind: 0.3,
      opacity: 0.6,
    },
    gentle: {
      name: "Gentle Snow",
      icon: "🌨️",
      count: 120,
      speed: 0.7,
      size: 2.5,
      wind: 0.4,
      opacity: 0.7,
    },
    moderate: {
      name: "Moderate",
      icon: "❄️",
      count: 200,
      speed: 1.0,
      size: 3.0,
      wind: 0.5,
      opacity: 0.8,
    },
    heavy: {
      name: "Heavy Snow",
      icon: "🌨️",
      count: 300,
      speed: 1.5,
      size: 4.0,
      wind: 0.7,
      opacity: 0.9,
    },
    blizzard: {
      name: "Blizzard",
      icon: "❄️",
      count: 450,
      speed: 2.5,
      size: 5.0,
      wind: 1.8,
      opacity: 1.0,
    },
    off: {
      name: "Off",
      icon: "🚫",
      count: 0,
      speed: 0,
      size: 0,
      wind: 0,
      opacity: 0,
    },
  };

  // --- Snow Settings ---
  const SNOW_DEFAULTS = {
    preset: "moderate",
    mode: "stars",
    count: 200,
    speed: 1.0,
    size: 3.0,
    wind: 0.5,
    opacity: 0.8,
  };

  let snowSettings = { ...SNOW_DEFAULTS };
  let snowflakes = [];
  let snowInitialized = false;

  // --- Load Snow Settings --
  function loadSnowSettings() {
    const saved = localStorage.getItem('snow-settings');
    console.log('❄️ Loading snow settings from localStorage:', saved);
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.assign(SNOW_CONFIG, parsed);
        console.log('❄️ Loaded snow settings:', SNOW_CONFIG);
      } catch (e) {
        console.warn('❄️ Failed to parse snow settings, using defaults');
        SNOW_CONFIG = { ...SNOW_DEFAULTS };
      }
    } else {
      console.log('❄️ No saved snow settings, using defaults');
      SNOW_CONFIG = { ...SNOW_DEFAULTS };
    }
    
    // Apply the loaded preset
    applySnowPreset(SNOW_CONFIG.preset, true);
  }

  // Star settings
  const STAR_STORAGE_KEY = "star-settings";
  const STAR_PRESET_KEY = "star-preset";
  const STAR_BRIGHTNESS_KEY = "star-brightness";

  // Snow settings
  const SNOW_STORAGE_KEY = "snow-settings";
  const SNOW_PRESET_KEY = "snow-preset";

  // --- Save Snow Settings ---
  function saveSnowSettings() {
    localStorage.setItem(SNOW_STORAGE_KEY, JSON.stringify(SNOW_CONFIG));
  }

  function loadSnowSettings() {
    const saved = localStorage.getItem(SNOW_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.assign(SNOW_CONFIG, parsed);
      } catch (e) {
        // Use defaults
      }
    }
  }

  // --- Snowflake Class ---
  class Snowflake {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * (width || window.innerWidth);
      this.y = -10 - Math.random() * 50;
      this.size = (SNOW_CONFIG.size || 3) * (0.5 + Math.random() * 0.5);
      this.speed = (SNOW_CONFIG.speed || 1.0) * (0.6 + Math.random() * 0.4);
      this.wind = (SNOW_CONFIG.wind || 0.5) * (0.3 + Math.random() * 0.7);
      this.opacity = (SNOW_CONFIG.opacity || 0.8) * (0.6 + Math.random() * 0.4);
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = 0.01 + Math.random() * 0.02;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
      this.wobble += this.wobbleSpeed;
      this.rotation += this.rotationSpeed;

      this.x += Math.sin(this.wobble) * 0.5 + this.wind * 0.3;
      this.y += this.speed;

      if (this.x > width + 20) this.x = -20;
      if (this.x < -20) this.x = width + 20;

      if (this.y > height + 20) {
        this.reset();
        this.y = -10 - Math.random() * 30;
      }
    }

    draw(ctx) {
      const size = this.size;
      const opacity = Math.min(this.opacity, 1);

      ctx.shadowColor = "rgba(255, 255, 255, 0.3)";
      ctx.shadowBlur = size * 2;

      ctx.beginPath();
      ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(
        this.x - size * 0.2,
        this.y - size * 0.2,
        size * 0.3,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
      ctx.fill();

      ctx.shadowBlur = 0;
    }
  }

  // --- Initialize Snowflakes ---
  function initSnowflakes() {
    snowflakes = [];
    const count = snowSettings.count || 200;
    for (let i = 0; i < count; i++) {
      const flake = new Snowflake();
      flake.y = Math.random() * (height || window.innerHeight);
      snowflakes.push(flake);
    }
    snowInitialized = true;
  }

  // --- Draw Snowflakes ---
  function drawSnowflakes() {
    if (!ctx || !snowflakes.length) return;
    for (const flake of snowflakes) {
      flake.update();
      flake.draw(ctx);
    }
  }

  // --- Apply Snow Preset ---
  function applySnowPreset(presetName, silent = false) {
    console.log('❄️ Applying snow preset:', presetName);
    
    const preset = SNOW_PRESETS[presetName];
    if (!preset) {
      console.warn('⚠️ Snow preset not found:', presetName);
      return;
    }

    // Update SNOW_CONFIG
    SNOW_CONFIG.preset = presetName;
    SNOW_CONFIG.count = preset.count;
    SNOW_CONFIG.speed = preset.speed;
    SNOW_CONFIG.size = preset.size;
    SNOW_CONFIG.wind = preset.wind;
    SNOW_CONFIG.opacity = preset.opacity;

    saveSnowSettings();

    // ✅ FIX: Ensure canvas is visible when snow is active
    const canvas = document.getElementById('starCanvas');
    if (canvas) {
      canvas.style.display = 'block';
      canvas.style.opacity = '1';
    }

    // Reinitialize snowflakes
    if (snowInitialized) {
      initSnowflakes();
    }

    // Update UI
    updateSnowUI();

    // Show toast
    if (!silent && presetName !== 'off') {
      showSnowToast(`${preset.icon} ${preset.name} preset applied`);
    } else if (!silent && presetName === 'off') {
      showSnowToast(`🚫 Snow disabled`);
    }

    console.log('❄️ Snow preset applied:', presetName);
    console.log('❄️ Current SNOW_CONFIG:', SNOW_CONFIG);
  }

  // --- Set Animation Mode ---
  function setSnowMode(mode) {
    if (!['stars', 'snow', 'both'].includes(mode)) {
      mode = 'stars';
    }
    SNOW_CONFIG.mode = mode;
    saveSnowSettings();
    updateSnowUI();
    
    // ✅ FIX: Ensure canvas is visible when snow or both mode is active
    const canvas = document.getElementById('starCanvas');
    if (canvas && (mode === 'snow' || mode === 'both')) {
      canvas.style.display = 'block';
      canvas.style.opacity = '1';
    }
    
    showSnowToast(`📺 Animation mode: ${mode === 'stars' ? '✨ Stars' : mode === 'snow' ? '❄️ Snow' : '🌌 Both'}`);
  }

  // --- Get Current Mode ---
  function getSnowMode() {
    return SNOW_CONFIG.mode || "stars";
  }

  function setSnowMode(mode) {
    if (!["stars", "snow", "both"].includes(mode)) {
      mode = "stars";
    }
    SNOW_CONFIG.mode = mode;
    saveSnowSettings();
    updateSnowUI();
    showSnowToast(
      `📺 Animation mode: ${mode === "stars" ? "✨ Stars" : mode === "snow" ? "❄️ Snow" : "🌌 Both"}`,
    );
  }

  // --- Snow Toast ---
  function showSnowToast(message) {
    if (typeof window.showToast === "function") {
      window.showToast(message, "info");
    } else {
      const toast = document.createElement("div");
      toast.className = "toast-item global-toast";
      toast.innerHTML = `<span class="toast-message">${message}</span>`;
      toast.style.cssText = `
        // 
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
      }, 2500);
    }
  }

  // --- Update Snow UI ---
  function updateSnowUI() {
    console.log('❄️ Updating snow UI...');
    console.log('❄️ Current SNOW_CONFIG:', SNOW_CONFIG);
    
    // Update preset buttons
    document.querySelectorAll('.snow-preset-btn').forEach(btn => {
      const preset = btn.dataset.snowPreset;
      const isActive = preset === SNOW_CONFIG.preset;
      btn.classList.toggle('active', isActive);
      if (isActive) {
        btn.style.borderColor = 'var(--accent-primary)';
        btn.style.background = 'var(--pillar-color-light)';
      } else {
        btn.style.borderColor = 'var(--border-color)';
        btn.style.background = 'var(--bg-card)';
      }
    });

    // Update mode selector
    const modeSelect = document.getElementById('snowModeSelect');
    if (modeSelect) {
      modeSelect.value = SNOW_CONFIG.mode;
    }

    // Update sliders
    const sliderMap = {
      snowCountSlider: { display: 'snowCountDisplay', value: SNOW_CONFIG.count },
      snowSpeedSlider: { display: 'snowSpeedDisplay', value: SNOW_CONFIG.speed },
      snowSizeSlider: { display: 'snowSizeDisplay', value: SNOW_CONFIG.size },
      snowWindSlider: { display: 'snowWindDisplay', value: SNOW_CONFIG.wind },
      snowOpacitySlider: { display: 'snowOpacityDisplay', value: SNOW_CONFIG.opacity },
    };

    Object.entries(sliderMap).forEach(([sliderId, { display, value }]) => {
      const slider = document.getElementById(sliderId);
      const displayEl = document.getElementById(display);
      if (slider) {
        slider.value = value;
        if (displayEl) {
          displayEl.textContent = value;
        }
      }
    });
    
    console.log('❄️ Snow UI updated');
  }

  // --- Setup Snow Controls ---
  function setupSnowControls() {
    console.log('❄️ Setting up snow controls...');
    
    // Snow preset buttons
    const snowBtns = document.querySelectorAll('.snow-preset-btn');
    console.log('❄️ Found snow buttons:', snowBtns.length);
    
    snowBtns.forEach(btn => {
      // Remove any existing listeners to prevent duplicates
      btn.removeEventListener('click', handleSnowPresetClick);
      btn.addEventListener('click', handleSnowPresetClick);
    });

    function handleSnowPresetClick(e) {
      const preset = this.dataset.snowPreset;
      console.log('❄️ Snow preset clicked:', preset);
      if (preset) {
        applySnowPreset(preset);
      }
    }

    // Mode selector
    const modeSelect = document.getElementById('snowModeSelect');
    if (modeSelect) {
      modeSelect.removeEventListener('change', handleModeChange);
      modeSelect.addEventListener('change', handleModeChange);
    }

    function handleModeChange(e) {
      console.log('❄️ Mode changed to:', this.value);
      setSnowMode(this.value);
    }

    // Apply button
    const applyBtn = document.getElementById('snowApplyBtn');
    if (applyBtn) {
      applyBtn.removeEventListener('click', handleApplyClick);
      applyBtn.addEventListener('click', handleApplyClick);
    }

    function handleApplyClick() {
      console.log('❄️ Apply button clicked');
      const count = parseInt(document.getElementById('snowCountSlider')?.value || SNOW_CONFIG.count);
      const speed = parseFloat(document.getElementById('snowSpeedSlider')?.value || SNOW_CONFIG.speed);
      const size = parseFloat(document.getElementById('snowSizeSlider')?.value || SNOW_CONFIG.size);
      const wind = parseFloat(document.getElementById('snowWindSlider')?.value || SNOW_CONFIG.wind);
      const opacity = parseFloat(document.getElementById('snowOpacitySlider')?.value || SNOW_CONFIG.opacity);

      SNOW_CONFIG.count = count;
      SNOW_CONFIG.speed = speed;
      SNOW_CONFIG.size = size;
      SNOW_CONFIG.wind = wind;
      SNOW_CONFIG.opacity = opacity;
      SNOW_CONFIG.preset = 'custom';

      saveSnowSettings();

      if (snowInitialized) {
        initSnowflakes();
      }

      updateSnowUI();
      showSnowToast('✅ Snow settings applied');
    }

    // Live slider updates
    document.querySelectorAll('.snow-control-group input[type="range"]').forEach(slider => {
      slider.removeEventListener('input', handleSliderInput);
      slider.addEventListener('input', handleSliderInput);
    });

    function handleSliderInput() {
      const display = document.getElementById(this.id.replace('Slider', 'Display'));
      if (display) {
        display.textContent = this.value;
      }
    }

    // Initial UI update
    updateSnowUI();
    console.log('❄️ Snow controls setup complete');
  }

  // --- Setup Snow Observers ---
  function setupSnowObservers() {
    // Detect when tab5 is opened to reinitialize snow controls
    document.addEventListener('click', function(e) {
      const tabBtn = e.target.closest('.tab-button[data-tab="tab5"]');
      if (tabBtn) {
        console.log('❄️ Stars tab clicked, reinitializing snow controls...');
        setTimeout(() => {
          setupSnowControls();
          initSnowflakes();
        }, 100);
      }
    });
  }

  // --- Initialize Snow System ---
  function initSnowSystem() {
    console.log('❄️ Initializing snow system...');
    
    // Load settings from localStorage
    loadSnowSettings();
    
    // Initialize snowflakes
    initSnowflakes();
    
    // Setup controls
    setupSnowControls();
    
    // Setup observers for tab switching
    setupSnowObservers();
    
    console.log('❄️ Snow animation system initialized');
    console.log('❄️ Current snow config:', SNOW_CONFIG);
  }

  // --- Expose Snow Functions ---
  window.SNOW_PRESETS = SNOW_PRESETS;
  window.snowSettings = snowSettings;
  window.applySnowPreset = applySnowPreset;
  window.setSnowMode = setSnowMode;
  window.getSnowMode = getSnowMode;
  window.loadSnowSettings = loadSnowSettings;
  window.saveSnowSettings = saveSnowSettings;
  window.initSnowSystem = initSnowSystem;
  window.drawSnowflakes = drawSnowflakes;
  window.initSnowflakes = initSnowflakes;
  window.updateSnowUI = updateSnowUI;

  // ============================================================
  // MAIN ANIMATION LOOP (Integrated with Snow)
  // ============================================================

  function animate(time) {
    ctx.clearRect(0, 0, width, height);

    // ✅ FIX: Always draw if canvas is visible OR snow is active
    const mode = getSnowMode();
    const isSnowActive = (mode === 'snow' || mode === 'both');
    const canvasVisible = isVisible || isSnowActive;
    
    // Make sure canvas is visible if snow is active
    if (isSnowActive && !isVisible) {
      canvas.style.display = 'block';
      canvas.style.opacity = '1';
    }

    if (canvasVisible) {
      const color = getCurrentColor();
      
      // Draw stars if mode is 'stars' or 'both'
      if (mode === 'stars' || mode === 'both') {
        for (const star of stars) {
          star.update(time);
          star.draw(ctx, color);
        }
        drawConnections(ctx, color);
      }
      
      // Draw snow if mode is 'snow' or 'both'
      if (mode === 'snow' || mode === 'both') {
        drawSnowflakes();
      }
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
    initSnowSystem();

    const shouldShow = shouldShowStars();
    isVisible = shouldShow;
    canvas.style.display = shouldShow ? "block" : "none";
    canvas.style.opacity = shouldShow ? "1" : "0";

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
  if (document.readyState === "complete") {
    startAnimation();
  } else {
    window.addEventListener("load", startAnimation);
  }

  // --- Resize ---
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 200);
  });

  // --- Expose sidebar state handler for global.js ---
  window.updateStarsForSidebar = function (collapsed) {
    updateVisibility();
  };

  // --- Toggle stars externally ---
  window.toggleStars = function (show) {
    updateVisibility();
  };

  // --- Update color on theme change ---
  window.updateStarColor = function () {
    if (canvas && isVisible) {
      canvas.style.opacity = "0.99";
      setTimeout(() => {
        canvas.style.opacity = "1";
      }, 10);
    }
  };

  // Listen for theme changes
  const observer = new MutationObserver(function () {
    window.updateStarColor();
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  // --- Listen for sidebar class changes ---
  const sidebarObserver = new MutationObserver(function () {
    updateVisibility();
  });

  const checkSidebar = setInterval(function () {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
      sidebarObserver.observe(sidebar, {
        attributes: true,
        attributeFilter: ["class"],
      });
      clearInterval(checkSidebar);
      console.log("✅ Sidebar observer attached");
    }
  }, 100);

  console.log("✨ Starry background initialized (responsive)");

  window.showPresetToast = showPresetToast;

  // ============================================================
  // ADVANCED SETTINGS – Fonts, Import, Export
  // ============================================================

  // --- Font Settings ---
  const FONT_DEFAULTS = {
    family: "Syne",
    size: 16,
    customURL: "",
  };

  let fontSettings = { ...FONT_DEFAULTS };

  function loadFontSettings() {
    const saved = localStorage.getItem("gc-font-settings");
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
    localStorage.setItem("gc-font-settings", JSON.stringify(fontSettings));
    applyFontSettings();
  }

  function applyFontSettings() {
    const html = document.documentElement;
    const body = document.body;

    if (fontSettings.family === "custom" && fontSettings.customURL) {
      loadCustomFont(fontSettings.customURL);
    } else if (fontSettings.family !== "custom") {
      html.style.fontFamily = fontSettings.family + ", sans-serif";
      body.style.fontFamily = fontSettings.family + ", sans-serif";
    }

    html.style.fontSize = fontSettings.size + "px";
    body.style.fontSize = fontSettings.size + "px";

    html.style.setProperty("--font-body", fontSettings.family + ", sans-serif");
    html.style.setProperty("--font-size-base", fontSettings.size + "px");

    updateFontUI();
  }

  function loadCustomFont(url) {
    let cleanUrl = url.trim().replace(/^['"]|['"]$/g, "");

    let fontUrl = cleanUrl;
    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      fontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(cleanUrl)}:wght@400;500;600;700&display=swap`;
    }

    const linkId = "custom-font-link";
    let link = document.getElementById(linkId);

    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = fontUrl;
      document.head.appendChild(link);
    } else {
      link.href = fontUrl;
    }

    link.onload = function () {
      let fontName = cleanUrl;
      if (cleanUrl.includes("family=")) {
        fontName = cleanUrl.split("family=")[1].split("&")[0];
      }
      document.documentElement.style.fontFamily = `'${fontName}', sans-serif`;
      showToast(`✅ Font "${fontName}" loaded successfully`, "success");
    };

    link.onerror = function () {
      showToast(
        "❌ Failed to load custom font. Please check the URL.",
        "error",
      );
    };
  }

  function updateFontUI() {
    const familySelect = document.getElementById("fontFamilySelect");
    const customInput = document.getElementById("customFontInput");
    const customURL = document.getElementById("customFontURL");
    const sizeSlider = document.getElementById("fontSizeSlider");
    const sizeDisplay = document.getElementById("fontSizeDisplay");

    if (familySelect) {
      familySelect.value = fontSettings.family;
      if (customInput) {
        customInput.style.display =
          fontSettings.family === "custom" ? "flex" : "none";
      }
    }
    if (customURL) {
      customURL.value = fontSettings.customURL || "";
    }
    if (sizeSlider) {
      sizeSlider.value = fontSettings.size;
      if (sizeDisplay) sizeDisplay.textContent = fontSettings.size + "px";
    }
  }

  function attachAdvancedEvents() {
    const familySelect = document.getElementById("fontFamilySelect");
    const customInput = document.getElementById("customFontInput");
    const customURL = document.getElementById("customFontURL");
    const loadCustomBtn = document.getElementById("loadCustomFontBtn");
    const sizeSlider = document.getElementById("fontSizeSlider");
    const sizeDisplay = document.getElementById("fontSizeDisplay");
    const exportBtn = document.getElementById("exportSettingsBtn");
    const importBtn = document.getElementById("importSettingsBtn");
    const importFile = document.getElementById("importFileInput");

    if (familySelect) {
      familySelect.addEventListener("change", function () {
        const val = this.value;
        fontSettings.family = val;
        if (customInput) {
          customInput.style.display = val === "custom" ? "flex" : "none";
        }
        if (val === "custom" && customURL && customURL.value.trim()) {
          loadCustomFont(customURL.value.trim());
        } else if (val !== "custom") {
          saveFontSettings();
        } else {
          saveFontSettings();
        }
      });
    }

    if (loadCustomBtn && customURL) {
      loadCustomBtn.addEventListener("click", function () {
        let url = customURL.value.trim();
        if (url) {
          url = url.replace(/^['"]|['"]$/g, "");

          if (
            !url.startsWith("http://") &&
            !url.startsWith("https://") &&
            !url.includes("fonts.googleapis.com")
          ) {
            if (!url.includes(" ")) {
              url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(url)}:wght@400;500;600;700&display=swap`;
            }
          }

          fontSettings.customURL = url;
          fontSettings.family = "custom";
          saveFontSettings();

          const familySelect = document.getElementById("fontFamilySelect");
          if (familySelect) familySelect.value = "custom";
          const customInput = document.getElementById("customFontInput");
          if (customInput) customInput.style.display = "flex";

          loadCustomFont(url);
        } else {
          showToast("Please enter a valid font URL or font name", "error");
        }
      });
    }

    if (sizeSlider) {
      sizeSlider.addEventListener("input", function () {
        const val = parseInt(this.value);
        if (sizeDisplay) sizeDisplay.textContent = val + "px";
        fontSettings.size = val;
        document.documentElement.style.fontSize = val + "px";
      });
      sizeSlider.addEventListener("change", function () {
        saveFontSettings();
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener("click", exportAllSettings);
    }

    if (importBtn && importFile) {
      importBtn.addEventListener("click", function () {
        importFile.click();
      });
      importFile.addEventListener("change", function (e) {
        if (this.files && this.files[0]) {
          importAllSettings(this.files[0]);
          this.value = "";
        }
      });
    }
  }

  // --- Import / Export ---
  function getAllSettings() {
    return {
      version: "1.0",
      exportDate: new Date().toISOString(),
      settings: {
        colorTheme: localStorage.getItem("gc-color-theme") || "indigo",
        starPreset: localStorage.getItem("star-preset") || "calm",
        starCustom: JSON.parse(localStorage.getItem("star-custom") || "{}"),
        font: JSON.parse(
          localStorage.getItem("gc-font-settings") ||
            JSON.stringify(FONT_DEFAULTS),
        ),
      },
    };
  }

  function applyAllSettings(data) {
    if (!data || !data.settings) return;
    const s = data.settings;
    if (
      s.colorTheme &&
      window.COLOR_THEMES &&
      window.COLOR_THEMES[s.colorTheme]
    ) {
      localStorage.setItem("gc-color-theme", s.colorTheme);
      if (typeof window.applyTheme === "function") {
        window.applyTheme(s.colorTheme, false);
      }
    }
    if (s.starPreset) {
      localStorage.setItem("star-preset", s.starPreset);
      if (typeof window.applyStarPreset === "function") {
        window.applyStarPreset(s.starPreset);
      }
    }
    if (s.starCustom && Object.keys(s.starCustom).length > 0) {
      localStorage.setItem("star-custom", JSON.stringify(s.starCustom));
      if (typeof window.reloadStars === "function") {
        window.reloadStars();
      }
    }
    if (s.font) {
      localStorage.setItem("gc-font-settings", JSON.stringify(s.font));
      fontSettings = { ...FONT_DEFAULTS, ...s.font };
      applyFontSettings();
    }
    showToast("✅ All settings imported successfully", "success");
    setTimeout(() => location.reload(), 1500);
  }

  function exportAllSettings() {
    const data = getAllSettings();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `devops-journey-settings-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("📤 Settings exported successfully", "success");
  }

  function importAllSettings(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.settings) {
          showToast("❌ Invalid settings file", "error");
          return;
        }
        applyAllSettings(data);
      } catch (err) {
        showToast("❌ Failed to parse settings file", "error");
      }
    };
    reader.readAsText(file);
  }

  // --- Initialize Fonts ---
  loadFontSettings();

  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    attachAdvancedEvents();
  } else {
    document.addEventListener("DOMContentLoaded", attachAdvancedEvents);
  }

  document.addEventListener("click", function (e) {
    const tabBtn = e.target.closest('.tab-button[data-tab="tab5"]');
    if (tabBtn) {
      setTimeout(attachAdvancedEvents, 100);
    }
  });

  // Expose font functions globally
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
    defaultTheme: "indigo",
  };

  let appearanceSettings = { ...APPEARANCE_DEFAULTS };

  function loadAppearanceSettings() {
    const saved = localStorage.getItem("gc-appearance-settings");
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
    localStorage.setItem(
      "gc-appearance-settings",
      JSON.stringify(appearanceSettings),
    );
    applyAppearanceSettings();
  }

  function applyAppearanceSettings() {
    const html = document.documentElement;

    const intensity = appearanceSettings.accentIntensity / 100;
    html.style.setProperty("--accent-intensity", intensity);

    const radius = appearanceSettings.borderRadius;
    html.style.setProperty("--radius-sm", `${radius * 0.75}px`);
    html.style.setProperty("--radius-md", `${radius}px`);
    html.style.setProperty("--radius-lg", `${radius * 1.5}px`);
    html.style.setProperty("--radius-xl", `${radius * 2.5}px`);

    const shadow = appearanceSettings.shadowIntensity / 100;
    const shadowSm = `0 1px 3px rgba(0,0,0,${0.06 * shadow}), 0 1px 2px rgba(0,0,0,${0.04 * shadow})`;
    const shadowMd = `0 4px 12px rgba(0,0,0,${0.08 * shadow}), 0 2px 4px rgba(0,0,0,${0.04 * shadow})`;
    const shadowLg = `0 10px 30px rgba(0,0,0,${0.1 * shadow}), 0 4px 8px rgba(0,0,0,${0.06 * shadow})`;
    html.style.setProperty("--shadow-sm", shadowSm);
    html.style.setProperty("--shadow-md", shadowMd);
    html.style.setProperty("--shadow-lg", shadowLg);

    if (appearanceSettings.reducedMotion) {
      html.classList.add("reduced-motion");
      html.style.setProperty("--transition", "0s");
      html.style.setProperty("--animation-duration", "0s");
    } else {
      html.classList.remove("reduced-motion");
      html.style.removeProperty("--transition");
      html.style.removeProperty("--animation-duration");
    }

    if (appearanceSettings.highContrast) {
      html.classList.add("high-contrast");
    } else {
      html.classList.remove("high-contrast");
    }

    updateAppearanceUI();
  }

  function renderAdvancedSettings() {
    const container = document.querySelector(".advanced-settings-content");
    if (!container) return;

    if (container.querySelector(".appearance-settings")) return;

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
            <input type="checkbox" id="reducedMotionToggle" ${appearanceSettings.reducedMotion ? "checked" : ""}>
            <span>Reduced Motion</span>
          </label>
          <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
            <input type="checkbox" id="highContrastToggle" ${appearanceSettings.highContrast ? "checked" : ""}>
            <span>High Contrast</span>
          </label>
        </div>
        
        <hr class="settings-divider">
        
        <h5 style="margin: 0.5rem 0 0.75rem; font-family: var(--font-display); font-size: 0.9rem;">🔧 Default Settings</h5>
        
        <div class="select-group">
          <label for="defaultThemeSelect">Default Theme:</label>
          <select id="defaultThemeSelect" class="styled-select">
          <option value="">— Select a theme —</option>
            ${Object.entries(COLOR_THEMES)
              .map(
                ([key, theme]) => `
              <option value="${key}" ${appearanceSettings.defaultTheme === key ? "selected" : ""}>
                ${theme.icon} ${theme.name}
              </option>
            `,
              )
              .join("")}
          </select>
          <span class="hint">(Load and select as default 📺)</span>
        </div>
        
        <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem; flex-wrap: wrap;">
          <button id="applyAppearanceBtn" class="btn btn-primary btn-sm">Apply All</button>
          <button id="resetAppearanceBtn" class="btn btn-secondary btn-sm">Reset All</button>
        </div>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", html);
    attachAppearanceEvents();
  }

  function attachAppearanceEvents() {
    const accentSlider = document.getElementById("accentIntensitySlider");
    const accentDisplay = document.getElementById("accentIntensityDisplay");
    if (accentSlider) {
      accentSlider.addEventListener("input", function () {
        const val = parseInt(this.value);
        if (accentDisplay) accentDisplay.textContent = val + "%";
        appearanceSettings.accentIntensity = val;
        applyAppearanceSettings();
      });
    }

    const radiusSlider = document.getElementById("borderRadiusSlider");
    const radiusDisplay = document.getElementById("borderRadiusDisplay");
    if (radiusSlider) {
      radiusSlider.addEventListener("input", function () {
        const val = parseInt(this.value);
        if (radiusDisplay) radiusDisplay.textContent = val + "px";
        appearanceSettings.borderRadius = val;
        applyAppearanceSettings();
      });
    }

    const shadowSlider = document.getElementById("shadowIntensitySlider");
    const shadowDisplay = document.getElementById("shadowIntensityDisplay");
    if (shadowSlider) {
      shadowSlider.addEventListener("input", function () {
        const val = parseInt(this.value);
        if (shadowDisplay) shadowDisplay.textContent = val + "%";
        appearanceSettings.shadowIntensity = val;
        applyAppearanceSettings();
      });
    }

    const motionToggle = document.getElementById("reducedMotionToggle");
    if (motionToggle) {
      motionToggle.addEventListener("change", function () {
        appearanceSettings.reducedMotion = this.checked;
        saveAppearanceSettings();
        showToast(
          `♿ Reduced Motion ${this.checked ? "enabled" : "disabled"}`,
          "info",
        );
      });
    }

    const contrastToggle = document.getElementById("highContrastToggle");
    if (contrastToggle) {
      contrastToggle.addEventListener("change", function () {
        appearanceSettings.highContrast = this.checked;
        saveAppearanceSettings();
        showToast(
          `👁️ High Contrast ${this.checked ? "enabled" : "disabled"}`,
          "info",
        );
      });
    }

    const themeSelect = document.getElementById("defaultThemeSelect");
    if (themeSelect) {
      themeSelect.addEventListener("change", function () {
        appearanceSettings.defaultTheme = this.value;
        saveAppearanceSettings();
        showToast(
          `🔧 Default theme set to ${COLOR_THEMES[this.value].name}`,
          "info",
        );
      });
    }

    const applyBtn = document.getElementById("applyAppearanceBtn");
    if (applyBtn) {
      applyBtn.addEventListener("click", function () {
        saveAppearanceSettings();
        showToast("✅ Appearance settings applied", "success");
      });
    }

    const resetBtn = document.getElementById("resetAppearanceBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        appearanceSettings = { ...APPEARANCE_DEFAULTS };
        saveAppearanceSettings();
        const container = document.querySelector(".advanced-settings-content");
        if (container) {
          const existing = container.querySelector(".appearance-settings");
          if (existing) existing.remove();
          renderAdvancedSettings();
        }
        showToast("🔄 Appearance settings reset to default", "info");
      });
    }
  }

  function updateAppearanceUI() {
    const accentSlider = document.getElementById("accentIntensitySlider");
    const accentDisplay = document.getElementById("accentIntensityDisplay");
    const radiusSlider = document.getElementById("borderRadiusSlider");
    const radiusDisplay = document.getElementById("borderRadiusDisplay");
    const shadowSlider = document.getElementById("shadowIntensitySlider");
    const shadowDisplay = document.getElementById("shadowIntensityDisplay");
    const motionToggle = document.getElementById("reducedMotionToggle");
    const contrastToggle = document.getElementById("highContrastToggle");
    const themeSelect = document.getElementById("defaultThemeSelect");

    if (accentSlider) accentSlider.value = appearanceSettings.accentIntensity;
    if (accentDisplay)
      accentDisplay.textContent = appearanceSettings.accentIntensity + "%";
    if (radiusSlider) radiusSlider.value = appearanceSettings.borderRadius;
    if (radiusDisplay)
      radiusDisplay.textContent = appearanceSettings.borderRadius + "px";
    if (shadowSlider) shadowSlider.value = appearanceSettings.shadowIntensity;
    if (shadowDisplay)
      shadowDisplay.textContent = appearanceSettings.shadowIntensity + "%";
    if (motionToggle) motionToggle.checked = appearanceSettings.reducedMotion;
    if (contrastToggle)
      contrastToggle.checked = appearanceSettings.highContrast;
    if (themeSelect) themeSelect.value = appearanceSettings.defaultTheme;
  }

  loadAppearanceSettings();

  window.appearanceSettings = appearanceSettings;
  window.loadAppearanceSettings = loadAppearanceSettings;
  window.saveAppearanceSettings = saveAppearanceSettings;
  window.applyAppearanceSettings = applyAppearanceSettings;
  window.renderAdvancedSettings = renderAdvancedSettings;
  window.attachAppearanceEvents = attachAppearanceEvents;

  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    renderAdvancedSettings();
  } else {
    document.addEventListener("DOMContentLoaded", renderAdvancedSettings);
  }

  document.addEventListener("click", function (e) {
    const tabBtn = e.target.closest('.tab-button[data-tab="tab5"]');
    if (tabBtn) {
      setTimeout(renderAdvancedSettings, 150);
    }
  });

  document.addEventListener("click", function (e) {
    const details = e.target.closest(".advanced-settings-container");
    if (details && details.open) {
      setTimeout(renderAdvancedSettings, 100);
    }
  });

  // ============================================================
  // STAR PRESETS - Modal Integration
  // ============================================================

  // --- Preset Definitions ---
  const STAR_PRESETS = {
    calm: {
      name: "Calm Night",
      icon: "🌙",
      desc: "Gentle, serene",
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
      name: "Active",
      icon: "🌌",
      desc: "Lively drift",
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
      name: "Minimal",
      icon: "⭐",
      desc: "Clean & simple",
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
      name: "Constellation",
      icon: "🔭",
      desc: "Rich connections",
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
      name: "Dense",
      icon: "🌠",
      desc: "Full starfield",
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
      name: "Off",
      icon: "🚫",
      desc: "Disable stars",
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
    },
  };

  // --- Apply Star Preset ---
  function applyStarPreset(presetName) {
    const preset = STAR_PRESETS[presetName];
    if (!preset) {
      console.warn('⚠️ Star preset not found:', presetName);
      return;
    }

    // Update STAR_CONFIG only
    const configValues = { ...preset };
    delete configValues.name;
    delete configValues.icon;
    delete configValues.desc;
    Object.assign(STAR_CONFIG, configValues);

    localStorage.setItem('star-preset', presetName);

    // Update UI
    document.querySelectorAll('.star-preset-btn').forEach(btn => {
      const isActive = btn.dataset.preset === presetName;
      btn.classList.toggle('active', isActive);
    });

    updateStarSliders(preset);

    // ✅ FIX: Only hide canvas if star preset is 'off' AND snow mode is NOT active
    const snowMode = getSnowMode();
    const isSnowActive = (snowMode === 'snow' || snowMode === 'both');
    
    if (presetName === 'off' && !isSnowActive) {
      // Only hide if snow isn't active
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

    // Refresh stars
    if (window.reloadStars) {
      window.reloadStars();
    }
    
    showPresetToast(presetName);
    console.log('✨ Star preset applied:', presetName);
  }

  function updateStarSliders(preset) {
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
          display.textContent = key === 'movementSpeed' ? preset[key].toFixed(4) : preset[key];
        }
      }
    });
  }

  // --- Update Sliders ---
  function updateSliders(preset) {
    const sliderMap = {
      starCountSlider: "starCount",
      twinkleSpeedSlider: "twinkleSpeed",
      movementSpeedSlider: "movementSpeed",
      connectionDistanceSlider: "connectionDistance",
    };

    Object.entries(sliderMap).forEach(([sliderId, key]) => {
      const slider = document.getElementById(sliderId);
      const display = document.getElementById(
        sliderId.replace("Slider", "Display"),
      );
      if (slider && preset[key] !== undefined) {
        slider.value = preset[key];
        if (display) {
          if (key === "movementSpeed") {
            display.textContent = parseFloat(preset[key]).toFixed(4);
          } else {
            display.textContent = preset[key];
          }
        }
      }
    });
  }

  // --- Initialize Star Presets ---
  function initStarPresets() {
    console.log("✨ Initializing star presets...");

    const saved = localStorage.getItem("star-preset") || "calm";

    const presetBtns = document.querySelectorAll(".star-preset-btn");

    if (presetBtns.length === 0) {
      console.log("⏳ No preset buttons found yet, waiting...");
      const observer = new MutationObserver(function () {
        const btns = document.querySelectorAll(".star-preset-btn");
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
    setTimeout(() => {
      applyStarPreset(savedPreset);
    }, 300);

    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const preset = this.dataset.preset;
        if (preset) {
          applyStarPreset(preset);
        }
      });
    });

    setupCustomControls();
    console.log("✅ Star presets UI ready");
  }

  // --- Setup Custom Controls ---
  function setupCustomControls() {
    const applyBtn = document.getElementById("applyCustomStars");
    if (applyBtn) {
      applyBtn.addEventListener("click", function () {
        const custom = {
          starCount: parseInt(
            document.getElementById("starCountSlider")?.value || 150,
          ),
          twinkleSpeed: parseFloat(
            document.getElementById("twinkleSpeedSlider")?.value || 0.008,
          ),
          movementSpeed: parseFloat(
            document.getElementById("movementSpeedSlider")?.value || 0.00001,
          ),
          connectionDistance: parseInt(
            document.getElementById("connectionDistanceSlider")?.value || 350,
          ),
          minSize: 0.8,
          maxSize: 2.5,
          maxOpacity: 0.9,
          minOpacity: 0.3,
          movementRange: 15,
          connectStars: true,
          connectionOpacity: 0.07,
          desktopBreakpoint: 800,
        };

        if (window.CONFIG) {
          Object.assign(window.CONFIG, custom);
        }

        localStorage.setItem("star-preset", "custom");
        localStorage.setItem("star-custom", JSON.stringify(custom));

        if (window.reloadStars) {
          window.reloadStars();
        }

        showPresetToast("custom");
      });
    }

    document
      .querySelectorAll('.star-control-group input[type="range"]')
      .forEach((slider) => {
        slider.addEventListener("input", function () {
          const display = document.getElementById(
            this.id.replace("Slider", "Display"),
          );
          if (display) {
            if (this.id === "movementSpeedSlider") {
              display.textContent = parseFloat(this.value).toFixed(4);
            } else {
              display.textContent = this.value;
            }
          }
        });
      });

    const brightnessSlider = document.getElementById("brightnessSlider");
    const brightnessDisplay = document.getElementById("brightnessDisplay");

    if (brightnessSlider) {
      const saved = localStorage.getItem("star-brightness");
      if (saved !== null) {
        const val = parseInt(saved);
        brightnessSlider.value = val;
        CONFIG.brightness = val / 100;
        if (brightnessDisplay) brightnessDisplay.textContent = val + "%";
      } else {
        brightnessSlider.value = 200;
        CONFIG.brightness = 1.0;
        if (brightnessDisplay) brightnessDisplay.textContent = "100%";
      }

      brightnessSlider.addEventListener("input", function () {
        const val = parseInt(this.value);
        const normalized = val / 100;
        CONFIG.brightness = Math.max(0.2, Math.min(2.0, normalized));
        if (brightnessDisplay) brightnessDisplay.textContent = val + "%";
        localStorage.setItem("star-brightness", val);
      });
    }
  }

  // --- Load custom preset from localStorage ---
  function loadCustomPreset() {
    const custom = localStorage.getItem("star-custom");
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
  if (document.readyState === "complete") {
    initStarPresets();
  } else {
    document.addEventListener("DOMContentLoaded", initStarPresets);
  }

  // Also init when modal tabs are switched (for dynamic loading)
  document.addEventListener("click", function (e) {
    const tabBtn = e.target.closest('.tab-button[data-tab="tab5"]');
    if (tabBtn) {
      setTimeout(initStarPresets, 100);
    }
  });

  console.log("🎨 Star presets system loaded");
})(); // ← Only ONE closing parenthesis at the very end
