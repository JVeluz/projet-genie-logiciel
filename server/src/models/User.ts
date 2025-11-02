import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IOffer, Offer } from "./Offer";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    rating: number;
    password: string;
    createdAt: Date;

    bio?: string;
    avatar?: string;
    location?: string;

    comparePassword(candidatePassword: string): Promise<boolean>;

    offers: IOffer[];
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rating: { type: Number, default: 0 },
    password: { type: String, required: true, select: false },
    createdAt: { type: Date, default: Date.now },

    bio: { type: String },
    avatar: { type: String },
    location: { type: String },

    offers: [Offer.schema],
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

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>("User", userSchema);