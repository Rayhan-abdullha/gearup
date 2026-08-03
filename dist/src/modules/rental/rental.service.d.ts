import { IRentalOrderInput } from "./rental.interface";
export declare const rentalServices: {
    createRentalOrder: (userId: string, payload: IRentalOrderInput) => Promise<{
        items: {
            id: string;
            quantity: number;
            priceAtRent: number;
            startDate: Date;
            endDate: Date;
            orderId: string;
            gearId: string;
        }[];
    } & {
        id: string;
        status: import("../../../generated/prisma/enums").OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        totalAmount: number;
        paymentStatus: import("../../../generated/prisma/enums").PaymentStatus;
        transactionId: string | null;
        customerId: string;
    }>;
    getUserRentals: (userId: string) => Promise<({
        items: ({
            gear: {
                title: string;
                brand: string;
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
        review: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            customerId: string;
            orderId: string;
            gearId: string;
            rating: number;
            comment: string | null;
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
    getRentalDetails: (orderId: string, userId: string) => Promise<{
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
    }>;
    updateRentalOrder: (orderId: string, customerId: string, status: "RETURNED" | "CANCELLED") => Promise<{
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
//# sourceMappingURL=rental.service.d.ts.map