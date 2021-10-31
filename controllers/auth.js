const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.register =  async (req, res, next) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });

    newUser.save()
        .then(() => sendToken(newUser, 201, res))
        .catch(err => next(err));
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400));
    }

    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return next(new ErrorResponse("Invalid credentials", 401));
        }
    
        sendToken(user, 201, res);
    } catch (err) {
        next(err);
    }
}

exports.forgotPassword = async (req, res, next) => { 
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user) {
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
    } catch(err) {
        next(err);
    }
}

exports.resetPassword = (req, res, next) => {
    res.send("Reset Password Route");
}

exports.allUser = (req, res, next) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error ', err));
}

const sendToken = ( user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token});
}