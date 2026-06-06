const supertest = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const { app } = require("../index");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("POST /api/auth/register", () => {
  it("returns 400 when required fields are missing", async () => {
    const res = await supertest(app)
      .post("/api/auth/register")
      .send({ email: "test@test.com" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("registers a new user successfully", async () => {
    const res = await supertest(app)
      .post("/api/auth/register")
      .send({
        username: "testuser",
        email: "test@test.com",
        password: "Test@123",
        college: "Test University",
        year: "3rd Year",
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user).toHaveProperty("username", "testuser");
    expect(res.body.user).toHaveProperty("email", "test@test.com");
  });

  it("rejects duplicate email registration", async () => {
    const res = await supertest(app)
      .post("/api/auth/register")
      .send({
        username: "anotheruser",
        email: "test@test.com",
        password: "Test@456",
        college: "Another University",
        year: "2nd Year",
      });

    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("message");
  });
});

describe("POST /api/auth/login", () => {
  beforeAll(async () => {
    await mongoose.connection.dropDatabase();
  });

  it("returns 400 when email and password are missing", async () => {
    const res = await supertest(app)
      .post("/api/auth/login")
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("returns 404 when user does not exist", async () => {
    const res = await supertest(app)
      .post("/api/auth/login")
      .send({ email: "nonexistent@test.com", password: "Test@123" });

    expect(res.status).toBe(404);
  });

  it("logs in successfully and returns JWT", async () => {
    await supertest(app)
      .post("/api/auth/register")
      .send({
        username: "loginuser",
        email: "login@test.com",
        password: "Pass@123",
        college: "Test College",
        year: "1st Year",
      });

    const res = await supertest(app)
      .post("/api/auth/login")
      .send({ email: "login@test.com", password: "Pass@123" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty("token");
  });

  it("returns 401 on wrong password", async () => {
    const res = await supertest(app)
      .post("/api/auth/login")
      .send({ email: "login@test.com", password: "WrongPass@123" });

    expect(res.status).toBe(401);
  });
});

describe("POST /api/auth/forgot-password", () => {
  it("returns 200 for non-existent email (generic message)", async () => {
    const res = await supertest(app)
      .post("/api/auth/forgot-password")
      .send({ email: "noone@test.com" });

    expect(res.status).toBe(200);
    expect(res.body.message).toContain("If an account exists");
  });
});
