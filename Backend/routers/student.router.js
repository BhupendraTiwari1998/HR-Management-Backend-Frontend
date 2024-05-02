import express from "express";
import { addStudent, deleteStudent, getStudent, getStudents, updateStudent } from "../controllers/student.controller";

const router = express.Router();
router.get("/get-students", getStudents);
router.post("/add-student",addStudent);
router.get("/get-student/:student_id",getStudent);
router.put("/update-student/:student_id",updateStudent)
router.delete("/delete-student/:student_id",deleteStudent)

export default router