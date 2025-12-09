import { IOffer } from "shared";

export default class OfferMapper {

    public static toDomain(raw: any): IOffer {
        return {
            ...raw,
            createdAt: new Date(raw.createdAt)
        };
    }
}