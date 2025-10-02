const Quiz = require("../models/Quiz");

exports.createQuiz = async (req, res) => {
  try {
    const { courseId, question, options, answer } = req.body;
    const quiz = await Quiz.create({ courseId, question, options, answer });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseQuizzes = async (req, res) => {
  try {
    const { courseId } = req.params;
    const quizzes = await Quiz.findAll({ where: { courseId } });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
