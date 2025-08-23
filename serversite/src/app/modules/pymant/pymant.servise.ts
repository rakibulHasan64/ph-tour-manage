/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errorHelpers/AppError";
import { BOOKING_STATUS } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { ISSLCommerz } from "../sslcomarz/sslcomarz.interfase";
import { SSLService } from "../sslcomarz/sslcomarz.servise";
import { PAYMENT_STATUS } from "./pymant.interface";
import { Payment } from "./pymant.modal";

import httpStatus from "http-status-codes"



const initPymant = async (bookingId: string) => {

  const payment=await Payment.findOne({booking: bookingId})
  
    if (!payment) {
      throw new AppError(httpStatus.NOT_FOUND,"Payment not found you booked tour first")
      
  }

  const booking=await Booking.findById(payment.booking)
  
  const userAddress = (booking?.user as any).address
  const userEmail = (booking?.user as any).email
  const userPhoneNumber = (booking?.user as any).phone

  const userName = (booking?.user as any).name

  const sslPayload: ISSLCommerz = {
    address: userAddress,
    email: userEmail,
    phoneNumber: userPhoneNumber,
    name: userName,
    amount: payment.amount,
    transactionId: payment.transactionId
  }

  const sslPayment = await SSLService.sslPaymantInit(sslPayload)

  return {
    paymentUrl: sslPayment.GatewayPageURL,
  }




}






const successPaymant = async (query: Record<string, string> ) => {
   const session = await Booking.startSession()
  session.startTransaction()

  try {
    
    


    

    const Updatepayment = await Payment.findOneAndUpdate({
   
      status: PAYMENT_STATUS.PAID
   
    },{ new: true, runValidators: true, session }, { session })
     
    
       
     await Booking.findByIdAndUpdate(
       Updatepayment?.booking,
       {status: BOOKING_STATUS.COMPLETE},
      {  runValidators: true, session }
    )
      .populate("user", "name email phone address")
      .populate("tour", "title costFrom")
      .populate("payment")
    

        await session.commitTransaction(); //transaction
        session.endSession()
        return {success: true, message: "Pymant Completed SuccessFully"}


  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
   
};

const failPaymant = async(query: Record<string, string> ) =>{
   const session = await Booking.startSession()
  session.startTransaction()

  try {
    
    


    

    const Updatepayment = await Payment.findOneAndUpdate({
   
      status: PAYMENT_STATUS.FAILED
   
    },{ new: true, runValidators: true, session }, { session })
     
    
       
     await Booking.findByIdAndUpdate(
       Updatepayment?.booking,
       {status: BOOKING_STATUS.FAILED},
      {  runValidators: true, session }
    )
      
    

        await session.commitTransaction(); //transaction
        session.endSession()
        return {success: false, message: "Pymant Failed"}


  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
   
}



const cancelPyamnt = async (query: Record<string, string> ) => {
   const session = await Booking.startSession()
  session.startTransaction()

  try {
    
    


    

    const Updatepayment = await Payment.findOneAndUpdate({
   
      status: PAYMENT_STATUS.CANCELLED
   
    },{ new: true, runValidators: true, session }, { session })
     
    
       
     await Booking.findByIdAndUpdate(
       Updatepayment?.booking,
       {status: BOOKING_STATUS.CANCEL},
      {  runValidators: true, session }
    )
    
    

        await session.commitTransaction(); //transaction
        session.endSession()
        return {success: false, message: "Pymant Cancelled"}


  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
   
}







export const PymantService = {
   successPaymant,
   failPaymant,
  cancelPyamnt,
   initPymant
}