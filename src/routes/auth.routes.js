const { Router } = require("express");
const _ = require("lodash");
const HttpError = require("../common/http.errors");
const authService = require("../services/auth.service");
const userService = require("../services/user.service");

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const nextUrl = req.query.next || "/";

    const logedIn = await authService.login(email, password);
    if (!logedIn) {
      return next(new HttpError("Credenciales incorrectas.", 401, [
        "email",
        "password",
      ]))
    }

    req.session.user = logedIn;
    res.status(301).redirect(nextUrl);
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const data = req.body;
    const user = await userService.create(data);
    if (!_.isEmpty(user.errors)) {
      return next(new HttpError("Bad request", 200, user.errors))
    }

    return res.status(201).json({
      user,
      statusCode: 201,
      message: "Created",
    });
  } catch (err) {
    if (err.message === "Email exists yet") {
      next(
        new HttpError("Email has been exists", 400, [
          ["email", "Email has been exists"],
        ])
      );
    }

    next(err);
  }
});

module.exports = router;
