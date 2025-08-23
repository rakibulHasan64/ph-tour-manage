import AppError from "../../errorHelpers/AppError";
import { IUser,IAuthProvider, Role } from "./user.interface";
import { User } from "./user.module";
import httpStatus from "http-status-codes"
import bcrypt from "bcryptjs";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";




const createUser =async (payload: Partial<IUser>) => {

   const { email,password, ...rest } = payload;
   const isUserExist=await User.findOne({email})
   
   if (isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST,"User Already exist")
      
   }


   const hashedPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))
   



   const authProvider: IAuthProvider={provider:"credentials",providerId: email as string}
   const user = await User.create({
   
      email,
      password: hashedPassword,
      auths: [authProvider],
      ...rest 
    });
   
   return user
   
}




const updatedUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {


   const ifUserExist = await User.findById(userId);

   if (!ifUserExist) {
      throw new AppError(httpStatus.FORBIDDEN, "This user can not be Updeaed")
   }

   
    


   if (payload.role) {
      if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
         throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
      }

      if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
         throw new AppError(httpStatus.FORBIDDEN, "you are not authrized")
         
      }
   }


   if (payload.isActive || payload.isDeleted || payload.isVerified) {

      if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "you are not authorized")
      
      }
      
   } 

   if (payload.password) {
      payload.password=await bcrypt.hash(payload.password, envVars.BCRYPT_SALT_ROUND)
      
   }

   const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })
   
   return newUpdatedUser
}

const getAllUsers = async () => {
   const users = await User.find({});
   const totalUser=await User.countDocuments()

   return {
      data: users,
      mata: {
         total: totalUser
      }
   }
   
}

const getSingelUser = async (userId: string)=>{
   const user = await User.findById(userId).select("-password")
   return {
     data: user
  }
}

const getMeAllUsers = async (userId: string) => {
   const users = await User.findById(userId).select("-password")


   return {
      data: users,

      
   }
   
}

export const UserServies = {
   createUser,
   getMeAllUsers,
   getAllUsers,
   getSingelUser,
   updatedUser
}