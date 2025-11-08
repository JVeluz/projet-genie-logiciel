import express, { Express } from "express";
import router from "./router";
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";

const application: Express = express();

application.use(cors());
application.use(express.json());
application.use("/", router);
application.use(errorHandler);

export default application;