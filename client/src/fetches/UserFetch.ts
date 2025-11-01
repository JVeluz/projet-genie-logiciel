export default class UserFetch {

    private static async fetch(route: string, method: string, body?: any): Promise<Response> {
        return await fetch(`${process.env.API_URL}${route}`, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    }

    public static async get(userID: string): Promise<any> {
        const response: Response = await this.fetch(`/users/${userID}`, "GET");
        if (response.ok === false)
            throw new Error(`Failed to fetch user with ID ${userID}: ${response.statusText}`);
        return response.json();
    }

    public static async login(email: string, password: string): Promise<any> {
        const response: Response = await this.fetch("/login", "POST", { email, password });
        if (response.ok === false)
            throw new Error(`Failed to login user with email ${email}: ${response.statusText}`);
        return response.json();
    }

    public static async register(name: string, email: string, password: string): Promise<any> {
        const response: Response = await this.fetch("/register", "POST", { name, email, password });
        if (response.ok === false)
            throw new Error(`Failed to register user with email ${email}: ${response.statusText}`);
        return response.json();
    }
}