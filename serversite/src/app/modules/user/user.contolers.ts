import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServies } from "./user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user=await UserServies.createUser(req.body)

   

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "User created successfully",
      data: user,
    });

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


export const userControllers = {
   createUser
}
