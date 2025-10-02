const express = require("express");
const { createCourse, getCourses } = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createCourse);
router.get("/", getCourses);

module.exports = router;
