import { Router } from "express";
import { paymentControllers } from "./payment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../users/user.interface";
const router = Router();

// 🚨 IMPORTANT: Webhook entrypoint must be parsed using express.raw() if verifying signatures.
// Also, it should NOT be protected by JWT auth because gateways call it externally.
router.post(
  "/confirm",
  auth(Role.ADMIN, Role.PROVIDER, Role.CUSTOMER),
  paymentControllers.confirmPaymentWebhook,
);

// Protected user history endpoints
router.post(
  "/create",
  auth(Role.ADMIN, Role.PROVIDER, Role.CUSTOMER),
  paymentControllers.createPaymentIntent,
);
router.get(
  "/",
  auth(Role.ADMIN, Role.PROVIDER, Role.CUSTOMER),
  paymentControllers.getPaymentHistory,
);
router.get(
  "/:id",
  auth(Role.ADMIN, Role.PROVIDER, Role.CUSTOMER),
  paymentControllers.getPaymentDetails,
);

export default router;
