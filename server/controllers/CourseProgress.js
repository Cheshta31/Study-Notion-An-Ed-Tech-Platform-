const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const User = require("../models/User");
exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId = req.user.id;

  //check if the subsection is valid
  const subSection = await SubSection.findById(subSectionId);

  if (!subSection) {
    return res.status(400).json({ error: "Invalid SubSection" });
  }

  // console.log("SubSection Validation Done");

  //check for old entry
  let courseProgress = await CourseProgress.findOne({
    courseId: courseId,
    userId: userId,
  });
  // console.log(courseProgress);
  // if it does not exist then create one
  if (!courseProgress) {
    courseProgress = await CourseProgress.create({
      courseId,
      userId,
      completedVideos: [],
    });
    // add it to the user collection also
    await User.findByIdAndUpdate(userId, {
      $push: {
        courseProgress: courseProgress._id,
      },
    });
  }
  //check for re-completing video/subsection
  if (courseProgress.completedVideos.includes(subSectionId)) {
    return res.status(400).json({
      error: "Subsection already completed",
    });
  }

  //push into completed video
  courseProgress.completedVideos.push(subSectionId);
  // console.log("Course Progress Push Done");
  await courseProgress.save();
  // console.log("Course Progress Save call Done");
  return res.status(200).json({
    success: true,
    message: "Course Progress Updated Successfully",
  });
};
