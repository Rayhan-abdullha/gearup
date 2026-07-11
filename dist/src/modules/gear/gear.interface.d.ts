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
export interface IGearFilters {
    categoryName?: string;
    searchTerm?: string;
    categoryId?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    isAvailable?: string;
}
//# sourceMappingURL=gear.interface.d.ts.map