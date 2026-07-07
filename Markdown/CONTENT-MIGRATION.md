# Content Migration — From HTML to Data‑Driven JavaScript

## 📖 Overview

This document explains how and why we migrated pillar content from hardcoded HTML to data‑driven JavaScript arrays. The migration was done progressively, starting with the Networking pillar and extending to Linux and Security.

**Key Insight:** The `networking.js` file already contained all the logic for accordion toggling, search, progress tracking, flashcards, and quizzes. The only thing living in `networking.html` was the **static content**. Moving that content into JS data structures was a natural evolution of the architecture.

---

## 🎯 Why Migrate?

| Benefit                  | Explanation                                                                    |
| ------------------------ | ------------------------------------------------------------------------------ |
| **Smaller HTML**         | The page loads faster because the initial payload is much smaller.             |
| **Easier updates**       | Change one JSON/JS file instead of hunting through thousands of lines of HTML. |
| **Better separation**    | Content (data) is cleanly separated from presentation (render logic).          |
| **Dynamic loading**      | Could load sections on‑demand (e.g., only when the user scrolls to them).      |
| **Consistent rendering** | One render function ensures every accordion, table, and card looks identical.  |
| **Reusable components**  | The same render logic works across all pillars — just swap the data.           |
| **Search improvements**  | The search can walk the DOM or search the data directly.                       |

---

## 📊 The Data Structure Pattern

Each pillar's JS file contains `SECTION_X_ACCORDIONS` arrays:

```javascript
const SECTION_1_ACCORDIONS = [
  {
    id: "unique-identifier", // Used for navigation and search
    title: "Accordion Title", // Displayed in the header
    priority: false, // Shows "priority" tag if true
    icon: "📁", // Icon shown in the accordion header
    bodyHTML: `...`, // Full HTML content of the accordion
  },
  // ... more accordions
];
```

### Fields Explained

| Field      | Type                        | Description                                                          |
| ---------- | --------------------------- | -------------------------------------------------------------------- |
| `id`       | `string`                    | Unique identifier for the accordion. Used for scroll spy and search. |
| `title`    | `string`                    | Displayed in the accordion header. Can include HTML tags.            |
| `priority` | `boolean`                   | If `true`, adds a "priority" tag badge to the accordion header.      |
| `icon`     | `string`                    | Emoji or SVG icon shown next to the title.                           |
| `bodyHTML` | `string` (template literal) | Full HTML content of the accordion body.                             |

### The Render Function

```javascript
function renderAccordion(containerId, accordionData) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const html = accordionData
    .map(
      (acc) => `
    <div class="accordion open" data-searchable>
      <button type="button" class="accordion-header" onclick="toggleAccordion(this)" aria-expanded="true">
        <div class="accordion-title">
          <span class="acc-icon" aria-hidden="true">${acc.icon}</span>
          ${acc.title}
          ${acc.priority ? '<span class="tag priority">priority</span>' : ""}
        </div>
        <svg class="accordion-chevron" ...>...</svg>
      </button>
      <div class="accordion-body">
        ${acc.bodyHTML}
      </div>
    </div>
  `,
    )
    .join("");

  container.innerHTML = html;
}
```

---

## 🗺️ The Migration Path

### Step 1: Start Small — One Accordion

The first step was to migrate **just one accordion** — the OSI Model accordion in Section 1 of the Networking pillar.

**HTML change:**

```html
<!-- Replace the entire OSI Model accordion with a placeholder -->
<div id="js-osi-container" data-searchable></div>
```

**JS data:**

```javascript
const SECTION_1_ACCORDIONS = [
  {
    id: "osi-model",
    title: "OSI Model — Seven Layers",
    priority: true,
    icon: "⬡",
    bodyHTML: `...`, // Full content from the HTML
  },
];
```

**JS render:**

```javascript
renderAccordion("js-osi-container", SECTION_1_ACCORDIONS);
```

### Step 2: Expand — All Accordions in Section 1

Once one accordion worked, we added the other 4 accordions from Section 1 to the array and replaced the entire Section 1 block with a single container.

**HTML change:**

```html
<!-- Section 1 → all accordions now rendered by JS -->
<div id="js-section1-container"></div>
```

### Step 3: Repeat — All Sections

We repeated the process for Sections 2 through 7 (Networking), then applied the same pattern to Linux (Sections 1–10).

### Step 4: The Overview

The overview content (purpose, objectives, key concepts, stats, etc.) was also migrated to a separate data structure:

```javascript
const PILLAR_OVERVIEW = {
  purpose: { title: '📌 Purpose', description: [...] },
  objectives: [...],
  keyConcepts: [...],
  stats: [...],
  readmeLink: '...'
};

function renderPillarOverview() { ... }
```

---

## 🛠️ Handling Special Characters in Template Literals

