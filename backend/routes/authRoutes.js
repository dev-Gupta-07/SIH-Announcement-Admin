const express = require("express");
const { registerUser, loginUser,forgetPassword ,confirmPassword,updatenewPassword} = require("../controllers/authController");
const router = express.Router();
router.route("/").post(registerUser);
router.post("/login", loginUser);
router.post("/forgetpassword",forgetPassword)
router.get("/confirmpassword",confirmPassword)
router.put("/updatepassword",updatenewPassword)
module.exports = router;
