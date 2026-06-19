const { addToDenylist } = require('../../utils/tokenDenylist');

const logout = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  addToDenylist(token);
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
};

module.exports = logout;