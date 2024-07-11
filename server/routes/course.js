const express = require("express");
const router = express.Router();
const { isInstructor, isAdmin, isStudent } = require("../middleware/auth");
const { auth } = require("../middleware/auth");

const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  deleteCourse,
  getInstructorCourses,
  editCourse,
  getFullCourseDetails,
} = require("../controllers/Course");
const {
  createSection,
  deleteSection,
  updateSection,
} = require("../controllers/Section");
const {
  updateSubSection,
  deleteSubSection,
  createSubsection,
} = require("../controllers/SubSection");
const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../controllers/Category");
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");
const { updateCourseProgress } = require("../controllers/CourseProgress");
// ********************************************************************************************************
//                                      Course Routes
// ********************************************************************************************************
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.put("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);
// Edit Sub Section
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubsection);
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Courses
router.get("/getCourseDetails/:courseId", getCourseDetails);
// Get Details for a Specific Courses
router.get("/getFullCourseDetails/:courseId", auth, getFullCourseDetails);
router.put("/editCourse", auth, isInstructor, editCourse);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);
router.put("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories); //can be accessed by anyone
router.get("/getCategoryPageDetails/:categoryId", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;
