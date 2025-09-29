const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  score: { type: Number },
  total: { type: Number },
  takenAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', ResultSchema);
