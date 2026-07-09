import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { providerServices } from "./provider.services";

const createGear = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const createdGear = await providerServices.createGear({
      ...payload,
      providerId: req.user?.id as string,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Gear created successfully",
      data: {
        ...createdGear,
      },
    });
  },
);

const updateGear = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const payload = req.body;
    const providerId = req.user?.id as string;

    const updatedGear = await providerServices.updateGear(
      id,
      providerId,
      payload,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Gear updated successfully",
      data: updatedGear,
    });
  },
);

const deleteGear = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const providerId = req.user?.id as string;

    await providerServices.deleteGear(id, providerId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Gear deleted successfully",
      data: null, // Commonly return null or the deleted ID
    });
  },
);

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const createdCategory = await providerServices.createCategory(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Category created successfully",
      data: {
        ...createdCategory,
      },
    });
  },
);

const getCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await providerServices.getCategories();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Categories fetched successfully",
      data: {
        categories,
      },
    });
  },
);
export const providerController = {
  createGear,
  createCategory,
  getCategories,
  updateGear,
  deleteGear,
};
