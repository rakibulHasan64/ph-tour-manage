import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Verfiy from "../pages/Verfiy";
import DasbordLayout from "../components/layout/DasbordLayout";
import { generateRoutes } from "../utils/generateRoutes";
import { adminSidebarItems } from "./adminSideber";
import { userSidebarItems } from "./UserSidber";
import { withAuth } from "../utils/with.Auth";
import { role } from "../constants/role";
import type { TRole } from "../types";
import Tours from "../pages/user/Tours";
// import TourDetails from "../pages/user/TourDetails";
import Bookinge from "../pages/user/Bookinge";
import TourDetails from "../pages/user/TourDetails";
import Unauthorized from "../pages/Unauthorized";

import Faile from "../pages/pyamant/Faile";
import Pymantsucess from "../pages/pyamant/Pymantsucess";


export const router = createBrowserRouter([

   {
      Component: App,
      path: "/",
      children: [
         {
            Component: HomePage,
            index: true
         },
         {
            Component: Tours,
            path: "tours"
         },

         {
            Component: TourDetails,
            path: "tours/:id"
         },

         

         {
            Component: Bookinge,
            path: "booking/:id"
         },

      ]
   },
   
   {
      Component: withAuth(DasbordLayout, role.superAdmin as TRole),
      path: "/admin",
      children:
         [
            {index: true, element: <Navigate to={"/admin/analytics"} />},
            ...generateRoutes(adminSidebarItems)

         ],



   },



   {
      Component: DasbordLayout,
      path: "/user",
      children: [

         { index: true, element: <Navigate to={"/user/bookings"} /> },
         ...generateRoutes(userSidebarItems)
      ]
      



   },





   {
      Component: Login,
      path: "/login"
   },
   {
      Component: Register,
      path: "/register"
   },
   {
      Component: Unauthorized,
      path: "/unauthorized"
   },

   {
      Component: Verfiy,
      path: "/verify",
   },

   {
      Component: Pymantsucess,
      path: "/payment/success"
   },

   {

      Component: Faile,
      path: "/payment/cancel"

   }
   
])