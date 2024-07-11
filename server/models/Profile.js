const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  gender: {
    type: String,
    enum: ["Male", "Female", "Non-Binary", "Prefer not to say", "Other", ""],
    defaultValue: "",
    message:
      "Gender must be either 'Male', 'Female', 'Non-Binary', 'Prefer not to say' or 'Other'",
  },
  dateOfBirth: {
    type: Date,
    min: "1970-01-01", //
    max: "2015-12-31", //
  },
  about: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: Number,
    trim: true,
  },
});

module.exports = model("Profile", profileSchema);
