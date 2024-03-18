import React, { useState } from 'react';
import './ratingform.css'; // Import CSS file for styling

const RatingForm = ({ book, onClose }) => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const [hoveredRating, setHoveredRating] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0 || message.trim() === '') {
            setErrorMessage('Please provide a rating and message.');
            return;
        }
        // Simulating rating submission (replace with actual submission logic)
        setTimeout(() => {
            setSuccessMessage('Rating submitted successfully');
            onClose();
        }, 1500);
    };

    const handleStarClick = (index) => {
        if (index === rating) {
            // If clicked star is already filled, clear rating
            setRating(0);
        } else {
            // Otherwise, set rating to the clicked star index
            setRating(index);
        }
    };

    const stars = [0, 1, 2, 3, 4].map((index) => (
        <span
            key={index}
            className={index < rating || index < hoveredRating ? "fa fa-star checked" : "fa fa-star"}
            onMouseEnter={() => setHoveredRating(index + 1)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => handleStarClick(index + 1)}
        />
    ));

    return (
        <div className="rating-form-container">
            <div className="rating-form">
                <h3>Rate this book</h3>
                <form onSubmit={handleSubmit}>
                    <div className="rating">{stars}</div>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            placeholder="Enter your message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && (
                        <p className="success-message">
                            <i className="fa fa-check-circle"></i> {successMessage}
                        </p>
                    )}
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <br></br> <br></br>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RatingForm;
