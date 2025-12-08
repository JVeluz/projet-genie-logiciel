import assert from "node:assert";
import OfferService from "../services/OfferService";
import IOffer from "shared/src/interfaces/IOffer";

class MockOfferRepository {
    private db: any[] = [];

    async findAll() {
        return [...this.db];
    }

    async findById(id: string) {
        return this.db.find(o => o._id === id) || null;
    }

    async findByTerms(terms: string) {
        // Simulation simple : recherche dans le titre (case insensitive)
        const t = terms.toLowerCase();
        return this.db.filter(o => o.title.toLowerCase().includes(t));
    }

    async create(offer: IOffer) {
        const newOffer = { ...offer, _id: offer._id || "offer_" + Math.random().toString(36).substring(7) };
        this.db.push(newOffer);
        return newOffer;
    }

    async update(data: any) {
        const index = this.db.findIndex(o => o._id === data._id);
        if (index !== -1) {
            this.db[index] = { ...this.db[index], ...data };
            return this.db[index];
        }
        return null;
    }

    async delete(id: string) {
        this.db = this.db.filter(o => o._id !== id);
    }
}

export default class OfferServiceTest {

    // Création simple
    private async createSuccess() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);

            const offer = { title: "Vélo rouge" } as IOffer;
            const created = await service.create(offer);

            assert.strictEqual(created.title, "Vélo rouge");
            assert.ok(created._id, "L'offre doit avoir un ID");
            console.log("✅ Create Success: OK");
        } catch (e) { console.error("❌ Create Success: ECHEC", e); }
    }

    // Récupération par ID
    private async getByIdSuccess() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);
            const created = await mockRepo.create({ title: "TV", _id: "tv_123" } as any);

            const fetched = await service.getById("tv_123");
            assert.strictEqual(fetched.title, "TV");
            console.log("✅ GetById Success: OK");
        } catch (e) { console.error("❌ GetById Success: ECHEC", e); }
    }

    // Erreur ID inconnu
    private async getByIdNotFound() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);

            await service.getById("unknown");
            throw new Error("Aurait dû échouer");
        } catch (error: any) {
            if (error.message === "Offer not found") console.log("✅ GetById Not Found: OK");
            else console.error("❌ GetById Not Found: ECHEC", error);
        }
    }

    // Update existant
    private async updateSuccess() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);
            await mockRepo.create({ title: "Ancien Titre", _id: "upd_1" } as any);

            const updated = await service.update({ _id: "upd_1", title: "Nouveau Titre" });

            assert.strictEqual(updated.title, "Nouveau Titre");
            console.log("✅ Update Success: OK");
        } catch (e) { console.error("❌ Update Success: ECHEC", e); }
    }

    // Update inexistant (Doit throw avant d'appeler le repo.update)
    private async updateNotFound() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);

            await service.update({ _id: "ghost_id", title: "Test" });
            throw new Error("Aurait dû échouer");
        } catch (error: any) {
            if (error.message === "Offer not found") console.log("✅ Update Not Found: OK");
            else console.error("❌ Update Not Found: ECHEC", error);
        }
    }

    // Suppression réussie
    private async deleteSuccess() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);
            await mockRepo.create({ _id: "del_1" } as any);

            await service.delete("del_1");

            // Vérif que c'est bien parti
            const found = await mockRepo.findById("del_1");
            assert.strictEqual(found, null);
            console.log("✅ Delete Success: OK");
        } catch (e) { console.error("❌ Delete Success: ECHEC", e); }
    }

    // Recherche par mots-clés
    private async searchByTerms() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);

            await mockRepo.create({ title: "iPhone 12", description: "Bon état" } as any);
            await mockRepo.create({ title: "Samsung S20", description: "Neuf" } as any);

            const results = await service.getByTerms("iPhone");

            assert.strictEqual(results.length, 1);
            assert.strictEqual(results[0].title, "iPhone 12");
            console.log("✅ Search By Terms: OK");
        } catch (e) { console.error("❌ Search By Terms: ECHEC", e); }
    }

    public async runTests() {
        console.log("🔵 Tests de OfferService...");
        await this.createSuccess();
        await this.getByIdSuccess();
        await this.getByIdNotFound();
        await this.updateSuccess();
        await this.updateNotFound();
        await this.deleteSuccess();
        await this.searchByTerms();
    }
}