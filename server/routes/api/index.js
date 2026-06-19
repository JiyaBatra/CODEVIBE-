const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const lessonRoutes = require('./lesson');
const progressRoutes = require('./progressRoutes');
const feedbackRoutes = require('./feedbackRoutes');
const executeRoutes = require('./executeRoutes');
const certificateRoutes = require("./certificateRoutes");
const contributorRoutes = require("./contributorRoutes");
const analyticsRoutes = require('./analytics');
// My Mistakes Dashboard - NEW FEATURE
const mistakesRoutes = require('./mistakesRoutes');
const examRoutes = require('./examRoutes');
const notesRoutes = require('./notesRoutes');
const bookmarkRoutes = require('./bookmarkRoutes');
const notificationRoutes = require('./notificationRoutes');
const snippetRoutes = require('./snippetRoutes');

router.use('/feedback', feedbackRoutes);
router.use('/progress', progressRoutes);
router.use('/auth', authRoutes);
router.use('/lesson', lessonRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/execute', executeRoutes);
router.use('/certificate', certificateRoutes);
router.use('/contributors', contributorRoutes);
// My Mistakes Dashboard - NEW FEATURE
router.use('/mistakes', mistakesRoutes);
router.use('/exam', examRoutes);
router.use('/notes', notesRoutes);
router.use('/bookmarks', bookmarkRoutes);
router.use('/notifications', notificationRoutes);
router.use('/snippets', snippetRoutes);

module.exports = router;
