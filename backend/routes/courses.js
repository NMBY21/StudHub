const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Course = require('../models/Course');

// Create course (teacher only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'teacher') return res.status(403).json({ msg: 'Not allowed' });
  const { title, description, category, lessons } = req.body;
  try {
    const course = new Course({
      title, description, category, lessons: lessons || [], teacher: req.user._id
    });
    await course.save();
    res.json(course);
  } catch (err) {
    console.error('Create course error:', err.message);
    res.status(500).send('Server error');
  }
});

// Get all courses (public)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('teacher', 'name email');
    res.json(courses);
  } catch (err) {
    console.error('Get courses error:', err.message);
    res.status(500).send('Server error');
  }
});

// Get course by id
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('teacher', 'name email');
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    res.json(course);
  } catch (err) {
    console.error('Get course error:', err.message);
    res.status(500).send('Server error');
  }
});

// (Optional) Update course - teacher only and owner
router.put('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    if (course.teacher.toString() !== req.user._id.toString()) return res.status(403).json({ msg: 'Not allowed' });
    const { title, description, category, lessons } = req.body;
    course.title = title || course.title;
    course.description = description || course.description;
    course.category = category || course.category;
    course.lessons = lessons || course.lessons;
    await course.save();
    res.json(course);
  } catch (err) {
    console.error('Update course error:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
