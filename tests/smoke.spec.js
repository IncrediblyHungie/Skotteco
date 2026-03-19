const { test, expect } = require('@playwright/test');

const PAGES = ['/', '/san-diego', '/work', '/services', '/about', '/contact', '/thank-you'];

for (const path of PAGES) {
  test(`${path} returns 200`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res.status()).toBe(200);
  });
}

test('Home — fonts ready', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const ready = await page.evaluate(() => document.fonts.ready.then(() => true));
  expect(ready).toBe(true);
});

test('Home — video has autoplay+muted+playsinline', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const video = page.locator('.hero-video');
  await expect(video).toHaveAttribute('autoplay', '');
  await expect(video).toHaveAttribute('muted', '');
  await expect(video).toHaveAttribute('playsinline', '');
});

test('Home — no console errors', async ({ page }) => {
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  expect(errors).toHaveLength(0);
});

test('San Diego — star rating visible', async ({ page }) => {
  await page.goto('/san-diego', { waitUntil: 'domcontentloaded' });
  const stars = page.locator('.stars-rating');
  await expect(stars).toBeVisible();
  const text = await stars.textContent();
  expect(text.trim().length).toBeGreaterThan(0);
});

test('San Diego — CTA links to peterskotte/30min', async ({ page }) => {
  await page.goto('/san-diego', { waitUntil: 'domcontentloaded' });
  const href = await page.locator('.hero-actions .btn').first().getAttribute('href');
  expect(href).toContain('calendly.com/peterskotte/30min');
});

test('San Diego — header is CSS grid', async ({ page }) => {
  await page.goto('/san-diego', { waitUntil: 'domcontentloaded' });
  const display = await page.locator('.site-header .container').evaluate(
    el => window.getComputedStyle(el).display
  );
  expect(display).toBe('grid');
});

test('San Diego — no console errors', async ({ page }) => {
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.goto('/san-diego', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  expect(errors).toHaveLength(0);
});

test('San Diego — CTA button visible above fold', async ({ page }) => {
  await page.goto('/san-diego', { waitUntil: 'domcontentloaded' });
  const box = await page.locator('.hero-actions .btn').first().boundingBox();
  expect(box).not.toBeNull();
  expect(box.y + box.height).toBeLessThan(1000);
});

test('San Diego — sticky CTA appears after scroll', async ({ page }) => {
  await page.goto('/san-diego', { waitUntil: 'domcontentloaded' });
  const width = await page.evaluate(() => window.innerWidth);
  if (width >= 768) {
    // iPad and desktop — sticky bar intentionally hidden above 768px breakpoint
    const display = await page.locator('.mobile-cta-bar').evaluate(
      el => window.getComputedStyle(el).display
    );
    expect(display).toBe('none');
    return;
  }
  await page.evaluate(() => window.scrollBy(0, 900));
  await page.waitForTimeout(600);
  const cls = await page.locator('.mobile-cta-bar').getAttribute('class');
  expect(cls).toContain('visible');
});

test('Work — before/after slider exists', async ({ page }) => {
  await page.goto('/work', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.ba-slider input[type="range"]').first()).toBeVisible();
});

test('Contact — Calendly widget has peterskotte/30min', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'domcontentloaded' });
  const url = await page.locator('.calendly-inline-widget').getAttribute('data-url');
  expect(url).toContain('peterskotte/30min');
});

test('Thank-you — noindex meta present', async ({ page }) => {
  await page.goto('/thank-you', { waitUntil: 'domcontentloaded' });
  const robots = await page.locator('meta[name="robots"]').getAttribute('content');
  expect(robots).toContain('noindex');
});

test('Thank-you — Google Ads conversion snippet present', async ({ page }) => {
  await page.goto('/thank-you', { waitUntil: 'domcontentloaded' });
  const content = await page.content();
  expect(content).toContain('AW-17969084989/uxQ9CMSkwIQcEL30qfhC');
});
