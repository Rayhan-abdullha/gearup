import Stripe from "stripe";
import { prisma } from "../../lib/prisma";
import { IPaymentIntentInput } from "./payment.interface";
import config from "../../config";

const stripe = new Stripe(config.stripe_secret_key);

const createPaymentIntent = async (
  userId: string,
  payload: IPaymentIntentInput,
) => {
  const { orderId } = payload;

  // Find Order and include the actual Gear details inside the OrderItems
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      items: {
        include: {
          gear: {
            select: {
              title: true, // Pull the gear title safely
            },
          },
        },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.customerId !== userId) {
    throw new Error("Unauthorized");
  }

  if (order.paymentStatus === "PAID") {
    throw new Error("Order already paid");
  }

  // Generate a clean summary of rented titles for the Stripe checkout screen
  const itemsSummary = order.items
    .map((item) => `${item.gear.title} (x${item.quantity})`)
    .join(", ");

  const productName =
    itemsSummary.length > 0
      ? `Rental: ${itemsSummary}`
      : `Rental Order #${order.id.slice(0, 8)}`;

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(order.totalAmount * 100), // Converted to cents safely
          product_data: {
            name: productName,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      orderId: order.id,
      customerId: userId,
    },
    success_url: `${config.client_url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.client_url}/payment/cancel`,
  });

  // Upsert the tracking record into the 'payments' table using the session ID
  await prisma.payment.upsert({
    where: {
      orderId: order.id,
    },
    update: {
      gateway: "STRIPE",
      transactionId: session.id,
      amount: order.totalAmount,
      status: "PENDING",
    },
    create: {
      orderId: order.id,
      gateway: "STRIPE",
      transactionId: session.id,
      amount: order.totalAmount,
      status: "PENDING",
    },
  });

  return {
    checkoutUrl: session.url,
    sessionId: session.id,
  };
};

const confirmPaymentWebhook = async (signature: string, rawBody: Buffer) => {
  const event = stripe.webhooks.constructEvent(
    rawBody,
    signature,
    config.stripe_webhook_secret,
  );
  console.log("Received Stripe webhook event:", event.type);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Checkout session completed:", session);

      const orderId = session.metadata?.orderId;
      console.log("Order ID from metadata:", orderId);

      if (!orderId) {
        throw new Error("Order ID missing");
      }

      return await prisma.$transaction(async (tx) => {
        const payment = await tx.payment.update({
          where: {
            transactionId: session.id,
          },

          data: {
            status: "PAID",

            gatewayPayload: JSON.parse(JSON.stringify(session)),
          },
        });

        await tx.order.update({
          where: {
            id: orderId,
          },

          data: {
            paymentStatus: "PAID",
            status: "CONFIRMED",
            transactionId: session.payment_intent?.toString(),
          },
        });

        return payment;
      });
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;

      await prisma.payment.updateMany({
        where: {
          transactionId: session.id,
        },

        data: {
          status: "FAILED",
        },
      });

      break;
    }

    default:
      console.log(`Unhandled event ${event.type}`);
  }

  return {
    received: true,
  };
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
