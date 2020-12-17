/**
 * Converts Base64 string to buffer
 */
export default async (buffer: Buffer) => {
  return ("\\x" + buffer.toString("hex")) as any;
};
