/**
 * progressTransaction.test.js
 *
 * Unit / integration tests for the transactional progressService.
 *
 * All Mongoose models and mongoose itself are mocked so the suite runs
 * offline (no MongoDB required).  The tests verify:
 *   1. Happy path – Progress, Analytics, Notification all created atomically.
 *   2. Rollback – When a DB write throws, the session is aborted and
 *      endSession is always called.
 *   3. Streak milestone notification – fired when streak % 5 === 0.
 *   4. Idempotency – Repeated completion of the same lesson yields no extra XP.
 */

'use strict';

// ---------------------------------------------------------------------------
// Declare stores at module scope so they are accessible inside jest.mock
// factories (jest.mock is hoisted, but the factory closure captures module-
// scope variables, not outer-block variables defined after jest.mock calls).
// ---------------------------------------------------------------------------

// These will be mutated per-test via Object.assign / push
const stores = {
  progress: {},
  analytics: [],
  notifications: [],
};

// Controls whether withTransaction simulates a failure
const flags = {
  transactionShouldFail: false,
};

// ---------------------------------------------------------------------------
// Mock mongoose
// ---------------------------------------------------------------------------

jest.mock('mongoose', () => {
  return {
    startSession: jest.fn().mockImplementation(() =>
      Promise.resolve({
        endSession: jest.fn(),
        withTransaction: jest.fn().mockImplementation(async (fn) => {
          if (flags.transactionShouldFail) {
            throw new Error('Transaction aborted: simulated write conflict');
          }
          await fn();
        }),
      })
    ),
  };
});

// ---------------------------------------------------------------------------
// Mock models
// ---------------------------------------------------------------------------

jest.mock('../models/progress', () => {
  // Returns a chainable query-like object
  const makeQuery = (resolvedValue) => ({
    session: jest.fn().mockReturnThis(),
    lean: jest.fn().mockReturnThis(),
    then: (resolve, reject) => Promise.resolve(resolvedValue).then(resolve, reject),
    catch: (reject) => Promise.resolve(resolvedValue).catch(reject),
  });

  return {
    findOne: jest.fn().mockImplementation(({ email }) => {
      return makeQuery(stores.progress[email] || null);
    }),
    findOneAndUpdate: jest.fn().mockImplementation(async ({ email }, update) => {
      const existing = stores.progress[email] || {
        completedLessons: [],
        scores: {},
        badges: [],
        xp: 0,
        level: 1,
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
        dailyGoal: 1,
      };
      if (update.$addToSet?.completedLessons) {
        const id = update.$addToSet.completedLessons;
        if (!existing.completedLessons.includes(id)) {
          existing.completedLessons.push(id);
        }
      }
      if (update.$set) Object.assign(existing, update.$set);
      stores.progress[email] = existing;
      return existing;
    }),
  };
});

jest.mock('../models/analytics', () => {
  const makeQuery = (resolvedValue) => ({
    session: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    lean: jest.fn().mockReturnThis(),
    then: (resolve, reject) => Promise.resolve(resolvedValue).then(resolve, reject),
    catch: (reject) => Promise.resolve(resolvedValue).catch(reject),
  });

  return {
    find: jest.fn().mockImplementation(() => makeQuery([])),
    create: jest.fn().mockImplementation(async (docs) => {
      const arr = Array.isArray(docs) ? docs : [docs];
      arr.forEach((d) => stores.analytics.push(typeof d === 'object' ? d : {}));
      return arr;
    }),
  };
});

jest.mock('../models/notification', () => ({
  create: jest.fn().mockImplementation(async (docs) => {
    const arr = Array.isArray(docs) ? docs : [docs];
    arr.forEach((d) => stores.notifications.push(typeof d === 'object' ? d : {}));
    return arr;
  }),
}));

jest.mock('../models/user.models', () => {
  const makeQuery = (resolvedValue) => ({
    session: jest.fn().mockReturnThis(),
    lean: jest.fn().mockReturnThis(),
    then: (resolve, reject) => Promise.resolve(resolvedValue).then(resolve, reject),
    catch: (reject) => Promise.resolve(resolvedValue).catch(reject),
  });
  return {
    findOne: jest.fn().mockImplementation(() =>
      makeQuery({ _id: 'user123', username: 'tester' })
    ),
  };
});

jest.mock('../config/badges', () => ({
  checkAndAwardBadges: jest.fn().mockImplementation((progressData) => ({
    earnedBadgeIds: progressData.badges || [],
  })),
}));

// ---------------------------------------------------------------------------
// Import SUT after all mocks are in place
// ---------------------------------------------------------------------------

const { recordLessonCompletion } = require('../services/progressService');
const mongoose = require('mongoose');

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

