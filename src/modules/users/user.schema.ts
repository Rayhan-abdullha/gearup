import { z } from "zod";
export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum(["CUSTOMER", "PROVIDER", "ADMIN"], {
      message: "Role selection is required (CUSTOMER or PROVIDER or ADMIN)",
    }),
  }),
});
