const express = require('express');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, bio, specialization, skills, phone, location, socialLinks } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, bio, specialization, skills, phone, location, socialLinks, updatedAt: new Date() },
      { new: true }
    );

    res.json({ success: true, message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/instructor/:id', async (req, res) => {
  try {
    const Course = require('../models/Course');
    const user = await User.findById(req.params.id).select('-password');
    const courses = await Course.find({ instructor: req.params.id, status: 'published' });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Instructor not found' });
    }

    res.json({ success: true, user, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;