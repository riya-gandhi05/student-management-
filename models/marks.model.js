const { pool } = require("../config/db");

async function upsertMark({ studentId, subjectId, teacherId, examType, marks }) {
  const [result] = await pool.query(
    `INSERT INTO marks (student_id, subject_id, teacher_id, exam_type, marks)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       marks = VALUES(marks),
       teacher_id = VALUES(teacher_id)`,
    [studentId, subjectId, teacherId, examType, marks]
  );

  return { affectedRows: result.affectedRows };
}

async function getMarksForStudent(studentId) {
  const [rows] = await pool.query(
    `SELECT
        s.id AS subject_id,
        s.subject_name,
        m.exam_type,
        m.marks,
        t.name AS teacher_name,
        m.created_at
     FROM marks m
     JOIN subjects s ON s.id = m.subject_id
     JOIN users t ON t.id = m.teacher_id
     JOIN enrollments e ON e.student_id = m.student_id AND e.subject_id = m.subject_id
     WHERE m.student_id = ?
     ORDER BY s.subject_name ASC, m.exam_type ASC`,
    [studentId]
  );

  return rows;
}

module.exports = { upsertMark, getMarksForStudent };