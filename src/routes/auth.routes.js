import { Router } from "express";
import HttpError from "../common/http.errors.js";
import authService from "../services/auth.service.js";
import userService from "../services/user.service.js";

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const nextUrl = req.query.next || "/";

    const logedIn = await authService.login(email, password);
    if (!logedIn)
      throw new HttpError("Credenciales incorrectas.", 401, [
        "email",
        "password",
      ]);

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
    res.status(201).json({
      user,
      statusCode: 201,
      message: "Created",
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

export default router;
