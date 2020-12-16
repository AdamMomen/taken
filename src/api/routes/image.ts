import { Request, Response, Router } from "express";
import { getFormTemplate } from "../../../utils/getHtmlTemplates";
import config from "../../config";
import { createImageTemplate, saveImage } from "../../services";
import { Snapshot } from "../../services/capturer";
const route = Router();
export default (app: Router) => {
  app.use("/image", route);
  route.post("/capture", async (req: Request, res: Response) => {
    try {
      const { url } = req.body;
      if (!url) {
        throw Error("should provide url");
      }

      const valid = /(https?|http?)([^\s]+)/g.test(url);

      if (!valid) {
        throw Error(
          "Please send valid url, maybe missing http:// or https://?"
        );
      }

      const bytesBuffer = await Snapshot.capture(url, {
        encoding: "binary",
        omitBackground: true,
      });

      if (!bytesBuffer) {
        throw Error("something couldn't capture the webiste for some reason");
      }
      const saved = await saveImage(url, bytesBuffer);
      if (!saved) {
        throw Error("something went wrong");
      }
      const imageId = saved.images[0].id;
      res.json({
        success: true,
        //TODO: remoeve the static localhost:PORT and make dynamic
        url: `localhost:5555${config.api.prefix}/image?id=${imageId}`,
      });
    } catch (e) {
      res.json({ success: false, message: e.message });
    }
  });
  route.get("/capture", async (req: Request, res: Response) => {
    try {
      const apiPoint = `${config.api.prefix}/image/capture`;
      const formTemplate = getFormTemplate("localhost:5555", apiPoint);
      res.status(200).send(formTemplate);
    } catch (e) {
      res.status(200).json({ success: false, message: e.message });
    }
  });

  route.get("", async (req, res) => {
    const id = String(req.query.id);
    if (!id) {
      return res.status(204).send("nothing to show");
    }
    const imageTemplate = await createImageTemplate(id);

    if (!imageTemplate) {
      return res.status(404).send("image url not found! :(");
    }

    return res.send(imageTemplate);
  });
};
