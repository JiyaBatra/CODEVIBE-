const express = require('express');
const request = require('supertest');
const { generalLimiter, authLimiter, compilerLimiter, feedbackLimiter } = require('../middleware/rateLimiter');

describe('Rate Limiter Middleware', () => {
    let app;

    beforeEach(() => {
        app = express();
        
        // Setup simple routes for testing the limiters
        app.get('/api/general', generalLimiter, (req, res) => res.status(200).json({ success: true }));
        app.post('/api/auth', authLimiter, (req, res) => res.status(200).json({ success: true }));
        app.post('/api/compiler', compilerLimiter, (req, res) => res.status(200).json({ success: true }));
        app.post('/api/feedback', feedbackLimiter, (req, res) => res.status(200).json({ success: true }));
    });

    test('generalLimiter should block after max requests', async () => {
        // generalMaxRequests default is 100
        // We will make 100 successful requests
        for (let i = 0; i < 100; i++) {
            const res = await request(app).get('/api/general');
            expect(res.statusCode).toBe(200);
        }
        
        // 101st request should be blocked
        const blockedRes = await request(app).get('/api/general');
        expect(blockedRes.statusCode).toBe(429);
        expect(blockedRes.body.success).toBe(false);
        expect(blockedRes.body.message).toMatch(/Too many requests/i);
    });

    test('authLimiter should block after max requests', async () => {
        // authMaxRequests default is 10
        for (let i = 0; i < 10; i++) {
            const res = await request(app).post('/api/auth');
            expect(res.statusCode).toBe(200);
        }
        
        // 11th request should be blocked
        const blockedRes = await request(app).post('/api/auth');
        expect(blockedRes.statusCode).toBe(429);
        expect(blockedRes.body.success).toBe(false);
        expect(blockedRes.body.message).toMatch(/Too many authentication attempts/i);
    });
    
    test('compilerLimiter should block after max requests', async () => {
        // compilerMaxRequests default is 10
        for (let i = 0; i < 10; i++) {
            const res = await request(app).post('/api/compiler');
            expect(res.statusCode).toBe(200);
        }
        
        // 11th request should be blocked
        const blockedRes = await request(app).post('/api/compiler');
        expect(blockedRes.statusCode).toBe(429);
        expect(blockedRes.body.success).toBe(false);
        expect(blockedRes.body.message).toMatch(/Too many code executions/i);
    });
    
    test('feedbackLimiter should block after max requests', async () => {
        // feedbackMaxRequests default is 5
        for (let i = 0; i < 5; i++) {
            const res = await request(app).post('/api/feedback');
            expect(res.statusCode).toBe(200);
        }
        
        // 6th request should be blocked
        const blockedRes = await request(app).post('/api/feedback');
        expect(blockedRes.statusCode).toBe(429);
        expect(blockedRes.body.success).toBe(false);
        expect(blockedRes.body.message).toMatch(/Too many feedback submissions/i);
    });
});
