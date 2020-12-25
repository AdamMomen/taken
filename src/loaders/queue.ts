import { Queue } from "bullmq";
import config from "../config";

export default () => {
  return new Queue("websites", {
    connection: {
      host: config.queue.host,
      port: config.queue.port,
    },
  });
};
