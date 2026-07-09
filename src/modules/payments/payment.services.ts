import { prisma } from "../../lib/prisma";
import { IPaymentIntentInput, IStripeWebhookInput } from "./payment.interface";

// Mock Stripe initialization for demonstration purposes
// In production: import Stripe from 'stripe'; const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const stripeMock = {
  paymentIntents: {
    create: async (params: any) => ({
      id: `pi_mock_${Math.random().toString(36).substring(2, 11)}`,
      client_secret: `pi_mock_secret_${Math.random().toString(36).substring(2, 11)}`,
    }),
  },
};

const createPaymentIntent = async (
  userId: string,
  payload: IPaymentIntentInput,
) => {
  const { orderId, gateway } = payload;

  // 1. Find the target order and ensure it belongs to this customer
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Rental order not found");
  }
  if (order.customerId !== userId) {
    throw new Error("Unauthorized to pay for this rental order");
  }
  if (order.paymentStatus === "PAID") {
    throw new Error("This order has already been paid for");
  }

  // 2. Interact with payment gateway (Example: Stripe)
  let paymentGatewayId = "";
  let clientSecret = "";

  if (gateway === "STRIPE") {
    // Stripe expects amounts in cents/poisha (Float * 100)
    const intent = await stripeMock.paymentIntents.create({
      amount: Math.round(order.totalAmount * 100),
      currency: "usd",
      metadata: { orderId: order.id, customerId: userId },
    });

    paymentGatewayId = intent.id;
    clientSecret = intent.client_secret;
  } else if (gateway === "SSLCOMMERZ") {
    // Handle SSLCommerz session creation logic here...
    paymentGatewayId = `ssl_${Math.random().toString(36).substring(2, 11)}`;
    clientSecret = "https://sandbox.sslcommerz.com/gwprocess/...";
  }

  // 3. Create or Update a pending Payment tracking entry in your system
  await prisma.payment.upsert({
    where: { orderId: order.id },
    update: {
      gateway,
      transactionId: paymentGatewayId,
      amount: order.totalAmount,
      status: "PENDING",
    },
    create: {
      orderId: order.id,
      gateway,
      transactionId: paymentGatewayId,
      amount: order.totalAmount,
      status: "PENDING",
    },
  });

  return {
    transactionId: paymentGatewayId,
    clientSecret, // Used by frontend to mount payment inputs
    totalAmount: order.totalAmount,
  };
};

const confirmPaymentWebhook = async (event: any) => {
  // Extract essential payment info passed from gateway
  // NOTE: Real Stripe webhooks require verifying signature headers using stripe.webhooks.constructEvent()
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const orderId = paymentIntent.metadata.orderId;
    const transactionId = paymentIntent.id;

    // Use transaction to ensure order and payment state match up atomically
    return await prisma.$transaction(async (tx) => {
      // 1. Update your payments table entry
      const updatedPayment = await tx.payment.update({
        where: { transactionId: transactionId },
        data: {
          status: "PAID",
          gatewayPayload: event, // Logs full signature response logs for auditing
        },
      });

      // 2. Transition your rental order states securely
      await tx.order.update({
        where: { id: orderId },
        data: {
          status: "CONFIRMED", // Order moves from PLACED -> CONFIRMED
          paymentStatus: "PAID",
          transactionId: transactionId,
        },
      });

      return updatedPayment;
    });
  }

  throw new Error("Unhandled webhook event type");
};

const getPaymentHistory = async (userId: string) => {
  return await prisma.payment.findMany({
    where: {
      order: {
        customerId: userId,
      },
    },
    include: {
      order: {
        select: { id: true, totalAmount: true, status: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getPaymentDetails = async (paymentId: string, userId: string) => {
  if (!paymentId) {
    throw new Error("Payment record ID is required");
  }

  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      order: true,
    },
  });

  if (!payment) {
    throw new Error("Payment record not found");
  }

  if (payment.order.customerId !== userId) {
    throw new Error("Unauthorized access to view this payment receipt");
  }

  return payment;
};

export const paymentServices = {
  createPaymentIntent,
  confirmPaymentWebhook,
  getPaymentHistory,
  getPaymentDetails,
};
