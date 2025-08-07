import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status-codes";
import { User } from "../user/user.module";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const credentialsLogin = async (payload: Partial<IUser>) => {

   const {email,password}=payload
   
   const isUserExist=await User.findOne({email})
      
      if (!isUserExist) {
         throw new AppError(httpStatus.BAD_REQUEST,"Email does not exist")
         
   }
   
   const ispasswordMacth = await bcrypt.compare(password as string, isUserExist.password as string)


   if (!ispasswordMacth) {
      throw new AppError(httpStatus.BAD_REQUEST,"Incorrect Password")
         
   }

   const jwtPayload = {
      userIs: isUserExist._id,
      email: isUserExist.email,
      role: isUserExist.role
   }

   const accessToken = jwt.sign(jwtPayload, "secret", {
      expiresIn: "1d"
   })

   return {
      accessToken
   }
   

   
}

export const AuthService = {
   credentialsLogin
}