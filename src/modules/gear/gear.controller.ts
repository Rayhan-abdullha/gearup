import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { gearServices } from "./gear.services";

const getAllGears = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = req.query;
    const gears = await gearServices.getAllGears(filters);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Gears retrieved successfully",
      data: gears,
    });
  },
);

const getSingleGear = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const updatedGear = await gearServices.getSingleGear(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Gear updated successfully",
      data: updatedGear,
    });
  },
);

const getCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("getCategories called");
    const categories = await gearServices.getCategories();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Categories fetched successfully",
      data: {
        ...categories,
      },
    });
  },
);
export const gearController = {
  getAllGears,
  getSingleGear,
  getCategories,
};
