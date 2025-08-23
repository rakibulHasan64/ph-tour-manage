import { catchAsync } from "../../utils/catchAsyn";
import { sendResponse } from "../../utils/sendRespons";
import { ITour } from "./tour.interface";
import { TourService } from "./tour.sercvic";
import { Request, Response } from 'express';

const createTour = catchAsync(async (req: Request, res: Response) => {
     

    const paylod: ITour = {
        ...req.body,
        images: (req.files as Express.Multer.File[]).map(file=> file.path)
    }
    const result = await TourService.createTour(paylod);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tour created successfully',
        data: result,
    });
});


const getAllTours = catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    const result = await TourService.getAllTours(query as Record<string, string>);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tour all get successfully',
        data: result.data,
        meta: result.mata
    });
});


const updateTour = catchAsync(async (req: Request, res: Response) => {
    

    const paylod: ITour = {
        ...req.body,
        images: (req.files as Express.Multer.File[]).map(file=> file.path)
    }
    const result = await TourService.updateTour(req.params.id,paylod)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tour updated successfully',
        data: result
    
    });
});



const deleteTour = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TourService.deleteTour(id)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tour deleted successfully',
        data: result
    
    });
});



const getAllTourTypes = catchAsync(async (req: Request, res: Response) => {
    const result = await TourService.getAllTourTypes();

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tour all successfully',
        data: result
    
    });
});

const createTourType = catchAsync(async (req: Request, res: Response) => {
    const {name}=req.body
    const result = await TourService.createTourType({ name })

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'createTourType created successfully',
        data: result
    
    });
});

const updateTourType = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const {name}=req.body
    const result = await TourService.updateTourType(id,name)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'updateTourType updated successfully',
        data: result
    
    });
});



const deleteTourType = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await TourService.deleteTourType(id)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'deleteTourType delated successfully',
        data: result
    
    });
});



export const TourController = {
    createTour,
    createTourType,
    getAllTourTypes,
    deleteTourType,
    updateTourType,
    getAllTours,
    updateTour,
    deleteTour,
};