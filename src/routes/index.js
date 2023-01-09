import { Router } from "express";
import clientRoutes from "./client.routes.js";
import authRoutes from "./auth.routes.js";

const router = Router();

router.use(clientRoutes);

router.use("/api/auth", authRoutes);
export default router;
