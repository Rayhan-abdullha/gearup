import { Router } from "express";
import { paymentControllers } from "./payment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../users/user.interface";
import { paymentServices } from "./payment.services";
import express from "express";
const router = Router();
import { prisma } from "../../lib/prisma";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const signature = req.headers["stripe-signature"] as string;
      console.log("Stripe webhook signature:", signature);

      await paymentServices.confirmPaymentWebhook(signature, req.body);
      console.log("Stripe webhook processed successfully");
      res.status(200).json({
        received: true,
      });
    } catch (error: any) {
      console.log("Error processing Stripe webhook:", error.message);
      res.status(400).json({
        message: error.message,
      });
    }
  },
);

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

router.delete("/", async function async(req, res) {
  try {
    await prisma.payment.deleteMany({});
    // await prisma.orderItem.deleteMany({});
    // await prisma.order.deleteMany({});

    res.status(200).json({ message: "All payments and orders deleted" });
  } catch (error: any) {
    res.status(500).json({
      message: "Error deleting payments and orders",
      error: error.message,
    });
  }
});

export default router;
