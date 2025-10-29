import User from "@models/User"
import UserRepository from "@data/UserRepository"


const LOGIN_WRONG_PASSWORD: any = { success: false, isPasswordCorrect: false }
const LOGIN_USER_NOT_FOUND: any = { success: false, isPasswordCorrect: true }
const REGISTER_EMAIL_TAKEN: any = { success: false, isEmailTaken: true }


export default class UserService {

    private repository: UserRepository = new UserRepository();

    public async get(id: number): Promise<User> {
        return this.repository.get(id);
    }

    public save(user: User): void {
        this.repository.save(user);
    }

    public tryLogin(email: string, password: string): any {
        const user: User | null = this.repository.findByEmail(email);
        if (user === null) {
            return LOGIN_USER_NOT_FOUND;
        }
        if (user.getPassword() !== User.getHashedPassword(password)) {
            return LOGIN_WRONG_PASSWORD;
        }
        return { success: true, isPasswordCorrect: true, user: user };
    }

    public tryRegister(name: string, email: string, password: string): any {
        const existingUser: User | null = this.repository.findByEmail(email);
        if (existingUser) {
            return REGISTER_EMAIL_TAKEN;
        }

        const newUser: User = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.setPassword(password);

        this.repository.save(newUser);
        return { success: true, isEmailTaken: false, user: newUser };
    }
}