import fs from "fs";

export default async (buffer: Buffer) => {
  return ("\\x" + buffer.toString("hex")) as any;
};
