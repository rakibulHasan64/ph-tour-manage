

import { NextFunction, Request, Response,   } from "express";
import AppError from "../errorHelpers/AppError";
import { envVars } from "../config/env";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
;






export const checkAuth = (...authRoles: string[]) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
   
   try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
         throw new AppError(403, "no token Recvid")
      }

      const verifiedToken =verifyToken(accessToken,envVars.JWT_ACCESS_SECRET) as JwtPayload
       

      if (!authRoles.includes(verifiedToken.role)) {
       throw new AppError(403, "You are not permitted to access this route");
     }
     next()

      
      

   } catch (error) {
      next(error)
      
   }


}