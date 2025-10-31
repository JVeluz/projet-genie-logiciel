import Offer from "./Offer";

export default class User {

    public id!: string;
    public name!: string;
    public email!: string;
    public rating!: number;

    public bio?: string;
    public offers?: Offer[];
    public avatar?: string;
    public location?: string;
}