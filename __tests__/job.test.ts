import { Queue, Worker } from "bullmq";
import config from "../src/config";

describe("Queing jobs and assinging workers", () => {
  const mockFn = jest.fn();
  it("should create new job", async () => {
    const queue = new Queue("test_queue", {
      connection: {
        host: config.queue.host,
        port: config.queue.port,
      },
    });

    const job = await queue.add("test_queue", { url: "testscreenshot.com" });
    expect(job.data.url).toBe("testscreenshot.com");
  });

  it("should setup the worker", async (done) => {
    const worker = new Worker("test_queue", mockFn, {
      connection: {
        host: config.worker.host,
        port: config.worker.port,
      },
    });
    worker.on("completed", () => {
      expect(mockFn).toBeCalled();
    });
    done();
  });
});
