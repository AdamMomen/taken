import express from "express";
import "reflect-metadata";
import config from "./config";
import loader from "./loaders";
import Logger from "./loaders/logger";
const app = express();

const main = async () => {
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

main().catch((err) => Logger.info(err));
