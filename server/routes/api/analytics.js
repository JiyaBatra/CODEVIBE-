const express = require('express');
const router = express.Router();
console.log("Analytics routes loaded");
const verifyToken = require('../../middleware/authMiddleware');
const analyticsController = require('../../controller/analytics/analyticsController');

router.get('/:email', verifyToken, analyticsController.getAnalytics);

module.exports = router;