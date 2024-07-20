const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const connectToDb = require("./utils/connectToDb");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// Connect to the database
connectToDb();

// Middleware
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/api/auth");
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
