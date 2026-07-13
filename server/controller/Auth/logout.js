const { addToDenylist } = require('../../utils/tokenDenylist');
const jwt = require("jsonwebtoken");
const RefreshTokenModel = require("../../models/RefreshToken");

const logout = async (req, res) => {
  const token = req.cookies?.accessToken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (token) {
    addToDenylist(token);
  }
  
  const refreshToken = req.cookies?.refreshToken;
  if (refreshToken) {
    try {
      const decoded = jwt.decode(refreshToken);
      if (decoded && decoded.family) {
        await RefreshTokenModel.updateMany({ family: decoded.family }, { isRevoked: true });
      }
    } catch (err) {
      // Ignore errors decoding
    }
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
};

module.exports = logout;