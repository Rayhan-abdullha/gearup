import { catchAsync } from "../../utils/catchAsync"; // Adhering to your pattern
import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { rentalServices } from "./rental.service";
const createRentalOrder = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const orderData = req.body;
    const result = await rentalServices.createRentalOrder(userId, orderData);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Rental order placed successfully",
        data: result,
    });
});
const getUserRentals = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const result = await rentalServices.getUserRentals(userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental orders retrieved successfully",
        data: result,
    });
});
const getRentalDetails = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const orderId = req.params.id;
    const result = await rentalServices.getRentalDetails(orderId, userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental order details retrieved successfully",
        data: result,
    });
});
export const rentalControllers = {
    createRentalOrder,
    getUserRentals,
    getRentalDetails,
};
//# sourceMappingURL=rental.controller.js.map