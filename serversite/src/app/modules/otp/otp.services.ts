import crypto from "crypto"
import { redisClient } from "../../config/redis.confog";
import { sendEmail } from "../../utils/sendEmail";
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.module";
const OTP_EXPIRATION = 2 * 60; 

const generateOtp = (length = 6) => {
  const min = 10 ** (length - 1);
  const max = 10 ** length;
  return crypto.randomInt(min, max); 
};

const sendOTP = async (email: string, name: string) => {

   const user = await User.findOne({ email })
   
   if (!user) {
      throw new AppError(404, "User not found")
   }
   if (user.isVerified) {
      throw new AppError(401, "Your email is already verified")
   }



  const otp = generateOtp();
  const redisKey = `otp:${email}`;

  await redisClient.set(redisKey, otp.toString(), {
    expiration: {
      type: "EX",
      value: OTP_EXPIRATION,
    },
  });

  await sendEmail({
    to: email,
    subject: "Your OTP Code",
    templateName: "otp",
    templateData: {
      name,
      otp,
    },
  });
};

export const verifyOTP = async (email: string, otp: string) => {
   

   
   const user = await User.findOne({ email })
   
   if (!user) {
      throw new AppError(404, "User not found")
   }
     if (user.isVerified) {
        throw new AppError(401, "You are already verified")
    }
   

   const redisKey = `otp:${email}`
   const savedOtp = await redisClient.get(redisKey)
   
   if (!savedOtp) {
      throw new AppError(404,"Invalid Otp ")
   }
   if (savedOtp !== otp) {
         throw new AppError(404,"Invalid Otp ")
   }

   await Promise.all([
      User.updateOne({ email }, { isVerified: true }, { runValidators: true }),
      redisClient.del([redisKey])
   ])



};

export const OTPService = {
    sendOTP,
    verifyOTP
}


