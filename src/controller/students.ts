import express  from "express";
import { getAllUsers ,getUserById,updateUser,deleteUser} from "../model/user";
import { SuccessResponse, ErrorResponse } from "../utils/res";

export const getAllStudents = async (req: express.Request, res: express.Response) => {
    try {
        const students = await getAllUsers("student");
        if (!students || students.length === 0) {
            return ErrorResponse(res, 'No students found', 404);
        }
        return SuccessResponse(res, 'Students retrieved successfully', students);
    } catch (error) {
        return ErrorResponse(res, 'Failed to retrieve students', 500);
    }
};

export const getStudentById = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    if (!id) {
        return ErrorResponse(res, 'Student ID is required', 400);
    }
    try {
        const student = await getUserById(id);
        if (!student || student.userType !== 'student') {
            return ErrorResponse(res, 'Student not found', 404);
        }
        return SuccessResponse(res, 'Student retrieved successfully', student);
    } catch (error) {
        return ErrorResponse(res, 'Failed to retrieve student', 500);
    }   
};

export const updateStudent = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const updateData = req.body;
    if (!id) {
        return ErrorResponse(res, 'Student ID is required', 400);
    }
    try {
        const student = await getUserById(id);
        if (!student || student.userType !== 'student') {
            return ErrorResponse(res, 'Student not found', 404);
        }
        const updatedStudent = await updateUser(id, updateData);
        return SuccessResponse(res, 'Student updated successfully', updatedStudent);
    } catch (error) {
        return ErrorResponse(res, 'Failed to update student', 500);
    }
}
export const deleteStudent = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;   
    if (!id) {
        return ErrorResponse(res, 'Student ID is required', 400);
    }
    try {
        const student = await getUserById(id);
        if (!student || student.userType !== 'student') {
            return ErrorResponse(res, 'Student not found', 404);
        }
        const deletedStudent = await deleteUser(id);
        return SuccessResponse(res, 'Student deleted successfully', deletedStudent);
    } catch (error) {
        return ErrorResponse(res, 'Failed to delete student', 500);
    }
};