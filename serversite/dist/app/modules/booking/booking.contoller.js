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
exports.BookingController = void 0;
const catchAsyn_1 = require("../../utils/catchAsyn");
const booking_services_1 = require("./booking.services");
const sendRespons_1 = require("../../utils/sendRespons");
const createBooking = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decodeToken = req.user;
    const booking = yield booking_services_1.BookingService.createBooking(req.body, decodeToken.userId);
    // console.log("what provle", booking);
    (0, sendRespons_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "booking created",
        data: booking,
    });
}));
const getUserBookings = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_services_1.BookingService.getUserBookings();
    (0, sendRespons_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Bookings retrieved successfully",
        data: bookings,
    });
}));
const getSingleBooking = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_services_1.BookingService.getBookingById();
    (0, sendRespons_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Booking retrieved successfully",
        data: booking,
    });
}));
const getAllBookings = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const bookings = yield booking_services_1.BookingService.getAllBookings();
    (0, sendRespons_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Bookings retrieved successfully",
        data: {},
        // meta: {},
    });
}));
const updateBookingStatus = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield booking_services_1.BookingService.updateBookingStatus();
    (0, sendRespons_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Booking Status Updated Successfully",
        data: updated,
    });
}));
exports.BookingController = {
    createBooking,
    getAllBookings,
    getSingleBooking,
    getUserBookings,
    updateBookingStatus,
};
