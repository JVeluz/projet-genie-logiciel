export default class UserFetch {

    private static async fetch(route: string, method: string, body?: any): Promise<Response> {
        let response: Response | undefined = undefined;
        try {
            response = await fetch(`${process.env.API_URL}${route}`, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (response.ok === false) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response;
        } catch (error: any) {
            alert(error.message);
            if (response) {
                const responseMessage = await response.text();
                alert(responseMessage);
            }
        }
        throw new Error("Network error");
    }

    public static async get(userID: string): Promise<any> {
        const response: Response = await this.fetch(`/users/${userID}`, "GET");
        return response.json();
    }

    public static async login(email: string, password: string): Promise<any> {
        const response: Response = await this.fetch("/login", "POST", { email, password });
        return response.json();
    }

    public static async register(name: string, email: string, password: string): Promise<any> {
        const response: Response = await this.fetch("/register", "POST", { name, email, password });
        return response.json();
    }
}