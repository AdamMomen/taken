import "reflect-metadata";
import { Image } from "./entities/Image";
import connection from "../utils/connection";
import { Snapshot } from "./services/capturer";
const main = async () => {
  connection.create();
  const url = "https://github.com/AdamMomen";
  console.log(await Snapshot.capture(url, { type: "png" }));
  console.log("Image saved");
  console.log(await Image.findOne({ url }));
};

main().catch((err) => console.log(err));
