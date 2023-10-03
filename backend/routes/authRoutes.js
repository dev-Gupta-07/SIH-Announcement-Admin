const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();
router.route("/").post(registerUser);
router.post("/login", loginUser);
module.exports = router;
