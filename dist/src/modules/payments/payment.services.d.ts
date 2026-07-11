import { IPaymentIntentInput } from "./payment.interface";
export declare const paymentServices: {
    createPaymentIntent: (userId: string, payload: IPaymentIntentInput) => Promise<{
        checkoutUrl: string | null;
        sessionId: string;
    }>;
    confirmPaymentWebhook: (signature: string, rawBody: Buffer) => Promise<{
        id: string;
        status: import("../../../generated/prisma/enums").PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        transactionId: string;
        orderId: string;
        amount: number;
        gateway: string;
        gatewayPayload: import("@prisma/client/runtime/client").JsonValue | null;
    } | {
        received: boolean;
    }>;
    getPaymentHistory: (userId: string) => Promise<({
        order: {
            id: string;
            status: import("../../../generated/prisma/enums").OrderStatus;
            totalAmount: number;
        };
    } & {
        id: string;
        status: import("../../../generated/prisma/enums").PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        transactionId: string;
        orderId: string;
        amount: number;
        gateway: string;
        gatewayPayload: import("@prisma/client/runtime/client").JsonValue | null;
    })[]>;
    getPaymentDetails: (paymentId: string, userId: string) => Promise<{
        order: {
            id: string;
            status: import("../../../generated/prisma/enums").OrderStatus;
            createdAt: Date;
            updatedAt: Date;
            totalAmount: number;
            paymentStatus: import("../../../generated/prisma/enums").PaymentStatus;
            transactionId: string | null;
            customerId: string;
        };
    } & {
        id: string;
        status: import("../../../generated/prisma/enums").PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        transactionId: string;
        orderId: string;
        amount: number;
        gateway: string;
        gatewayPayload: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
};
//# sourceMappingURL=payment.services.d.ts.map