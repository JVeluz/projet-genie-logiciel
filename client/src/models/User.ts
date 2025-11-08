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

    public static fromJSON(data: any): User {
        const user: User = new User();
        user._id = data._id;
        user.name = data.name;
        user.email = data.email;
        user.rating = data.rating;
        user.createdAt = new Date(data.createdAt);
        return user;
    }

    public getAvatar(): string {
        return this.avatar || `https://placehold.co/120x120/17A2B8/ffffff?text=${this.name[0]}`;
    }
}
