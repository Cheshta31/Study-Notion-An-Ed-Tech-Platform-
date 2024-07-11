import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdPlayLesson } from "react-icons/md";
//active true -> white false -> black
function CourseCard({ active, heading, description, level, lessonNumber }) {
  return (
    <div
      className={`relative lg:flex-1 px-6 pt-8 max-w-[360px] h-[300px]
    ${active ? "shadow-[10px_10px_0px_0px_#ffd60a]" : ""} 
    ${active ? "bg-white" : "bg-richBlack-800"}
    `}
    >
      <h3
        className={`col-span-2 text-xl font-semibold 
        ${active ? "text-black" : "text-richBlack-25"}
        `}
      >
        {heading}
      </h3>
      <p
        className={`col-span-2 mt-3
      ${active ? "text-richBlack-500" : "text-richBlack-400"}`}
      >
        {description}
      </p>
      <div
        className={`absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center py-3 border border-dashed border-transparent
      ${active ? "border-t-richBlack-500" : "border-t-richBlack-400"}`}
      >
        <div
          className={`flex gap-2 items-center ${
            active ? "text-blue-500" : "text-richBlack-300"
          }`}
        >
          <BsFillPeopleFill /> {level}
        </div>
        <div
          className={`flex gap-2 items-center ${
            active ? "text-blue-500" : "text-richBlack-300"
          }`}
        >
          <MdPlayLesson /> {lessonNumber} Lessons
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
