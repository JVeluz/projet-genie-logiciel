import express, { Express } from "express";
import router from "./middlewares/router";
import errorHandler from "./middlewares/errorHandler";

const application: Express = express();

application.use(express.json());
application.use("/api", router);
application.use(errorHandler);

export default application;