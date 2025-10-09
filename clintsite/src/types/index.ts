/* eslint-disable @typescript-eslint/no-explicit-any */
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
   url?: string; // optional, কারণ কিছু item শুধু menu দেখাবে
   icon?: ElementType;
   component?: ComponentType<any>; // optional
   items?: ISidebarItem[]; // nested sub-items
}




export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";