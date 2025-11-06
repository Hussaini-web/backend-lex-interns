import mongoose from "mongoose";

const attendanceSessionSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  status : { type: String, enum: ["late", "on-time"], default: "on-time" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

const attendanceRecordSchema = new mongoose.Schema({
  session: { type: mongoose.Schema.Types.ObjectId, ref: "AttendanceSession", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  markedAt: { type: Date, default: Date.now }
});

export const AttendanceSession = mongoose.model("AttendanceSession", attendanceSessionSchema);
export const AttendanceRecord = mongoose.model("AttendanceRecord", attendanceRecordSchema);
