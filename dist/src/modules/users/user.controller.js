import httpStatus from "http-status";
import { userService } from "./user.services";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
const registerUser = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const result = await userService.registerUserIntoDB(payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User created successfully !",
        data: result,
    });
});
const getMyProfile = catchAsync(async (req, res, next) => {
    const userId = req.user?.id;
    const result = await userService.getMyProfileFromDB(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile fetched successfully !",
        data: result,
    });
});
const updateMyProfile = catchAsync(async (req, res, next) => {
    const userId = req.user?.id;
    const payload = req.body;
    const result = await userService.updateMyProfileInDB(userId, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile updated successfully !",
        data: result,
    });
});
export const userController = {
    registerUser,
    getMyProfile,
    updateMyProfile,
};
//# sourceMappingURL=user.controller.js.map