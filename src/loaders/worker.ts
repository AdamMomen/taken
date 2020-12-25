import { Job, Worker } from "bullmq";
import config from "../config";
import { Status } from "../entities/Job";
import { updateJobStatus } from "../models/job";
import { saveImage } from "../services";
import { Snapshot } from "../services/capturer";
import Logger from "./logger";

class ScreenshotWorker {
  static start() {
    try {
      const worker = new Worker(
        "websites",
        async (job) => {
          const { data, id, progress } = job;

          //save image  image
          const { url, options } = data;

          Logger.info("job data: ", data);

          /**
           * Takes url string and takes a screenshot of that website
           */
          const binaryBuffer = await Snapshot.capture(url, options);

          /**
           * Takes image Buffer converts it into @bytea type and stores it in the database
           */
          const saved = await saveImage(url, binaryBuffer);

          // get the saved image id
          const imageId = saved.images[0].id;

          this.registerEvents(worker);
          return {
            screenshot: `${config.hostname}${config.api.prefix}/image?id=${imageId}`,
          };
        },
        {
          connection: {
            host: config.worker.host,
            port: config.worker.port,
          },
        }
      );
    } catch (err) {
      Logger.error(err.message);
    }
  }
  private static registerEvents(worker: Worker) {
    this.onComplete(worker);
    this.onProgress(worker);
    this.onFail(worker);
  }
  private static onComplete(worker: Worker) {
    worker.on(
      "completed",
      async (job: Job, { screenshot }: { screenshot: string }) => {
        if (job.id) {
          const id = parseInt(job.id);
          Logger.info(`Job id:${id}'s has finished, ${screenshot}%`);
          await updateJobStatus(Number(job.id), {
            status: Status.DONE,
            screenshot,
          });
        }
      }
    );
  }
  private static onProgress(wokrer: Worker) {
    wokrer.on("progress", async (job: Job, progress: number | object) => {
      //TODO: add sockets to emit progress to the user
    });
  }
  private static onFail(worker: Worker) {
    worker.on(
      "failed",
      async (job: Job, { screenshot }: { screenshot: string }) => {
        try {
          if (job.id) {
            const id = parseInt(job.id);
            Logger.info(`job id:${id} has fialed`);
            await updateJobStatus(id, {
              status: Status.DONE,
              screenshot,
            });
          }
        } catch (e) {
          throw new Error(e);
        }
      }
    );
  }
}

export default () => {
  ScreenshotWorker.start();
};
