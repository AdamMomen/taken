export default async (buffer: Buffer, options: BlobPropertyBag) => {
  return buffer.toString("base64");
};
