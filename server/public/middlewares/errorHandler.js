"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
function errorHandler(error, request, response, next) {
    console.error("💥 ERRROR :", error.message);
    return response.status(500).json({
        message: error.message
    });
}
