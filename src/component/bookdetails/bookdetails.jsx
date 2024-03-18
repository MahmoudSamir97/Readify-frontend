import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import images from './../../images';
import './bookdetails.css';
import RatingForm from './../ratingform/ratingform'; // Updated import path

const BookDetails = ({ onSave, books, onWishlist }) => {
    const { id } = useParams();
    const book = books.filter(element => (element.id === id))[0];
    const [isRatingOpen, setIsRatingOpen] = useState(false); // State to manage form visibility

    const imageStyle = {
        width: "250px",
        height: "400px",
        padding: "2px",
    };

    // Dummy reviews for testing
    const reviews = [
        "Great book! Highly recommended.",
        "Interesting read, but could be improved.",
        "Loved it! Will read again.",
    ];

    return (
        <section className="py-5">
            <div className="container">
                <div className="bookdetails">
                    <div className="row">
                        <div className="col-md-4">
                            <img className="card-img-top mb-5 mb-md-0" style={imageStyle} src={images[id]} alt="img" />
                        </div>
                        <div className="col-md-8 p-2">
                            <h1 className="display-5 fw-bolder">{book.name}</h1>
                            <div className="fs-5 mb-5">
                                <span className="text">{`Price : ${book.price}$`}</span>
                                <span className='m-5' style={{ color: "green" }}>Sale : 25%</span>
                            </div>
                            <p className="lead mb-5 w-50" style={{ color: "black" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium at dolorem quidem </p>
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <button className="btn btn-danger flex-shrink-1" onClick={() => onSave(book)} type="button">
                                        Add to cart
                                    </button>
                                    <button className="btn btn-outline-dark flex-shrink-1 mx-2" onClick={() => onWishlist(book)} type="button">
                                        WishList <i className="far fa-heart"></i>
                                    </button>
                                </div>
                                <div>
                                    {/* Gold star icon */}
                                    <button className="btn btn-link" onClick={() => setIsRatingOpen(true)}>
                                        <i className="fa fa-star" style={{ color: "gold" }}></i>
                                    </button>
                                    {/* Conditionally render the rating form */}
                                    {isRatingOpen && <RatingForm book={book} onClose={() => setIsRatingOpen(false)} />}
                                </div>
                            </div>
                            {/* Display book reviews */}
                            <div className="row mt-4">
                                <div className="col-md-12">
                                    <h4>Book Reviews</h4>
                                    {reviews.map((review, index) => (
                                        <div key={index} className="review">
                                            <div>{review}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BookDetails;
