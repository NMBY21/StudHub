const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = await Course.create({
      title,
      description,
      teacherId: req.user.id
    });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({ include: "teacher" });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
