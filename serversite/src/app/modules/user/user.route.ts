import {  Router,  } from "express";
import { userControllers } from "./user.contolers";


import { validateRequest } from "../../middlewares/validreqat";
import { createUserZodSchema } from "./userVladition";
import { Role } from "./user.interface";
import { checkAuth } from "../../middlewares/chakAuth";






const router = Router();



// ✅ Routes
router.post("/register", validateRequest(createUserZodSchema), userControllers.createUser);
router.get("/all-user", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), userControllers.getMeAllUsers);

router.get("/me", checkAuth(...Object.values(Role)), userControllers.getAllUsers);
router.get("/id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), userControllers.getSingleUser)
router.patch("/:id", checkAuth(...Object.values(Role)),userControllers.UpdeaedUser)

export const UserRoutes = router;


