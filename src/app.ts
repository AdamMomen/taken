import "reflect-metadata";
import loader from "./loaders";
import express from "express";
import config from "./config";
import Logger from "./loaders/logger";
const app = express();

export default async () => {
  await loader({ expressApp: app });

  app
    .listen(config.port, () => {
      Logger.info(`\n
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on("error", (err) => {
      Logger.error(err);
    });
};
