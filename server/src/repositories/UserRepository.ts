import IUser from "shared/src/interfaces/IUser";
import { User, IUserDocument } from "../models/User";

export default class UserRepository {

    public async findAll(): Promise<IUserDocument[]> {
        return User.find().exec();
    }

    public async findById(id: string): Promise<IUserDocument | null> {
        return User.findById(id).exec();
    }

    public async findByEmail(email: string): Promise<IUserDocument | null> {
        return User.findOne({ email }).exec();
    }

    public async findByEmailWithPassword(email: string): Promise<IUserDocument | null> {
        return User.findOne({ email }).select('+password').exec();
    }

    public async create(userData: IUser): Promise<IUserDocument> {
        const newUser = new User(userData);
        return newUser.save();
    }

    public async update(id: string, updateData: Partial<IUser>): Promise<IUserDocument | null> {
        return User.findByIdAndUpdate(
            id, updateData, { new: true }
        ).exec();
    }
}