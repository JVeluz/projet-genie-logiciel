import Application from "./models/Application"; // To remove

export default class ServerAPI {

    private static pendingRequests = new Map<string, Promise<any>>();

    private static request(route: string, method: string, body?: BodyInit): Promise<any> {
        const key: string = `${method}::${route}::${JSON.stringify(body)}`;
        if (this.pendingRequests.has(key)) {
            return this.pendingRequests.get(key)!;
        }
        const fetchPromise = this.fetch(route, method, body);
        const promiseToReturn = fetchPromise.finally(() => {
            this.pendingRequests.delete(key);
        });
        this.pendingRequests.set(key, promiseToReturn);
        return promiseToReturn;
    }

    private static async fetch(route: string, method: string, body?: BodyInit): Promise<any> {
        const token: string | null = Application.getInstance().token.get();
        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        let response: Response;
        try {
            response = await fetch(`${process.env.API_URL}${route}`, {
                method, headers, body
            });
        } catch (networkError) {
            console.error("Fetch network error:", networkError);
            throw new Error("Network error: Failed to connect to API.");
        }

        if (response.ok === false) {
            const errorBody = await response.text();
            console.error(`API Error: ${response.status} ${response.statusText}`, errorBody);
            throw new Error(`API request failed with status ${response.status}`);
        }

        // (204 No Content)
        if (response.status === 204) {
            return null;
        }

        return response.json();
    }

    public static get(route: string): Promise<any> {
        return this.request(route, "GET");
    }

    public static post(route: string, body: BodyInit): Promise<any> {
        return this.request(route, "POST", body);
    }

    public static put(route: string, body: BodyInit): Promise<any> {
        return this.request(route, "PUT", body);
    }

    public static delete(route: string): Promise<any> {
        return this.request(route, "DELETE");
    }
}