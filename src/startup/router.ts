import { Express } from "express";
import sequalizeUserController from "../controllers/sequalize/user.controller";

const routerSetup = (app: Express) =>
  app.use("/api/users", sequalizeUserController);

export default routerSetup;
