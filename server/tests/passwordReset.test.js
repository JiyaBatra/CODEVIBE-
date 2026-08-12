const request = require('supertest');
const app = require('../index').backend;
const UserModel = require('../models/user.models');
const nodemailer = require('nodemailer');

// Mock nodemailer
jest.mock('nodemailer', () => {
  const sendMailMock = jest.fn().mockResolvedValue(true);
  return {
    createTransport: jest.fn().mockReturnValue({
      verify: jest.fn().mockResolvedValue(true),
      sendMail: sendMailMock,
    }),
    _sendMailMock: sendMailMock,
  };
});

// Mock the User Model to avoid real DB connections
jest.mock('../models/user.models', () => {
  let mockDB = {}; // Stores user state
  
  return {
    findOne: jest.fn(async (query) => {
      // Find by email or resetToken
      if (query.$or) {
        const email = query.$or[0].email || query.$or[1].Email;
        return mockDB[email] || null;
      }
      if (query.resetToken) {
        return Object.values(mockDB).find(u => u.resetToken === query.resetToken) || null;
      }
      return null;
    }),
    __setMockUser: (user) => {
      mockDB[user.email] = {
        ...user,
        save: jest.fn().mockImplementation(async function() {
           // Simulate saving by updating the mockDB with this object's state
           mockDB[this.email] = this;
           return this;
        })
      };
    },
    __clearMock: () => { mockDB = {}; }
  };
});


describe('Secure Password Reset Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    UserModel.__clearMock();
    
    // Set dummy env vars to prevent 500 errors
    process.env.EMAIL_USER = 'dummy@test.com';
    process.env.EMAIL_PASS = 'dummypass';
    
    // Seed our mock user
    UserModel.__setMockUser({
      username: 'reset_tester',
      email: 'reset@test.com',
      Email: 'reset@test.com',
      password: 'OldPassword123!',
      resetToken: undefined,
      resetTokenExpiry: undefined
    });
  });

  test('POST /api/auth/forgot-password should generate hashed token and send email', async () => {
    const res = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: 'reset@test.com' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    const sendMailMock = require('nodemailer')._sendMailMock;
    expect(sendMailMock).toHaveBeenCalledTimes(1);

    // Verify token was hashed in the mock DB
    const dbUser = await UserModel.findOne({ $or: [{email: 'reset@test.com'}, {Email: 'reset@test.com'}] });
    expect(dbUser.resetToken).toBeDefined();
    expect(dbUser.resetToken).toMatch(/^[a-f0-9]{64}$/); // SHA-256 length
    expect(dbUser.resetTokenExpiry).toBeDefined();
  });

  test('POST /api/auth/reset-password should successfully reset password with valid token', async () => {
    await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: 'reset@test.com' });

    const sendMailMock = require('nodemailer')._sendMailMock;
    const mailOptions = sendMailMock.mock.calls[0][0];
    
    // Extract raw token from email
    const tokenMatch = mailOptions.html.match(/token=([a-f0-9]+)/);
    const token = tokenMatch[1];

    const resetRes = await request(app)
      .post('/api/auth/reset-password')
      .send({
        token,
        newPassword: 'NewSecurePassword123!',
      });

    expect(resetRes.statusCode).toBe(200);
    expect(resetRes.body.success).toBe(true);

    // Verify token is invalidated
    const dbUser = await UserModel.findOne({ $or: [{email: 'reset@test.com'}, {Email: 'reset@test.com'}] });
    expect(dbUser.resetToken).toBeUndefined();
    expect(dbUser.resetTokenExpiry).toBeUndefined();
  });

  test('POST /api/auth/reset-password should reject invalid token', async () => {
    const resetRes = await request(app)
      .post('/api/auth/reset-password')
      .send({
        token: 'invalid_or_made_up_token',
        newPassword: 'NewSecurePassword123!',
      });

    expect(resetRes.statusCode).toBe(400);
    expect(resetRes.body.success).toBe(false);
  });
});
