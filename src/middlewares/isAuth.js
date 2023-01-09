import { urlencoded } from "express";

export function isAuth(req, res, next) {
  const authenticated = req.session.user;
  if (!authenticated) {
    return res.redirect("/login?next=" + req.url);
  }
  next();
}
