"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const pymant_interface_1 = require("./pymant.interface");
const paymentSchema = new mongoose_1.Schema({
    booking: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
        unique: true,
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: Object.values(pymant_interface_1.PAYMENT_STATUS),
        default: pymant_interface_1.PAYMENT_STATUS.UNPAID
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentGatewayData: {
        type: mongoose_1.Schema.Types.Mixed
    },
    invoiceUrl: {
        type: String
    }
}, {
    timestamps: true
});
exports.Payment = (0, mongoose_1.model)("Payment", paymentSchema);
