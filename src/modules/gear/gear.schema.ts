import { z } from "zod";
export const createGearSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z
      .string()
      .min(10, "Provide a description of at least 10 characters"),
    specifications: z.object({}).optional(),
    brand: z.string().min(2, "Brand must be at least 2 characters"),
    pricePerDay: z.number().positive("Price per day must be a positive number"),
    stock: z.number().int().nonnegative("Stock cannot be negative").optional(),
    categoryId: z.string().uuid("Invalid category UUID format"),
    isAvailable: z.boolean(),
  }),
});

export const updateGearSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    specifications: z.object({}).optional(),
    brand: z.string().min(2).optional(),
    pricePerDay: z.number().positive().optional(),
    stock: z.number().int().nonnegative().optional(),
    categoryId: z.string().uuid().optional(),
    isAvailable: z.boolean().optional(),
  }),
});
