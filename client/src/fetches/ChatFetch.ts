export default class ChatFetch {

    private static pendingRequests = new Map<string, Promise<any>>();

    private static async request(route: string, method: string, body?: Object, token?: string): Promise<any> {
        const requestKey = `${method}::${route}::${JSON.stringify(body)}`;

        if (this.pendingRequests.has(requestKey)) {
            return this.pendingRequests.get(requestKey);
        }

        const fetchPromise = (async () => {
            const headers: HeadersInit = { "Content-Type": "application/json" };
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
            try {
                const response: Response = await fetch(`${process.env.API_URL}${route}`,
                    { method, headers, body: JSON.stringify(body) }
                );
                if (response.ok === false) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return await response.json();

            } finally {
                this.pendingRequests.delete(requestKey);
            }
        })();

        this.pendingRequests.set(requestKey, fetchPromise);

        return fetchPromise;
    }

    public static async get(chatID: string, token: string): Promise<any> {
        return this.request(`/chats/${chatID}`, "GET", undefined, token);
    }

    public static async getOrCreate(offerID: string, buyerID: string, token: string): Promise<any> {
        const body = { offerID, buyerID };
        return this.request("/chats", "POST", body, token);
    }

    public static async sendMessage(chatID: string, currentUserID: string, content: string, token: string): Promise<any> {
        const body = { senderID: currentUserID, content };
        return this.request(`/chats/${chatID}`, "POST", body, token);
    }
}