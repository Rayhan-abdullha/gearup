import { z } from "zod";

export const createRentalSchema = z.object({
  body: z.object({
    items: z
      .array(
        z.object({
          gearId: z.string().uuid("Invalid gear selection ID"),
          quantity: z.number().int().positive("Quantity must be at least 1"),
          startDate: z
            .string()
            .datetime({
              message: "Start date must be an ISO 8601 date string",
            }),
          endDate: z
            .string()
            .datetime({ message: "End date must be an ISO 8601 date string" }),
        }),
      )
      .min(1, "At least one gear item must be rented"),
  }),
});
