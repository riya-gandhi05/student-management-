const express = require("express");
const bcrypt = require("bcrypt");

const { createUser, getUserByEmail } = require("../models/user.model");

const router = express.Router();

const allowedRoles = ["student", "teacher", "admin"];

router.get("/login", (req, res) => {
  if (req.session.user) return res.redirect("/dashboard");
  res.render("auth/login", {
    error: req.query.error || null,
    message: req.query.msg || null,
  });
});

router.get("/register", (req, res) => {
  if (req.session.user) return res.redirect("/dashboard");
  res.render("auth/register", {
    error: req.query.error || null,
    message: req.query.msg || null,
  });
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.redirect("/register?error=" + encodeURIComponent("All fields are required"));
    }
    if (!allowedRoles.includes(role)) {
      return res.redirect("/register?error=" + encodeURIComponent("Invalid role"));
    }

    await createUser({ name, email, password, role });
    return res.redirect("/login?msg=" + encodeURIComponent("Registration successful. Please login."));
  } catch (err) {
    // Most common error: duplicate email.
    return res.redirect("/register?error=" + encodeURIComponent("Registration failed. Check email/role."));
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.redirect("/login?error=" + encodeURIComponent("Email and password are required"));
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return res.redirect("/login?error=" + encodeURIComponent("User not found"));
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return res.redirect("/login?error=" + encodeURIComponent("Wrong password"));
  }

  req.session.user = { id: user.id, name: user.name, email: user.email, role: user.role };
  return res.redirect("/dashboard");
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;

