// controller/feedback/feedbackcontroller.js
const Feedback = require('../../models/feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const { email, name, courseName, lessonId, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ message: "Email and message are required" });
    }

    const feedback = new Feedback({
      email,
      name,
      courseName,
      lessonId,
      message,
      createdAt: new Date(),
    });

    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
