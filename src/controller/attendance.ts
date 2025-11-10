import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { AttendanceSession, AttendanceRecord } from "../model/attendance";
import { ErrorResponse, SuccessResponse } from "../utils/res";
import { User } from "../model/user";

// POST /api/attendance/create (admin only)
export const createAttendanceSession = async (req: Request, res: Response) => {

    const userRole = req.headers['role'] as string;
    const userId = req.headers['user-id'] as string;
    const expiresInMinutes = req.body.expiresInMinutes || 15;
  if (userRole !== "admin") {
    return ErrorResponse(res, "Unauthorized", 403);
  }
  const token = uuidv4();
  const expiresAt = new Date(Date.now() + 1000 * 60 * expiresInMinutes);
  const session = await AttendanceSession.create({
    token,
    createdBy: userId,
    expiresAt
  });
  return SuccessResponse(res, "Session created", {
    token,
    qrPayload: `attendance:${token}`,
    expiresAt
  });
};

// POST /api/attendance/mark (user)
export const markAttendance = async (req: Request, res: Response) => {
  const { sessionToken } = req.body;
       const userId = req.headers['user-id'] as string;

  if (!userId) return ErrorResponse(res, "Unauthorized", 401);
  const session = await AttendanceSession.findOne({ token: sessionToken });

  if (!session) return ErrorResponse(res, "Session not found", 404);

  if (session.expiresAt < new Date()) return ErrorResponse(res, "Session expired", 400);
  //status late add for late
  const status = session.expiresAt < new Date() ? "late" : "on-time";

  const alreadyMarked = await AttendanceRecord.findOne({ session: session._id, user: userId });
  if (alreadyMarked) return ErrorResponse(res, "Already marked", 409);
  await AttendanceRecord.create({ session: session._id, status, user: userId });
  return SuccessResponse(res, "Attendance marked", null);
};

// GET /api/attendance/:token/records
export const getAttendanceRecords = async (req: Request, res: Response) => {
  const userId = req.headers['user-id'] as string;
  const userRole = req.headers['role'] as string;

  if (userRole !== "admin") {
    return ErrorResponse(res, "Unauthorized", 403);
  }
  const { token } = req.params;
  const session = await AttendanceSession.findOne({ token });
  if (!session) return ErrorResponse(res, "Session not found", 404);
  const records = await AttendanceRecord.find({ session: session._id }).populate("user", "firstName lastName email");
  return SuccessResponse(res, "Attendance records", records);
};

//Get all attendance sessions
export const getAllAttendanceSessions = async (req: Request, res: Response) => {
    const userRole = req.headers['role'] as string;

  if (userRole !== "admin") {
    return ErrorResponse(res, "Unauthorized", 403);
  }
    const sessions = await AttendanceSession.find().populate("createdBy", "firstName lastName email userImage");
    return SuccessResponse(res, "Attendance sessions retrieved", sessions);
};

//get all attendance records
export const getAllAttendanceRecords = async (req: Request, res: Response) => {
    const userRole = req.headers['role'] as string;

  if (userRole !== "admin") {
    return ErrorResponse(res, "Unauthorized", 403);
  }
    const records = await AttendanceRecord.find().populate("user", "firstName lastName email userImage").populate("session", "token status createdBy expiresAt");
    return SuccessResponse(res, "Attendance records retrieved", records);
};