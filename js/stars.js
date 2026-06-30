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
})();

window.showPresetToast = showPresetToast;