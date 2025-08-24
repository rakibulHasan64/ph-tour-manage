import express from "express";
import { OTPController } from "./otp.contlloer";






const router = express.Router();


router.post("/send", OTPController.sendOTP)
router.post("/verify", OTPController.verifyOTP)




export const OtpRoutes = router;