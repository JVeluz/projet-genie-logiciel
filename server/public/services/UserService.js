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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository_1.default.findById(id);
            if (!user)
                throw new Error("User not found");
            return user;
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return UserRepository_1.default.findAll();
        });
    }
    static register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.email || !data.name)
                throw new Error("Email and name are required");
            const existingUser = yield UserRepository_1.default.findByEmail(data.email);
            if (existingUser)
                throw new Error("Email already in use");
            const user = yield UserRepository_1.default.create(data);
            const payload = {
                userId: user._id,
                email: user.email
            };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { user, token };
        });
    }
    static login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            if (!email || !password)
                throw new Error("Email and password are required");
            const user = yield UserRepository_1.default.findByEmailWithPassword(email);
            if (!user)
                throw new Error("Invalid email or password");
            const isMatch = yield user.comparePassword(password);
            if (!isMatch)
                throw new Error("Invalid email or password");
            const payload = {
                userId: user._id,
                email: user.email
            };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            const plainUser = user.toObject ? user.toObject() : user;
            const { password: passwordHash } = plainUser, userWithoutPassword = __rest(plainUser, ["password"]);
            return { user: userWithoutPassword, token };
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository_1.default.findById(id);
            if (!user)
                throw new Error("User not found");
            Object.assign(user, data);
            yield UserRepository_1.default.update(user);
            const plainUser = user.toObject ? user.toObject() : user;
            const { password: passwordHash } = plainUser, userWithoutPassword = __rest(plainUser, ["password"]);
            return userWithoutPassword;
        });
    }
}
exports.UserService = UserService;
