const { Schema, model } = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const { CustomAPIError } = require("../errors");

const OTPSchema = new Schema({
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

OTPSchema.pre("save", async function (next) {
  try {
    //only send email when a new Document is created
    if (this.isNew) {
      const mailResponse = await mailSender(
        this.email,
        "Verification Email",
        emailTemplate(this.otp)
      );
      // console.log("Verification Mail Sent :" + mailResponse.response);
    }
    next();
  } catch (error) {
    console.error("Error occurred while sending email", error);
    throw new CustomAPIError("An error occurred while sending email");
  }
});

module.exports = model("OTP", OTPSchema);
