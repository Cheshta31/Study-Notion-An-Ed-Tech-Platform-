const express = require("express");
const router = express.Router();
const {
  login,
  signUp,
  sendOTP,
  changePassword,
} = require("../controllers/Auth");
const { auth } = require("../middleware/auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

// const login = require("../controllers/Auth");

//**********************************************************************************************
//                                   Authentication Routes
//**********************************************************************************************
router.post("/sendotp", sendOTP);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/changepassword", auth, changePassword);

//Reset Password Routes

router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;
