import mongoose, { get } from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender : { type: String, required: true },
    age : { type: Number, required: true },
    state : { type: String, required: true },
    phoneNumber : { type: String, required: true },
    userType : { type: String, required: true ,default: "intern"},
    userRole : { type: String, required: true , default: "user"},
    skills : { type: [String], required: true },
    referral : { type: String, required: false },
    courseOfStudy : { type: String, required: true },
    schoolName : { type: String, required: true },
    userImage : { type: String, required: true },
    programStartDate : { type: Date, required: true },
    programEndDate : { type: Date, required: true },
    status : { type: String, default: "active" },
    createdAt: { type: Date, default: Date.now }

});

export const User = mongoose.model("User", userSchema);
export const getAllUsers = (userType: string) => User.find({ userType: userType } );
export const getUserById = (id: string) => User.findById({ _id: id });
export const getUserByEmail = (email: string) => User.findOne({ email });
export const createUser = (userData: Record<string, any>) => new User(userData).save().then(user => user.toObject());
export const updateUser = (id: string, updateData: Record<string, any>) => User.findByIdAndUpdate(id, updateData, { new: true });
export const deleteUser = (id: string) => User.findByIdAndDelete(id);

