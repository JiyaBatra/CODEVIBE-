/**
 * progressService.js
 *
 * Centralises all course-progress related database writes and wraps them in a
 * single MongoDB / Mongoose session transaction so that every related document
 * (Progress, Analytics, Notification) either commits together or is rolled back
 * together, eliminating the risk of partial writes.
 *
 * Required: MongoDB must be running as a replica set (even a single-node one)
 * for multi-document transactions to be supported.
 */

'use strict';

const mongoose = require('mongoose');
const Progress = require('../models/progress');
const Analytics = require('../models/analytics');
const Notification = require('../models/notification');
const User = require('../models/user.models');
const { checkAndAwardBadges } = require('../config/badges');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const getSubjectFromLessonId = (lessonId) => {
  if (!lessonId || typeof lessonId !== 'string') return 'Other';
  return lessonId.split('-')[0].replace(/\d+$/, '') || lessonId;
};

/**
 * Derive the updated streak values from the stored progress document.
 * Returns { currentStreak, longestStreak }.
 */
const computeStreak = (existingProgress, today) => {
  let currentStreak = existingProgress?.currentStreak || 0;
  let longestStreak = existingProgress?.longestStreak || 0;

  if (!existingProgress?.lastActiveDate) {
    currentStreak = 1;
  } else {
    const lastDate = new Date(existingProgress.lastActiveDate);
    lastDate.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      currentStreak += 1;
    } else if (diffDays > 1) {
      currentStreak = 1;
    }
    // diffDays === 0 → same day, streak unchanged
  }

  longestStreak = Math.max(longestStreak, currentStreak);
  return { currentStreak, longestStreak };
};

// ---------------------------------------------------------------------------
// Public service method
// ---------------------------------------------------------------------------

/**
 * recordLessonCompletion
 *
 * Atomically:
 *   1. Reads current Progress (within session)
 *   2. Computes XP, streak, level, badges
 *   3. Upserts Progress document
 *   4. Creates an Analytics event
 *   5. Creates Notification(s)
 *
 * If any step throws, the session aborts and all writes are rolled back.
 *
 * @param {Object} params
 * @param {string} params.email        - User email (from verified JWT)
 * @param {string} params.lessonId     - Validated lesson ID
 * @param {number} params.score        - 0–100
 * @param {number} params.coins        - 0–1000
 * @param {number} params.learningTime - seconds, 0–21600
 * @param {string} params.type         - lesson | quiz | practice | project
 *
 * @returns {Promise<Object>} The updated Progress document fields
 */
const recordLessonCompletion = async ({
  email,
  lessonId,
  score,
  coins,
  learningTime,
  type,
}) => {
  const session = await mongoose.startSession();

  try {
    let updatedProgress;

    await session.withTransaction(async () => {
      // ── 1. Read existing progress inside the transaction ──────────────────
      const existingProgress = await Progress.findOne({ email }).session(session);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // ── 2. Compute streak ─────────────────────────────────────────────────
      const { currentStreak, longestStreak } = computeStreak(existingProgress, today);

      // ── 3. Compute XP and badges (only on first completion) ───────────────
      const isNewCompletion =
        !existingProgress || !existingProgress.completedLessons.includes(lessonId);

      let earnedXp = 0;
      let earnedBadges = existingProgress?.badges || [];

      if (isNewCompletion) {
        const baseXp = Math.round(score * 0.5);

        let multiplier = 1.0;
        if (currentStreak >= 7) multiplier = 1.5;
        else if (currentStreak >= 3) multiplier = 1.2;

        earnedXp = Math.round(baseXp * multiplier);

        // Fetch analytics events for badge computation (read-only, outside
        // the transactional write set so we don't enlarge lock scope)
        const events = await Analytics.find({ email })
          .sort({ createdAt: 1 })
          .lean()
          .session(session);

        const progressData = existingProgress
          ? { ...(typeof existingProgress.toObject === 'function' ? existingProgress.toObject() : existingProgress), badges: earnedBadges }
          : { completedLessons: [], scores: {}, badges: [], currentStreak: 0 };

        const result = checkAndAwardBadges(progressData, {
          score,
          analyticsEvents: events,
        });
        earnedBadges = result.earnedBadgeIds;
      }

      const currentXp = existingProgress?.xp || 0;
      const newTotalXp = currentXp + earnedXp;
      const newLevel = Math.floor(newTotalXp / 100) + 1;

      // ── 4. Upsert Progress (transactional) ────────────────────────────────
      updatedProgress = await Progress.findOneAndUpdate(
        { email },
        {
          $addToSet: { completedLessons: lessonId },
          $set: {
            [`scores.${lessonId}`]: score,
            xp: newTotalXp,
            level: newLevel,
            badges: earnedBadges,
            currentStreak,
            longestStreak,
            lastActiveDate: today,
          },
        },
        { new: true, upsert: true, session }
      );

      // ── 5. Fetch user for analytics (non-blocking if missing) ─────────────
      const user = await User.findOne({ email }).lean().session(session);

      // ── 6. Create Analytics event (transactional) ─────────────────────────
      await Analytics.create(
        [
          {
            userId: user?._id || null,
            email,
            username: user?.username || '',
            lessonId,
            subject: getSubjectFromLessonId(lessonId),
            score,
            completed: true,
            points: score,
            coins,
            learningTime,
            type,
          },
        ],
        { session }
      );

      // ── 7. Create Notification(s) (transactional) ─────────────────────────
      const notificationsToCreate = [
        {
          email,
          type: 'lesson_complete',
          message: `You completed the lesson "${lessonId}" with a score of ${score}!`,
          relatedEntity: lessonId,
        },
      ];

      if (currentStreak > 1 && currentStreak % 5 === 0) {
        notificationsToCreate.push({
          email,
          type: 'streak_milestone',
          message: `You've reached a ${currentStreak}-day learning streak! Keep it up!`,
          relatedEntity: '',
        });
      }

      await Notification.create(notificationsToCreate, { session });
    });

    return {
      completedLessons: updatedProgress.completedLessons,
      scores: updatedProgress.scores,
      currentStreak: updatedProgress.currentStreak,
      longestStreak: updatedProgress.longestStreak,
      dailyGoal: updatedProgress.dailyGoal,
      xp: updatedProgress.xp,
      level: updatedProgress.level,
    };
  } finally {
    // Always release the session, whether or not the transaction succeeded.
    session.endSession();
  }
};

module.exports = { recordLessonCompletion };
