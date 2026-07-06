# DevOps Journey — Study Platform

[![Netlify Status](https://img.shields.io/badge/status-live-brightgreen)](https://k-mash24.github.io/DevOps-Journey/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A self‑contained, foundations‑first study website for the AWS Solutions Architect Associate (SAA) certification and the full [roadmap.sh/devops](https://roadmap.sh/devops) curriculum.

**Live site:** [k-mash24.github.io/DevOps-Journey](https://k-mash24.github.io/DevOps-Journey)

---

## 📋 Quick Navigation

- [📖 Overview](#-overview)
- [🚀 Features](#-features)
- [🗂️ Project Structure](#️-project-structure)
- [💾 Progress Tracking – localStorage Keys](#-progress-tracking--localstorage-keys)
- [🧩 Key JavaScript Modules](#-key-javascript-modules)
- [🖼️ Modal Dashboard](#️-modal-dashboard)
- [🔍 Image Lightbox](#-image-lightbox)
- [📦 Service Worker](#-service-worker)
- [🧭 Current Status](#-current-status)
- [🛠️ How to Extend for a New Pillar](#️-how-to-extend-for-a-new-pillar)
- [📚 Related Repository](#-related-repository)
- [📄 License](#-license)

---

## 📖 Overview

This project is a **structured, self‑paced study roadmap** that builds genuine, production‑ready foundations **before touching any cloud infrastructure**. All notes are written in Markdown, version‑controlled in [Great_Cheatsheets](https://github.com/K-Mash24/Great_Cheatsheets), and published as an interactive website with flashcards, quizzes, and persistent progress tracking.

### Two‑Phase Approach

| Phase                        | Focus                                                              | Status                                                                    |
| ---------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| **Phase 1 – Foundations**    | 5 pillars: Networking, Linux & CLI, Security, Scripting, Databases | ✅ Networking & Linux complete; 🔄 Security in progress; 🔒 Others locked |
| **Phase 2 – DevOps Roadmap** | Docker → CI/CD → Kubernetes → IaC (Terraform/Ansible) → Monitoring | 🔒 Locked (after SAA)                                                     |

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

### 🎨 Personalization & Appearance

- **25 Color Themes** – choose from curated palettes (Indigo, Ocean, Cobalt, Crimson, etc.) with light/dark variants.
- **Theme Preview** – preview a theme live with a transparent modal.
- **Custom Color Editor** – create your own color theme using hex inputs, color pickers, and HSL sliders.
- **Font Settings** – choose font family (Syne, DM Sans, JetBrains Mono) and font size (12‑24px).
- **Custom Font Loading** – load any Google Font or custom web font URL.
- **Appearance Controls** – adjust accent intensity, border radius, and shadow intensity.
- **Accessibility** – toggle reduced motion and high contrast modes.
- **Default Theme** – set your preferred theme as the default on page load.
- **Import/Export** – backup and restore all personalization settings as JSON.

### ✨ Stars Tab (Background Animation)

- **Starfield Presets** – 6 presets (Calm, Active, Minimal, Constellation, Dense, Off).
- **Customize** – adjust star count, twinkle speed, movement speed, and connection distance.
- **Advanced Settings** – font controls, appearance controls, import/export, accessibility.

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
│   ├── linux.html        – Pillar 2 content (complete)
│   └── security.html     – Pillar 3 content (in progress – 9 sections)
├── js/
│   ├── global.js         – Shared logic (rings, modal, search, toast, study path)
│   ├── stars.js          – Starfield animation + Advanced Settings
│   ├── themes.js         – 25 color themes + Custom Color Editor (tab7)
│   ├── base.js           – Shared pillar functions (flashcards, quiz, progress ring)
│   ├── networking.js     – Pillar‑specific flashcards & quiz
│   ├── Linux.js          – Linux‑specific flashcards & quiz
│   └── security.js       – Security‑specific flashcards & quiz (placeholder – 5 cards)
└── README.md             – This file
```

---

## 💾 Progress Tracking – localStorage Keys

All progress is stored in the browser’s `localStorage`. The following keys are currently used:

### Phase 1 – Foundations

| Pillar     | Section keys                  | Quiz key                 | Congrats flag                   | Status         |
| ---------- | ----------------------------- | ------------------------ | ------------------------------- | -------------- |
| Networking | `networking-section-1` … `-7` | `networking-quiz-passed` | `networking-100-congrats-shown` | ✅ Complete    |
| Linux      | `linux-section-1` … `-10`     | `linux-quiz-passed`      | `linux-100-congrats-shown`      | ✅ Complete    |
| Security   | `security-section-1` … `-9`   | `security-quiz-passed`   | `security-100-congrats-shown`   | 🔄 In progress |
| Scripting  | (not yet implemented)         | –                        | –                               | 🔒 Locked      |
| Databases  | (not yet implemented)         | –                        | –                               | 🔒 Locked      |

### Phase 2 – DevOps Roadmap (binary completion)

| Pillar     | Binary key          | Topic keys (used in detail view)   |
| ---------- | ------------------- | ---------------------------------- |
| Docker     | `phase2-docker`     | `phase2-docker-topic-1` … `-8`     |
| CI/CD      | `phase2-cicd`       | `phase2-cicd-topic-1` … `-8`       |
| Kubernetes | `phase2-kubernetes` | `phase2-kubernetes-topic-1` … `-8` |
| Terraform  | `phase2-terraform`  | `phase2-terraform-topic-1` … `-8`  |
| Monitoring | `phase2-monitoring` | `phase2-monitoring-topic-1` … `-8` |

> Topic keys are used in the **Pillar Details** modal. The binary key is automatically set to `true` when all topics are checked.

### Personalization & Appearance

| Setting       | Storage Key              | Description                                                                                     |
| ------------- | ------------------------ | ----------------------------------------------------------------------------------------------- |
| Color Theme   | `gc-color-theme`         | Selected theme name (e.g., `ocean`)                                                             |
| Custom Theme  | `gc-custom-theme`        | Custom color values (light/dark modes)                                                          |
| Font Settings | `gc-font-settings`       | Font family, size, custom URL                                                                   |
| Appearance    | `gc-appearance-settings` | Accent intensity, border radius, shadow intensity, reduced motion, high contrast, default theme |
| Star Preset   | `star-preset`            | Selected star preset                                                                            |
| Star Custom   | `star-custom`            | Custom star values                                                                              |

---

## 🧩 Key JavaScript Modules

### `global.js` (shared)

| Function                                                      | Purpose                                                                         |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `getPhase1PillarCompletion(pillar)`                           | Returns 0‑1 completion for Networking, Linux, and Security                      |
| `getPhase2PillarCompletion(pillar)`                           | Returns 1 if binary key is `true`                                               |
| `updateAllUI()`                                               | Refreshes sidebar percentages, roadmap, cards, rings, hero stats, method badges |
| `showPillarDetail(pillarId, phase)`                           | Renders ring + checklist inside the Pillar Details tab                          |
| `openModalToPillarDetails(pillarId, phase)`                   | Opens modal, switches to Pillar Details tab, loads data                         |
| `updateFloatingRings()`                                       | Updates the homepage’s Phase1, Phase2, Overall, and floating global rings       |
| `renderPhase1ModalScroller()` / `renderPhase2ModalScroller()` | Builds chip lists in the modal’s Phase1 and Phase2 tabs                         |
| `initModalAndFloatingRing()`                                  | Sets up click handlers for the floating ring and modal close                    |
| `showToast()` / `showComingSoonToast()`                       | Displays toast messages for notifications and coming‑soon pills                 |
| `renderStudyPath()`                                           | Dynamically renders the study path timeline on the homepage                     |
| `ensureModalExists()`                                         | Injects the modal into pillar pages (dynamic modal)                             |

### `base.js` – Shared Pillar Library

| Function                                   | Purpose                                                                    |
| ------------------------------------------ | -------------------------------------------------------------------------- |
| `Base.init(config)`                        | Initialises a pillar with flashcards, quiz, progress ring, and page header |
| `Base.renderFlashcards()`                  | Renders flashcards from the pillar’s data                                  |
| `Base.renderQuiz()` / `Base.loadQuizSet()` | Renders and switches quiz sets                                             |
| `Base.submitQuiz()` / `Base.resetQuiz()`   | Submits and resets quiz questions                                          |
| `Base.initFloatingProgressRing()`          | Creates the pillar‑specific floating ring with localStorage tracking       |
| `Base.updatePageHeader()`                  | Updates the completion ring and badges in the page header                  |

### `stars.js` – Starfield + Advanced Settings

| Component               | Purpose                                                                       |
| ----------------------- | ----------------------------------------------------------------------------- |
| **Starfield**           | Canvas-based star animation with twinkle, drift, and connections              |
| **Presets**             | 6 preset configurations (Calm, Active, Minimal, Constellation, Dense, Off)    |
| **Customize**           | Sliders for star count, twinkle speed, movement speed, connection distance    |
| **Advanced Settings**   | Font family (Syne, DM Sans, JetBrains Mono, Custom), font size, import/export |
| **Appearance Controls** | Accent intensity, border radius, shadow intensity                             |
| **Accessibility**       | Reduced motion toggle, high contrast toggle                                   |
| **Default Theme**       | Dropdown to set default theme on page load                                    |

### `themes.js` – Color Themes & Custom Color Editor

| Component                      | Purpose                                                               |
| ------------------------------ | --------------------------------------------------------------------- |
| **25 Themes**                  | Predefined color palettes with light/dark variants                    |
| **Theme Cards**                | Grid display with icons, names, color swatches, preview/apply buttons |
| **Theme Preview**              | Applies theme with transparent modal; click outside to cancel         |
| **Custom Color Editor (tab7)** | Hex inputs, color pickers, and HSL sliders for all CSS variables      |
| **Preset Colors**              | Quick color selection grid                                            |
| **Apply/Reset**                | Save custom theme or reset to default                                 |
| **Theme Loader**               | Load any existing theme into the custom color editor                  |

### Pillar‑specific files

| File            | Content                                                    | Status         |
| --------------- | ---------------------------------------------------------- | -------------- |
| `networking.js` | Flashcards (38), 3 quiz sets, lightbox                     | ✅ Complete    |
| `Linux.js`      | Flashcards (50), 3 quiz sets, lightbox                     | ✅ Complete    |
| `security.js`   | Flashcards (5 placeholder), 3 quiz sets (5 each), lightbox | 🔄 Placeholder |

---

## 🖼️ Modal Dashboard

A single modal (`#progressModal`) with **seven** tabs:

| Tab                        | Content                                                                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Overall**                | Combined Phase1+Phase2 progress ring (50% + 50%)                                                                                           |
| **Phase 1**                | Phase1 ring + horizontal scroller with pillar chips. Clicking a chip opens **Pillar Details** tab.                                         |
| **Phase 2**                | Phase2 ring + scroller with phase chips. Clicking a chip opens **Pillar Details** tab with topic‑based checklist.                          |
| **Pillar Details**         | Dynamic ring + checklist for the selected pillar. Checkboxes sync with `localStorage` and update the ring instantly.                       |
| **💾 Backup**              | GitHub Gist backup/restore for study progress (token and Gist ID).                                                                         |
| **✨ Stars**               | Starfield presets, customization, and Advanced Settings (fonts, appearance, import/export).                                                |
| **🎨 Themes**              | 25 color themes with preview/apply, reset to default, and Custom Color Editor button.                                                      |
| **🎨 Custom Color Editor** | Hidden tab (accessible via button in Themes tab). Full color customization with hex inputs, color pickers, HSL sliders, and preset colors. |

The modal is opened by:

- Clicking the floating global ring (homepage) – shows **Overall** tab.
- Clicking a pillar/phase chip inside the modal – shows **Pillar Details** tab for that pillar.
- On pillar pages (`networking.html`, `linux.html`, `security.html`), clicking the floating progress ring opens the modal directly to **Pillar Details** for that pillar.

---

## 🔍 Image Lightbox

Any `<img>` inside `.accordion-body` or `.overview-content` becomes clickable and opens a full‑screen lightbox with:

- Fit‑to‑screen mode by default.
- Toggle button (`📐 Fit`) to switch between fit and actual size.
- Zoom in/out (buttons or `+`/`-` keys).
- Pan when zoomed (mouse drag or touch).
- Reset zoom (`0` key or reset button).
- Close with `Esc` or click outside.

Implemented identically in `networking.js`, `Linux.js`, and `security.js`.

---

## 📦 Service Worker (`sw.js`)

- Caches all HTML, CSS, JS, and the logo.
- Uses a **versioned cache name** (e.g. `devops-journey-2026-07-06-v1`).
- HTML files are fetched with **network‑first** (fallback to cache).
- Assets (CSS, JS, images) use **cache‑first**.
- On `activate`, old caches are automatically deleted.

> **Important:** Increment `CACHE_NAME` every time you change any cached file – otherwise users will not see updates.

---

## 🧭 Current Status (July 2026)

| Component                   | Status                                                                                                          |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Networking pillar**       | ✅ Complete – 7 sections, 38 flashcards, 3 quiz sets, floating ring, lightbox                                   |
| **Linux pillar**            | ✅ Complete – 10 sections, 50 flashcards, 3 quiz sets, floating ring, lightbox                                  |
| **Security pillar**         | 🔄 In progress – 9 sections planned; Section 1 draft complete; flashcards (5 placeholder), 3 quiz sets (5 each) |
| **Scripting / Databases**   | 🔒 Locked – placeholders only                                                                                   |
| **Phase 2 pillars**         | 🔒 Locked – binary completion via modal; no study content yet                                                   |
| **Homepage modal**          | ✅ Fully functional with 7 tabs                                                                                 |
| **Progress rings**          | ✅ Phase1, Phase2, Overall, floating rings update correctly                                                     |
| **Sidebar progress**        | ✅ Shows completion % for Networking, Linux, and Security                                                       |
| **Roadmap & cards**         | ✅ Dynamically generated from `STUDY_PATH` and pillar data                                                      |
| **Study path timeline**     | ✅ Dynamic – updates based on pillar completion status                                                          |
| **Lightbox**                | ✅ Works on pillar pages                                                                                        |
| **Toast System**            | ✅ Flexbox container with multiple toast support (modal only)                                                   |
| **Color Themes**            | ✅ 25 themes with preview, apply, and reset                                                                     |
| **Custom Color Editor**     | ✅ Tab7 with hex inputs, color pickers, HSL sliders, presets                                                    |
| **Font Settings**           | ✅ Font family, font size, custom font loading                                                                  |
| **Appearance Controls**     | ✅ Accent intensity, border radius, shadow intensity                                                            |
| **Accessibility**           | ✅ Reduced motion toggle, high contrast toggle                                                                  |
| **Import/Export**           | ✅ Full settings backup/restore as JSON                                                                         |
| **Stars Advanced Settings** | ✅ Font controls, appearance controls, import/export, accessibility                                             |

---

## 🛠️ How to Extend for a New Pillar

1. **Create the HTML page** – copy `base.html` to `html/your-pillar.html`, fill placeholders.
2. **Create the JavaScript file** – copy the structure from `security.js` (or `Linux.js`), update:
   - `FLASHCARDS` array with your terms and answers
   - `QUIZ_SETS` with 3 sets of questions
   - `CONFIG` with pillar ID, name, total sections, and localStorage keys
   - Call `window.Base.init(CONFIG)` at the end
3. **Update `global.js`**:
   - Add pillar to `phase1PillarData` (sections, titles, quizKey, sectionPrefix)
   - Add a `case` to `getPhase1PillarCompletion()`
   - Add pillar to arrays in `updateAllUI()` and `updateSidebarProgress()`
4. **Update all sidebars** – add your pillar link to `index.html`, `networking.html`, `linux.html`, and `security.html`.
5. **Update the study path** – add your pillar to `STUDY_PATH` in `global.js`.
6. **Increment service worker cache version** and deploy.

---

## 📚 Related Repository

Raw markdown study notes are maintained in the companion repo:  
[**K-Mash24 / Great_Cheatsheets**](https://github.com/K-Mash24/Great_Cheatsheets)

Each pillar has a folder (`01-networking/`, `02-linux/`, `03-security/`, …) containing section‑by‑section notes, READMEs, and future labs.

---

## 📄 License

MIT – feel free to use, modify, and share.

---

**Happy learning!**  
🚀 _Build foundations first, then conquer the cloud._
