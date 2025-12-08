import IOffer from "shared/src/interfaces/IOffer";

export default class OfferMapper {

    public static toDomain(raw: any): IOffer {
        return {
            ...raw,
            createdAt: new Date(raw.createdAt)
        };
    }
}