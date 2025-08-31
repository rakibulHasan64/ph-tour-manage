"use strict";
/* eslint-disable no-console */
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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const seer_superAdmin_1 = require("./utils/seer.superAdmin");
const redis_confog_1 = require("./config/redis.confog");
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(env_1.envVars.DB_URL);
        console.log("Connected to MongoDB");
        server = app_1.default.listen(env_1.envVars.PORT, () => {
            console.log(`Server is listening on port ${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.log("Failed to connect to MongoDB", error);
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, redis_confog_1.connactReids)();
    yield startServer();
    yield (0, seer_superAdmin_1.seedSuPerAdmin)();
}))();
process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    if (server) {
        server.close(() => {
            console.log("Server closed due to SIGTERM");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    if (server) {
        server.close(() => {
            console.log("Server closed due to unhandled rejection");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    if (server) {
        server.close(() => {
            console.log("Server closed due to uncaught exception");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
// For testing purposes only (comment this out in production)
// throw new Error("I forgot to handle this local error");
