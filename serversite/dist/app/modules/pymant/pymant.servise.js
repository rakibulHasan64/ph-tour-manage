"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.PymantService = void 0;
const cloudnery_config_1 = require("../../config/cloudnery.config");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const invoicos_1 = require("../../utils/invoicos");
const sendEmail_1 = require("../../utils/sendEmail");
const booking_interface_1 = require("../booking/booking.interface");
const booking_model_1 = require("../booking/booking.model");
const sslcomarz_servise_1 = require("../sslcomarz/sslcomarz.servise");
const pymant_interface_1 = require("./pymant.interface");
const pymant_modal_1 = require("./pymant.modal");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const initPymant = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield pymant_modal_1.Payment.findOne({ booking: bookingId });
    if (!payment) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Payment not found you booked tour first");
    }
    const booking = yield booking_model_1.Booking.findById(payment.booking);
    const userAddress = (booking === null || booking === void 0 ? void 0 : booking.user).address;
    const userEmail = (booking === null || booking === void 0 ? void 0 : booking.user).email;
    const userPhoneNumber = (booking === null || booking === void 0 ? void 0 : booking.user).phone;
    const userName = (booking === null || booking === void 0 ? void 0 : booking.user).name;
    const sslPayload = {
        address: userAddress,
        email: userEmail,
        phoneNumber: userPhoneNumber,
        name: userName,
        amount: payment.amount,
        transactionId: payment.transactionId
    };
    const sslPayment = yield sslcomarz_servise_1.SSLService.sslPaymantInit(sslPayload);
    return {
        paymentUrl: sslPayment.GatewayPageURL,
    };
});
const successPayment = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield booking_model_1.Booking.startSession();
    session.startTransaction();
    try {
        const updatedPayment = yield pymant_modal_1.Payment.findOneAndUpdate({ transactionId: query.transactionId }, { status: pymant_interface_1.PAYMENT_STATUS.PAID }, { new: true, runValidators: true, session });
        if (!updatedPayment)
            throw new AppError_1.default(401, "Payment not found");
        const updatedBooking = yield booking_model_1.Booking.findByIdAndUpdate(updatedPayment.booking, { status: booking_interface_1.BOOKING_STATUS.COMPLETE }, { new: true, runValidators: true, session })
            .populate("tour", "title")
            .populate("user", "name email");
        if (!updatedBooking)
            throw new AppError_1.default(401, "Booking not found");
        const pdfBuffer = yield (0, invoicos_1.generatePdf)({
            bookingDate: updatedBooking.createdAt,
            guestCount: updatedBooking.guestCount,
            totalAmount: updatedPayment.amount,
            tourTitle: updatedBooking.tour.title,
            transactionId: updatedPayment.transactionId,
            userName: updatedBooking.user.name
        });
        const cloudinaryResult = yield (0, cloudnery_config_1.uploadBufferToCloudinary)(pdfBuffer, "invoice");
        if (!cloudinaryResult)
            throw new AppError_1.default(401, "Error uploading pdf");
        yield pymant_modal_1.Payment.findByIdAndUpdate(updatedPayment._id, { invoiceUrl: cloudinaryResult.secure_url }, { runValidators: true, session });
        const invoiceData = {
            bookingDate: updatedBooking.createdAt,
            guestCount: updatedBooking.guestCount,
            totalAmount: updatedPayment.amount,
            tourTitle: updatedBooking.tour.title,
            transactionId: updatedPayment.transactionId,
            userName: updatedBooking.user.name,
            invoiceUrl: cloudinaryResult.secure_url
        };
        yield (0, sendEmail_1.sendEmail)({
            to: updatedBooking.user.email,
            subject: "Your Booking Invoice",
            templateName: "invoice",
            templateData: invoiceData,
            attachments: [
                {
                    filename: "invoice.pdf",
                    content: pdfBuffer,
                    contentType: "application/pdf"
                }
            ]
        });
        yield session.commitTransaction();
        session.endSession();
        return { success: true, message: "Payment Completed Successfully" };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
// const successPayment = async (query: Record<string, string>) => {
//     const session = await Booking.startSession();
//     session.startTransaction()
//     try {
//         const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, {
//             status: PAYMENT_STATUS.PAID,
//         }, { new: true, runValidators: true, session: session })
//         if (!updatedPayment) {
//             throw new AppError(401, "Payment not found")
//         }
//         const updatedBooking = await Booking
//             .findByIdAndUpdate(
//                 updatedPayment?.booking,
//                 { status: BOOKING_STATUS.COMPLETE },
//                 { new: true, runValidators: true, session }
//             )
//             .populate("tour","title")
//             .populate("user", "name email")
//         if (!updatedBooking) {
//             throw new AppError(401, "Booking not found")
//         }
//       const invoiceData: IInvoiceData  = {
//             bookingDate: updatedBooking.createdAt as Date,
//             guestCount: updatedBooking.guestCount,
//             totalAmount: updatedPayment.amount,
//             tourTitle: (updatedBooking.tour as unknown as ITour).title,
//             transactionId: updatedPayment.transactionId,
//             userName: (updatedBooking.user as unknown as IUser).name
//         }
//       const pdfBuffer = await generatePdf(invoiceData)
//       console.log("PDF Buffer Size:", pdfBuffer.length);
//       const cloudinaryResult = await uploadBufferToCloudinary(pdfBuffer, "invoice")
//       console.log("clodnary",cloudinaryResult);
//         if (!cloudinaryResult) {
//             throw new AppError(401, "Error uploading pdf")
//         }
//         await Payment.findByIdAndUpdate(updatedPayment._id, { invoiceUrl: cloudinaryResult.secure_url }, { runValidators: true, session })
//         await sendEmail({
//             to: (updatedBooking.user as unknown as IUser).email,
//             subject: "Your Booking Invoice",
//             templateName: "invoice",
//             templateData: invoiceData,
//             attachments: [
//                 {
//                     filename: "invoice.pdf",
//                      content: pdfBuffer,
//                     contentType: "application/pdf"
//                 }
//             ]
//         })
//         await session.commitTransaction(); //transaction
//         session.endSession()
//         return { success: true, message: "Payment Completed Successfully" }
//     } catch (error) {
//         await session.abortTransaction(); // rollback
//         session.endSession()
//         // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
//         throw error
//     }
// };
const failPaymant = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield booking_model_1.Booking.startSession();
    session.startTransaction();
    try {
        const Updatepayment = yield pymant_modal_1.Payment.findOneAndUpdate({
            status: pymant_interface_1.PAYMENT_STATUS.FAILED
        }, { new: true, runValidators: true, session }, { session });
        yield booking_model_1.Booking.findByIdAndUpdate(Updatepayment === null || Updatepayment === void 0 ? void 0 : Updatepayment.booking, { status: booking_interface_1.BOOKING_STATUS.FAILED }, { runValidators: true, session });
        yield session.commitTransaction(); //transaction
        session.endSession();
        return { success: false, message: "Pymant Failed" };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const cancelPyamnt = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield booking_model_1.Booking.startSession();
    session.startTransaction();
    try {
        const Updatepayment = yield pymant_modal_1.Payment.findOneAndUpdate({
            status: pymant_interface_1.PAYMENT_STATUS.CANCELLED
        }, { new: true, runValidators: true, session }, { session });
        yield booking_model_1.Booking.findByIdAndUpdate(Updatepayment === null || Updatepayment === void 0 ? void 0 : Updatepayment.booking, { status: booking_interface_1.BOOKING_STATUS.CANCEL }, { runValidators: true, session });
        yield session.commitTransaction(); //transaction
        session.endSession();
        return { success: false, message: "Pymant Cancelled" };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const getInvoiceDownload = (paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield pymant_modal_1.Payment.findById(paymentId)
        .select("invoiceUrl");
    if (!payment) {
        throw new AppError_1.default(401, "Payment not found");
    }
    if (!payment.invoiceUrl) {
        throw new AppError_1.default(401, "No invoice found");
    }
    return payment.invoiceUrl;
});
exports.PymantService = {
    successPayment,
    failPaymant,
    cancelPyamnt,
    initPymant,
    getInvoiceDownload,
};
