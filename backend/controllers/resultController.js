const Result = require("../models/Result");

exports.submitResult = async (req, res) => {
  try {
    const { quizId, score } = req.body;
    const result = await Result.create({
      quizId,
      studentId: req.user.id,
      score
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyResults = async (req, res) => {
  try {
    const results = await Result.findAll({
      where: { studentId: req.user.id },
      include: "quiz"
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
