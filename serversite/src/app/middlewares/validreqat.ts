

// import { NextFunction, Request, Response } from "express";


// export const validateRequest = (zodSchema: AnyZodObject) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       req.body = await zodSchema.parseAsync(req.body);
//       next();
//     } catch (error: any) {
//       res.status(400).json({
//         success: false,
//         message: error.errors || error.message || "Validation error",
//       });
//     }
//   };


import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";


export const validateRequest = (zodSchema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await zodSchema.parseAsync(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errorSources: error.issues.map((issue) => ({
            path: issue.path.join("."), 
            message: issue.message
          }))
        });
      }

      // generic error fallback
      res.status(400).json({
        success: false,
        message: error.message || "Validation error"
      });
    }
  };
