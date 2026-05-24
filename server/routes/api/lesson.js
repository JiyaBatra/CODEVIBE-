const express = require("express");
const { 
  getAllLessons, 
  getLesson, 
  completeLesson 
} = require("../../controller/Lesson/lessoncontroller");
const verifyToken = require('../../middleware/authMiddleware');

const router = express.Router();

router.get("/", getAllLessons);
router.get("/:id", getLesson);
router.post("/:id/complete", verifyToken, completeLesson);

module.exports = router;