import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import LoadSpinner from "../components/common/LoadSpinner";

function DashBoard() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading)
    return (
      <div className="grid h-[calc(100vh-3.53rem)] place-items-center bg-richBlack-900">
        <LoadSpinner />
      </div>
    );

  return (
    <div className="relative flex h-[calc(100vh-3.53rem)] overflow-hidden bg-richBlack-900 text-richBlack-5">
      <Sidebar />
      <div className="flex-grow overflow-y-scroll p-4 sm:p-10">
        <Outlet />
      </div>
    </div>
  );
}

export default DashBoard;
