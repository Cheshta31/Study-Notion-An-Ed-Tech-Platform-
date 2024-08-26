const { NotFoundError, BadRequestError } = require("../errors");
const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/cloudinary");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const formatDuration = require("../utils/FormatDuration");

// create Course
exports.createCourse = async (req, res) => {
  try {
    // Fetch data from request
    const userId = req.user.id;
    console.log(req.user.id);

    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;
    console.log(req.body);

    // Get thumbnail from request files
    const thumbnail = req.files?.thumbnail;
    console.log(thumbnail);

    // Validation checks
    if (!courseName) throw new BadRequestError("Course name is required");
    if (!courseDescription) throw new BadRequestError("Course description is required");
    if (!whatYouWillLearn) throw new BadRequestError("What you will learn is required");
    if (!price) throw new BadRequestError("Price is required");
    if (!tag) throw new BadRequestError("Tag is required");
    if (!category) throw new BadRequestError("Category is required");

    // Check for instructor details (already performed in middleware but needed here for reference)
    const instructorDetails = await User.findById(userId);
    if (!instructorDetails) throw new NotFoundError("Instructor not found");
    console.log("Instructor details fetched successfully");

    // Check if the given category is valid
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) throw new NotFoundError("Category not found");
    console.log(categoryDetails);

    // Upload image to Cloudinary if thumbnail is provided
    let uploadImage = "";
    if (thumbnail) {
      console.log("Uploading image to Cloudinary...");
      uploadImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
    }

    // Safely parse `tag` and `instructions` to ensure they are arrays
    const parsedTag = typeof tag === 'string' ? JSON.parse(tag) : Array.isArray(tag) ? tag : [];
    const parsedInstructions = typeof instructions === 'string' ? JSON.parse(instructions) : Array.isArray(instructions) ? instructions : [];

    // Create a new course entry in the database
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag: parsedTag,
      category: categoryDetails._id,
      thumbnail: uploadImage?.secure_url,
      status,
      instructions: parsedInstructions,
    });
    console.log("New entry created for course");

    // Add the new course to the instructor's list of courses
    await User.findByIdAndUpdate(
      instructorDetails._id,
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    // Update the category schema with the new course
    await Category.findByIdAndUpdate(
      category,
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });

  } catch (error) {
    // Log the error and send an error response
    console.error("Error creating course:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Error creating course",
    });
  }
};


//getAllCourses
exports.getAllCourses = async (req, res) => {
  const allCourses = await Course.find(
    { status: "published" },
    {
      //select these fields
      courseName: true,
      price: true,
      thumbnail: true,
      instructor: true,
      ratingAndReviews: true,
      studentsEnrolled: true,
    }
  )
    .populate("instructor")
    .exec();

  return res.status(200).json({
    success: true,
    message: "Data Fetched successfully",
    data: allCourses,
  });
};
//getCourseDetails
exports.getCourseDetails = async (req, res) => {
  const { courseId } = req.params;
  if (!courseId) throw new BadRequestError("Provide a course id");
  const course = await Course.findById(courseId)
    .populate("category")
    .populate("ratingAndReviews")
    .populate({ path: "instructor", populate: { path: "additionalDetails" } })
    .populate({ path: "courseContent", populate: { path: "subSection" } })
    .exec();
  if (!course) throw new NotFoundError("Course not found");

  let totalDurationInSeconds = 0;
  course.courseContent.forEach((content) => {
    content.subSection.forEach((subSection) => {
      const timeDurationInSeconds = parseInt(subSection.timeDuration);
      totalDurationInSeconds += timeDurationInSeconds;
    });
  });

  const totalDuration = formatDuration(totalDurationInSeconds);
  res.status(200).json({
    success: true,
    message: "Course fetched successfully",
    course,
    totalDuration,
  });
};

