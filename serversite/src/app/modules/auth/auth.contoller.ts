


import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsyn";
import { sendResponse } from "../../utils/sendRespons";
import { AuthService } from "./auth.service";




 const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction)=> {
  const loginInfo = await AuthService.credentialsLogin(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User login successfully",
    data: loginInfo,

  })
});



export const AuthController = {
   credentialsLogin
}