export default class OfferFetch {

    private static async fetch(route: string, method: string, body?: any): Promise<Response> {
        return await fetch(`${process.env.API_URL}${route}`, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    }

    public static async get(offerId: string): Promise<any> {
        const response = await this.fetch(`/offers/${offerId}`, "GET");
        if (response.ok === false)
            throw new Error("Failed to fetch offer");
        return response.json();
    }

    public static async getAll(): Promise<any> {
        const response = await this.fetch("/offers", "GET");
        if (response.ok === false)
            throw new Error("Failed to fetch offers");
        return response.json();
    }

    public static async create(offerData: any): Promise<any> {
        const response = await this.fetch("/offers", "POST", offerData);
        if (response.ok === false)
            throw new Error("Failed to create offer");
        return response.json();
    }

    public static async update(offerId: string, offerData: any): Promise<any> {
        const response = await this.fetch(`/offers/${offerId}`, "PUT", offerData);
        if (response.ok === false)
            throw new Error("Failed to update offer");
        return response.json();
    }

    public static async delete(offerId: string): Promise<void> {
        const response = await this.fetch(`/offers/${offerId}`, "DELETE");
        if (response.ok === false)
            throw new Error("Failed to delete offer");
    }

    public static async search(terms: string): Promise<any> {
        const response = await this.fetch(`/offers/search/${terms}`, "GET");
        if (response.ok === false)
            throw new Error("Failed to search offers");
        return response.json();
    }
}