import puppeteer, { Browser, DirectNavigationOptions, Page } from "puppeteer";
import convertB64ToBuffer from "../utils/convertB64ToBuffer";
import { CaptureOptions } from "../@types";
/**
 * Snapshot class that handles image screenshooting service
 * @method createPage launches and creates puppeteer browser page
 * @method goto navigate to specific url
 * @method capture captures a screenshot of url page
 * @method convert2Byte converts binary buffer to bytes
 */
export class Snapshot {
  static browser: Browser | null;
  static page: Page | null;

  static async getPage() {
    this.browser = !this.browser
      ? await puppeteer.launch({
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        })
      : this.browser;
    this.page = !this.page ? await this.browser.newPage() : this.page;
    return this.page;
  }

  /**
   * Navigates the page into specific url
   * @param page
   * @param url
   * @param navigationOption
   */
  static async goto(
    page: Page,
    url: string,
    navigationOption: DirectNavigationOptions
  ) {
    await page.goto(url, navigationOption);
  }

  /**
   * Converts binary buffer to byta type
   * @param buffer
   * @returns Buffer
   */
  static async convert2Byte(buffer: Buffer) {
    return await convertB64ToBuffer(buffer);
  }

  /**
   * Captures a image of a given webiste url
   * @param url
   * @param options
   * @returns bytes buffer of the screenshooted image
   */
  static async capture(
    url: string,
    { width = 1920, height = 1080 }: CaptureOptions | any
  ): Promise<Buffer> {
    try {
      const page = await this.getPage();
      await this.goto(page, url, { waitUntil: "networkidle2" });
      await page.setViewport({ width, height });
      const buffer = await page.screenshot({ encoding: "binary" });
      const bytes = await this.convert2Byte(buffer);
      await page.close();
      return bytes;
    } catch (e) {
      throw new Error(e);
    }
  }
}
