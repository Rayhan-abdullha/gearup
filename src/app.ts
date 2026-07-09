import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import { userRoutes } from "./modules/users/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { notFound } from "./middlewares/notFound";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { providerRoutes } from "./modules/provider/provider.routes";
import { gearRoutes } from "./modules/gear/gear.routes";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/provider", providerRoutes);
app.use("/api/v1/gear", gearRoutes);

app.use(notFound);
app.use(globalErrorHandler);
export default app;
