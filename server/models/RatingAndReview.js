const { Schema, model } = require("mongoose");

const ratingAndReview = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: [true, "Please Provide a rating"],
  },
  review: {
    type: String,
    minLength: 1,
    maxLength: 500,
    required: [true, "Please Provide a review in max 500 words"],
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
    index: true, //what is the need for this
  },
});

// Round off the rating to 1 decimal place before saving the document
/* ratingAndReview.pre("save", function (next) {
  if (this.rating !== undefined) {
    this.rating = Math.round(this.rating * 10) / 10;
  }
  next();
}); */

module.exports = model("RatingAndReview", ratingAndReview);
