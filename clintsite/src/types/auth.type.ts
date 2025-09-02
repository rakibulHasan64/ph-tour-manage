

export type { ISentOtp, ILogin, IOtpvery } from "./auth.type"


export interface IResponse<T> {
   statusCode: number;
   success: boolean;
   message: string;
   data: T;
}