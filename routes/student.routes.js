const express = require("express");

const { requireRole } = require("../middleware/auth.middleware");

const subjectModel = require("../models/subject.model");
const marksModel = require("../models/marks.model");
const attendanceModel = require("../models/attendance.model");

const router = express.Router();

router.use(requireRole("student"));

router.get("/", async (req, res) => {
  const studentId = req.session.user.id;

  const subjects = await subjectModel.getSubjectsForStudent(studentId);
  const marks = await marksModel.getMarksForStudent(studentId);
  const attendance = await attendanceModel.getAttendanceForStudent(studentId);

  const totalClasses = attendance.length;
  const present = attendance.filter((a) => a.status === "Present").length;
  const percentage = totalClasses > 0 ? (present / totalClasses) * 100 : 0;

  res.render("student/index", {
    message: req.query.msg || null,
    error: req.query.error || null,
    subjects,
    marks,
    attendance,
    attendanceSummary: {
      totalClasses,
      present,
      percentage: percentage.toFixed(2),
    },
  });
});

module.exports = router;

