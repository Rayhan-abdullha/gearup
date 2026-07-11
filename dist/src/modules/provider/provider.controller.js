import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { providerServices } from "./provider.services";
const createGear = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const createdGear = await providerServices.createGear({
        ...payload,
        providerId: req.user?.id,
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear created successfully",
        data: {
            ...createdGear,
        },
    });
});
const updateGear = catchAsync(async (req, res, next) => {
    const gearId = req.params.id;
    const providerId = req.user.id; // Pulled from your auth session payload
    const updateData = req.body;
    const result = await providerServices.updateGear(gearId, providerId, updateData);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear listing updated successfully",
        data: result,
    });
});
const deleteGear = catchAsync(async (req, res, next) => {
    const gearId = req.params.id;
    const providerId = req.user.id;
    await providerServices.deleteGear(gearId, providerId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear listing removed from inventory successfully",
        data: null,
    });
});
const getGearOrders = catchAsync(async (req, res, next) => {
    const providerId = req.user.id;
    const result = await providerServices.getGearOrders(providerId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Incoming rental orders retrieved successfully",
        data: result,
    });
});
const updateGearOrder = catchAsync(async (req, res, next) => {
    const orderId = req.params.id;
    const providerId = req.user.id;
    const { status } = req.body; // Expects {"status": "CONFIRMED" | "PICKED_UP"}
    const result = await providerServices.updateGearOrder(orderId, providerId, status);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: `Rental status updated to ${status} successfully`,
        data: result,
    });
});
const createCategory = catchAsync(async (req, res, next) => {
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
});
const getCategories = catchAsync(async (req, res, next) => {
    const categories = await providerServices.getCategories();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Categories fetched successfully",
        data: {
            categories,
        },
    });
});
export const providerController = {
    createGear,
    createCategory,
    getCategories,
    updateGear,
    deleteGear,
    getGearOrders,
    updateGearOrder,
};
//# sourceMappingURL=provider.controller.js.map