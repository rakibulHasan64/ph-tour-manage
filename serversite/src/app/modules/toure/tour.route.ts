import { Router } from "express";
import { TourController } from "./tour.contller";
import { checkAuth } from "../../middlewares/chakAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validreqat";
import { createTourTypeZodSchema, createTourZodSchema, updateTourZodSchema } from "./tour.valdition";
import { multerUpload } from "../../config/multer.config";

const router = Router();


/* ------------------ TOUR TYPE ROUTES -------------------- */
router.get("/tour-types", TourController.getAllTourTypes);

router.post("/create-tour-type", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(createTourTypeZodSchema),TourController.createTourType
    )
router.patch("/tour-type/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(createTourTypeZodSchema), TourController.updateTourType)

router.delete("/tour-types/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), TourController.deleteTourType)


/* --------------------- TOUR ROUTES ---------------------- */
router.get("/", TourController.getAllTours)

router.post("/create", checkAuth(Role.ADMIN, Role.SUPER_ADMIN),multerUpload.array("files"), validateRequest(createTourZodSchema), TourController.createTour)


router.patch(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    multerUpload.array("files"), 
    validateRequest(updateTourZodSchema),
    TourController.updateTour
);

router.delete("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), TourController.deleteTour);

export const TourRoutes = router

