import express from "express";
import { PymantCallation } from "./pymatContoler";





const router = express.Router();


router.post("/init-pyament:bookingId", PymantCallation.initPyment)
router.post("/success", PymantCallation.successPymants)
router.post("/fail", PymantCallation.failPymants)
router.post("/cancel", PymantCallation.cancelPymants)




export const PymantRoutes = router;