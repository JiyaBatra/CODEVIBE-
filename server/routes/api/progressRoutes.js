const express = require('express');
const router = express.Router();
const progressController = require('../../controller/progress/progresscontroller');
const verifyToken = require('../../middleware/authMiddleware');

router.get('/:email', verifyToken, progressController.getProgress);

module.exports = router;
