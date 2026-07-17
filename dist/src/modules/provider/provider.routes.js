import { Router } from "express";
import { providerController } from "./provider.controller";
import { Role } from "../users/user.interface";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/zodValidationRequest";
import { createGearSchema, updateGearSchema } from "../gear/gear.schema";
import { categorySchema, updateOrderStatusSchema } from "./provider.schema";
const router = Router();
router.post("/gear", auth(Role.PROVIDER), validateRequest(createGearSchema), providerController.createGear);
router.put("/gear/:id", auth(Role.PROVIDER), validateRequest(updateGearSchema), providerController.updateGear);
router.delete("/gear/:id", auth(Role.PROVIDER), providerController.deleteGear);
router.get("/orders", auth(Role.PROVIDER), providerController.getGearOrders);
router.patch("/orders/:id", auth(Role.PROVIDER), validateRequest(updateOrderStatusSchema), providerController.updateGearOrder);
router.post("/gear/category", auth(Role.PROVIDER), validateRequest(categorySchema), providerController.createCategory);
router.get("/gear/category", auth(Role.PROVIDER), providerController.getCategories);
export const providerRoutes = router;
//# sourceMappingURL=provider.routes.js.map