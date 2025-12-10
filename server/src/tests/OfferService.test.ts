import assert from "node:assert";
import { IOffer, OfferStatus } from "shared";
import OfferService from "../services/OfferService";

class MockOfferRepository {
    private db: any[] = [];

    async findAll() {
        return [...this.db];
    }

    async findById(id: string) {
        return this.db.find(o => o._id === id) || null;
    }

    async findByTerms(terms: string) {
        const t = terms.toLowerCase();
        return this.db.filter(o => o.title.toLowerCase().includes(t));
    }

    async create(offer: IOffer) {
        // On s'assure que sellerID est bien formaté pour les tests (souvent un objet peuplé ou un string)
        const newOffer = {
            ...offer,
            _id: offer._id || "offer_" + Math.random().toString(36).substring(7)
        };
        this.db.push(newOffer);
        return newOffer;
    }

    async update(data: any) {
        const index = this.db.findIndex(o => o._id === data._id);
        if (index !== -1) {
            // Merge des data. Attention: si reservedTo est null, il faut l'écraser
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

    private async createSuccess() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);
            const offer = { title: "Vélo rouge" } as IOffer;
            const created = await service.create(offer);

            assert.strictEqual(created.title, "Vélo rouge");
            assert.ok(created._id);
            console.log("✅ Create Success: OK");
        } catch (e) { console.error("❌ Create Success: ECHEC", e); }
    }

    private async getByIdSuccess() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);
            await mockRepo.create({ title: "TV", _id: "tv_123" } as any);

            const fetched = await service.getById("tv_123");
            assert.strictEqual(fetched.title, "TV");
            console.log("✅ GetById Success: OK");
        } catch (e) { console.error("❌ GetById Success: ECHEC", e); }
    }

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

    private async updateSuccess() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);
            await mockRepo.create({ title: "Ancien", _id: "upd_1" } as any);

            const updated = await service.update({ _id: "upd_1", title: "Nouveau" });
            assert.strictEqual(updated.title, "Nouveau");
            console.log("✅ Update Success: OK");
        } catch (e) { console.error("❌ Update Success: ECHEC", e); }
    }

    private async updateNotFound() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);
            await service.update({ _id: "ghost", title: "Test" });
            throw new Error("Aurait dû échouer");
        } catch (error: any) {
            if (error.message === "Offer not found") console.log("✅ Update Not Found: OK");
            else console.error("❌ Update Not Found: ECHEC", error);
        }
    }

    private async deleteSuccess() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);
            await mockRepo.create({ _id: "del_1" } as any);
            await service.delete("del_1");
            const found = await mockRepo.findById("del_1");
            assert.strictEqual(found, null);
            console.log("✅ Delete Success: OK");
        } catch (e) { console.error("❌ Delete Success: ECHEC", e); }
    }

    private async searchByTerms() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);
            await mockRepo.create({ title: "iPhone 12" } as any);
            await mockRepo.create({ title: "Samsung S20" } as any);
            const results = await service.getByTerms("iPhone");
            assert.strictEqual(results.length, 1);
            console.log("✅ Search By Terms: OK");
        } catch (e) { console.error("❌ Search By Terms: ECHEC", e); }
    }

    // 1. Test Réservation (Succès)
    // Note: Le service prend "offerID" et "candidateBuyerID".
    private async reserveSuccess() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);

            const offer = await mockRepo.create({
                title: "Objet",
                status: OfferStatus.AVAILABLE,
                sellerID: { _id: "vendeur_1" }
            } as any);

            // Action : On réserve pour l'acheteur "acheteur_X"
            await service.reserve(offer._id, "acheteur_X");

            // Vérif
            const updated = await mockRepo.findById(offer._id);
            assert.strictEqual(updated.status, OfferStatus.PENDING);
            assert.strictEqual(updated.reservedTo, "acheteur_X");

            console.log("✅ Reserve Success: OK");
        } catch (e) { console.error("❌ Reserve Success: ECHEC", e); }
    }

    // 2. Test Réservation Impossible (Déjà réservé)
    private async reserveUnavailable() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);
            const offer = await mockRepo.create({
                status: OfferStatus.PENDING, // Déjà pending
                reservedTo: "quelqu_un",
                sellerID: { _id: "v1" }
            } as any);

            await service.reserve(offer._id, "autre_acheteur");
            throw new Error("Aurait dû échouer");
        } catch (error: any) {
            // Le message attendu dans ton service :
            if (error.message.includes("is not available")) console.log("✅ Reserve Unavailable: OK");
            else console.error("❌ Reserve Unavailable: ECHEC", error);
        }
    }

    // 3. Test Confirmation (Succès - Par le Vendeur)
    private async confirmSuccess() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);

            const offer = await mockRepo.create({
                status: OfferStatus.PENDING,
                reservedTo: "acheteur_X",
                sellerID: { _id: "vendeur_1" } // Important: structure objet pour _id
            } as any);

            // Action : Le vendeur confirme
            await service.confirm(offer._id, "vendeur_1");

            const updated = await mockRepo.findById(offer._id);
            assert.strictEqual(updated.status, OfferStatus.EXCHANGED);
            console.log("✅ Confirm Success: OK");
        } catch (e) { console.error("❌ Confirm Success: ECHEC", e); }
    }

    // 4. Test Confirmation Interdite (Tentative par l'acheteur)
    private async confirmUnauthorized() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);
            const offer = await mockRepo.create({
                status: OfferStatus.PENDING,
                reservedTo: "acheteur_X",
                sellerID: { _id: "vendeur_1" }
            } as any);

            // Action : L'acheteur essaie de valider (Interdit)
            await service.confirm(offer._id, "acheteur_X");
            throw new Error("Aurait dû échouer");
        } catch (error: any) {
            if (error.message.includes("Only the seller can confirm")) console.log("✅ Confirm Unauthorized (Buyer tried): OK");
            else console.error("❌ Confirm Unauthorized: ECHEC", error);
        }
    }

    // 5. Test Annulation (Succès - Par le Vendeur)
    private async cancelBySellerSuccess() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);

            const offer = await mockRepo.create({
                status: OfferStatus.PENDING,
                reservedTo: "acheteur_X",
                sellerID: { _id: "vendeur_1" }
            } as any);

            await service.cancel(offer._id, "vendeur_1");

            const updated = await mockRepo.findById(offer._id);
            assert.strictEqual(updated.status, OfferStatus.AVAILABLE);
            assert.strictEqual(updated.reservedTo, null);

            console.log("✅ Cancel By Seller: OK");
        } catch (e) { console.error("❌ Cancel By Seller: ECHEC", e); }
    }

    // 6. Test Annulation (Succès - Par l'Acheteur)
    private async cancelByBuyerSuccess() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);

            const offer = await mockRepo.create({
                status: OfferStatus.PENDING,
                reservedTo: "acheteur_X",
                sellerID: { _id: "vendeur_1" }
            } as any);

            // Action : L'acheteur annule sa réservation
            await service.cancel(offer._id, "acheteur_X");

            const updated = await mockRepo.findById(offer._id);
            assert.strictEqual(updated.status, OfferStatus.AVAILABLE);
            assert.strictEqual(updated.reservedTo, null);

            console.log("✅ Cancel By Buyer: OK");
        } catch (e) { console.error("❌ Cancel By Buyer: ECHEC", e); }
    }

    // 7. Test Annulation Interdite (Tiers)
    private async cancelUnauthorized() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);

            const offer = await mockRepo.create({
                status: OfferStatus.PENDING,
                reservedTo: "acheteur_X",
                sellerID: { _id: "vendeur_1" }
            } as any);

            // Un inconnu essaie d'annuler
            await service.cancel(offer._id, "hacker");
            throw new Error("Aurait dû échouer");
        } catch (error: any) {
            if (error.message.includes("Unauthorized to cancel")) console.log("✅ Cancel Unauthorized: OK");
            else console.error("❌ Cancel Unauthorized: ECHEC", error);
        }
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

        // Flux métier
        await this.reserveSuccess();
        await this.reserveUnavailable();
        await this.confirmSuccess();
        await this.confirmUnauthorized();
        await this.cancelBySellerSuccess();
        await this.cancelByBuyerSuccess();
        await this.cancelUnauthorized();
    }
}