import {
  Application,
  Response,
  Request,
  NextFunction,
  urlencoded,
  json,
} from "express";
import cors from "cors";
import routes from "../api";
import config from "../config";
interface ExpressApp {
  app: Application;
}

export default ({ app }: ExpressApp) => {
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.enable("trust proxy");
  app.use(cors());

  /**
   * Status Health check
   * Method get
   * returns 200 status code
   */
  app.get("/status", (req: Request, res: Response) => {
    res.status(200).end();
  });

  /**
   * Load up routers
   */
  app.use(config.api.prefix, routes());

  /**
   * Error handling
   * returns the error's status code or general 500
   */
  app.use((err: any, _: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    if (err) next(err);
  });
};
