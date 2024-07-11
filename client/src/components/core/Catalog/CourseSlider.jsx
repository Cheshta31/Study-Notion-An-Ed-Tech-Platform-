import React from "react";
import CourseCard from "./CourseCard";

export function CourseSlider({ sliderData }) {
  return (
    <div className="flex gap-x-5 overflow-x-scroll">
      {sliderData?.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
}
