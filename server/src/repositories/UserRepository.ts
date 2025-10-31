import { User, IUser } from "../models/User";

export default class UserRepository {

    public async findAll(): Promise<IUser[]> {
        return User.find().exec();
    }

    public async findById(id: string): Promise<IUser | null> {
        return User.findById(id).exec();
    }

    public async findByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email }).exec();
    }

    public async findByEmailWithPassword(email: string): Promise<IUser | null> {
        return User.findOne({ email }).select('+password').exec();
    }

    public async create(userData: IUser): Promise<IUser> {
        const newUser = new User(userData);
        return newUser.save();
    }
}