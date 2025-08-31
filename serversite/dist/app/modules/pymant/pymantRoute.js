"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PymantRoutes = void 0;
const express_1 = __importDefault(require("express"));
const pymatContoler_1 = require("./pymatContoler");
const chakAuth_1 = require("../../middlewares/chakAuth");
const user_interface_1 = require("../user/user.interface");
const router = express_1.default.Router();
router.post("/init-pyament:bookingId", pymatContoler_1.PymantCallation.initPyment);
router.post("/success", pymatContoler_1.PymantCallation.successPymants);
router.post("/fail", pymatContoler_1.PymantCallation.failPymants);
router.post("/cancel", pymatContoler_1.PymantCallation.cancelPymants);
router.get("/invoice/:pymantId", (0, chakAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), pymatContoler_1.PymantCallation.getInvoiceDownload);
router.post("/validate-payment", pymatContoler_1.PymantCallation.validatePayment);
exports.PymantRoutes = router;
