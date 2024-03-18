import React from "react";
import "./booksview.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion for animation
import { useInView } from "react-intersection-observer";

// Import images
import book1Image from "./../../assets/images/new1.jpg";
import book2Image from "./../../assets/images/new2.jpg";
import book3Image from "./../../assets/images/new3.jpg";
import book4Image from "./../../assets/images/new1.jpg";
import book5Image from "./../../assets/images/new2.jpg";

const BooksView = ({ books }) => {
  // Define image URLs
  const images = [book1Image, book2Image, book3Image, book4Image, book5Image];

  // Slice the first 5 books
  const limitedBooks = books.slice(0, 5);

  return (
    <section className="most-books">
      <div className="container" id="Scicence">
        <div className="row-reverse">
          <div className="col-md-12">
            <h2>
              Most <b>Rated Books</b>
            </h2>
          </div>
          <div className="books">
            {limitedBooks.map((book, index) => (
              <BookItem
                key={book.id}
                book={book}
                index={index}
                images={images}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// BookItem component to handle each book with animation
const BookItem = ({ book, index, images }) => {
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
      <Link to={`./bookdetails/${book.id}`}>
        <img
          src={images[index % images.length]}
          alt={`book-${index}`}
          loading="lazy"
        />
      </Link>
      <div className="thumb-content">
        <h5>{book.name}</h5>
        <p className="item-price">
          <strike>{book.price}</strike> <span> 25%</span>
        </p>
        <p className="book-description">{book.description}</p>{" "}
        {/* Display book description */}
      </div>
    </motion.div>
  );
};

export default BooksView;
