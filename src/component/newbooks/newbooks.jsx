import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./newbooks.css";
import { useInView } from "react-intersection-observer";

// Import images
import book1Image from "./../../images/new1.jpg";
import book2Image from "./../../images/new2.jpg";
import book3Image from "./../../images/new3.jpg";

const NewBooks = ({ books }) => {
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger the animation when 50% of the section is visible
    triggerOnce: true, // Only trigger the animation once
  });

  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 },
  };

  const createStars = () => {
    let stars = [];
    let randomNumber = Math.floor(Math.random() * 4 + 1);
    for (let i = 0; i < randomNumber; i++) {
      stars.push(
        <li className="list-inline-item" key={i}>
          <i className="fa fa-star"></i>
        </li>
      );
    }
    return stars;
  };

  const limitedBooks = books.slice(0, 3); // Slice the first 3 books

  // Define image URLs
  const images = [book1Image, book2Image, book3Image];

  return (
    <div>
      <section ref={ref} className="Newbooks">
        <div className={`container ${inView ? "visible" : ""}`} id="novels">
          <div className="row">
            <div className="col-md-12 mx-auto">
              <h2>
                NEW <b>Books</b>
              </h2>
              <motion.div className="inner-carousel">
                {limitedBooks.map((book, index) => (
                  <motion.div
                    className="item"
                    key={index}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={variants}
                    transition={{ delay: index * 0.2, duration: 1 }}
                    whileHover={{ scale: 1.1, translateY: -10 }}
                  >
                    <div className="imgBox">
                      <img src={images[index]} alt={`bookimg-${index}`} />
                      <div className="content">
                        <div className="name-price">
                          <Link
                            to={`/bookdetails/${book.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <h4>{book.name}</h4>
                          </Link>
                          <p className="item-price">
                            <strike>{book.price}$</strike>
                            <span>{book.price - 2}$</span>
                          </p>
                        </div>
                        <div className="star-rating">
                          <ul className="list-inline">{createStars()}</ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewBooks;
