const mongoose = require('mongoose');

const quizResponseSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  answers: [{ questionId: mongoose.Schema.Types.ObjectId, studentAnswer: String, isCorrect: Boolean, marksObtained: Number }],
  totalMarksObtained: { type: Number, default: 0 },
  totalMarks: Number,
  percentage: Number,
  isPassed: Boolean,
  attemptNumber: { type: Number, default: 1 },
  startedAt: Date,
  submittedAt: { type: Date, default: Date.now },
  duration: Number,
  feedback: String
});

module.exports = mongoose.model('QuizResponse', quizResponseSchema);