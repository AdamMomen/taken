import { createConnection, getConnection } from "typeorm";

const connection = {
  /**
   * creates Connection
   */
  async create() {
    await createConnection();
  },

  /**
   * Closes Connection
   */
  async close() {
    await getConnection().close();
  },

  /**
   * It deletes all the tables from the database
   */
  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};
export default connection;
