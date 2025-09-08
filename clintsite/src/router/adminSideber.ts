
// import Analytics from "@/pages/Admin/Analytics";

import { lazy } from "react";
import type { ISidebarItem } from "../types";
import AddTour from "../pages/Admin/AddTour";
import AddTourType from "../pages/Admin/AddTourType";
import AddDivition from "../pages/Admin/AddDivition";



const  Analatis = lazy(() => import("../pages/Admin/Analatis/Analatis"));

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
            title: "Add Divison",
            url: "/admin/add-divison",
            component: AddDivition,
         },
         {
            title: "AddTour",
            url: "/admin/habijabi",
            component: AddTour,
         },
      ],
   },
];