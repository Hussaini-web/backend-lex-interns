import express  from "express";
import { getAllUsers ,getUserById,updateUser,deleteUser} from "../model/user";
import { SuccessResponse, ErrorResponse } from "../utils/res";
export const getAllcorpers = async (req: express.Request, res: express.Response) => {
    try {
        const corpers = await getAllUsers("corper");
        if (!corpers || corpers.length === 0) {
            return ErrorResponse(res, 'No corpers found', 404);
        }
        return SuccessResponse(res, 'Corpers retrieved successfully', corpers);
    } catch (error) {
        return ErrorResponse(res, 'Failed to retrieve corpers', 500);
    }
};
export const getcorperById = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    if (!id) {
        return ErrorResponse(res, 'Corper ID is required', 400);
    }
    try {
        const corper = await getUserById(id);
        if (!corper || corper.userType !== 'corper') {
            return ErrorResponse(res, 'Corper not found', 404);
        }
        return SuccessResponse(res, 'Corper retrieved successfully', corper);
    } catch (error) {
        return ErrorResponse(res, 'Failed to retrieve corper', 500);
    }   
};

export const updatecorper = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const updateData = req.body;
    if (!id) {
        return ErrorResponse(res, 'Corper ID is required', 400);
    }
    try {
        const corper = await getUserById(id);
        if (!corper || corper.userType !== 'corper') {
            return ErrorResponse(res, 'Corper not found', 404);
        }
        const updatedcorper = await updateUser(id, updateData);
        return SuccessResponse(res, 'Corper updated successfully', updatedcorper);
    } catch (error) {
        return ErrorResponse(res, 'Failed to update corper', 500);
    }
};
export const deletecorper = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;   
    if (!id) {
        return ErrorResponse(res, 'Corper ID is required', 400);
    }
    try {
        const corper = await getUserById(id);
        if (!corper || corper.userType !== 'corper') {
            return ErrorResponse(res, 'Corper not found', 404);
        }
        const deletedcorper = await deleteUser(id);
        return SuccessResponse(res, 'Corper deleted successfully', deletedcorper);
    } catch (error) {
        return ErrorResponse(res, 'Failed to delete corper', 500);
    }
};