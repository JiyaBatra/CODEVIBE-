const UserModel = require('../../models/user.models');

const updateProfile = async (req, res) => {
  try {
    const tokenEmail = req.user?.email || req.user?.Email;
    if (!tokenEmail) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const updateFields = {};
    const allowedFields = ['username', 'college', 'year', 'bio', 'avatarUrl'];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'No profile fields to update' });
    }

    const user = await UserModel.findOneAndUpdate(
      { Email: tokenEmail },
      { $set: updateFields },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        username: user.username,
        email: user.Email,
        college: user.college,
        year: user.year,
        bio: user.bio || '',
        avatarUrl: user.avatarUrl || '',
        joinedAt:
          user.joinedAt ||
          (user._id && typeof user._id.getTimestamp === 'function'
            ? user._id.getTimestamp()
            : null),
      },
    });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = updateProfile;