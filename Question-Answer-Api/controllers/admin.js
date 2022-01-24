const User = require('../models/user');
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require('../helpers/error/CustomError');

const blockUser = asyncErrorWrapper(async (req, res, next) => {

    const { id } = req.params;

    const user = await User.findById(id);

    user.blocked = !user.blocked;

    await user.save();

    return res
        .status(200)
        .json({
            success: true,
            message: "Block - Unblock Successful"
        });

});

const deleteUser = asyncErrorWrapper(async (req, res, next) => {

    const { id } = req.params;
    

    const user = await User.findById(id);
    await user.remove();

    return res
        .status(200)
        .json({
            success: true,
            message: "User deleted"
        });

});

const updateUser = asyncErrorWrapper(async (req, res, next) => {

    const { id } = req.params;
    const editInformation = req.body;
    let user = await User.findById(id); 
    
    user.name = editInformation.name;
    user.email = editInformation.email;
    user.password = editInformation.password;
    user.title = editInformation.title;
    user.about = editInformation.about;
    user.place = editInformation.place;
    user.webseite = editInformation.webseite;
    
    user = await user.save(); //update metodu ile yapsaydik password icin preSave metodu calismayacakti

    return res
        .status(200)
        .json({
            success: true,
            message: "User updated",
            data: user
        });

});

module.exports = { blockUser, deleteUser, updateUser };