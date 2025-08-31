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
exports.StatsService = void 0;
const booking_model_1 = require("../booking/booking.model");
const pymant_interface_1 = require("../pymant/pymant.interface");
const pymant_modal_1 = require("../pymant/pymant.modal");
const tour_module_1 = require("../toure/tour.module");
const user_interface_1 = require("../user/user.interface");
const user_module_1 = require("../user/user.module");
const now = new Date();
const sevenDaysAgo = new Date(now).setDate(now.getDate() - 7);
const thirtyDaysAgo = new Date(now).setDate(now.getDate() - 30);
const getUserStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalUserPromise = user_module_1.User.countDocuments();
    const totalActivePromise = user_module_1.User.countDocuments({ isActive: user_interface_1.IsActive.ACTIVE });
    const totalInActivePromise = user_module_1.User.countDocuments({ isActive: user_interface_1.IsActive.INACTIVE });
    const totalBlockedPromise = user_module_1.User.countDocuments({ isActive: user_interface_1.IsActive.BLOCKED });
    const newUserInLast7DaysPromise = user_module_1.User.countDocuments({
        createdAt: { $gte: sevenDaysAgo },
    });
    const newUserInLast30DaysPromise = user_module_1.User.countDocuments({
        createdAt: { $gte: thirtyDaysAgo },
    });
    const userByRolePromise = user_module_1.User.aggregate([
        {
            $group: {
                _id: "$role",
                count: { $sum: 1 },
            },
        },
    ]);
    const [totalUser, totalActive, totalInActive, totalBlocked, newUserInLast7Days, newUserInLast30Days, userByRole,] = yield Promise.all([
        totalUserPromise,
        totalActivePromise,
        totalInActivePromise,
        totalBlockedPromise,
        newUserInLast7DaysPromise,
        newUserInLast30DaysPromise,
        userByRolePromise,
    ]);
    return {
        totalUser,
        totalActive,
        totalInActive,
        totalBlocked,
        newUserInLast7Days,
        newUserInLast30Days,
        userByRole,
    };
});
const getTourStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalTourPomies = yield tour_module_1.Tour.countDocuments();
    //   await Tour.updateMany(
    //         {
    //             // Only update where tourType or division is stored as a string
    //             $or: [
    //                 { tourType: { $type: "string" } },
    //                 { division: { $type: "string" } }
    //             ]
    //         },
    //         [
    //             {
    //                 $set: {
    //                     tourType: { $toObjectId: "$tourType" },
    //                     division: { $toObjectId: "$division" }
    //                 }
    //             }
    //         ]
    //     );
    const totalTourTypePromise = tour_module_1.Tour.aggregate([
        {
            $lookup: {
                from: "tourtypes",
                localField: "tourType",
                foreignField: "_id",
                as: "type"
            },
        },
        {
            $unwind: "$type"
        },
        {
            $group: {
                _id: "$type.name",
                count: { $sum: 1 }
            }
        }
    ]);
    const avgTourCostPromise = tour_module_1.Tour.aggregate([
        {
            $group: {
                _id: null,
                avgCostFrom: { $avg: "$priceFrom" },
            }
        }
    ]);
    const totalTourDivisionPromise = tour_module_1.Tour.aggregate([
        {
            $lookup: {
                from: "divisions",
                localField: "division",
                foreignField: "_id",
                as: "division"
            },
        },
        {
            $unwind: "$division"
        },
        {
            $group: {
                _id: "$division.name",
                count: { $sum: 1 }
            }
        }
    ]);
    // const totalHighestPricePromise = Booking.aggregate([
    //    {
    //       $group: {
    //          _id: "$tour",
    //          bookingCount: {$sum: 1}
    //       }
    //    },
    //    {
    //       $sort: {bookingCount: -1}
    //    },
    //    {
    //       $limit: 5
    //    },
    //    {
    //       $lookup: {
    //          from: "tours",
    //          let: {tourId: "$_id"},
    //          pipeline: [
    //             {
    //                $match: {
    //                   $expr: {$eq: ["$_id", "$$tourId"]}
    //                }
    //             }
    //          ],as: "tour"
    //       }
    //    },
    //    { $unwind: "$tour" },
    //    {
    //       $project:{
    //          bookingCount: 1,
    //          "tour.title": 1,
    //          "tour.slug"
    //       }
    //    }
    // ])
    const totalHighestPricePromise = booking_model_1.Booking.aggregate([
        // stage-1 : Group the tour
        {
            $group: {
                _id: "$tour",
                bookingCount: { $sum: 1 }
            }
        },
        //stage-2 : sort the tour
        {
            $sort: { bookingCount: -1 }
        },
        //stage-3 : sort
        {
            $limit: 5
        },
        //stage-4 lookup stage
        {
            $lookup: {
                from: "tours",
                let: { tourId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$_id", "$$tourId"] }
                        }
                    }
                ],
                as: "tour"
            }
        },
        //stage-5 unwind stage
        { $unwind: "$tour" },
        //stage-6 Project stage
        {
            $project: {
                bookingCount: 1,
                "tour.title": 1,
                "tour.slug": 1
            }
        }
    ]);
    const [totalTour, totalTourType, avgTourCost, totalTourDivision, totalHighestPrice] = yield Promise.all([totalTourPomies, totalTourTypePromise, avgTourCostPromise, totalTourDivisionPromise, totalHighestPricePromise]);
    return {
        totalTour,
        totalTourType,
        avgTourCost,
        totalTourDivision,
        totalHighestPrice
    };
});
const getBookingStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalBookingPromise = booking_model_1.Booking.countDocuments();
    const totalBookingByStatusPromise = booking_model_1.Booking.aggregate([
        //stage-1 group stage
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ]);
    const bookingsPerTourPromise = booking_model_1.Booking.aggregate([
        //stage1 group stage
        {
            $group: {
                _id: "$tour",
                bookingCount: { $sum: 1 }
            }
        },
        //stage-2 sort stage
        {
            $sort: { bookingCount: -1 }
        },
        //stage-3 limit stage
        {
            $limit: 10
        },
        //stage-4 lookup stage
        {
            $lookup: {
                from: "tours",
                localField: "_id",
                foreignField: "_id",
                as: "tour"
            }
        },
        // stage5 - unwind stage
        {
            $unwind: "$tour"
        },
        // stage6 project stage
        {
            $project: {
                bookingCount: 1,
                _id: 1,
                "tour.title": 1,
                "tour.slug": 1
            }
        }
    ]);
    const avgGuestCountPerBookingPromise = booking_model_1.Booking.aggregate([
        // stage 1  - group stage
        {
            $group: {
                _id: null,
                avgGuestCount: { $avg: "$guestCount" }
            }
        }
    ]);
    const bookingsLast7DaysPromise = booking_model_1.Booking.countDocuments({
        createdAt: { $gte: sevenDaysAgo }
    });
    const bookingsLast30DaysPromise = booking_model_1.Booking.countDocuments({
        createdAt: { $gte: thirtyDaysAgo }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const totalBookingByUniqueUsersPromise = booking_model_1.Booking.distinct("user").then((user) => user.length);
    const [totalBooking, totalBookingByStatus, bookingsPerTour, avgGuestCountPerBooking, bookingsLast7Days, bookingsLast30Days, totalBookingByUniqueUsers] = yield Promise.all([
        totalBookingPromise,
        totalBookingByStatusPromise,
        bookingsPerTourPromise,
        avgGuestCountPerBookingPromise,
        bookingsLast7DaysPromise,
        bookingsLast30DaysPromise,
        totalBookingByStatusPromise,
        totalBookingByUniqueUsersPromise
    ]);
    return { totalBooking, totalBookingByStatus, bookingsPerTour, avgGuestCountPerBooking: avgGuestCountPerBooking[0].avgGuestCount, bookingsLast7Days, bookingsLast30Days, totalBookingByUniqueUsers };
});
const getPaymentStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalPaymantPromise = pymant_modal_1.Payment.countDocuments();
    const totalPaymantByStatusPromise = pymant_modal_1.Payment.aggregate([
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ]);
    const avaragePaymantPromise = pymant_modal_1.Payment.aggregate([
        {
            $group: {
                _id: null,
                avgPaymentAmount: { $avg: "$amount" }
            }
        }
    ]);
    const pymantGatWayDataPromise = pymant_modal_1.Payment.aggregate([
        {
            $group: {
                _id: { $ifNull: ["$paymentGatewayData.status", "UNKNOWN"] },
                count: { $sum: 1 }
            }
        }
    ]);
    const totalPaymantRevenuPromise = pymant_modal_1.Payment.aggregate([
        {
            $match: { status: pymant_interface_1.PAYMENT_STATUS.PAID }
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amount" }
            }
        }
    ]);
    const [totalPaymant, totalPaymantRevenu, totalPaymantByStatus, avaragePaymant, pymantGatWayData] = yield Promise.all([totalPaymantPromise, totalPaymantRevenuPromise, totalPaymantByStatusPromise, avaragePaymantPromise, pymantGatWayDataPromise]);
    return {
        totalPaymant,
        totalPaymantRevenu,
        totalPaymantByStatus,
        avaragePaymant,
        pymantGatWayData
    };
});
exports.StatsService = {
    getBookingStats,
    getPaymentStats,
    getTourStats,
    getUserStats
};
