import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseAPI";
import { toast } from "react-hot-toast";
import { setCourse } from "../../../../../slices/courseSlice";
import { GrFormClose } from "react-icons/gr";
import BtnYellow from "../../BtnYellow";
import ImageUploadField from "../InformationForm/ImageUploadField";
import { MdClose } from "react-icons/md";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    setValue("lectureTitle", modalData.title);
    setValue("lectureDesc", modalData.description);
    setValue("lectureVideo", modalData.videoUrl);
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    );
  };
  const handleEditSubSection = async (data) => {
    const sectionId = modalData.sectionId;
    const subSectionId = modalData._id;
    const formData = {
      subSectionId,
      sectionId,
      title: data.lectureTitle,
      description: data.lectureDesc,
    };
    const updatedSection = await updateSubSection(formData, token);
    if (!updatedSection)
      return toast.error("some error occurred while updating sub section");

    const courseContent = [...course.courseContent];
    const sectionIdx = courseContent.findIndex(
      (section) => section._id === sectionId
    );
    // console.log("sectionIdx", sectionIdx);
    // updating the currentContent
    courseContent[sectionIdx] = await updatedSection;
    // console.log(courseContent);
    //updating it to the course state
    dispatch(setCourse({ ...course, courseContent }));
    setModalData(null); //it will close the modal
    setLoading(false);
  };

  async function onSubmit(data) {
    if (view) return;
    if (edit) {
      if (!isFormUpdated()) return;
      else {
        handleEditSubSection(data);
      }
      return;
    }
    // if new subsection is being created
    if (!data.lectureVideo) return;
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("lectureVideo", data.lectureVideo);

    setLoading(true);
    const updatedSection = await createSubSection(formData, token);
    //updating it to the state
    if (!updatedSection)
      return toast.error("some error occurred while creating sub section");

    const courseContent = [...course.courseContent];
    const sectionIdx = courseContent.findIndex(
      (section) => section._id === modalData
    );
    // console.log("sectionIdx", sectionIdx);
    // updating the currentContent
    courseContent[sectionIdx] = await updatedSection;
    // console.log(courseContent);
    //updating it to the course state
    dispatch(setCourse({ ...course, courseContent }));
    setModalData(null); //it will close the modal
    setLoading(false);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 grid place-content-center bg-black bg-opacity-50 pr-10">
      <div className="overflow-y-auto py-5">
        <div className="z-50 mx-auto w-[500px] rounded-md bg-richBlack-800 text-richBlack-5">
          {/* heading */}
          <div className="flex justify-between rounded-t-md bg-richBlack-700 px-4 py-3">
            <h2>
              {view && "Viewing "}
              {add && "Adding "}
              {edit && "Editing "}Lecture
            </h2>
            <button
              onClick={(e) => {
                e.preventDefault();
                setModalData(null);
              }}
            >
              <MdClose />
            </button>
          </div>
          {/* form */}
          <form
            className="space-y-2 px-6 py-3 text-sm"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* using the same image upload component of information form for video upload */}
            <ImageUploadField
              name="lectureVideo"
              label="Lecture Video"
              register={register}
              setValue={setValue}
              getValues={getValues}
              errors={errors}
              video={true} //!
              url={modalData?.videoUrl}
            />

            {/* lecture title */}
            <div className="flex flex-col items-start gap-1">
              <label className="text-richBlack-5" htmlFor="lectureTitle">
                Lecture Title
                <span className="text-lg text-pink-200">*</span>
              </label>
              <input
                type="text"
                name="lectureTitle"
                id="lectureTitle"
                className="self-stretch rounded-lg bg-richBlack-700 px-3 py-2 text-richBlack-5 shadow-inputShadow"
                placeholder="Enter Lecture Title"
                {...register("lectureTitle", {
                  required: { value: true, message: "title is required" },
                  maxLength: { value: 100, message: "too many characters" },
                })}
              />
              {errors.lectureTitle && (
                <span role="alert" className="text-yellow-50">
                  {errors.lectureTitle?.message}
                </span>
              )}
            </div>

            {/* lecture Description */}
            <div className="flex flex-1 flex-col items-start gap-2">
              <label className="text-richBlack-5" htmlFor="lectureDesc">
                Course Short Description
                <span className="text-pink-200">*</span> (under 1000 words)
              </label>
              <textarea
                rows={4}
                type="textField"
                name="lectureDesc"
                id="lectureDesc"
                className="self-stretch rounded-lg bg-richBlack-700 px-3 py-2 text-richBlack-5 shadow-inputShadow"
                placeholder="Enter Course Description"
                {...register("lectureDesc", {
                  required: { value: true, message: "Description is required" },
                  maxLength: { value: 1000, message: "too many characters" },
                })}
              />
              {errors.lectureDesc && (
                <span role="alert" className="text-yellow-50">
                  {errors.lectureDesc?.message}
                </span>
              )}
            </div>

            {!view && (
              <div className="flex justify-end">
                <BtnYellow text={edit ? "Save Changes" : "Save"} />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubSectionModal;
