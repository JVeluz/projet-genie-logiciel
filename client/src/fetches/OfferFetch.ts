import Application, { Item } from "../models/Application";
import Offer from "../models/Offer";

export default class OfferFetch {

    private static async fetch(route: string, method: string, body?: any): Promise<Response> {
        const token = Application.getInstance().get(Item.AuthToken);
        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (token) { headers.Authorization = `Bearer ${token}`; }
        return await fetch(`${process.env.API_URL}${route}`, {
            method, headers, body: JSON.stringify(body)
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

    public static async create(offer: Offer): Promise<any> {
        const response = await this.fetch("/offers", "POST", offer);
        if (response.ok === false)
            throw new Error("Failed to create offer");
        return response.json();
    }

    public static async update(offer: Offer): Promise<any> {
        const response = await this.fetch(`/offers/${offer._id}`, "PUT", offer);
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