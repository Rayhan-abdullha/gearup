import { Router } from "express";
import { paymentControllers } from "./payment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../users/user.interface";
import { paymentServices } from "./payment.services";
import zodValidationRequest from "../../middlewares/zodValidationRequest";
import { createPaymentIntentSchema } from "./payment.schema";
const router = Router();
router.post("/webhook", async (req, res) => {
    const signature = req.headers["stripe-signature"];
    await paymentServices.confirmPaymentWebhook(signature, req.body);
    res.sendStatus(200);
});
router.post("/create", auth(Role.ADMIN, Role.PROVIDER, Role.CUSTOMER), zodValidationRequest(createPaymentIntentSchema), paymentControllers.createPaymentIntent);
router.get("/", auth(Role.ADMIN, Role.PROVIDER, Role.CUSTOMER), paymentControllers.getPaymentHistory);
router.get("/:id", auth(Role.ADMIN, Role.PROVIDER), paymentControllers.getPaymentDetails);
export default router;
//# sourceMappingURL=payment.routes.js.map