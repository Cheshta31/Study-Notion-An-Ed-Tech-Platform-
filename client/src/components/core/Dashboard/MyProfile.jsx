import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BtnYellow from "./BtnYellow";
import { useState } from "react";
import { useEffect } from "react";

function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // Add event listener to window resize
    window.addEventListener("resize", handleResize);
    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <h1 className="text-3xl text-richBlack-5">My Profile</h1>
      {/* section 1 */}
      <div className="relative mx-auto mt-10 flex max-w-3xl flex-wrap items-center gap-6 rounded-lg border border-richBlack-700 bg-richBlack-800 p-6">
        <img
          className="row-span-2 aspect-square rounded-full object-cover"
          src={
            user.image
              ? user.image
              : `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`
          }
          width={78}
        />
        <div className="mb-2 flex-grow">
          <p className="text-lg font-semibold text-richBlack-5">
            {user.firstName + " " + user.lastName}
          </p>
          <p className="text-sm text-richBlack-300">{user.email}</p>
        </div>
        <BtnYellow
          className={"absolute right-4 top-6"}
          onClick={() => navigate("/dashboard/settings")}
          text={windowWidth > 640 ? "Edit" : ""}
          icon={<BiEditAlt />}
        />
      </div>
      {/* section 2 */}
      <div className="relative mx-auto mt-10 max-w-3xl gap-6 space-y-4 rounded-lg border border-richBlack-700 bg-richBlack-800 p-6">
        <h2 className="text-2xl font-semibold text-richBlack-5">About</h2>
        <p className="text-sm text-richBlack-300">
          {user?.additionalDetails.about
            ? user?.additionalDetails.about
            : "Write something about yourself."}
        </p>
        <BtnYellow
          className={"absolute right-4 top-2"}
          onClick={() => navigate("/dashboard/settings")}
          text={windowWidth > 640 ? "Edit" : ""}
          icon={<BiEditAlt />}
        />
      </div>
      {/* section 3 */}
      <div className="relative mx-auto mt-10 max-w-3xl grid-cols-2 gap-6 space-y-4 rounded-lg border border-richBlack-700 bg-richBlack-800 p-6 sm:grid">
        <h2 className="col-span-2 text-2xl font-semibold text-richBlack-5">
          Personal Details
        </h2>
        <div>
          <h3 className="text-sm text-richBlack-500">First Name</h3>
          <p className="text-sm text-richBlack-5">{user.firstName}</p>
        </div>
        <div>
          <h3 className="text-sm text-richBlack-500">Last Name</h3>
          <p className="text-sm text-richBlack-5">{user.lastName}</p>
        </div>
        <div>
          <h3 className="text-sm text-richBlack-500">Email</h3>
          <p className="text-sm text-richBlack-5">{user.email}</p>
        </div>
        <div>
          <h3 className="text-sm text-richBlack-500">Contact Number</h3>
          <p className="text-sm text-richBlack-5">
            {user?.additionalDetails?.contactNumber ||
              "Add your contact number"}
          </p>
        </div>
        <div>
          <h3 className="text-sm text-richBlack-500">Gender</h3>
          <p className="text-sm text-richBlack-5">
            {user?.additionalDetails?.gender || "Add your Gender"}
          </p>
        </div>
        <div>
          <h3 className="text-sm text-richBlack-500">Date of Birth</h3>
          <p className="text-sm text-richBlack-5">
            {user?.additionalDetails?.dateOfBirth?.slice(0, 10) ||
              "Add your DOB"}
          </p>
        </div>
        <BtnYellow
          className={"absolute right-4 top-3"}
          onClick={() => navigate("/dashboard/settings")}
          text={windowWidth > 640 ? "Edit" : ""}
          icon={<BiEditAlt />}
        />
      </div>
    </>
  );
}

export default MyProfile;
