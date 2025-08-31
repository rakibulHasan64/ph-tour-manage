"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourRoutes = void 0;
const express_1 = require("express");
const tour_contller_1 = require("./tour.contller");
const chakAuth_1 = require("../../middlewares/chakAuth");
const user_interface_1 = require("../user/user.interface");
const validreqat_1 = require("../../middlewares/validreqat");
const tour_valdition_1 = require("./tour.valdition");
const multer_config_1 = require("../../config/multer.config");
const router = (0, express_1.Router)();
/* ------------------ TOUR TYPE ROUTES -------------------- */
router.get("/tour-types", tour_contller_1.TourController.getAllTourTypes);
router.post("/create-tour-type", (0, chakAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), (0, validreqat_1.validateRequest)(tour_valdition_1.createTourTypeZodSchema), tour_contller_1.TourController.createTourType);
router.patch("/tour-type/:id", (0, chakAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), (0, validreqat_1.validateRequest)(tour_valdition_1.createTourTypeZodSchema), tour_contller_1.TourController.updateTourType);
router.delete("tour-types/:id", (0, chakAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), multer_config_1.multerUpload.array("files"), (0, validreqat_1.validateRequest)(tour_valdition_1.createTourTypeZodSchema), tour_contller_1.TourController.deleteTourType);
/* --------------------- TOUR ROUTES ---------------------- */
router.get("/", tour_contller_1.TourController.getAllTours);
router.post("/create", (0, chakAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), multer_config_1.multerUpload.array("files"), (0, validreqat_1.validateRequest)(tour_valdition_1.createTourZodSchema), tour_contller_1.TourController.createTour);
router.patch("/:id", (0, chakAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), multer_config_1.multerUpload.array("files"), (0, validreqat_1.validateRequest)(tour_valdition_1.updateTourZodSchema), tour_contller_1.TourController.updateTour);
router.delete("/:id", (0, chakAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), tour_contller_1.TourController.deleteTour);
exports.TourRoutes = router;
