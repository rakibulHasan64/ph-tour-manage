/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import mongoose from "mongoose";
import { ZodError } from "zod";
import { deleteImageFromCLoudinary } from "../config/cloudnery.config";

interface TErrorSources {
  path: string;
  message: string;
}

interface TGenericErrorResponse {
  statusCode: number;
  message: string;
  errorSources?: TErrorSources[];
}

// 🔹 Duplicate Error
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const matchedArry = err.message.match(/["']([^"']+)["']/);

  return {
    statusCode: 400,
    message: `${matchedArry?.[1]} already exists`
  };
};

// 🔹 Cast Error
const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: "Invalid MongoDB ObjectId. Please provide a valid id."
  };
};

// 🔹 Mongoose Validation Error
const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
  const errorSources = Object.values(err.errors).map((errorObj: any) => ({
    path: errorObj.path,
    message: errorObj.message
  }));

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources
  };
};

// 🔹 Zod Error
const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources = err.issues.map((issue) => ({
    path: issue.path.join("."), // যদি nested হয়
    message: issue.message
  }));

  return {
    statusCode: 400,
    message: "Validation failed",
    errorSources
  };
};


export const globalErrorHandler =async (err: any, req: Request, res: Response, next: NextFunction) => {
  if (envVars.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log(err);
    
  }

  if (req.file) {
    await deleteImageFromCLoudinary(req.file.path)
  }

  if (req.files && Array.isArray(req.files) && req.files.length) {
    
    const imageUrl = (req.files as Express.Multer.File[]).map(File => File.path)
    await Promise.all(imageUrl.map(url=> deleteImageFromCLoudinary(url)))
    
  }
  let statusCode = err.statusCode || 500;
  let message = "Internal Server Error";
  let errorSources: TErrorSources[] = [];

  if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } 
  else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources || [];
  } 
  else if (err.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } 
  else if (err.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources || [];
  } 
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } 
  else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errorSources.length > 0 && { errorSources }),
    ...(envVars.NODE_ENV === "development" && { error: err, stack: err.stack })
  });
};
