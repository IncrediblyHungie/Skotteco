# DigitalWave — Client Website

**Status**: Built, pending client review
**Type**: Social Media Marketing Agency — Lead generation / discovery call booking
**Location**: `/home/peteylinux/Projects/Skotteco/clients/digitalwave/`

---

## Tech Stack

Pure HTML/CSS/JS. No frameworks. No build tools. Cloudflare Pages deployment.

---

## Pages

| Page | Purpose |
|------|---------|
| `index.html` | Homepage — hero, services grid, stats, testimonial, CTA |
| `services.html` | Full services + pricing tiers + FAQ accordion |
| `work.html` | Portfolio (placeholder) |
| `about.html` | Team + mission + process |
| `contact.html` | Discovery call booking form (Formspree) |

---

## CSS Structure

```
css/
  variables.css   — Design tokens (navy/gold palette)
  reset.css       — Normalize
  layout.css      — Grid, containers, utilities, scroll reveal
  components.css  — All component styles
  responsive.css  — Mobile breakpoints (1024, 768, 480)
```

---

## Design System

**Palette**: Deep navy (`#0D1B2A`) + Gold (`#C9A84C`) + Warm cream text (`#F4EFE6`)
**Fonts**: Cormorant Garamond (display/headlines) + Inter (body/UI)
**Style**: Premium agency — clean grid, generous whitespace, strong typographic hierarchy

---

## Client Setup Checklist

- [ ] Add Formspree form ID to `contact.html` (replace `YOUR_FORM_ID`)
- [ ] Add Calendly link to `contact.html` (see comment in HTML)
- [ ] Replace placeholder team names/bios in `about.html`
- [ ] Replace placeholder testimonial in `index.html`
- [ ] Update `mailto:` email across all pages (`hello@digitalwave.agency`)
- [ ] Add real domain to `robots.txt` and `sitemap.xml` (already set to `digitalwave.agency`)
- [ ] Update canonical URLs in all `<head>` tags once domain is confirmed
- [ ] Add favicon

---

## Development

```bash
# Local preview
cd /home/peteylinux/Projects/Skotteco/clients/digitalwave/
python -m http.server 8000
# Open http://localhost:8000
```

---

## Deploy

```bash
CLOUDFLARE_ACCOUNT_ID=5fd1871f533fe5afc25bdea65d2a9d4e CLOUDFLARE_API_TOKEN=Kx1oHbAaS65zQg4cvAH3pf1KMRU8Z8bbJchaOjm2 npx wrangler pages deploy /home/peteylinux/Projects/Skotteco/clients/digitalwave --project-name=digitalwave --commit-dirty=true
```

---

## JS Behaviors (`js/main.js`)

- Header scroll: transparent → frosted glass on scroll
- Mobile menu: hamburger toggle with overlay + slide-in drawer
- Scroll reveal: `IntersectionObserver` on `.reveal` and `.reveal-group` elements
- FAQ accordion: click to expand/collapse, only one open at a time
- Contact form: Formspree async submit with success state

---

*Created: March 2026*
