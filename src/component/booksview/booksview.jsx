import React from "react";
import "./booksview.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion for animation
import { useInView } from "react-intersection-observer";

// Import images
import book1Image from "./../../assets/images/photo1.jpeg";
import book2Image from "./../../assets/images/photo2.jpeg";
import book3Image from "./../../assets/images/photo3.jpeg";
import book4Image from "./../../assets/images/photo4.jpeg";
import book5Image from "./../../assets/images/photo5.jpeg";

const BooksView = ({ books }) => {
  // Define image URLs
  const images = [book1Image, book2Image, book3Image, book4Image, book5Image];

  return (
    <section className="most-books">
      <div className="container" id="Scicence">
        <div className="row-reverse">
          <div className="col-md-12">
            <h2>
              NEW <b>Books</b>
            </h2>
          </div>
          <div className="books">
            {images.map((image, index) => (
              <BookItem key={index} index={index} image={image} />
            ))}
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
      <Link to={`/bookdetails/${index + 1}`}>
        <img src={image} alt={`book-${index}`} loading="lazy" />
      </Link>
    </motion.div>
  );
};

export default BooksView;
