import {  Router,  } from "express";
import { checkAuth } from "../../middlewares/chakAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validreqat";
import { createDivisionSchema, updateDivisionSchema } from "./division.valided";
import { DivisionController } from "./division.contoller";





const router = Router();

router.post("/create", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(createDivisionSchema),DivisionController.createDivision)

router.get("/", DivisionController.getAllDivisions)

router.get("/:slug", DivisionController.getSingleDivision)

router.patch("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN),validateRequest(updateDivisionSchema), DivisionController.updateDivision)

router.delete("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), DivisionController.deleteDivision);


export const DivisionRoutes = router