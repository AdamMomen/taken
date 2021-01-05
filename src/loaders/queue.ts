import { Queue } from "bullmq";
import config from "../config";

export default () => {
  return new Queue(config.queue.name, {
    connection: {
      host: config.queue.host,
      port: config.queue.port,
    },
  });
};
