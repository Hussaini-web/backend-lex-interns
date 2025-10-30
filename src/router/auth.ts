import express from "express";
import { Register,Login }  from "../controller/auth";
import { uploadImage } from "../middlewares/images";

export default (router: express.Router) => {
    console.log('Setting up auth routes');
    router.post('/auth/register', uploadImage.single('userImage'), Register);
    router.post('/auth/login', Login);
}