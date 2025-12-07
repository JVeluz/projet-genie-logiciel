import IOffer from "./IOffer";

export default interface IUser {
    _id: string;
    name: string;
    email: string;
    rating: number;
    password: string;
    createdAt: Date;

    bio?: string;
    avatar?: string;
    location?: string;

    offers: IOffer[];
}