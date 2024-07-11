const { BadRequestError, NotFoundError, ForbiddenError } = require("../errors");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");

//reset password token(Send Reset Password Link)
exports.resetPasswordToken = async (req, res) => {
  //get email from request body
  const email = req.body.email;
  //check user from email
  const user = await User.findOne({ email });
  if (!user) throw new BadRequestError("Email is not registered with us");
  //generate token
  const token = crypto.randomBytes(20).toString("hex");
  //update user by adding token and expiry time
  user.token = token;
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();
  //create url
  //TODO: frontend url
  const url = `localhost:3000/update-password/${token}`;
  //send mail containing the url
  await mailSender(
    email,
    "Reset Password for StudyNotion",
    `<h2>Password reset Link</h2>
    ${url}`
  );

  //return response
  res.status(200).json({
    success: true,
    message:
      "Email sent Successfully, please check email and change your password",
  });
};

//reset password
exports.resetPassword = async (req, res) => {
  //data fetch and token fetch(a token was inserted while sending reset link to the user)

  const { password, confirmPassword, token } = req.body; //is there a need for this
  if (password !== confirmPassword)
    throw new BadRequestError("Passwords do not match");
  //validate both password */

  //get userDetails from db
  const userDetails = await User.findOne({ token });
  //if no entry - invalid token
  if (!userDetails) throw new NotFoundError("User with token not exists");
  //check expiration time
  if (userDetails.resetPasswordExpires < Date.now())
    throw new ForbiddenError("Password reset link has been expired");
  //update password
  // await User.findOneAndUpdate({ token }, { password });
  userDetails.password = password;
  //(delete or make token expired) from database after resetting password
  userDetails.resetPasswordExpires = Date.now();
  await userDetails.save();
  return res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
};
