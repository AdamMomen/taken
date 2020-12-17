import { Request, Response, Router } from "express";
import config from "../../config";
import { createImageTemplate, saveImage } from "../../services";
import { Snapshot } from "../../services/capturer";
const route = Router();

export default (app: Router) => {
  app.use("/image", route);

  /**
   * Route /capture
   * Method @POST
   *
   * Takes @url from the body, then checks if the url is valid, puppeeter will take a snapshot of the website and saves it in the database
   * Returns @JSON oject containing url of the saved image
   */
  route.post("/capture", async (req: Request, res: Response) => {
    try {
      /** get the website url from request body **/
      const { url } = req.body;

      /** if the url is not provided throw an error **/
      if (!url) {
        throw Error("Please provide a url");
      }

      /** check if the url contains http or https identifiers **/
      const valid = /(https?|http?)([^\s]+)/g.test(url);

      /** Throw an error if it's not valid url */
      if (!valid) {
        throw Error(
          "Please send valid url, maybe missing http:// or https://?"
        );
      }

      /**
       * Takes url string and takes a screenshot of that website
       */
      const binaryBuffer: Buffer = await Snapshot.capture(url, {
        encoding: "binary",
        omitBackground: true,
      });

      /** Throws an error if we don't get the image buffer */
      if (!binaryBuffer) {
        throw Error(
          "Couldn't capture the webiste for some reason, maybe it's an invalid url?"
        );
      }

      /**
       * @function saveImage
       * Takes image Buffer converts it into @bytea type and stores it in the database
       * @Param url String
       * @Param options
       */
      const saved = await saveImage(url, binaryBuffer);

      // if not saved throw the error
      if (!saved) {
        throw Error("couldn't save the image");
      }
      // get the saved image id
      const imageId = saved.images[0].id;

      // send the saved url of the image to to user
      res.json({
        success: true,
        url: `${config.hostname}${config.api.prefix}/image?id=${imageId}`,
      });
    } catch (e) {
      res.json({ success: false, message: e.message });
    }
  });

  /**
   * @Route /image
   * @Method GET
   *
   * Displaying image request in html
   * @Takes imageId as a query param and look up in the database
   * @returns HTML content of the image.
   */
  route.get("", async (req, res) => {
    const imageId = String(req.query.id);

    if (!imageId) {
      return res.status(204).send("Nothing to show");
    }
    /**
     * @function createImageTemplate
     * @param imageId  string
     * Takes the imageId and looks it in the database if found, it will convert it to base64 image data and parse in html content
     */
    const imageTemplate = await createImageTemplate(imageId);

    /** Throws an errro if we couldn't find the image or there is a problme in the conversion to base64 string */
    if (!imageTemplate) {
      res.status(404).send("image url not found! :(");
    }

    /** send the html image template to the user **/
    res.send(imageTemplate);
  });
};
