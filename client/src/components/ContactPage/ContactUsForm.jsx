import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../data/countrycode.json";
import CTAButton from "../core/HomePage/Button";
import { apiConnector } from "../../services/apiConnector";
import { contactusEndpoint } from "../../services/apis";
function ContactUsForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful)
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        contactNumber: "",
      });
  }, [reset, isSubmitSuccessful]);

  async function submitContactForm(data) {
    try {
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );
    } catch (error) {}
  }
  return (
    <form
      className="mt-8 space-y-5 p-8"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex justify-between gap-5">
        {/* first Name */}
        <div className="flex flex-1 flex-col items-start gap-2">
          <label className="text-richBlack-5" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="self-stretch rounded-[0.5rem] bg-richBlack-800 p-[12px] text-richBlack-5 shadow-inputShadow"
            placeholder="Enter First Name"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className="text-pink-300">Please Enter Your Name</span>
          )}
        </div>
        {/* last Name */}
        <div className="flex flex-1 flex-col items-start gap-2">
          <label className="text-richBlack-5" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter Last Name"
            className="self-stretch rounded-[0.5rem] bg-richBlack-800 p-[12px] text-richBlack-5 shadow-inputShadow"
            {...register("lastName")}
          />
        </div>
      </div>

      {/* email */}
      <div className="flex w-full flex-col items-start gap-2">
        <label className="text-richBlack-5" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Enter Email Address"
          className="w-full rounded-[0.5rem] bg-richBlack-800 p-[12px] text-richBlack-5 shadow-inputShadow"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-pink-300">Please Enter Your Email</span>
        )}
      </div>
      {/* ph No. */}
      <div className="flex flex-col items-start gap-2">
        <label className="text-richBlack-5" htmlFor="contactNumber">
          Phone Number
        </label>

        <div className="flex w-full items-start gap-5">
          <select
            type="text"
            name="countrycode"
            id="countrycode"
            className="w-fit max-w-[12rem] text-clip rounded-[0.5rem] bg-richBlack-800 p-[12px] text-richBlack-5 shadow-inputShadow"
            {...register("countrycode", { required: true })}
          >
            {CountryCode.map((ele, i) => {
              return (
                <option key={i} value={ele.code}>
                  {ele.code} - {ele.country}
                </option>
              );
            })}
          </select>
          <div className="flex-1 text-start">
            <input
              type="number"
              name="contactNumber"
              id="contactNumber"
              placeholder="12345 67890"
              className="w-full rounded-[0.5rem] bg-richBlack-800 p-[12px] text-richBlack-5 shadow-inputShadow"
              {...register("contactNumber", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
            {errors.contactNumber && (
              <span className="text-pink-300">
                {errors.contactNumber.message}
              </span>
            )}
          </div>
        </div>
      </div>
      {/* message */}
      <div className="flex flex-col items-start gap-2">
        <label className="text-richBlack-5" htmlFor="message">
          Message
        </label>
        <textarea
          placeholder="Enter your message here!"
          name="message"
          id="message"
          cols="30"
          rows="7"
          className="w-full rounded-[0.5rem] bg-richBlack-800 p-[12px] text-richBlack-5 shadow-inputShadow"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="text-pink-700">Please enter your message.</span>
        )}
      </div>
      <button
        type="submit"
        className={
          "w-full truncate rounded-lg bg-yellow-50 px-6 py-3 font-bold text-richBlack-900 shadow-ctaButtonShadow transition-[background-color] hover:bg-yellow-100"
        }
        active={"true"}
      >
        Send Message
      </button>
    </form>
  );
}

export default ContactUsForm;
