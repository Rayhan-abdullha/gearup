import { Router } from "express";
import { Role } from "../users/user.interface";
import { auth } from "../../middlewares/auth";
import { reviewController } from "./review.controller";
import validateRequest from "../../middlewares/zodValidationRequest";
import { createReviewSchema } from "./review.schema";
const router = Router();
router.post("/", auth(Role.CUSTOMER), validateRequest(createReviewSchema), reviewController.createReview);
export const reviewRoutes = router;
//# sourceMappingURL=review.routes.js.map