const express = require('express');
const Quiz = require('../models/Quiz');
const QuizResponse = require('../models/QuizResponse');
const { auth, authorize } = require('../middleware/auth');
const mongoose = require('mongoose');

const router = express.Router();

router.post('/', auth, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const { title, description, course, questions, totalMarks, passingScore, timeLimit } = req.body;

    const quiz = new Quiz({
      title,
      description,
      course,
      questions: questions.map(q => ({ _id: new mongoose.Types.ObjectId(), ...q })),
      totalMarks,
      passingScore,
      timeLimit,
      createdBy: req.user.id
    });

    await quiz.save();

    res.status(201).json({ success: true, message: 'Quiz created successfully', quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('createdBy', 'firstName lastName');

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    res.json({ success: true, quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/:quizId/submit', auth, async (req, res) => {
  try {
    const { answers, duration } = req.body;
    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    let totalMarksObtained = 0;
    const processedAnswers = answers.map(answer => {
      const question = quiz.questions.id(answer.questionId);
      const isCorrect = question.correctAnswer === answer.studentAnswer;
      const marksObtained = isCorrect ? question.marks : 0;
      totalMarksObtained += marksObtained;

      return {
        questionId: answer.questionId,
        studentAnswer: answer.studentAnswer,
        isCorrect,
        marksObtained
      };
    });

    const percentage = (totalMarksObtained / quiz.totalMarks) * 100;
    const isPassed = percentage >= quiz.passingScore;

    const quizResponse = new QuizResponse({
      student: req.user.id,
      quiz: req.params.quizId,
      course: quiz.course,
      answers: processedAnswers,
      totalMarksObtained,
      totalMarks: quiz.totalMarks,
      percentage: Math.round(percentage),
      isPassed,
      duration
    });

    await quizResponse.save();

    res.status(201).json({
      success: true,
      message: 'Quiz submitted successfully',
      result: { totalMarksObtained, totalMarks: quiz.totalMarks, percentage: Math.round(percentage), isPassed }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/responses/my-responses', auth, async (req, res) => {
  try {
    const responses = await QuizResponse.find({ student: req.user.id })
      .populate('quiz', 'title totalMarks')
      .populate('course', 'title');

    res.json({ success: true, responses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.module = router;