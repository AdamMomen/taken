import { Express } from "express";
import exrpressLoader from "./express";
import Logger from "./logger";
import postgresLoader from "./postgres";

/**
 * Asynchronous Loads up various jobs and services
 */
export default async ({ expressApp }: { expressApp: Express }) => {
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
};
