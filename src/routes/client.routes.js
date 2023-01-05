import { Router } from "express";
import { products } from "../common/database.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.get("/", (_req, res) => {
  res.render("pages/home", { title: "Lookte Ecommerce", products: products });
});

router.get("/nuevo-producto", isAdmin, (_req, res) => {
  res.render("pages/nuevo-producto", { title: "Lookte - Nuevo producto" });
});

export default router;
