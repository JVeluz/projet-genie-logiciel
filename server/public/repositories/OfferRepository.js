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
const Offer_1 = require("../models/Offer");
class OfferRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return Offer_1.Offer.find().exec();
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Offer_1.Offer.findById(id).exec();
        });
    }
    static findByTerms(terms) {
        return __awaiter(this, void 0, void 0, function* () {
            return Offer_1.Offer.find({
                $or: [
                    { title: { $regex: terms, $options: 'i' } },
                    { description: { $regex: terms, $options: 'i' } }
                ]
            }).exec();
        });
    }
    static create(offerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newOffer = new Offer_1.Offer(offerData);
            return newOffer.save();
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Offer_1.Offer.findByIdAndDelete(id).exec();
        });
    }
    static update(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return Offer_1.Offer.findByIdAndUpdate(id, updateData, { new: true }).exec();
        });
    }
}
exports.default = OfferRepository;
