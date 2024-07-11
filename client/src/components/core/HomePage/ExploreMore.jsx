import React, { useState } from "react";
import CourseCard from "./CourseCard";
import { HomePageExplore } from "../../../data/homepage-explore";

function ExploreMore() {
  const tags = HomePageExplore.map((item) => item.tag);
  const [currentTag, setCurrentTag] = useState(tags[0]);
  const [currentCards, setCurrentCards] = useState(HomePageExplore[0].courses);

  function setCardsHandler(clickedTag) {
    setCurrentTag(clickedTag);
    const clickedTagObject = HomePageExplore.reduce(
      (foundObject, currentObject) => {
        if (currentObject.tag === clickedTag) {
          foundObject = currentObject;
        }
        return foundObject;
      },
      null
    );
    setCurrentCards(clickedTagObject.courses);
  }

  return (
    <>
      <div className="relative">
        <div className="absolute md:static mx-auto flex flex-col md:flex-row  mt-12 rounded-full w-fit p-[3px] bg-richBlack-800 text-richBlack-400">
          {tags.map((tag, i) => (
            <button
              className={`cursor-pointer rounded-full px-3 text-center md:px-5 py-2 ${
                tag === currentTag ? "bg-richBlack-900" : "bg-richBlack-800"
              }`}
              onClick={() => setCardsHandler(tag)}
              key={i}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center mt-16 lg:flex-row gap-9 ">
        <CourseCard
          active={true}
          description={currentCards[0].description}
          heading={currentCards[0].heading}
          level={currentCards[0].level}
          lessonNumber={currentCards[0].lessonNumber}
        />
        <CourseCard
          active={false}
          description={currentCards[1].description}
          heading={currentCards[1].heading}
          level={currentCards[1].level}
          lessonNumber={currentCards[1].lessonNumber}
        />
        <CourseCard
          active={false}
          description={currentCards[2].description}
          heading={currentCards[2].heading}
          level={currentCards[2].level}
          lessonNumber={currentCards[2].lessonNumber}
        />
      </div>
    </>
  );
}

export default ExploreMore;
