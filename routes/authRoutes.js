const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authmiddleware");
const {signup, signin, getUserProfile}= require("../controllers/authController");



//! signup user
router.post("/signup", signup)

//! signin user
router.post("/signin", signin)

//! User Profile route
router.get("/userProfile", authenticateToken, getUserProfile)


module.exports = router