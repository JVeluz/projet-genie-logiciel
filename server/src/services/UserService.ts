import UserRepository from "../repositories/UserRepository";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";


export class UserService {

    private userRepository: UserRepository = new UserRepository();

    public async getUserById(id: string): Promise<IUser> {
        const user = await this.userRepository.findById(id);
        if (!user)
            throw new Error("User not found");
        return user;
    }

    public async getAllUsers(): Promise<IUser[]> {
        return this.userRepository.findAll();
    }

    public async createUser(userData: IUser): Promise<IUser> {
        if (!userData.email || !userData.name)
            throw new Error("Email and name are required");

        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser)
            throw new Error("Email already in use");

        return this.userRepository.create(userData);
    }

    public async login(loginData: IUser): Promise<string> {
        const { email, password } = loginData;

        if (!email || !password)
            throw new Error("Email and password are required");

        const user = await this.userRepository.findByEmailWithPassword(email);
        if (!user)
            throw new Error("Invalid email or password");

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            throw new Error("Invalid email or password");

        const payload = { userId: user._id, email: user.email };

        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

        return token;
    }
}