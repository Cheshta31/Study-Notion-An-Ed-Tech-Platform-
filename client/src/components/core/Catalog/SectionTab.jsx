import React from "react";
import { useState } from "react";
import { CourseSlider } from "./CourseSlider";

export function SectionTab({ catalogPageData }) {
  const [mostPopular, setMostPopular] = useState(true);

  return (
    <div>
      <ul className="border-gray-200 my-5 flex flex-wrap gap-2 border-b border-b-richBlack-400">
        <li
          onClick={() => setMostPopular(true)}
          className={`${
            mostPopular && "border-b border-b-yellow-100 text-yellow-100"
          } cursor-pointer py-1`}
        >
          Most Popular
        </li>
        <li
          onClick={() => setMostPopular(false)}
          className={`${
            !mostPopular && "border-b border-b-yellow-100 text-yellow-100"
          } cursor-pointer py-1`}
        >
          New
        </li>
      </ul>
      <CourseSlider sliderData={catalogPageData?.selectedCategory?.courses} />
    </div>
  );
}
