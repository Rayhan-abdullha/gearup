import { z } from "zod";
export declare const createRentalSchema: z.ZodObject<{
    body: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            gearId: z.ZodString;
            quantity: z.ZodNumber;
            startDate: z.ZodString;
            endDate: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=rental.schema.d.ts.map