import { Router, Request, Response } from "express";
// import getHtmlTemplate from "../../../utils/getHtmlTemplate";
import { saveImage } from "../../services";
import { Snapshot } from "../../services/capturer";
const route = Router();
export default (app: Router) => {
  app.use("/image", route);

  route.get("/capture", async (req: Request, res: Response) => {
    try {
      const url: string = String(req.query.url);
      if (!url) {
        throw Error("should provide url");
      }

      const valid = /(https?|http?)([^\s]+)/g.test(url);

      if (!valid) {
        throw Error("Please send valid url, maybe missing http:// or https://");
      }

      const bytesBuffer = await Snapshot.capture(url, {
        encoding: "binary",
        omitBackground: true,
      });

      if (!bytesBuffer) {
        throw Error("something went wrong");
      }
      const saved = await saveImage(url, bytesBuffer);
      if (!saved) {
        throw Error("something went wrong");
      }
      const imageId = saved.images[0].id;
      res.json({ success: true, url: `localhost:5555/api/image/${imageId}` });
    } catch (e) {
      res.json({ success: false, message: e.message });
    }
  });
};
