/**
 * @param buffer
 * Conversts Buffer to Base64 string
 */
export default async (buffer: Buffer) => {
  return buffer.toString("base64");
};
