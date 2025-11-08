"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = exports.chatSchema = void 0;
const mongoose_1 = require("mongoose");
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
exports.Chat = (0, mongoose_1.model)("Chat", exports.chatSchema);
