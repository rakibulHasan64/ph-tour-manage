import { Request,Response } from "express";
import { catchAsync } from "../../utils/catchAsyn";
import { PymantService } from "./pymant.servise";
import { envVars } from "../../config/env";
import { sendResponse } from "../../utils/sendRespons";


const initPyment = catchAsync(async (req: Request, res: Response) => {
   const  bookingId = req.params.bookingId
   const result = await PymantService.initPymant(bookingId as string);

   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Payment initiated successfully",
      data: result,
   });
});



const successPymants = catchAsync(async (req: Request, res: Response) => {
   const query = req.query;
   const result = await PymantService.successPaymant(query as Record<string, string>)
   
   if (result.success) {
        res.redirect(`${envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`)
    }
})



const failPymants = catchAsync(async (req: Request, res: Response) => {
   const query = req.query;
   const result = await PymantService.failPaymant(query as Record<string, string>)
   
   if (!result.success) {
        res.redirect(`${envVars.SSL.SSL_FAIL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`)
    }
})



const cancelPymants = catchAsync(async (req: Request, res: Response) => {
   const query = req.query;
   const result = await PymantService.cancelPyamnt(query as Record<string, string>)
   
   if (!result.success) {
        res.redirect(`${envVars.SSL.SSL_CANCEL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`)
    }
})




export const PymantCallation = {
   successPymants,
   failPymants,
   cancelPymants,
   initPyment
}