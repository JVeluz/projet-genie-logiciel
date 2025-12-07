import UserRepository from "../repositories/UserRepository";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

export default class UserService {

    public constructor(
        private userRepository: UserRepository
    ) { }

    public async getById(id: string): Promise<any> {
        const user = await this.userRepository.findById(id);
        if (!user)
            throw new Error("User not found");
        return user;
    }

    public async getAll(): Promise<any> {
        return this.userRepository.findAll();
    }

    public async register(data: IUser): Promise<any> {
        if (!data.email || !data.name)
            throw new Error("Email and name are required");

        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser)
            throw new Error("Email already in use");

        const user = await this.userRepository.create(data);
        const payload = {
            userId: user._id,
            email: user.email
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

        return { user, token };
    }

    public async login(data: IUser): Promise<any> {
        const { email, password } = data;

        if (!email || !password)
            throw new Error("Email and password are required");

        const user = await this.userRepository.findByEmailWithPassword(email);
        if (!user)
            throw new Error("Invalid email or password");

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            throw new Error("Invalid email or password");

        const payload = {
            userId: user._id,
            email: user.email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

        const plainUser = (user as any).toObject ? (user as any).toObject() : (user as any);
        const { password: passwordHash, ...userWithoutPassword } = plainUser;

        return { user: userWithoutPassword, token };
    }

    public async update(id: string, data: Partial<IUser>): Promise<any> {
        const user = await this.userRepository.findById(id);
        if (!user)
            throw new Error("User not found");

        Object.assign(user, data);
        await this.userRepository.update(user);

        const plainUser = (user as any).toObject ? (user as any).toObject() : (user as any);
        const { password: passwordHash, ...userWithoutPassword } = plainUser;

        return userWithoutPassword;
    }
}