import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; 
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear, faTrash } from "@fortawesome/free-solid-svg-icons"; 
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // State variable for Snackbar

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
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

        const response = await axios.get(
          "http://localhost:4000/wishlist",
          config
        );
        setWishlistItems(response.data.cart.wishlistItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (bookId) => {
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

      await axios.delete(`http://localhost:4000/wishlist/${bookId}`, config);
      setWishlistItems(
        wishlistItems.filter((item) => item.bookId._id !== bookId)
      );
      setOpen(true); // Open Snackbar when item is successfully removed
    } catch (error) {
      console.error("Error removing book from wishlist:", error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false); // Close Snackbar
  };

  const isWishlistEmpty = wishlistItems.length === 0;

  return (
    <div className="wishlist mt-5 p-3 rounded cart">
      {loading ? (
        <div>Loading...</div>
      ) : isWishlistEmpty ? (
        <div className="text-center">
          <FontAwesomeIcon
            icon={faSadTear}
            size="4x"
            className="text-muted mb-3"
          />
          <p className="mb-3">You haven't added any favorite books yet!</p>
          <p className="mb-3">
            Add some books to your wishlist by browsing our collection.
          </p>
          <Link to="/allbooks">
            <button className="btn btn-outline-secondary">
              Go To Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="row">
          {wishlistItems.map((wishlistItem, index) => (
            <BookItem
              key={index}
              book={wishlistItem.bookId}
              removeFromWishlist={removeFromWishlist}
            />
          ))}
        </div>
      )}
      {/* Snackbar to show item removed message */} ``
            <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} 
      >
        <MuiAlert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Item removed successfully!
        </MuiAlert>
      </Snackbar>

    </div>
  );
};

const BookItem = ({ book, removeFromWishlist }) => {
  return (
    <motion.div
      className="col-md-4 mb-4"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="book-card">
          <div className="imgBox">
            <img src={book.bookImage.url} alt={`book-${book._id}`} />
            <div className="content">
              <div className="name-price">
                <h4>{book.bookTitle}</h4>
                <p className="item-price">
                  <strike>{book.bookPrice}$</strike>
                  <span>{book.bookPrice - 2}$</span>
                </p>
              </div>
              <button
                onClick={() => removeFromWishlist(book._id)}
                className="btn btn-danger"
              >
                <FontAwesomeIcon icon={faTrash} /> Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Wishlist;
