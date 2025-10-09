import { lazy } from "react";


// Pages
import AddTour from "../pages/Admin/AddTour";
import AddTourType from "../pages/Admin/AddTourType";
import AddDivition from "../pages/Admin/AddDivition";

// Lazy loaded component
const Analatis = lazy(() => import("../pages/Admin/Analatis/Analatis"));

// React Icons
import {
   MdDashboard,
   MdOutlineTour,
   MdAddBusiness,
   MdPending,
   MdCheckCircle,
   MdLocalOffer,
   MdLogout,
} from "react-icons/md";
import type { ISidebarItem } from "../types";

export const adminSidebarItems: ISidebarItem[] = [
   {
      title: "Dashboard",
      icon: MdDashboard,
      items: [
         {
            title: "Analytics",
            url: "analytics", // ✅ relative path
            component: Analatis,
            icon: MdDashboard,
         },
      ],
   },
   {
      title: "Tour Management",
      icon: MdOutlineTour,
      items: [
         {
            title: "Add Tour Type",
            url: "add-tour-type",
            component: AddTourType,
            icon: MdAddBusiness,
         },
         {
            title: "Add Division",
            url: "add-divison",
            component: AddDivition,
            icon: MdAddBusiness,
         },
         {
            title: "Add Tour",
            url: "add-tour",
            component: AddTour,
            icon: MdAddBusiness,
         },

         {
            title: "Pending Tours",
            url: "pending",
            icon: MdPending,
         },
         {
            title: "Successful Tours",
            url: "successful",
            icon: MdCheckCircle,
         },
         {
            title: "Special Offers",
            url: "offers",
            icon: MdLocalOffer,
         },
         {
            title: "Logout",
            url: "logout",
            icon: MdLogout,
         },

         // 🆕 10 New Tour-related routes below
         {
            title: "All Tours",
            url: "all-tours",
            icon: MdOutlineTour,
         },
         {
            title: "Upcoming Tours",
            url: "upcoming-tours",
            icon: MdOutlineTour,
         },
         {
            title: "Ongoing Tours",
            url: "ongoing-tours",
            icon: MdOutlineTour,
         },
         {
            title: "Completed Tours",
            url: "completed-tours",
            icon: MdCheckCircle,
         },
         {
            title: "Cancelled Tours",
            url: "cancelled-tours",
            icon: MdPending,
         },
         {
            title: "Tour Bookings",
            url: "tour-bookings",
            icon: MdOutlineTour,
         },
         {
            title: "Customer Reviews",
            url: "customer-reviews",
            icon: MdCheckCircle,
         },
         {
            title: "Tour Guides",
            url: "tour-guides",
            icon: MdOutlineTour,
         },
         {
            title: "Tour Locations",
            url: "tour-locations",
            icon: MdAddBusiness,
         },
         {
            title: "Tour Reports",
            url: "tour-reports",
            icon: MdCheckCircle,
         },
      ],
   },

   
   
];
