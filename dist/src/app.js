import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import config from "./config";
import { userRoutes } from "./modules/users/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { notFound } from "./middlewares/notFound";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { providerRoutes } from "./modules/provider/provider.routes";
import { gearRoutes } from "./modules/gear/gear.routes";
import rentalRoutes from "./modules/rental/rental.routes";
import adminRoutes from "./modules/admin/admin.routes";
import paymentRoutes from "./modules/payments/payment.routes";
const app = express();
app.use(cors({
    origin: config.app_url,
    credentials: true,
}));
app.use("/api/v1/payments/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/provider", providerRoutes);
app.use("/api/v1/gear", gearRoutes);
app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use(notFound);
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map