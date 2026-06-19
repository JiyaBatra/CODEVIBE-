const request = require("supertest");
const mongoose = require("mongoose");

let app;

beforeAll(async () => {
  process.env.ALLOWED_ORIGINS = "http://localhost:5173,http://localhost:5174,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:5174,https://codevibeforyou.netlify.app";
  process.env.NODE_ENV = "development";

  jest.isolateModules(() => {
    const { backend } = require("../index");
    app = backend;
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("CORS Configuration", () => {
  test("should allow requests from allowed origins", async () => {
    const res = await request(app)
      .options("/")
      .set("Origin", "http://localhost:5173")
      .set("Access-Control-Request-Method", "GET");

    expect(res.status).toBe(204);
    expect(res.headers["access-control-allow-origin"]).toBe("http://localhost:5173");
  });

  test("should allow requests from localhost development origins", async () => {
    const res = await request(app)
      .options("/")
      .set("Origin", "http://localhost:3000")
      .set("Access-Control-Request-Method", "GET");

    expect(res.status).toBe(204);
    expect(res.headers["access-control-allow-origin"]).toBe("http://localhost:3000");
  });

  test("should reject requests with missing Origin header", async () => {
    const res = await request(app)
      .options("/")
      .set("Access-Control-Request-Method", "GET");

    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });

  test("should reject requests from disallowed origins", async () => {
    const res = await request(app)
      .options("/")
      .set("Origin", "http://evil.com")
      .set("Access-Control-Request-Method", "GET");

    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });

  test("should reject requests from localhost without port", async () => {
    const res = await request(app)
      .options("/")
      .set("Origin", "http://localhost")
      .set("Access-Control-Request-Method", "GET");

    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });

  test("should allow requests from deploy preview Netlify URLs", async () => {
    const res = await request(app)
      .options("/")
      .set("Origin", "https://deploy-preview-123--codevibeforyou.netlify.app")
      .set("Access-Control-Request-Method", "GET");

    expect(res.status).toBe(204);
    expect(res.headers["access-control-allow-origin"]).toBe("https://deploy-preview-123--codevibeforyou.netlify.app");
  });

  test("should allow requests from production Netlify URL", async () => {
    const res = await request(app)
      .options("/")
      .set("Origin", "https://codevibeforyou.netlify.app")
      .set("Access-Control-Request-Method", "GET");

    expect(res.status).toBe(204);
    expect(res.headers["access-control-allow-origin"]).toBe("https://codevibeforyou.netlify.app");
  });

  test("should allow credentialed requests from allowed origins", async () => {
    const res = await request(app)
      .get("/api")
      .set("Origin", "http://localhost:5173");

    expect(res.headers["access-control-allow-credentials"]).toBe("true");
    expect(res.headers["access-control-allow-origin"]).toBe("http://localhost:5173");
  });
});
