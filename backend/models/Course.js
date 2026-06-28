const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  thumbnail: { type: String, default: null },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, enum: ['Programming', 'Web Development', 'Data Science', 'Mobile Development', 'Cloud Computing', 'Other'], default: 'Other' },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  duration: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: [{
    studentId: mongoose.Schema.Types.ObjectId,
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  modules: [{
    title: String,
    description: String,
    lessons: [{
      _id: mongoose.Schema.Types.ObjectId,
      title: String,
      description: String,
      videoUrl: String,
      duration: Number,
      resources: [{ title: String, url: String, type: String }],
      order: Number
    }],
    order: Number
  }],
  prerequisites: [String],
  learningOutcomes: [String],
  enrollmentCount: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);