export default class Offer {

    public _id!: string;
    public title!: string;
    public description!: string;
    public price!: number;
    public available!: boolean;
    public category!: string;
    public type!: string;
    public createdAt!: Date;
    public sellerID!: string;
    public chatIDs!: string[];

    public exchange?: string;
    public location?: string;
    public pictures?: string[];
    public comments?: string[];

    public static fromJSON(data: any): Offer {
        const offer = new Offer();
        offer._id = data._id;
        offer.title = data.title;
        offer.description = data.description;
        offer.price = data.price;
        offer.available = data.available;
        offer.category = data.category;
        offer.type = data.type;
        offer.createdAt = new Date(data.createdAt);
        offer.sellerID = data.sellerID;
        offer.chatIDs = data.chatIDs;

        offer.exchange = data.exchange;
        offer.location = data.location;
        offer.pictures = data.pictures;
        offer.comments = data.comments;

        return offer;
    }
}
