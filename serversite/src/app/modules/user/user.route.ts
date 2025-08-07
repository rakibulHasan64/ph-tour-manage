import { Router,  } from "express";
import { userControllers } from "./user.contolers";


import { validateRequest } from "../../middlewares/validreqat";
import { createUserZodSchema } from "./userVladition";



const router = Router();



// ✅ Routes
router.post("/register", validateRequest(createUserZodSchema), userControllers.createUser);
router.get("/all-user", userControllers.getAllUsers);

export const UserRoutes = router;
