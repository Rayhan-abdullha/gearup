import { z } from "zod";
export declare const registerSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        role: z.ZodEnum<{
            CUSTOMER: "CUSTOMER";
            PROVIDER: "PROVIDER";
            ADMIN: "ADMIN";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=user.schema.d.ts.map