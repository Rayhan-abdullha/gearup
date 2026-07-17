import { z } from "zod";
export declare const updateUserStatusSchema: z.ZodObject<{
    body: z.ZodObject<{
        status: z.ZodEnum<{
            ACTIVE: "ACTIVE";
            SUSPENDED: "SUSPENDED";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=admin.schema.d.ts.map