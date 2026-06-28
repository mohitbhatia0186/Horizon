const express = require('express');
const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/users', auth, authorize('admin'), async (req, res) => {
  try {
    const { role } = req.query;
    const query = {};
    if (role) query.role = role;

    const users = await User.find(query).select('-password');

    res.json({ success: true, count: users.length, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/courses/:id/approve', auth, authorize('admin'), async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { isApproved: true, status: 'published' },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.json({ success: true, message: 'Course approved', course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/statistics', auth, authorize('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalInstructors = await User.countDocuments({ role: 'instructor' });
    const totalCourses = await Course.countDocuments({ status: 'published' });
    const totalEnrollments = await Enrollment.countDocuments();

    res.json({
      success: true,
      statistics: { totalUsers, totalStudents, totalInstructors, totalCourses, totalEnrollments }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;