import { chromium } from "playwright";
import path from "node:path";

const BASE = "http://127.0.0.1:4173";
const OUT = path.resolve("shots");
const VP = { width: 1440, height: 900 };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: VP });
await page.goto(BASE + "/", { waitUntil: "load", timeout: 15000 });
await page.waitForTimeout(1200);

const targets = [
  { name: "amenities-teaser", role: "heading", text: "Amenities" },
  { name: "experience-strip", role: "heading", text: "The experience" },
  { name: "reviews", role: "link", text: "Read our Google reviews" },
  { name: "instagram", role: "link", text: "Follow Anugya on Instagram" },
  { name: "location-teaser", role: "heading", text: "Find us in" },
  { name: "footer", text: "Built by Exsora" },
];

for (const t of targets) {
  const loc = t.role ? page.getByRole(t.role, { name: t.text }).first() : page.getByText(t.text).first();
  await loc.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(OUT, "b-" + t.name + ".png") });
  console.log("captured", t.name);
}

await browser.close();
