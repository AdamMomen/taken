import validator from "validator";
import { CaptureOptions } from "../@types";

interface BodyProp {
  url: string;
  options?: CaptureOptions | Object;
}

export default ({ url, options = {} }: BodyProp): BodyProp => {
  try {
    /** if the url is not provided throw an error **/
    if (!url) {
      throw new Error("Missing URL filed, Please provide a url");
    }

    const valid = validator.isURL(url);
    if (!valid) {
      throw Error(
        "Please provide a valid url, maybe missing http:// or https://?"
      );
    }

    return { url, options };
  } catch (e) {
    throw new Error(e);
  }
};
