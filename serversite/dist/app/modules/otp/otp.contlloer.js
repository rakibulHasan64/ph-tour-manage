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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPController = void 0;
const catchAsyn_1 = require("../../utils/catchAsyn");
const otp_services_1 = require("./otp.services");
const sendRespons_1 = require("../../utils/sendRespons");
const sendOTP = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = req.body;
    yield otp_services_1.OTPService.sendOTP(email, name);
    (0, sendRespons_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "OTP sent successfully",
        data: null,
    });
}));
const verifyOTP = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    yield otp_services_1.OTPService.verifyOTP(email, otp);
    (0, sendRespons_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "OTP verified successfully",
        data: null,
    });
}));
exports.OTPController = {
    sendOTP,
    verifyOTP
};
