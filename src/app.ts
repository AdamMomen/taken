import "reflect-metadata";
import loader from "./loaders";
import express from "express";
import config from "./config";
import Logger from "./loaders/logger";

const app = express();

const httpServer = require("http").Server(app);
/**
 * Server Starter ⚙
 * Intilize express server and loads up postgress connection
 */
export default async () => {
  try {
    await loader({ expressApp: app, httpServer });
    httpServer.listen(config.port, () => {
      Logger.info(`\n
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    });
  } catch (e) {
    Logger.error(e.message);
  }
};
