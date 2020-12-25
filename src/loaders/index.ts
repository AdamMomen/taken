import { Express } from "express";
import exrpressLoader from "./express";
import Logger from "./logger";
import postgresLoader from "./postgres";
import socketLoader from "./socket";
import { Server } from "http";
// import queueLoader from "./queue";
import workerLoader from "./worker";
/**
 * Asynchronous Loads up various jobs and services
 */

interface ServerTypes {
  expressApp: Express;
  httpServer: Server;
}
export default async ({ expressApp, httpServer }: ServerTypes) => {
  /**
   * Express Loader
   */
  await exrpressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");

  /**
   * Postgress connection Loader
   */
  await postgresLoader();
  Logger.info("✌️ Postgres loaded");

  /**
   * Socket Loader
   */
  await socketLoader({ httpServer });
  Logger.info("✌️ Sockets loaded");

  /**
   * Worker Loader
   */
  await workerLoader();
  Logger.info("👷 Workers ready");
};
