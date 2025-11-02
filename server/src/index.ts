import application from "./application";
import connectDB from "./database";

if (process.env.MONGODB_URI === undefined) {
    console.error("❌ MONGODB_URI is not defined in environment variables");
    process.exit(1);
}

if (process.env.JWT_SECRET === undefined) {
    console.error("❌ JWT_SECRET is not defined in environment variables");
    process.exit(1);
}

const port: number = 3000;

async function start() {
    await connectDB();
    application.listen(port, () => {
        console.log(`🚀 Server listening on port ${port}`);
    });
}

start();