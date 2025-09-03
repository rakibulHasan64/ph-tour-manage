
import { role } from "../constants/role";
import { adminSidebarItems } from "../router/adminSideber";
import { userSidebarItems } from "../router/UserSidber";
import type { TRole } from "../types";


export const getSidebarItems = (userRole: TRole) => {
   switch (userRole) {
      case role.superAdmin:
         return [...adminSidebarItems];
      case role.admin:
         return [...adminSidebarItems];
      case role.user:
         return [...userSidebarItems];
      default:
         return [];
   }
};