import express  from "express";
import { getUserByEmail, createUser } from "../model/user";
import { HashPassword,ComparePassword,GenerateToken} from "../utils/authentication";
import { SuccessResponse, ErrorResponse } from "../utils/res";
import {uploadImage} from "../middlewares/images";

export const Register = async (req: express.Request, res: express.Response) => {
     console.log('Register Endpoint hit');
    const { firstName, lastName, email, password, gender, age, state, phoneNumber, userType, skills, courseOfStudy, schoolName, programStartDate, programEndDate } = req.body;

    if (!firstName || !lastName || !email || !password || !gender || !age || !state || !phoneNumber || !userType  || !skills || !courseOfStudy || !schoolName  || !programStartDate || !programEndDate) {
        return res.sendStatus(400);
    }

   const Image = req.file?.path;
   if (!Image) {
       return ErrorResponse(res, 'User image is required', 400);
   }
   console.log('Uploaded image path:', Image);
      let imageUrl = null;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`;
    }
    //find existing user 
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return ErrorResponse(res, 'User already exists', 400);
    }
    //create user 

    const newUser = await createUser({
        firstName,
        lastName,
        email,
        password: await HashPassword(password, 10),
        gender,
        age,
        state,
        phoneNumber,
        userType,
        skills,
        courseOfStudy,
        schoolName,
        userImage: imageUrl,
        programStartDate,
        programEndDate
    });

    if (!newUser) {
        return ErrorResponse(res, 'User registration failed', 500);
    }
   return SuccessResponse(res,'User registered successfully', newUser);
}

export const Login = async (req: express.Request, res: express.Response) => {
const { email, password } = req.body;

if (!email || !password) {
    return ErrorResponse(res, 'Email and password are required', 400);
}

const user = await getUserByEmail(email);
if (!user) {
    return ErrorResponse(res, 'User not found', 404);
}

const isMatch = await ComparePassword(password, user.password);
if (!isMatch) {
    return ErrorResponse(res, 'Invalid credentials', 401);
}

const token = GenerateToken(user.id, user.userRole);
return SuccessResponse(res, 'Login successful', { token });

}