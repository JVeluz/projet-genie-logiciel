export default interface IOffer {
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

    sellerID: string;
    chatIDs: string[];
}