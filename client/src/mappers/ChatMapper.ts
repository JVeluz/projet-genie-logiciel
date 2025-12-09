import { IChat } from "shared";

export default class ChatMapper {

    public static toDomain(raw: any): IChat {
        return {
            ...raw,
            messages: raw.messages.map((m: any) => ChatMapper.toDomainMessage(m))
        };
    }

    private static toDomainMessage(raw: any) {
        return {
            ...raw,
            timestamp: new Date(raw.timestamp),
        };
    }
}