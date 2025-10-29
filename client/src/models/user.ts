import Offer from "./Offer";

export default class User {

    public id!: number;
    public name!: string;
    public rating!: number;
    private password!: string;

    public bio?: string;
    public email?: string;
    public offers?: Offer[];
    public avatar?: string;
    public location?: string;

    public static getHashedPassword(password: string): string {
        return password + "hashed"
    }

    public setPassword(password: string): void {
        this.password = User.getHashedPassword(password);
    }

    public getPassword(): string {
        return this.password;
    }
}