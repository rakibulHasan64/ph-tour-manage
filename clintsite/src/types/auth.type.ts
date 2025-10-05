export interface IResponse<T> {
   statusCode: number;
   success: boolean;
   message: string;
   data: T;
}

export interface IAuthProvider {
   provider: "google" | "credentials";
   providerId: string;
}

export type Role = "SUPER_ADMIN" | "ADMIN" | "USER" | "GUIDE";



export interface IUser {
   _id: string; 
   name: string;
   email: string;
   role: Role;
   isActive: boolean;
   isVerified: boolean;
   phone?: string;
   address?: string;
}
