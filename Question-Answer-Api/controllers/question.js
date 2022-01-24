const Question = require('../models/question');
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require('../helpers/error/CustomError');

const askNewQuestion = asyncErrorWrapper(async (req, res, next) => {

    const information = req.body;

    const question = await Question.create({
        ...information,
        user: req.user.id
    });

    res.status(200)
        .json({
            success: true,
            data: question
        });

});


const getAllQuestions = asyncErrorWrapper(async (req, res, next) => {

    let questions;
    let query = Question.find();

    if (req.query.search) {
        const searchObject = {};
        const regex = new RegExp(req.query.search, "i"); //i icinde olanlari flagler
        searchObject["title"] = regex;

        query = query.where(searchObject); // questions.find().where(title:"searchword") karsilik gelmektedir
        query = query.populate({path : "user", select: "name profile_image role email"}); //user bilgisi ile birlikte  bize sorguyu döner
        

    } 

    const page = parseInt(req.query.page) || 1; //null ise 1 atar default
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const pagination = {};
    const total = await Question.countDocuments();

    if (startIndex > 0) {
        pagination.previous = {
            page: page - 1,
            limit: limit
        }
    }

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit: limit
        }
    }

    query = query.skip(startIndex).limit(limit);

    questions = await query;

    res.status(200)
        .json({
            success: true,
            count: questions.length,
            pagination: pagination,
            data: questions
        });

});

const getSingleQuestion = asyncErrorWrapper(async (req, res, next) => {

    const { id } = req.params;

    const question = await Question.findById(id);

    res.status(200)
        .json({
            success: true,
            data: question
        });

});

const editQuestion = asyncErrorWrapper(async (req, res, next) => {

    const { id } = req.params;
    const editInformation = req.body;
    let question = await Question.findById(id);

    question.title = editInformation.title;
    question.content = editInformation.content;

    question = await question.save();

    res.status(200)
        .json({
            success: true,
            message: "User Updated",
            data: question
        });

});

const deleteQuestion = asyncErrorWrapper(async (req, res, next) => {

    const { id } = req.params;

    await Question.findOneAndDelete(id);

    res.status(200)
        .json({
            success: true,
            message: "Question deleted"

        });

});


const likeQuestion = asyncErrorWrapper(async (req, res, next) => {

    const { id } = req.params;

    const question = await Question.findById(id);

    if (question.likes.includes(req.user.id)) {
        return next(new CustomError("User include in Question likes", 400));
    }

    question.likes.push(req.user.id);

    await question.save();

    res.status(200)
        .json({
            success: true,
            message: "Question liked",
            data: question
        });

});

const dislikeQuestion = asyncErrorWrapper(async (req, res, next) => {

    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question.likes.includes(req.user.id)) {
        return next(new CustomError("User not include in Question likes", 400));
    }

    const index = question.likes.indexOf(req.user.id);
    question.likes.splice(index, 1);

    await question.save();

    res.status(200)
        .json({
            success: true,
            message: "Question disliked",
            data: question
        });

});

module.exports = {
    askNewQuestion, getAllQuestions, getSingleQuestion, editQuestion, deleteQuestion, likeQuestion, dislikeQuestion
};