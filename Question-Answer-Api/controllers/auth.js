const User = require('../models/user');
const asyncErrorWrapper = require("express-async-handler");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");
const { validateUserInput, comparePassword } = require("../helpers/authorization/inputhelpers");
const sendEmail = require("../helpers/libraries/sendEmail");
const CustomError = require('../helpers/error/CustomError');

const register = asyncErrorWrapper(async (req, res, next) => {

    const { name, email, password, title, about, place, webseite } = req.body;
    const user = await User.create({
        name, email, password, title, about, place, webseite
    }); //ES6 özelligi ile isimler ayni oldugundan direk eslesecektir

    sendJwtToClient(user, res);


});

const getUser = asyncErrorWrapper(async (req, res, next) => {

    res
        .json({
            success: true,
            data: {
                name: req.user.name,
                id: req.user.id
            }
        });

});

const login = asyncErrorWrapper(async (req, res, next) => {

    const { email, password } = req.body;
    if (!validateUserInput(email, password)) {
        return next(new CustomError("Please Check your inputs", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    
    if (!comparePassword(password, user.password)) {
        return next(new CustomError("Please Check your credentials", 400));
    }

    sendJwtToClient(user, res);

});

const logout = asyncErrorWrapper(async (req, res, next) => {

    return res.status(200).cookie({
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: false
    }).json({
        success: true,
        message: "Logout Successful"
    });

});

const imageUpload = asyncErrorWrapper(async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req.user.id,
        {
            "profile_image": req.savedProfileImage
        },
        {
            new: true, //Güncellenen verinin geri gelmesi icin
            runValidators: true //validasyonun tekrardan calismasi icin
        }
    );

    return res.status(200)
        .json({
            success: true,
            message: "Image Saved",
            data: user
        });

});

const forgotPassword = asyncErrorWrapper(async (req, res, next) => {

    const resetEmail = req.body.email;
    const user = await User.findOne({ email: resetEmail });
    if (!user) {
        return next(new CustomError("There is no user with that email", 400));
    }
  
    const resetPasswordToken = user.getResetPasswordTokenFromUser();
    
    await user.save();
    
    const resetPasswordUrl = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;
    const emailTemplate = `
    <h3>Reset Your Password</h3>
    <p> This <a href='${resetPasswordUrl}' target = '_blank'>link</a> will expire in 1 hours </p>
    `;

    try {
    
        await sendEmail({
            from: "e_savar@hotmail.com",
            to: resetEmail,
            subject: "Reset your email",
            html: emailTemplate
        });
        return res.status(200)
        .json({
            success: true,
            message: "Token Sent to your email.."
        });

    } catch (error) {
        
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return next(new CustomError("Email could not be sent",500));
    }


});

const resetpassword = asyncErrorWrapper(async (req, res, next) => {

    const {resetPasswordToken} = req.query;
    const {password} = req.body;

    if (!resetPasswordToken) {
        return next(new CustomError("Token is empty",400))
    }

    let user = await User.findOne({
        resetPasswordToken : resetPasswordToken,
        resetPasswordExpire : {$gt: Date.now()} //gt: greater than where kosulu ekliyoruz. su an dan büyük ise getir demek
    });

    if(!user){
        return next(new CustomError("Token is not valid or expire",400));
    }
    
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200)
        .json({
            success: true,
            message: "Password successfully reset"
        });

});

module.exports = { register, getUser, login, logout, imageUpload, forgotPassword, resetpassword };