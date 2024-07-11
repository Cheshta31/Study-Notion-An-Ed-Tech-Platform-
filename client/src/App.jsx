import "./App.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import PageNotFound from "./pages/PageNotFound";
import About from "./pages/About";
import Contact from "./pages/ContactUs";
import DashBoard from "./pages/DashBoard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";

import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import LoadSpinner from "./components/common/LoadSpinner";
const MyCourses = lazy(() => import("./components/core/Dashboard/MyCourses"));
const AddCourse = lazy(() => import("./components/core/Dashboard/AddCourse"));
const EditCourse = lazy(() =>
  import("./components/core/Dashboard/EditCourse.jsx")
);
const InstructorDashboard = lazy(() =>
  import("./components/core/Dashboard/InstructorDashboard")
);

function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />
          <Route
            path="/update-password/:resetPassToken"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />
          <Route
            path="/verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />
          <Route path="/catalog/:catalogName" element={<Catalog />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />

          <Route
            path="view-course/"
            element={
              <PrivateRoute>
                <ViewCourse />
              </PrivateRoute>
            }
          >
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <Route
                path=":courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            )}
          </Route>

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            }
          >
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="settings" element={<Settings />} />
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="enrolled-courses" element={<EnrolledCourses />} />
                <Route path="cart" element={<Cart />} />
              </>
            )}
            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route
                  path="my-courses"
                  element={
                    <Suspense fallback={<LoadSpinner />}>
                      <MyCourses />
                    </Suspense>
                  }
                />
                <Route
                  path="instructor"
                  element={
                    <Suspense fallback={<LoadSpinner />}>
                      <InstructorDashboard />
                    </Suspense>
                  }
                />
                <Route
                  path="add-course"
                  element={
                    <Suspense fallback={<LoadSpinner />}>
                      <AddCourse />
                    </Suspense>
                  }
                />
                <Route
                  path="edit-course/:courseId"
                  element={
                    <Suspense fallback={<LoadSpinner />}>
                      <EditCourse />
                    </Suspense>
                  }
                />
              </>
            )}
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
