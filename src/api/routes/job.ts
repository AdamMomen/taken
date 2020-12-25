import { Request, Response, Router } from "express";
import { findJob } from "../../models/job";
import errorHandler from "../../utils/errorHandler";

const route = Router();
export default (app: Router) => {
  app.use("/job", route);

  route.get("", async (req: Request, res: Response) => {
    const jobId = req.query.id;
    try {
      if (!jobId) throw new Error("couldn't get the job id");
      const id = Number(jobId);
      const job = await findJob({ id });
      res.json({ job });
    } catch (e) {
      errorHandler(e, req, res);
    }
  });
};
