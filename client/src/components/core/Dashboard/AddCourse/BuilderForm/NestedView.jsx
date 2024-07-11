import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsListNested, BsViewList } from "react-icons/bs";
import { TbSquareRoundedPlus } from "react-icons/tb";
import { MdDeleteForever, MdEdit, MdExpandCircleDown } from "react-icons/md";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseAPI";
import { toast } from "react-hot-toast";
import SubSectionModal from "./SubSectionModal";
import { setCourse } from "../../../../../slices/courseSlice";
const NestedView = ({ handleChangeEditSectionName }) => {
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.course);
  const token = useSelector((state) => state.auth.token);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const deleteSectionHandler = async (sectionId) => {
    if (!sectionId) toast.error("Error occurred while deleting section");
    await deleteSection({ sectionId, courseId: course._id }, token);

    let courseContent = [...course.courseContent];
    const sectionIdx = courseContent.findIndex(
      (section) => section._id === sectionId
    );
    // delete the section from state
    courseContent.splice(sectionIdx, sectionIdx + 1);
    // console.log(courseContent);
    //updating it to the course state
    dispatch(setCourse({ ...course, courseContent }));
  };

  // deletesubsectionfunction
  const deleteSubSectionHandler = async (subSectionId, sectionId) => {
    if (!sectionId || !subSectionId)
      toast.error("Error occurred while deleting Sub Section");
    const updatedSection = await deleteSubSection(
      { subSectionId, sectionId },
      token
    );

    if (!updatedSection)
      toast.error("some error occurred while deleting Sub Section");

    const courseContent = [...course.courseContent];
    const sectionIdx = courseContent.findIndex(
      (section) => section._id === sectionId
    );

    // //updating the currentContent
    courseContent[sectionIdx] = await updatedSection;
    //updating it to the course state
    dispatch(setCourse({ ...course, courseContent }));
  };

  return (
    <div>
      <div className="space-y-2 rounded-lg bg-richBlack-600 p-3 text-richBlack-50">
        {/* sections */}
        {course?.courseContent?.map((section) => (
          <details
            className="border-b-2 border-b-richBlack-200 border-opacity-80"
            key={section._id}
            open
          >
            <summary className="flex items-center justify-between">
              <div className="flex cursor-pointer items-baseline gap-x-3 font-semibold">
                <BsListNested />
                <span>{section.sectionName}</span>
              </div>
              <div className="space-x-3">
                {/* Edit section name */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    );
                  }}
                >
                  <MdEdit />
                </button>
                {/* delete section */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmationModal({
                      text1: "Delete This Section",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "No",
                      btn2Text: "Delete",
                      btn1Handler: () => setConfirmationModal(null),
                      btn2Handler: () => {
                        deleteSectionHandler(section._id);
                        setConfirmationModal(null);
                      },
                    });
                  }}
                >
                  <MdDeleteForever />
                </button>
                {/* expand to subSection */}
                <button className="border-l border-l-richBlack-100 border-opacity-50 pl-3">
                  <MdExpandCircleDown />
                </button>
              </div>
            </summary>

            {/* sub sections */}
            <div className="space-y-1 p-1 pl-4">
              {section.subSection.map((subSec) => (
                <div
                  key={subSec._id}
                  className="flex items-baseline justify-between gap-x-3 border-b border-b-richBlack-200 border-opacity-40"
                >
                  {/* subsectionName  */}
                  <div
                    onClick={() => {
                      setViewSubSection(subSec);
                    }}
                    className="item-center flex cursor-zoom-in gap-x-3"
                  >
                    <BsViewList />
                    <small>{subSec.title}</small>
                  </div>
                  <div className="space-x-3">
                    {/* Edit subsection section */}
                    <button
                      onClick={() =>
                        setEditSubSection({
                          ...subSec,
                          sectionId: section._id,
                        })
                      }
                    >
                      <MdEdit />
                    </button>
                    {/* delete sub section */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setConfirmationModal({
                          text1: "Delete This Sub Section",
                          text2:
                            "All the lectures in this Sub section will be deleted",
                          btn1Text: "No",
                          btn2Text: "Delete",
                          btn1Handler: () => setConfirmationModal(null),
                          btn2Handler: () => {
                            deleteSubSectionHandler(subSec._id, section._id);
                            setConfirmationModal(null);
                          },
                        });
                      }}
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="flex items-baseline gap-x-3 text-yellow-50"
                onClick={() => setAddSubSection(section._id)}
              >
                <TbSquareRoundedPlus />
                Add Lecture
              </button>
            </div>
          </details>
        ))}
      </div>
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <div></div>
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default NestedView;
