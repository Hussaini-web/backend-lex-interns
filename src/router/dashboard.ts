import { Express } from "express";
import { getDashboardStats } from "../controller/dashboard";
import express from 'express';
import { isLoggin } from '../middlewares/isLoggin';

export default (router: express.Router) => {
    router.get('/dashboard/stats', isLoggin, getDashboardStats);
}