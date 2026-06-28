const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  certificateUrl: String,
  certificateId: { type: String, unique: true },
  issuedDate: { type: Date, default: Date.now },
  expiryDate: Date,
  isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model('Certificate', certificateSchema);