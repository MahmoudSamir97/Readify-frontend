// import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./bookdetails.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import RatingComponent from "../Rating/Rating";
import ShowReview from "../ShowReview/ShowReview";

const BookDetails = (props) => {
  const [loading, setloading] = useState(false);
  const [isReviewSubmitted, setisReviewSubmitted] = useState(false);
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  // book reviews data
  const [reviews, setReviews] = useState([]);
  const [reviewsNumber, setReviewsNumber] = useState(0);
  const [averageRating, setaverageRating] = useState(0);
  // book reviews data
  let [errors, setErrors] = useState(null);
  const { id } = useParams();
  const [book, setbook] = useState("");
  // Snackbar
  const [open, setOpen] = useState(false);
  const [addedToCart, isAddedToCart] = useState(false);
  const [addedToWhishList, isAddedToWhishList] = useState(false);
  //
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i < 5; i++) {
      stars.push(
        <i
          key={i}
          className="fa fa-star"
          style={{ color: i < averageRating ? "#FFD43B" : "#808080" }}
        ></i>
      );
    }
    return stars;
  };
  //
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  console.log(averageRating);
  console.log(reviewsNumber);
  // Snackbar
  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      try {
        const req = await axios.get(`http://localhost:4000/book/${id}`);
        const bookFromDB = req.data.data.book;
        console.log(bookFromDB);
        setbook(bookFromDB);
        // reviews
        setReviews(bookFromDB.reviews);
        setReviewsNumber(bookFromDB.numReviews);
        setaverageRating(bookFromDB.rating);
        // review
        setloading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setloading(false);
      }
    };
    const getPurchasedItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const req = await axios.get(`http://localhost:4000/purchased`, config);
        const data = req.data.cart.cartItems;
        setPurchasedBooks(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setloading(false);
      }
    };
    fetchData();
    getPurchasedItems();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const { bookTitle, bookPrice, bookImage } = book;
      console.log(bookTitle, bookPrice, bookImage);
      const token = localStorage.getItem("token");
      const requestBody = {
        bookTitle,
        bookPrice,
        bookImage: bookImage.url,
      };
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const req = await axios.post(
        `http://localhost:4000/cartcpy`,
        requestBody,
        config
      );
      // snackbar
      setOpen(true);
      isAddedToCart(true);
      isAddedToWhishList(false);
      // snackbar
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };
  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in local storage");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const wishlistItem = { bookId: book._id }; // Assuming the book object has an _id property

      const response = await axios.post(
        "http://localhost:4000/wishlist",
        { wishlistItems: [wishlistItem] },
        config
      );
      // snackbar
      setOpen(true);
      isAddedToWhishList(true);
      isAddedToCart(false);

      // snackbar

      console.log("Added to wishlist:", response.data);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  // add review
  const handleReviewSubmit = async (selectedStar, ratingMessage) => {
    try {
      const token = localStorage.getItem("token");
      console.log(id);
      console.log(book);
      const body = {
        rating: selectedStar,
        comment: ratingMessage,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const req = await axios.post(
        `http://localhost:4000/${id}/review`,
        body,
        config
      );
      setisReviewSubmitted(true);
      setOpen(true);
    } catch (err) {
      setErrors(err.response.data.message);
    }
  };

  // show review

  return (
    <section className="py-5">
      <div className="container">
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <div className="bookdetails">
            <div className="row">
              <div className="col-md-4">
                <img
                  className="card-img-top mb-5 mb-md-0"
                  src={book?.bookImage?.url}
                  alt="img"
                />
              </div>
              <div className="col-md-8 p-4">
                <h1 className="display-5 fw-bolder text-center mt-0 mb-5">
                  {book.bookTitle}
                </h1>
                <div className=" mb-3">
                  {/* Logic */}
                  {purchasedBooks.some(
                    (purchasedBook) =>
                      purchasedBook.bookTitle === book.bookTitle
                  ) && (
                    <a
                      className="text-decoration-none ms-5 d-inline-block btn btn-outline-dark"
                      href={book?.bookPdf?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View PDF
                      <i
                        className="ms-2 fa-solid fa-file-pdf d-inline-block"
                        style={{ color: "#aa275b" }}
                      ></i>
                    </a>
                  )}
                  {/* Logic */}
                </div>
                <span
                  className=" mb-5 w-50 mt-0"
                  style={{ color: "black", fontSize: "1.157rem" }}
                >
                  {book.bookDescription}
                </span>
                <br></br>
                <span className="mt-3 d-block w-50" style={{ fontSize: "1" }}>
                  <b style={{ color: "#939597" }}>Author:</b> {book.Author}
                </span>
                {/* rating logic */}
                {averageRating > 0 ? (
                  <div className=" me-5">
                    <span className="d-block w-50" style={{ fontSize: "1rem" }}>
                      <b style={{ color: "#939597" }}>Rating:</b>{" "}
                      {renderStars()}
                    </span>
                  </div>
                ) : null}
                {/* rating logic */}
                {/* num of reviews */}
                {reviewsNumber > 0 ? (
                  <span className=" d-block w-50" style={{ fontSize: "1rem" }}>
                    <b style={{ color: "#939597" }}>Number of reviews:</b>{" "}
                    {reviewsNumber}
                  </span>
                ) : null}
                {/* num of reviews */}
                <span
                  className="d-inline-block mt-3"
                  style={{ fontSize: "1.257rem" }}
                >
                  {" "}
                  <b className="text-danger">Price:</b> {book.bookPrice} egp.
                </span>
                <div className="d-flex justify-content-center align-items-start mt-5 text-center">
                  <div className="mt-5 text-center">
                    <button
                      className="btn btn-danger flex-shrink-1 me-3"
                      type="button"
                      onClick={handleAddToCart}
                    >
                      Add to cart
                    </button>
                    <button
                      className="btn btn-outline-dark flex-shrink-1 mx-2"
                      type="button"
                      onClick={handleAddToWishlist} // Call handleAddToWishlist when Wishlist button is clicked
                    >
                      WishList <i className="far fa-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* add review */}
        <RatingComponent onSubmit={handleReviewSubmit} />
        {/* add review */}
        {errors && (
          <div className="text-danger text-center p-2 mb-2 mt-3">{errors}</div>
        )}

        <div className="show-container mt-5 text-start mb-4">
          <h3
            className="text-start mb-0 add-review-title"
            style={{
              color: "#939597",
              marginBottom: "0px",
              paddingBottom: "0px",
            }}
          >
            Read what others think about this book
          </h3>
          <div id="review-container" className=" mb-0">
            {/* single review */}
            {reviews.length > 0 ? (
              reviews.map((item, index) => {
                return (
                  <ShowReview
                    key={index}
                    name={item.name}
                    rating={item.rating}
                    message={item.comment}
                  />
                );
              })
            ) : (
              <h6 className="p-3" style={{ color: "#363945" }}>
                {" "}
                No reviews yet for this book
              </h6>
            )}
            {/* single review */}
          </div>
        </div>
      </div>
      {/* Snackbar */}
      {addedToCart ? (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{ bottom: { xs: 90, sm: 50 } }} // Adjust the bottom position based on viewport size
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            The book has been added to cart
          </Alert>
        </Snackbar>
      ) : null}
      {/* anoth snackbar */}
      {addedToWhishList ? (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{ bottom: { xs: 90, sm: 50 } }} // Adjust the bottom position based on viewport size
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            The book has been added to wishlist 😍
          </Alert>
        </Snackbar>
      ) : null}
      {/* Snackbar */}
      {/* anoth snackbar */}
      {isReviewSubmitted ? (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{ bottom: { xs: 90, sm: 50 } }} // Adjust the bottom position based on viewport size
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Review added successfully
          </Alert>
        </Snackbar>
      ) : null}
      {/* Snackbar */}
    </section>
  );
};

export default BookDetails;
