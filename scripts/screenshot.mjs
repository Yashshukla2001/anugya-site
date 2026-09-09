import { chromium } from "playwright";
import path from "node:path";

const BASE = "http://127.0.0.1:4173";
const OUT = path.resolve("shots");

const shots = [
  { name: "01-hero-desktop", url: "/", viewport: { width: 1440, height: 900 }, scrollY: 0, wait: 2200 },
  { name: "02-intro-desktop", url: "/", viewport: { width: 1440, height: 900 }, scrollY: 950, wait: 600 },
  { name: "03-showcase-start-desktop", url: "/", viewport: { width: 1440, height: 900 }, scrollY: 1750, wait: 400 },
  { name: "04-showcase-mid-desktop", url: "/", viewport: { width: 1440, height: 900 }, scrollY: 3400, wait: 400 },
  { name: "05-showcase-end-desktop", url: "/", viewport: { width: 1440, height: 900 }, scrollY: 4900, wait: 400 },
  { name: "06-amenities-desktop", url: "/", viewport: { width: 1440, height: 900 }, scrollY: 6600, wait: 400 },
  { name: "07-footer-desktop", url: "/", viewport: { width: 1440, height: 900 }, scrollY: 9200, wait: 400 },
  { name: "08-home-mobile", url: "/", viewport: { width: 390, height: 844 }, scrollY: 0, wait: 2200 },
  { name: "09-rooms-mobile", url: "/", viewport: { width: 390, height: 844 }, scrollY: 1600, wait: 400 },
  { name: "10-rooms-index-desktop", url: "/rooms", viewport: { width: 1440, height: 900 }, scrollY: 0, wait: 600 },
  { name: "11-room-detail-desktop", url: "/rooms/presidential-suite", viewport: { width: 1440, height: 900 }, scrollY: 0, wait: 600 },
  { name: "12-amenities-page-desktop", url: "/amenities", viewport: { width: 1440, height: 900 }, scrollY: 0, wait: 600 },
];

const browser = await chromium.launch();

for (const s of shots) {
  const page = await browser.newPage({ viewport: s.viewport });
  await page.goto(BASE + s.url, { waitUntil: "load", timeout: 15000 });
  await page.waitForTimeout(s.wait);
  if (s.scrollY) {
    await page.evaluate((y) => window.scrollTo(0, y), s.scrollY);
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: path.join(OUT, s.name + ".png") });
  await page.close();
  console.log("captured", s.name);
}

await browser.close();
