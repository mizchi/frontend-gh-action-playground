import assert from "assert";
import puppeteer from "puppeteer";
async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.goto("https://google.com");
    assert.ok(await page.title(), "Google");
  } catch (e) {
    process.exit(1);
  } finally {
    await page.close();
    await browser.close();
  }
}
main();
