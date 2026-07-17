import { z } from "zod";
export const createReviewSchema = z.object({
    body: z.object({
        gearId: z.string().uuid("Invalid gear reference UUID"),
        rating: z
            .number()
            .int()
            .min(1, "Minimum rating is 1 star")
            .max(5, "Maximum rating is 5 stars"),
        comment: z
            .string()
            .max(500, "Comment cannot exceed 500 characters")
            .optional(),
    }),
});
//# sourceMappingURL=review.schema.js.map