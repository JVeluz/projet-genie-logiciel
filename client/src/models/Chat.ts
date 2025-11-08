export default class Chat {
    _id!: string;
    offerID!: string;
    buyerID!: string;
    messages!: { senderID: string; content: string; timestamp: Date }[];

    private constructor() { }

    public static fromJSON(json: any): Chat {
        const chat = new Chat();
        chat._id = json._id;
        chat.offerID = json.offerID;
        chat.buyerID = json.buyerID;
        chat.messages = json.messages.map((msg: any) => ({
            senderID: msg.senderID,
            content: msg.content,
            timestamp: new Date(msg.timestamp),
        }));
        return chat;
    }
}