# Skotte.co — Editorial Shift Design

## Problem

The current site reads like a conversion-optimized landing page. Every section answers an objection or pushes toward a booking. Compared to the reference site (oolong-studio.com), Skotte feels transactional where it should feel invitational.

## Inspiration Analysis

Oolong-studio.com feels "not salesy" because:
- Copy centers the client's vision, not deliverables
- Ambient personality details (live clock, donation line) say "we're real" without selling
- Services described as processes, not products
- No comparison tables, no FAQ objection handling, no scarcity language
- Trusts the visitor to reach out if they resonate

## Design Direction

**Approach A: Surgical Remove + Rewrite** — keep the strong bones (before/after, process, team) but remove the infomercial sections and rewrite copy to be invitational.

## Global Changes (all pages)

### Live clock in nav
- Right-aligned in desktop nav: `7:20 PM San Diego`
- Monospace font, small, updates every second
- Uses `Intl.DateTimeFormat` with `America/Los_Angeles` timezone
- On mobile: moves to footer (nav too tight)

### CTA language softened
- "Book Your Free Call" → "Let's talk"
- "Claim Your Spot" → removed
- "Book a call to discuss →" → "Start a conversation →"

### Footer values line
- Add: "1% of every project goes to local animal rescue." (placeholder — real cause TBD)
- Replace generic tagline or add below it

### CTA bands removed
- Dark CTA bands removed from index, services, about
- Replaced with quiet centered text: "If this feels like a fit, [let's talk](/contact.html)."

## Homepage (index.html)

### Sections REMOVED
1. **Comparison grid** ("With Skotte" vs "Typical Agency") — textbook marketing
2. **FAQ accordion** — objection handling is sales
3. **Marquee** — repeating pitch on a loop
4. **Portfolio placeholder** ("Claim Your Spot" scarcity)
5. **Scroll indicator** arrow
6. **CTA band** (dark bar)

### Sections KEPT (with rewrites)

**Hero:**
- Headline: "We build websites and take the photos."
- Subtitle: "A husband-and-wife studio in San Diego. Custom code, real photography, five days."
- CTA: "Let's talk" (single button)

**Before/After:**
- Section label: "(recent work)" instead of "(the transformation)"
- Title: "See the Difference" stays
- Slider + PageSpeed metrics stay (this is portfolio, not sales)

**Process:**
- Title: "How it works" instead of "Three Steps. Five Days."
- Content stays as-is

**Team:**
- Stays as-is (already editorial)

**Closing:**
- Simple centered text: "If this feels like a fit, let's talk."
- Text link, no button

### Final homepage flow (5 sections, down from 9)
Hero → Before/After → Process → Team → Quiet closing

## Services Page (services.html)

- Keep pricing (transparency is editorial)
- Rewrite descriptions to feel like processes, not product specs
- Soften CTAs: "Start a conversation →"
- Remove CTA band, add quiet closing

## About Page (about.html)

- Remove CTA band, add quiet closing
- Mission copy stays
- Consider converting services/industries bullet lists to prose (optional)

## Contact Page (contact.html)

- No changes (this IS the conversion page)

## Work Page (work.html)

- No changes (placeholder state)

## Font Tester Updates (separate task)

- Reorder: fonts 2, 5, 7 become positions 1, 2, 3
- Add 7 new font pairings
- Add color theme switcher to toolbar

## Files Affected

- `index.html` — remove 4 sections, rewrite hero, add closing
- `services.html` — rewrite descriptions, soften CTAs, remove CTA band
- `about.html` — remove CTA band, add closing
- `contact.html` — no changes
- `js/main.js` — add live clock function, remove FAQ/marquee init if needed
- `css/components.css` — add clock styles, closing-line styles
- All HTML files — update nav with clock element, update footer, update CTA text
- `js/font-tester.js` — reorder fonts, add new fonts, add color themes
