import { catchAsync } from "../../utils/catchAsyn";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendRespons";
import { DivisionService } from "./division.servics";
import { IDivision } from "./division.interface";

const createDivision = catchAsync(async (req: Request, res: Response) => {

   const payload: IDivision = {
      ...req.body,
      thumbnail: req.file?.path
   }
   const result = await DivisionService.createDivisions(payload);
   
   
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Division created",
      data: result,
   });
});


const getAllDivisions = catchAsync(async (req: Request, res: Response) => {
   const result = await DivisionService.getAllDivisions();
   

   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Division  retrieved",
      data: result.data,
      meta: result.mata
   });
});


const getSingleDivision = catchAsync(async (req: Request, res: Response) => {

   const slug = req.params.slug;

   const result = await DivisionService.getSingleDivision(slug);
   

   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Division  retrieved",
      data: result.data,
      
   });
});

const   updateDivision = catchAsync(async (req: Request, res: Response) => {

   const id = req.params.id;
   const payload: IDivision = {
      ...req.body,
      thumbnail: req.file?.path
   }
   const result = await DivisionService.updateDivision(id, payload);
   

   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Division  retrieved",
      data: result,
      
   });
});



const  deleteDivision = catchAsync(async (req: Request, res: Response) => {

  const result = await DivisionService.deleteDivision(req.params.id);
   

   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Division  retrieved",
      data: result
      
   });
});

export const DivisionController = {
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision,
};