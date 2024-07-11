import React, { useState } from "react";
import { BiChevronLeft, BiUpload } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import BtnYellow from "../BtnYellow";
import ProfileInfoChange from "./ProfileInfoChange";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";
import { MdClose } from "react-icons/md";
export default function Settings() {
  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-x-2 text-sm text-richBlack-300"
      >
        <BiChevronLeft />
        Back
      </button>
      <h1 className="mt-3 text-3xl text-richBlack-5">Settings</h1>
      {/* profile photo change */}
      <ImageChange />
      {/* profile  information change section */}
      <ProfileInfoChange />
      {/* password change section */}
      <ChangePassword />
      {/* delete account dialog*/}
      <DeleteAccount />
    </>
  );
}
function ImageChange() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewSource(URL.createObjectURL(file));
    }
  }

  function handleImageUpload() {
    const formData = new FormData();
    formData.append("displayPicture", imageFile);
    dispatch(updateDisplayPicture(token, formData));
    setImageFile(null);
  }

  return (
    <div className="relative mx-auto mt-10 flex max-w-3xl flex-col flex-wrap items-center gap-5 rounded-lg border border-richBlack-700 bg-richBlack-800 p-6 sm:flex-row sm:pl-32">
      <img
        className="left-6 top-6 aspect-square self-center rounded-full object-cover sm:absolute"
        src={
          previewSource ||
          user?.image ||
          `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`
        }
        width={78}
      />
      <h3 className="-order-1 w-full text-lg font-medium text-richBlack-25 sm:order-none">
        Change Profile Picture
      </h3>
      <label className="inline-flex items-center gap-x-2 rounded-lg border border-richBlack-600 bg-richBlack-700 px-5 py-2 text-richBlack-50">
        <BiUpload />
        {imageFile?.name || "Select"}
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
      {imageFile?.name && <MdClose onClick={() => setImageFile(null)} />}
      {imageFile && <BtnYellow onClick={handleImageUpload} text={"Upload"} />}
    </div>
  );
}
