const { pool } = require("../config/db");

async function enrollStudentToSubject({ studentId, subjectId }) {
  const [result] = await pool.query(
    `INSERT INTO enrollments (student_id, subject_id)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE id = id`,
    [studentId, subjectId]
  );

  return { affectedRows: result.affectedRows };
}

async function listEnrolledStudentsForSubject(subjectId) {
  const [rows] = await pool.query(
    `SELECT u.id, u.name, u.email
     FROM enrollments e
     JOIN users u ON u.id = e.student_id
     WHERE e.subject_id = ? AND u.role = 'student'
     ORDER BY u.name ASC`,
    [subjectId]
  );
  return rows;
}

module.exports = {
  enrollStudentToSubject,
  listEnrolledStudentsForSubject,
};