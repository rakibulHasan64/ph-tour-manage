"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourController = void 0;
const catchAsyn_1 = require("../../utils/catchAsyn");
const sendRespons_1 = require("../../utils/sendRespons");
const tour_sercvic_1 = require("./tour.sercvic");
// const createTour = catchAsync(async (req: Request, res: Response) => {
//     const paylod: ITour = {
//         ...req.body,
//         images: (req.files as Express.Multer.File[]).map(file=> file.path)
//     }
//     const result = await TourService.createTour(paylod);
//     sendResponse(res, {
//         statusCode: 201,
//         success: true,
//         message: 'Tour created successfully',
//         data: result,
//     });
// });
const createTour = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const images = Array.isArray(req.files)
        ? req.files.map(file => file.path)
        : [];
    const payload = Object.assign(Object.assign({}, req.body), { images });
    const result = yield tour_sercvic_1.TourService.createTour(payload);
    (0, sendRespons_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: 'Tour created successfully',
        data: result,
    });
}));
const getAllTours = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield tour_sercvic_1.TourService.getAllTours(query);
    (0, sendRespons_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: 'Tour all get successfully',
        data: result.data,
        meta: result.mata
    });
}));
const updateTour = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paylod = Object.assign(Object.assign({}, req.body), { images: req.files.map(file => file.path) });
    const result = yield tour_sercvic_1.TourService.updateTour(req.params.id, paylod);
    (0, sendRespons_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: 'Tour updated successfully',
        data: result
    });
}));
const deleteTour = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield tour_sercvic_1.TourService.deleteTour(id);
    (0, sendRespons_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: 'Tour deleted successfully',
        data: result
    });
}));
const getAllTourTypes = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tour_sercvic_1.TourService.getAllTourTypes();
    (0, sendRespons_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: 'Tour all successfully',
        data: result
    });
}));
const createTourType = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const result = yield tour_sercvic_1.TourService.createTourType({ name });
    (0, sendRespons_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: 'createTourType created successfully',
        data: result
    });
}));
const updateTourType = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    const result = yield tour_sercvic_1.TourService.updateTourType(id, name);
    (0, sendRespons_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: 'updateTourType updated successfully',
        data: result
    });
}));
const deleteTourType = (0, catchAsyn_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield tour_sercvic_1.TourService.deleteTourType(id);
    (0, sendRespons_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: 'deleteTourType delated successfully',
        data: result
    });
}));
exports.TourController = {
    createTour,
    createTourType,
    getAllTourTypes,
    deleteTourType,
    updateTourType,
    getAllTours,
    updateTour,
    deleteTour,
};
