import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { fetchCourseDetails } from "../services/operations/courseAPI";
import GetAvgRating from "../utils/avgRating";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { BiChevronUp, BiInfoCircle } from "react-icons/bi";
import { TbCertificate, TbDevices, TbShare3 } from "react-icons/tb";
import { BsCursorFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import RatingStars from "react-stars";
import { formattedDate } from "../utils/dateFormatter";
import { ACCOUNT_TYPE } from "../utils/constants";
import { setUser } from "../slices/profileSlice";
import { addToCart } from "../slices/cartSlice";
import Footer from "../components/common/Footer";

function CourseDetails() {
  const user = useSelector((state) => state.profile.user);
  const loading = useSelector((state) => state.profile.loading);
  const token = useSelector((state) => state.auth.token);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBuyCourse = async () => {
    await buyCourse(token, [courseId], user, navigate, dispatch);
    return;
  };
  const { courseId } = useParams();

  const [courseData, setCourseDetails] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    async function fetchPageData() {
      const result = await fetchCourseDetails(courseId);
      if (!result) return;
      setCourseDetails(result);
      const count = GetAvgRating(result?.ratingAndReviews);
      // console.log(result?.ratingAndReviews);
      setAvgReviewCount(count);
    }
    fetchPageData();
  }, [courseId]);

  if (loading || !courseData) return <div>Loading...</div>;
  // if (!courseData.success)
  //   return (
  //     <div>
  //       <Error />
  //     </div>
  //   );
  const {
    category,
    courseName,
    courseDescription,
    ratingAndReviews,
    studentsEnrolled,
    instructor,
    createdAt,
    whatYouWillLearn,
    thumbnail,
    price,
  } = courseData;
  return (
    <div className="min-h-screen bg-richBlack-900 text-richBlack-5">
      <div className="bg-richBlack-800 ">
        <header className="mx-auto max-w-maxContent space-y-2 p-6">
          <h3
            onClick={() => navigate(-1)}
            className="flex items-center gap-x-2 text-sm text-richBlack-300"
          >
            Home / Learning /{" "}
            <span className="text-yellow-100">{category.name}</span>
          </h3>

          <h1 className="mt-3 lg:max-w-[60vw] xl:max-w-3xl">{courseName}</h1>
          <p className="text-xs text-richBlack-100 md:text-base lg:max-w-[60vw] xl:max-w-3xl">
            {courseDescription}
          </p>
          <div className="text-md flex flex-wrap items-center gap-2">
            <span className="text-yellow-25">{avgReviewCount}</span>
            <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
            <span>{`(${ratingAndReviews.length} reviews)`}</span>
            <span>{`${studentsEnrolled.length} students enrolled`}</span>
          </div>
          <p className="">
            Created By {`${instructor.firstName} ${instructor.lastName}`}
          </p>
          <div className="flex flex-wrap gap-5 text-lg">
            <p className="flex items-center gap-2">
              {" "}
              <BiInfoCircle /> Created at {formattedDate(createdAt)}
            </p>
            <p className="flex items-center gap-2">
              {" "}
              <HiOutlineGlobeAlt /> English
            </p>
          </div>
        </header>
      </div>
      <section className="mx-auto flex max-w-maxContent gap-6 p-6">
        {/* whatyouwilllearn and course content */}
        <div className="max-w-3xl flex-grow">
          {/* what you will learn */}
          <div className="border border-richBlack-200 p-6">
            <h3 className="mt-3 max-w-3xl text-3xl">What You'll learn</h3>
            <p className="">{whatYouWillLearn}</p>
          </div>
          <CourseContent course={courseData} />
          {/* author */}
          <div>
            <h4 className="mt-3 max-w-3xl text-3xl">Author</h4>
            <figure className="mt-4 flex items-center gap-5">
              <img
                className="aspect-square w-20 rounded-full"
                src={instructor?.image}
                alt=""
              />
              <figcaption className="font-medium">
                {instructor?.firstName + " " + instructor?.lastName}
              </figcaption>
            </figure>
          </div>
        </div>
        {/* Payment card for large screens */}
        {PaymentCard()}
      </section>
      <Footer />
    </div>
  );

  function PaymentCard() {
    return (
      <div className="relative -top-60 hidden flex-shrink flex-grow overflow-clip rounded-lg shadow lg:block lg:max-w-sm">
        <img src={thumbnail} alt="" className="w-full" />
        <div className="flex flex-col gap-4 bg-richBlack-700 p-6">
          <b className="text-xl">Rs. {price}</b>
          {user?.accountType === ACCOUNT_TYPE.STUDENT ? (
            !studentsEnrolled.includes(user?._id) ? (
              <>
                <button
                  className="rounded-lg bg-yellow-50 px-6 py-3 text-black"
                  onClick={handleBuyCourse}
                >
                  Buy this course
                </button>
                <button
                  onClick={(e) => {
                    dispatch(addToCart(courseData));
                    e.target.innerText = "Added to Cart";
                  }}
                  className="rounded-lg bg-richBlack-800 px-6 py-3"
                >
                  Add to Cart
                </button>
              </>
            ) : (
              <Link
                className="rounded-lg bg-yellow-50 px-6 py-3 text-black"
                to={"/dashboard/enrolled-courses"}
              >
                Go to Courses
              </Link>
            )
          ) : (
            <button
              className="rounded-lg bg-yellow-50 px-6 py-3 text-black"
              onClick={() => {
                dispatch(setUser(null));
              }}
            >
              Login as Student to buy this course
            </button>
          )}
          <small>30-Day Money-Back Guarantee</small>

          <p>This Course Includes</p>
          <ul>
            <li className="flex items-center gap-1 text-sm font-medium text-caribbeangreen-100">
              <FiClock />8 hours on-demand video
            </li>
            <li className="flex items-center gap-1 text-sm font-medium text-caribbeangreen-100">
              <BsCursorFill />
              Full Lifetime access.
            </li>
            <li className="flex items-center gap-1 text-sm font-medium text-caribbeangreen-100">
              <TbDevices />
              Access on mobile and tv
            </li>
            <li className="flex items-center gap-1 text-sm font-medium text-caribbeangreen-100">
              <TbCertificate />
              Certificate of completion
            </li>
          </ul>
          <button
            className="text-md flex items-center justify-center gap-1 text-yellow-50"
            type="button"
            onClick={(e) => {
              navigator.clipboard.writeText(window.location.href);
              e.target.innerText = "Link Copied!";
              setTimeout(() => (e.target.innerText = "Share"), 3000);
            }}
          >
            <TbShare3 />
            Share
          </button>
        </div>
      </div>
    );
  }
}

