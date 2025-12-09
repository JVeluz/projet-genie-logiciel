import { IUser } from "shared";
import OfferMapper from "./OfferMapper";

export default class UserMapper {

    public static toDomain(raw: any): IUser {
        return {
            ...raw,
            createdAt: new Date(raw.createdAt),
            offers: raw.offers.map((rawOffer: any) => OfferMapper.toDomain(rawOffer))
        };
    }
}