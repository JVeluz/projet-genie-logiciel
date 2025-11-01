"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticate(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new Error("No token provided or invalid format");
    }
    const token = authorization.split(" ")[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (error) {
        throw new Error("Invalid or expired token");
    }
}
