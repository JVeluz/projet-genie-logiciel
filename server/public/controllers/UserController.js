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
const UserService_1 = require("../services/UserService");
class UserController {
    constructor() {
        this.service = new UserService_1.UserService();
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield this.service.getUserById(id);
            return res.status(200).json(user);
        });
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.service.getAllUsers();
            return res.status(200).json(users);
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const newUser = yield this.service.createUser(userData);
            return res.status(201).json(newUser);
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const token = yield this.service.login(userData);
            return res.status(200).json({ token });
        });
    }
}
exports.default = UserController;
