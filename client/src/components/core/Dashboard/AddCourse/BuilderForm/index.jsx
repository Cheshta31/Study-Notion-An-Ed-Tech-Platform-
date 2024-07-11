import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BtnYellow from "../../BtnYellow";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  MdNavigateBefore,
  MdNavigateNext,
  MdOutlineAddCircleOutline,
} from "react-icons/md";
import { toast } from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseAPI";
import NestedView from "./NestedView";

const BuilderForm = () => {
  const { course } = useSelector((state) => state.course);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  function cancelEdit() {
    setEditSectionName(null);
    setValue("sectionName", "");
  }
  const goToNext = () => {
    if (course === undefined) return toast.error("course is undefined");
    if (course?.courseContent?.length === 0)
      return toast.error("Please add atleast 1 section");
    if (
      course?.courseContent?.some((section) => section.subSection.length === 0)
    )
      return toast.error("Please add atleast 1 lecture in each section");
    dispatch(setStep(3));
  };
  function goBack(e) {
    e.preventDefault();
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
    return;
  }
  const sectionCEHandler = async (data) => {
    //create edit handler
    setLoading(true);
    if (editSectionName) {
      const updatedSection = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
      if (!updatedSection)
        toast.error("some error occurred while changing name");

      const courseContent = [...course.courseContent];
      const sectionIdx = courseContent.findIndex(
        (section) => section._id === editSectionName
      );

      // //updating the currentContent
      courseContent[sectionIdx] = await updatedSection;
      //updating it to the course state
      dispatch(setCourse({ ...course, courseContent }));
    } else {
      const result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
      if (result) dispatch(setCourse(result));
    }

    setEditSectionName(null);
    setValue("sectionName", "");

    setLoading(false);
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="mt-8 space-y-6 rounded-md bg-richBlack-800 p-6">
      <h2 className="text-2xl font-semibold text-richBlack-25">
        Course Builder
      </h2>
      <form action="" onSubmit={handleSubmit(sectionCEHandler)}>
        <div className="flex flex-col items-start gap-2">
          <label className="text-richBlack-5" htmlFor="sectionName">
            Section Name
            <span className="text-lg text-pink-200">*</span>
          </label>
          <input
            id="sectionName"
            placeholder="Add section Name"
            className="self-stretch rounded-lg bg-richBlack-700 p-3 text-richBlack-5 shadow-inputShadow"
            type="text"
            {...register("sectionName", {
              required: { value: true, message: "Section Name is required" },
            })}
          />
        </div>

        <div className="mt-4 flex gap-2">
          <BtnYellow
            icon={<MdOutlineAddCircleOutline />}
            type={"submit"}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
          />
          {editSectionName && (
            <button
              onClick={cancelEdit}
              className="richBlack-300 text-sm underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* nested view */}
      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      {/* button for navigating next /previous steps */}
      <div className="flex justify-end gap-x-3">
        <button
          className="flex items-center gap-2 rounded-lg bg-richBlack-700 px-6 py-3 text-richBlack-5 shadow-ctaButtonShadow"
          onClick={goBack}
        >
          <MdNavigateBefore />
          Back
        </button>
        <BtnYellow //only Show next button when course have at least 1 section
          className={"flex-row-reverse"}
          icon={<MdNavigateNext />}
          text="Next"
          onClick={goToNext}
        />
      </div>
    </div>
  );
};

export default BuilderForm;
