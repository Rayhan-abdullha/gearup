import { paymentServices } from "./payment.services";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const createPaymentIntent = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const paymentData = req.body; // Expects orderId and gateway string
    const result = await paymentServices.createPaymentIntent(userId, paymentData);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Payment session initialized successfully",
        data: result,
    });
});
const getPaymentHistory = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const result = await paymentServices.getPaymentHistory(userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment history transactions loaded",
        data: result,
    });
});
const getPaymentDetails = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const paymentId = req.params.id;
    const result = await paymentServices.getPaymentDetails(paymentId, userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment transaction details retrieved",
        data: result,
    });
});
export const paymentControllers = {
    createPaymentIntent,
    getPaymentHistory,
    getPaymentDetails,
};
//# sourceMappingURL=payment.controller.js.map