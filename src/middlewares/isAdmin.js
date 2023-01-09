export function isAdmin(req, res, next) {
  const admin = req.session.user.isAdmin;
  if (!admin) {
    return res.status(403).send();
  }
  next();
}
