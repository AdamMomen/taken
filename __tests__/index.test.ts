import "reflect-metadata";
import { Connection } from "typeorm";
import { Image } from "../src/entities/Image";
import { Website } from "../src/entities/Website";
import { Job } from "../src/entities/Job";
import connection from "../src/utils/connection";
import getMockImageData from "./utils/getMockImageData";
import { Queue } from "bullmq";

// afterEach(async () => await connection.close());
describe("Saving an image", () => {
  it("creates and save an image", async () => {
    const conn = await connection.create("test");
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
  // create a test that creates a new job this job should be added to the data base
  it("should create new job", async () => {
    const redis = require("redis-mock");
    const client = redis.createClient();
    client.info = async () => "version";
    client.defineCommand = () => {};
    const queue = new Queue("test_queue", { client });
    queue.add({ data: true });
  });
  // The worker should resolve this issue
});
