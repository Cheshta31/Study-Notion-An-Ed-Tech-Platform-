import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import LoadSpinner from "../../../common/LoadSpinner";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

function InstructorDashboard() {
  const [loading, setLoading] = useState(true);
  const [instructorData, setInstructorData] = useState(null);
  const user = useSelector((state) => state.profile.user);
  const [courses, setCourses] = useState(null);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getInstructorData(token);
      setCourses(res);
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <div className="grid h-full w-full place-content-center">
        <LoadSpinner />
      </div>
    );
  const totalAmount = courses?.reduce(
    (acc, curr) => acc + curr?.totalAmountGenerated,
    0
  );
  const totalStudents = courses?.reduce(
    (acc, curr) => acc + curr?.totalStudentsEnrolled,
    0
  );

  return (
    <>
      <div className="mx-auto max-w-maxContent py-4">
        <h1 className="mt-3 text-3xl text-richBlack-5">
          Hi! {user?.firstName}
        </h1>
        <p>Let's start something new</p>
        <div className="mt-6 flex flex-wrap items-start gap-6">
          <InstructorChart courses={courses} />
          <div className="w-52 rounded-md bg-richBlack-800 p-6">
            <h3 className="mb-3 text-xl font-bold">Statistics</h3>
            <p className="font-semibold text-richBlack-400">Total Courses</p>
            <p className="text-2xl font-bold">{courses?.length}</p>{" "}
            <p className="font-semibold text-richBlack-400">Total Students</p>
            <p className="text-2xl font-bold">{totalStudents}</p>{" "}
            <p className="font-semibold text-richBlack-400">Total Income</p>
            <p className="text-2xl font-bold">Rs. {totalAmount}</p>
          </div>
        </div>

        {/* view courses */}
        <div>
          <div className="my-6 flex justify-between">
            <h4>Your Courses</h4>
            <Link className="text-yellow-50" to="/dashboard/my-courses">
              View All
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
            {courses?.slice(0, 3).map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default InstructorDashboard;
