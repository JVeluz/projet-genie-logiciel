import { Router } from "express";
import ChatRepository from "../repositories/ChatRepository";
import ChatService from "../services/ChatService";
import ChatController from "../controllers/ChatController";

const router = Router();

const chatRepository = new ChatRepository();
const chatService = new ChatService(chatRepository);
const chatController = new ChatController(chatService);

router.post("/", chatController.getOrCreateWithMessage);
router.get("/:id", chatController.getById);
router.post("/:id", chatController.sendMessage);

export default router;
