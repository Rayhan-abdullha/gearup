import { prisma } from "../../lib/prisma";
import { IReviewInput } from "./review.interface";

const createReview = async (customerId: string, payload: IReviewInput) => {
  const { gearId, rating, comment } = payload;

  if (!rating || rating < 1 || rating > 5) {
    throw new Error("Rating must be an integer between 1 and 5");
  }

  if (!gearId) {
    throw new Error("Gear ID is required to submit a review");
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
    throw new Error(
      "You can only review gear items that you have successfully rented and returned",
    );
  }
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
