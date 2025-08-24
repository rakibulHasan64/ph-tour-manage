


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
import passport from "passport";





const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction)=> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  passport.authenticate("local", async (err: any, user: any, info: any) => {
     if (err) {
       return next(new AppError(err.statusCode || 401, err.message));
     }

     if (!user) {
       return next(new AppError(401, info.message));
     }

     const userToken = await creatUserTokens(user);
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const { password: pass, ...rest } = user.toObject();

     setAuthcookie(res, userToken);

     sendResponse(res, {
       success: true,
       statusCode: httpStatus.OK,
       message: "User login successfully",
       data: {
         accessToken: userToken.accessToken,
         refreshTokens: userToken.refreshToken,
         user: rest,
       },
     });
  })(req, res, next); // ✅ Correct order
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




const resetPassword = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;
    

    

    await AuthService.resetPassword( req.body, decodedToken as JwtPayload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User reset password successfully",
      data: null,
    });
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const changePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user

    await AuthService.changePassword(oldPassword, newPassword, decodedToken as JwtPayload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password Changed Successfully",
        data: null,
    })
})



const setPassword = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const {password}=req.body

    await AuthService.setPassword(decodedToken.userId,password);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User reset password successfully",
      data: null,
    });
  }
);



const forgotPassword = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    
    const {email}=req.body

    await AuthService.forgotPassword(email);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Email sent successfully",
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
  forgotPassword,
  setPassword,
  changePassword,
  googleCallbackContolar
}