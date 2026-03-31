/**
 * Visual Review Script (Playwright)
 * Screenshots all pages and checks for broken links.
 *
 * Usage: node scripts/visual-review.js [--url http://localhost:4321]
 *
 * Prerequisites: npx playwright install chromium
 */

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const args = process.argv.slice(2);
const baseUrl = args.find(a => a.startsWith('http')) || 'http://localhost:4321';

const config = YAML.parse(fs.readFileSync('./site.config.yaml', 'utf8'));
const screenshotDir = './screenshots';
const reportPath = './screenshots/report.json';

async function visualReview() {
  fs.mkdirSync(screenshotDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const primaryArea = config.areas.find(a => a.is_primary) || config.areas[0];
  const city = primaryArea.name.toLowerCase().replace(/\s+/g, '-');
  const state = config.business.address.state.toLowerCase();

  // Build page list
  const pages = [
    { url: '/', name: 'homepage' },
    { url: '/about', name: 'about' },
    { url: '/contact', name: 'contact' },
    { url: '/projects', name: 'projects' },
    { url: '/privacy-policy', name: 'privacy-policy' },
  ];

  // Service pages
  for (const service of config.services) {
    pages.push({
      url: `/services/${service.slug}-${city}-${state}`,
      name: `service-${service.slug}`,
    });
  }

  // Area pages (first 5)
  for (const area of config.areas.slice(0, 5)) {
    pages.push({
      url: `/areas/${area.slug}`,
      name: `area-${area.slug}`,
    });
  }

  const results = [];
  const brokenLinks = [];

  console.log(`Reviewing ${pages.length} pages at ${baseUrl}...\n`);

  for (const p of pages) {
    const fullUrl = `${baseUrl}${p.url}`;
    try {
      const response = await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 15000 });
      const status = response?.status() || 0;

      // Desktop screenshot
      await page.screenshot({
        path: path.join(screenshotDir, `${p.name}-desktop.png`),
        fullPage: true,
      });

      // Mobile screenshot
      await page.setViewportSize({ width: 375, height: 812 });
      await page.screenshot({
        path: path.join(screenshotDir, `${p.name}-mobile.png`),
        fullPage: true,
      });
      await page.setViewportSize({ width: 1440, height: 900 });

      // Check for broken links on this page
      const links = await page.$$eval('a[href]', anchors =>
        anchors.map(a => a.href).filter(h => h.startsWith('http'))
      );

      const uniqueLinks = [...new Set(links)];
      for (const link of uniqueLinks.slice(0, 20)) {
        if (link.startsWith(baseUrl)) {
          try {
            const linkResponse = await page.goto(link, { timeout: 8000 });
            if (linkResponse && linkResponse.status() >= 400) {
              brokenLinks.push({ page: p.url, link, status: linkResponse.status() });
            }
          } catch {
            brokenLinks.push({ page: p.url, link, status: 'timeout' });
          }
        }
      }

      results.push({ page: p.url, name: p.name, status, screenshots: true });
      console.log(`  ✓ ${p.url} (${status})`);
    } catch (err) {
      results.push({ page: p.url, name: p.name, status: 'error', error: err.message });
      console.log(`  ✗ ${p.url}: ${err.message}`);
    }
  }

  // Write report
  const report = {
    date: new Date().toISOString(),
    baseUrl,
    totalPages: pages.length,
    results,
    brokenLinks,
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`\n--- Report ---`);
  console.log(`Pages reviewed: ${results.length}`);
  console.log(`Broken links found: ${brokenLinks.length}`);
  if (brokenLinks.length > 0) {
    brokenLinks.forEach(bl => console.log(`  ${bl.page} → ${bl.link} (${bl.status})`));
  }
  console.log(`\nScreenshots saved to: ${screenshotDir}/`);
  console.log(`Report saved to: ${reportPath}`);

  await browser.close();
}

visualReview().catch(console.error);
