import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function UpdatePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetPassToken } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  function handleOnChange(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(
      resetPassword(
        formData.password,
        formData.confirmPassword,
        resetPassToken,
        navigate
      )
    );
  }
  return (
    <div className="grid min-h-[calc(100vh-3.51rem)] place-items-center bg-richBlack-900">
      <div className="flex max-w-[31.5rem] flex-col gap-3 p-4 md:p-8">
        <h1 className="text-2xl font-semibold text-richBlack-5 md:text-3xl">
          Choose new Password
        </h1>
        <p className="text-richBlack-100 md:text-lg">
          ALmost done. Enter your new password and you're all set.
        </p>
        <form onSubmit={handleOnSubmit}>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richBlack-5">
              New Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richBlack-800 p-[12px] text-richBlack-5 outline-none"
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
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richBlack-5">
              Confirm New Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleOnChange}
              placeholder="Enter email address"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richBlack-800 p-[12px] text-richBlack-5 outline-none"
            />
          </label>
          <button
            type="submit"
            className="mt-6 rounded-[8px] bg-yellow-50 px-[12px] py-[8px] font-medium text-richBlack-900"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
