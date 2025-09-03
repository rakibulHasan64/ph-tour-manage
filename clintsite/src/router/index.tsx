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


export const router = createBrowserRouter([

   {
      Component: App,
      path: "/",
      children: [
         {
            Component: HomePage,
            path: "about"
         }
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
      Component: Verfiy,
      path: "/verify",
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
      



   }
])