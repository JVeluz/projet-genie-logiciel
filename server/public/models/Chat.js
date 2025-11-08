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
exports.Chat = exports.chatSchema = void 0;
const mongoose_1 = require("mongoose");
const Offer_1 = require("./Offer");
exports.chatSchema = new mongoose_1.Schema({
    offerID: { type: mongoose_1.Schema.Types.ObjectId, ref: "Offer", required: true },
    buyerID: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    sellerID: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    messages: [{
            senderID: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
            content: { type: String, required: true },
            timestamp: { type: Date, default: Date.now }
        }]
});
exports.chatSchema.post("save", function (chat, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Offer_1.Offer.updateOne({ _id: chat.offerID }, { $push: { chatIDs: chat._id } });
            next();
        }
        catch (error) {
            throw Error("Error updating user offers");
        }
    });
});
exports.chatSchema.post("findOneAndDelete", function (chat) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Offer_1.Offer.updateOne({ _id: chat.offerID }, { $pull: { chatIDs: chat._id } });
        }
        catch (error) {
            throw Error("Error updating user offers");
        }
    });
});
exports.Chat = (0, mongoose_1.model)("Chat", exports.chatSchema);
