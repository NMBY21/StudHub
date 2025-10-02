const express = require("express");
const { getMyProfile, getAllUsers } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile); // logged-in user
router.get("/", authMiddleware, getAllUsers);   // all users

module.exports = router;
