import { IUser } from "shared";
import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUserDocument extends IUser, Document {
    _id: string;
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

    offers: [{ type: Schema.Types.ObjectId as any, ref: "Offer", default: [] }],
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        return next(error);
    }
});

userSchema.post("findOneAndDelete", async function (doc) {
    if (!doc) return;
    try {
        // ASTUCE CIRCULAIRE : On appelle le modèle par son nom string
        await model("Offer").deleteMany({ sellerID: doc._id });
    } catch (error) {
        console.error("Error deleting user offers", error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUserDocument>("User", userSchema);