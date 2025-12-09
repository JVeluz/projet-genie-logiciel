import { IOffer } from "./IOffer";
import { IUser } from "./IUser";

export interface IChat {
    _id: string;
    offerID: IOffer;
    buyerID: IUser;
    sellerID: IUser;
    messages: {
        sender: IUser;
        content: string;
        timestamp: Date;
    }[];
}