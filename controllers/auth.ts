import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User as UserSchema } from '../interface';

const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    newUser.company = req.body.company ? req.body.company : "";

    newUser.save()
        .then(() => sendToken(newUser, 201, res))
        .catch((err: any) => next(err));
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400));
    }

    try {
        const user = await User.findOne({ username }).select("+password");
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        sendToken(user, 201, res);
    } catch (err) {
        next(err);
    }
}

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse("Email could not be sent", 404));
        }

        const resetToken = user.getResetPasswordToken();
        await user.save();

        const resetUrl = `http://localhost:3000/passwordrest/${resetToken}`;
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;
        try {

        } catch (err) {

        }
    } catch (err) {
        next(err);
    }
}

export const resetPassword = (req: Request, res: Response, next: NextFunction) => {
    res.send("Reset Password Route");
}

export const allUser = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .then((user: UserSchema[]) => res.json(user))
        .catch((err: any) => res.status(400).json('Error ' + err));
}

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
    User.findById(req.params.id)
        .then((user: UserSchema) => res.json(user))
        .catch((err: any) => res.status(400).json('Error ' + err));
}

export const getAllCoworkersByToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.params.token;
    const payload = jwt.decode(token) as JwtPayload;
    User.findById(payload.id)
        .then((user: UserSchema) =>
            User.find({ companyId: user.companyId })
                .then((users: UserSchema[]) => res.json(users))
                .catch((err: any) => res.status(400).json('Error ' + err))
        )
        .catch((err: any) => res.status(400).json('Error ' + err))


}

export const getUserByToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.params.token;
    const payload = jwt.decode(token) as JwtPayload;

    User.findById(payload.id)
        .then((user: UserSchema) => res.json(user))
        .catch((err: any) => res.status(400).json('Error ' + err));
}

export const update = (req: Request, res: Response, next: NextFunction) => {
    User.findByIdAndUpdate(req.params.userID)
        .then((user: UserSchema) => {
            user.username = req.body.username ? req.body.username : user.username;
            user.email = req.body.email ? req.body.email : user.email;
            user.companyId = req.body.companyId ? req.body.companyId : user.companyId;

            user.save()
                .then(() => res.json('User Updated!'))
                .catch((err: any) => res.status(400).json('Error: ' + err));
        })
}

const sendToken = (user: any, statusCode: number, res: Response) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token });
}