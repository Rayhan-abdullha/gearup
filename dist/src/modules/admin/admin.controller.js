import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";
import { adminServices } from "./admin.services";
import { sendResponse } from "../../utils/sendResponse";
const getAllUsers = catchAsync(async (req, res, next) => {
    const result = await adminServices.getAllUsers();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All user records retrieved successfully by admin",
        data: result,
    });
});
const updateUserStatus = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    const { status } = req.body;
    const result = await adminServices.updateUserStatus(userId, status);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: `User status successfully updated to ${status}`,
        data: result,
    });
});
const getAllGears = catchAsync(async (req, res, next) => {
    const result = await adminServices.getAllGears();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All marketplace gear listings retrieved successfully by admin",
        data: result,
    });
});
const getAllRentals = catchAsync(async (req, res, next) => {
    const result = await adminServices.getAllRentals();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All global rental transactions loaded successfully by admin",
        data: result,
    });
});
export const adminControllers = {
    getAllUsers,
    updateUserStatus,
    getAllGears,
    getAllRentals,
};
//# sourceMappingURL=admin.controller.js.map