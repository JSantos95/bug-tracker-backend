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

exports.forgotPassword = (req, res, next) => { 
    res.send("Forgot Password Route");
}

exports.resetPassword = (req, res, next) => {
    res.send("Reset Password Route");
}


const sendToken = ( user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token});
}