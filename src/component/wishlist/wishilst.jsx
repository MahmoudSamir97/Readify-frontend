// // import React, { useEffect, useState } from "react";
// // import { motion } from "framer-motion"; // Import motion for animation
// // import { Link } from "react-router-dom";
// // import axios from "axios";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faSadTear } from "@fortawesome/free-solid-svg-icons"; // Import the sad face icon

// // const Wishlist = () => {
// //   const [wishlistItems, setWishlistItems] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     const fetchWishlist = async () => {
// //       try {
// //         setLoading(true);
// //         const token = localStorage.getItem("token");
// //         if (!token) {
// //           console.error("Token not found in local storage");
// //           return;
// //         }

// //         const config = {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         };

// //         const response = await axios.get("http://localhost:4000/wishlist", config);
// //         setWishlistItems(response.data.cart.wishlistItems);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching wishlist:", error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchWishlist();
// //   }, []);

// //   // Check if there are no books in the wishlist
// //   const isWishlistEmpty = wishlistItems.length === 0;

// //   return (
// //     <div className="wishlist mt-5 p-3 rounded cart">
// //       {loading ? (
// //         <div>Loading...</div>
// //       ) : isWishlistEmpty ? (
// //         <div className="text-center">
// //           <FontAwesomeIcon icon={faSadTear} size="4x" className="text-muted mb-3" />
// //           <p className="mb-3">You haven't added any favorite books yet!</p>
// //           <p className="mb-3">Add some books to your wishlist by browsing our collection.</p>
// //           <Link to="/allbooks">
// //             <button className="btn btn-outline-secondary">Go To Shopping</button>
// //           </Link>
// //         </div>
// //       ) : (
// //         <div className="row">
// //           {wishlistItems.map((wishlistItem, index) => (
// //             <BookItem key={index} book={wishlistItem.bookId} />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // // BookItem component to handle each book in the wishlist
// // const BookItem = ({ book }) => {
// //   return (
// //     <motion.div
// //       className="col-md-4 mb-4"
// //       initial={{ opacity: 0, scale: 0 }} // Initial animation state
// //       animate={{ opacity: 1, scale: 1 }} // Animation when in view
// //       transition={{ duration: 0.5 }} // Transition animation
// //     >
// //       <div className="book-card">
// //         <div className="imgBox">
// //           <img src={book.bookImage.url} alt={`book-${book._id}`} />
// //           <div className="content">
// //             <div className="name-price">
// //               <h4>{book.bookTitle}</h4>
// //               <p className="item-price">
// //                 <strike>{book.bookPrice}$</strike>
// //                 <span>{book.bookPrice - 2}$</span>
// //               </p>
// //             </div>

// //           </div>
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default Wishlist;
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion"; // Import motion for animation
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSadTear, faTrash } from "@fortawesome/free-solid-svg-icons"; // Import the sad face icon and trash icon

// const Wishlist = () => {
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         if (!token) {
//           console.error("Token not found in local storage");
//           return;
//         }

//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         const response = await axios.get(
//           "http://localhost:4000/wishlist",
//           config
//         );
//         setWishlistItems(response.data.cart.wishlistItems);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching wishlist:", error);
//         setLoading(false);
//       }
//     };

//     fetchWishlist();
//   }, []);

//   // Function to remove book from wishlist
//   const removeFromWishlist = async (bookId) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("Token not found in local storage");
//         return;
//       }

//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       await axios.delete(`http://localhost:4000/wishlist/${bookId}`, config);
//       // After successful deletion, update the wishlist items
//       setWishlistItems(
//         wishlistItems.filter((item) => item.bookId._id !== bookId)
//       );
//     } catch (error) {
//       console.error("Error removing book from wishlist:", error);
//     }
//   };

//   // Check if there are no books in the wishlist
//   const isWishlistEmpty = wishlistItems.length === 0;

//   return (
//     <div className="wishlist mt-5 p-3 rounded cart">
//       {loading ? (
//         <div>Loading...</div>
//       ) : isWishlistEmpty ? (
//         <div className="text-center">
//           <FontAwesomeIcon
//             icon={faSadTear}
//             size="4x"
//             className="text-muted mb-3"
//           />
//           <p className="mb-3">You haven't added any favorite books yet!</p>
//           <p className="mb-3">
//             Add some books to your wishlist by browsing our collection.
//           </p>
//           <Link to="/allbooks">
//             <button className="btn btn-outline-secondary">
//               Go To Shopping
//             </button>
//           </Link>
//         </div>
//       ) : (
//         <div className="row">
//           {wishlistItems.map((wishlistItem, index) => (
//             <BookItem
//               key={index}
//               book={wishlistItem.bookId}
//               removeFromWishlist={removeFromWishlist}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // BookItem component to handle each book in the wishlist
// const BookItem = ({ book, removeFromWishlist }) => {
//   return (
//     <motion.div
//       className="col-md-4 mb-4"
//       initial={{ opacity: 0, scale: 0 }} // Initial animation state
//       animate={{ opacity: 1, scale: 1 }} // Animation when in view
//       transition={{ duration: 0.5 }} // Transition animation
//     >
//       <div className="book-card">
//         <div className="imgBox">
//           <img src={book.bookImage.url} alt={`book-${book._id}`} />
//           <div className="content">
//             <div className="name-price">
//               <h4>{book.bookTitle}</h4>
//               <p className="item-price">
//                 <strike>{book.bookPrice}$</strike>
//                 <span>{book.bookPrice - 2}$</span>
//               </p>
//             </div>
//             <button
//               onClick={() => removeFromWishlist(book._id)}
//               className="btn btn-danger"
//             >
//               <FontAwesomeIcon icon={faTrash} /> Remove
//             </button>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Wishlist;
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear, faTrash } from "@fortawesome/free-solid-svg-icons";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // State variable for Snackbar
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

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

  const handleDeleteConfirmation = (bookId) => {
    setSelectedBookId(bookId);
    setDeleteModalShow(true);
  };

  const handleDeleteConfirm = () => {
    removeFromWishlist(selectedBookId);
    setDeleteModalShow(false);
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
              handleDeleteConfirmation={handleDeleteConfirmation}
            />
          ))}
        </div>
      )}
      {/* Snackbar to show item removed message */}
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

      <Modal
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        centered // Add centered prop to center the modal
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this book from your wishlist?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModalShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const BookItem = ({ book, removeFromWishlist, handleDeleteConfirmation }) => {
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
            <div>
              <div>
                <h4>{book.bookTitle}</h4>
                <p>
                  <strike>{book.bookPrice}$</strike>
                  <span>{book.bookPrice - 2}$</span>
                </p>
              </div>
              <button
                onClick={() => handleDeleteConfirmation(book._id)}
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
