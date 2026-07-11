export declare const Role: {
    readonly CUSTOMER: "CUSTOMER";
    readonly PROVIDER: "PROVIDER";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly SUSPENDED: "SUSPENDED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const OrderStatus: {
    readonly PENDING: "PENDING";
    readonly PLACED: "PLACED";
    readonly CONFIRMED: "CONFIRMED";
    readonly PICKED_UP: "PICKED_UP";
    readonly RETURNED: "RETURNED";
    readonly CANCELLED: "CANCELLED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const PaymentStatus: {
    readonly PENDING: "PENDING";
    readonly PAID: "PAID";
    readonly FAILED: "FAILED";
    readonly REFUNDED: "REFUNDED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
//# sourceMappingURL=enums.d.ts.map