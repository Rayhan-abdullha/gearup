import { Router } from "express";
import { rentalControllers } from "./rental.controller";
import { Role } from "../users/user.interface";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post(
  "/",
  auth(Role.CUSTOMER, Role.ADMIN, Role.PROVIDER),
  rentalControllers.createRentalOrder,
);
router.get(
  "/",
  auth(Role.CUSTOMER, Role.ADMIN, Role.PROVIDER),
  rentalControllers.getUserRentals,
);
router.get(
  "/:id",
  auth(Role.CUSTOMER, Role.ADMIN, Role.PROVIDER),
  rentalControllers.getRentalDetails,
);

export default router;
