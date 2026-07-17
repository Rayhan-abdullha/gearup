import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "./user.interface";
import validateRequest from "../../middlewares/zodValidationRequest";
import { registerSchema } from "./user.schema";
import { providerController } from "../provider/provider.controller";
import { updateOrderStatusSchema } from "../provider/provider.schema";
const router = Router();
router.post("/register", validateRequest(registerSchema), userController.registerUser);
router.patch("/profile", auth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER), userController.updateMyProfile);
router.get("/me", auth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER), userController.getMyProfile);
router.patch("/orders/:id", auth(Role.CUSTOMER), validateRequest(updateOrderStatusSchema), providerController.updateGearOrder);
export const userRoutes = router;
//# sourceMappingURL=user.routes.js.map