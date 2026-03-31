const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  return res.redirect("/dashboard");
});

router.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const role = req.session.user.role;
  if (role === "student") return res.redirect("/student");
  if (role === "teacher") return res.redirect("/teacher");
  if (role === "admin") return res.redirect("/admin");
  return res.redirect("/login?error=" + encodeURIComponent("Invalid role"));
});

module.exports = router;

