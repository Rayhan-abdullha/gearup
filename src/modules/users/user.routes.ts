import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "./user.interface";
import validateRequest from "../../middlewares/zodValidationRequest";
import { registerSchema } from "./user.schema";

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  userController.registerUser,
);

router.patch(
  "/profile",
  auth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER),
  userController.updateMyProfile,
);
router.get(
  "/me",
  auth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER),
  userController.getMyProfile,
);

export const userRoutes = router;
