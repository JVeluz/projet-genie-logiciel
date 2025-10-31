import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const schema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    createdAt: { type: Date, default: Date.now }
});

schema.pre("save", async function (next) {
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

schema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>("User", schema);