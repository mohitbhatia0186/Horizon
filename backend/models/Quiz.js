const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  module: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [{
    _id: mongoose.Schema.Types.ObjectId,
    questionText: String,
    type: { type: String, enum: ['multiple-choice', 'short-answer', 'essay'] },
    options: [String],
    correctAnswer: String,
    explanation: String,
    marks: { type: Number, default: 1 }
  }],
  totalMarks: Number,
  passingScore: { type: Number, default: 40 },
  timeLimit: Number,
  attempts: { type: Number, default: -1 },
  isPublished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', quizSchema);