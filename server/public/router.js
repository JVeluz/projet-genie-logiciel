"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("./controllers/UserController"));
const router = (0, express_1.Router)();
const userController = new UserController_1.default();
router.get("/users/:id", userController.getUserById);
router.get("/users", userController.getAllUsers);
router.post("/users", userController.createUser);
router.post("/login", userController.login);
exports.default = router;
