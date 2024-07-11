import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { FaChevronUp } from "react-icons/fa";
import { SubSectionView } from "./SubSectionView";
import { useReviewModal } from "./ModalProvider";
function ViewCourseSidebar() {
  const showModal = useReviewModal();
  const { sectionId, subSectionId } = useParams();
  const [activeSection, setActiveSection] = useState("");
  const [activeVideoId, setActiveVideoId] = useState(subSectionId); //sub section
  const navigate = useNavigate();
  const location = useLocation();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);

  function expandSection(e) {
    const content = e.currentTarget.nextElementSibling;
    if (content.style.maxHeight) {
      //   upArrow.style.rotate = "180deg";
      content.style.maxHeight = null;
    } else {
      //   upArrow.style.rotate = "0deg";
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return;
      const currSectionIdx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      const currSubSec = courseSectionData?.[currSectionIdx]?.subSection.find(
        (data) => data._id === subSectionId
      );

      //   setCurrent section
      //   setActiveSection(courseSectionData[currSectionIdx]._id);
      //   set current Subsection
      setActiveVideoId(subSectionId);
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <div className="bg-richBlack-800 py-8">
      <div className="mx-auto flex flex-wrap justify-between px-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-lg p-3 py-1 ring-1 ring-richBlack-600"
        >
          <TiArrowBack />
        </button>
        <button
          onClick={() => {
            showModal();
          }}
          className="rounded-lg bg-yellow-50 px-3 py-1 text-sm font-semibold text-black"
        >
          Add Review
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2 p-5">
        <h1 className="text-xl font-bold tracking-wide ">
          {courseEntireData.courseName}
        </h1>
        <p className="text-xs font-bold text-richBlack-500">
          {completedLectures.length}/{totalNoOfLectures}
        </p>
      </div>
      <hr className="mx-auto h-px w-[85%] py-5 text-richBlack-600" />

      {/* for section and subsections */}
      <div>
        {courseSectionData.map((section) => (
          <div key={section._id}>
            <h3
              onClick={expandSection}
              className="flex cursor-pointer items-center justify-between gap-2 bg-richBlack-700 px-6 py-3"
            >
              {section.sectionName}
              <i className="text-richBlack-200">
                <FaChevronUp />
              </i>
            </h3>
            <div className="max-h-0 overflow-clip transition-[max-height]">
              <SubSectionView
                section={section}
                activeVideoId={activeVideoId}
                setActiveVideoId={setActiveVideoId}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewCourseSidebar;
