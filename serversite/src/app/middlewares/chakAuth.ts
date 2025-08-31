

import { NextFunction, Request, Response,   } from "express";
import AppError from "../errorHelpers/AppError";
import { envVars } from "../config/env";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { IsActive } from "../modules/user/user.interface";
import httpStatus from "http-status-codes";
import { User } from "../modules/user/user.module";






export const checkAuth = (...authRoles: string[]) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
   
   try {
      const accessToken = req.headers.authorization?.split(" ")[1];
      if (!accessToken) {
         throw new AppError(403, "no token Recvid")
      }

      const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload
      
      
   const isUserExist=await User.findOne({email: verifiedToken.email})
      
   if (!isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST,"User does not exist")
         
      }
      
         if (!isUserExist.isVerified) {
        throw new AppError(httpStatus.BAD_REQUEST,"User is not verified")
      }
       
   
   if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
      throw new AppError(httpStatus.BAD_REQUEST,`User iS ${isUserExist.isActive}`)
         
   }



   if (isUserExist.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST,"User is deleted")
   }
    
      
   

      if (!authRoles.includes(verifiedToken.role)) {
       throw new AppError(403, "You are not permitted to access this route");
      }
      req.user=verifiedToken
     next()

      
      

   } catch (error) {
      next(error)
      
   }


}