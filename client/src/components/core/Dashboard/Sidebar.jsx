import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal";
import { VscSignOut, VscLayoutSidebarLeft } from "react-icons/vsc";
import { useRef } from "react";

function Sidebar() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Modal, setModal] = useState(false); // logout confirmation dialog
  const modalData = {
    text1: "Are you sure ?",
    text2: "You will be logged out of your account",
    btn1Text: "Log out",
    btn2Text: "Cancel",
    btn1Handler: () => dispatch(logout(navigate)),
    btn2Handler: () => setModal(false),
  };
  const sideBarRef = useRef(null);

  return (
    <>
      <div
        ref={sideBarRef}
        className="fixed left-0 top-14 z-10 w-52 flex-shrink-0 origin-top-left scale-0 overflow-y-auto bg-richBlack-800 py-8 text-sm transition-transform md:static md:scale-100"
      >
        <div>
          {sidebarLinks.map((link) => {
            if (!link.type || link.type === user.accountType) {
              return <SidebarLink key={link.id} link={link} />;
            }
          })}
        </div>
        <hr className="mx-auto my-4 w-11/12 text-richBlack-600" />
        <div>
          <SidebarLink
            link={{
              name: "Settings",
              path: "/dashboard/settings",
              icon: "VscSettingsGear",
            }}
          />
          <button
            className={"flex items-center gap-2 px-6 py-2 text-richBlack-300"}
            onClick={() => setModal("open")}
          >
            <VscSignOut /> Log out
          </button>
        </div>
      </div>
      {Modal && <ConfirmationModal modalData={modalData} />}
      {/* mobile hamburger */}
      <button
        onClick={() => sideBarRef?.current.classList.toggle("scale-0")}
        className="fixed left-4 top-4 text-lg text-richBlack-50 md:hidden"
      >
        <VscLayoutSidebarLeft />
      </button>
    </>
  );
}

export default Sidebar;
