import { IGear, ICategory } from "./provider.interface";
import { OrderStatus } from "./provider.interface";
export declare const providerServices: {
    createGear: (payload: IGear) => Promise<{
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
    createCategory: (payload: ICategory) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
    }>;
    getCategories: () => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
    }[]>;
    updateGear: (gearId: string, providerId: string, payload: any) => Promise<{
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
    deleteGear: (gearId: string, providerId: string) => Promise<{
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
    getGearOrders: (providerId: string) => Promise<({
        customer: {
            id: string;
            email: string;
            name: string;
        };
        items: ({
            gear: {
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
            };
        } & {
            id: string;
            quantity: number;
            priceAtRent: number;
            startDate: Date;
            endDate: Date;
            orderId: string;
            gearId: string;
        })[];
        payment: {
            id: string;
            status: import("../../../generated/prisma/enums").PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            transactionId: string;
            orderId: string;
            amount: number;
            gateway: string;
            gatewayPayload: import("@prisma/client/runtime/client").JsonValue | null;
        } | null;
    } & {
        id: string;
        status: import("../../../generated/prisma/enums").OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        totalAmount: number;
        paymentStatus: import("../../../generated/prisma/enums").PaymentStatus;
        transactionId: string | null;
        customerId: string;
    })[]>;
    updateGearOrder: (orderId: string, providerId: string, status: OrderStatus) => Promise<{
        id: string;
        status: import("../../../generated/prisma/enums").OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        totalAmount: number;
        paymentStatus: import("../../../generated/prisma/enums").PaymentStatus;
        transactionId: string | null;
        customerId: string;
    }>;
};
//# sourceMappingURL=provider.services.d.ts.map