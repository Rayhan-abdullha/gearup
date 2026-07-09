import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { userService } from "./services";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Role } from "../../../generated/prisma/client";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await userService.registerUserIntoDB(payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User created successfully !",
      data: result,
    });
  },
);

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const result = await userService.getMyProfileFromDB(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile fetched successfully !",
      data: result,
    });
  },
);

const updateMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const payload = req.body;
    const result = await userService.updateMyProfileInDB(userId, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile updated successfully !",
      data: result,
    });
  },
);

export const userController = {
  registerUser,
  getMyProfile,
  updateMyProfile,
};