exports.editCourse = async (req, res) => {
  const { courseId } = req.body;
  console.log(courseId);
  const updates = req.body;
  const userId = req.user.id;

  const course = await Course.findById(courseId);
  if (!course) throw new NotFoundError("Course not found");

  //check if course created by the same instructor
  if (course.instructor.toString() !== userId)
    throw new BadRequestError(
      "course can only be edited by the instructor who created it"
    );

  if (req.files?.thumbnail) {
    const thumbnail = await rea.files.thumbnail;
    const thumbnailUpload = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    course.thumbnail = thumbnailUpload.secure_url;
  }

  // update the properties that are present in the body
  Object.keys(updates).forEach((key) => {
    if (Course.schema.obj.hasOwnProperty(key)) {
      if (key === "tag" || key === "instructions") {
        course[key] = JSON.parse(updates[key]);
      } else {
        course[key] = updates[key];
      }
    }
  });

  await course.save();

  const updatedCourse = await Course.findById(courseId)
    .populate({
      path: "instructor",
      populate: {
        path: "additionalDetails",
      },
    })
    .populate("category")
    .populate("ratingAndReviews")
    .populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    })
    .exec();

  res.status(200).json({
    success: true,
    message: "Course updated successfully",
    updatedCourse,
  });
};

exports.getFullCourseDetails = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;
  const courseDetails = await Course.findOne({
    _id: courseId,
  })
    .populate({
      path: "instructor",
      populate: {
        path: "additionalDetails",
      },
    })
    .populate("category")
    .populate("ratingAndReviews")
    .populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    })
    .exec();

  let courseProgressCount = await CourseProgress.findOne({
    courseId: courseId,
    userId: userId,
  });

  // console.log("courseProgressCount : ", courseProgressCount);

  if (!courseDetails) {
    return res.status(400).json({
      success: false,
      message: `Could not find course with id: ${courseId}`,
    });
  }

  // if (courseDetails.status === "Draft") {
  //   return res.status(403).json({
  //     success: false,
  //     message: `Accessing a draft course is forbidden`,
  //   });
  // }

  let totalDurationInSeconds = 0;
  courseDetails.courseContent.forEach((content) => {
    content.subSection.forEach((subSection) => {
      const timeDurationInSeconds = parseInt(subSection.timeDuration);
      totalDurationInSeconds += timeDurationInSeconds;
    });
  });

  const totalDuration = formatDuration(totalDurationInSeconds);

  return res.status(200).json({
    success: true,
    data: {
      courseDetails,
      totalDuration,
      completedVideos: courseProgressCount?.completedVideos
        ? courseProgressCount?.completedVideos
        : [],
    },
  });
};

exports.getInstructorCourses = async (req, res) => {
  //get instructor id
  const instructorId = req.user.id;
  // Find all courses belonging to the instructor
  const instructorCourses = await Course.find({
    instructor: instructorId,
  }).sort({ createdAt: -1 });
  // Return the instructor's courses
  res.status(200).json({
    success: true,
    courses: instructorCourses,
  });
};

exports.deleteCourse = async (req, res) => {
  const { courseId } = req.body;
  if (!courseId) throw new BadRequestError("Provide course id");
  // Find the course
  const course = await Course.findById(courseId);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  // Unenroll students from the course
  const studentsEnrolled = course.studentsEnrolled;
  for (const studentId of studentsEnrolled) {
    await User.findByIdAndUpdate(studentId, {
      $pull: { courses: courseId },
    });
  }

  // Delete sections and sub-sections
  const courseSections = course.courseContent;
  for (const sectionId of courseSections) {
    // Delete sub-sections of the section
    const section = await Section.findById(sectionId);
    if (section) {
      const subSections = section.subSection;
      for (const subSectionId of subSections) {
        await SubSection.findByIdAndDelete(subSectionId);
      }
    }

    // Delete the section
    await Section.findByIdAndDelete(sectionId); //findByIdAndDelete runs any pre post middleware defined in model and findByIdAndRemove doesn't
  }

  // Delete the course
  await Course.findByIdAndDelete(courseId);

  return res.status(200).json({
    success: true,
    message: "Course deleted successfully",
  });
};
