
export default class OfferMapper {

    public static fromJSON(json: string): any {
        const data = JSON.parse(json);
        const offer: any = {};
        Object.assign(offer, data);
        return offer;
    }

    public static toJSON(offer: any): string {
        return JSON.stringify(offer);
    }
}