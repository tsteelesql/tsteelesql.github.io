# CURSOR.md — Static Website Portfolio Instructions (Agent Contract)

You are an AI pair-programmer working in this repository. Optimize for production-quality, accessible, performant, maintainable static website code. Prefer correctness and clarity over cleverness.

This file is the source of truth for how you should work here. If any instruction conflicts with existing repo standards (README, CONTRIBUTING, ARCHITECTURE docs), follow the repo standards and propose an update to this file.

---

## 0) Non-Negotiables (Hard Rules)

1. **Do not guess or invent behavior.**
   - If code intent is unclear, infer from tests, types, docstrings, and usage sites.
   - If still ambiguous, propose minimal safe changes and document assumptions in the PR summary / commit message.

2. **Plan first, then implement.**
   - Before edits: summarize current behavior + risks + a step-by-step plan.
   - Prefer small, reviewable diffs. Avoid broad refactors unless explicitly requested or required to fix a critical issue.

3. **Never ignore high-priority issues you discover.**
   - If you identify **P0/P1** issues (defined below) in touched code paths, you MUST fix them as part of the change.
   - If a fix would be too large, you MUST: (a) create a minimal mitigation, (b) add a TODO with an issue-ready note, and (c) explain why full remediation is out of scope.

4. **Add or update tests for any behavior change or bug fix.**
   - No changes that alter logic without corresponding browser testing and verification.
   - Test in multiple browsers and viewports before considering changes complete.

5. **Security is mandatory.**
   - Do not introduce insecure defaults.
   - Handle secrets safely (no hard-coded secrets, no logging secrets, no committing credentials).

6. **Keep public APIs stable.**
   - If breaking changes are necessary, clearly document them and provide a migration path.

---

## 1) Severity Model (What You MUST Fix)

When you work on any file/module, classify issues you observe:

### P0 — Must fix now (blocker)
- Security vulnerabilities (XSS, injection, secrets exposure, unsafe DOM manipulation)
- Broken navigation or critical interactive features
- Accessibility violations that block screen readers or keyboard navigation
- Crashes in common JavaScript paths (uncaught exceptions)
- Broken responsive layout on mobile/tablet

### P1 — Must fix in the same change if in touched area
- Missing/incorrect error handling that can cascade (image load failures, modal errors)
- Incorrect edge-case handling likely to occur in production (missing images, slow connections)
- Performance issues with obvious high ROI fixes (unthrottled scroll handlers, layout thrashing)
- Accessibility issues (missing ARIA labels, poor focus management, insufficient contrast)
- Broken progressive disclosure or accordion behavior

### P2 — Fix if low effort, otherwise document
- Code smells, minor perf improvements, refactor opportunities
- Documentation gaps that would hinder onboarding
- Non-critical type issues

### P3 — Nice-to-have
- Styling nits, micro-optimizations, optional cleanups

**Rule:** If you touch a code path and you find **P0 or P1**, you must address it before finishing.

---

## 2) Workflow (How You Should Operate)

### A) Pre-change checklist (always do)
1. Identify the **HTML elements and CSS selectors** affected.
2. Identify **JavaScript functions and event handlers** that interact with changed elements.
3. Identify **failure modes** (missing images, JavaScript errors, network failures).
4. Identify **security boundaries** (user input, external resources, third-party scripts).
5. Identify **performance constraints** (scroll handlers, animations, image loading, DOM manipulation).

### B) Implementation checklist (always do)
- Keep changes localized to specific sections/components.
- Avoid unnecessary churn (renames/moves) unless they pay for themselves.
- Use semantic HTML and clear class names.
- Prefer pure functions where possible in JavaScript.
- Ensure deterministic behavior (especially for animations and interactions).
- Ensure graceful error handling and fallback UI states.

### C) Verification checklist (always do)
- Test in browser (see "Repo Commands" section below).
- Test responsive behavior on mobile, tablet, and desktop viewports.
- Verify accessibility (keyboard navigation, screen reader compatibility, contrast).
- Test all interactive features (navigation, modals, accordions, image expansion).
- Check browser console for errors.

