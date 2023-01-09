import { Router } from "express";
import { products } from "../common/database.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("pages/home", {
    title: "Lookte Ecommerce",
    products: products,
    isAuth: req.session.user,
  });
});

router.get("/nuevo-producto", isAuth, isAdmin, (req, res) => {
  res.render("pages/nuevo-producto", {
    title: "Lookte - Nuevo producto",
    isAuth: req.session.user,
  });
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }
  res.render("pages/login", {
    title: "Lookte - Inicia sesion",
    isAuth: req.session.user,
  });
});

router.get("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy();
  }
  return res.redirect("/");
});

router.get("/register", (req, res) => {
  res.render("pages/register", {
    title: "Lookte - Registrate",
    isAuth: req.session.user,
  });
});

export default router;
