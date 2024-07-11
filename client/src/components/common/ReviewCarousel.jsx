import React, { useEffect, useState } from "react";
import ReviewCard from "../core/HomePage/ReviewCard";
import { fetchAllReviews } from "../../services/operations/catalogAPI";

function ReviewCarousel() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getAllReviews() {
      const res = await fetchAllReviews();

      if (res) setReviews(res);
      // console.log(res);
    }
    getAllReviews();
  }, []);

  return (
    <div className="scrollbar-hide flex flex-shrink-0 gap-6 overflow-x-auto">
      {reviews.map((item) => (
        <ReviewCard
          key={item._id}
          dp={item.user ? item?.user?.image : ""}
          name={item.user ? item?.user.firstName + " " + item?.user?.lastName : "Anonymous"}
          email={item.user ? item?.user.email : ""}
          review={item.review}
          rating={item.rating}
        />
      ))}
    </div>
  );
}

export default ReviewCarousel;
