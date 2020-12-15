import puppeteer from "puppeteer";
import { createConnection } from "typeorm";
import Image from "./entities/Image";
const connectionConfig = require("../typeorm.config.json");
const main = async () => {
  // await createConnection(connectionConfig);
  const url = "https://adammomen.com";
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  //reload
  await page.goto(url, { waitUntil: "networkidle2" });
  const buffer = await page.screenshot({ path: "./images/example.png" });
  //reload

  const image = new Image();

  image.url = url;
  image.createdAt = new Date();
  image.data = buffer;
  await Image.save(image);
  await browser.close();

  console.log("photo saved\n", buffer);
};

main().catch((err) => console.error(err));
