

export default class User {

    public id!: string;
    public name!: string;
    public email!: string;
    public rating!: number;

    public bio?: string;
    public offers?: any[];
    public avatar?: string;
    public location?: string;
}
