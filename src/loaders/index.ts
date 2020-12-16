import { Express } from "express";
import exrpressLoader from "./express";
import Logger from "./logger";
import postgresLoader from "./postgres";
export default async ({ expressApp }: { expressApp: Express }) => {
  await exrpressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");

  await postgresLoader();
  Logger.info("✌️ Postgres loaded");
};
