function requireLogin(req, res, next) {
  if (!req.session.user) return res.redirect("/login");
  next();
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.session.user) return res.redirect("/login");
    if (!roles.includes(req.session.user.role)) {
      return res.status(403).render("error", { message: "Forbidden" });
    }
    next();
  };
}

module.exports = { requireLogin, requireRole };

