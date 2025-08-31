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
exports.DivisionService = void 0;
const cloudnery_config_1 = require("../../config/cloudnery.config");
const queryBlider_1 = require("../../utils/queryBlider");
const devition_const_1 = require("./devition.const");
const division_modul_1 = require("./division.modul");
const createDivisions = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingDivision = yield division_modul_1.Division.findOne({ name: payload.name });
    if (existingDivision) {
        throw new Error("A division with this name already exists.");
    }
    const division = yield division_modul_1.Division.create(payload);
    return division;
});
// const getAllDivisions = async () => {
//    const divisions = await Division.find({});
//    const totalDivisions = await Division.countDocuments();
//    return {
//       data: divisions,
//       meta: {
//          total: totalDivisions
//       }
//    }
// };
const getAllDivisions = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new queryBlider_1.QueryBuilder(division_modul_1.Division.find(), query);
    const divisionsData = queryBuilder
        .search(devition_const_1.divisionSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    const [data, meta] = yield Promise.all([
        divisionsData.build(),
        queryBuilder.getMeta()
    ]);
    return {
        data,
        meta
    };
});
const getSingleDivision = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const division = yield division_modul_1.Division.find({ slug });
    return {
        data: division,
    };
});
const updateDivision = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingDivision = yield division_modul_1.Division.findById(id);
    if (!existingDivision) {
        throw new Error("Division not found.");
    }
    const duplicateDivision = yield division_modul_1.Division.findOne({
        name: payload.name,
        _id: { $ne: id },
    });
    if (duplicateDivision) {
        throw new Error("A division with this name already exists.");
    }
    const updatedDivision = yield division_modul_1.Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (payload.thumbnail && existingDivision.thumbnail) {
        yield (0, cloudnery_config_1.deleteImageFromCLoudinary)(existingDivision.thumbnail);
    }
    return updatedDivision;
});
const deleteDivision = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield division_modul_1.Division.findByIdAndDelete(id);
    return null;
});
exports.DivisionService = {
    createDivisions,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision,
};
