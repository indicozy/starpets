import { getDotenv } from "../../utils/dotenv";

import { Sequelize } from "sequelize";

const env = getDotenv();
const { DB_URI } = env;

// TODO: Может переделать
// Singleton, достаточно для нынешней задачи
export const sequelize = new Sequelize(DB_URI, {
  // logging: console.log, // Убрал ради дополнительной производительности
});

export const getSequalizeInstance = () => {
  return sequelize;
};

export const sequalizeAuthenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log("CONNECTION SECURE");
    return true;
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    return false;
  }
};

export const sequalizeClose = async () => {
  // Можно добавить проверщик соединения при отправлении запросов
  try {
    await sequelize.close();
    console.log("CONNECTION SECURE");
    return true;
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    return false;
  }
};
