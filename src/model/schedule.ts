import mongoose from "mongoose";
const scheduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    color : { type: String, required: true },
    startdate: { type: Date, required: true },
    enddate: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Schedule = mongoose.model("Schedule", scheduleSchema);
export const getAllSchedules = () => Schedule.find();
export const getScheduleById = (id: string) => Schedule.findById({ _id: id });
export const createSchedule = (scheduleData: Record<string, any>) => new Schedule(scheduleData).save().then(schedule => schedule.toObject());
export const updateSchedule = (id: string, updateData: Record<string, any>) => Schedule.findByIdAndUpdate(id, updateData, { new: true });
export const deleteSchedule = (id: string) => Schedule.findByIdAndDelete(id);