import {  Router,  } from "express";
import { userControllers } from "./user.contolers";


import { validateRequest } from "../../middlewares/validreqat";
import { createUserZodSchema } from "./userVladition";
import { Role } from "./user.interface";
import { checkAuth } from "../../middlewares/chakAuth";






const router = Router();



// ✅ Routes
router.post("/register", validateRequest(createUserZodSchema), userControllers.createUser);
router.get("/all-user", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), userControllers.getAllUsers);
router.patch("/:id", checkAuth(...Object.values(Role)),userControllers.UpdeaedUser)

export const UserRoutes = router;


// import { NextFunction, Request, Response, Router } from "express";
// import { userControllers } from "./user.contolers";

// import { validateRequest } from "../../middlewares/validreqat";
// import { createUserZodSchema } from "./userVladition";

// import AppError from "../../errorHelpers/AppError";
// import { JwtPayload } from "jsonwebtoken";

// import { envVars } from "../../config/env";
// import { verifyToken } from "../../utils/jwt";

// const router = Router();

// // ✅ Auth middleware with role-based access
// const checkAuth = (...authRoles: string[]) => async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const accessToken = req.headers.authorization;

//     if (!accessToken) {
//       throw new AppError(403, "No token received");
//     }

//     const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRER);

//     if (!verifiedToken) {
//       throw new AppError(403, "You are not authorized");
//     }

//     const userRole = (verifiedToken as JwtPayload).role;

//     if (!authRoles.includes(userRole)) {
//       throw new AppError(403, "You are not permitted to access this route");
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// };

// // ✅ Routes
// router.post(
//   "/register",
//   validateRequest(createUserZodSchema),
//   userControllers.createUser
// );
// router.get("/all-user", checkAuth("ADMIN", "SUPER ADMIN"), userControllers.getAllUsers);

// export const UserRoutes = router;
