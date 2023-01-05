import { Router } from "express";
import clientRoutes from "./client.routes.js";

const router = Router();
router.use(clientRoutes);

export default router;
