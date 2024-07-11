import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../services/operations/authAPI";
import { RxCountdownTimer } from "react-icons/rx";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="grid min-h-[calc(100vh-3.51rem)] place-items-center bg-richBlack-900">
      <div className="flex max-w-[31.5rem] flex-col gap-3 p-4 md:p-8">
        <h1 className="text-2xl font-semibold text-richBlack-5 md:text-3xl">
          Verify Email
        </h1>
        <p className="text-richBlack-100 md:text-lg">
          A verification code has been sent to you. Enter it here.
        </p>
        <form onSubmit={handleVerifyAndSignup}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="aspect-square w-[48px] rounded-[0.5rem] border-0 bg-richBlack-800 text-center text-richBlack-5 focus:border-0 focus:outline-2 focus:outline-yellow-50 lg:w-[60px]"
              />
            )}
            containerStyle={{ justifyContent: "space-between", gap: "0 6px" }}
          />
          <button
            type="submit"
            className="mt-6 w-full rounded-[8px] bg-yellow-50 px-[12px] py-[12px] font-medium text-richBlack-900"
          >
            Verify Email
          </button>
          <Link
            to={"/login"}
            className={"flex items-center gap-2 text-richBlack-5"}
          >
            <BsArrowLeft /> Return to login
          </Link>
          <button
            className="flex items-center gap-x-2 text-blue-100"
            onClick={() => dispatch(sendOtp(signupData.email))}
          >
            <RxCountdownTimer />
            Resend it
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
