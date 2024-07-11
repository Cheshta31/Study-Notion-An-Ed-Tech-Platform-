import React from "react";
import { BsLightningCharge } from "react-icons/bs";
import InformationForm from "./InformationForm";
import BuilderForm from "./BuilderForm";
import Publish from "./PublishForm";
import { useSelector } from "react-redux";
import { AiFillCheckCircle } from "react-icons/ai";
function AddCourse() {
  const steps = ["Course Information", "Course Builder", "Publish"];
  const currStep = useSelector((state) => state.course.step);

  return (
    <div className="mx-auto flex  max-w-screen-xl items-start gap-6">
      <div className="flex-grow">
        {/* steps indicator div */}
        <div className="relative z-0 flex">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-1 flex-col items-center gap-2">
              {/* step number */}
              <span
                className={`${
                  currStep >= idx + 1
                    ? "border-yellow-100 bg-yellow-900 text-yellow-100"
                    : "border-richBlack-300 bg-richBlack-700 text-richBlack-300"
                } grid h-9 w-9 place-content-center rounded-full border text-center  text-2xl `}
              >
                {currStep > idx + 1 ? <AiFillCheckCircle /> : `${idx + 1}`}
              </span>
              {/* step name */}
              <span
                className={`${
                  currStep === idx + 1
                    ? "text-richBlack-5"
                    : "text-richBlack-500"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
          <hr
            className={`top absolute left-[15%] right-[50%] top-5 -z-10 h-px origin-left border-dashed ${
              currStep >= 2 ? "border-t-yellow-50" : "border-t-richBlack-600"
            }`}
          />
          <hr
            className={`top absolute left-[50%] right-[15%] top-5 -z-10 h-px origin-right border-dashed ${
              currStep === 3 ? "border-t-yellow-50" : "border-t-richBlack-600"
            }`}
          />
        </div>
        {currStep === 1 && <InformationForm />}
        {currStep === 2 && <BuilderForm />}
        {currStep === 3 && <Publish />}
      </div>
      {/* Course Upload Tips */}
      <CourseUploadTips />
    </div>
  );
}

function CourseUploadTips() {
  return (
    <div className="flex-shrink basis-[336px] rounded border border-richBlack-700 bg-richBlack-800 p-6 text-lg font-semibold text-richBlack-5">
      <h4 className="items flex items-center gap-2">
        <BsLightningCharge className="text-yellow-50" />
        Course Upload Tips
      </h4>
      <ul className="mt-4 list-disc space-y-2 pl-2 text-xs font-medium">
        <li>Set the Course Price option or make it free.</li>
        <li>Standard size for the course thumbnail is 1024x576.</li>
        <li>Video section controls the course overview video.</li>
        <li>
          Add Topics in the Course Builder section to create lessons, quizzes,
          and assignments.
        </li>
        <li>
          Information from the Additional Data section shows up on the course
          single page.
        </li>
        <li>Make Announcements to notify any important</li>
        <li>Notes to all enrolled students at once.</li>
        <li>Course Builder is where you create & organize a course.</li>
      </ul>
    </div>
  );
}
export default AddCourse;
