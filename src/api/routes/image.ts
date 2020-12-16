import { Router, Request, Response } from "express";
import getHtmlTemplate from "../../../utils/getHtmlTemplate";
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
      const bufferStr = await Snapshot.capture(url, {
        encoding: "base64",
        omitBackground: true,
      });
      if (!bufferStr) {
        throw Error("something went wrong");
      }
      res.send(getHtmlTemplate(bufferStr)).end();
    } catch (e) {
      res.json({ success: false, message: e.message });
    }
  });
};
