import { Router } from "express";
import UserController from "./controllers/UserController";
import OfferController from "./controllers/OfferController";
import ChatController from "./controllers/ChatController";

const router: Router = Router();

router.get("/users/:id", UserController.getById);
router.post("/users/register", UserController.register);
router.post("/users/login", UserController.login);
router.put("/users/:id", UserController.update);

router.get("/offers", OfferController.getAll);
router.get("/offers/search/:terms", OfferController.search);
router.get("/offers/:id", OfferController.getById);
router.post("/offers", OfferController.create);
router.put("/offers/:id", OfferController.update);
router.delete("/offers/:id", OfferController.delete);

router.post("/chats", ChatController.getOrCreateWithMessage);
router.get("/chats/:id", ChatController.getById);
router.post("/chats/:id", ChatController.sendMessage);

export default router;
