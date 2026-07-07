# 🎨 Animation System — Tab 5 Overview

## 📋 Table of Contents

1. [Purpose](#purpose)
2. [Architecture Overview](#architecture-overview)
3. [Animation Modes](#animation-modes)
4. [Starfield Presets](#starfield-presets)
5. [Snowfield Presets](#snowfield-presets)
6. [Custom Controls](#custom-controls)
7. [Advanced Settings](#advanced-settings)
8. [File Structure](#file-structure)
9. [How It Works](#how-it-works)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Purpose

Tab 5 provides users with a **unified animation control panel** for the site's background. It allows:

- Switching between **Starfield**, **Snowfield**, or **Both** animations
- Selecting from **preset animation styles**
- **Customizing** animation parameters (count, speed, size, etc.)
- Saving preferences to **localStorage** for persistence across sessions

---

## 🏗️ Architecture Overview
```

┌─────────────────────────────────────────────────────────────────────────────┐
│ TAB 5 — STARS & SNOW │
├─────────────────────────────────────────────────────────────────────────────┤
│ │
│ ┌───────────────────────────────────────────────────────────────────────┐ │
│ │ 🎯 ANIMATION MODE SELECTOR (Top — Always Visible) │ │
│ │ ┌─────────────────────────────────────────────────────────────────┐ │ │
│ │ │ [✨ Stars Only] [❄️ Snow Only] [🌌 Both] │ │ │
│ │ └─────────────────────────────────────────────────────────────────┘ │ │
│ └───────────────────────────────────────────────────────────────────────┘ │
│ │
│ ┌───────────────────────────────────────────────────────────────────────┐ │
│ │ ▼ ✨ STARFIELD PRESETS │ │
│ │ ┌─────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Preset Buttons: [🌙 Calm] [🌌 Active] [⭐ Minimal] │ │ │
│ │ │ [🔭 Constellation] [🌠 Dense] [🚫 Off] │ │ │
│ │ ├─────────────────────────────────────────────────────────────────┤ │ │
│ │ │ ⚙️ Customize (collapsible) │ │ │
│ │ │ ┌───────────────────────────────────────────────────────────┐ │ │ │
│ │ │ │ Star Count: [=====●=====] 150 │ │ │ │
│ │ │ │ Twinkle Speed: [=====●=====] 0.008 │ │ │ │
│ │ │ │ Movement Speed:[=====●=====] 0.00001 │ │ │ │
│ │ │ │ Connection: [=====●=====] 350 │ │ │ │
│ │ │ │ Brightness: [=====●=====] 100% │ │ │ │
│ │ │ │ [Apply Custom] │ │ │ │
│ │ │ └───────────────────────────────────────────────────────────┘ │ │ │
│ │ └─────────────────────────────────────────────────────────────────┘ │ │
│ └───────────────────────────────────────────────────────────────────────┘ │
│ │
│ ┌───────────────────────────────────────────────────────────────────────┐ │
│ │ ▼ ❄️ SNOWFIELD PRESETS │ │
│ │ ┌─────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Preset Buttons: [❄️ Light] [🌨️ Gentle] [❄️ Moderate] │ │ │
│ │ │ [🌨️ Heavy] [❄️ Blizzard] [🚫 Off] │ │ │
│ │ ├─────────────────────────────────────────────────────────────────┤ │ │
│ │ │ ⚙️ Customize Snow (collapsible) │ │ │
│ │ │ ┌───────────────────────────────────────────────────────────┐ │ │ │
│ │ │ │ Snowflake Count: [=====●=====] 200 │ │ │ │
│ │ │ │ Fall Speed: [=====●=====] 1.0 │ │ │ │
│ │ │ │ Snowflake Size: [=====●=====] 3 │ │ │ │
│ │ │ │ Wind Strength: [=====●=====] 0.5 │ │ │ │
│ │ │ │ Opacity: [=====●=====] 0.9 │ │ │ │
│ │ │ │ [Apply Snow Settings] │ │ │ │
│ │ │ └───────────────────────────────────────────────────────────┘ │ │ │
│ │ └─────────────────────────────────────────────────────────────────┘ │ │
│ └───────────────────────────────────────────────────────────────────────┘ │
│ │
│ ┌───────────────────────────────────────────────────────────────────────┐ │
│ │ ▼ ⚙️ ADVANCED SETTINGS │ │
│ │ ┌─────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Font Family: [Syne ▼] │ │ │
│ │ │ Custom Font: [https://fonts...] [Load Font] │ │ │
│ │ │ Font Size: [=====●=====] 16px │ │ │
│ │ │ ───────────────────────────────────────────────────────────── │ │ │
│ │ │ [📤 Export Settings] [📥 Import Settings] │ │ │
│ │ └─────────────────────────────────────────────────────────────────┘ │ │
│ └───────────────────────────────────────────────────────────────────────┘ │
│ │
└─────────────────────────────────────────────────────────────────────────────┘

```

---

## 🎬 Animation Modes

The **Animation Mode Selector** controls which background animation is active:

| Mode | Description | Use Case |
|------|-------------|----------|
| **✨ Stars Only** | Only the starfield animation runs. | Default mode; classic look. |
| **❄️ Snow Only** | Only the snow animation runs. | Winter / seasonal theme. |
| **🌌 Both** | Both starfield and snow run together. | Max visual richness. |

**Implementation:**
- The mode is stored in `SNOW_CONFIG.mode`.
- The main animation loop (`animate()`) checks the mode and renders the appropriate layers.
- Switching modes updates the canvas in real-time.

---

## ✨ Starfield Presets

Starfield presets modify the **stars** animation parameters:

| Preset | Icon | Description | Visual Effect |
|--------|------|-------------|---------------|
| **Calm Night** | 🌙 | Gentle, serene | Slow drift, subtle twinkle, warm stars |
| **Active** | 🌌 | Lively drift | Faster movement, brighter stars |
| **Minimal** | ⭐ | Clean & simple | Fewer stars, no connections |
| **Constellation** | 🔭 | Rich connections | Many connection lines between stars |
| **Dense** | 🌠 | Full starfield | Maximum star count, dense field |
| **Off** | 🚫 | Disable stars | Hides starfield entirely |

**Parameters controlled by presets:**
- `starCount` — number of stars
- `minSize` / `maxSize` — star size range
- `twinkleSpeed` — how fast stars flicker
- `movementSpeed` — drift speed
- `movementRange` — drift distance
- `connectStars` — whether to draw lines
- `connectionDistance` — max distance for connections
- `connectionOpacity` — line brightness

---

## ❄️ Snowfield Presets

Snowfield presets modify the **snow** animation parameters:

| Preset | Icon | Description | Visual Effect |
|--------|------|-------------|---------------|
| **Light Flurry** | ❄️ | Gentle flakes | Few flakes, slow fall |
| **Gentle** | 🌨️ | Soft falling | Moderate count, calm |
| **Moderate** | ❄️ | Steady snow | Balanced count and speed |
| **Heavy** | 🌨️ | Dense fall | Many flakes, faster fall |
| **Blizzard** | ❄️ | Intense | Maximum count, fast, high wind |
| **Off** | 🚫 | Disable snow | Hides snowfield entirely |

**Parameters controlled by presets:**
- `count` — number of snowflakes
- `speed` — fall speed
- `size` — snowflake size
- `wind` — horizontal drift
- `opacity` — visibility / brightness

---

## 🎛️ Custom Controls

### Star Custom Controls
| Control | Range | Description |
|---------|-------|-------------|
| Star Count | 50–400 | Number of stars on canvas |
| Twinkle Speed | 0–0.05 | Flicker speed |
| Movement Speed | 0–0.02 | Drift speed |
| Connection Distance | 0–600 | Max line distance |
| Brightness | 20–200% | Overall brightness |

### Snow Custom Controls
| Control | Range | Description |
|---------|-------|-------------|
| Snowflake Count | 20–500 | Number of snowflakes |
| Fall Speed | 0.1–3.0 | How fast they fall |
| Snowflake Size | 1–8 | Flake size |
| Wind Strength | 0–2.0 | Horizontal drift |
| Opacity | 0.1–1.0 | Visibility |

---

## ⚙️ Advanced Settings

| Feature | Description |
|---------|-------------|
| **Font Family** | Choose from Syne, DM Sans, JetBrains Mono, or Custom |
| **Custom Font** | Load any Google Font by URL |
| **Font Size** | Adjust base font size (12–24px) |
| **Export Settings** | Download all settings as JSON |
| **Import Settings** | Upload a settings JSON file |

**Settings exported:**
- Color theme
- Star preset
- Star custom values
- Font settings

---

## 📁 File Structure

```

📁 Project Root
├── index.html # Tab 5 HTML structure
├── style.css # All styles (including tab 5)
├── js/
│ ├── global.js # Modal management, backup, toasts
│ ├── stars.js # Star + Snow animation engine
│ └── themes.js # Color theme system

```

---

## ⚡ How It Works

### 1. User Opens Tab 5
- The modal opens with `#tab5` active.
- The `initStarPresets()` and `initSnowSystem()` functions are called.

### 2. User Selects a Preset
- Preset button click triggers `applyStarPreset()` or `applySnowPreset()`.
- The relevant `CONFIG` object is updated.
- `localStorage` saves the preference.
- The canvas updates in real-time.
- A toast notification confirms the change.

### 3. User Customizes Parameters
- Sliders update live display values.
- Clicking "Apply Custom" saves the custom values to `localStorage`.
- The canvas updates with the new parameters.

### 4. User Changes Animation Mode
- The dropdown triggers `setSnowMode()`.
- `SNOW_CONFIG.mode` is updated.
- The main animation loop adapts to render the selected mode.

### 5. Settings Persist
- All preferences are stored in `localStorage`:
  - `star-preset` — selected star preset
  - `star-custom` — custom star values
  - `snow-settings` — snow configuration
  - `gc-font-settings` — font preferences
  - `gc-color-theme` — color theme

---

## 🐛 Troubleshooting

### Problem: Snow animation doesn't appear
1. Check that the star preset is **not** set to "Off".
2. Verify the animation mode is set to "Snow" or "Both".
3. Ensure the sidebar is collapsed (desktop) or you're on a desktop viewport (width > 800px).

### Problem: Star and snow controls are interfering
- The star and snow systems now use **separate config objects**:
  - `STAR_CONFIG` for stars
  - `SNOW_CONFIG` for snow
- They no longer share the same `CONFIG` object.

### Problem: Toasts not appearing
- Check that `window.showToast` is defined in `global.js`.
- Verify the toast container exists in the DOM.

### Problem: Presets not applying
- Check the console for errors.
- Verify the preset name matches the `data-preset` or `data-snow-preset` attribute.
- Ensure the preset exists in `STAR_PRESETS` or `SNOW_PRESETS`.

---

## 🔗 Related Documentation

| File | Purpose |
|------|---------|
| `style.css` | All visual styles for tab 5 |
| `stars.js` | Animation engine + controls |
| `global.js` | Modal system + toast notifications |
| `themes.js` | Color theme system |

---

## 📌 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-07-03 | Initial implementation of tab 5 animation system |
| 1.1 | 2026-07-03 | Separated star and snow configs |
| 1.2 | 2026-07-03 | Moved animation mode selector to top |
| 1.3 | 2026-07-03 | Added complete CSS reset for tab 5 |

---

*Documentation generated for the DevOps Journey project.*
