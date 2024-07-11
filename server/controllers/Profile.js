// profile (additional details)
//profile already created by user controller

const { BadRequestError, NotFoundError } = require("../errors");
const User = require("../models/User");
const Profile = require("../models/Profile");
const { uploadImageToCloudinary } = require("../utils/cloudinary");
const CourseProgress = require("../models/CourseProgress");
const formatDuration = require("../utils/FormatDuration");
const Course = require("../models/Course");

//get all user details
exports.getAllUserDetails = async (req, res) => {
  const id = req.user.id;
  //find user
  const user = await User.findById(id).populate("additionalDetails").exec();
  if (!user) throw new NotFoundError("user details not found"); //is it required in mongoose
  user.password = undefined; //remove password before sending it in response
  return res.status(200).json({
    success: true,
    message: "User Date retrieved successfully",
    user,
  });
};
//update profile

exports.updateProfile = async (req, res) => {
  //get data
  const {
    dateOfBirth = "",
    about = "",
    contactNumber,
    gender,
    firstName,
    lastName,
  } = req.body;
  // console.log(firstName, lastName);
  const id = req.user.id; //inserted by middleware
  //validation
  if (!contactNumber || !gender)
    throw new BadRequestError("All fields are required");

  //get profile id from user **
  const profileId = await User.findByIdAndUpdate(
    id,
    { firstName, lastName },
    { new: true }
  )
    .select("additionalDetails")
    .then((doc) => doc.additionalDetails);
  // console.log(profileId);
  const profileDetails = await Profile.findById(profileId); //do we need to change profileId to profileId.additionalDetails
  // console.log(profileDetails);
  //update profile
  profileDetails.dateOfBirth = dateOfBirth;
  profileDetails.about = about;
  profileDetails.gender = gender;
  profileDetails.contactNumber = contactNumber;
  await profileDetails.save();

  return res.status(200).json({
    //code 204 will not return json data in res
    success: true,
    message: "Profile updated successfully",
    profileDetails,
  });
};

//deleteAccount
exports.deleteAccount = async (req, res) => {
  // TODO: Find More on Job Schedule
  //get id
  const id = req.user.id;
  //validation
  const userDetails = await User.findById(id);
  if (!userDetails) throw new NotFoundError("User not found");
  //delete profile
  await Profile.findByIdAndDelete(userDetails.additionalDetails);
  //delete user
  await User.findByIdAndDelete(id);
  //TODO: unroll user from all enrolled courses
  return res
    .status(200)
    .json({ success: true, message: "Account deleted successfully" });
};

//update DP
exports.updateDisplayPicture = async (req, res) => {
  const displayPicture = req.files.displayPicture;
  const userId = req.user.id;
  const image = await uploadImageToCloudinary(
    displayPicture,
    process.env.FOLDER_NAME,
    1000,
    1000
  );
  const updatedProfile = await User.findByIdAndUpdate(
    userId,
    { image: image.secure_url },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Image updated successfully",
    data: updatedProfile,
  });
};

//get Enrolled Courses
exports.getEnrolledCourses = async (req, res) => {
  const userId = req.user.id;
  let userDetails = await User.findById(userId)
    .populate({
      path: "courses",
      populate: {
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      },
    })
    .exec();

  userDetails = userDetails.toObject(); //to Object only works with mongoose objects
  let enrolledCourses = userDetails.courses;
  let SubsectionLength = 0;
  for (let i = 0; i < enrolledCourses.length; i++) {
    let totalDurationInSeconds = 0;
    SubsectionLength = 0;
    for (let j = 0; j < enrolledCourses[i].courseContent.length; j++) {
      totalDurationInSeconds += enrolledCourses[i].courseContent[
        j
      ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0);
      SubsectionLength += enrolledCourses[i].courseContent[j].subSection.length;
    }
    enrolledCourses[i].totalDuration = formatDuration(totalDurationInSeconds);
    let courseProgressCount = await CourseProgress.findOne({
      courseId: enrolledCourses[i]._id,
      userId: userId,
    });
    // console.log(totalDurationInSeconds);
    // console.log(courseProgressCount);
    courseProgressCount = courseProgressCount?.completedVideos.length;
    if (SubsectionLength === 0) {
      enrolledCourses[i].progressPercentage = 100;
    } else {
      // To make it up to 2 decimal point
      const multiplier = Math.pow(10, 2);
      enrolledCourses[i].progressPercentage =
        Math.round(
          (courseProgressCount / SubsectionLength) * 100 * multiplier
        ) / multiplier;
    }
  }
  if (!userDetails) throw new NotFoundError("Could not find user");
  // console.log(userDetails);
  res.status(200).json({
    success: true,
    data: enrolledCourses,
  });
};

exports.getInstructorData = async (req, res) => {
  const userId = req.user.id;
  const courseDetails = await Course.find({ instructor: userId });
  let courseData = [];
  if (courseDetails) {
    courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        thumbnail: course.thumbnail,
        courseDescription: course.courseDescription,
        price: course.price,

        totalStudentsEnrolled,
        totalAmountGenerated,
      };
      return courseDataWithStats;
    });
  }
  res.status(200).send({ data: courseData });
};
