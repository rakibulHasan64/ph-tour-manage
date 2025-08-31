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
exports.SSLService = exports.sslPaymantInit = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../../config/env");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const pymant_modal_1 = require("../pymant/pymant.modal");
const sslPaymantInit = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            store_id: env_1.envVars.SSL.SSL_STORE_ID,
            store_passwd: env_1.envVars.SSL.SSL_STORE_PSS,
            total_amount: payload.amount,
            currency: "BDT",
            tran_id: payload.transactionId,
            success_url: `${env_1.envVars.SSL.SSL_SUCCESS_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=success`,
            fail_url: `${env_1.envVars.SSL.SSL_FAIL_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=fail`,
            cancel_url: `${env_1.envVars.SSL.SSL_CANCEL_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=cancel`,
            ipn_url: env_1.envVars.SSL.SSL_IPN_URL,
            shipping_method: "N/A",
            product_name: "Tour",
            product_category: "Service",
            product_profile: "general",
            cus_name: payload.name,
            cus_email: payload.email,
            cus_add1: payload.address,
            cus_add2: "N/A",
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "1000",
            cus_country: "Bangladesh",
            cus_phone: payload.phoneNumber,
            cus_fax: "01711111111",
            ship_name: "N/A",
            ship_add1: "N/A",
            ship_add2: "N/A",
            ship_city: "N/A",
            ship_state: "N/A",
            ship_postcode: 1000,
            ship_country: "N/A",
        };
        const respons = yield (0, axios_1.default)({
            method: "POST",
            url: env_1.envVars.SSL.SSL_PAYMANT_API,
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
        return respons.data;
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.log("Payment Error Occured", error);
        if (error instanceof Error) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, error.message);
        }
        else {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "An unknown error occurred");
        }
    }
});
exports.sslPaymantInit = sslPaymantInit;
const validatePaymant = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, axios_1.default)({
            method: "GET",
            url: `${env_1.envVars.SSL.SSL_VALTDATION_API}?val_id=${payload.val_id}&store_id=${env_1.envVars.SSL.SSL_STORE_ID}&store_passwd=${env_1.envVars.SSL.SSL_STORE_PSS}`
        });
        // eslint-disable-next-line no-console
        console.log("sslcomaerz validate api response", response.data);
        yield pymant_modal_1.Payment.updateOne({ transactionId: payload.tran_id }, { paymentGatewayData: (yield response).data }, { runValidators: true });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        if (error instanceof Error) {
            throw new AppError_1.default(401, `Paymant Validtion Error,${error.message}`);
        }
        else {
            throw new AppError_1.default(401, "Paymant Validtion Error, unknown error");
        }
    }
});
exports.SSLService = {
    sslPaymantInit: exports.sslPaymantInit,
    validatePaymant
};
