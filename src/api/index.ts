import { Router } from "express";
import image from "./routes/image";

/**
 * Main Express Router
 */
export default () => {
  const app = Router();

  /**
   * Loads Image Router
   */
  image(app);

  return app;
};
