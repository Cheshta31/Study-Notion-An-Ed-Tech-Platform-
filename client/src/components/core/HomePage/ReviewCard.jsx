import React from "react";

function ReviewCard({ dp, name, email, review, rating }) {
  const styles = {
    ratingStars: {
      color: "transparent",
      backgroundImage: `linear-gradient(to right, #E7C009 0% ${
        rating / 0.05
      }%, #eee  ${rating / 0.05}% 100%)`,
      backgroundClip: "text",
    },
  };
  return (
    <div className="my-6 h-[11.5rem] w-[18rem] bg-richBlack-800 px-3 py-4">
      <div className="flex gap-3">
        <img
          className="aspect-square w-9 rounded-full object-cover"
          src={dp}
          alt=""
        />
        <div>
          <h3 className="text-sm font-semibold text-richBlack-5">{name}</h3>
          <p className="text-xs text-richBlack-600">{email}</p>
        </div>
      </div>
      <p className="py-2 text-xs text-richBlack-25">{review}</p>
      <div className="space-x-2 text-sm font-semibold text-yellow-100">
        <span>{rating}</span>
        <span style={styles.ratingStars}>
          &#9733;&#9733;&#9733;&#9733;&#9733;
        </span>
      </div>
    </div>
  );
}

export default ReviewCard;
