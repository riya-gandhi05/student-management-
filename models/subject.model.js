const { pool } = require("../config/db");

async function createSubject({ teacherId, subjectName }) {
  const [result] = await pool.query(
    `INSERT INTO subjects (subject_name, teacher_id)
     VALUES (?, ?)`,
    [subjectName, teacherId]
  );
  return { id: result.insertId, teacherId, subjectName };
}

async function listSubjectsByTeacher(teacherId) {
  const [rows] = await pool.query(
    `SELECT id, subject_name
     FROM subjects
     WHERE teacher_id = ?
     ORDER BY subject_name ASC`,
    [teacherId]
  );
  return rows;
}

async function getSubjectOwnedByTeacher({ teacherId, subjectId }) {
  const [rows] = await pool.query(
    `SELECT id, subject_name, teacher_id
     FROM subjects
     WHERE id = ? AND teacher_id = ?
     LIMIT 1`,
    [subjectId, teacherId]
  );
  return rows[0] || null;
}

async function getSubjectsForStudent(studentId) {
  const [rows] = await pool.query(
    `SELECT s.id, s.subject_name, s.teacher_id
     FROM enrollments e
     JOIN subjects s ON s.id = e.subject_id
     WHERE e.student_id = ?
     ORDER BY s.subject_name ASC`,
    [studentId]
  );
  return rows;
}

async function getAllSubjects() {
  const [rows] = await pool.query(
    `SELECT s.id, s.subject_name, u.name AS teacher_name
     FROM subjects s
     JOIN users u ON u.id = s.teacher_id
     ORDER BY s.subject_name ASC`
  );
  return rows;
}

module.exports = {
  createSubject,
  listSubjectsByTeacher,
  getSubjectOwnedByTeacher,
  getSubjectsForStudent,
  getAllSubjects,
};