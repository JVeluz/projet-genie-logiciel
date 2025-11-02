import Offer from "./Offer";

export default class User {
    public _id!: string;
    public name!: string;
    public email!: string;
    public rating!: number;
    public createdAt!: Date;

    public bio?: string;
    public offers?: Offer[];
    public avatar?: string;
    public location?: string;
}
