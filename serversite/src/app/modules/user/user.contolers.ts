/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServies } from "./user.service";
import { catchAsync } from "../../utils/catchAsyn";
import { sendResponse } from "../../utils/sendRespons";




export const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction)=> {
  const user = await UserServies.createUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User created successfully",
    data: user,


    

  })
});




// ✅ Corrected getAllUsers function
export const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await UserServies.getAllUsers();
    sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "AllUser created successfully",
    data: result.data,
    meta: result.mata
    
    

  })
});





export const userControllers = {
  createUser,
  getAllUsers
}
