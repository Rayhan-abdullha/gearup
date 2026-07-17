import { z } from "zod";
export declare const updateOrderStatusSchema: z.ZodObject<{
    body: z.ZodObject<{
        status: z.ZodEnum<{
            CONFIRMED: "CONFIRMED";
            PICKED_UP: "PICKED_UP";
            RETURNED: "RETURNED";
            CANCELLED: "CANCELLED";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const categorySchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        slug: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=provider.schema.d.ts.map