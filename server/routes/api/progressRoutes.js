const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/authMiddleware');
const progressController = require('../../controller/progress/progresscontroller');

router.get('/leaderboard', progressController.getLeaderboard);
router.get('/:email', verifyToken, progressController.getProgress);

module.exports = router;
