export default async (buffer: Buffer) => {
  return ("\\x" + buffer.toString("hex")) as any;
};
