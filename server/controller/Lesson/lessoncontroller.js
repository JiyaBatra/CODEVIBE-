const Lesson = require('../../models/lesson');
const Progress = require('../../models/progress');
const User = require('../../models/user.models');
const Analytics = require('../../models/analytics');

const getSubjectFromLessonId = (lessonId) => {
  if (!lessonId || typeof lessonId !== 'string') return 'Other';
  return lessonId.split('-')[0].replace(/\d+$/, '') || lessonId;
};

exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({}).sort({ order: 1 });
    res.json(lessons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findOne({ lessonId: id });
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.completeLesson = async (req, res) => {
  try {
    const { email, score, coins, learningTime, type } = req.body;
    const lessonId = req.params.id;
    
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const progress = await Progress.findOneAndUpdate(
      { email },
      { 
        $addToSet: { completedLessons: lessonId },
        $set: { [`scores.${lessonId}`]: score || 0 }
      },
      { new: true, upsert: true }
    );

    const user = await User.findOne({ Email: email }).lean();
    try {
      await Analytics.create({
        userId: user?._id || null,
        email,
        username: user?.username || progress.username || '',
        lessonId,
        subject: getSubjectFromLessonId(lessonId),
        score: score || 0,
        completed: true,
        points: score || 0,
        coins: coins || 0,
        learningTime: learningTime || 0,
        type: type || 'lesson',
      });
    } catch (analyticsErr) {
      console.error('Analytics event creation failed:', analyticsErr);
    }

    res.json({
      message: 'Lesson marked as completed',
      completedLessons: progress.completedLessons,
      scores: progress.scores,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};