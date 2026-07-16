const jwt = require("jsonwebtoken");
const RefreshTokenModel = require("../../models/RefreshToken");
const { JWT_SECRET, JWT_EXPIRES_IN, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN } = require("../../config/jwt");

const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // Check DB for the token
    const tokenDoc = await RefreshTokenModel.findOne({ token: refreshToken });

    if (!tokenDoc) {
      // The token is not in our database.
      // But let's check if it's a validly signed token. If so, it might be a reuse of a rotated token.
      try {
        const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        // It's valid but not in DB. If it has a family, revoke it.
        if (decoded.family) {
          await RefreshTokenModel.updateMany({ family: decoded.family }, { isRevoked: true });
        }
      } catch (err) {
        // Just invalid token
      }
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return res.status(403).json({ message: "Token reuse detected or invalid token. Please log in again." });
    }

    if (tokenDoc.isRevoked) {
      // Token reuse detected! Revoke entire family
      await RefreshTokenModel.updateMany({ family: tokenDoc.family }, { isRevoked: true });
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return res.status(403).json({ message: "Token reuse detected. Please log in again." });
    }

    try {
      const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

      // Mark current token as revoked
      tokenDoc.isRevoked = true;
      await tokenDoc.save();

      const newAccessToken = jwt.sign(
        { userId: decoded.userId || decoded.id, email: decoded.email, username: decoded.username, role: decoded.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      const newRefreshToken = jwt.sign(
        { userId: decoded.userId || decoded.id, email: decoded.email, username: decoded.username, role: decoded.role, family: decoded.family },
        REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
      );

      // Save new token to DB
      await RefreshTokenModel.create({
        token: newRefreshToken,
        user: tokenDoc.user,
        family: decoded.family,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      });

      const isProd = process.env.NODE_ENV === "production";

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000 // 15 mins
      });

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: "strict",
        path: "/api/auth/refresh",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      return res.status(200).json({ success: true, message: "Token refreshed successfully" });
    } catch (_err) {
      // Expired token
      tokenDoc.isRevoked = true;
      await tokenDoc.save();
      return res.status(401).json({ message: "Invalid or expired refresh token" });
    }
  } catch (error) {
    console.error("Refresh token error:", error);
    next(error);
  }
};

module.exports = refresh;
