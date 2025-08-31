
import { Booking } from "../booking/booking.model";
import { PAYMENT_STATUS } from "../pymant/pymant.interface";
import { Payment } from "../pymant/pymant.modal";
import { Tour } from "../toure/tour.module";
import { IsActive } from "../user/user.interface";
import { User } from "../user/user.module";


const now = new Date();
const sevenDaysAgo = new Date(now).setDate(now.getDate() - 7);
const thirtyDaysAgo = new Date(now).setDate(now.getDate() - 30);

const getUserStats = async () => {
  const totalUserPromise = User.countDocuments();

  const totalActivePromise = User.countDocuments({ isActive: IsActive.ACTIVE });
  const totalInActivePromise = User.countDocuments({ isActive: IsActive.INACTIVE });
  const totalBlockedPromise = User.countDocuments({ isActive: IsActive.BLOCKED });

  const newUserInLast7DaysPromise = User.countDocuments({
    createdAt: { $gte: sevenDaysAgo },
  });

  const newUserInLast30DaysPromise = User.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  });

  const userByRolePromise = User.aggregate([
    {
      $group: {
        _id: "$role",
        count: { $sum: 1 },
      },
    },
  ]);

  const [
    totalUser,
    totalActive,
    totalInActive,
    totalBlocked,
    newUserInLast7Days,
    newUserInLast30Days,
    userByRole,
  ] = await Promise.all([
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
};


const getTourStats = async () => {
   const totalTourPomies = await Tour.countDocuments()



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


   
   const totalTourTypePromise = Tour.aggregate([
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
            count: {$sum: 1}
         }
      }
         
   ])
   const avgTourCostPromise = Tour.aggregate([
      {
         $group: {
            _id: null,
            avgCostFrom: {$avg: "$priceFrom"},
         }
      }
   ])

   const totalTourDivisionPromise = Tour.aggregate([

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
            count: {$sum: 1}
         }
      }
      
   ])
   

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

    
    const totalHighestPricePromise = Booking.aggregate([
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
    ])


   const[totalTour,totalTourType,avgTourCost,totalTourDivision,totalHighestPrice]=await Promise.all([totalTourPomies,totalTourTypePromise,avgTourCostPromise,totalTourDivisionPromise,totalHighestPricePromise])

   return {
      totalTour,
      totalTourType,
      avgTourCost,
      totalTourDivision,
      totalHighestPrice
    }
}

const getBookingStats = async () => {
    const totalBookingPromise = Booking.countDocuments()

    const totalBookingByStatusPromise = Booking.aggregate([
        //stage-1 group stage
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ])

    const bookingsPerTourPromise = Booking.aggregate([
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
    ])

    const avgGuestCountPerBookingPromise = Booking.aggregate([
        // stage 1  - group stage
        {
            $group: {
                _id: null,
                avgGuestCount: { $avg: "$guestCount" }
            }
        }
    ])

    const bookingsLast7DaysPromise = Booking.countDocuments({
        createdAt: { $gte: sevenDaysAgo }
    })
    const bookingsLast30DaysPromise = Booking.countDocuments({
        createdAt: { $gte: thirtyDaysAgo }
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const totalBookingByUniqueUsersPromise = Booking.distinct("user").then((user: any) => user.length)

    const [totalBooking, totalBookingByStatus, bookingsPerTour, avgGuestCountPerBooking, bookingsLast7Days, bookingsLast30Days, totalBookingByUniqueUsers] = await Promise.all([
        totalBookingPromise,
        totalBookingByStatusPromise,
        bookingsPerTourPromise,
        avgGuestCountPerBookingPromise,
        bookingsLast7DaysPromise,
        bookingsLast30DaysPromise,
        totalBookingByStatusPromise,
        totalBookingByUniqueUsersPromise
    ])

    return { totalBooking, totalBookingByStatus, bookingsPerTour, avgGuestCountPerBooking: avgGuestCountPerBooking[0].avgGuestCount, bookingsLast7Days, bookingsLast30Days, totalBookingByUniqueUsers }
}


const getPaymentStats = async () => {


   const totalPaymantPromise = Payment.countDocuments()
   const totalPaymantByStatusPromise = Payment.aggregate([
      {
         $group: {
            _id: "$status",
            count: {$sum: 1}
         }
      }
   ])

   const avaragePaymantPromise = Payment.aggregate([
      {
         $group: {
            _id: null,
            avgPaymentAmount: {$avg: "$amount"}
         }
      }
   ])

   const pymantGatWayDataPromise = Payment.aggregate([
      {
         $group: {
            _id: { $ifNull: ["$paymentGatewayData.status", "UNKNOWN"] },
            count: {$sum: 1}
         }
         
         
      }
   ])
   const totalPaymantRevenuPromise = Payment.aggregate([
      
      {
         $match: {status: PAYMENT_STATUS.PAID}
           
      },
      {
         $group: {
            
            _id: null,
            totalAmount: {$sum: "$amount"}
         }
      }
   ])


   const [totalPaymant, totalPaymantRevenu,totalPaymantByStatus,avaragePaymant,pymantGatWayData] = await Promise.all([totalPaymantPromise, totalPaymantRevenuPromise,totalPaymantByStatusPromise,avaragePaymantPromise,pymantGatWayDataPromise])
   
   return {
      totalPaymant,
      totalPaymantRevenu,
      totalPaymantByStatus,
      avaragePaymant,
      pymantGatWayData
   }

}




export const StatsService = {
    getBookingStats,
    getPaymentStats,
    getTourStats,
    getUserStats
}