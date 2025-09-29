const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Result = require('../models/Result');

// Submit result (student)
router.post('/', auth, async (req, res) => {
  const { course, quiz, score, total } = req.body;
  try {
    const result = new Result({
      student: req.user._id,
      course,
      quiz,
      score,
      total
    });
    await result.save();
    res.json(result);
  } catch (err) {
    console.error('Submit result error:', err.message);
    res.status(500).send('Server error');
  }
});

// Get my results
router.get('/me', auth, async (req, res) => {
  try {
    const results = await Result.find({ student: req.user._id }).populate('course', 'title').populate('quiz', 'title');
    res.json(results);
  } catch (err) {
    console.error('Get results error:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
