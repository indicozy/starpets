import { Express } from "express";
import { getDotenv } from "../utils/dotenv";

const env = getDotenv();

const appSetup = (app: Express) => {
  const { APP_PORT } = env;

  app.listen(APP_PORT, () => {
    console.log(`Server started on port ${APP_PORT}`);
  });
};

export default appSetup;
