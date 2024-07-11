import React, { useEffect, useState } from "react";
import { Table, Thead, Th, Tr, Tbody, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { COURSE_STATUS } from "../../../../utils/constants";
import { RiTimer2Fill } from "react-icons/ri";
import { MdDeleteSweep, MdEdit } from "react-icons/md";
import ConfirmationModal from "../../../common/ConfirmationModal";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseAPI";
import { useSelector } from "react-redux";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CoursesTable() {
  const { token } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState(null);
  const [confirmModalData, setConfirmModalData] = useState(null);
  useEffect(() => {
    async function fetchCourses() {
      const result = await fetchInstructorCourses(token);
      if (result) setCourses(result);
    }
    fetchCourses();
  }, []);

  const deleteCourseHandler = async (courseToDelete) => {
    // console.log(courseToDelete._id);
    await deleteCourse({ courseId: courseToDelete._id }, token);
    const remainingCourses = courses.filter(
      (course) => course._id !== courseToDelete._id
    );
    setCourses(remainingCourses);
  };

  if (courses?.length === 0)
    return <p className="text-lg italic">No Courses Found</p>;

  return (
    <>
      <Table className="text-sm">
        <Thead>
          <Tr>
            <Th>Courses</Th>
            <Th>Duration</Th>
            <Th>Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length !== 0 &&
            courses?.map((course) => (
              <CourseTableRow
                course={course}
                setConfirmModalData={setConfirmModalData}
                deleteCourseHandler={deleteCourseHandler}
                key={course._id}
              />
            ))}
        </Tbody>
      </Table>
      {confirmModalData && <ConfirmationModal modalData={confirmModalData} />}
    </>
  );
}

export default CoursesTable;

function CourseTableRow({ course, setConfirmModalData, deleteCourseHandler }) {
  const navigate = useNavigate();
  return (
    <Tr>
      <Td className="flex gap-3 p-3">
        <img
          width={221}
          className="w-56 object-contain"
          src={course?.thumbnail}
          alt=""
        />
        <div className="space-y-2">
          <p className="font-semi-bold text-xl">{course.courseName}</p>
          <p className="text-richBlack-100">{course.courseDescription}</p>
          <p className="text-richBlack-50">Created:{course.createdAt}</p>
          <p className="p-1">
            {course.status === COURSE_STATUS.DRAFT ? (
              <span className="flex items-center gap-1 text-pink-100">
                <RiTimer2Fill />
                "Draft"
              </span>
            ) : (
              <span className="flex items-center gap-1 text-yellow-100">
                <AiFillCheckCircle />
                "Published"
              </span>
            )}
          </p>
        </div>
      </Td>
      <Td>"Course Duration"</Td>
      <Td>₹{course.price}</Td>
      <Td>
        <button
          onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
        >
          <MdEdit />
        </button>
        <button
          onClick={() => {
            setConfirmModalData({
              text1: "Do you want to delete this course",
              text2: "Are you sure ?",
              btn1Text: "NO",
              btn2Text: "YES",
              btn1Handler: () => setConfirmModalData(null),
              btn2Handler: () => {
                deleteCourseHandler(course);
                setConfirmModalData(null);
              },
            });
          }}
        >
          <MdDeleteSweep />
        </button>
      </Td>
    </Tr>
  );
}
