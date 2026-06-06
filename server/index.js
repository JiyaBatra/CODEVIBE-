const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const dotenv = require("dotenv");
const routes = require("./routes/index");

dotenv.config();

const backend = express();
backend.set("trust proxy", 1);
const server = http.Server(backend);

backend.use(express.json());
backend.use(express.urlencoded({ extended: true }));

// CORS Configuration - read allowed origins from environment or use defaults
const allowedOrigins = (
  process.env.ALLOWED_ORIGINS ||
  "http://localhost:5173,http://localhost:5174,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:5174,https://codevibeforyou.netlify.app"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

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

backend.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        isLocalDevOrigin(origin) ||
        /^https:\/\/deploy-preview-\d+--codevibeforyou\.netlify\.app$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

backend.use(routes);

// Central JSON error handler for API responses
backend.use((err, req, res, next) => {
  console.error("Unhandled server error:", err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {}),
  });
});

const MONGODB_URL =
  process.env.DB_URL ||
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/codevibe";

const FALLBACK_MONGODB_URL = "mongodb://127.0.0.1:27017/codevibe";

const connectToMongo = async (url) => {
  try {
    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 10000,
    });
    return true;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    return false;
  }
};

const startServer = async () => {
  let connected = false;

  if (MONGODB_URL && MONGODB_URL !== FALLBACK_MONGODB_URL) {
    connected = await connectToMongo(MONGODB_URL);
    if (!connected) {
      console.warn("⚠️ Atlas connection failed. Falling back to local MongoDB...");
      connected = await connectToMongo(FALLBACK_MONGODB_URL);
    }
  } else {
    connected = await connectToMongo(MONGODB_URL || FALLBACK_MONGODB_URL);
  }

  if (!connected) {
    console.error("❌ MongoDB connection failed for both Atlas and local fallback.");
    return;
  }

  const PORT = process.env.PORT || 5002;

  server.listen(PORT, () => {
    console.log(`✅ Server Started on port ${PORT}`);
    console.log("✅ Connected to MongoDB");
  });
};

startServer();

const gracefulShutdown = (signal) => {
  console.log(`\n⚠️ ${signal} received. Starting graceful shutdown...`);
  
  server.close(() => {
    console.log("🏁 HTTP server closed.");
    mongoose.connection.close(false).then(() => {
      console.log("🔌 MongoDB connection closed.");
      process.exit(0);
    }).catch((err) => {
      console.error("❌ Error during MongoDB disconnection:", err);
      process.exit(1);
    });
  });
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));