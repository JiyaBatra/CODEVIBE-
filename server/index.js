const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const routes = require("./routes/index");
const passport = require("passport");
require("./config/passport");

const backend = express();
backend.set("trust proxy", 1);
let server;

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Rejection:", reason);
});

backend.use(express.json());
backend.use(express.urlencoded({ extended: true }));
backend.use(passport.initialize());

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
      if (
        allowedOrigins.includes(origin) ||
        isLocalDevOrigin(origin) ||
        /^https:\/\/deploy-preview-\d+--codevibeforyou\.netlify\.app$/.test(origin)
      ) {
        return callback(null, true);
      }

      if (!origin) {
        console.log("❌ Blocked request with missing Origin header");
        return callback(null, false);
      }

      console.log("❌ Blocked CORS origin:", origin);

      return callback(null, false); // 👈 IMPORTANT CHANGE
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

const MONGOOSE_OPTIONS = {
  serverSelectionTimeoutMS: 10000,
};

const DEFAULT_PORT = Number(process.env.PORT) || 5002;
const MAX_PORT_ATTEMPTS = 10;

const tryStartServer = (port, attempt = 1) => {
  server = backend.listen(port, () => {
    console.log(`✅ Server Started on port ${port}`);
    if (port !== DEFAULT_PORT) {
      console.log(
        `ℹ️ Fallback port used because ${DEFAULT_PORT} was already occupied.`
      );
    }
  });

  server.once("error", (err) => {
    if (err.code === "EADDRINUSE" && attempt < MAX_PORT_ATTEMPTS) {
      const nextPort = port + 1;
      console.warn(
        `⚠️ Port ${port} is in use. Attempting fallback port ${nextPort}...`
      );
      return tryStartServer(nextPort, attempt + 1);
    }

    if (err.code === "EADDRINUSE") {
      console.error(
        `❌ Could not bind to any port from ${DEFAULT_PORT} to ${DEFAULT_PORT + MAX_PORT_ATTEMPTS - 1}.`
      );
    } else {
      console.error("❌ HTTP server error:", err);
    }

    process.exit(1);
  });
};

const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGODB_URL, MONGOOSE_OPTIONS);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
    console.warn(
      "⚠️ Running in development mode without a live MongoDB connection."
    );
  } finally {
    tryStartServer(DEFAULT_PORT);
  }
};

if (require.main === module) {
  connectToMongo();
}

module.exports = { backend, allowedOrigins, isLocalDevOrigin };

const gracefulShutdown = (signal) => {
  console.log(`\n⚠️ ${signal} received. Starting graceful shutdown...`);

  if (server && server.close) {
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
  } else {
    mongoose.connection.close(false).then(() => {
      console.log("🔌 MongoDB connection closed.");
      process.exit(0);
    }).catch((err) => {
      console.error("❌ Error during MongoDB disconnection:", err);
      process.exit(1);
    });
  }
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));