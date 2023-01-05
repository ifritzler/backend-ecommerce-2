export function isAdmin(req, res, next) {
  const admin = true;
  if (!admin) {
    return res.status(403).send();
  }
  next();
}
