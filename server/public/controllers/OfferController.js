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
const OfferService_1 = __importDefault(require("../services/OfferService"));
class OfferController {
    static getAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield OfferService_1.default.getAll();
            return response.status(200).json(result);
        });
    }
    static getById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const result = yield OfferService_1.default.getById(id);
            return response.status(200).json(result);
        });
    }
    static search(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const terms = request.params.terms;
            const result = yield OfferService_1.default.getByTerms(terms);
            return response.status(200).json(result);
        });
    }
    static create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const offer = request.body;
            const result = yield OfferService_1.default.create(offer);
            return response.status(201).json(result);
        });
    }
    static update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const offer = request.body;
            const result = yield OfferService_1.default.update(offer);
            return response.status(200).json(result);
        });
    }
    static delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            yield OfferService_1.default.delete(id);
            return response.status(204).send();
        });
    }
}
exports.default = OfferController;
