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
exports.Offer = exports.offerSchema = void 0;
const mongoose_1 = require("mongoose");
const User_1 = require("./User");
const Chat_1 = require("./Chat");
exports.offerSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    available: { type: Boolean, default: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    exchange: { type: String },
    location: { type: String },
    pictures: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    sellerID: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    chatIDs: { type: [mongoose_1.Schema.Types.ObjectId], ref: "Chat", default: [] },
});
exports.offerSchema.post("save", function (offer, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield User_1.User.updateOne({ _id: offer.sellerID }, { $push: { offers: offer } });
            next();
        }
        catch (error) {
            throw Error("Error saving offer to user offers");
        }
    });
});
exports.offerSchema.post("findOneAndDelete", function (offer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Chat_1.Chat.deleteMany({ _id: { $in: offer.chatIDs } });
            yield User_1.User.updateOne({ _id: offer.sellerID }, { $pull: { offers: { _id: offer._id } } });
        }
        catch (error) {
            throw Error("Error deleting offer from user offers");
        }
    });
});
exports.Offer = (0, mongoose_1.model)("Offer", exports.offerSchema);
