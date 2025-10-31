const API_BASE_URL = process.env.API_URL;

export default class OfferService {

    public static async getOfferById(offerId: string): Promise<any> {
        const response = await fetch(`${API_BASE_URL}/offers/${offerId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch offer");
        }
        return response.json();
    }

    public static async getOffers(): Promise<any> {
        const response = await fetch(`${API_BASE_URL}/offers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch offers");
        }
        return response.json();
    }

    public static async createOffer(offerData: any): Promise<any> {
        const response = await fetch(`${API_BASE_URL}/offers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(offerData),
        });
        if (!response.ok) {
            throw new Error("Failed to create offer");
        }
        return response.json();
    }

    public static async updateOffer(offerId: string, offerData: any): Promise<any> {
        const response = await fetch(`${API_BASE_URL}/offers/${offerId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(offerData),
        });
        if (!response.ok) {
            throw new Error("Failed to update offer");
        }
        return response.json();
    }

    public static async deleteOffer(offerId: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/offers/${offerId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete offer");
        }
    }
}