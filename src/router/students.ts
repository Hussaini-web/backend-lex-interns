import express from "express";
import { deleteStudent, updateStudent,getStudentById,getAllStudents}  from "../controller/students";


export default (router: express.Router) => {
    router.get('/students', getAllStudents);
    router.get('/students/:id', getStudentById);
    router.put('/students/:id', updateStudent);
    router.delete('/students/:id', deleteStudent);
}