import { Router } from "express";
import UserRepository from "../repositories/UserRepository";
import UserService from "../services/UserService";
import UserController from "../controllers/UserController";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/:id", userController.getById);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/:id", userController.update);

export default router;