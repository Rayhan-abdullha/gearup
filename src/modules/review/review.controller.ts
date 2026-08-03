import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";
import { reviewServices } from "./review.services";
import { sendResponse } from "../../utils/sendResponse";

const createReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerId = (req as any).user.id;
    const orderId = req.params.id as string;
    const reviewData = req.body;

    const result = await reviewServices.createReview(
      customerId,
      orderId,
      reviewData,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Review submitted successfully! Thank you for your feedback",
      data: result,
    });
  },
);

export const reviewController = {
  createReview,
};
