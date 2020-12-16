import puppeteer, {
  Base64ScreenShotOptions,
  BinaryScreenShotOptions,
  DirectNavigationOptions,
  NavigationOptions,
  Page,
  ScreenshotOptions,
} from "puppeteer";
import convertStringToBuffer from "../../utils/convertStringToBuffer";

interface CapturerType {
  init: () => void;
  goto: () => void;
  capture: (url: string) => Promise<string>;
  createPage: () => Promise<Page>;
  convert2Byte: (buffer: Buffer) => Promise<Buffer | string>;
}
// interface CaptureOptions extends DirectNavigationOptions {}
// interface NavigationOptions extends <DirectNavigationOptions bo BinaryScreenShotOptions> {
//   waitsUntil: "networkidle2";
// }
export class Snapshot {
  static async createPage() {
    const browser = await puppeteer.launch({ headless: true });
    return await browser.newPage();
  }

  static async goto(
    page: Page,
    url: string,
    navigationOption: DirectNavigationOptions
  ) {
    await page.goto(url, { ...navigationOption });
  }

  static async convert2Byte(buffer: Buffer) {
    return await convertStringToBuffer(buffer);
  }

  static async capture(url: string, options: ScreenshotOptions) {
    const page = await this.createPage();
    await this.goto(page, url, { waitUntil: "networkidle2" });
    const buffer = await page.screenshot(options);
    const bytes = await this.convert2Byte(buffer);

    return bytes;
  }
}
