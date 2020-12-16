import { Router } from "express";
import image from "./routes/image";

export default () => {
  const app = Router();

  image(app);

  return app;
};
