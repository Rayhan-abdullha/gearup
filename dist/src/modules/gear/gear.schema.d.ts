import { z } from "zod";
export declare const createGearSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
        specifications: z.ZodOptional<z.ZodObject<{}, z.core.$strip>>;
        brand: z.ZodString;
        images: z.ZodOptional<z.ZodArray<z.ZodString>>;
        pricePerDay: z.ZodNumber;
        stock: z.ZodOptional<z.ZodNumber>;
        categoryId: z.ZodString;
        isAvailable: z.ZodBoolean;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateGearSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        specifications: z.ZodOptional<z.ZodObject<{}, z.core.$strip>>;
        brand: z.ZodOptional<z.ZodString>;
        pricePerDay: z.ZodOptional<z.ZodNumber>;
        stock: z.ZodOptional<z.ZodNumber>;
        categoryId: z.ZodOptional<z.ZodString>;
        isAvailable: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=gear.schema.d.ts.map