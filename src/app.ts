import express from "express";
import appSetup from "./startup/init";
import routerSetup from "./startup/router";
import securitySetup from "./startup/security";

const app = express();

appSetup(app);
securitySetup(app, express);
routerSetup(app);
