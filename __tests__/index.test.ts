import "reflect-metadata";
import { Connection } from "typeorm";
import { Image } from "../src/entities/Image";
import { Website } from "../src/entities/Website";
import connection from "../src/utils/connection";
import getMockImageData from "./utils/getMockImageData";

describe("Saving an image", () => {
  let conn: Connection;
  beforeAll(async () => {
    conn = await connection.create("test");
  });

  it("creates and save an image", async () => {
    const image = new Image();
    const url = "testwebsite.com";
    const imageRepo = conn.getRepository(Image);
    const websiteRepo = conn.getRepository(Website);

    const website = new Website();
    website.url = url;

    image.createdAt = new Date();
    image.data = await getMockImageData();

    await imageRepo.save(image);
    website.images = [image];
    await websiteRepo.save(website);

    const foundWebsite = await websiteRepo.findOne({ relations: ["images"] });
    expect(foundWebsite!.url).toBe(url);
  });
});
