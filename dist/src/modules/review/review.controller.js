import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";
import { reviewServices } from "./review.services";
import { sendResponse } from "../../utils/sendResponse";
const createReview = catchAsync(async (req, res, next) => {
    const customerId = req.user.id;
    const orderId = req.params.id;
    const reviewData = req.body;
    const result = await reviewServices.createReview(customerId, orderId, reviewData);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Review submitted successfully! Thank you for your feedback",
        data: result,
    });
});
export const reviewController = {
    createReview,
};
//# sourceMappingURL=review.controller.js.map