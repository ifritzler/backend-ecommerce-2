function isAuth(req, res, next) {
  const authenticated = req.session.user;
  if (!authenticated) {
    return res.redirect(`/login?next=${req.url}`);
  }
  return next();
}
module.exports = isAuth;
