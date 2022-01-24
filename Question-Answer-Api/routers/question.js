const express = require("express");
const router = express.Router();
const { askNewQuestion, getAllQuestions, getSingleQuestion, editQuestion, deleteQuestion, likeQuestion, dislikeQuestion } = require('../controllers/question');
const { getAccessToRoute, getQuestionOwnerAccess } = require("../middlewares/authorization/auth");
const { checkQuestionExists } = require('../middlewares/database/databaseErrorHelpers');


router.post("/ask", getAccessToRoute, askNewQuestion);
router.get("/", getAllQuestions);
router.get("/:id", checkQuestionExists, getSingleQuestion);
router.get("/:id/like", [getAccessToRoute, checkQuestionExists],likeQuestion);
router.get("/:id/dislike", [getAccessToRoute, checkQuestionExists],dislikeQuestion);
router.put("/:id", [getAccessToRoute, checkQuestionExists, getQuestionOwnerAccess],editQuestion);
router.delete("/:id", [getAccessToRoute, checkQuestionExists, getQuestionOwnerAccess],deleteQuestion);


module.exports = router;