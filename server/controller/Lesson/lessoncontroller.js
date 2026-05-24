const Lesson = require('../../models/lesson');
const Progress = require('../../models/progress');

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
    const { email, score } = req.body;
    const lessonId = req.params.id;
    
    if (!email) return res.status(400).json({ message: 'Email is required' });
    
    // Verify requesting user can only update their own progress
    if (req.user.email !== email) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const progress = await Progress.findOneAndUpdate(
      { email },
      { 
        $addToSet: { completedLessons: lessonId },
        $set: { [`scores.${lessonId}`]: score || 0 }
      },
      { new: true, upsert: true }
    );

    res.json({
      message: 'Lesson marked as completed',
      completedLessons: progress.completedLessons,
      scores: progress.scores
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};