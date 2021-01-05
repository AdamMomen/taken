import { Connection, createConnection, getConnection } from "typeorm";

const connection = {
  /**
   * creates Connection
   */
  async create(connectionName: string = "default"): Promise<Connection> {
    return await createConnection(connectionName);
  },

  /**
   * Closes Connection
   */
  async close(connectionName: string = "default"): Promise<void> {
    await getConnection().close();
  },

  /**
   * It deletes all the tables from the database
   */
  async clear(connectionName: string = "default"): Promise<void> {
    const connection = getConnection(connectionName);
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};
export default connection;
