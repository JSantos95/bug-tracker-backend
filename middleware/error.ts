const ErrorResponse = require('../utils/errorResponse');
import { NextFunction, Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = { ...err };

    error.message = err.message;

    console.log(err);

    if (err.code === 11000) {
        const message = 'Duplicate Field Valuse Enter';
        error = new ErrorResponse(message, 400);
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val: any) => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    });
}

module.exports = errorHandler;