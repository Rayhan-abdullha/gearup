import { UserStatus } from "./admin.interface";
export declare const adminServices: {
    getAllUsers: () => Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").UserStatus;
        createdAt: Date;
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            phoneNumber: string | null;
            avatarUrl: string | null;
            bio: string | null;
            deliveryAddress: string | null;
            city: string | null;
            postalCode: string | null;
            shopName: string | null;
            shopAddress: string | null;
            payoutDetails: import("@prisma/client/runtime/client").JsonValue | null;
            userId: string;
        } | null;
    }[]>;
    updateUserStatus: (userId: string, status: UserStatus) => Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").UserStatus;
    }>;
    getAllGears: () => Promise<({
        provider: {
            email: string;
            name: string;
        };
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
        images: string[];
        providerId: string;
        categoryId: string;
    })[]>;
    getAllRentals: () => Promise<({
        customer: {
            email: string;
            name: string;
        };
        items: ({
            gear: {
                title: string;
                brand: string;
                pricePerDay: number;
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
};
//# sourceMappingURL=admin.services.d.ts.map