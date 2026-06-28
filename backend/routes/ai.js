const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const { auth } = require('../middleware/auth');

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

router.post('/chat', auth, async (req, res) => {
  try {
    const { message, courseId } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const course = courseId ? await Course.findById(courseId) : null;
    const context = course
      ? `You are an AI learning assistant for the course "${course.title}". ${course.description}`
      : 'You are an AI learning assistant for an online learning platform.';

    const prompt = `${context}\n\nStudent Question: ${message}\n\nProvide a helpful, clear, and educational response.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ success: true, response: text });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/recommendations', auth, async (req, res) => {
  try {
    const studentEnrollments = await Enrollment.find({ student: req.user.id })
      .populate('course', 'category title');

    const enrolledCategories = studentEnrollments.map(e => e.course.category);
    const enrolledCourseIds = studentEnrollments.map(e => e.course._id);

    const recommendations = await Course.find({
      _id: { $nin: enrolledCourseIds },
      category: { $in: enrolledCategories },
      status: 'published',
      isApproved: true
    })
      .limit(5)
      .populate('instructor', 'firstName lastName');

    res.json({ success: true, recommendations, reason: 'Based on your enrolled courses' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/generate-quiz', auth, async (req, res) => {
  try {
    const { courseId, topicName, numberOfQuestions } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const prompt = `Generate ${numberOfQuestions || 5} multiple choice questions for the topic "${topicName}" in the course "${course.title}". Format each question as JSON with fields: questionText, options (array of 4), correctAnswer (index), explanation. Return as a valid JSON array.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\[([\s\S]*)\]/);
    const questions = jsonMatch ? JSON.parse(text) : [];

    res.json({ success: true, questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/skill-analysis', auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id, status: 'completed' })
      .populate('course', 'title category');

    const completedSkills = enrollments.map(e => `${e.course.title} (${e.course.category})`);

    const prompt = `A student has completed the following courses and skills: ${completedSkills.join(', ')}. Provide specific, actionable recommendations for the next skills they should learn to advance their career. Format as a professional career development suggestion.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    res.json({ success: true, completedSkills, recommendation: analysis });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;