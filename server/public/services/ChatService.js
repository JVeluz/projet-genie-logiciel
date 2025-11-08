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
const ChatRepository_1 = __importDefault(require("../repositories/ChatRepository"));
class ChatService {
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield ChatRepository_1.default.get(id);
            if (chat === null)
                throw new Error("Chat not found");
            return chat;
        });
    }
    static getByOfferAndBuyer(offerID, buyerID) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield ChatRepository_1.default.getByOfferAndBuyer(offerID, buyerID);
            if (chat === null)
                throw new Error("Chat not found");
            return chat;
        });
    }
    static getOrCreate(offerID, buyerID) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield ChatRepository_1.default.getByOfferAndBuyer(offerID, buyerID);
            if (chat !== null)
                return chat;
            const newChat = yield ChatRepository_1.default.create(offerID, buyerID);
            return newChat;
        });
    }
    static getMessages(chatID) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield ChatRepository_1.default.getMessages(chatID);
            if (chat === null)
                throw new Error("Chat not found");
            return chat;
        });
    }
    static sendMessage(chatID, senderID, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield ChatRepository_1.default.get(chatID);
            if (chat === null)
                throw new Error("Chat not found");
            yield ChatRepository_1.default.sendMessage(chatID, senderID, content);
        });
    }
}
exports.default = ChatService;