When using template literals (`` `...` ``) for `bodyHTML`, certain characters must be escaped:

| Character | Why                                | Escape | Example        |
| --------- | ---------------------------------- | ------ | -------------- |
| `$`       | Interprets as variable placeholder | `\$`   | `$1` → `\$1`   |
| `` ` ``   | Ends the template literal          | `\``   | `` ` `` → `\`` |
| `\`       | Escape character                   | `\\`   | `\b` → `\\b`   |

**Example:**

```javascript
bodyHTML: `
  <div class="code-block"><pre>echo \\$1    # prints the first argument</pre></div>
`;
```

---

## 📊 What Got Migrated

### Networking Pillar

| Section                 | Accordions | Status      |
| ----------------------- | ---------- | ----------- |
| 1 — Internet Structure  | 5          | ✅ Migrated |
| 2 — IP Addressing       | 3          | ✅ Migrated |
| 3 — Subnetting & CIDR   | 3          | ✅ Migrated |
| 4 — Routing & Switching | 2          | ✅ Migrated |
| 5 — DNS                 | 2          | ✅ Migrated |
| 6 — TCP & UDP           | 2          | ✅ Migrated |
| 7 — Network Security    | 2          | ✅ Migrated |
| **Total**               | **19**     |             |

### Linux Pillar

| Section                 | Accordions | Status      |
| ----------------------- | ---------- | ----------- |
| 1 — Filesystem          | 9          | ✅ Migrated |
| 2 — File Operations     | 9          | ✅ Migrated |
| 3 — Permissions         | 9          | ✅ Migrated |
| 4 — Users & Groups      | 10         | ✅ Migrated |
| 5 — Processes           | 8          | ✅ Migrated |
| 6 — Package Management  | 7          | ✅ Migrated |
| 7 — Networking Commands | 12         | ✅ Migrated |
| 8 — Bash Scripting      | 19         | ✅ Migrated |
| 9 — Systemd & Services  | 14         | ✅ Migrated |
| 10 — Text Processing    | 12         | ✅ Migrated |
| **Total**               | **109**    |             |

### Overview Sections

| Pillar     | Overview Data                            | Status         |
| ---------- | ---------------------------------------- | -------------- |
| Networking | Purpose, objectives, key concepts, stats | ✅ Migrated    |
| Linux      | Purpose, objectives, key concepts, stats | ✅ Migrated    |
| Security   | Purpose, objectives, key concepts, stats | 🔄 In progress |

---

## 🔍 Verification Checklist

After migration, verify:

- [ ] **All accordions render** — count matches the expected number.
- [ ] **Nav badges update** — `updateNavBadges()` shows the correct count.
- [ ] **Search works** — typing a term finds content in dynamic accordions.
- [ ] **Accordion toggle works** — clicking the header opens/closes.
- [ ] **Accordion states restore** — open/closed states persist across page reloads.
- [ ] **Content is identical** — the rendered page looks exactly like the original.
- [ ] **Section checkboxes work** — marking sections complete updates the floating ring.
- [ ] **Quiz and flashcards** — still render correctly.

---

## 🧠 Mental Model: The HTML Skeleton

After migration, each pillar HTML page becomes a **skeleton**:

```html
<!-- Section dividers with IDs (for navigation and scroll spy) -->
<div class="section-divider" id="s1">...</div>

<!-- Content placeholders -->
<div id="js-section1-container"></div>

<div class="section-divider" id="s2">...</div>
<div id="js-section2-container"></div>

<!-- ... -->

<!-- Overview -->
<div id="js-overview-container"></div>

<!-- Flashcards (shared base.js) -->
<div id="flashcardTrack"></div>

<!-- Quiz (shared base.js) -->
<div id="quizBody"></div>
```

The **content** lives entirely in the JS data structures. The **render logic** lives in the pillar's JS file.

---

## 🔄 Future Maintenance

### Adding a new accordion

1. Add a new object to the relevant `SECTION_X_ACCORDIONS` array.
2. No changes needed to the HTML.

### Editing content

1. Update the `bodyHTML` field in the relevant accordion object.
2. No changes needed to the HTML.

### Adding a new section

1. Create a new `SECTION_X_ACCORDIONS` array.
2. Add a new section divider in the HTML with the correct `id`.
3. Add a new placeholder container `<div id="js-sectionX-container">`.
4. Call `renderAccordion('js-sectionX-container', SECTION_X_ACCORDIONS)`.

---

## 📝 Summary

The migration to data‑driven content:

- **Reduced HTML size** — each page is now a minimal skeleton.
- **Improved maintainability** — content changes are made in one place.
- **Enabled consistency** — all pillars use the same rendering pattern.
- **Set the stage** for future enhancements like lazy loading and dynamic content.

The pattern is now the **standard** for all pillars. New pillars should follow the same approach from the start.

---

**Last updated:** July 2026
