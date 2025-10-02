const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const userRoutes = require("./routes/userRoutes");

// Models
const User = require("./models/User");

// Routes
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const quizRoutes = require("./routes/quizzes");
const resultRoutes = require("./routes/results");

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true,               // allow cookies/auth headers
}));

// Parse JSON
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/users", userRoutes);


// Default route
app.get("/", (req, res) => res.send("StudyHub API is running"));

// Sync DB and start server
const PORT = process.env.PORT || 5000;
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("DB connection failed:", err));
