import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let message =  "Internal Server Error";

  if (err instanceof AppError) {
    statusCode = err.statusCode
    message=err.message
  }else if (err instanceof Error) {
    statusCode = 500
    message=err.message
  }

  res.status(statusCode).json({
    success: false,
    message: `Something went wrong: ${message} from global error`,
    ...(envVars.NODE_ENV === "development" && { error: err, stack: err.stack })
  });
};
