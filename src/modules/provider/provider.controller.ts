import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { providerServices } from "./provider.services";

const createGear = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    console.log("Payload received in createGear:", payload);

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
    const gearId = req.params.id as string;
    const providerId = (req as any).user.id; // Pulled from your auth session payload
    const updateData = req.body;

    const result = await providerServices.updateGear(
      gearId,
      providerId,
      updateData,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Gear listing updated successfully",
      data: result,
    });
  },
);

const deleteGear = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const gearId = req.params.id as string;
    const providerId = (req as any).user.id;

    await providerServices.deleteGear(gearId, providerId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Gear listing removed from inventory successfully",
      data: null,
    });
  },
);

const getGearOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const providerId = (req as any).user.id;

    const result = await providerServices.getGearOrders(providerId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Incoming rental orders retrieved successfully",
      data: result,
    });
  },
);

const updateGearOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.id as string;
    const providerId = (req as any).user.id;
    const { status } = req.body; // Expects {"status": "CONFIRMED" | "PICKED_UP"}

    const result = await providerServices.updateGearOrder(
      orderId,
      providerId,
      status,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `Rental status updated to ${status} successfully`,
      data: result,
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

const getOverview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const providerId = (req as any).user.id;
    const overview = await providerServices.getProviderOverview(providerId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Overview fetched successfully",
      data: overview,
    });
  },
);
export const providerController = {
  createGear,
  createCategory,
  getCategories,
  updateGear,
  deleteGear,
  getGearOrders,
  updateGearOrder,
  getOverview,
};
