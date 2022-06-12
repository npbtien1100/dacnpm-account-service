import { Sequelize } from "sequelize";

const dbConfig = {
  DB: process.env.DB_NAME,
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PORT: process.env.DB_PORT,
  PASSWORD: process.env.DB_PASSWORD,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    idle: dbConfig.pool.idle,
    acquire: dbConfig.pool.acquire,
  },
});

export default sequelize;
