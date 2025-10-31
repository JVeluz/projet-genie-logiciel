"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
function errorHandler(error, request, response, next // "next" est requis par la signature, même si non-utilisé
) {
    console.error("💥 ERREUR :", error.message);
    return response.status(500).json({
        message: error.message
    });
}
