import { Router } from "express";
import { rentalControllers } from "./rental.controller";
import { Role } from "../users/user.interface";
import { auth } from "../../middlewares/auth";
import validateZodRequest from "../../middlewares/zodValidationRequest";
import { createRentalSchema } from "./rental.schema";
const router = Router();
router.post("/", auth(Role.CUSTOMER, Role.ADMIN, Role.PROVIDER), validateZodRequest(createRentalSchema), rentalControllers.createRentalOrder);
router.get("/me", auth(Role.CUSTOMER, Role.ADMIN, Role.PROVIDER), rentalControllers.getUserRentals);
router.get("/:id", auth(Role.CUSTOMER, Role.ADMIN, Role.PROVIDER), rentalControllers.getRentalDetails);
router.patch("/orders/:id", auth(Role.CUSTOMER), rentalControllers.updateRentalOrder);
export default router;
//# sourceMappingURL=rental.routes.js.map