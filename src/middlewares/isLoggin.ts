import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "../utils/res";

export const isLoggin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return ErrorResponse(res, "No token provided", 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "LEXDEVSECRET");
        (req as any).user = decoded;
        (req as any).userRole = (decoded as any).role;
        //add user id to headers for easy access
        req.headers['user-id'] = (decoded as any).id;
        req.headers['role'] = (decoded as any).role;
        next();
    } catch (error) {
        return ErrorResponse(res, "Invalid token", 401);
    }
};