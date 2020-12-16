import "reflect-metadata";
import connection from "../../utils/connection";

export default async () => {
  return await connection.create();
};
