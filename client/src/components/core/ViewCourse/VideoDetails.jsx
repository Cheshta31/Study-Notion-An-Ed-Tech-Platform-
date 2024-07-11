import React, { useEffect, useRef, useState } from "react";
import "video-react/dist/video-react.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { Player, LoadingSpinner, BigPlayButton } from "video-react";
import { MdReplay } from "react-icons/md";
import { ImCheckmark } from "react-icons/im";

function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currSectionIdx, setCurrSectionIdx] = useState(0);
  const [currSubSectionIdx, setCurrSubSectionIdx] = useState(0);

  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) return;
      if (!courseId || !sectionId || !subSectionId)
        return navigate("/dashboard/enrolled-courses");
      const sectionIdx = courseSectionData.findIndex(
        (section) => section._id === sectionId
      );
      setCurrSectionIdx(sectionIdx);
      const subSectionIdx = courseSectionData[sectionIdx].subSection.findIndex(
        (subSec) => subSec._id === subSectionId
      );
      setCurrSubSectionIdx(subSectionIdx);
      setVideoData(courseSectionData[sectionIdx].subSection[subSectionIdx]);
      setVideoEnded(false);
    };

    setVideoSpecificDetails();
    setLoading(false);
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    // const currSectionIdx = courseSectionData.findIndex(
    //   (section) => section._id === sectionId
    // );
    if (currSectionIdx !== 0) return false;
    // const currSubSectionIdx = courseSectionData[currSectionIdx].findIndex(
    //   (subSec) => subSec._id === subSectionId
    // );
    if (currSubSectionIdx === 0) return true;
    else return false;
  };

  const isLastVideo = () => {
    if (currSectionIdx !== courseSectionData.length - 1) return false; //check if section is last

    if (
      currSubSectionIdx ===
      courseSectionData[currSectionIdx].subSection.length - 1
    )
      return true;
    else return false;
  };
  const goToNextVideo = () => {
    // go to next subSection if current is not the last
    const subSectionLength =
      courseSectionData[currSectionIdx].subSection.length;
    if (currSubSectionIdx !== subSectionLength - 1) {
      const nextSubSectionId =
        courseSectionData[currSectionIdx].subSection[currSubSectionIdx + 1]._id;
      return navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    }
    // go to next Section if current subSection is last
    if (currSectionIdx !== courseSectionData.length - 1) {
      const nextSubSectionId =
        courseSectionData[currSectionIdx + 1].subSection[0]._id;
      const nextSectionId = courseSectionData[currSectionIdx + 1]._id;
      return navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
    //if section and subSection both are last then do nothing
    return;
  };
  const goToPrevVideo = () => {
    const subSectionLength =
      courseSectionData[currSectionIdx].subSection.length;
    // go to prev subSection if curr is not the first
    if (currSubSectionIdx !== 0) {
      const prevSubSectionId =
        courseSectionData[currSectionIdx].subSection[currSubSectionIdx - 1]._id;
      return navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    }
    //go to last subSection of prev section
    if (currSectionIdx !== 0) {
      const prevSectionId = courseSectionData[currSectionIdx - 1]._id;
      const prevSubSectionId =
        courseSectionData[currSectionIdx - 1].subSection[subSectionLength - 1]
          ._id;
      return navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
    return;
  };
  const handleMarkLecComplete = async () => {
    setLoading(true);
    const res = await markLectureAsComplete({ courseId, subSectionId }, token);
    if (res) dispatch(updateCompletedLectures(subSectionId));
    // console.log(completedLectures);
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;
  else
    return (
      <div className="mx-auto max-w-5xl">
        {!videoData ? (
          <div>No Data Found</div>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <h2 className="mt-3 text-2xl font-semibold">
                {videoData?.title}
              </h2>
              {!completedLectures.includes(subSectionId) && (
                <button
                  onClick={handleMarkLecComplete}
                  className="flex items-center gap-x-3 rounded p-2 text-sm ring ring-yellow-25"
                >
                  <ImCheckmark />
                  Mark As Completed
                </button>
              )}
            </div>
            <Player
              ref={playerRef}
              aspectRatio="16:9"
              playsInline
              poster={courseEntireData?.thumbnail}
              src={videoData?.videoUrl}
              onEnded={() => setVideoEnded(true)}
              className={"relative z-0 mt-5"}
            >
              {/* <source src={videoData} /> */}

              {videoEnded && (
                <button
                  onClick={() => {
                    playerRef.current.seek(0);
                    playerRef.current.play();
                    setVideoEnded(false);
                  }}
                  disabled={loading}
                  className="absolute left-1/2 top-1/2 z-30 aspect-square rounded-lg bg-yellow-50 p-3 text-xl font-semibold text-black"
                >
                  <MdReplay />
                </button>
              )}

              <BigPlayButton position="center" className="ring ring-pink-400" />
              <LoadingSpinner />
            </Player>
          </div>
        )}
        {/* prev and next buttons */}
        <div className="my-6 flex justify-center gap-x-4 text-lg">
          {!isFirstVideo() && (
            <button
              disabled={loading}
              className="cursor-pointer rounded-md bg-richBlack-800 px-4 py-2 text-lg font-semibold ring-1 ring-yellow-25"
              onClick={goToPrevVideo}
            >
              Prev
            </button>
          )}
          {!isLastVideo() && (
            <button
              disabled={loading}
              onClick={goToNextVideo}
              className="cursor-pointer rounded-md bg-richBlack-800 px-4 py-2 text-lg font-semibold ring-1 ring-yellow-25"
            >
              Next
            </button>
          )}
        </div>
        <p className="mt-2 text-sm text-richBlack-50">
          {videoData?.description}
        </p>
      </div>
    );
}

export default VideoDetails;
