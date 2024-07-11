const { Schema, model } = require("mongoose");

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: [true, "Please provide course name"],
      minlength: 1,
      maxLength: 100,
    },
    courseDescription: {
      type: String,
      required: [true, "Please provide description"],
      minlength: 1,
      maxLength: 1000,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    whatYouWillLearn: {
      required: [true, "Please provide whatYouWIllLearn"],
      type: String,
    },
    courseContent: [
      {
        type: Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
    ratingAndReviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "RatingAndReview",
      },
    ],
    price: { type: Number, required: [true, "Please provide course price"] },
    thumbnail: { type: String },
    tag: { type: [String], require: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      //FIXME: required: [true, "Please provide a Category name"],
    },
    studentsEnrolled: [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
    ],
    instructions: [String],
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

module.exports = model("Course", courseSchema);
