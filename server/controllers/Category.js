const { BadRequestError, NotFoundError } = require("../errors");
const Category = require("../models/Category");
const Courses = require("../models/Course");
//handler for create Category
exports.createCategory = async (req, res) => {
  //fetch
  const { name, description } = req.body;
  //validate
  if (!name || !description)
    throw new BadRequestError("Provide both name and description");
  //create entry in db
  const category = await Category.create({ name, description });
  res.status(201).json({
    success: true,
    message: "Category created successfully",
  });
};
//get All categories
exports.showAllCategories = async (req, res) => {
  const categories = await Category.find({}, { name: true, description: true });
  res.status(200).json({
    success: true,
    data: categories,
  });
};

//category page details //get selected category details different categories details and top selling categories
exports.categoryPageDetails = async (req, res) => {
  const { categoryId } = req.params;
  //get courses for specified category id
  const selectedCategory = await Category.findById(categoryId)
    .populate("courses")
    .exec();
  if (!selectedCategory)
    throw new NotFoundError("Courses for selected category not found");

  const differentCategories = await Category.find({
    _id: { $ne: categoryId },
  })
    .populate("courses")
    .exec();

  const topSellingCourses = await Courses.find({ status: "published" })
    .sort({
      studentsEnrolled: -1,
    })
    .limit(10);

  res.status(200).json({
    success: true,
    data: { selectedCategory, differentCategories, topSellingCourses },
  });
};
