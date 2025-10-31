export default class Offer {

    public id!: string;
    public title!: string;
    public description!: string;
    public price!: number;
    public available!: boolean;
    public sellerID!: string;
    public category!: string;

    public askExchange?: string;
    public location?: string;
    public pictures?: string[];
    public comments?: string[];
}
