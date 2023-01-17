const { Router } = require("express");
const products = require("../common/database");
const isAdmin = require("../middlewares/isAdmin");
const isAuth = require("../middlewares/isAuth");

const router = Router();

router.get("/", (req, res) => {
  res.render("pages/home", {
    title: "Lookte Ecommerce",
    products,
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
  return res.render("pages/login", {
    title: "Lookte - Inicia sesion",
    isAuth: req.session.user,
  });
});

router.get("/logout", isAuth, (req, res) => {
  if (req.session.user) {
    const { user } = req.session;
    const name = user.fullname;
    req.session.destroy();
    res.render("pages/bye", { isAuth: req.session.user, name });
  }
  return res.redirect("/");
});
router.get("/register", (req, res) => {
  res.render("pages/register", {
    title: "Lookte - Registrate",
    isAuth: req.session.user,
  });
});

module.exports = router;
