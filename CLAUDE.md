# Skotte.co — Web Rebranding Studio

## Overview
Marketing site for Peter + Khrystyna's web rebranding studio in San Diego.
Converts cold-email traffic into discovery call bookings.

## Stack
- Pure static HTML/CSS/JS (no frameworks)
- Deployment: Cloudflare Pages (no build step, output dir: `/`)
- Domain: skotte.co

## Architecture
- 5 HTML pages: index, work, services, about, contact
- 5 CSS files: variables, reset, layout, components, responsive
- 1 JS file: main.js (all interactivity)
- Dark Espresso theme (`#1A1612` base, `#C4A265` accent)
- Fonts: Fraunces (display) + Source Sans 3 (body)

## Key Files
- `css/variables.css` — Design tokens (dark theme)
- `css/components.css` — All component styles
- `js/main.js` — Header scroll, mobile nav, sliders, FAQ accordion, forms
- Contact form: Formspree integration
- Scheduling: Calendly embed

## Commands
```bash
# Local preview
python -m http.server 8000

# Deploy to Cloudflare Pages (from /tmp/skotteco-deploy)
CLOUDFLARE_ACCOUNT_ID=5fd1871f533fe5afc25bdea65d2a9d4e CLOUDFLARE_API_TOKEN=Kx1oHbAaS65zQg4cvAH3pf1KMRU8Z8bbJchaOjm2 npx wrangler pages deploy /tmp/skotteco-deploy --project-name=skotteco --commit-dirty=true

# Check file sizes
wc -c css/*.css js/*.js
```

## Bug Fixes & Learnings
(Add issues here as they arise)
