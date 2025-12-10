import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthPayload {
    userID: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}

export default function authenticate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new Error("No token provided or invalid format");
    }

    const token = authorization.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
        req.user = payload;
        next();

    } catch (error) {
        throw new Error("Invalid or expired token");
    }
}