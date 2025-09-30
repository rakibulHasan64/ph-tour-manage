"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_contolers_1 = require("./user.contolers");
const validreqat_1 = require("../../middlewares/validreqat");
const userVladition_1 = require("./userVladition");
const user_interface_1 = require("./user.interface");
const chakAuth_1 = require("../../middlewares/chakAuth");
const router = (0, express_1.Router)();
// ✅ Routes
router.post("/register", (0, validreqat_1.validateRequest)(userVladition_1.createUserZodSchema), user_contolers_1.userControllers.createUser);
router.get("/all-user", (0, chakAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), user_contolers_1.userControllers.getAllUsers);
router.get("/me", (0, chakAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), user_contolers_1.userControllers.getMeAllUsers);
router.get("/id", (0, chakAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), user_contolers_1.userControllers.getSingleUser);
router.patch("/:id", (0, chakAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), user_contolers_1.userControllers.UpdeaedUser);
exports.UserRoutes = router;
