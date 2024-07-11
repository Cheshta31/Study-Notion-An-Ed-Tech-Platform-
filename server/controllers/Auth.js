const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/OTP");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");

//send otp
const sendOTP = async (req, res) => {
  //fetch email from req body
  const { email } = req.body;
  //check if user already exists ?
  if (!email) throw new BadRequestError("Email field is required");
  const checkUserPresent = await User.findOne({ email });

  if (checkUserPresent) throw new BadRequestError("User already exists");

  //generate Otp
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  //TODO: check if otp is unique

  //save otp in db
  const otpBody = await OTP.create({ email, otp });

  return res.status(200).json({
    success: true,
    msg: "otp sent successfully",
    otp,
  });
};

//sign up
const signUp = async (req, res) => {
  //data fetch from req body
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    accountType,
    contactNumber,
    otp,
  } = req.body;

  //validate (mongoose validation is already present so no need to validate it)
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword ||
    !otp
  )
    throw new BadRequestError("All Fields are required");

  if (password !== confirmPassword)
    //check both passwords
    throw new BadRequestError("Password and confirm password do not match");

  //check if user already exists or not (mongoose already handling this validation)
  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new BadRequestError(`User withe email ${email} already exists`);
  //TODO: Handle 11000 duplicate error in db

  //Find otp in db and most recent otp
  const recentOtpResponse = await OTP.find({ email })
    .sort("-createdAt")
    .limit(1);
  // console.log("Recent OTP found: " + recentOtpResponse);

  //validate otp
  if (recentOtpResponse.length === 0)
    throw new BadRequestError("OTP does not exists in db");
  else if (otp !== recentOtpResponse[0].otp)
    throw new BadRequestError("OTP does not match");

  //create entry in db
  //create additional details
  const profileDetails = await Profile.create({
    //is it necessary cant we make empty profile
    dateOfBirth: null,
    about: null,
    contactNumber: contactNumber,
  });

  //create the user
  let approved = ""; //FIXME:
  approved === "Instructor" ? (approved = false) : (approved = true);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    accountType,
    approved,
    additionalDetails: profileDetails._id,
    image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
  });

  return res.status(201).json({
    success: true,
    user,
    message: "User is registered successfully",
  });
};

//Login
const login = async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Please provide both a valid email and password");
  //find user with provided email
  const user = await User.findOne({ email }).populate("additionalDetails");
  if (!user) throw new UnauthenticatedError("User is not registered");
  //check passwords
  isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) throw new UnauthenticatedError("Password is not valid");
  //create JWT token
  const token = user.createJWT();
  user.password = undefined; //before sending it in response

  //create cookie and send response
  const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //3 days
    httpOnly: true, // don't let browser javascript access cookie ever
  };
  res.cookie("token", token, cookieOptions).status(200).json({
    success: true,
    token,
    user,
    message: "User Logged in successfully",
  });
};

//change password
const changePassword = async function (req, res) {
  const userId = req.user.id;
  //get data from req body old password new password and confirm password
  const { email, oldPassword, newPassword, confirmNewPassword } = req.body;

  //validation
  if (!email || !oldPassword || !newPassword)
    throw new BadRequestError("All fields are required to change password");
  if (confirmNewPassword && newPassword !== confirmNewPassword)
    throw new BadRequestError(
      "NewPassword and ConfirmNewPassword do not match"
    );
  if (newPassword === oldPassword)
    throw new BadRequestError("New password and old password cannot be same");

  //check if old password is valid
  const userDetails = await User.findById(userId);

  if (!(await userDetails.comparePassword(oldPassword)))
    throw new BadRequestError("The password is incorrect");
  //update password in database
  const user = User.findOneAndUpdate(
    { email },
    { password: newPassword },
    { new: true, runValidators: true }
  );

  //send mail notification that password updated
  const mailResponse = await mailSender(
    email,
    "Password Changed",
    `<p>Dear ${user.firstName} ${user.lastName}, Your password has been changed Successfully</p>`
  );
  //return response
  res.status(200).json({
    success: true,
    message: `Password changed successfully`,
  });
};

module.exports = { sendOTP, signUp, login, changePassword };
