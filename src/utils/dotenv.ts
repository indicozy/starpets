import dotenv from "dotenv";
import { z } from "zod";

// Инициаилизация
dotenv.config();

export const getDotenv = () => {
  if (process.env.APP_PORT === undefined) {
    throw Error("process.env.APP_PORT");
  }
  const envClean = {
    ...process.env,
    APP_PORT: parseInt(process.env.APP_PORT),
  };
  const zDotenv = z.object({
    APP_PORT: z.number(),
    DB_URI: z.string(),
  });
  const parse = zDotenv.safeParse(envClean);
  if (!parse.success) {
    throw Error(parse.error.message);
  }
  return parse.data;
};

export type TDotenv = ReturnType<typeof getDotenv>;
