const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { BadRequestError, NotFoundError, CustomAPIError } = require("../errors");
const mongoose = require("mongoose");
const crypto = require("crypto");
const {
  paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");
// //capture the payment and initiate the razorpay order
// exports.capturePayment = async (req, res) => {
//   //get course id and user id
//   //FIXME: this was course_id in bhaiya's code
//   const courseId = req.body.courseId;
//   const userId = req.user.id;
//   //validate
//   if (!courseId) throw new BadRequestError("Please provide valid course id");
//   //validate course details
//   let course;
//   course = await Course.findById(courseId);
//   if (!course) throw new NotFoundError("Could not find the course");
//   //check if user already bought the same course
//   const uid = new mongoose.Types.ObjectId(userId); //converting string id to mongoose object
//   if (course.studentsEnrolled.includes(uid))
//     throw new BadRequestError("Student is already enrolled");

//   //order create
//   const amount = course.price;
//   const currency = "INR";
//   const options = {
//     amount: amount * 100,
//     currency,
//     receipt: Math.random(Date.now()).toString(),
//     notes: { courseId: courseId, userId },
//   };

//   try {
//     //initiate the payment using razorpay
//     const paymentResponse = await instance.orders.create(options);
//     console.log(paymentResponse);
//     //return response
//     res.status(200).json({
//       success: true,
//       courseName: course.courseName,
//       description: course.courseDescription,
//       thumbnail: course.thumbnail,
//       orderId: paymentResponse.id,
//       currency: paymentResponse.currency,
//       amount: paymentResponse.amount,
//     });
//   } catch (error) {
//     console.error(error);
//     throw new CustomAPIError("Couldn't initiate order");
//   }
// };

// //verify signature of razorpay using key stored on our server
// //also ++ enroll student after verifying the signature
// exports.verifySignature = async (req, res) => {
//   const webHookSecret = ""; //TODO: secret;

//   const signature = req.headers["x-razorpay-signature"];

//   const shaSum = crypto.createHmac("sha256", webHookSecret);
//   shaSum.update(JSON.stringify(req.body));
//   const digest = shaSum.digest("hex");

//   if (signature !== digest)
//     throw new BadRequestError("Invalid Request Signature not verified");
//   console.log("Payment is authorized");
//   const { userId, courseId } = req.body.payload.payment.entity.notes;
//   try {
//     //find the course and enroll the student in it
//     const enrollCourse = await Course.findByIdAndUpdate(
//       courseId,
//       { $push: { studentsEnrolled: userId } },
//       { new: true }
//     );
//     console.log(enrollCourse);
//     const enrollStudent = await User.findByIdAndUpdate(
//       userId,
//       { $push: { courses: courseId } },
//       { new: true }
//     );
//     console.log(enrollStudent);

//     //send confirmation mail
//     const email = await mailSender(
//       enrollStudent.email,
//       "Congratulations! from studyNotion",
//       "Congratulations You have enrolled for new studyNotion course"
//     );
//     console.log(email);
//     res.status(200).json({
//       success: true,
//       message: "Signature verified and course added",
//     });
//   } catch (error) {
//     console.error(error);
//     throw new CustomAPIError(error.message);
//   }
// };

exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;
  if (courses.length === 0)
    throw new BadRequestError("Please provide courses ");

  let totalAmount = 0;

  for (let course_id of courses) {
    let course;
    course = await Course.findById(course_id);
    if (!course)
      throw new BadRequestError(
        "Could not find the course with id " + course_id
      );
    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentsEnrolled.includes(uid))
      throw new BadRequestError(
        "User already enrolled in course" + course.courseName
      );
    totalAmount += course.price;
  }
  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now().toString()),
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.error("Error in creating order" + error);
    throw new CustomAPIError("Couldn't create order");
  }
};

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const courses = req.body.courses;
  const userId = req.user.id;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
    throw new CustomAPIError("Payment failed due to invalid fields");

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature)
    throw new BadRequestError("Signatures doesn't match Payment failed");

  await enrollStudent(courses, userId, res);
};

async function enrollStudent(courses, userId, res) {
  for (let courseId of courses) {
    try {
      const enrollCourse = await Course.findByIdAndUpdate(
        courseId,
        {
          $push: { studentsEnrolled: userId },
        },
        { new: true }
      );

      if (!enrollCourse) throw new NotFoundError("Course not found");
      const enrollStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: { courses: courseId },
        },
        { new: true }
      );
      //send mail
      const mailResponse = await mailSender(
        enrollStudent.email,
        `Successfully enrolled into ${enrollCourse.courseName}`,
        courseEnrollmentEmail(enrollCourse.courseName, enrollStudent.firstName)
      );
    } catch (error) {
      throw new CustomAPIError(error.message);
    }
  }

  res.status(200).json({
    success: true,
  });
}

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  if (!orderId || !paymentId || !amount)
    throw new BadRequestError("Please Provide all the fields");
  const userId = req.user.id;

  const enrolledStudent = await User.findById(userId);
  await mailSender(
    enrolledStudent.email,
    "Payment Received",
    paymentSuccessEmail(
      enrolledStudent.firstName,
      amount / 100,
      orderId,
      paymentId
    )
  );

  res.status(200).json({
    success: true,
  });
};
