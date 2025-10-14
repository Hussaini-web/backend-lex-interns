import express from "express";
import { Register,Login }  from "../controller/auth";


export default (router: express.Router) => {
    router.post('/auth/register', Register);
    router.post('/auth/login', Login);
}