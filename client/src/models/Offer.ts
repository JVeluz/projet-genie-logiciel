export default class Offer {

    public _id!: string;
    public title!: string;
    public description!: string;
    public price!: number;
    public available!: boolean;
    public category!: string;
    public type!: string;
    public sellerID!: string;
    public createdAt!: Date;

    public exchange?: string;
    public location?: string;
    public pictures?: string[];
    public comments?: string[];
}
