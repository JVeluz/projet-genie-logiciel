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
    static getById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const result = yield UserService_1.UserService.getById(id);
            return response.status(200).json(result);
        });
    }
    static register(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = request.body;
            const result = yield UserService_1.UserService.register(userData);
            return response.status(201).json(result);
        });
    }
    static login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = request.body;
            const result = yield UserService_1.UserService.login(userData);
            return response.status(200).json(result);
        });
    }
    static update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const userData = request.body;
            const result = yield UserService_1.UserService.update(id, userData);
            return response.status(200).json(result);
        });
    }
}
exports.default = UserController;
