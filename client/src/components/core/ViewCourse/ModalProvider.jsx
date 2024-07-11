import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import { createRating } from "../../../services/operations/courseAPI";

const ModalContext = createContext();
export function useReviewModal() {
  return useContext(ModalContext);
}

export const ModalProvider = ({ children }) => {
  const user = useSelector((state) => state.profile.user);
  const token = useSelector((state) => state.auth.token);
  const courseId = useSelector(
    (state) => state.viewCourse.courseEntireData?._id
  );
  const [formData, setFormData] = useState({
    rating: 0,
    review: "",
  });

  const dialogRef = useRef();
  function showModal() {
    dialogRef.current.showModal();
    // else dialogRef.current.close();
  }
  function closeModal() {
    dialogRef.current.close();
  }

  const handleSubmit = async (e) => {
    if (!formData.review) return;
    await createRating(
      {
        courseId,
        ...formData,
      },
      token
    );
    closeModal();
  };

  return (
    <ModalContext.Provider value={showModal}>
      {children}

      {/* modal */}
      <dialog
        onClick={(e) => {
          const dialogDimensions = dialogRef.current.getBoundingClientRect();
          if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
          ) {
            dialogRef.current.close();
          }
        }}
        ref={dialogRef}
        review-modal={"true"}
        className="w-[30rem] rounded-md bg-richBlack-800 p-0 text-richBlack-5"
      >
        <form method="dialog" onSubmit={handleSubmit}>
          <caption className="w-full bg-richBlack-700 p-5 py-3 text-start text-sm font-bold">
            Add Review
          </caption>
          <div className="flex flex-col items-center gap-3 p-5">
            <figure className="flex gap-2">
              <img
                className="rounded-full object-cover"
                width={52}
                src={user?.image}
                alt="user-avatar"
              />
              <figcaption className="font-semibold text-richBlack-5">
                {user?.firstName + " " + user?.lastName}
                <p className="text-sm font-normal text-richBlack-5">
                  Posting Publicly
                </p>
              </figcaption>
            </figure>
            <ReactStars
              count={5}
              value={formData.rating}
              onChange={(rating) => {
                setFormData({ ...formData, rating });
              }}
              size={24}
              color2={"#ffd700"}
            />
            <label className="self-start" htmlFor="reviewText">
              Add Your Experience!
            </label>
            <textarea
              rows={3}
              type="textField"
              name="reviewText"
              id="reviewText"
              value={formData.review}
              onChange={(e) => {
                setFormData({ ...formData, review: e.target.value });
              }}
              className="self-stretch rounded-lg bg-richBlack-700 p-2 text-sm text-richBlack-5 shadow-inputShadow"
              placeholder="Enter Your Review..."
            />
            <button className="self-end rounded-lg bg-yellow-25 px-4 py-2 text-black">
              save
            </button>
          </div>
        </form>
      </dialog>
    </ModalContext.Provider>
  );
};
