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

    // 1. Test du flux de Réservation (Succès)
    private async reserveSuccess() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);

            // On crée une offre DISPONIBLE appartenant au vendeur "vendeur_1"
            const offer = await mockRepo.create({
                title: "Objet",
                status: OfferStatus.AVAILABLE,
                sellerID: { _id: "vendeur_1" } // Simulation de l'objet peuplé
            } as any);

            // Action : Le vendeur réserve l'offre pour "acheteur_X"
            await service.reserve(offer._id, "vendeur_1");

            // Vérification
            const updated = await mockRepo.findById(offer._id);
            assert.strictEqual(updated.status, OfferStatus.PENDING, "Le statut doit être PENDING");
            assert.strictEqual(updated.reservedTo, "acheteur_X", "L'offre doit être réservée à acheteur_X");

            console.log("✅ Reserve Success: OK");
        } catch (e) { console.error("❌ Reserve Success: ECHEC", e); }
    }

    // 2. Test Réservation Interdite (Mauvais utilisateur)
    private async reserveUnauthorized() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);
            const offer = await mockRepo.create({
                status: OfferStatus.AVAILABLE,
                sellerID: { _id: "vrai_vendeur" }
            } as any);

            // Action : Un imposteur essaie de réserver
            await service.reserve(offer._id, "imposteur");
            throw new Error("Aurait dû échouer");
        } catch (error: any) {
            if (error.message === "Unauthorized") console.log("✅ Reserve Unauthorized: OK");
            else console.error("❌ Reserve Unauthorized: ECHEC", error);
        }
    }

    // 3. Test du flux de Confirmation (Succès)
    private async confirmSuccess() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);

            // On crée une offre EN ATTENTE, réservée à "acheteur_X"
            const offer = await mockRepo.create({
                status: OfferStatus.PENDING,
                reservedTo: "acheteur_X",
                sellerID: { _id: "vendeur_1" }
            } as any);

            // Action : "acheteur_X" confirme la réception
            await service.confirm(offer._id, "acheteur_X");

            // Vérification
            const updated = await mockRepo.findById(offer._id);
            assert.strictEqual(updated.status, OfferStatus.EXCHANGED, "Le statut doit être EXCHANGED");

            console.log("✅ Confirm Success: OK");
        } catch (e) { console.error("❌ Confirm Success: ECHEC", e); }
    }

    // 4. Test Confirmation par le mauvais acheteur
    private async confirmWrongBuyer() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);
            const offer = await mockRepo.create({
                status: OfferStatus.PENDING,
                reservedTo: "acheteur_X", // Réservé à X
                sellerID: { _id: "v" }
            } as any);

            // Action : "acheteur_Y" essaie de confirmer (Vol de transaction)
            await service.confirm(offer._id, "acheteur_Y");
            throw new Error("Aurait dû échouer");
        } catch (error: any) {
            if (error.message.includes("reserved to someone else")) console.log("✅ Confirm Wrong Buyer: OK");
            else console.error("❌ Confirm Wrong Buyer: ECHEC", error);
        }
    }

    // 5. Test Annulation (Retour à Available)
    private async cancelSuccess() {
        try {
            const mockRepo = new MockOfferRepository();
            const service = new OfferService(mockRepo as any);

            // Offre en cours de transaction
            const offer = await mockRepo.create({
                status: OfferStatus.PENDING,
                reservedTo: "acheteur_X",
                sellerID: { _id: "vendeur_1" }
            } as any);

            // Action : Le vendeur annule tout
            await service.cancel(offer._id, "vendeur_1");

            // Vérification
            const updated = await mockRepo.findById(offer._id);
            assert.strictEqual(updated.status, OfferStatus.AVAILABLE, "Doit redevenir AVAILABLE");
            assert.strictEqual(updated.reservedTo, null, "ReservedTo doit être nettoyé");

            console.log("✅ Cancel Success: OK");
        } catch (e) { console.error("❌ Cancel Success: ECHEC", e); }
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
        await this.reserveSuccess();
        await this.reserveUnauthorized();
        await this.confirmSuccess();
        await this.confirmWrongBuyer();
        await this.cancelSuccess();
    }
}