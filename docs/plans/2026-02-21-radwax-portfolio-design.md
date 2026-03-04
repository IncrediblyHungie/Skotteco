# Radwax Portfolio Showcase Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Rad Wax Factory as the first real client showcase on skotte.co — portfolio card on home page + before/after comparison on work page.

**Architecture:** Copy Radwax site files into `/clients/radwax/` within Skotte.co for self-contained rendering. Use existing iframe thumbnail pattern for the home page work card. Use existing before/after slider with real content — screenshot for "before" (radwaxfactory.com blocks iframes via X-Frame-Options: DENY), iframe for "after".

**Tech Stack:** Static HTML/CSS/JS, existing Skotte.co component patterns

---

### Task 1: Copy Radwax client files into Skotte.co

**Files:**
- Create: `clients/radwax/` (directory with index.html, css/, js/, img/)

**Step 1: Create the clients directory and copy Radwax files**

```bash
mkdir -p /home/peteylinux/Projects/Skotteco/clients/radwax
cp /home/peteylinux/Projects/Radwax/index.html /home/peteylinux/Projects/Skotteco/clients/radwax/
cp -r /home/peteylinux/Projects/Radwax/css /home/peteylinux/Projects/Skotteco/clients/radwax/
cp -r /home/peteylinux/Projects/Radwax/js /home/peteylinux/Projects/Skotteco/clients/radwax/
cp -r /home/peteylinux/Projects/Radwax/img /home/peteylinux/Projects/Skotteco/clients/radwax/
```

**Step 2: Verify the copy**

```bash
ls -la /home/peteylinux/Projects/Skotteco/clients/radwax/
```

Expected: index.html, css/, js/, img/ all present

**Step 3: Test it renders**

```bash
cd /home/peteylinux/Projects/Skotteco && python -m http.server 8000
```

Visit `http://localhost:8000/clients/radwax/index.html` — should render the full Radwax home page.

---

### Task 2: Take screenshot of radwaxfactory.com for "before" image

**Files:**
- Create: `images/radwax-before.jpg` (screenshot of current radwaxfactory.com)

**Why:** radwaxfactory.com returns `X-Frame-Options: DENY` and `frame-ancestors 'none'`, so iframes won't work. A screenshot is the only option for the "before" side of the slider.

**Step 1: Take a full-page screenshot**

Use a browser to visit https://radwaxfactory.com/ and take a screenshot of the full homepage (viewport width ~1440px). Save as `images/radwax-before.jpg`.

Alternatively, use a CLI tool:
```bash
# If npx/puppeteer available:
npx capture-website-cli https://radwaxfactory.com/ --output=/home/peteylinux/Projects/Skotteco/images/radwax-before.jpg --width=1440 --height=900 --type=jpeg --quality=0.85
```

**Step 2: Also take a screenshot of the "after" for consistency**

Screenshot `/clients/radwax/index.html` at the same viewport size. Save as `images/radwax-after.jpg`.

This ensures both sides of the slider are images (consistent rendering, no iframe loading delay).

---

### Task 3: Add Radwax as first work card on home page

**Files:**
- Modify: `index.html:183-216` (work-showcase section)

**Step 1: Add Radwax card as the first item in the .work-showcase grid**

Insert this block right after `<div class="work-showcase mt-10 reveal-group">` (line 183), before the Sunrise Cafe card:

```html
          <a href="/clients/radwax/index.html" class="work-card">
            <div class="work-card-preview">
              <iframe src="/clients/radwax/index.html" class="work-card-iframe" loading="lazy" tabindex="-1" aria-hidden="true"></iframe>
            </div>
            <h3 class="work-card-title">Rad Wax Factory</h3>
            <p class="work-card-desc">A beeswax wellness brand that needed a site as premium as their products.</p>
            <span class="work-card-link">View the site <span aria-hidden="true">&rarr;</span></span>
          </a>
```

**Step 2: Verify**

Visit `http://localhost:8000/` — Radwax should appear as the first card in the work grid, with a live iframe thumbnail showing the warm honey/cream design.

---

### Task 4: Update work page — remove placeholder, add real before/after

**Files:**
- Modify: `work.html:107-146` (placeholder section + before/after slider)

**Step 1: Remove the "Portfolio launching this week" placeholder section**

Delete lines 107-116 entirely (the `portfolio-placeholder` section).

**Step 2: Replace placeholder slider content with real images**

Replace the before/after slider content (current lines 124-133) with:

```html
      <div class="ba-slider mt-10">
        <div class="ba-before">
          <img src="/images/radwax-before.jpg" alt="Rad Wax Factory — before redesign" style="width:100%;height:100%;object-fit:cover;object-position:top;">
          <span class="ba-label ba-label-before">Before</span>
        </div>
        <div class="ba-after">
          <img src="/images/radwax-after.jpg" alt="Rad Wax Factory — after redesign by Skotte" style="width:100%;height:100%;object-fit:cover;object-position:top;">
          <span class="ba-label ba-label-after">After</span>
        </div>
        <div class="ba-handle"></div>
        <input type="range" min="0" max="100" value="50" aria-label="Drag to compare before and after">
      </div>
```

**Step 3: Add client name above the slider**

Add a heading between the section title and the slider:

```html
      <h3 style="font-family: var(--font-display); font-size: var(--text-2xl); margin-top: var(--space-6);">Rad Wax Factory</h3>
      <p style="color: var(--text-light); margin-top: var(--space-2);">radwaxfactory.com — beeswax wellness brand, San Diego</p>
```

**Step 4: Verify**

Visit `http://localhost:8000/work.html` — should show the before/after slider with real screenshots. Dragging the handle should reveal/hide the before image.

---

### Task 5: Visual QA and commit

**Step 1: Test home page**
- Radwax card shows as first item in work grid
- iframe thumbnail loads and shows the warm honey design
- Clicking the card navigates to /clients/radwax/index.html
- 5 cards total in the grid

**Step 2: Test work page**
- No more "Portfolio launching this week" placeholder
- Before/after slider shows real Radwax screenshots
- Slider handle drags smoothly between before/after
- "Before" and "After" labels visible
- PageSpeed metrics still visible below slider

**Step 3: Test mobile**
- Work cards stack to single column
- Before/after slider is touch-draggable
- Images scale correctly

**Step 4: Commit**

```bash
git add clients/ images/radwax-before.jpg images/radwax-after.jpg index.html work.html
git commit -m "feat: add Rad Wax Factory as first portfolio showcase"
```
