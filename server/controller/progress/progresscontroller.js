const Progress = require('../../models/progress');

exports.getProgress = async (req, res) => {
  try {
    const email = req.params.email;
    if (!email) return res.status(400).json({ message: 'Email required' });
    
    // Verify requesting user can only access their own data
    if (req.user.email !== email) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const progress = await Progress.findOne({ email });
    
    if (!progress) {
      return res.json({ 
        email, 
        completedLessons: [], 
        scores: {} 
      });
    }
    
    res.json(progress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};