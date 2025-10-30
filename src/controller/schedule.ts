import express  from "express";
import { getAllSchedules , getScheduleById ,createSchedule,updateSchedule,deleteSchedule} from "../model/schedule";
import { SuccessResponse, ErrorResponse } from "../utils/res";
import { get } from "mongoose";
export const getAllSchedulesController = async (req: express.Request, res: express.Response) => {
    try {
        const schedules = await getAllSchedules();
   return SuccessResponse(res, "Schedules retrieved successfully", schedules);
    } catch (error) {

        return ErrorResponse(res, "Failed to retrieve schedules", 400);
    }
};

export const getScheduleByIdController = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    if (!id) {
        return ErrorResponse(res, 'Schedule ID is required', 400);
    }
    try {
        const schedule = await getScheduleById(id);
        if (!schedule) {
            return ErrorResponse(res, 'Schedule not found', 404);
        }
        return SuccessResponse(res, 'Schedule retrieved successfully', schedule);
    } catch (error) {
        return ErrorResponse(res, 'Failed to retrieve schedule', 500);
    }   
};

export const createScheduleController = async (req: express.Request, res: express.Response) => {
    const scheduleData = req.body;
    if (!scheduleData || Object.keys(scheduleData).length === 0) {
        return ErrorResponse(res, 'Schedule data is required', 400);
    }
    try {
        const newSchedule = await createSchedule(scheduleData);
        return SuccessResponse(res, 'Schedule created successfully', newSchedule);
    } catch (error) {
        return ErrorResponse(res, 'Failed to create schedule', 500);
    }
};

export const updateScheduleController = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const updateData = req.body;
    if (!id) {
        return ErrorResponse(res, 'Schedule ID is required', 400);
    }
    try {
        const schedule = await getScheduleById(id);
        if (!schedule) {
            return ErrorResponse(res, 'Schedule not found', 404);
        }
        const updatedSchedule = await updateSchedule(id, updateData);
        return SuccessResponse(res, 'Schedule updated successfully', updatedSchedule);
    } catch (error) {
        return ErrorResponse(res, 'Failed to update schedule', 500);
    }
}
export const deleteScheduleController = async (req: express.Request, res: express.Response) => {
    const id = req.params.id; 
    if (!id) {
        return ErrorResponse(res, 'Schedule ID is required', 400);
    }
    try {
        const schedule = await getScheduleById(id);
        if (!schedule) {
            return ErrorResponse(res, 'Schedule not found', 404);
        }
        const deletedSchedule = await deleteSchedule(id);
        return SuccessResponse(res, 'Schedule deleted successfully', deletedSchedule);
    } catch (error) {
        return ErrorResponse(res, 'Failed to delete schedule', 500);
    }
};