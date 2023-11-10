import { getDotenv } from "../../utils/dotenv";

import { Sequelize } from "sequelize";

const env = getDotenv();
const { DB_URI } = env;

// Singleton, достаточно для нынешней задачи
export const sequelize = new Sequelize(DB_URI, {
  // logging: console.log, // Убрал ради дополнительной производительности
});
