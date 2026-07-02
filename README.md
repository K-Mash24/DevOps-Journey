# DevOps Journey — Study Platform

[![Netlify Status](https://img.shields.io/badge/status-live-brightgreen)](https://k-mash24.github.io/DevOps-Journey/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A self‑contained, foundations‑first study website for the AWS Solutions Architect Associate (SAA) certification and the full [roadmap.sh/devops](https://roadmap.sh/devops) curriculum.

**Live site:** [k-mash24.github.io/DevOps-Journey](https://k-mash24.github.io/DevOps-Journey)

---

## 📖 Overview

This project is a **structured, self‑paced study roadmap** that builds genuine, production‑ready foundations **before touching any cloud infrastructure**. All notes are written in Markdown, version‑controlled in [Great_Cheatsheets](https://github.com/K-Mash24/Great_Cheatsheets), and published as an interactive website with flashcards, quizzes, and persistent progress tracking.

### Two‑Phase Approach

| Phase | Focus | Status |
|-------|-------|--------|
| **Phase 1 – Foundations** | 5 pillars: Networking, Linux & CLI, Security, Scripting, Databases | 🔄 Networking & Linux complete; others locked |
| **Phase 2 – DevOps Roadmap** | Docker → CI/CD → Kubernetes → IaC (Terraform/Ansible) → Monitoring | 🔒 Locked (after SAA) |

---

## 🚀 Features

### Core Learning Features
- **Interactive progress tracking** – rings, checkboxes, and sidebars update automatically from `localStorage`.
- **Modal dashboard** – view overall, phase‑level, and pillar‑level progress (with detailed checklists).
- **Flashcards & self‑grading quizzes** – test your knowledge immediately with 3 quiz sets per pillar.
- **Floating progress rings** – quick access to the dashboard from any page.
- **Image lightbox** – click any diagram to zoom and pan.
- **Dark / light theme** – respects system preference or manual toggle.
- **Offline support** – service worker caches static assets (HTML, CSS, JS, images).

### 🎨 Personalization & Appearance (New)
- **25 Color Themes** – choose from curated palettes (Indigo, Ocean, Cobalt, Crimson, etc.) with light/dark variants.
- **Theme Preview** – preview a theme live with a transparent modal.
- **Custom Color Editor** – create your own color theme using hex inputs, color pickers, and HSL sliders.
- **Font Settings** – choose font family (Syne, DM Sans, JetBrains Mono) and font size (12‑24px).
- **Custom Font Loading** – load any Google Font or custom web font URL.
- **Appearance Controls** – adjust accent intensity, border radius, and shadow intensity.
- **Accessibility** – toggle reduced motion and high contrast modes.
- **Default Theme** – set your preferred theme as the default on page load.
- **Import/Export** – backup and restore all personalization settings as JSON.

### Stars Tab (Background Animation)
- **Starfield Presets** – 6 presets (Calm, Active, Minimal, Constellation, Dense, Off).
- **Customize** – adjust star count, twinkle speed, movement speed, and connection distance.
- **Advanced Settings** – font controls, import/export (above).

### 🧩 Pillar Details
- **Phase 1 & Phase 2** – both displayed with progress rings and scroller chips.
- **Detailed Checklists** – click any pillar chip to see section‑by‑section progress.
- **Checkbox Tracking** – mark sections complete; rings update instantly.

---

## 🗂️ Project Structure

```bash
DevOps-Journey/
├── index.html            – Homepage (roadmap, cards, modal)
├── style.css             – Global styles (themes, modal, lightbox, personalization)
├── sw.js                 – Service worker (versioned cache)
├── img/                  – Icons, logos, wiring diagrams
├── html/
│   ├── networking.html   – Pillar 1 content (complete)
│   └── linux.html        – Pillar 2 content (complete)
├── js/
│   ├── global.js         – Shared logic (rings, modal, search, toast)
│   ├── stars.js          – Starfield animation + Advanced Settings (fonts, import/export)
│   ├── themes.js         – 25 color themes + Custom Color Editor (tab7)
│   ├── networking.js     – Pillar‑specific flashcards & quiz
│   └── Linux.js          – Linux‑specific flashcards & quiz
└── README.md             – This file
```

---

## 💾 Progress Tracking – localStorage Keys

All progress is stored in the browser’s `localStorage`. The following keys are currently used:

### Phase 1 – Foundations

| Pillar | Section keys | Quiz key | Congrats flag |
|--------|--------------|----------|----------------|
| Networking | `networking-section-1` … `-7` | `networking-quiz-passed` | `networking-100-congrats-shown` |
| Linux | `linux-section-1` … `-10` | `linux-quiz-passed` | `linux-100-congrats-shown` |
| Security, Scripting, Databases | (not yet implemented) | – | – |

### Phase 2 – DevOps Roadmap (binary completion)

| Pillar | Binary key | Topic keys (used in detail view) |
|--------|------------|----------------------------------|
| Docker | `phase2-docker` | `phase2-docker-topic-1` … `-8` |
| CI/CD | `phase2-cicd` | `phase2-cicd-topic-1` … `-8` |
| Kubernetes | `phase2-kubernetes` | `phase2-kubernetes-topic-1` … `-8` |
| Terraform | `phase2-terraform` | `phase2-terraform-topic-1` … `-8` |
| Monitoring | `phase2-monitoring` | `phase2-monitoring-topic-1` … `-8` |

> Topic keys are used in the **Pillar Details** modal. The binary key is automatically set to `true` when all topics are checked.

### Personalization & Appearance (New)

| Setting | Storage Key | Description |
|---------|-------------|-------------|
| Color Theme | `gc-color-theme` | Selected theme name (e.g., `ocean`) |
| Custom Theme | `gc-custom-theme` | Custom color values (light/dark modes) |
| Font Settings | `gc-font-settings` | Font family, size, custom URL |
| Appearance | `gc-appearance-settings` | Accent intensity, border radius, shadow intensity, reduced motion, high contrast, default theme |
| Star Preset | `star-preset` | Selected star preset |
| Star Custom | `star-custom` | Custom star values |

---

## 🧩 Key JavaScript Modules

### `global.js` (shared)

| Function | Purpose |
|----------|---------|
| `getPhase1PillarCompletion(pillar)` | Returns 0‑1 completion for Networking/Linux (others return 0) |
| `getPhase2PillarCompletion(pillar)` | Returns 1 if binary key is `true` |
| `updateAllUI()` | Refreshes sidebar percentages, roadmap, cards, rings, hero stats, method badges |
| `showPillarDetail(pillarId, phase)` | Renders ring + checklist inside the Pillar Details tab |
| `openModalToPillarDetails(pillarId, phase)` | Opens modal, switches to Pillar Details tab, loads data |
| `updateFloatingRings()` | Updates the homepage’s Phase1, Phase2, Overall, and floating global rings |
| `renderPhase1ModalScroller()` / `renderPhase2ModalScroller()` | Builds chip lists in the modal’s Phase1 and Phase2 tabs |
| `initModalAndFloatingRing()` | Sets up click handlers for the floating ring and modal close |
| `showToast()` | Displays toast messages in a flexbox container |
| `ensureModalExists()` | Injects the modal into pillar pages (dynamic modal) |

### `stars.js` – Starfield + Advanced Settings

| Component | Purpose |
|-----------|---------|
| **Starfield** | Canvas-based star animation with twinkle, drift, and connections |
| **Presets** | 6 preset configurations (Calm, Active, Minimal, Constellation, Dense, Off) |
| **Customize** | Sliders for star count, twinkle speed, movement speed, connection distance |
| **Advanced Settings** | Font family (Syne, DM Sans, JetBrains Mono, Custom), font size, import/export |
| **Appearance Controls** | Accent intensity, border radius, shadow intensity |
| **Accessibility** | Reduced motion toggle, high contrast toggle |
| **Default Theme** | Dropdown to set default theme on page load |

### `themes.js` – Color Themes & Custom Color Editor

| Component | Purpose |
|-----------|---------|
| **25 Themes** | Predefined color palettes with light/dark variants |
| **Theme Cards** | Grid display with icons, names, color swatches, preview/apply buttons |
| **Theme Preview** | Applies theme with transparent modal; click outside to cancel |
| **Custom Color Editor (tab7)** | Hex inputs, color pickers, and HSL sliders for all CSS variables |
| **Preset Colors** | Quick color selection grid |
| **Apply/Reset** | Save custom theme or reset to default |
| **Theme Loader** | Load any existing theme into the custom color editor |

### Pillar‑specific files (`networking.js`, `linux.js`)

- Flashcards data and rendering (25+ cards per pillar)
- Quiz data, submission, and reset (including mastery flag for 3 quiz sets)
- Floating ring creation and click handler (calls `window.openModalToPillarDetails`)
- Image lightbox implementation

---

## 🖼️ Modal Dashboard

A single modal (`#progressModal`) with **seven** tabs:

| Tab | Content |
|-----|---------|
| **Overall** | Combined Phase1+Phase2 progress ring (50% + 50%) |
| **Phase 1** | Phase1 ring + horizontal scroller with pillar chips. Clicking a chip opens **Pillar Details** tab. |
| **Phase 2** | Phase2 ring + scroller with phase chips. Clicking a chip opens **Pillar Details** tab with topic‑based checklist. |
| **Pillar Details** | Dynamic ring + checklist for the selected pillar. Checkboxes sync with `localStorage` and update the ring instantly. |
| **💾 Backup** | GitHub Gist backup/restore for study progress (token and Gist ID). |
| **✨ Stars** | Starfield presets, customization, and Advanced Settings (fonts, appearance, import/export). |
| **🎨 Themes** | 25 color themes with preview/apply, reset to default, and Custom Color Editor button. |
| **🎨 Custom Color Editor** | Hidden tab (accessible via button in Themes tab). Full color customization with hex inputs, color pickers, HSL sliders, and preset colors. |

The modal is opened by:
- Clicking the floating global ring (homepage) – shows **Overall** tab.
- Clicking a pillar/phase chip inside the modal – shows **Pillar Details** tab for that pillar.
- On pillar pages (`networking.html`, `linux.html`), clicking the floating progress ring opens the modal directly to **Pillar Details** for that pillar.

---

## 🔍 Image Lightbox

Any `<img>` inside `.accordion-body` or `.overview-content` becomes clickable and opens a full‑screen lightbox with:

- Fit‑to‑screen mode by default.
- Toggle button (`📐 Fit`) to switch between fit and actual size.
- Zoom in/out (buttons or `+`/`-` keys).
- Pan when zoomed (mouse drag or touch).
- Reset zoom (`0` key or reset button).
- Close with `Esc` or click outside.

Implemented identically in `networking.js` and `linux.js`.

---

## 📦 Service Worker (`sw.js`)

- Caches all HTML, CSS, JS, and the logo.
- Uses a **versioned cache name** (e.g. `devops-journey-2026-06-11-v1`).
- HTML files are fetched with **network‑first** (fallback to cache).
- Assets (CSS, JS, images) use **cache‑first**.
- On `activate`, old caches are automatically deleted.

> **Important:** Increment `CACHE_NAME` every time you change any cached file – otherwise users will not see updates.

---

## 🧭 Current Status (July 2026)

| Component | Status |
|-----------|--------|
| **Networking pillar** | ✅ Complete – 7 sections, 38 flashcards, 3 quiz sets, floating ring, lightbox |
| **Linux pillar** | ✅ Complete – 10 sections, 25 flashcards, 3 quiz sets, floating ring, lightbox |
| **Security / Scripting / Databases** | 🔒 Locked – placeholders only |
| **Phase 2 pillars** | 🔒 Locked – binary completion via modal; no study content yet |
| **Homepage modal** | ✅ Fully functional with 7 tabs |
| **Progress rings** | ✅ Phase1, Phase2, Overall, floating rings update correctly |
| **Sidebar progress** | ✅ Shows completion % for Networking & Linux |
| **Roadmap & cards** | ✅ Dynamically generated |
| **Lightbox** | ✅ Works on both pillar pages |
| **Toast System** | ✅ Flexbox container with multiple toast support |
| **Color Themes** | ✅ 25 themes with preview, apply, and reset |
| **Custom Color Editor** | ✅ Tab7 with hex inputs, color pickers, HSL sliders, presets |
| **Font Settings** | ✅ Font family, font size, custom font loading |
| **Appearance Controls** | ✅ Accent intensity, border radius, shadow intensity |
| **Accessibility** | ✅ Reduced motion toggle, high contrast toggle |
| **Import/Export** | ✅ Full settings backup/restore as JSON |
| **Stars Advanced Settings** | ✅ Font controls, appearance controls, import/export, accessibility |

---

## 🛠️ How to Extend for a New Pillar (e.g. Security)

1. **Create `security.html`** – copy `networking.html`, replace content.
2. **Create `security.js`** – copy `networking.js`, update:
   - Pillar name and keys (`security-section-1` … `security-section-N`)
   - Quiz mastery key (`security-quiz-passed`)
   - Flashcard and quiz data.
3. **Update `global.js`**:
   - Add `security` case in `getPhase1PillarCompletion`.
   - Add entry in `phase1PillarData` (sections, titles, quizKey, sectionPrefix).
4. **Add link in sidebar** of `index.html` (the modal chips are already dynamic).
5. **Increment service worker cache version** and deploy.

---

## 🧪 Local Development

```bash
# Clone the repository
git clone https://github.com/K-Mash24/DevOps-Journey.git
cd DevOps-Journey

# Start a simple local server
python3 -m http.server 8000

# Open http://localhost:8000 in your browser
```

### Force clearing the service worker cache (during development)

- Open DevTools (F12) → **Application** → **Service Workers** → **Unregister**.
- Then **Clear storage** and refresh.

---

## 📚 Related Repository

Raw markdown study notes are maintained in the companion repo:  
[**K-Mash24 / Great_Cheatsheets**](https://github.com/K-Mash24/Great_Cheatsheets)

Each pillar has a folder (`01-networking/`, `02-linux/`, …) containing section‑by‑section notes, READMEs, and future labs.

---

## 📄 License

MIT – feel free to use, modify, and share.

---

**Happy learning!**  
🚀 *Build foundations first, then conquer the cloud.*