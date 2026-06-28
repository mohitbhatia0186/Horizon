const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  enrollmentDate: { type: Date, default: Date.now },
  completionDate: { type: Date, default: null },
  status: { type: String, enum: ['active', 'completed', 'dropped'], default: 'active' },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  certificateUrl: { type: String, default: null },
  lessonsCompleted: [{ lessonId: mongoose.Schema.Types.ObjectId, completedAt: Date }],
  lastAccessedAt: { type: Date, default: Date.now },
  notes: [{ lessonId: mongoose.Schema.Types.ObjectId, content: String, createdAt: Date }]
});

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);