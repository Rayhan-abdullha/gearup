import { IReviewInput } from "./review.interface";
export declare const reviewServices: {
    createReview: (customerId: string, orderId: string, payload: IReviewInput) => Promise<{
        gear: {
            title: string;
            brand: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        orderId: string;
        gearId: string;
        rating: number;
        comment: string | null;
    }>;
};
//# sourceMappingURL=review.services.d.ts.map