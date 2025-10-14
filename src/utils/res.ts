import express from "express";
export const SuccessResponse = (res: express.Response, message: string, data: any) => {
    return res.status(200).json({ success: true, message, data });
}

export const ErrorResponse = (res: express.Response, message: string, statusCode: number = 400) => {
    return res.status(statusCode).json({ success: false, message });
}
