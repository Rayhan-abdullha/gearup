import { Router } from "express";
import { gearController } from "./gear.controller";
const router = Router();
router.get("/", gearController.getAllGears);
router.get("/categories", gearController.getCategories);
router.get("/:id", gearController.getSingleGear);
export const gearRoutes = router;
//# sourceMappingURL=gear.routes.js.map