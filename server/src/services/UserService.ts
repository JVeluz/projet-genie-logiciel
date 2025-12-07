import IUser from "shared/src/interfaces/IUser";
import UserRepository from "../repositories/UserRepository";
import jwt from "jsonwebtoken";
import { IUserDocument } from "../models/User";

export default class UserService {

    public constructor(
        private userRepository: UserRepository
    ) { }

    public async getById(id: string): Promise<Partial<IUser>> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return this.sanitizeUser(user);
    }

    public async getAll(): Promise<Partial<IUser>[]> {
        const users = await this.userRepository.findAll();
        return users.map(user => this.sanitizeUser(user));
    }

    public async register(data: Partial<IUser>): Promise<{ user: Partial<IUser>, token: string }> {
        if (!data.email || !data.name) throw new Error("Email and name are required");

        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser)
            throw new Error("Email already in use");

        const user = await this.userRepository.create(data as IUser);

        const token = this.generateToken(user);

        return { user: this.sanitizeUser(user), token };
    }

    public async login(data: Pick<IUser, 'email' | 'password'>): Promise<{ user: Partial<IUser>, token: string }> {
        const { email, password } = data;
        if (!email || !password) throw new Error("Email and password are required");

        const user = await this.userRepository.findByEmailWithPassword(email);

        if (!user || !(await user.comparePassword(password))) {
            throw new Error("Invalid email or password");
        }

        const token = this.generateToken(user);

        return { user: this.sanitizeUser(user), token };
    }

    public async update(id: string, data: Partial<IUser>): Promise<any> {
        const user = await this.userRepository.findById(id);
        if (!user)
            throw new Error("User not found");

        Object.assign(user, data);
        await this.userRepository.update(id, user);

        return this.sanitizeUser(user)
    }

    private generateToken(user: IUserDocument): string {
        return jwt.sign(
            { userId: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' }
        );
    }

    private sanitizeUser(user: IUserDocument): Partial<IUser> {
        const userObj = (user as any).toObject();
        delete userObj.password;
        return userObj;
    }
}