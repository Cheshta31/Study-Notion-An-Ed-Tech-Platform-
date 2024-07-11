import React from "react";
import BtnYellow from "../BtnYellow";
import { MdNavigateBefore } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { COURSE_STATUS } from "../../../../utils/constants";
import { editCourseDetails } from "../../../../services/operations/courseAPI";
import { useNavigate } from "react-router-dom";
import { resetCourseState } from "../../../../slices/courseSlice";

function PublishForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const course = useSelector((state) => state.course.course);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState();
  const [isPublishCheck, setPublishCheck] = useState(
    course?.status === COURSE_STATUS.PUBLISHED
  );
  function goToCourses() {
    navigate("/dashboard/my-courses");
    dispatch(resetCourseState());
  }
  const handleCoursePublish = async () => {
    if (isPublishCheck) {
      setLoading(true);
      const result = await editCourseDetails(
        { status: COURSE_STATUS.PUBLISHED, courseId: course._id },
        token
      );
      setLoading(false);
    }
    goToCourses();
    return;
  };
  return (
    <div className="mt-8 space-y-6 rounded-md bg-richBlack-800 p-6">
      <h2 className="text-2xl font-semibold text-richBlack-25">
        Publish Course
      </h2>
      <div className="space-x-2 font-medium text-richBlack-400">
        <input
          className="accent-yellow-50"
          name="publish"
          id="publish"
          type="checkbox"
          checked={isPublishCheck}
          onChange={(e) => setPublishCheck(e.target.checked)}
        />
        <label htmlFor="publish">Make this course as public.</label>
      </div>
      <div className="flex items-center justify-end gap-3">
        <button className="flex items-center gap-2 rounded-lg bg-richBlack-700 p-2 pr-6 text-richBlack-5 shadow-ctaButtonShadow">
          <MdNavigateBefore />
          Back
        </button>
        <BtnYellow
          onClick={handleCoursePublish}
          text={isPublishCheck ? "Publish" : "Save Changes"}
        />
      </div>
    </div>
  );
}

export default PublishForm;
