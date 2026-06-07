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

const PORT = process.env.PORT || 5002;

server.listen(PORT, () => {
  console.log(`✅ Server Started on port ${PORT}`);
});

const connectDB = async () => {
  const configuredUri = process.env.DB_URL || process.env.MONGODB_URI;
  if (configuredUri) {
    try {
      await mongoose.connect(configuredUri);
      console.log("✅ Connected to MongoDB (from environment variable)");
      return;
    } catch (err) {
      console.error("❌ MongoDB connection error for configured URI:", err);
      process.exit(1);
    }
  }

  // Try local MongoDB
  const localUri = "mongodb://127.0.0.1:27017/codevibe";
  try {
    await mongoose.connect(localUri, { serverSelectionTimeoutMS: 2000 });
    console.log("✅ Connected to local MongoDB");
  } catch (err) {
    console.warn("⚠️ Local MongoDB connection failed. Starting in-memory MongoDB database...");
    try {
      const { MongoMemoryServer } = require("mongodb-memory-server");
      const mongoServer = await MongoMemoryServer.create();
      const inMemoryUri = mongoServer.getUri();
      console.log(`✨ In-Memory MongoDB started at: ${inMemoryUri}`);
      await mongoose.connect(inMemoryUri);
      console.log("✅ Connected to In-Memory MongoDB");
      
      // Store the server instance on the mongoose connection so we can stop it on shutdown
      mongoose.connection.mongoServer = mongoServer;
    } catch (memErr) {
      console.error("❌ Failed to start or connect to in-memory MongoDB:", memErr);
      process.exit(1);
    }
  }
};

connectDB();

const gracefulShutdown = (signal) => {
  console.log(`\n⚠️ ${signal} received. Starting graceful shutdown...`);
  
  server.close(() => {
    console.log("🏁 HTTP server closed.");
    mongoose.connection.close(false).then(async () => {
      console.log("🔌 MongoDB connection closed.");
      if (mongoose.connection.mongoServer) {
        await mongoose.connection.mongoServer.stop();
        console.log("🛑 In-Memory MongoDB stopped.");
      }
      process.exit(0);
    }).catch((err) => {
      console.error("❌ Error during MongoDB disconnection:", err);
      process.exit(1);
    });
  });
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
