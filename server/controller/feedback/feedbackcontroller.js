// controller/feedback/feedbackcontroller.js
const Feedback = require('../../models/feedback');
const Notification = require('../../models/notification');

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

exports.replyToFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({ message: "Reply message is required" });
    }

    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    feedback.reply = reply;
    feedback.repliedAt = new Date();
    await feedback.save();

    try {
      await Notification.create({
        email: feedback.email,
        type: 'feedback_reply',
        message: `You received a reply on your feedback: "${reply.substring(0, 100)}"`,
        relatedEntity: id,
      });
    } catch (notifErr) {
      console.error('Feedback reply notification creation failed:', notifErr);
    }

    res.json({ message: "Reply sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