export default CourseDetails;

//component
function CourseContent({ course }) {
  const [totalNumOfLecture, setTotalNumOfLecture] = useState(0);
  const { courseContent, totalDuration } = course;
  useEffect(() => {
    let noOfLecture = 0;
    courseContent?.forEach((section) => {
      noOfLecture += section?.subSection?.length || 0;
    });
    setTotalNumOfLecture(noOfLecture);
  });

  function toggleCollapsible(e) {
    // console.log(e.target.nextSibling.classList.toggle("active"));
    const content = e.currentTarget.nextElementSibling;
    const upArrow = e.currentTarget.firstElementChild;
    if (content.style.maxHeight) {
      upArrow.style.rotate = "180deg";
      content.style.maxHeight = null;
    } else {
      upArrow.style.rotate = "0deg";
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  return (
    <div className="mt-3 max-w-3xl py-6 ">
      <h3 className="text-2xl font-semibold">Course Content</h3>
      <div className="mt-4 flex gap-x-3 text-sm text-richBlack-200">
        <span>{courseContent?.length} section(s)</span>
        <span>{totalNumOfLecture} lectures</span>
        <span>{totalDuration}</span>
      </div>
      <div className="mt-4 divide-y divide-richBlack-600 border border-richBlack-400">
        {courseContent.map((section) => (
          <div key={section._id}>
            <button
              onClick={toggleCollapsible}
              className="flex w-full items-center gap-2 bg-richBlack-700 px-8 py-4 text-start text-sm font-medium"
            >
              <span className="text-lg transition-[rotate]">
                <BiChevronUp />
              </span>
              {section.sectionName}
            </button>
            <div className="max-h-0 overflow-clip transition-[max-height]">
              <ul className="space-y-2 px-8 py-4 text-start text-sm text-richBlack-200 ">
                {section?.subSection.map((subSec) => (
                  <li
                    key={subSec._id}
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center gap-3">
                      <FaVideo />
                      {subSec.title}
                    </span>
                    <span>{subSec.timeDuration}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
