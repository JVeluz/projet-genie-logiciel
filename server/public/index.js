"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = __importDefault(require("./application"));
const database_1 = __importDefault(require("./database"));
if (process.env.MONGODB_URI === undefined) {
    console.error("❌ MONGODB_URI is not defined in environment variables");
    process.exit(1);
}
if (process.env.JWT_SECRET === undefined) {
    console.error("❌ JWT_SECRET is not defined in environment variables");
    process.exit(1);
}
const port = 3000;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_1.default)();
        application_1.default.listen(port, () => {
            console.log(`🚀 Server listening on port ${port}`);
        });
    });
}
start();
