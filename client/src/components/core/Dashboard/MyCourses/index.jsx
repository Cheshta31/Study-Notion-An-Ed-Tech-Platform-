import React from "react";
import { BiChevronLeft } from "react-icons/bi";
import CoursesTable from "./CoursesTable";
import { useNavigate } from "react-router-dom";

function MyCourses() {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-x-2 text-sm text-richBlack-300"
      >
        <BiChevronLeft />
        Back
      </button>
      <h1 className="mt-3 text-3xl text-richBlack-5">My Courses</h1>
      <div className="mx-auto mt-8 max-w-maxContent rounded-lg border border-richBlack-700">
        <CoursesTable />
      </div>
    </>
  );
}

export default MyCourses;
