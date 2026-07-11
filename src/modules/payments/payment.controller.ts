import { Request, Response, NextFunction } from "express";
import { paymentServices } from "./payment.services";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createPaymentIntent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id;
    const paymentData = req.body; // Expects orderId and gateway string

    const result = await paymentServices.createPaymentIntent(
      userId,
      paymentData,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Payment session initialized successfully",
      data: result,
    });
  },
);

const getPaymentHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id;

    const result = await paymentServices.getPaymentHistory(userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment history transactions loaded",
      data: result,
    });
  },
);
const getPaymentDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id;
    const paymentId = req.params.id as string;

    const result = await paymentServices.getPaymentDetails(paymentId, userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment transaction details retrieved",
      data: result,
    });
  },
);

export const paymentControllers = {
  createPaymentIntent,
  getPaymentHistory,
  getPaymentDetails,
};
