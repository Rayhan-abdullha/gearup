import { z } from "zod";

export const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(["CANCELLED", "CONFIRMED", "PICKED_UP", "RETURNED"], {
      error:
        "Valid order status is required (CONFIRMED, PICKED_UP, or RETURNED)",
    }),
  }),
});

export const categorySchema = z.object({
  body: z.object({
    name: z.string().min(2, "Category name must be at least 2 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
  }),
});
