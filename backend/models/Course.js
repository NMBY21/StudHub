const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: String,
  content: String,
  resources: [String] // optional URLs to PDFs/videos
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  category: { type: String },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lessons: [LessonSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
