"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatService_1 = __importDefault(require("../services/ChatService"));
class ChatController {
    static getById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const chat = yield ChatService_1.default.getById(id);
            return response.status(200).json(chat);
        });
    }
    static getByOfferAndBuyer(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { offerID, buyerID } = request.body;
            const chat = yield ChatService_1.default.getByOfferAndBuyer(offerID, buyerID);
            return response.status(200).json(chat);
        });
    }
    static getOrCreateWithMessage(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { offerID, buyerID, message } = request.body;
            const chat = yield ChatService_1.default.getOrCreateWithMessage(offerID, buyerID, message);
            return response.status(201).json(chat);
        });
    }
    static getMessages(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { chatID } = request.params;
            const chat = yield ChatService_1.default.getMessages(chatID);
            return response.status(200).json(chat);
        });
    }
    static sendMessage(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const { senderID, content } = request.body;
            yield ChatService_1.default.sendMessage(id, senderID, content);
            return response.status(204).send();
        });
    }
    static deleteMessage(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { messageID } = request.params;
        });
    }
}
exports.default = ChatController;
