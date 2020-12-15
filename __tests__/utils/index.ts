import fs from "fs";
export const getMockImageData = async () => {
  const base64 = await fs.readFileSync("./__mocks__/example.png", {
    encoding: "base64",
  });
  const buffer = Buffer.from(base64, "base64");

  return ("\\x" + buffer.toString("hex")) as any;
};
