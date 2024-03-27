import React, { useState } from "react";
import "./Rating.css";
import { Alert, Snackbar } from "@mui/material";

const RatingComponent = ({ onSubmit }) => {
  const [selectedStar, setSelectedStar] = useState(null);
  const [ratingMessage, setRatingMessage] = useState("");
  // Snackbar
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // Snackbar

  const handleStarClick = (value) => {
    setSelectedStar(value);
  };

  const handleSubmit = () => {
    if (selectedStar !== null && ratingMessage !== "") {
      onSubmit(selectedStar, ratingMessage);
      setOpen(true);
      setSelectedStar(null);
      setRatingMessage("");
    } else {
      console.error("Please select a rating and provide a message.");
    }
  };

  return (
    <div className="addReview-main-container">
      <div className="wrapper">
        <div className="master">
          <h1>Review And Rating</h1>
          <h2>What is your thought about the book?</h2>
          <div className="rating-component">
            <div className="stars-box">
              {[1, 2, 3, 4, 5].map((value) => (
                <i
                  key={value}
                  className={`star fa fa-star ${
                    selectedStar >= value ? "selected" : ""
                  }`}
                  onClick={() => handleStarClick(value)}
                />
              ))}
            </div>
          </div>
          <div className="feedback-tags">
            <div className="tags-box" style={{ width: "400px" }}>
              <textarea
                placeholder="Please enter your review"
                className="form-control w-100"
                typeof="text"
                type="text"
                value={ratingMessage}
                onChange={(e) => setRatingMessage(e.target.value)}
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>
          <div className="btn-container">
            <button
              className="btn btn-danger"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ bottom: { xs: 90, sm: 50 } }} // Adjust the bottom position based on viewport size
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Review added successfully
        </Alert>
      </Snackbar> */}
    </div>
  );
};

export default RatingComponent;
