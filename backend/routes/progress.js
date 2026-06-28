const express = require('express');
const Enrollment = require('../models/Enrollment');
const QuizResponse = require('../models/QuizResponse');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id });
    const quizzes = await QuizResponse.find({ student: req.user.id });

    const stats = {
      totalCoursesEnrolled: enrollments.length,
      completedCourses: enrollments.filter(e => e.status === 'completed').length,
      inProgressCourses: enrollments.filter(e => e.status === 'active').length,
      totalQuizzesTaken: quizzes.length,
      averageQuizScore: quizzes.length > 0 ? (quizzes.reduce((sum, q) => sum + q.percentage, 0) / quizzes.length).toFixed(2) : 0,
      totalLearningHours: enrollments.reduce((sum, e) => sum + (e.progress || 0), 0)
    };

    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/analytics', auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id })
      .populate('course', 'title category duration');

    const courseProgress = enrollments.map(e => ({
      courseId: e.course._id,
      courseName: e.course.title,
      category: e.course.category,
      progress: e.progress,
      status: e.status,
      enrolledDate: e.enrollmentDate,
      lastAccessed: e.lastAccessedAt
    }));

    const categoryDistribution = {};
    enrollments.forEach(e => {
      const category = e.course.category;
      categoryDistribution[category] = (categoryDistribution[category] || 0) + 1;
    });

    res.json({ success: true, courseProgress, categoryDistribution });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;