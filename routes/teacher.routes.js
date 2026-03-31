const express = require("express");

const { requireRole } = require("../middleware/auth.middleware");

const userModel = require("../models/user.model");
const subjectModel = require("../models/subject.model");
const enrollmentModel = require("../models/enrollment.model");
const marksModel = require("../models/marks.model");
const attendanceModel = require("../models/attendance.model");

const router = express.Router();

router.use(requireRole("teacher"));

router.get("/", async (req, res) => {
  const teacherId = req.session.user.id;

  const subjects = await subjectModel.listSubjectsByTeacher(teacherId);
  const students = await userModel.listUsersByRole("student");

  res.render("teacher/index", {
    message: req.query.msg || null,
    error: req.query.error || null,
    subjects,
    students,
  });
});

router.post("/subjects", async (req, res) => {
  try {
    const teacherId = req.session.user.id;
    const { subjectName } = req.body;

    if (!subjectName) {
      return res.redirect("/teacher?error=" + encodeURIComponent("Subject name is required"));
    }

    await subjectModel.createSubject({ teacherId, subjectName });
    return res.redirect("/teacher?msg=" + encodeURIComponent("Subject added successfully"));
  } catch (err) {
    return res.redirect("/teacher?error=" + encodeURIComponent("Could not add subject"));
  }
});

router.post("/enroll", async (req, res) => {
  try {
    const teacherId = req.session.user.id;
    const { studentId, subjectId } = req.body;

    if (!studentId || !subjectId) {
      return res.redirect("/teacher?error=" + encodeURIComponent("Student and subject are required"));
    }

    const subject = await subjectModel.getSubjectOwnedByTeacher({ teacherId, subjectId });
    if (!subject) {
      return res.redirect("/teacher?error=" + encodeURIComponent("Invalid subject"));
    }

    const student = await userModel.getUserById(studentId);
    if (!student || student.role !== "student") {
      return res.redirect("/teacher?error=" + encodeURIComponent("Invalid student"));
    }

    await enrollmentModel.enrollStudentToSubject({ studentId, subjectId });
    return res.redirect("/teacher?msg=" + encodeURIComponent("Student enrolled successfully"));
  } catch (err) {
    return res.redirect("/teacher?error=" + encodeURIComponent("Enrollment failed"));
  }
});

router.post("/marks", async (req, res) => {
  try {
    const teacherId = req.session.user.id;
    const { studentId, subjectId, examType, marks } = req.body;

    const parsedMarks = Number(marks);
    if (!studentId || !subjectId || !examType || Number.isNaN(parsedMarks)) {
      return res.redirect("/teacher?error=" + encodeURIComponent("All fields are required"));
    }

    const subject = await subjectModel.getSubjectOwnedByTeacher({ teacherId, subjectId });
    if (!subject) return res.redirect("/teacher?error=" + encodeURIComponent("Invalid subject"));

    const student = await userModel.getUserById(studentId);
    if (!student || student.role !== "student") {
      return res.redirect("/teacher?error=" + encodeURIComponent("Invalid student"));
    }

    await marksModel.upsertMark({
      studentId,
      subjectId,
      teacherId,
      examType,
      marks: parsedMarks,
    });

    return res.redirect("/teacher?msg=" + encodeURIComponent("Marks saved successfully"));
  } catch (err) {
    return res.redirect("/teacher?error=" + encodeURIComponent("Could not save marks"));
  }
});

router.post("/attendance", async (req, res) => {
  try {
    const teacherId = req.session.user.id;
    const { studentId, subjectId, classDate, status } = req.body;

    const allowedStatuses = ["Present", "Absent"];
    if (!studentId || !subjectId || !classDate || !allowedStatuses.includes(status)) {
      return res.redirect("/teacher?error=" + encodeURIComponent("Invalid attendance data"));
    }

    const subject = await subjectModel.getSubjectOwnedByTeacher({ teacherId, subjectId });
    if (!subject) return res.redirect("/teacher?error=" + encodeURIComponent("Invalid subject"));

    const student = await userModel.getUserById(studentId);
    if (!student || student.role !== "student") {
      return res.redirect("/teacher?error=" + encodeURIComponent("Invalid student"));
    }

    await attendanceModel.upsertAttendance({
      studentId,
      subjectId,
      teacherId,
      classDate,
      status,
    });

    return res.redirect("/teacher?msg=" + encodeURIComponent("Attendance saved successfully"));
  } catch (err) {
    return res.redirect("/teacher?error=" + encodeURIComponent("Could not save attendance"));
  }
});

module.exports = router;

