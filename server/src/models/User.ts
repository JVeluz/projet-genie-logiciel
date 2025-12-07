import IUser from "shared/src/interfaces/IUser";
import { Document, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { Offer, offerSchema } from "./Offer";

export interface IUserDocument extends IUser {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
    rating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },

    bio: { type: String },
    avatar: { type: String },
    location: { type: String },

    offers: [offerSchema],
});

userSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password") === false)
        return next();

    try {
        // (une chaîne aléatoire pour renforcer le hachage)
        const salt = await bcrypt.genSalt(10); // (force du hachage)
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error: any) {
        return next(error);
    }
});

userSchema.post("findOneAndDelete", async function (user: IUser) {
    try {
        await Offer.deleteMany({ sellerID: user._id });
    } catch (error) {
        throw Error("Error deleting user offers");
    }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUserDocument>("User", userSchema);