### D) Output format (what you report back)
- Summary of changes
- Why the changes are correct
- Browser testing performed and results
- Any risks / follow-ups
- How to verify the changes

---

## 3) Code Quality Standards

### Architecture & Boundaries
- Keep HTML structure, CSS styling, and JavaScript behavior separated.
- Use CSS custom properties for theming (centralized in `:root`).
- Avoid global mutable state in JavaScript (prefer function-scoped variables).
- Keep JavaScript functions organized by feature (modals, scrolling, accordions).

### Web Standards
- Target browsers: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+).
- Use semantic HTML5 elements.
- Prefer CSS custom properties (CSS variables) for theming.
- Use vanilla JavaScript (ES6+) - no frameworks unless explicitly required.
- Ensure responsive design (mobile-first approach).
- Follow WCAG 2.1 AA accessibility guidelines.

### Error Handling
- Handle JavaScript errors gracefully with try/catch where appropriate.
- Never swallow errors silently - log to console in development, handle gracefully in production.
- Provide fallback UI states for failed image loads, network errors, etc.
- Use defensive programming for DOM queries (check for null/undefined).

### Logging & Observability
- Use `console.log` sparingly - remove debug logs before committing.
- Never log sensitive data (API keys, tokens, user data).
- Use browser DevTools for debugging.
- Consider adding analytics (Google Analytics) if tracking is needed (see README).

### Performance
- Optimize images (use appropriate formats, lazy loading, proper sizing).
- Minimize JavaScript execution time (throttle/debounce scroll handlers, use requestAnimationFrame).
- Avoid layout thrashing (batch DOM reads/writes).
- Use CSS transforms/opacity for animations (GPU-accelerated).
- Minimize reflows and repaints.
- Keep JavaScript bundle size small (no unnecessary dependencies).

---

## 4) Security Baseline (Default Expectations)

You must follow these:
- Never commit API keys, tokens, or secrets in code.
- Sanitize user inputs if any forms are added (use Content Security Policy if needed).
- Use HTTPS for all external resources.
- Avoid `eval()`, `innerHTML` with user content, or unsafe DOM manipulation.
- Validate and sanitize any user-generated content.
- Use Subresource Integrity (SRI) for external scripts if applicable.
- Be cautious with third-party scripts (analytics, widgets) - review their security.
- If adding external dependencies, check for known vulnerabilities.

---

## 5) Testing Strategy (Production Expectations)

Minimum expectations:
- **Manual testing** in multiple browsers (Chrome, Firefox, Safari, Edge).
- **Responsive testing** on mobile, tablet, and desktop viewports.
- **Accessibility testing** using browser DevTools and screen readers if possible.
- **Performance testing** using Lighthouse or similar tools.
- Test all interactive features (navigation, modals, accordions, etc.).

For JavaScript changes:
- Test in browser console for errors.
- Verify all event handlers work correctly.
- Test edge cases (empty states, missing images, slow connections).
- Verify graceful degradation if JavaScript fails.

---

## 6) Documentation Standards

When you change behavior:
- Update code comments for complex logic.
- Update README.md if deployment or setup steps change.
- Document any new interactive features or dependencies.

Prefer:
- Clear HTML comments for major sections.
- JSDoc-style comments for complex JavaScript functions.
- CSS comments for non-obvious styling decisions.
- README updates for new features or deployment changes.

---

## 7) Dependency & Supply Chain Rules

- **No build dependencies** - This is a pure static site (HTML/CSS/JS).
- **External resources only:**
  - Google Fonts (already in use) - see `index.html` line 11
  - CDN resources if absolutely necessary (justify why)
- If adding external scripts:
  - Justify why vanilla JS isn't sufficient.
  - Use Subresource Integrity (SRI) hashes.
  - Check for known security vulnerabilities.
  - Document in README.

---

## 8) Repo Commands

### Install
- **N/A** - No installation required. This is a pure static site with no dependencies.

