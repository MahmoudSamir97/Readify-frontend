// import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./bookdetails.css";
import axios from "axios";
import { useEffect, useState } from "react";

const BookDetails = (props) => {
  const [loading, setloading] = useState(false);
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const { id } = useParams();
  const [book, setbook] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const req = await axios.get(`http://localhost:4000/book/${id}`);
        const res = req.data.data.book;
        setBook(res);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
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
      console.log("first");
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
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };
  console.log(purchasedBooks);

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
              <div className="col-md-8 p-2">
                <h1 className="display-5 fw-bolder">{book.bookTitle}</h1>
                <div className="fs-5 mb-5">
                  <span className="text">{`Price : ${book.bookPrice}$`}</span>{" "}
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
                  {/* {book ? (
                    <a
                      className="text-decoration-none ms-5  d-inline-block btn btn-outline-dark"
                      href={book.bookPdf.url}
                    >
                      View Pdf
                      <i
                        className="ms-2 fa-solid fa-file-pdf d-inline-block"
                        style={{ color: "#aa275b" }}
                      ></i>
                    </a>
                  ) : null} */}
                  <br />
                  <span className="text" style={{ color: "green" }}>
                    {`Discount : ${book.discount}%`}
                  </span>
                </div>
                <span className="lead mb-5 w-50" style={{ color: "black" }}>
                  Book Description: {book.bookDescription}
                </span>
                <br></br>
                <span className="lead mb-5 w-50" style={{ color: "black" }}>
                  Author: {book.Author}
                </span>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <button
                      className="btn btn-danger flex-shrink-1"
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
                  <div>
                    {/* Gold star icon */}
                    <button className="btn btn-link">
                      <i className="fa fa-star" style={{ color: "gold" }}></i>
                    </button>
                    {/* Conditionally render the rating form */}
                  </div>
                </div>
                {/* Display book reviews */}
                <div className="row mt-4">
                  <div className="col-md-12">
                    <h4>Book Reviews</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookDetails;
