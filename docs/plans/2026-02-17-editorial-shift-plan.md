# Editorial Shift Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform Skotte.co from a conversion-optimized landing page into an editorial studio site that invites rather than sells.

**Architecture:** Surgical removal of salesy sections (comparison grid, FAQ, marquee, CTA bands) from existing HTML, copy rewrites to invitational tone, addition of live clock element in nav, and quiet closing lines. No structural changes to CSS architecture or JS patterns.

**Tech Stack:** Static HTML, CSS custom properties, vanilla JS (IIFE pattern in main.js)

---

### Task 1: Add live clock to nav (JS + HTML + CSS)

**Files:**
- Modify: `js/main.js` — add clock function
- Modify: `css/components.css` — add clock styles
- Modify: `index.html` — add clock element to nav
- Modify: `services.html` — add clock element to nav
- Modify: `work.html` — add clock element to nav
- Modify: `about.html` — add clock element to nav
- Modify: `contact.html` — add clock element to nav

**Step 1: Add clock styles to components.css**

After the `.nav-link` styles, add:

```css
.nav-clock {
  font-family: 'DM Sans', monospace;
  font-size: var(--text-xs);
  color: var(--text-light);
  letter-spacing: 0.02em;
  white-space: nowrap;
  display: none;
}

@media (min-width: 768px) {
  .nav-clock {
    display: block;
  }
}
```

**Step 2: Add clock JS to main.js**

Inside the IIFE, before the `init()` function, add:

```javascript
function initClock() {
  var clock = document.getElementById('navClock');
  if (!clock) return;

  function update() {
    var now = new Date();
    var time = now.toLocaleTimeString('en-US', {
      timeZone: 'America/Los_Angeles',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    clock.textContent = time + ' San Diego';
  }

  update();
  setInterval(update, 1000);
}
```

Add `initClock();` inside the `init()` function.

**Step 3: Add clock HTML to all 5 pages**

In each page's `<header>`, inside `.nav-inner`, after the `.nav-links` div and before the `<button class="menu-toggle">`:

```html
<span class="nav-clock" id="navClock"></span>
```

**Step 4: Verify**

Open http://localhost:8080 — clock should appear right of nav links on desktop, hidden on mobile.

**Step 5: Commit**

```bash
git add js/main.js css/components.css index.html services.html work.html about.html contact.html
git commit -m "feat: add live clock to nav bar"
```

---

### Task 2: Rewrite homepage hero copy

**Files:**
- Modify: `index.html`

**Step 1: Replace hero section content**

Find the hero section and replace:
- Headline: `New website.<br>Real photos.<br>Five days.` → `We build websites<br>and take the photos.`
- Subtitle: `San Diego's only web rebranding studio with in-house photography.` → `A husband-and-wife studio in San Diego. Custom code, real photography, five days.`
- CTA text: `Book Your Free Call` → `Let's talk`
- Remove the scroll indicator `<div class="scroll-indicator">` entirely

**Step 2: Verify**

Refresh homepage — hero should feel warmer, less pitchy.

---

### Task 3: Remove salesy sections from homepage

**Files:**
- Modify: `index.html`

**Step 1: Remove Section 3 — Portfolio placeholder**

Delete the entire section from `<!-- Section 3: Featured Work -->` through its closing `</section>`. This removes "Claim Your Spot" scarcity.

**Step 2: Remove Section 5 — Comparison grid**

Delete from `<!-- Section 5: Why Skotte -->` through its closing `</section>`. This removes the "With Skotte" vs "Typical Agency" table.

**Step 3: Remove Section 7 — FAQ**

Delete from `<!-- Section 7: FAQ -->` through its closing `</section>`. This removes objection handling.

**Step 4: Remove Section 8 — CTA band**

Delete from `<!-- Section 8: CTA Band -->` through its closing `</section>`.

**Step 5: Remove Section 9 — Marquee**

Delete from `<!-- Section 9: Marquee -->` through its closing `</div>`.

**Step 6: Remove FAQ JSON-LD**

Delete the entire `<script type="application/ld+json">` block containing the FAQPage schema.

**Step 7: Verify**

Homepage should now flow: Hero → Before/After → Process → Team → Footer. Five clean sections.

---

### Task 4: Soften remaining homepage sections + add closing

**Files:**
- Modify: `index.html`
- Modify: `css/components.css` — add closing line styles

**Step 1: Soften Before/After label**

Change `(the transformation)` → `(recent work)` and `See the Difference` → `Before & After`

**Step 2: Soften Process title**

Change `Three Steps. Five Days.` → `How it works`

**Step 3: Add closing line CSS**

```css
.closing-line {
  text-align: center;
  padding: var(--space-20) var(--content-padding);
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-style: italic;
}

.closing-line a {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.closing-line a:hover {
  color: var(--accent-hover);
}
```

**Step 4: Add closing line before footer**

After the team section closing `</section>`, before `</main>`, add:

```html
<div class="closing-line reveal">
  <p>If this feels like a fit, <a href="/contact.html">let's talk</a>.</p>
</div>
```

**Step 5: Verify**

Homepage should end with a quiet, elegant invitation before the footer.

---

### Task 5: Update services page

**Files:**
- Modify: `services.html`

**Step 1: Rewrite service descriptions**

For "The Relaunch":
- Old: `Your complete online transformation. New custom-coded website + professional on-site photography, delivered in 5 business days.`
- New: `A new website and professional photography for your business. We come to you, build everything from scratch, and launch in five days.`

For "Full Stack Retainer":
- Old: `Everything below in one package. Website maintenance, social media, GBP management, and lead generation — all handled.`
- New: `Everything we offer, handled together. Your website, social presence, and local visibility — all taken care of month to month.`

**Step 2: Soften all CTAs**

Replace all 5 instances of `Book a call to discuss` with `Start a conversation`.

**Step 3: Remove CTA band**

Delete the `<!-- CTA Band -->` section.

**Step 4: Add closing line**

Before `</main>`, add:

```html
<div class="closing-line reveal">
  <p>If this feels like a fit, <a href="/contact.html">let's talk</a>.</p>
</div>
```

**Step 5: Verify**

Services should feel informational and transparent, not pushy.

---

### Task 6: Update about page

**Files:**
- Modify: `about.html`

**Step 1: Remove CTA band**

Delete the `<!-- CTA Band -->` section.

**Step 2: Add closing line**

Before `</main>`, add:

```html
<div class="closing-line reveal">
  <p>If this feels like a fit, <a href="/contact.html">let's talk</a>.</p>
</div>
```

**Step 3: Verify**

About page should end quietly.

---

### Task 7: Update footer on all pages

**Files:**
- Modify: all 5 HTML files

**Step 1: Add values line**

In the footer, after the `.footer-tagline` paragraph, add:

```html
<p class="footer-values">1% of every project supports local animal rescue.</p>
```

**Step 2: Add CSS for values line**

```css
.footer-values {
  font-size: var(--text-sm);
  color: var(--text-on-dark-muted);
  margin-top: var(--space-2);
  font-style: italic;
}
```

**Step 3: Soften nav CTA on all pages**

Change `Book a Call` to `Let's Talk` in both desktop nav and mobile menu across all 5 pages.

**Step 4: Verify**

Check all 5 pages — footer should have values line, nav should say "Let's Talk".

---

### Task 8: Update font tester (separate from editorial shift)

**Files:**
- Modify: `js/font-tester.js`

**Step 1: Reorder fonts**

Move current fonts 2 (Playfair Display + Inter), 5 (Fraunces + Source Sans 3), 7 (Lora + Nunito Sans) to positions 1, 2, 3.

**Step 2: Add 7 new font pairings**

Add these after the reordered 3:
4. Noto Serif Display + Noto Sans
5. Bitter + Raleway
6. Merriweather + Open Sans
7. Crimson Pro + Manrope
8. Source Serif 4 + IBM Plex Sans
9. Cardo + Rubik
10. EB Garamond + Figtree

Keep Instrument Serif + DM Sans as a reference somewhere (e.g., position 0 or a "Reset" button).

**Step 3: Add color theme switcher**

Add a second row to the toolbar with color theme buttons. Each theme swaps `--accent`, `--accent-hover`, `--accent-light`, `--accent-glow`, `--shadow-accent` via CSS custom properties on `:root`.

Themes:
1. Terracotta (current) — #C4653A
2. Forest — #3A7D5C
3. Navy — #2D4A7A
4. Plum — #7A4A6B
5. Slate — #5A6B7A
6. Charcoal — #4A4A4A
7. Ochre — #B8860B
8. Sage — #6B8E6B

**Step 4: Verify**

Toolbar should have numbered font buttons + color theme buttons. Clicking swaps instantly.

---

### Task 9: Clean up removed CSS (optional)

**Files:**
- Modify: `css/components.css`

Remove CSS for components that no longer exist in any HTML:
- `.comparison-grid`, `.comparison-col`, `.comparison-row`, `.check-icon`, `.x-icon`
- `.faq-list`, `.faq-item`, `.faq-question`, `.faq-answer`, `.faq-icon`
- `.marquee`, `.marquee-track`, `.marquee-text`
- `.cta-band`, `.cta-headline`, `.cta-sub`
- `.portfolio-placeholder`
- `.scroll-indicator`

Keep the CSS for now if unsure — dead CSS doesn't hurt performance on a 5-page site.

---

## Execution Order

Tasks 1-7 are the editorial shift. Task 8 is the font/color tester. Task 9 is cleanup.

Tasks 1-7 can be parallelized:
- **Agent A:** Tasks 1 (clock JS/CSS) + 4 (closing line CSS)
- **Agent B:** Tasks 2 + 3 (homepage HTML changes)
- **Agent C:** Tasks 5 + 6 (services + about)
- **Agent D:** Task 7 (footer + nav CTA on all pages)
- **Agent E:** Task 8 (font tester update)

Note: Agents B/C/D all modify HTML files, so Agent D (footer/nav changes) should run AFTER B and C to avoid conflicts. Recommended: run A+B+C+E in parallel, then D, then verify.
