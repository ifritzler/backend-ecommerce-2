export function isAuth(req, res, next) {
  const authenticated = true;
  if (!authenticated) {
    return res.redirect("/login");
  }
  next();
}
