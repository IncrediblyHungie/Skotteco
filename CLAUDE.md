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
- Dark theme (`#0A0A0F` base, `#4F7FFF` accent)

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

# Check file sizes
wc -c css/*.css js/*.js
```

## Bug Fixes & Learnings
(Add issues here as they arise)
