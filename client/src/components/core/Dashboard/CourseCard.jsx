import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
function CourseCard({ course }) {
  return (
    <div>
      <img src={course.thumbnail} alt="course thumbnail" />
      <p>{course.courseName}</p>
      <p>{course.courseDescription}</p>
      <p>{course.totalDuration}</p>
      <p>
        Progress : {course.progressPercentage || 0}%
        <ProgressBar
          completed={course.progressPercentage}
          height="8px"
          isLabelVisible={false}
        ></ProgressBar>
      </p>
    </div>
  );
}

export default CourseCard;
