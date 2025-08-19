


import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsyn";
import { sendResponse } from "../../utils/sendRespons";
import { AuthService } from "./auth.service";
import AppError from "../../errorHelpers/AppError";
import { setAuthcookie } from "../../utils/setCookie";
import { creatUserTokens } from "../../utils/userTokens";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";




// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction)=> {
  const loginInfo = await AuthService.credentialsLogin(req.body);

   setAuthcookie(res,loginInfo)

  
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User login successfully",
    data: loginInfo,

  })
});



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new AppError(httpStatus.BAD_REQUEST, "No refresh toKE n recived from cookies")
  }
  const tokenInfo = await AuthService.getNewAccessToken(refreshToken)

 
   setAuthcookie(res,tokenInfo)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "New access token successfully",
    data: tokenInfo,

  })
});



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

 
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  })

   
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  })
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logout successfully",
    data: null,

  })
});




// const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  
//   const decodedToken = req.user;
//   const newPassword = req.body.newpassword   // এখানে n ছোট হাতের
//    const oldPassword = req.body.oldPassword


//   const newupdedPasswords = await AuthService.resetPassword(oldPassword, newPassword, decodedToken)
  

  


//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "User resertpassword successfully",
//     data: null,

//   })
// });

const resetPassword = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;
    const { oldPassword, newPassword } = req.body; // ✅ destructure

    if (!oldPassword || !newPassword) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Old password and new password are required"
      );
    }

    await AuthService.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User reset password successfully",
      data: null,
    });
  }
);






const  googleCallbackContolar = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {

    let redirectTo = req.query.state ? req.query.state as string : ''
    
    if (redirectTo.startsWith("/")) {
      redirectTo=redirectTo.slice(1)
    }
    const user = req.user;
   if (!user) {
      throw new AppError(httpStatus.NOT_FOUND,"User Not Found")
   }

   const tokenInfo = creatUserTokens(user)
   
   setAuthcookie(res, tokenInfo)
   res.redirect(`${envVars.FONTEND_URL}/${redirectTo}`)
  }
);


export const AuthController = {
  credentialsLogin,
  getNewAccessToken,
  logout,
  resetPassword,
  googleCallbackContolar
}