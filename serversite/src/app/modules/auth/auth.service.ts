/* eslint-disable @typescript-eslint/no-unused-vars */

import AppError from "../../errorHelpers/AppError";
import {  IAuthProvider, IsActive, IUser } from "../user/user.interface";
import httpStatus from "http-status-codes";
import { User } from "../user/user.module";
import  Jwt  from "jsonwebtoken";
import { createNewAccessTokenWithRefresToken, creatUserTokens } from "../../utils/userTokens";
import bcryptjs from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { sendEmail } from "../../utils/sendEmail";



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

   // const jwtPayload = {
   //    userId: isUserExist._id,
   //    email: isUserExist.email,
   //    role: isUserExist.role
   // }

   // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

   // const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)
   
    const userTokens=creatUserTokens(isUserExist)
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const {password: pass, ...rest}=isUserExist.toObject()
   return {
      accessToken: userTokens.accessToken,
      refreshToken: userTokens.refreshToken,
      user: rest
   }
   

   
}





const getNewAccessToken= async (refreshToken: string) => {
   const newAccessToken=await createNewAccessTokenWithRefresToken(refreshToken)



   return {
      accessToken : newAccessToken
   }
}




   
// const resetPassword = async (
//   oldPassword: string,
//   newPassword: string,
//   decodedToken: JwtPayload
// ) => {
//   const user = await User.findById(decodedToken.userId);

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "User not found");
//   }

//   const isOldPasswordMatch = await bcrypt.compare(
//     oldPassword,
//     user.password as string
//   );

//   if (!isOldPasswordMatch) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Old password does not match");
//   }

//   if (!newPassword) {
//     throw new AppError(httpStatus.BAD_REQUEST, "New password is required");
//   }

//   const saltRound = Number(envVars.BCRYPT_SALT_ROUND);
//   if (!saltRound || isNaN(saltRound)) {
//     throw new AppError(
//       httpStatus.INTERNAL_SERVER_ERROR,
//       "Invalid BCRYPT_SALT_ROUND value"
//     );
//   }

//   user.password = await bcrypt.hash(newPassword, saltRound);

//   await user.save(); // অবশ্যই await দিতে হবে

//   return true;
// };

   
const resetPassword = async (payload: Record<string, string>, decodedToken: JwtPayload) => {
    if (payload.id != decodedToken.userId) {
        throw new AppError(401, "You can not reset your password")
    }

    const isUserExist = await User.findById(decodedToken.userId)
    if (!isUserExist) {
        throw new AppError(401, "User does not exist")
    }

    const hashedPassword = await bcryptjs.hash(
        payload.newPassword,
        Number(envVars.BCRYPT_SALT_ROUND)
    )

    isUserExist.password = hashedPassword;

    await isUserExist.save()
}

   
const setPassword = async (userId: string, plainPassword: string) => {

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.password && user.auths.some(providerObject=> providerObject.provider === "google")) {
     throw new AppError(httpStatus.BAD_REQUEST,"Password is already set. Use change password instead")
  }

  const hasPassword=await bcryptjs.hash(plainPassword,Number(envVars.BCRYPT_SALT_ROUND))

  const credentialProvider: IAuthProvider = {
    provider: "credentials",
    providerId: user.email as string
   }
  const auths: IAuthProvider[] = [...user.auths, credentialProvider]
  
  user.password = hasPassword
  user.auths = auths
  
  await user.save()







  return true;
};

const forgotPassword = async (email: string) => {

  const isUserExist = await User.findOne({ email });

  
     
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

  
  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role
  }

  const resetToken = Jwt.sign(jwtPayload, envVars.JWT_ACCESS_SECRET, {
    expiresIn: "10m"
  })

  const resetUrl=`${envVars.FONTEND_URL}/reset-password?id=${isUserExist._id}&token=${resetToken}`

  sendEmail({
  to: isUserExist.email,
  subject: "Reset Your Password",
  templateName: "forgetPassword",
  templateData: {
    name: isUserExist.name,
    resetUrl // এই নাম template এ match করতে হবে
  }
 });


// fsast@123

  return true;
};

   
const changePassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
 

  return {};
};





export const AuthService = {
  credentialsLogin,
  getNewAccessToken,
  changePassword,
  setPassword,
  forgotPassword,
   resetPassword
}