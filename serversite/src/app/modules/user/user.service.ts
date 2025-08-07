import AppError from "../../errorHelpers/AppError";
import { IUser,IAuthProvider } from "./user.interface";
import { User } from "./user.module";
import httpStatus from "http-status-codes"
import bcrypt from "bcryptjs";




const createUser =async (payload: Partial<IUser>) => {

   const { email,password, ...rest } = payload;
   const isUserExist=await User.findOne({email})
   
   if (isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST,"User Already exist")
      
   }


   const hashedPassword = await bcrypt.hash(password as string, 10)
   



   const authProvider: IAuthProvider={provider:"credentials",providerId: email as string}
   const user = await User.create({
   
      email,
      password: hashedPassword,
      auths: [authProvider],
      ...rest 
    });
   
   return user
   
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

export const UserServies = {
   createUser,
   getAllUsers
}