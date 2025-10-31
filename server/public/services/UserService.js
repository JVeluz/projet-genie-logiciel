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
exports.UserService = void 0;
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error("❌ JWT_SECRET is not defined in environment variables");
    process.exit(1);
}
class UserService {
    constructor() {
        this.userRepository = new UserRepository_1.default();
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.Types.ObjectId.isValid(id))
                throw new Error("Invalid user ID format");
            const user = yield this.userRepository.findById(id);
            if (!user)
                throw new Error("User not found");
            return user;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findAll();
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userData.email || !userData.name)
                throw new Error("Email and name are required");
            const existingUser = yield this.userRepository.findByEmail(userData.email);
            if (existingUser)
                throw new Error("Email already in use");
            const newUser = yield this.userRepository.create(userData);
            // On pourrait ici envoyer un email de bienvenue, etc.
            // sendWelcomeEmail(newUser.email, newUser.name);
            return newUser;
        });
    }
    login(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginData;
            if (!email || !password)
                throw new Error("Email and password are required");
            const user = yield this.userRepository.findByEmailWithPassword(email);
            if (!user)
                throw new Error("Invalid email or password");
            const isMatch = yield user.comparePassword(password);
            if (!isMatch)
                throw new Error("Invalid email or password");
            const payload = { userId: user._id, email: user.email };
            const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '1h' });
            return token;
        });
    }
}
exports.UserService = UserService;
