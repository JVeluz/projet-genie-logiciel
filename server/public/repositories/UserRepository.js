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
const User_1 = require("../models/User");
class UserRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.User.find().exec();
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.User.findById(id).exec();
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.User.findOne({ email }).exec();
        });
    }
    static findByEmailWithPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.User.findOne({ email }).select('+password').exec();
        });
    }
    static create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new User_1.User(userData);
            return newUser.save();
        });
    }
    static update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.User.findByIdAndUpdate(user._id, user, { new: true }).exec();
        });
    }
}
exports.default = UserRepository;
