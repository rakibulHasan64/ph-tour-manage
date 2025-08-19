import { Types } from "mongoose";

// Roles
export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  GUIDE = "GUIDE",
}

// OAuth Provider Info
export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}

// Active Status
export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

// User Interface
export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: boolean; // string -> boolean
  isActive?: IsActive;
  isVerified?: boolean; // string -> boolean
  role: Role;
  auths: IAuthProvider[];
  bookings?: Types.ObjectId[];
  guides?: Types.ObjectId[];
}
 