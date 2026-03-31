const express = require("express");

const { requireRole } = require("../middleware/auth.middleware");
const userModel = require("../models/user.model");

const router = express.Router();

router.use(requireRole("admin"));

const allowedRoles = ["student", "teacher", "admin"];

router.get("/", async (req, res) => {
  const users = await userModel.listUsers();
  res.render("admin/index", {
    message: req.query.msg || null,
    error: req.query.error || null,
    users,
  });
});

router.post("/users/update-role", async (req, res) => {
  try {
    const currentAdminId = req.session.user.id;
    const { userId, role } = req.body;

    if (!userId || !role || !allowedRoles.includes(role)) {
      return res.redirect("/admin?error=" + encodeURIComponent("Invalid input"));
    }

    // Prevent deleting/updating is handled elsewhere; updating your own role is allowed.
    await userModel.updateUserRole(userId, role);
    return res.redirect("/admin?msg=" + encodeURIComponent("Role updated"));
  } catch (err) {
    return res.redirect("/admin?error=" + encodeURIComponent("Could not update role"));
  }
});

router.post("/users/delete", async (req, res) => {
  try {
    const currentAdminId = req.session.user.id;
    const { userId } = req.body;

    if (!userId) return res.redirect("/admin?error=" + encodeURIComponent("User is required"));
    if (String(userId) === String(currentAdminId)) {
      return res.redirect("/admin?error=" + encodeURIComponent("You cannot delete yourself"));
    }

    await userModel.deleteUser(userId);
    return res.redirect("/admin?msg=" + encodeURIComponent("User deleted"));
  } catch (err) {
    return res.redirect("/admin?error=" + encodeURIComponent("Could not delete user"));
  }
});

module.exports = router;

