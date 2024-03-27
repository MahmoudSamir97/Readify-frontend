import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./newbooks.css";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import axios from "axios";

const NewBooks = () => {
  const [topRatedBooks, setTopRatedBooks] = useState(null);
  useEffect(() => {
    const getRecentBooks = async () => {
      try {
        const req = await axios.get("http://localhost:4000/book/recent");
        const data = req.data.data.recentBooks;
        setTopRatedBooks(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    getRecentBooks();
  });
  // Ref for the container
  const containerRef = useRef(null);

  // Function to scroll left
  const handleScrollLeft = () => {
    console.log("left");
    containerRef.current.scrollLeft -= 200; // Adjust the scroll amount as needed
  };

  // Function to scroll right
  const handleScrollRight = () => {
    console.log("right");
    containerRef.current.scrollLeft += 200; // Adjust the scroll amount as needed
  };

  return (
    <section className="most-books mt-5">
      <div className="container" id="Scicence">
        <div className="row-reverse">
          <div className="col-md-12">
            <h2
              className="text-center mt-5 p-5 mb-5"
              style={{
                color: "#DD4124",
                fontSize: "2.5rem",
                marginBottom: "6rem",
              }}
            >
              <b>Top Rated</b>
            </h2>
          </div>
          <div className="books-container">
            {/* Conditional rendering of scroll buttons */}
            <button className="scroll-button left" onClick={handleScrollLeft}>
              <i class="fa-solid fa-arrow-left"></i>{" "}
            </button>
            <button className="scroll-button right" onClick={handleScrollRight}>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
            {/* Conditional rendering of scroll buttons */}
            <div className="books" ref={containerRef}>
              {/* Render book items */}
              {topRatedBooks
                ? topRatedBooks.map((book, index) => (
                    <BookItem
                      key={index}
                      index={book.id}
                      image={book.bookImage.url}
                      ratting={book.rating}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// BookItem component to handle each book with animation
const BookItem = ({ index, image }) => {
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger the animation when 50% of the section is visible
    triggerOnce: true, // Only trigger the animation once
  });

  return (
    <motion.div
      ref={ref}
      className="book"
      initial={{ opacity: 0, scale: 0 }} // Initial animation state
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }} // Animation when in view
      transition={{ delay: index * 0.2, duration: 0.9 }} // Reduced transition duration to make animation faster
      whileHover={{ scale: 1.1, zIndex: 1 }} // Increase size and move to front on hover
    >
      <Link to={`/bookdetails/${index}`}>
        <img src={image} alt={`book-${index}`} loading="lazy" />
      </Link>
    </motion.div>
  );
};

export default NewBooks;
