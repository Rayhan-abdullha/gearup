export interface IPaymentIntentInput {
    orderId: string;
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
//# sourceMappingURL=payment.interface.d.ts.map