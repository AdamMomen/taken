export default [
  {
    name: "default",
    type: "postgres",
    port: Number(process.env.POSTGRES_PROD_PORT) || 5432,
    host: process.env.POSTGRES_PROD_HOST || "localhost",
    username: "postgres",
    password: process.env.POSTGRES_PROD_PASS || "postgres",
    database: process.env.POSTGRES_PROD_DB || "scraper",
    logging: false,
    synchronize: true,
    entities: ["**/entities/**/*.js"], //TODO:  maybe to include ts files?
    dropSchema: false,
  },
  {
    name: "test",
    type: "postgres",
    port: Number(process.env.POSTGRES_TEST_PORT) || 5432,
    host: process.env.POSTGRES_TEST_HOST || "localhost",
    username: "postgres",
    password: process.env.POSTGRES_TEST_PASS || "postgres",
    dropSchema: false,
    database: process.env.POSTGRES_TEST_DB || "test",
    logging: false,
    synchronize: true,
    entities: ["**/entities/**/*{.ts,.js}"],
  },
];
