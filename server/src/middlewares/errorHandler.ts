import { Request, Response, NextFunction } from "express";

export default function errorHandler(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) {
    console.error("💥 ERRROR :", error.message);
    return response.status(500).json({
        message: error.message
    });
}