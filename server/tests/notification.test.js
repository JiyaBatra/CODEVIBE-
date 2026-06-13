const request = require("supertest");

const mockSave = jest.fn();
const mockNotification = jest.fn();
const mockFind = jest.fn();
const mockFindOneAndUpdate = jest.fn();
const mockUpdateMany = jest.fn();
const mockCountDocuments = jest.fn();
const mockCreate = jest.fn();
const mockSort = jest.fn();
const mockLimit = jest.fn();
const mockThen = jest.fn();

const mockNotificationInstance = {
  _id: "notif123",
  email: "student@test.com",
  type: "lesson_complete",
  message: "You completed Lesson 1",
  relatedEntity: "lesson-1",
  read: false,
  createdAt: new Date().toISOString(),
  save: mockSave,
};

jest.mock("../models/notification", () => {
  const mockStatic = jest.fn(() => mockNotificationInstance);
  mockStatic.find = jest.fn(() => ({
    sort: jest.fn(() => ({
      limit: jest.fn(() => Promise.resolve([mockNotificationInstance])),
    })),
  }));
  mockStatic.findOneAndUpdate = jest.fn(() =>
    Promise.resolve({ ...mockNotificationInstance, read: true })
  );
  mockStatic.updateMany = jest.fn(() => Promise.resolve({ modifiedCount: 1 }));
  mockStatic.countDocuments = jest.fn(() => Promise.resolve(3));
  mockStatic.create = jest.fn(() =>
    Promise.resolve(mockNotificationInstance)
  );
  return mockStatic;
});

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(() => ({ email: "student@test.com", id: "user123" })),
}));

let app;

beforeAll(async () => {
  process.env.ALLOWED_ORIGINS = "http://localhost:5173";
  process.env.NODE_ENV = "test";
  process.env.JWT_SECRET = "test-secret";

  jest.isolateModules(() => {
    const { backend } = require("../index");
    app = backend;
  });
});

afterAll(async () => {
  jest.restoreAllMocks();
});

describe("Notification API - GET /api/notifications", () => {
  test("should return 401 without auth token", async () => {
    const res = await request(app).get("/api/notifications");
    expect(res.status).toBe(401);
  });

  test("should return notifications with valid token", async () => {
    const res = await request(app)
      .get("/api/notifications")
      .set("Authorization", "Bearer valid-token")
      .set("Origin", "http://localhost:5173");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("Notification API - GET /api/notifications/unread-count", () => {
  test("should return unread count", async () => {
    const res = await request(app)
      .get("/api/notifications/unread-count")
      .set("Authorization", "Bearer valid-token")
      .set("Origin", "http://localhost:5173");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("count");
  });
});

describe("Notification API - PATCH /api/notifications/:id/read", () => {
  test("should mark notification as read", async () => {
    const res = await request(app)
      .patch("/api/notifications/notif123/read")
      .set("Authorization", "Bearer valid-token")
      .set("Origin", "http://localhost:5173");

    expect(res.status).toBe(200);
    expect(res.body.read).toBe(true);
  });
});

describe("Notification API - PATCH /api/notifications/read-all", () => {
  test("should mark all notifications as read", async () => {
    const res = await request(app)
      .patch("/api/notifications/read-all")
      .set("Authorization", "Bearer valid-token")
      .set("Origin", "http://localhost:5173");

    expect(res.status).toBe(200);
  });
});

describe("Notification API - POST /api/notifications", () => {
  test("should create a new notification", async () => {
    const res = await request(app)
      .post("/api/notifications")
      .set("Authorization", "Bearer valid-token")
      .set("Origin", "http://localhost:5173")
      .send({
        email: "student@test.com",
        type: "lesson_complete",
        message: "You completed Lesson 1",
        relatedEntity: "lesson-1",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });

  test("should reject notification without required fields", async () => {
    const res = await request(app)
      .post("/api/notifications")
      .set("Authorization", "Bearer valid-token")
      .set("Origin", "http://localhost:5173")
      .send({
        email: "student@test.com",
      });

    expect(res.status).toBe(400);
  });
});
