const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const routes = require("./routes/index");

dotenv.config();

const backend = express();
const server = http.Server(backend);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many requests from this IP, please try again after 15 minutes"
  }
});

backend.use("/api/", apiLimiter);

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