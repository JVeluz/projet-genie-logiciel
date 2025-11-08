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
Object.defineProperty(exports, "__esModule", { value: true });
const Chat_1 = require("../models/Chat");
class ChatRepository {
    static get(chatID) {
        return __awaiter(this, void 0, void 0, function* () {
            return Chat_1.Chat.findById(chatID);
        });
    }
    static getByOfferAndBuyer(offerID, buyerID) {
        return __awaiter(this, void 0, void 0, function* () {
            return Chat_1.Chat.findOne({ offerID, buyerID });
        });
    }
    static create(offerID, buyerID) {
        return __awaiter(this, void 0, void 0, function* () {
            return Chat_1.Chat.create({ offerID, buyerID });
        });
    }
    static getMessages(chatID) {
        return __awaiter(this, void 0, void 0, function* () {
            return Chat_1.Chat.findById(chatID).populate("messages");
        });
    }
    static sendMessage(chatID, senderID, content) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Chat_1.Chat.findByIdAndUpdate(chatID, {
                $push: { messages: { senderID, content } }
            });
        });
    }
}
exports.default = ChatRepository;
