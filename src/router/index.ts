import express from "express";
import auth from "./auth";
import interns from "./interns";
import corpers from "./corpers";
import students from "./students";

const router = express.Router();

auth(router);
interns(router);
corpers(router);
students(router);
export default router; // export the actual router, not a function
