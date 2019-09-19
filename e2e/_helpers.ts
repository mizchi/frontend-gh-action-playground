import { Server } from "http";
import path from "path";
import express from "express";
import webdriver from "selenium-webdriver";

export async function startServer(port: number = 0): Promise<Server> {
  const app = express();
  app.use(express.static(path.join(__dirname, "../dist")));
  let server: Server = null as any;
  await new Promise<Server>(r => (server = app.listen(port, r)));
  return server as Server;
}

// puppeteer like wrapper
export class Page {
  constructor(private _driver: webdriver.WebDriver) {}

  async ensureNoError() {
    const logs = await this._driver
      .manage()
      .logs()
      .get("browser");
    const errorLogs = logs.filter((log: any) => log.level.name_ === "SEVERE");
    if (errorLogs.length > 0) {
      throw new Error(JSON.stringify(errorLogs));
    }
  }

  async getText(selector: string) {
    const elem = this._driver.findElement(webdriver.By.css(selector));
    return await elem.getText();
  }

  async loadUrl(url: string) {
    await this._driver.get(url);
  }

  async waitFor(selector: string, timeout = 150000) {
    await this._driver.wait(
      webdriver.until.elementLocated(webdriver.By.css(selector)),
      timeout
    );
  }

  async evaluate(code: string) {
    return this._driver.executeScript(code);
  }

  async title() {
    return this._driver.getTitle();
  }

  async close() {
    return this._driver.quit();
  }

  click(selector: string) {
    this._driver.findElement(webdriver.By.css(selector)).click();
  }
}
