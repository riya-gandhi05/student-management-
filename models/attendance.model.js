const { pool } = require("../config/db");

async function upsertAttendance({ studentId, subjectId, teacherId, classDate, status }) {
  const [result] = await pool.query(
    `INSERT INTO attendance (student_id, subject_id, teacher_id, class_date, status)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       status = VALUES(status),
       teacher_id = VALUES(teacher_id)`,
    [studentId, subjectId, teacherId, classDate, status]
  );

  return { affectedRows: result.affectedRows };
}

async function getAttendanceForStudent(studentId) {
  const [rows] = await pool.query(
    `SELECT
      s.id AS subject_id,
      s.subject_name,
      a.class_date,
      a.status
     FROM attendance a
     JOIN subjects s ON s.id = a.subject_id
     JOIN enrollments e ON e.student_id = a.student_id AND e.subject_id = a.subject_id
     WHERE a.student_id = ?
     ORDER BY s.subject_name ASC, a.class_date DESC`,
    [studentId]
  );
  return rows;
}

module.exports = { upsertAttendance, getAttendanceForStudent };