export default interface IChat {
    _id: string;
    offerID: string;
    buyerID: string;
    sellerID: string;
    messages: {
        senderID: string;
        content: string;
        timestamp: Date;
    }[];
}