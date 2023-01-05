import { Router } from "express";
import { products } from "../common/database.js";

const router = Router();

router.get("/", (_req, res) => {
  res.render("pages/home", { title: "Ecommerce home", products: products });
});

router.get("/nuevo-producto", (_req, res) => {
  res.render("pages/nuevo-producto", { title: "Nuevo producto" });
});

export default router;
