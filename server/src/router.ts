import { Router } from "express";
import UserController from "./controllers/UserController";
import OfferController from "./controllers/OfferController";
import ChatController from "./controllers/ChatController";

const router: Router = Router();

router.get("/users/:id", UserController.getById);
router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/offers", OfferController.getAll);
router.get("/offers/search/:terms", OfferController.search);
router.get("/offers/:id", OfferController.getById);
router.post("/offers", OfferController.create);
router.put("/offers/:id", OfferController.update);
router.delete("/offers/:id", OfferController.delete);

router.post("/chats", ChatController.getOrCreate);
router.get("/chats/:id", ChatController.getById);
router.post("/chats/:id", ChatController.sendMessage);

export default router;