describe('progressService – recordLessonCompletion (transactional)', () => {
  const baseParams = {
    email: 'student@test.com',
    lessonId: 'html-lesson-1',
    score: 80,
    coins: 10,
    learningTime: 300,
    type: 'lesson',
  };

  let capturedSession;

  beforeEach(async () => {
    // Reset stores
    stores.progress = {};
    stores.analytics.length = 0;
    stores.notifications.length = 0;
    flags.transactionShouldFail = false;

    // Rebuild fresh session mock each test
    capturedSession = {
      endSession: jest.fn(),
      withTransaction: jest.fn().mockImplementation(async (fn) => {
        if (flags.transactionShouldFail) {
          throw new Error('Transaction aborted: simulated write conflict');
        }
        await fn();
      }),
    };
    mongoose.startSession.mockResolvedValue(capturedSession);

    jest.clearAllMocks();
    // Re-apply the resolved value since clearAllMocks resets it
    mongoose.startSession.mockResolvedValue(capturedSession);
  });

  // ── 1. Happy path ──────────────────────────────────────────────────────────
  test('should commit Progress, Analytics and Notification atomically', async () => {
    const result = await recordLessonCompletion(baseParams);

    // Session lifecycle
    expect(mongoose.startSession).toHaveBeenCalledTimes(1);
    expect(capturedSession.withTransaction).toHaveBeenCalledTimes(1);
    expect(capturedSession.endSession).toHaveBeenCalledTimes(1);

    // Progress updated
    expect(stores.progress['student@test.com']).toBeDefined();
    expect(stores.progress['student@test.com'].completedLessons).toContain('html-lesson-1');
    expect(stores.progress['student@test.com'].xp).toBeGreaterThan(0);

    // Analytics created
    expect(stores.analytics).toHaveLength(1);
    expect(stores.analytics[0]).toMatchObject({
      email: 'student@test.com',
      lessonId: 'html-lesson-1',
      score: 80,
    });

    // Lesson-complete notification created
    const notifTypes = stores.notifications.map((n) => n.type);
    expect(notifTypes).toContain('lesson_complete');

    // Return value has correct shape
    expect(result).toMatchObject({
      completedLessons: expect.arrayContaining(['html-lesson-1']),
      currentStreak: expect.any(Number),
      longestStreak: expect.any(Number),
    });
  });

  // ── 2. Rollback on DB failure ──────────────────────────────────────────────
  test('should abort transaction and always call endSession on failure', async () => {
    flags.transactionShouldFail = true;

    await expect(recordLessonCompletion(baseParams)).rejects.toThrow(
      'Transaction aborted'
    );

    // endSession must always be called, even after a failure
    expect(capturedSession.endSession).toHaveBeenCalledTimes(1);

    // Nothing should have been persisted
    expect(stores.progress).toEqual({});
    expect(stores.analytics).toHaveLength(0);
    expect(stores.notifications).toHaveLength(0);
  });

  // ── 3. Streak milestone notification ──────────────────────────────────────
  test('should create a streak_milestone notification when streak hits a multiple of 5', async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    // Seed: user on a 4-day streak, last active yesterday
    stores.progress['student@test.com'] = {
      completedLessons: [],
      scores: {},
      badges: [],
      xp: 0,
      level: 1,
      currentStreak: 4,
      longestStreak: 4,
      lastActiveDate: yesterday,
      dailyGoal: 1,
    };

    const ProgressMock = require('../models/progress');
    ProgressMock.findOne.mockImplementation(({ email }) => {
      const val = stores.progress[email] || null;
      return {
        session: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        then: (resolve, reject) => Promise.resolve(val).then(resolve, reject),
        catch: (reject) => Promise.resolve(val).catch(reject),
      };
    });

    await recordLessonCompletion(baseParams);

    const streakNotif = stores.notifications.find((n) => n.type === 'streak_milestone');
    expect(streakNotif).toBeDefined();
    expect(streakNotif.message).toMatch(/5-day/);
  });

  // ── 4. Idempotency – repeated lesson completion ────────────────────────────
  test('should not award extra XP when the same lesson is completed again', async () => {
    // Pre-seed: lesson already completed with 40 XP
    stores.progress['student@test.com'] = {
      completedLessons: ['html-lesson-1'],
      scores: { 'html-lesson-1': 80 },
      badges: [],
      xp: 40,
      level: 1,
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: new Date(),
      dailyGoal: 1,
    };

    const ProgressMock = require('../models/progress');
    ProgressMock.findOne.mockImplementation(({ email }) => {
      const val = stores.progress[email] || null;
      return {
        session: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        then: (resolve, reject) => Promise.resolve(val).then(resolve, reject),
        catch: (reject) => Promise.resolve(val).catch(reject),
      };
    });

    const result = await recordLessonCompletion(baseParams);

    // XP unchanged
    expect(stores.progress['student@test.com'].xp).toBe(40);
    expect(result.xp).toBe(40);
  });
});
