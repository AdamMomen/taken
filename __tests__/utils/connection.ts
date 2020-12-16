import { createConnection, getConnection, Entity, BaseEntity } from "typeorm";
const connectionConfig = require("../ormconfig.test.json");

const connection = {
  create(entities: typeof BaseEntity[]) {
    return createConnection({
      name: "default",
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "administrator98",
      database: "test",
      entities,
    });
  },

  close() {
    return getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach((entity) => {
      console.log("entity name", entity.name);
      const repository = connection.getRepository(entity.name);
      repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};
export default connection;
