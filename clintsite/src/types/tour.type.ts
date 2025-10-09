export interface ITourPackage {
   _id: string;
   title: string;
   slug: string;
   startDate: string;
   endDate: string;
   arrivalLocation: string;
   departureLocation: string;
   location: string;
   description: string;
   costFrom: number;
   maxGuest: number;
   minAge: number;
   division: string;
   tourType: string;
   amenities: string[];
   included: string[];
   excluded: string[];
   tourPlan: string[];
   images: string[];
   createdAt: string;
   updatedAt: string;
}
// tour.type.ts

export enum BOOKING_STATUS {
   PENDING = "PENDING",
   CANCEL = "CANCEL",
   COMPLETE = "COMPLETE",
   FAILED = "FAILED"
}

export enum PAYMENT_STATUS {
   PAID = "PAID",
   UNPAID = "UNPAID",
   CANCELLED = "CANCELLED",
   FAILED = "FAILED",
   REFUNDED = "REFUNDED"
}
export interface IPayment {
   _id:  string;
   amount: number;
   status: PAYMENT_STATUS;
   method: string;
   createdAt: Date;
   updatedAt: Date;
}

export interface IBooking {
   _id:  string;
   user: string;      // User reference
   tour:  string;      // Tour reference
   payment?: IPayment;                 // Optional payment object
   guestCount: number;
   status: BOOKING_STATUS;             // "PENDING" | "CANCEL" | "COMPLETE" | "FAILED"
   createdAt: Date;
   updatedAt: Date;
}