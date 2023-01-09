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

router.get("/login", (_req, res) => {
  res.render("pages/login", { title: "Lookte - Inicia sesion" });
});

router.get("/register", (_req, res) => {
  res.render("pages/register", { title: "Lookte - Registrate" });
});

export default router;
