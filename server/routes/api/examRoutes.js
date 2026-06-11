// routes/api/examRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/authMiddleware');
const { submitExam, getMyResults } = require('../../controller/exam/examController');

// Both routes require a valid JWT — unauthenticated requests get 401
router.post('/submit', verifyToken, submitExam);
router.get('/results', verifyToken, getMyResults);

module.exports = router;
