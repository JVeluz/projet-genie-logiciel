import { IOffer } from "../models/Offer";
import { User, IUser } from "../models/User";

export default class UserRepository {

    public static async findAll(): Promise<IUser[]> {
        return User.find().exec();
    }

    public static async findById(id: string): Promise<IUser | null> {
        return User.findById(id).exec();
    }

    public static async findByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email }).exec();
    }

    public static async findByEmailWithPassword(email: string): Promise<IUser | null> {
        return User.findOne({ email }).select('+password').exec();
    }

    public static async create(userData: IUser): Promise<IUser> {
        const newUser = new User(userData);
        return newUser.save();
    }
}