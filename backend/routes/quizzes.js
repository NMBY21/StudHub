const express = require("express");
const { createQuiz, getCourseQuizzes } = require("../controllers/quizController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createQuiz);
router.get("/:courseId", getCourseQuizzes);

module.exports = router;
