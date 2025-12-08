import assert from "node:assert";
import ChatService from "../services/ChatService";
import IChat from "shared/src/interfaces/IChat";

class MockChatRepository {
    public db: any[] = [];

    async get(id: string) {
        return this.db.find(c => c._id === id) || null;
    }

    async getByOfferAndBuyer(offerID: string, buyerID: string) {
        return this.db.find(c => c.offerID === offerID && c.buyerID === buyerID) || null;
    }

    // Identique à get pour le mock
    async getMessages(id: string) {
        return this.get(id);
    }

    async create(offerID: string, buyerID: string) {
        const newChat = {
            _id: "chat_" + Math.random().toString(36).substring(7),
            offerID,
            buyerID,
            messages: [] // Important pour tester l'ajout de message
        };
        this.db.push(newChat);
        return newChat;
    }

    async sendMessage(chatID: string, senderID: string, content: string) {
        const chat = this.db.find(c => c._id === chatID);
        if (chat) {
            chat.messages.push({ senderID, content, createdAt: new Date() });
        }
    }
}

export default class ChatServiceTest {

    // 1. Récupération simple
    private async getByIdSuccess() {
        try {
            const mockRepo = new MockChatRepository();
            const service = new ChatService(mockRepo as any);
            mockRepo.db.push({ _id: "chat_1", messages: [] });

            const chat = await service.getById("chat_1");
            assert.strictEqual(chat._id, "chat_1");
            console.log("✅ GetById Success: OK");
        } catch (e) { console.error("❌ GetById Success: ECHEC", e); }
    }

    // 2. Erreur si introuvable
    private async getByIdNotFound() {
        try {
            const mockRepo = new MockChatRepository();
            const service = new ChatService(mockRepo as any);

            await service.getById("unknown");
            throw new Error("Aurait dû échouer");
        } catch (error: any) {
            if (error.message === "Chat not found") console.log("✅ GetById Not Found: OK");
            else console.error("❌ GetById Not Found: ECHEC", error);
        }
    }

    // 3. Envoi de message sur chat existant
    private async sendMessageSuccess() {
        try {
            const mockRepo = new MockChatRepository();
            const service = new ChatService(mockRepo as any);
            // On prépare un chat vide
            mockRepo.db.push({ _id: "chat_1", messages: [] });

            await service.sendMessage("chat_1", "user_A", "Hello");

            // Vérification dans la "DB" que le message a été ajouté
            const chat = mockRepo.db[0];
            assert.strictEqual(chat.messages.length, 1);
            assert.strictEqual(chat.messages[0].content, "Hello");
            console.log("✅ SendMessage Success: OK");
        } catch (e) { console.error("❌ SendMessage Success: ECHEC", e); }
    }

    // 4. GetOrCreate: Cas CRÉATION (Le chat n'existe pas)
    private async getOrCreate_CreatesNew() {
        try {
            const mockRepo = new MockChatRepository();
            const service = new ChatService(mockRepo as any);

            // Mock vide -> doit créer
            const chat = await service.getOrCreateWithMessage("offer_1", "buyer_1", "I want this");

            assert.ok(chat._id, "Doit avoir un ID");
            assert.strictEqual(chat.messages.length, 1, "Doit avoir ajouté le message après création");
            assert.strictEqual(chat.messages[0].content, "I want this");

            // Vérif qu'il est bien dans la DB
            assert.strictEqual(mockRepo.db.length, 1);
            console.log("✅ GetOrCreate (New): OK");
        } catch (e) { console.error("❌ GetOrCreate (New): ECHEC", e); }
    }

    // 5. GetOrCreate: Cas EXISTANT (Le chat existe déjà)
    private async getOrCreate_UsesExisting() {
        try {
            const mockRepo = new MockChatRepository();
            const service = new ChatService(mockRepo as any);

            // On prépare un chat existant avec déjà 1 message
            const existingChat = {
                _id: "chat_existing",
                offerID: "offer_1",
                buyerID: "buyer_1",
                messages: [{ content: "Old msg" }]
            };
            mockRepo.db.push(existingChat);

            // Appel du service
            const chat = await service.getOrCreateWithMessage("offer_1", "buyer_1", "New message");

            assert.strictEqual(chat._id, "chat_existing", "Doit récupérer le même ID");

            // On doit aller le re-chercher dans le mock pour voir si sendMessage a marché 
            // (car ta méthode service retourne l'objet 'chat' trouvé au début, qui n'est pas forcément mis à jour en mémoire locale selon l'implémentation JS, mais le repo l'est)
            const dbChat = mockRepo.db[0];
            assert.strictEqual(dbChat.messages.length, 2, "Doit avoir ajouté le nouveau message");
            assert.strictEqual(dbChat.messages[1].content, "New message");

            console.log("✅ GetOrCreate (Existing): OK");
        } catch (e) { console.error("❌ GetOrCreate (Existing): ECHEC", e); }
    }

    public async runTests() {
        console.log("🔵 Tests de ChatService...");
        await this.getByIdSuccess();
        await this.getByIdNotFound();
        await this.sendMessageSuccess();
        await this.getOrCreate_CreatesNew();
        await this.getOrCreate_UsesExisting();
    }
}