### Format
- **N/A** - No formatter configured. Use consistent indentation (spaces, 4-space indent recommended based on existing code).

### Lint
- **N/A** - No linter configured. Manual code review recommended:
  - Check browser console for JavaScript errors
  - Validate HTML: [W3C Validator](https://validator.w3.org/)
  - Validate CSS: [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)

### Type-check
- **N/A** - No type checker configured. JavaScript is untyped (vanilla ES6+).

### Tests
- **Manual browser testing** (see README.md for browser compatibility):
  - Open `index.html` in browser or use local server: `python -m http.server 8000` or `npx serve`
  - Test in Chrome, Firefox, Safari, Edge
  - Test responsive behavior (mobile, tablet, desktop)
  - Use Lighthouse for accessibility and performance audits
  - Verify all interactive features work (navigation, modals, accordions, image expansion)

### Security scan
- **Manual review:**
  - Check for hardcoded secrets/API keys (grep for common patterns)
  - Review external resources (Google Fonts is only external dependency)
  - If adding new external scripts, check for known vulnerabilities

### Build/Package
- **N/A** - No build step. Files are served directly from repository root.

### Run
- **Local development:** Open `index.html` in browser, or use local server:
  ```bash
  # Python 3
  python -m http.server 8000
  
  # Node.js (if installed)
  npx serve
  
  # VS Code Live Server extension
  # Right-click index.html → "Open with Live Server"
  ```
- **Deployment:** Push to `main` branch - GitHub Pages auto-deploys to `https://tsteelesql.github.io`

---

## 9) Repo Architecture Map

- **Purpose:** Static portfolio website showcasing AI engineering projects and capabilities (see README.md)
- **Primary runtime:** Static HTML/CSS/JavaScript - no server, no build step
- **Entry points:**
  - `index.html` - Single-page application entry point
  - `script.js` - All JavaScript initialized via `init()` function (line 446)
- **Core packages/modules:**
  - `index.html` - HTML structure with semantic markup
  - `styles.css` - All styling, CSS custom properties in `:root` (lines 18-108)
  - `script.js` - JavaScript organized by feature:
    - Smooth scrolling (`initSmoothScrolling`)
    - Navigation updates (`updateNavbar`, `updateActiveNavLink`)
    - Image modal (`initImageModal`)
    - Project accordion (`initProjectAccordion`)
    - Fade-in animations (`initFadeInAnimations`)
    - Image error handling (`initImageErrorHandling`)
- **Adapters/integrations:**
  - Google Fonts (external CDN) - `index.html` line 11
  - GitHub Pages (deployment platform)
  - No database, no API clients, no external services
- **Config:**
  - No config files. All configuration is in code:
    - CSS variables in `styles.css` `:root` section
    - JavaScript constants in `script.js` (SCROLL_THRESHOLD, THROTTLE_DELAY, etc.)
- **Data models/schemas:**
  - No data models. Pure presentation layer.
  - HTML structure defines data organization (projects, capabilities, contact info)
- **Deployment:**
  - GitHub Pages (automatic from `main` branch)
  - No build process - files served directly from repo root
  - Site URL: `https://tsteelesql.github.io` (per README.md)

---

## 10) "Do Not Touch" and "High Risk" Areas

- **Generated code directories:** N/A - No generated code

- **Vendor/third-party code:** 
  - Google Fonts (external CDN) - `index.html` line 11
  - No vendor code in repository

- **Security-sensitive modules:**
  - No authentication or user input handling currently
  - If forms are added, input validation/sanitization becomes security-sensitive

- **Performance-critical modules:**
  - Scroll handlers (`handleScroll` in `script.js` line 129) - uses throttling (16ms delay)
  - Image modal functionality (`initImageModal` in `script.js` line 245) - critical UX feature
  - Accordion behavior (`initProjectAccordion` in `script.js` line 409) - affects project details disclosure
  - CSS custom properties (`:root` in `styles.css` lines 18-108) - changing affects entire theme

- **Backwards-compat/public API surfaces:**
  - Navigation structure (`<nav>` in `index.html`) - anchor links must remain stable
  - Section IDs (`#projects`, `#skills`, `#contact`) - used by navigation and smooth scrolling
  - Project card structure (`.project-card`, `.project-featured`, `.project-compact`) - affects layout
  - Progressive disclosure pattern (`<details>`/`<summary>` with `data-accordion="projects"`) - core UX pattern

---

## 11) Change Policy

- Prefer incremental improvements.
- If you identify a high-priority issue in touched code, fix it.
- If you must defer, document it with a clear note:
  - **What is the risk**
  - **Why it wasn't fixed now**
  - **What the minimal mitigation is**
  - **What the recommended full fix is**

---

## 12) Default Deliverable Expectations

Every meaningful change should include:
- **Browser testing** in at least Chrome and one other browser
- **Responsive testing** on mobile viewport (use DevTools)
- **Accessibility check** (Lighthouse accessibility audit)
- **Updated README** if deployment or setup changes
- **Clear error handling** for any new JavaScript functionality
- **Security-conscious design** (no secrets, safe DOM manipulation)
- **Performance consideration** (no unnecessary reflows, optimized animations)
- A short "How to verify" section explaining what to test

---

## 13) Repo-Specific Conventions

### HTML Structure
- Use semantic HTML5 elements (`<nav>`, `<section>`, `<article>`, `<header>`, `<footer>`) - see `index.html`
- Maintain consistent class naming: `project-*`, `mag-*` for magazine-style cards
- Use ARIA labels where appropriate (`aria-label`, `aria-expanded`) - see project details elements

### CSS Organization
- CSS custom properties defined in `:root` for theming (see `styles.css` lines 18-108)
- Mobile-first responsive design (base styles for mobile, `@media` for larger screens)
- Consistent spacing using CSS variables (`--space-*`)
- BEM-like naming for components (`.project-card`, `.project-content`, `.project-media`)

### JavaScript Patterns
- Vanilla JavaScript only (ES6+) - no frameworks (see `script.js`)
- Functions organized by feature (smooth scrolling, image modal, accordion, etc.)
- Throttling for scroll handlers (THROTTLE_DELAY = 16ms for ~60fps) - see `script.js` line 12
- Respects `prefers-reduced-motion` for accessibility - see `initSmoothScrolling()` line 40
- Event delegation where appropriate
- Defensive null checks before DOM manipulation - see `updateNavbar()` line 69

### Progressive Disclosure Pattern
- Scan view: Title, Alpha badge, clamped context (2-3 lines), max 3 bullets
- Deep dive: All details in `<details>` element with accordion behavior
- Only one project expanded at a time (accordion pattern) - see `initProjectAccordion()` line 409

### Image Handling
- Lazy loading for images (`loading="lazy"`) - see `index.html` project images
- Expand button overlay on screenshots (full-screen modal) - see `initImageModal()` line 245
- Graceful fallback for missing images (CSS `::before` placeholder) - see `initImageErrorHandling()` line 187

### Accessibility Standards
- WCAG 2.1 AA compliance target (per README.md browser compatibility section)
- Keyboard navigation support
- Focus indicators visible
- Semantic HTML for screen readers
- Alt text for all images
- ARIA attributes where needed

### Performance Standards
- No external JavaScript libraries (vanilla JS only)
- CSS animations use `transform` and `opacity` (GPU-accelerated)
- Throttled scroll handlers (16ms delay = ~60fps) - see `script.js` line 12
- Lazy-loaded images
- Minimal reflows/repaints

End.

### Agent Loop Prevention (Mandatory)
- Do not attempt repeated search/replace edits if a string/pattern is not found.
- Prefer section-header anchored edits (insert/update by headings).
- Maximum retries for any edit action: 1 attempt + 1 verification read-back.
- If a section is missing, create it once and proceed.
- If information cannot be derived from repo files, write **UNKNOWN** and list the exact files to check next.
- Stop immediately when completion criteria is satisfied.