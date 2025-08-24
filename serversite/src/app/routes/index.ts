import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DivisionRoutes } from "../modules/divisition/divsion.route";
import { TourRoutes } from "../modules/toure/tour.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { PymantRoutes } from "../modules/pymant/pymantRoute";
import { OtpRoutes } from "../modules/otp/otp.route";



export const router = Router();

const moduleRoutes = [
   {
      path: "/user",
      route: UserRoutes
   },
   {
      path: "/auth",
      route: AuthRoutes
   },
   {
      path: "/division",
      route: DivisionRoutes
   },
    {
        path: "/tour",
        route: TourRoutes
   },
    {
        path: "/booking",
        route: BookingRoutes
    },
    {
        path: "/payment",
        route: PymantRoutes
   },
     {
        path: "/otp",
        route: OtpRoutes
    },
   //  {
   //      path: "/stats",
   //      route: StatsRoutes
   //  },
];

moduleRoutes.forEach((route) => {
   router.use(route.path, route.route);
});


