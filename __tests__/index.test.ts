import "reflect-metadata";
import { Entity, getRepository, createConnection, BaseEntity } from "typeorm";
import { Image } from "../src/entities/Image";
import getMockImageData from "./utils/getMockImageData";
import connection from "./utils/connection";
import { Website } from "../src/entities/Website";

beforeAll(() => connection.clear());
beforeEach(
  async () =>
    await createConnection({
      name: "default",
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "Administrator98",
      database: "test",
      entities: ["../**/entities/**/*.ts"], //[Image, Website],
    })
);
// connection.create([Image, Website]));

afterEach(() => connection.close());

describe("Saving an image", () => {
  it("creates a an image", async () => {
    const image = new Image();
    const url = "testwebsite.com";
    // const imageRepo = await getRepository(Image);
    // const websiteRepo = await getRepository(Website);

    const website = new Website();
    website.url = url;

    image.createdAt = new Date();
    image.data = await getMockImageData();

    await Image.save(image);
    website.images = [image];
    await Website.save(website);

    // const foundWebsite = await Website.findOne({ relations: ["images"] });
    // expect(foundWebsite!.url).toBe(url);
  });
});
