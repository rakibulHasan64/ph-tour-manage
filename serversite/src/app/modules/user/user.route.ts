import { Router } from "express";
import { userControllers } from "./user.contolers";


const router = Router()

router.post("/register", userControllers.createUser)

export const UserRoutes=router