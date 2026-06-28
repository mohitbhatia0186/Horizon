const express = require('express');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const existingEnrollment = await Enrollment.findOne({ student: req.user.id, course: courseId });

    if (existingEnrollment) {
      return res.status(400).json({ success: false, message: 'Already enrolled in this course' });
    }

    const enrollment = new Enrollment({ student: req.user.id, course: courseId, status: 'active' });

    await enrollment.save();
    await Course.findByIdAndUpdate(courseId, { $inc: { enrollmentCount: 1 } });

    res.status(201).json({ success: true, message: 'Enrolled successfully', enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/my-enrollments', auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id })
      .populate('course', 'title thumbnail category level duration');

    res.json({ success: true, enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate('course')
      .populate('student', 'firstName lastName email');

    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }

    if (enrollment.student._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({ success: true, enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id/progress', auth, async (req, res) => {
  try {
    const { progress, lessonCompleted } = req.body;

    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }

    if (enrollment.student.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (progress !== undefined) enrollment.progress = progress;
    if (lessonCompleted) {
      enrollment.lessonsCompleted.push({ lessonId: lessonCompleted, completedAt: new Date() });
    }

    enrollment.lastAccessedAt = new Date();

    if (progress === 100) {
      enrollment.status = 'completed';
      enrollment.completionDate = new Date();
    }

    await enrollment.save();

    res.json({ success: true, message: 'Progress updated', enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;