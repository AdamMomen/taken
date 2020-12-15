import * as puppeteer from "puppeteer";

const main = async () => {
  const url = "https://adammomen.com";
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkIdle2" });
  await page.screenshot({ path: "example.png" });

  await browser.close();
};

main().catch((err) => console.log(err));
