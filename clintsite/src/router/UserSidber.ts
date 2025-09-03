
import Bookinge from "../pages/user/Bookinge";
import type { ISidebarItem } from "../types";



export const userSidebarItems: ISidebarItem[] = [
   {
      title: "History",
      items: [
         {
            title: "Bookings",
            url: "/user/bookings",
            component: Bookinge,
         },
      ],
   },
];