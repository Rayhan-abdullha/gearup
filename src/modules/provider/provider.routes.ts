import { Router } from "express";
import { providerController } from "./provider.controller";
import { Role } from "../users/user.interface";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post(
  "/gear",
  auth(Role.PROVIDER, Role.ADMIN, Role.CUSTOMER),
  providerController.createGear,
);
router.put(
  "/gear/:id",
  auth(Role.PROVIDER, Role.ADMIN),
  providerController.updateGear,
);
router.delete(
  "/gear/:id",
  auth(Role.PROVIDER, Role.ADMIN),
  providerController.deleteGear,
);
// router.get("/provider/gear/orders", providerController.getGearOrders);
// router.patch("/provider/gear/orders/:id", providerController.updateGearOrder);
router.post(
  "/gear/category",
  auth(Role.PROVIDER, Role.ADMIN),
  providerController.createCategory,
);
router.get(
  "/gear/categories",
  auth(Role.PROVIDER, Role.ADMIN, Role.CUSTOMER),
  providerController.getCategories,
);

export const providerRoutes = router;
