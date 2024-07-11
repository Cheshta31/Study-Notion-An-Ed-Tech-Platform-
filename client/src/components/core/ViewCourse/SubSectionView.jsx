import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImCheckmark } from "react-icons/im";
import { LuListVideo } from "react-icons/lu";

export function SubSectionView({ section, activeVideoId, setActiveVideoId }) {
  const subSections = section.subSection;
  const { completedLectures } = useSelector((state) => state.viewCourse);
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const courseId = courseEntireData["_id"];
  // console.log(courseId);
  const navigate = useNavigate();
  function handleLectureClick(subSecId) {
    setActiveVideoId(subSecId);
    navigate(
      `/view-course/${courseId}/section/${section._id}/sub-section/${subSecId}`
    );
  }

  return (
    <ul className={`space-y-2 px-6 py-3 pl-8 text-xs text-blue-100`}>
      {subSections.map((subSec) => {
        return (
          <li
            key={subSec._id}
            onClick={() => handleLectureClick(subSec._id)}
            className={`relative flex cursor-pointer gap-x-1 ${
              activeVideoId === subSec._id ? "font-semibold text-yellow-50" : ""
            }`}
          >
            <span className="absolute -left-4 top-[2px]">
              {completedLectures?.includes(subSec._id) ? (
                <ImCheckmark className="font-bold text-yellow-5" />
              ) : (
                <LuListVideo />
              )}
            </span>
            {subSec.title}
          </li>
        );
      })}
    </ul>
  );
}
