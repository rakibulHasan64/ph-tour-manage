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
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const zod_1 = require("zod");
const cloudnery_config_1 = require("../config/cloudnery.config");
// 🔹 Duplicate Error
const handleDuplicateError = (err) => {
    const matchedArry = err.message.match(/["']([^"']+)["']/);
    return {
        statusCode: 400,
        message: `${matchedArry === null || matchedArry === void 0 ? void 0 : matchedArry[1]} already exists`
    };
};
// 🔹 Cast Error
const handleCastError = (err) => {
    return {
        statusCode: 400,
        message: "Invalid MongoDB ObjectId. Please provide a valid id."
    };
};
// 🔹 Mongoose Validation Error
const handleValidationError = (err) => {
    const errorSources = Object.values(err.errors).map((errorObj) => ({
        path: errorObj.path,
        message: errorObj.message
    }));
    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources
    };
};
// 🔹 Zod Error
const handleZodError = (err) => {
    const errorSources = err.issues.map((issue) => ({
        path: issue.path.join("."), // যদি nested হয়
        message: issue.message
    }));
    return {
        statusCode: 400,
        message: "Validation failed",
        errorSources
    };
};
const globalErrorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (env_1.envVars.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log(err);
    }
    if (req.file) {
        yield (0, cloudnery_config_1.deleteImageFromCLoudinary)(req.file.path);
    }
    if (req.files && Array.isArray(req.files) && req.files.length) {
        const imageUrl = req.files.map(File => File.path);
        yield Promise.all(imageUrl.map(url => (0, cloudnery_config_1.deleteImageFromCLoudinary)(url)));
    }
    let statusCode = err.statusCode || 500;
    let message = "Internal Server Error";
    let errorSources = [];
    if (err.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    else if (err instanceof zod_1.ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources || [];
    }
    else if (err.name === "CastError") {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    else if (err.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources || [];
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json(Object.assign(Object.assign({ success: false, message }, (errorSources.length > 0 && { errorSources })), (env_1.envVars.NODE_ENV === "development" && { error: err, stack: err.stack })));
});
exports.globalErrorHandler = globalErrorHandler;
