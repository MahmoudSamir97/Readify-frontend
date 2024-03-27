import React from "react";
import "./ShowReview.css";

function ShowReview({ name, rating, message }) {
  console.log(rating);
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i < 5; i++) {
      stars.push(
        <i
          key={i}
          className="fa fa-star"
          style={{ color: i < rating ? "#FFD43B" : "#808080" }}
        ></i>
      );
    }
    return stars;
  };
  return (
    <div className="single-review-container mb-4 ">
      <div className="stars-container mt-3 mb-2">
        <i class="fa-solid fa-star" style={{ color: "#FFD43B" }}></i>
        {renderStars()}
      </div>
      <div className="review-content">
        <h5 className="text-black mb-2 mt-1">{message}</h5>
        <div className="reviewee-footer">{name}</div>
      </div>
    </div>
  );
}

export default ShowReview;
