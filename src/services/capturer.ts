import puppeteer, {
  BinaryScreenShotOptions,
  DirectNavigationOptions,
  Page,
} from "puppeteer";
import convertB64ToBuffer from "../utils/convertB64ToBuffer";

/**
 * Snapshot class that handles image screenshooting service
 * @method createPage launches and creates puppeteer browser page
 * @method goto navigate to specific url
 * @method capture captures a screenshot of url page
 * @method convert2Byte converts binary buffer to bytes
 */
export class Snapshot {
  static async createPage() {
    const browser = await puppeteer.launch({ headless: true });
    return await browser.newPage();
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
  static async capture(url: string, options: BinaryScreenShotOptions) {
    const page = await this.createPage();
    await this.goto(page, url, { waitUntil: "networkidle2" });
    const buffer = await page.screenshot(options);
    const bytes = await this.convert2Byte(buffer);

    return bytes;
  }
}
