const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const dotenv = require("dotenv");
const routes = require("./routes/index");

dotenv.config();

const backend = express();
const server = http.Server(backend);

backend.use(express.json());
backend.use(express.urlencoded({ extended: true }));

backend.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://codevibeforyou.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

backend.use(routes);

// Global error handling middleware
// Express requires all 4 parameters to recognize this as an error handler
backend.use((err, req, res, _next) => {
  console.error("Unhandled error:", err.stack || err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});

const MONGODB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/codevibe";

mongoose
  .connect(MONGODB_URL)
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