import { Router } from "express";
import { authController } from "./controller";

const router = Router();

router.post("/login", authController.loginUser);

export const authRoutes = router;
