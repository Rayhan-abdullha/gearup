import { Router } from "express";
import { providerController } from "./provider.controller";
import { Role } from "../users/user.interface";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/gear", auth(Role.PROVIDER), providerController.createGear);

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

router.get("/orders", auth(Role.PROVIDER), providerController.getGearOrders);

router.patch(
  "/orders/:id",
  auth(Role.PROVIDER),
  providerController.updateGearOrder,
);

router.post(
  "/gear/category",
  auth(Role.PROVIDER, Role.ADMIN),
  providerController.createCategory,
);

router.get(
  "/gear/category",
  auth(Role.PROVIDER, Role.ADMIN),
  providerController.getCategories,
);

export const providerRoutes = router;
