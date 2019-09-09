import assert from "assert";
import puppeteer from "puppeteer";
import path from "path";
import express from "express";
import { Server } from "http";
import { AddressInfo } from "net";

console.log("start e2e");
jest.retryTimes(3);
jest.setTimeout(30 * 1000);

let server: Server;
let port: number;
let browser: puppeteer.Browser;
let page: puppeteer.Page;

beforeAll(async () => {
  const app = express();
  app.use(express.static(path.join(__dirname, "../dist")));
  await new Promise<Server>(r => (server = app.listen(0, r)));
  port = (server.address() as AddressInfo).port;
  browser = await puppeteer.launch();
});

afterAll(async () => {
  page && page.isClosed() && (await page.close());
  browser && browser.isConnected() && (await browser.close());
  server.close();
});

afterEach(async () => {
  page && page.isClosed() && (await page.close());
});

it("Root content is 'hello'", async () => {
  page = await browser.newPage();
  await page.goto(`http://localhost:${port}/`, {
    waitUntil: "domcontentloaded"
  });
  const targetSelector = "[data-testid='root']";
  await page.waitFor(targetSelector);
  const value = await page.evaluate(selector => {
    const v = document.querySelector(selector);
    return v && v.textContent;
  }, targetSelector);
  assert.equal(value, "hello");
});
