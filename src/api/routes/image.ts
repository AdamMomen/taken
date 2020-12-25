import { Request, Response, Router } from "express";
import websiteQueue from "../../loaders/queue";
import { createJob } from "../../models/job";
import { createImageTemplate } from "../../services";
import errorHandler from "../../utils/errorHandler";
import validateRequest from "../../utils/validateRequest";
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
      const { url, options } = validateRequest(req.body);

      const job = await createJob({ url });

      /** add job to the queue in FIFO  (First In First Out) */
      await websiteQueue().add("website", { id: job.id, url, options });
      /** */
      res.json({
        job: {
          id: job.id,
          status: job.status,
        },
      });
    } catch (e) {
      errorHandler(e, req, res);
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
    try {
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

      /** Throws an errro if we couldn't find the image or there is a problem in the conversion to base64 string */
      if (!imageTemplate) {
        res.status(404).send("image url not found! :(");
      }

      /** send the html image template to the user **/
      res.send(imageTemplate);
    } catch (e) {
      errorHandler(e, req, res);
    }
  });
};
