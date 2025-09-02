import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Verfiy from "../pages/Verfiy";
import DasbordLayout from "../components/layout/DasbordLayout";
import Analatis from "../pages/Admin/Analatis";
import Bookinge from "../pages/user/Bookinge";
import AddTour from "../pages/Admin/AddTour";


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
      Component: DasbordLayout,
      path: "/admin",
      children: [
         {
            Component: Analatis,
            path: "analytics"

         },

         {
            Component: AddTour,
            path: "add-tour"
         }
      ]



   },



   {
      Component: DasbordLayout,
      path: "/user",
      children: [
         {
            Component: Bookinge,
            path: "Bookinge"

         }
      ]



   }
])