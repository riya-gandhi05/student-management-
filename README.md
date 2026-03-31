# Student Management System (Node.js + Express + MySQL + EJS)

Beginner-friendly full stack project with:
- Registration (student / teacher / admin)
- Login + role-based dashboards
- Teacher: add subjects, enroll students, add marks, mark attendance
- Student: view marks + attendance
- Admin: manage users (update role, delete user)

## 1) Install dependencies
From `D:/Fsdb project`:
```bash
npm install
```

## 2) Setup MySQL
1. Create a database named `student_management` (or update `DB_NAME` in your `.env`).
2. Update environment variables:
```bash
copy .env.example .env
```

## 3) Run the app
```bash
npm run dev
```
Server starts on `PORT` (default `4000`).

## 4) Try the app
- Register a `teacher` user, login, and add a subject.
- Register some `student` users, login as the teacher, enroll students to the subject, then add marks/attendance.
- Login as a student to view marks and attendance.
- Login as an `admin` to manage users.

