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
exports.OTPService = exports.verifyOTP = void 0;
const crypto_1 = __importDefault(require("crypto"));
const redis_confog_1 = require("../../config/redis.confog");
const sendEmail_1 = require("../../utils/sendEmail");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_module_1 = require("../user/user.module");
const OTP_EXPIRATION = 2 * 60;
const generateOtp = (length = 6) => {
    const min = Math.pow(10, (length - 1));
    const max = Math.pow(10, length);
    return crypto_1.default.randomInt(min, max);
};
const sendOTP = (email, name) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_module_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    if (user.isVerified) {
        throw new AppError_1.default(401, "Your email is already verified");
    }
    const otp = generateOtp();
    const redisKey = `otp:${email}`;
    yield redis_confog_1.redisClient.set(redisKey, otp.toString(), {
        expiration: {
            type: "EX",
            value: OTP_EXPIRATION,
        },
    });
    yield (0, sendEmail_1.sendEmail)({
        to: email,
        subject: "Your OTP Code",
        templateName: "otp",
        templateData: {
            name,
            otp,
        },
    });
});
const verifyOTP = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_module_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    if (user.isVerified) {
        throw new AppError_1.default(401, "You are already verified");
    }
    const redisKey = `otp:${email}`;
    const savedOtp = yield redis_confog_1.redisClient.get(redisKey);
    if (!savedOtp) {
        throw new AppError_1.default(404, "Invalid Otp ");
    }
    if (savedOtp !== otp) {
        throw new AppError_1.default(404, "Invalid Otp ");
    }
    yield Promise.all([
        user_module_1.User.updateOne({ email }, { isVerified: true }, { runValidators: true }),
        redis_confog_1.redisClient.del([redisKey])
    ]);
});
exports.verifyOTP = verifyOTP;
exports.OTPService = {
    sendOTP,
    verifyOTP: exports.verifyOTP
};
