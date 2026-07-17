import { z } from "zod";
export const createPaymentIntentSchema = z.object({
    body: z.object({
        orderId: z.string().uuid("Invalid order ID format"),
    }),
});
//# sourceMappingURL=payment.schema.js.map