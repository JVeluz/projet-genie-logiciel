import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            serverApi: { version: "1", strict: true, deprecationErrors: true }
        });
        await mongoose.connection.db?.admin().command({ ping: 1 });
        console.log("✅ Successfully connected to MongoDB!");
    } catch (error) {
        console.error("❌ Could not connect to MongoDB", error);
        process.exit(1);
    }
}