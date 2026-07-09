import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";
import { adminServices } from "./admin.services";
import { sendResponse } from "../../utils/sendResponse";
import { UserStatus } from "./admin.interface";

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminServices.getAllUsers();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All user records retrieved successfully by admin",
      data: result,
    });
  },
);

const updateUserStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id as string;
    const { status } = req.body as { status: UserStatus };

    const result = await adminServices.updateUserStatus(userId, status);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `User status successfully updated to ${status}`,
      data: result,
    });
  },
);

const getAllGears = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminServices.getAllGears();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All marketplace gear listings retrieved successfully by admin",
      data: result,
    });
  },
);

const getAllRentals = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminServices.getAllRentals();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All global rental transactions loaded successfully by admin",
      data: result,
    });
  },
);

export const adminControllers = {
  getAllUsers,
  updateUserStatus,
  getAllGears,
  getAllRentals,
};
