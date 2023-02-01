const { Router, json } = require("express");
const products = require("../common/database");
const isAdmin = require("../middlewares/isAdmin");
const isAuth = require("../middlewares/isAuth");

const router = Router();
var argv = require('minimist')(process.argv.slice(2), {
  alias: {
    p: 'port'
  },
});

delete argv._

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

router.get("/info", (_req, res) => {
  res.render("pages/info", {
    title: "Info",
    info: {
      args: Object.entries(argv),
      path: process.execPath,
      platform: process.platform,
      processId: process.pid,
      nodeVersion: process.version,
      folder: process.cwd(),
      rss: process.memoryUsage.rss(),
    },
    isAuth: false
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
