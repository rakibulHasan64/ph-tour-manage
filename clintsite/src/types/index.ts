import type { ComponentType, ElementType } from "react";

export interface ISentOtp{
   email: string
}

export interface IOtpvery {
   email: string
   otp: string
}


export interface ILogin{
   email: string;
   password: string
}



export interface ISidebarItem {
   title: string;
   url?: string;
   icon?: ElementType; // React.ElementType: মানে <MdDashboard /> এর মতো কম্পোনেন্ট
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   component?: ComponentType<any>;
   items?: ISidebarItem[]; // Nested sub-items
}


export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";