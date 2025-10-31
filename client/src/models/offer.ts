export default class Offer {

    public id!: number;
    public title!: string;
    public description!: string;
    public price!: number;
    public available!: boolean;
    public sellerID!: number;
    public category!: string;

    public askExchange?: string;
    public location?: string;
    public pictures?: string[];
    public comments?: string[];
}