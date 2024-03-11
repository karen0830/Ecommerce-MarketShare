import React, { useState } from "react";
const Rating = ({setRatingNum}) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    setRatingNum(selectedRating)
    console.log(selectedRating);
  };

  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={starValue <= rating ? "star selected" : "star"}
            onClick={() => handleStarClick(starValue)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
