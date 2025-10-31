"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offer = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    askExchange: { type: String },
    location: { type: String },
    pictures: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    sellerID: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
});
exports.Offer = (0, mongoose_1.model)("Offer", schema);
