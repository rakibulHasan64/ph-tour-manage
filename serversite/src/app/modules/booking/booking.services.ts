
/* eslint-disable @typescript-eslint/no-explicit-any */

import AppError from "../../errorHelpers/AppError";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import httpStatus from "http-status-codes";
import { Booking } from "./booking.model";
import { Payment } from "../pymant/pymant.modal";
import { PAYMENT_STATUS } from "../pymant/pymant.interface";
import { Tour } from "../toure/tour.module";
import { User } from "../user/user.module";
import { SSLService } from "../sslcomarz/sslcomarz.servise";
import { ISSLCommerz } from "../sslcomarz/sslcomarz.interfase";
import { getTransactionId } from "../../utils/getTransctionId";





const createBooking = async (payload: Partial<IBooking>, userId: string) => {
  const transactionId = getTransactionId()
  const session = await Booking.startSession()
  session.startTransaction()

  try {
  
    const user = await User.findById(userId).session(session)

    if (!user?.phone || !user.address) {
      throw new AppError(httpStatus.BAD_REQUEST, "Please Update Your Profile to Book a Tour.")
    }

    const tour = await Tour.findById(payload.tour).session(session).select("costFrom")

    if (!tour?.costFrom) {
      throw new AppError(httpStatus.BAD_REQUEST, "No Tour Cost Found!")
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const amount = Number(tour.costFrom) * Number(payload.guestCount!)

    const booking = await Booking.create([{
      user: userId,
      status: BOOKING_STATUS.PENDING,
      ...payload
    }], { session })

    const payment = await Payment.create([{
      booking: booking[0]._id,
       status: PAYMENT_STATUS.UNPAID,
      transactionId: transactionId,
      amount: amount
    }], { session })
     
    
       
    const updatedBooking = await Booking.findByIdAndUpdate(
      booking[0]._id,
      { payment: payment[0]._id },
      { new: true, runValidators: true, session }
    )
      .populate("user", "name email phone address")
      .populate("tour", "title costFrom")
      .populate("payment")
    
      const userAddress = (updatedBooking?.user as any).address
      const userEmail = (updatedBooking?.user as any).email
      const userPhoneNumber = (updatedBooking?.user as any).phone
      const userName = (updatedBooking?.user as any).name

        const sslPayload: ISSLCommerz = {
            address: userAddress,
            email: userEmail,
            phoneNumber: userPhoneNumber,
            name: userName,
            amount: amount,
            transactionId: transactionId
        }

        const sslPayment = await SSLService.sslPaymantInit(sslPayload)

        // eslint-disable-next-line no-console
        console.log(sslPayment);

        await session.commitTransaction(); //transaction
        session.endSession()
        return {
            paymentUrl: sslPayment.GatewayPageURL,
            booking: updatedBooking
        }


  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}


const getUserBookings = async () => {

    return {}
};

const getBookingById = async () => {
    return {}
};

const updateBookingStatus = async (

) => {

    return {}
};

const getAllBookings = async () => {

    return {}
};

export const BookingService = {
    createBooking,
    getUserBookings,
    getBookingById,
    updateBookingStatus,
    getAllBookings,
};