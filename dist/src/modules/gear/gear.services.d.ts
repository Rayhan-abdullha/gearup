import { IGearFilters } from "./gear.interface";
export declare const gearServices: {
    getAllGears: (filters: IGearFilters) => Promise<({
        category: {
            name: string;
            slug: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        brand: string;
        specifications: import("@prisma/client/runtime/client").JsonValue | null;
        pricePerDay: number;
        stock: number;
        isAvailable: boolean;
        providerId: string;
        categoryId: string;
    })[]>;
    getCategories: () => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
    }[]>;
    getSingleGear: (gearId: string) => Promise<{
        reviews: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            customerId: string;
            gearId: string;
            rating: number;
            comment: string | null;
        }[];
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        brand: string;
        specifications: import("@prisma/client/runtime/client").JsonValue | null;
        pricePerDay: number;
        stock: number;
        isAvailable: boolean;
        providerId: string;
        categoryId: string;
    }>;
};
//# sourceMappingURL=gear.services.d.ts.map