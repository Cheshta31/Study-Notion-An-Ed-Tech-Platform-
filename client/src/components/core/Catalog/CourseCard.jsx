import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";

const CourseCard = ({ course }) => {
  return (
    <div className="flex min-w-[15rem] max-w-[36rem] flex-shrink-0 basis-[15rem] flex-col gap-y-1 rounded bg-richBlack-700 p-2 pb-5 md:gap-y-2 lg:basis-[20rem]">
      <img
        src={course?.thumbnail}
        className="aspect-video rounded object-cover"
      />
      <Link to={`/courses/${course._id}`}>
        <h4 className="line-clamp-1 font-medium">{course?.courseName}</h4>
      </Link>
      <p className="line-clamp-2 text-sm text-richBlack-100">
        {course?.courseDescription}
      </p>
      <ReactStars
        count={5}
        value={course?.ratingAndReviews.rating}
        edit={false}
        size={24}
        color2={"#ffd700"}
      />
      <p className="text-lg font-semibold">Rs. {course?.price}</p>
    </div>
  );
};

export default CourseCard;
