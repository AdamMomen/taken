import connection from "./utils/connection";
import Image from "../src/entities/Image";
import { getMockImageData } from "./utils";
beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});
describe("Saving an image", () => {
  it("creates a an image", async () => {
    const image = new Image();
    const url = "testwebsite.com";

    image.url = url;
    image.createdAt = new Date();
    image.data = await getMockImageData();

    await Image.save(image);
    expect(await Image.findOne({ url })).toBeDefined();
  });
});
