import express from "express";
import {  deleteScheduleController, getAllSchedulesController ,getScheduleByIdController,createScheduleController,updateScheduleController  }  from "../controller/schedule";


export default (router: express.Router) => {
    router.get('/schedules', getAllSchedulesController);
    router.get('/schedules/:id', getScheduleByIdController);
    router.post('/schedules', createScheduleController);
    router.put('/schedules/:id', updateScheduleController);
    router.delete('/schedules/:id', deleteScheduleController);
}