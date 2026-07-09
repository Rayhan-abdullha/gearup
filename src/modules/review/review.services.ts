import { prisma } from "../../lib/prisma";
import { IReviewInput } from "./review.interface";

const createReview = async (customerId: string, payload: IReviewInput) => {
  const { gearId, rating, comment } = payload;

  // 1. Validation: Ensure rating falls within the 1-5 star limit
  if (!rating || rating < 1 || rating > 5) {
    throw new Error("Rating must be an integer between 1 and 5");
  }

  if (!gearId) {
    throw new Error("Gear ID is required to submit a review");
  }

  // 2. Strict Verification Guard: Verify the customer actually rented this item and completed the trip
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
    throw new Error(
      "You can only review gear items that you have successfully rented and returned",
    );
  }

  // 3. Existing Review Check: Prevent duplicate review spamming
  const dynamicExistingReview = await prisma.review.findUnique({
    where: {
      customerId_gearId: {
        customerId,
        gearId,
      },
    },
  });

  if (dynamicExistingReview) {
    throw new Error("You have already submitted a review for this gear item");
  }

  // 4. Create the final Review log block
  return await prisma.review.create({
    data: {
      customerId,
      gearId,
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
