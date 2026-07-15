import { z } from "zod";

export const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(["CANCELLED", "CONFIRMED", "PICKED_UP", "RETURNED"], {
      error:
        "Valid order status is required (CONFIRMED, PICKED_UP, or RETURNED)",
    }),
  }),
});
