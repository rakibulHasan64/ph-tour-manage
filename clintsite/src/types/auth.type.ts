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

export enum Role {
   SUPER_ADMIN = "SUPER_ADMIN",
   ADMIN = "ADMIN",
   USER = "USER",
   GUIDE = "GUIDE",
}
