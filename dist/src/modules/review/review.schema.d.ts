import { z } from "zod";
export declare const createReviewSchema: z.ZodObject<{
    body: z.ZodObject<{
        gearId: z.ZodString;
        rating: z.ZodNumber;
        comment: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=review.schema.d.ts.map