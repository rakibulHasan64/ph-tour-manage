/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadBufferToCloudinary } from "../../config/cloudnery.config";
import AppError from "../../errorHelpers/AppError";
import { generatePdf, IInvoiceData } from "../../utils/invoicos";
import { sendEmail } from "../../utils/sendEmail";
import { BOOKING_STATUS } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { ISSLCommerz } from "../sslcomarz/sslcomarz.interfase";
import { SSLService } from "../sslcomarz/sslcomarz.servise";
import { ITour } from "../toure/tour.interface";
import { IUser } from "../user/user.interface";
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



const successPayment = async (query: Record<string, string>) => {

    // Update Booking Status to COnfirm 
    // Update Payment Status to PAID

    const session = await Booking.startSession();
    session.startTransaction()

    try {


        const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, {
            status: PAYMENT_STATUS.PAID,
        }, { new: true, runValidators: true, session: session })

        if (!updatedPayment) {
            throw new AppError(401, "Payment not found")
        }

        const updatedBooking = await Booking
            .findByIdAndUpdate(
                updatedPayment?.booking,
                { status: BOOKING_STATUS.COMPLETE },
                { new: true, runValidators: true, session }
            )
            .populate("tour", "title")
            .populate("user", "name email")

        if (!updatedBooking) {
            throw new AppError(401, "Booking not found")
        }

        const invoiceData: IInvoiceData = {
            bookingDate: updatedBooking.createdAt as Date,
            guestCount: updatedBooking.guestCount,
            totalAmount: updatedPayment.amount,
            tourTitle: (updatedBooking.tour as unknown as ITour).title,
            transactionId: updatedPayment.transactionId,
            userName: (updatedBooking.user as unknown as IUser).name
        }

        const pdfBuffer = await generatePdf(invoiceData)

        const cloudinaryResult = await uploadBufferToCloudinary(pdfBuffer, "invoice")

        if (!cloudinaryResult) {
            throw new AppError(401, "Error uploading pdf")
        }

        await Payment.findByIdAndUpdate(updatedPayment._id, { invoiceUrl: cloudinaryResult.secure_url }, { runValidators: true, session })

        await sendEmail({
            to: (updatedBooking.user as unknown as IUser).email,
            subject: "Your Booking Invoice",
            templateName: "invoice",
            templateData: invoiceData,
            attachments: [
                {
                    filename: "invoice.pdf",
                    content: pdfBuffer.toString("base64"),
                    contentType: "application/pdf"
                }
            ]
        })

        await session.commitTransaction(); //transaction
        session.endSession()
        return { success: true, message: "Payment Completed Successfully" }
    } catch (error) {
        await session.abortTransaction(); // rollback
        session.endSession()
        // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
        throw error
    }
};


// const successPaymant = async (query: Record<string, string> ) => {
//    const session = await Booking.startSession()
//   session.startTransaction()

//   try {
    
    


    

//     const Updatepayment = await Payment.findOneAndUpdate({
   
//       status: PAYMENT_STATUS.PAID
   
//     },{ new: true, runValidators: true, session }, { session })
     
  
//      await Booking.findByIdAndUpdate(
//        Updatepayment?.booking,
//        {status: BOOKING_STATUS.COMPLETE},
//       {  runValidators: true, session }
//     )
//       .populate("user", "name email phone address")
//       .populate("tour", "title costFrom")
//       .populate("payment")
    

//         await session.commitTransaction(); //transaction
//         session.endSession()
//         return {success: true, message: "Pymant Completed SuccessFully"}


//   } catch (error) {
//     await session.abortTransaction()
//     session.endSession()
//     throw error
//   }
   
// };

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



const getInvoiceDownload = async (paymentId: string) => {
    const payment = await Payment.findById(paymentId)
        .select("invoiceUrl")

    if (!payment) {
        throw new AppError(401, "Payment not found")
    }

    if (!payment.invoiceUrl) {
        throw new AppError(401, "No invoice found")
    }

    return payment.invoiceUrl
};






export const PymantService = {
   successPayment,
   failPaymant,
  cancelPyamnt,
  initPymant,
  getInvoiceDownload,
   
}


