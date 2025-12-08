import assert from "node:assert";
import UserService from "../services/UserService";
import IUser from "shared/src/interfaces/IUser";

class MockUserRepository {
    private db: any[] = [];

    private createFakeDoc(data: any) {
        return {
            ...data,
            _id: data._id || "fake_id_123",
            toObject: () => {
                const { toObject, comparePassword, ...rest } = data;
                return rest;
            },
            comparePassword: async (candidate: string) => {
                return candidate === data.password;
            }
        };
    }

    async findByEmail(email: string) {
        const found = this.db.find(u => u.email === email);
        return found ? this.createFakeDoc(found) : null;
    }

    async findByEmailWithPassword(email: string) {
        return this.findByEmail(email);
    }

    async findById(id: string) {
        const found = this.db.find(u => u._id === id);
        return found ? this.createFakeDoc(found) : null;
    }

    async create(userData: IUser) {
        const dataWithId = { ...userData, _id: userData._id || Math.random().toString(36).substring(7) };
        const newDoc = this.createFakeDoc(dataWithId);
        this.db.push(newDoc);
        return newDoc;
    }

    async update(user: any) { return null; }
}

export default class UserServiceTest {

    // Inscription réussie
    private async registerSuccess() {
        try {
            const mockRepo = new MockUserRepository();
            const service = new UserService(mockRepo as any);
            const result = await service.register({
                name: "Alice", email: "alice@test.com", password: "pass"
            } as any);

            assert.strictEqual(result.user.name, "Alice");
            assert.ok(result.token);
            assert.strictEqual((result.user as any).password, undefined, "Le mot de passe ne doit pas être renvoyé");
            console.log("✅ Register Success: OK");
        } catch (e) { console.error("❌ Register Success: ECHEC", e); }
    }

    // Empêcher les doublons
    private async registerDuplicate() {
        try {
            const mockRepo = new MockUserRepository();
            const service = new UserService(mockRepo as any);
            await mockRepo.create({ name: "Bob", email: "bob@test.com" } as any);

            await service.register({ name: "Bob", email: "bob@test.com", password: "123" } as any);
            throw new Error("Devrait échouer");
        } catch (error: any) {
            if (error.message === "Email already in use") console.log("✅ Register Duplicate: OK");
            else console.error("❌ Register Duplicate: ECHEC", error);
        }
    }

    // Login Réussi
    private async loginSuccess() {
        try {
            const mockRepo = new MockUserRepository();
            const service = new UserService(mockRepo as any);

            await mockRepo.create({ name: "Charlie", email: "charlie@test.com", password: "securePass" } as any);

            const result = await service.login({ email: "charlie@test.com", password: "securePass" });

            assert.ok(result.token, "Token manquant au login");
            assert.strictEqual(result.user.email, "charlie@test.com");
            console.log("✅ Login Success: OK");
        } catch (e) { console.error("❌ Login Success: ECHEC", e); }
    }

    // Login Echec - Mauvais mot de passe
    private async loginWrongPassword() {
        try {
            const mockRepo = new MockUserRepository();
            const service = new UserService(mockRepo as any);
            await mockRepo.create({ name: "Dave", email: "dave@test.com", password: "realPassword" } as any);

            await service.login({ email: "dave@test.com", password: "wrongPassword" });
            throw new Error("Le login aurait dû échouer");
        } catch (error: any) {
            if (error.message === "Invalid email or password") console.log("✅ Login Wrong Password: OK");
            else console.error("❌ Login Wrong Password: ECHEC", error);
        }
    }

    // GetById et Sanitize
    // Vérifie qu'on récupère l'user MAIS PAS le mot de passe
    private async getByIdSanitized() {
        try {
            const mockRepo = new MockUserRepository();
            const service = new UserService(mockRepo as any);

            const created = await mockRepo.create({
                _id: "user_123", name: "Eve", email: "eve@test.com", password: "secret"
            } as any);

            const fetchedUser = await service.getById("user_123");

            assert.strictEqual(fetchedUser.name, "Eve");
            assert.strictEqual((fetchedUser as any).password, undefined, "SECURITÉ: Le mot de passe ne doit JAMAIS être retourné par getById");

            console.log("✅ GetById & Sanitize: OK");
        } catch (e) { console.error("❌ GetById & Sanitize: ECHEC", e); }
    }

    // GetById Inconnu
    private async getByIdNotFound() {
        try {
            const mockRepo = new MockUserRepository();
            const service = new UserService(mockRepo as any);
            await service.getById("unknown_id");
            throw new Error("Aurait dû échouer");
        } catch (error: any) {
            if (error.message === "User not found") console.log("✅ GetById Not Found: OK");
            else console.error("❌ GetById Not Found: ECHEC", error);
        }
    }

    public async runTests() {
        console.log("🔵 Tests de UserService...");
        await this.registerSuccess();
        await this.registerDuplicate();
        await this.loginSuccess();
        await this.loginWrongPassword();
        await this.getByIdSanitized();
        await this.getByIdNotFound();
    }
}