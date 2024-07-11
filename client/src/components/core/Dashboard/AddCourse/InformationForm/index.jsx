import React from "react";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { HiCurrencyRupee } from "react-icons/hi";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseAPI";
import ChipInput from "./ChipInput";
import BtnYellow from "../../BtnYellow";
import RequirementFieldInput from "./RequirementFieldInput";
import { setCourse } from "../../../../../slices/courseSlice";
import { setStep } from "../../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
import ImageUploadField from "./ImageUploadField";

function InformationForm() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [courseCategories, setCourseCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  function isFormUpdated() {
    const currentValues = getValues();
    return (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseDescription !== course.courseDescription ||
      currentValues.price !== course.price ||
      // currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.category._id !== course.category._id ||
      currentValues.courseRequirements !== course.instructions ||
      // currentValues.thumbnail !== course.thumbnail ||
      currentValues.courseBenefits !== course.whatYouWillLearn
    );
  }

  // handles next button click
  async function onSubmit(data) {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        if (currentValues.courseTitle !== course.courseName)
          formData.append("courseName", currentValues.courseTitle);
        if (currentValues.courseDescription !== course.courseDescription)
          formData.append("courseDescription", currentValues.courseDescription);
        if (currentValues.price !== course.price)
          formData.append("price", currentValues.price);
        // if(currentValues.courseTags.toString() !== course.tag.toString()) formData.append("tag", currentValues.tag.toString())
        if (currentValues.category._id !== course.category._id)
          formData.append("category", currentValues.category);
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        )
          formData.append(
            "courseRequirements",
            JSON.stringify(currentValues.instructions)
          );
        // currentValues.thumbnail !== course.thumbnail ||
        if (currentValues.courseBenefits !== course.whatYouWillLearn)
          formData.append("courseBenefits", currentValues.whatYouWillLearn);
        setLoading(true);
        const result = await editCourseDetails(
          { formData, courseId: course._id },
          token
        );
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
        setLoading(false);
      } else {
        toast.error("No change are made to the course");
      }
      return;
    }
    //if new course
    const formData = new FormData();
    formData.append("courseName", data.title);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.price);
    formData.append("whatYouWillLearn", data.benefits);
    formData.append("category", data.category);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("thumbnail", data.thumbnail);
    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  }

  useEffect(() => {
    async function getCategories() {
      const categories = await fetchCourseCategories();
      setCourseCategories(categories);
    }
    getCategories();
    //TODO: test while edit course
    if (editCourse) {
      setValue("title", course.courseName);
      setValue("courseDescription", course.courseDescription);
      setValue("price", course.price);
      setValue("courseTags", course.tag);
      setValue("category", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("benefits", course.whatYouWillLearn);
      setValue("thumbnail", course.thumbnail);
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 space-y-6 rounded-md bg-richBlack-800 p-6"
    >
      {/* title (courseName)*/}
      <div className="flex flex-col items-start gap-2">
        <label className="text-richBlack-5" htmlFor="courseName">
          Title
          <span className="text-lg text-pink-200">*</span>
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="self-stretch rounded-lg bg-richBlack-700 p-3 text-richBlack-5 shadow-inputShadow"
          placeholder="Enter Course Title"
          {...register("title", {
            required: { value: true, message: "title is required" },
            maxLength: { value: 100, message: "too many characters" },
          })}
        />
        {errors.title && (
          <span role="alert" className="text-yellow-50">
            {errors.title?.message}
          </span>
        )}
      </div>
      {/* courseDescription */}
      <div className="flex flex-1 flex-col items-start gap-2">
        <label className="text-richBlack-5" htmlFor="courseDescription">
          Course Short Description
          <span className="text-lg text-pink-200">*</span>
          (under 500 words)
        </label>
        <textarea
          rows={5}
          type="textField"
          name="courseDescription"
          id="courseDescription"
          className="self-stretch rounded-lg bg-richBlack-700 p-3 text-richBlack-5 shadow-inputShadow"
          placeholder="Enter Course Description"
          {...register("courseDescription", {
            required: { value: true, message: "Description is required" },
            maxLength: { value: 500, message: "too many characters" },
          })}
        />
        {errors.courseDescription && (
          <span role="alert" className="text-yellow-50">
            {errors.courseDescription?.message}
          </span>
        )}
      </div>
      {/* price */}
      <div className="relative flex flex-1 flex-col items-start gap-2">
        <label className="text-richBlack-5" htmlFor="price">
          Enter Price
          <span className="text-lg text-pink-200">*</span>
        </label>
        <input
          type="number"
          name="price"
          id="price"
          maxLength={99999}
          className="self-stretch rounded-lg bg-richBlack-700 p-3 pl-11 text-richBlack-5 shadow-inputShadow"
          placeholder="Enter Course Price"
          {...register("price", { required: true })}
        />
        <HiCurrencyRupee className="absolute left-3 top-12 text-2xl text-richBlack-500" />
        {errors.price?.type === "required" && (
          <span role="alert" className="text-yellow-50">
            Price is required
          </span>
        )}
      </div>
      {/* category */}
      <div className="flex w-full flex-col items-start gap-2">
        <label className="text-richBlack-5" htmlFor="category">
          Chose a Category
          <span className="text-lg text-pink-200">*</span>
        </label>
        <select
          type="text"
          name="category"
          id="category"
          className="w-full rounded-lg bg-richBlack-700 p-3 text-richBlack-5 shadow-inputShadow"
          {...register("category", { required: true })}
        >
          <option value="" disabled hidden>
            Please Choose a category
          </option>
          {courseCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category?.type === "required" && (
          <span role="alert" className="text-yellow-50">
            Category is required
          </span>
        )}
      </div>
      {/* Tags */}
      <ChipInput
        label="Course Tags"
        name={"courseTags"}
        id={"courseTags"}
        placeholder="Enter tags and press enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* thumbnail */}
      <ImageUploadField
        name="thumbnail"
        setValue={setValue}
        url={course?.thumbnail} //in case of edit course
        // register={register}
        getValues={getValues}
        label={"Choose an image for Course"}
      />
      {/* benefits (whatYouWillLearn) */}
      <div className="flex flex-1 flex-col items-start gap-2">
        <label className="text-richBlack-5" htmlFor="benefits">
          Benefits of this course
          <span className="text-lg text-pink-200">*</span>
        </label>
        <textarea
          rows={4}
          name="benefits"
          id="benefits"
          className="self-stretch rounded-lg bg-richBlack-700 p-3 text-richBlack-5 shadow-inputShadow"
          placeholder="Enter the benefits of this course"
          {...register("benefits", { required: true })}
        />
        {errors.benefits?.type === "required" && (
          <span className="text-yellow-50">Benefits is required</span>
        )}
      </div>
      {/* courseRequirement (instructions) */}
      <RequirementFieldInput
        name={"courseRequirements"}
        register={register}
        setValue={setValue}
        errors={errors}
      />
      <div className="flex flex-row-reverse gap-3">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="flex items-center gap-2 rounded-lg bg-richBlack-700 px-6 py-3 text-richBlack-5 shadow-ctaButtonShadow"
          >
            Continue Without Saving
          </button>
        )}
        <BtnYellow type="submit" text={!editCourse ? "Next" : "Save Changes"} />
      </div>
    </form>
  );
}

export default InformationForm;
