const { Schema, model } = require("mongoose");

const sectionSchema = new Schema({
  sectionName: {
    type: String,
  },
  subSection: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubSection",
      required: true,
    },
  ],
});

module.exports = model("Section", sectionSchema);
