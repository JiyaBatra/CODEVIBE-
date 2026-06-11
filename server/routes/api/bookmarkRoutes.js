const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/authMiddleware");
const bookmarkController = require("../../controller/bookmarkController");

router.get("/", verifyToken, bookmarkController.getBookmarks);
router.post("/", verifyToken, bookmarkController.toggleBookmark);
router.delete("/:lessonId", verifyToken, bookmarkController.removeBookmark);

module.exports = router;
