import React, { useState } from "react";
import Button from "../components/core/HomePage/Button";
import { BsArrowLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPasswordResetToken } from "../services/operations/authAPI";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isMailSent, setIsMailSent] = useState(false);
  const dispatch = useDispatch();

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setIsMailSent));
  }
  // Handle input fields, when some value changes
  return (
    <div className="grid min-h-[calc(100vh-3.51rem)] place-items-center bg-richBlack-900">
      <div className="flex max-w-[31.5rem] flex-col gap-3 p-4 md:p-8">
        <h1 className="text-2xl font-semibold text-richBlack-5 md:text-3xl">
          Reset Your Password
        </h1>
        <p className="text-richBlack-100 md:text-lg">
          {isMailSent
            ? `We have sent the reset email to ${email}`
            : "Have no fear. We’ll email you instructions to reset your password. If you don't have access to your email we can try account recovery"}
        </p>
        <form onSubmit={handleOnSubmit}>
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richBlack-5">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {isMailSent ? "Resend Email" : "Submit"}
          </button>
        </form>
        <NavLink
          to={"/login"}
          className={"flex items-center gap-2 text-richBlack-5"}
        >
          <BsArrowLeft /> Return to login
        </NavLink>
      </div>
    </div>
  );
}

export default ForgotPassword;
