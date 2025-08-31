/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServies } from "./user.service";
import { catchAsync } from "../../utils/catchAsyn";
import { sendResponse } from "../../utils/sendRespons";
import { JwtPayload } from "jsonwebtoken";




const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction)=> {
  const user = await UserServies.createUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User created successfully",
    data: user,


    

  })
});



const UpdeaedUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  
  const userId = req.params.id;
  const verifiedToken = req.user as JwtPayload;
  const paylod = req.body;
  
  const user = await UserServies.updatedUser(userId,paylod,verifiedToken );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Updared successfully",
    data: user,


    

  })
});






// ✅ Corrected getAllUsers function
const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


  const query = req.query;
  const result = await UserServies.getAllUsers(query as Record<string, string>);
    sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "AllUser created successfully",
    data: result.data,
    meta: result.meta  // ✅

    
    

  })
});


const getMeAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  
  const decodedToken=req.user as JwtPayload
  const result = await UserServies.getMeAllUsers(decodedToken.userId);
    sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Yours Profils successfully",
    data: result.data,

    
    

  })
});


const getSingleUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await UserServies.getSingelUser(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Retrieved Successfully",
        data: result.data
    })
})

export const userControllers = {
  createUser,
  getMeAllUsers,
  getAllUsers,
  UpdeaedUser,
  getSingleUser
}







