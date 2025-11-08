"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const cors_1 = __importDefault(require("cors"));
const application = (0, express_1.default)();
application.use((0, cors_1.default)());
application.use(express_1.default.json());
application.use("/", router_1.default);
application.use(errorHandler_1.default);
exports.default = application;
