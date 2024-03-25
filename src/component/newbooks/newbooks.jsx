import React from "react";
import { motion } from "framer-motion";
import "./newbooks.css";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

// Import images
import book1Image from "./../../assets/images/photo1.jpeg";
import book2Image from "./../../assets/images/photo2.jpeg";
import book3Image from "./../../assets/images/photo3.jpeg";

const NewBooks = () => {
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

  // Define image URLs
  const images = [book1Image, book2Image, book3Image];

  return (
    <div>
      <section ref={ref} className="Newbooks">
        <div className={`container ${inView ? "visible" : ""}`} id="novels">
          <div className="row">
            <div className="col-md-12 mx-auto">
              <h2>
                Most <b>Rated Books</b>
              </h2>
              <div className="inner-carousel">
                {images.map((image, index) => (
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
                      <img src={image} alt={`bookimg-${index}`} />
                      <div className="content">
                        <div className="star-rating">
                          <ul className="list-inline">{createStars()}</ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewBooks;