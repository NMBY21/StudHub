const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Quiz = require('../models/Quiz');
const Course = require('../models/Course');

// Create quiz (teacher only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'teacher') return res.status(403).json({ msg: 'Not allowed' });
  const { course, title, questions } = req.body;
  try {
    // optional: check course exists and teacher owns it
    const crs = await Course.findById(course);
    if (!crs) return res.status(400).json({ msg: 'Course not found' });
    // owner check (optional but recommended)
    if (crs.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'You are not the owner of this course' });
    }

    const quiz = new Quiz({ course, title, questions });
    await quiz.save();
    res.json(quiz);
  } catch (err) {
    console.error('Create quiz error:', err.message);
    res.status(500).send('Server error');
  }
});

// Get quizzes by course
router.get('/course/:courseId', async (req, res) => {
  try {
    const quizzes = await Quiz.find({ course: req.params.courseId });
    res.json(quizzes);
  } catch (err) {
    console.error('Get quizzes error:', err.message);
    res.status(500).send('Server error');
  }
});

// Get quiz by id
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    console.error('Get quiz error:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
