/* eslint-disable @typescript-eslint/no-explicit-any */


// middlewares/validreqat.ts
// import { Request, Response, NextFunction } from "express";
// import { createUserSchema } from "../modules/user/userVladition";

// export const validateCreateUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     req.body = await createUserSchema.parseAsync(req.body);
//     next();
//   } catch (err: unknown) {
    

//     next(err);
//   }
// };

import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateRequest = (zodSchema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await zodSchema.parseAsync(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.errors || error.message || "Validation error",
      });
    }
  };
