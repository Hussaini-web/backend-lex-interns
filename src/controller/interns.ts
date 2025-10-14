import express  from "express";
import { getAllUsers ,getUserById,updateUser,deleteUser} from "../model/user";
import { SuccessResponse, ErrorResponse } from "../utils/res";
export const getAllInterns = async (req: express.Request, res: express.Response) => {
    try {
        const interns = await getAllUsers("intern");
        if (!interns || interns.length === 0) {
            return ErrorResponse(res, 'No interns found', 404);
        }   
        return SuccessResponse(res, 'Interns retrieved successfully', interns);
    } catch (error) {
        return ErrorResponse(res, 'Failed to retrieve interns', 500);
    }
};
export const getInternById = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    if (!id) {
        return ErrorResponse(res, 'Intern ID is required', 400);
    }
    try {
        const intern = await getUserById(id);
        if (!intern || intern.userType !== 'intern') {
            return ErrorResponse(res, 'Intern not found', 404);
        }
        return SuccessResponse(res, 'Intern retrieved successfully', intern);
    } catch (error) {
        return ErrorResponse(res, 'Failed to retrieve intern', 500);
    }
};  

export const updateIntern = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const updateData = req.body;
    if (!id) {
        return ErrorResponse(res, 'Intern ID is required', 400);
    }
    try {
        const intern = await getUserById(id);
        if (!intern || intern.userType !== 'intern') {
            return ErrorResponse(res, 'Intern not found', 404);
        }
        const updatedIntern = await updateUser(id, updateData);
        return SuccessResponse(res, 'Intern updated successfully', updatedIntern);
    } catch (error) {
        return ErrorResponse(res, 'Failed to update intern', 500);
    }
};
export const deleteIntern = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    if (!id) {
        return ErrorResponse(res, 'Intern ID is required', 400);
    }
    try {
        const intern = await getUserById(id);
        if (!intern || intern.userType !== 'intern') {
            return ErrorResponse(res, 'Intern not found', 404);
        }
        const deletedIntern = await deleteUser(id);
        return SuccessResponse(res, 'Intern deleted successfully', deletedIntern);
    } catch (error) {
        return ErrorResponse(res, 'Failed to delete intern', 500);
    }
}