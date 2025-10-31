import { Router } from "express";
import UserController from "../controllers/UserController";

const router: Router = Router();
const userController = new UserController();

router.get("/users/:id", userController.getUserById);
router.get("/users", userController.getAllUsers);
router.post("/users", userController.createUser);
router.post("/login", userController.login);

export default router;
