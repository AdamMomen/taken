import "reflect-metadata";
import puppeteer, {
  Base64ScreenShotOptions,
  BinaryScreenShotOptions,
} from "puppeteer";
import { createConnection } from "typeorm";
import Image from "./entities/Image";
const connectionConfig = require("../typeorm.config.json");
const main = async () => {
  const conn = await createConnection(connectionConfig);
  const url = "https://github.com/AdamMomen";
  // const browser = await puppeteer.launch({ headless: true });
  // const page = await browser.newPage();
  // await page.goto(url, { waitUntil: "networkidle2" });
  // const screenOptions: BinaryScreenShotOptions = {
  //   type: "png",
  // };
  // const buffer = await page.screenshot(screenOptions);

  const image = new Image();

  image.url = url;
  image.createdAt = new Date();
  // image.data = ("\\x" + buffer.toString("hex")) as any;
  // buffer; //TODO: change to bytea type
  // await Image.save(image);
  // await browser.close();

  console.log("Image saved");
  console.log(await Image.findOne({ url }));
};

main().catch((err) => console.log(err));
