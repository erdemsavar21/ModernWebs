//Cok sik yaptigimiz db exist kontrollerini buraya yaziyoruz.
const Question = require('../../models/question');
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require('../../helpers/error/CustomError');

const checkQuestionExists = asyncErrorWrapper(async (req,res,next) => {

    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
        return next(new CustomError("There is no question with that Id",400));
    }
    next();

});

module.exports = {checkQuestionExists};