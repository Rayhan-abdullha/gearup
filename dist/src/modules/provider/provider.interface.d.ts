export interface IGear {
    title: string;
    description: string;
    brand: string;
    specifications?: Record<string, any>;
    pricePerDay: number;
    stock?: number;
    providerId: string;
    categoryId: string;
}
export interface ICategory {
    name: string;
    slug: string;
    description?: string;
}
export type OrderStatus = "PENDING" | "PAID" | "PLACED" | "CONFIRMED" | "PICKED_UP" | "RETURNED" | "CANCELLED";
//# sourceMappingURL=provider.interface.d.ts.map