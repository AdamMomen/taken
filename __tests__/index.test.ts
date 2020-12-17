import "reflect-metadata";
import { Connection } from "typeorm";
import { Image } from "../src/entities/Image";
import { Website } from "../src/entities/Website";
import connection from "./utils/connection";
import getMockImageData from "./utils/getMockImageData";

beforeAll(() => connection.clear());

afterEach(async () => await connection.close());

describe("Saving an image", () => {
  it("creates a an image", async () => {
    const conn: Connection = await connection.create([Website, Image]);
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

    const foundWebsite = await Website.findOne({ relations: ["images"] });
    expect(foundWebsite!.url).toBe(url);
  });
});
