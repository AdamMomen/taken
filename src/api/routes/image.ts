import { Router, Request, Response } from "express";
import getHtmlTemplate from "../../../utils/getHtmlTemplate";
import { Snapshot } from "../../services/capturer";
const route = Router();
export default (app: Router) => {
  app.use("/image", route);

  route.get("/capture", async (req: Request, res: Response) => {
    const url: string = String(req.query.url);
    const valid = /(https?|http?)([^\s]+)/g.test(url);
    if (!valid) {
      res.send("Please send valid url, maybe missing http:// or https://");
    }
    console.log("valid ", valid);
    console.log("url: ", url);
    if (!url) {
      res.json({ success: false, error: { message: "should provide url " } });
    }
    const bufferStr = await Snapshot.capture(url, {
      encoding: "base64",
      omitBackground: true,
    });
    if (!bufferStr) {
      return res.json({ sucess: false }).end();
    }
    res.send(getHtmlTemplate(bufferStr)).end();
  });
};
