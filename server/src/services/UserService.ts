import UserRepository from "../repositories/UserRepository";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";


export class UserService {

    public static async getById(id: string): Promise<any> {
        const user = await UserRepository.findById(id);
        if (!user)
            throw new Error("User not found");
        return user;
    }

    public static async getAll(): Promise<any> {
        return UserRepository.findAll();
    }

    public static async register(data: IUser): Promise<any> {
        if (!data.email || !data.name)
            throw new Error("Email and name are required");

        const existingUser = await UserRepository.findByEmail(data.email);
        if (existingUser)
            throw new Error("Email already in use");

        const user = await UserRepository.create(data);
        const payload = {
            userId: user._id,
            email: user.email
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

        return { user, token };
    }

    public static async login(data: IUser): Promise<any> {
        const { email, password } = data;

        if (!email || !password)
            throw new Error("Email and password are required");

        const user = await UserRepository.findByEmailWithPassword(email);
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

    public static async update(id: string, data: Partial<IUser>): Promise<any> {
        const user = await UserRepository.findById(id);
        if (!user)
            throw new Error("User not found");

        Object.assign(user, data);
        await UserRepository.update(user);

        const plainUser = (user as any).toObject ? (user as any).toObject() : (user as any);
        const { password: passwordHash, ...userWithoutPassword } = plainUser;

        return userWithoutPassword;
    }
}