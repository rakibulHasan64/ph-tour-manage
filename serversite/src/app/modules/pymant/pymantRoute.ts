import express from "express";
import { PymantCallation } from "./pymatContoler";
import { checkAuth } from "../../middlewares/chakAuth";
import { Role } from "../user/user.interface";





const router = express.Router();


router.post("/init-pyament:bookingId", PymantCallation.initPyment)
router.post("/success", PymantCallation.successPymants)
router.post("/fail", PymantCallation.failPymants)
router.post("/cancel", PymantCallation.cancelPymants)

router.get("/invoice/:pymantId", checkAuth(...Object.values(Role)), PymantCallation.getInvoiceDownload)

router.post("/validate-payment", PymantCallation.validatePayment)


export const PymantRoutes = router;