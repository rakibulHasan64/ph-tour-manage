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
exports.PymantCallation = void 0;
const catchAsyn_1 = require("../../utils/catchAsyn");
const pymant_servise_1 = require("./pymant.servise");
const env_1 = require("../../config/env");
const sendRespons_1 = require("../../utils/sendRespons");
const sslcomarz_servise_1 = require("../sslcomarz/sslcomarz.servise");
const initPyment = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingId = req.params.bookingId;
    const result = yield pymant_servise_1.PymantService.initPymant(bookingId);
    (0, sendRespons_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Payment initiated successfully",
        data: result,
    });
}));
const successPymants = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield pymant_servise_1.PymantService.successPayment(query);
    if (result.success) {
        res.redirect(`${env_1.envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`);
    }
}));
const failPymants = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield pymant_servise_1.PymantService.failPaymant(query);
    if (!result.success) {
        res.redirect(`${env_1.envVars.SSL.SSL_FAIL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`);
    }
}));
const cancelPymants = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield pymant_servise_1.PymantService.cancelPyamnt(query);
    if (!result.success) {
        res.redirect(`${env_1.envVars.SSL.SSL_CANCEL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`);
    }
}));
const getInvoiceDownload = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentId } = req.params;
    const result = yield pymant_servise_1.PymantService.getInvoiceDownload(paymentId);
    (0, sendRespons_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Invoice download URL retrieved successfully",
        data: result,
    });
}));
const validatePayment = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield sslcomarz_servise_1.SSLService.validatePaymant(req.body);
    (0, sendRespons_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Paymant Validated Successfully",
        data: null,
    });
}));
exports.PymantCallation = {
    getInvoiceDownload,
    successPymants,
    failPymants,
    cancelPymants,
    initPyment,
    validatePayment
};
