const bcrypt = require("bcrypt");
const { pool } = require("../config/db");

const SALT_ROUNDS = 10;

async function createUser({ name, email, password, role }) {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const [result] = await pool.query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES (?, ?, ?, ?)`,
    [name, email, passwordHash, role]
  );

  return { id: result.insertId, name, email, role };
}

async function getUserByEmail(email) {
  const [rows] = await pool.query(
    `SELECT id, name, email, password_hash, role
     FROM users
     WHERE email = ?
     LIMIT 1`,
    [email]
  );
  return rows[0] || null;
}

async function getUserById(id) {
  const [rows] = await pool.query(
    `SELECT id, name, email, role
     FROM users
     WHERE id = ?
     LIMIT 1`,
    [id]
  );
  return rows[0] || null;
}

async function listUsers() {
  const [rows] = await pool.query(
    `SELECT id, name, email, role, created_at
     FROM users
     ORDER BY created_at DESC`
  );
  return rows;
}

async function updateUserRole(userId, role) {
  await pool.query(`UPDATE users SET role = ? WHERE id = ?`, [role, userId]);
}

async function deleteUser(userId) {
  await pool.query(`DELETE FROM users WHERE id = ?`, [userId]);
}

async function listUsersByRole(role) {
  const [rows] = await pool.query(
    `SELECT id, name, email
     FROM users
     WHERE role = ?
     ORDER BY name ASC`,
    [role]
  );
  return rows;
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  listUsers,
  updateUserRole,
  deleteUser,
  listUsersByRole,
};