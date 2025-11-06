import express from "express";
import { createAttendanceSession, markAttendance, getAttendanceRecords,getAllAttendanceRecords} from "../controller/attendance";
import { isLoggin } from "../middlewares/isLoggin";

export default (router: express.Router) => {
  router.post("/attendance/create", isLoggin, createAttendanceSession); // admin only
  router.post("/attendance/mark", isLoggin, markAttendance); // user
  router.get("/attendance/:token/records", isLoggin, getAttendanceRecords); // admin only
  router.get("/attendance/records", isLoggin, getAllAttendanceRecords); // admin only
};
