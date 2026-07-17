import { Router } from "express";
import { adminControllers } from "./admin.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../users/user.interface";
import validateRequest from "../../middlewares/zodValidationRequest";
import { updateUserStatusSchema } from "./admin.schema";
const router = Router();
router.get("/users", auth(Role.ADMIN), adminControllers.getAllUsers);
router.patch("/users/:id", auth(Role.ADMIN), validateRequest(updateUserStatusSchema), adminControllers.updateUserStatus);
router.get("/gear", auth(Role.ADMIN), adminControllers.getAllGears);
router.get("/rentals", auth(Role.ADMIN), adminControllers.getAllRentals);
export default router;
//# sourceMappingURL=admin.routes.js.map