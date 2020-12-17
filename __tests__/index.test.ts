import "reflect-metadata";
import {
  Entity,
  getRepository,
  createConnection,
  BaseEntity,
  ConnectionManager,
  Connection,
} from "typeorm";
import { Image } from "../src/entities/Image";
import getMockImageData from "./utils/getMockImageData";
import connection from "./utils/connection";
import { Website } from "../src/entities/Website";

// beforeAll(() => connection.clear());
// beforeEach(
//   () =>
//   await createConnection({
//     name: "test",
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "administrator98",
//     database: "test",
//     entities: [image, website], //["**/entities/**/*.{js, ts}"],
// })
// );
// connection.create([Image, Website]));

afterEach(() => connection.close());

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
