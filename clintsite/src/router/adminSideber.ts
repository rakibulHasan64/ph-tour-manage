
// import Analytics from "@/pages/Admin/Analytics";

import { lazy } from "react";
import type { ISidebarItem } from "../types";
import AddTour from "../pages/Admin/AddTour";
import AddTourType from "../pages/Admin/AddTourType";



const  Analatis = lazy(() => import("../pages/Admin/Analatis"));

export const adminSidebarItems: ISidebarItem[] = [
   {
      title: "Dashboard",
      items: [
         {
            title: "Analytics",
            url: "/admin/analytics",
            component: Analatis,
         },
      ],
   },
   {
      title: "Tour Management",
      items: [
         {
            title: "Add Tour Type",
            url: "/admin/add-tour-type",
            component: AddTourType,
         },
         {
            title: "Add Tour",
            url: "/admin/add-tour",
            component: AddTour,
         },
         {
            title: "Habi Jabi",
            url: "/admin/habijabi",
            component: AddTour,
         },
      ],
   },
];