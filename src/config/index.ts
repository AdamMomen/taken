import dotenv from "dotenv";
import os from "os";
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}
export default {
  port: parseInt(process.env.PORT as Number & string, 10),
  logs: { level: process.env.LOG_LEVEL || "debug" },
  api: {
    prefix: "/api",
  },
  hostname: process.env.HOSTNAME || "localhost:5555",
  sockets: { path: "" },
  queue: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_HOST as Number & undefined, 10) || 6379,
  },
  worker: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as Number & undefined, 10) || 6379,
    concurrency: os.cpus().length,
  },
};
