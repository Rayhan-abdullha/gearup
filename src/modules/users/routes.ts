import { Router } from "express";
import { userController } from "./controller";

const router = Router();

router.post("/register", userController.registerUser);

router.patch("/profile/:id", userController.updateMyProfile);
router.get("/me", userController.getMyProfile);

export const userRoutes = router;
