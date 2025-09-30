import AppError from "../../errorHelpers/AppError";
import { IUser,IAuthProvider, Role } from "./user.interface";
import { User } from "./user.module";
import httpStatus from "http-status-codes"
import bcrypt from "bcryptjs";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { QueryBuilder } from "../../utils/queryBlider";
import { userSearchableFields } from "./userconact";




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

   if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      if (userId !== decodedToken.userId) {
         throw new AppError(401, "you are not authorized")
      }
      
   }



   const ifUserExist = await User.findById(userId);

   if (!ifUserExist) {
      throw new AppError(httpStatus.FORBIDDEN, "This user can not be Updeaed")
   }

   
    
   
   if (decodedToken.role === Role.ADMIN && ifUserExist.role === Role.SUPER_ADMIN) {
      
      throw new AppError(401, "you are not authorized")
   }

   if (payload.role) {
      if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
         throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
      }

      // if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
      //    throw new AppError(httpStatus.FORBIDDEN, "you are not authrized")
         
      // }
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

const getAllUsers = async (query: Record<string, string>) => {
   const queryBuilder = new QueryBuilder(User.find(), query)
      .filter()
      .search(userSearchableFields)
      .sort()
      .fields()
      .paginate();

   const usersQuery = queryBuilder.build().select(
      "_id name email role phone address auths createdAt updatedAt isDeleted isActive isVerified"
   );

   // data এবং meta একসাথে আনা হচ্ছে
   const [data, meta] = await Promise.all([
      usersQuery,
      queryBuilder.getMeta()
   ]);

   return {
      data,
      meta
   };
};



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