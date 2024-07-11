import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";

import frameImg from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Link } from "react-router-dom";

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richBlack-900">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-x-12 md:gap-y-0">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            {/* link to login and signup */}
            <p className="mb-4 text-richBlack-25">
              {formType === "signup"
                ? "Already have an account "
                : "Create Account ? "}
              <Link
                className="capitalize text-yellow-25 underline hover:text-yellow-50"
                to={formType === "signup" ? "/login" : "/signup"}
              >
                {formType === "signup" ? "Login" : "Sign Up"}
              </Link>
            </p>
            {/* title */}
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richBlack-5">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richBlack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative z-0 mx-auto w-11/12 max-w-[450px] md:mx-0">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -right-4 top-4 -z-10"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Template;
