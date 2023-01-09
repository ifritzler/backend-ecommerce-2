import { Router } from "express";
import authService from "../services/auth.service.js";
import userService from "../services/user.service.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const logedIn = await authService.login(email, password);
  if (!logedIn) {
    return res.status(401).json({
      statusCode: 401,
      error: "email or password incorrect",
      message: "401 Unauthorized",
    });
  }

  req.session.user = logedIn;
  res.redirect("/");
});

router.post("/register", async (req, res) => {
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
    res.status(400).json({
      statusCode: 400,
      error: err.message,
      message: "bad request",
    });
  }
});

export default router;
