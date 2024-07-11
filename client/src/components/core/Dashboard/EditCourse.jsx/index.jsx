import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import AddCourse from "../AddCourse";
import { useLayoutEffect } from "react";
import { useState } from "react";

function EditCourse() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    async function populateCourseDetails() {
      const result = await getFullDetailsOfCourse(courseId, token);
      if (result.courseDetails) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result.courseDetails));
      }
      setLoading(false);
    }
    populateCourseDetails();
  }, []);
  if (loading) return <div>Loading...</div>;
  else return <AddCourse />;
}

export default EditCourse;
