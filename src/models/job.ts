import { Job, Status } from "../entities/Job";
import Logger from "../loaders/logger";

interface JobData {
  status: Status;
  screenshot: string;
}
export const updateJobStatus = async (
  id: number,
  { status, screenshot }: JobData
) => {
  try {
    if (!id) throw new Error("missing job id");
    const foundJob = await Job.findOneOrFail({ id });
    foundJob.status = status;
    foundJob.screenshot = screenshot;
    return await Job.save(foundJob);
  } catch (e) {
    Logger.error(e.message);
    throw new Error(e);
  }
};

export const createJob = async ({ url }: { url: string }) => {
  const newJob = new Job();
  newJob.url = url;
  return await Job.save(newJob);
};

export const findJob = async ({ id }: { id: number }) => {
  try {
    return await Job.findOneOrFail({ id });
  } catch (e) {
    throw new Error(e);
  }
};
