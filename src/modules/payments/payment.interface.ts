export interface IPaymentIntentInput {
  orderId: string;
  gateway: "STRIPE" | "SSLCOMMERZ";
}

export interface IStripeWebhookInput {
  type: string;
  data: {
    object: {
      id: string;
      metadata: {
        orderId: string;
      };
      amount_received?: number;
    };
  };
}
