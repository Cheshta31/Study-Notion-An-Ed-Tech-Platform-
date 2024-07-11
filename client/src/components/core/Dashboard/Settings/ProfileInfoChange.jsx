import React from "react";
import { useForm } from "react-hook-form";
import BtnYellow from "../BtnYellow";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../../services/operations/SettingsAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setUser } from "../../../../slices/profileSlice";
function ProfileInfoChange() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  // console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function submitContactForm(formData) {
    const profileDetails = await updateProfile(token, formData);
    if (!profileDetails) toast.error("Something went wrong");
    dispatch(setUser({ ...user, additionalDetails: profileDetails }));
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  return (
    <form
      onSubmit={handleSubmit(submitContactForm)}
      className="mx-auto mt-10 max-w-3xl"
    >
      <div className="grid grid-cols-2 gap-6 rounded-lg border border-richBlack-700 bg-richBlack-800 p-6">
        <p className="col-span-2 text-start text-lg font-semibold text-richBlack-5">
          Profile Information
        </p>
        {/* firstName */}
        <div className="flex flex-1 flex-col items-start gap-2">
          <label className="text-richBlack-5" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            defaultValue={user.firstName || ""}
            name="firstName"
            id="firstName"
            className="self-stretch rounded-[0.5rem] bg-richBlack-700 p-[12px] text-richBlack-5 shadow-inputShadow"
            placeholder="Enter First Name"
            {...register("firstName")}
          />
          {errors.firstName && (
            <span className="text-pink-300">Please Enter Your Name</span>
          )}
        </div>
        {/* lastName */}
        <div className="flex flex-1 flex-col items-start gap-2">
          <label className="text-richBlack-5" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            defaultValue={user.lastName || ""}
            name="lastName"
            id="lastName"
            className="self-stretch rounded-[0.5rem] bg-richBlack-700 p-[12px] text-richBlack-5 shadow-inputShadow"
            placeholder="Enter Last Name"
            {...register("lastName")}
          />
          {errors.lastName && (
            <span className="text-pink-300">Please Enter Your Name</span>
          )}
        </div>
        {/* DOB */}
        <div className="flex w-full flex-col items-start gap-2">
          <label className="text-richBlack-5" htmlFor="email">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            defaultValue={user?.additionalDetails?.dateOfBirth || ""}
            min="1960-01-01"
            max="2010-01-01"
            id="dateOfBirth"
            className="w-full rounded-[0.5rem] bg-richBlack-700 p-[12px] text-richBlack-5 shadow-inputShadow"
            {...register("dateOfBirth", { required: true })}
          />
          {errors.dateOfBirth && (
            <span className="text-pink-300">{errors.dateOfBirth.message}</span>
          )}
        </div>
        {/* gender */}
        <div className="flex w-full flex-col items-start gap-2">
          <label className="text-richBlack-5" htmlFor="gender">
            Gender
          </label>
          <select
            type="text"
            defaultValue={user?.additionalDetails?.gender || ""}
            name="gender"
            id="gender"
            className="w-full rounded-[0.5rem] bg-richBlack-700 p-[12px] text-richBlack-5 shadow-inputShadow"
            {...register("gender", { required: true })}
          >
            <option value="" disabled hidden>
              Please Choose...
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non Binary">Non Binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          {errors.gender && (
            <span className="text-pink-300">{errors.gender.message}</span>
          )}
        </div>
        {/* contact Number */}
        <div className="flex w-full flex-col items-start gap-2">
          <label className="text-richBlack-5" htmlFor="gender">
            Contact Number
          </label>
          <input
            type="number"
            name="contactNumber"
            defaultValue={user?.additionalDetails?.contactNumber || ""}
            id="contactNumber"
            placeholder="12345 67890"
            className="self-stretch rounded-[0.5rem] bg-richBlack-700 p-[12px] text-richBlack-5 shadow-inputShadow"
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
        {/* about */}
        <div className="flex flex-1 flex-col items-start gap-2">
          <label className="text-richBlack-5" htmlFor="about">
            About
          </label>
          <input
            type="text"
            name="about"
            defaultValue={user?.additionalDetails?.about || ""}
            id="about"
            className="self-stretch rounded-[0.5rem] bg-richBlack-700 p-[12px] text-richBlack-5 shadow-inputShadow"
            placeholder="Enter about yourself"
            {...register("about")}
          />
          {errors.about && (
            <span className="text-pink-300">
              Enter Something about yourself
            </span>
          )}
        </div>
      </div>
      <div className="mt-5 flex flex-row-reverse gap-4">
        <BtnYellow type={"submit"} form="UpdateProfileForm" text={"Save"} />
        <button
          onClick={() => navigate("/dashboard/my-profile")}
          className="rounded-lg border border-richBlack-600 bg-richBlack-700 px-5 py-2 text-richBlack-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ProfileInfoChange;
