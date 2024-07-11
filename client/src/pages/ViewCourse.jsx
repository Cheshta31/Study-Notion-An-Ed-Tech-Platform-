import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import ViewCourseSidebar from "../components/core/ViewCourse/ViewCourseSidebar";
import { ModalProvider } from "../components/core/ViewCourse/ModalProvider";

function ViewCourse() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));

      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    };
    setCourseSpecificDetails();
  }, []);
  return (
    <ModalProvider>
      <div className="relative flex h-[calc(100vh-3.53rem)] overflow-hidden bg-richBlack-900 text-richBlack-5">
        <ViewCourseSidebar />
        <div className="flex-grow overflow-y-scroll p-4 sm:p-6">
          <Outlet />
        </div>
      </div>
    </ModalProvider>
  );
}

export default ViewCourse;
