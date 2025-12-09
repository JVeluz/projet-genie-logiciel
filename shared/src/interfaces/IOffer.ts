import { OfferStatus } from "../enums/OfferStatus";
import { IChat } from "./IChat";
import { IUser } from "./IUser";

export interface IOffer {
    _id: string;
    title?: string;
    description?: string;
    available?: boolean;
    category?: string;
    type?: string;
    createdAt?: Date;

    exchange?: string;
    location?: string;
    pictures?: string[];

    sellerID: IUser;
    chatIDs: IChat[];

    status: OfferStatus;
    reservedTo: string;
}