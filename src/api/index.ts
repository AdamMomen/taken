import { Router } from "express";
import image from "./routes/image";
import job from "./routes/job";

/**
 * Main Express Router
 */
export default () => {
  const app = Router();

  /**
   * Loads Image Router
   */
  image(app);
  job(app);

  return app;
};
