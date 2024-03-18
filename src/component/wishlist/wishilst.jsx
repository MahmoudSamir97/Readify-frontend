import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Import motion for animation
import images from './../../images';
import { Link } from 'react-router-dom';
import './wishlist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons'; // Import the sad face icon

const Wishlist = ({ books, onDelete }) => {
  const [wishBooks, setWishBooks] = useState([]);

  useEffect(() => {
    setWishBooks(books.filter((book) => book.wishlist === true));
  }, [books]);

  // Function to remove a book from the wishlist
  const handleRemove = (bookToRemove) => {
    const updatedWishBooks = wishBooks.filter((book) => book.id !== bookToRemove.id);
    setWishBooks(updatedWishBooks);
    onDelete(bookToRemove); // Call onDelete function to remove from parent component
    localStorage.setItem('wishlist', JSON.stringify(updatedWishBooks)); // Update local storage
  };

  // Check if there are no books in the wishlist
  const isWishlistEmpty = wishBooks.length === 0;

  return (
    <div className="wishlist mt-5 p-3 rounded cart">
      {isWishlistEmpty ? (
        <div className="text-center">
          <FontAwesomeIcon icon={faSadTear} size="4x" className="text-muted mb-3" />
          <p className="mb-3">You haven't added any favorite books yet!</p>
          <p className="mb-3">Add some books to your wishlist by browsing our collection.</p>
          <Link to="/allbooks">
            <button className="btn btn-outline-secondary">Go To Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="row">
          {wishBooks.map((book, index) => (
            <BookItem key={book.id} book={book} index={index} handleRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
};

// BookItem component to handle each book in the wishlist
const BookItem = ({ book, index, handleRemove }) => {
  return (
    <motion.div
      className="col-md-4 mb-4"
      initial={{ opacity: 0, scale: 0 }} // Initial animation state
      animate={{ opacity: 1, scale: 1 }} // Animation when in view
      transition={{ delay: index * 0.2, duration: 0.9 }} // Transition animation
    >
      <div className="book-card">
        <div className="imgBox">
          <img src={images[book.id]} alt={`book-${index}`} />
          <div className="content">
            <div className="name-price">
              <h4>{book.name}</h4>
              <p className="item-price">
                <strike>{book.price}$</strike>
                <span>{book.price - 2}$</span>
              </p>
            </div>
            <div className="description">
              <p>{book.description}</p>
            </div>
            <div className="remove-btn">
              <button className="btn btn-danger" onClick={() => handleRemove(book)}>Remove</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Wishlist;
