import { NextFunction, Request, Response } from "express";
import Logger from "../loaders/logger";

export default (error: any, _: Request, res: Response, next?: NextFunction) => {
  Logger.info(error.message);
  res.status(200).json({ success: false, error: error.message });
  next ? next() : null;
};
