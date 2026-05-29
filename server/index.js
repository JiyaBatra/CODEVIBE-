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

const useInMemoryDb =
  process.env.USE_IN_MEMORY_DB === "true" ||
  (!process.env.DB_URL && !process.env.MONGODB_URI && process.env.NODE_ENV !== "production");

const getMongoUri = async () => {
  if (process.env.DB_URL) return process.env.DB_URL;
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;

  if (useInMemoryDb) {
    try {
      const { MongoMemoryServer } = require("mongodb-memory-server");
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      console.log("🔧 Using in-memory MongoDB for development");
      return uri;
    } catch (error) {
      console.warn(
        "⚠️ mongodb-memory-server is not installed or failed to load. Falling back to local MongoDB.",
        error.message
      );
    }
  }

  return "mongodb://127.0.0.1:27017/codevibe";
};

getMongoUri()
  .then((mongoUri) => mongoose.connect(mongoUri))
  .then(() => {
    const PORT = process.env.PORT || 5002;

    server.listen(PORT, () => {
      console.log(`✅ Server Started on port ${PORT}`);
      console.log("✅ Connected to MongoDB");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });