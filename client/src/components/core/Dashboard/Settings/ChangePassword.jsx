import React, { useState } from "react";
import BtnYellow from "../BtnYellow";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ChangePassword as changePassAPI } from "../../../../services/operations/SettingsAPI";
function ChangePassword() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function ChangePasswordHandler(data) {
    try {
      data.email = user.email;
      await changePassAPI(token, data);
    } catch (error) {
      console.error("Error Message: " + error.message);
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  return (
    <form
      onSubmit={handleSubmit(ChangePasswordHandler)}
      className="mx-auto mt-10 max-w-3xl "
    >
      <div className="flex gap-x-6 rounded-lg border border-richBlack-700 bg-richBlack-800 p-6 pb-8">
        <div className="relative flex-1 self-stretch">
          <label
            htmlFor="oldPassword"
            className="mb-1 text-[0.875rem] leading-[1.375rem] text-richBlack-5"
          >
            Current Password <sup className="text-pink-200">*</sup>
          </label>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="oldPassword"
            placeholder="Enter Old Password"
            className="w-full rounded-[0.5rem] bg-richBlack-700 p-[12px] text-richBlack-5 shadow-inputShadow"
            {...register("oldPassword", { required: true })}
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
          {errors.oldPassword && (
            <div className="absolute -bottom-5 text-[12px] text-yellow-100">
              Please enter your Current Password.
            </div>
          )}
        </div>
        <div className="relative flex-1 self-stretch">
          <label className="mb-1 text-[0.875rem] leading-[1.375rem] text-richBlack-5">
            New Password <sup className="text-pink-200">*</sup>
          </label>
          <input
            required
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            placeholder="Enter new Password"
            className="w-full rounded-[0.5rem] bg-richBlack-700 p-[12px] text-richBlack-5 shadow-inputShadow"
            {...register("newPassword", { required: true })}
          />
          <span
            onClick={() => setShowNewPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showNewPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
          {errors.newPassword && (
            <div className="absolute -bottom-5 text-[12px] text-yellow-100">
              Please enter your New Password.
            </div>
          )}
        </div>
      </div>
      <div className="mt-5 flex justify-end gap-4">
        <button
          onClick={() => {
            navigate("/dashboard/my-profile");
          }}
          className="rounded-lg border border-richBlack-600 bg-richBlack-700 px-5 py-2 text-richBlack-50"
        >
          Cancel
        </button>
        <BtnYellow type={"submit"} text={"Save"} />
      </div>
    </form>
  );
}

export default ChangePassword;
