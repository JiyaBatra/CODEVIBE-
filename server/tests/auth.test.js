const request = require('supertest');
const app = require('../index'); // Adjust to your actual express app export
const mongoose = require('mongoose');
const UserModel = require('../models/user.models');
const RefreshTokenModel = require('../models/RefreshToken');
const { JWT_SECRET } = require('../config/jwt');

describe('Auth Endpoints with HTTP-Only Cookies', () => {
  beforeAll(async () => {
    // Assuming DB connection is handled by your test environment setup
    await UserModel.deleteMany({});
    await RefreshTokenModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  let userCookie = '';
  let refreshCookie = '';
  let userFamily = '';

  test('POST /api/auth/register should register and set cookies', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@test.com',
        password: 'Password123!',
        college: 'Test College',
        year: '2024'
      });

    expect(res.statusCode).toBe(201);
    expect(res.headers['set-cookie']).toBeDefined();
    
    const setCookieStr = res.headers['set-cookie'].join(';');
    expect(setCookieStr).toContain('accessToken=');
    expect(setCookieStr).toContain('refreshToken=');
    expect(setCookieStr).toContain('HttpOnly');

    // Extract cookies for later
    userCookie = res.headers['set-cookie'].find(c => c.startsWith('accessToken=')).split(';')[0];
    refreshCookie = res.headers['set-cookie'].find(c => c.startsWith('refreshToken=')).split(';')[0];

    const tokens = await RefreshTokenModel.find({ user: res.body.user.id });
    expect(tokens.length).toBe(1);
    userFamily = tokens[0].family;
  });

  test('POST /api/auth/refresh should rotate the token successfully', async () => {
    const res = await request(app)
      .post('/api/auth/refresh')
      .set('Cookie', [`${refreshCookie}`]);

    expect(res.statusCode).toBe(200);
    expect(res.headers['set-cookie']).toBeDefined();

    const newRefreshCookie = res.headers['set-cookie'].find(c => c.startsWith('refreshToken=')).split(';')[0];
    expect(newRefreshCookie).not.toBe(refreshCookie);

    // DB state check: Old token should be revoked, new token should be active, family should match
    const tokens = await RefreshTokenModel.find({ family: userFamily });
    expect(tokens.length).toBe(2);

    const oldToken = tokens.find(t => t.isRevoked === true);
    const newToken = tokens.find(t => t.isRevoked === false);

    expect(oldToken).toBeDefined();
    expect(newToken).toBeDefined();

    // Update refresh cookie for next test
    refreshCookie = newRefreshCookie;
  });

  test('POST /api/auth/refresh with revoked token (Token Reuse Attack)', async () => {
    // Get the old revoked token from DB
    const tokens = await RefreshTokenModel.find({ family: userFamily, isRevoked: true });
    const oldRevokedTokenStr = tokens[0].token;

    // Attempt to refresh using the compromised token
    const res = await request(app)
      .post('/api/auth/refresh')
      .set('Cookie', [`refreshToken=${oldRevokedTokenStr}`]);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toContain('Token reuse detected');

    // ALL tokens in the family should now be revoked
    const familyTokens = await RefreshTokenModel.find({ family: userFamily });
    expect(familyTokens.every(t => t.isRevoked === true)).toBe(true);
  });

  test('POST /api/auth/logout should revoke the family', async () => {
    // Log in again to get fresh tokens
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'Password123!' });

    const newRefreshCookieStr = loginRes.headers['set-cookie'].find(c => c.startsWith('refreshToken=')).split(';')[0];

    const logoutRes = await request(app)
      .post('/api/auth/logout')
      .set('Cookie', [`${newRefreshCookieStr}`]);

    expect(logoutRes.statusCode).toBe(200);

    // Verify cookies are cleared
    const clearCookies = logoutRes.headers['set-cookie'].join(';');
    expect(clearCookies).toContain('accessToken=;');
    expect(clearCookies).toContain('refreshToken=;');
  });
});
