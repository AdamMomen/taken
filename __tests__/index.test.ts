import "reflect-metadata";
import { Entity, getRepository } from "typeorm";
import { Image } from "../src/entities/Image";
import { getMockImageData } from "./utils";
import connection from "./utils/connection";

beforeEach(() => connection.create([(Image as unknown) as typeof Entity]));

afterEach(() => connection.close());

describe("Saving an image", () => {
  it("creates a an image", async () => {
    const image = new Image();
    const url = "testwebsite.com";
    const imageRepo = await getRepository(Image);

    image.url = url;
    image.createdAt = new Date();
    const buffer = await getMockImageData();
    image.data = buffer;

    await imageRepo.save(image);

    const foundImage = await imageRepo.findOne({ url });
    expect(foundImage!.url).toBe(url);
  });
});
