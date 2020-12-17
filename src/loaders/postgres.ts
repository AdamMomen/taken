import connection from "../utils/connection";

/**
 * creates typeorm connection to postgres database
 */
export default async () => {
  return await connection.create();
};
