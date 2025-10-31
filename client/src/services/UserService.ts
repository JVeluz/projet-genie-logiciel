const API_BASE_URL = process.env.API_URL;

export default class UserService {

    public static async login(email: string, password: string): Promise<any> {
        const response: Response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok === false) {
            throw new Error("Login failed");
        }
        const { token, user } = await response.json();
        return { token, user };
    }

    public static async register(name: string, email: string, password: string): Promise<any> {
        const response: Response = await fetch(`${API_BASE_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
        const { token, user, message } = await response.json();
        if (response.ok === false) {
            throw new Error(message);
        }
        return { token, user };
    }
}