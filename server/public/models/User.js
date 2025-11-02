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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Offer_1 = require("./Offer");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rating: { type: Number, default: 0 },
    password: { type: String, required: true, select: false },
    createdAt: { type: Date, default: Date.now },
    bio: { type: String },
    avatar: { type: String },
    location: { type: String },
    offers: [Offer_1.Offer.schema],
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified("password") === false)
            return next();
        try {
            // (une chaîne aléatoire pour renforcer le hachage)
            const salt = yield bcryptjs_1.default.genSalt(10); // (force du hachage)
            const hash = yield bcryptjs_1.default.hash(user.password, salt);
            user.password = hash;
            next();
        }
        catch (error) {
            return next(error);
        }
    });
});
userSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcryptjs_1.default.compare(candidatePassword, this.password);
    });
};
exports.User = (0, mongoose_1.model)("User", userSchema);
