import IUser from "shared/src/interfaces/IUser";
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