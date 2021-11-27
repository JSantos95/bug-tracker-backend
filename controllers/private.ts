import { NextFunction, Response } from "express";

export const getPrivateData = (req: any, res: Response, next: NextFunction) => {
    res.status(201).json({
        success: true,
        data: req.user,
    })
};