const express = require("express");
const cors = require("cors");
const http = require("http");

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "https://codevibeforyou.netlify.app",
    ];

const isLocalDevOrigin = (origin = "") => {
  try {
    const { hostname, port, protocol } = new URL(origin);
    const isLocalHost =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1";
    return protocol.startsWith("http") && isLocalHost && Boolean(port);
  } catch {
    return false;
  }
};

const buildCorsMw = () =>
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        const corsError = new Error("Not allowed by CORS");
        corsError.status = 403;
        return callback(corsError);
      }
      if (
        allowedOrigins.includes(origin) ||
        isLocalDevOrigin(origin) ||
        /^https:\/\/deploy-preview-\d+--codevibeforyou\.netlify\.app$/.test(
          origin
        )
      ) {
        return callback(null, true);
      }
      const corsError = new Error("Not allowed by CORS");
      corsError.status = 403;
      return callback(corsError);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  });

function makeServer() {
  return new Promise((resolve, reject) => {
    const app = express();
    app.use(buildCorsMw());
    app.get("/api/health", (_req, res) => res.json({ ok: true }));
    app.use((err, req, res, _next) => {
      res.status(err.status || 500).json({ error: err.message });
    });
    const server = app.listen(0, () => resolve(server));
    server.on("error", reject);
  });
}

function request(host, port, origin) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { host, port, path: "/api/health", method: "GET", headers: origin ? { Origin: origin } : {} },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const hasCors = !!res.headers["access-control-allow-origin"];
          resolve({ status: res.statusCode, hasCors });
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

async function run() {
  const server = await makeServer();
  const { port } = server.address();

  const pass = [];
  const fail = [];

  async function caseOf(label, fn) {
    try {
      await fn();
      pass.push(label);
    } catch (err) {
      fail.push({ label, err: err.message });
    }
  }

  // --- missing Origin header: should NOT emit CORS header and return 403 ---
  await caseOf("rejects request without Origin header", async () => {
    const { status, hasCors } = await request("127.0.0.1", port);
    if (status !== 403) {
      throw new Error(`expected status 403 for missing Origin, got ${status}`);
    }
    if (hasCors) {
      throw new Error(
        `expected CORS header to be absent for missing Origin`
      );
    }
  });

  // --- allowed origins: CORS header emitted ---
  for (const o of [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://codevibeforyou.netlify.app",
    "https://deploy-preview-42--codevibeforyou.netlify.app",
    "http://localhost:3000",
  ]) {
    await caseOf(`allows explicitly configured origin: ${o}`, async () => {
      const { status, hasCors } = await request("127.0.0.1", port, o);
      if (status !== 200) {
        throw new Error(`expected status 200 for allowed origin, got ${status}`);
      }
      if (!hasCors) {
        throw new Error(
          `expected CORS header to be present for allowed origin ${o}`
        );
      }
    });
  }

  // --- unknown origin: CORS header absent and returns 403 ---
  await caseOf("rejects unknown cross-origin request", async () => {
    const { status, hasCors } = await request("127.0.0.1", port, "https://evil.example");
    if (status !== 403) {
      throw new Error(`expected status 403 for blocked origin, got ${status}`);
    }
    if (hasCors) {
      throw new Error(
        `expected CORS header to be absent for blocked origin`
      );
    }
  });

  server.close();

  console.log(`PASS — ${pass.length} test(s)`);
  if (pass.length) console.log("  " + pass.join("\n  "));

  if (fail.length) {
    console.log(`FAIL — ${fail.length} test(s)`);
    for (const { label, err } of fail) {
      console.log(`  ${label}: ${err}`);
    }
    process.exitCode = 1;
  }
}

run();
