import { prisma } from "../../lib/prisma";
const createReview = async (customerId, orderId, payload) => {
    const { gearId, rating, comment } = payload;
    if (!rating || rating < 1 || rating > 5) {
        throw new Error("Rating must be an integer between 1 and 5");
    }
    if (!gearId || !orderId) {
        throw new Error("order ID is required to submit a review");
    }
    const validOrder = await prisma.order.findFirst({
        where: {
            customerId: customerId,
            status: "RETURNED", // Must be returned based on your flow diagram
            items: {
                some: {
                    gearId: gearId,
                },
            },
        },
    });
    if (!validOrder) {
        throw new Error("You can only review gear items that you have successfully rented and returned");
    }
    return await prisma.review.create({
        data: {
            customerId,
            gearId,
            orderId,
            rating,
            comment,
        },
        include: {
            gear: {
                select: { title: true, brand: true },
            },
        },
    });
};
export const reviewServices = {
    createReview,
};
//# sourceMappingURL=review.services.js.map